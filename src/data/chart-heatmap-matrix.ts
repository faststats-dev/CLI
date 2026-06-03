import type { SeriesRows } from "./chart-data.ts";

type HeatmapCell = { rowLabel: string; colLabel: string; value: number };

export type HeatmapMatrix = {
	cells: HeatmapCell[];
	rowLabels: string[];
	colLabels: string[];
};

export type HeatmapLayout = "calendar" | "mosaic" | "grid";

export type HeatmapMosaicItem = HeatmapCell & { displayLabel: string };

export const MAX_HEATMAP_ROWS = 16;
export const MAX_HEATMAP_COL_TICKS = 8;
export const MAX_HEATMAP_ROW_TICKS = 12;

const DELIMITERS = ["|", "::", " / ", " > ", " - ", ">", "/"];
const MAX_HOUR_ROWS = 24;
const MAX_MOSAIC_COLS = 6;
const TRANSPOSE_COL_THRESHOLD = 10;
const INTENSITY_LEVELS = 5;

const cellKey = (row: string, col: string) => `${row}__${col}`;

function uniqueSorted(labels: Iterable<string>): string[] {
	const copy = [...new Set(labels)];
	if (copy.every((l) => /^\d{4}-\d{2}-\d{2}$/.test(l))) return copy.sort();
	if (copy.every((l) => /^-?\d+(\.\d+)?$/.test(l.trim()))) {
		return copy.sort((a, b) => Number(a) - Number(b));
	}
	return copy.sort((a, b) =>
		a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
	);
}

function matrixFromCells(cells: HeatmapCell[]): HeatmapMatrix {
	return {
		cells,
		rowLabels: [...new Set(cells.map((c) => c.rowLabel))],
		colLabels: uniqueSorted(cells.map((c) => c.colLabel)),
	};
}

function pickDelimiter(names: readonly string[]): string | null {
	let best: string | null = null;
	let bestCount = 0;
	for (const d of DELIMITERS) {
		const count = names.filter((n) => n.includes(d)).length;
		if (count > bestCount) {
			bestCount = count;
			best = d;
		}
	}
	return best && bestCount >= Math.max(2, Math.ceil(names.length * 0.6))
		? best
		: null;
}

function buildFromDelimiter(
	rows: SeriesRows,
	valueKeys: readonly string[],
	seriesLabels: readonly string[],
	delimiter: string,
): HeatmapMatrix | null {
	const map = new Map<string, HeatmapCell>();
	for (const row of rows) {
		const raw = String(row.name ?? "");
		if (!raw.includes(delimiter)) continue;
		const parts = raw
			.split(delimiter)
			.map((p) => p.trim())
			.filter(Boolean);
		if (parts.length < 2) continue;
		const rowLabel = parts[0];
		if (!rowLabel) continue;
		const colBase = parts.slice(1).join(delimiter);
		valueKeys.forEach((key, i) => {
			const colLabel =
				valueKeys.length > 1
					? `${colBase} • ${seriesLabels[i] ?? `Series ${i + 1}`}`
					: colBase;
			map.set(cellKey(rowLabel, colLabel), {
				rowLabel,
				colLabel,
				value: Number(row[key]),
			});
		});
	}
	return map.size > 0 ? matrixFromCells([...map.values()]) : null;
}

function parseDate(name: string): Date | null {
	const date = /^\d{4}-\d{2}-\d{2}$/.test(name)
		? new Date(`${name}T00:00:00`)
		: new Date(name);
	return Number.isNaN(date.getTime()) ? null : date;
}

function tryBuildCalendar(
	rows: SeriesRows,
	valueKey: string,
): HeatmapMatrix | null {
	if (rows.length < 12) return null;
	const parsed = rows.map((row) => ({
		row,
		date: parseDate(String(row.name ?? "")),
	}));
	if (parsed.some((entry) => !entry.date)) return null;

	const values = new Map<string, number>();
	const days: string[] = [];
	const daySeen = new Set<string>();
	const hours = new Set<number>();

	for (const { row, date } of parsed) {
		if (!date) continue;
		const day = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
		const hour = date.getHours();
		if (!daySeen.has(day)) {
			daySeen.add(day);
			days.push(day);
		}
		hours.add(hour);
		values.set(
			cellKey(`${String(hour).padStart(2, "0")}:00`, day),
			Number(row[valueKey]),
		);
	}

	const hourList = [...hours].sort((a, b) => a - b);
	if (hourList.length <= 2) return null;

	const rowLabels = hourList.map((h) => `${String(h).padStart(2, "0")}:00`);
	const colLabels = uniqueSorted(days);
	const cells = rowLabels.flatMap((rowLabel) =>
		colLabels.map((colLabel) => ({
			rowLabel,
			colLabel,
			value: values.get(cellKey(rowLabel, colLabel)) ?? 0,
		})),
	);
	return { cells, rowLabels, colLabels };
}

export function buildHeatmapMatrix(
	rows: SeriesRows,
	valueKeys: readonly string[],
	seriesLabels: readonly string[],
): HeatmapMatrix {
	const empty = { cells: [], rowLabels: [], colLabels: [] };
	if (valueKeys.length === 0) return empty;

	const names = rows.map((r) => String(r.name ?? "")).filter(Boolean);
	const delimiter = names.length > 0 ? pickDelimiter(names) : null;
	if (delimiter) {
		const fromDelimiter = buildFromDelimiter(
			rows,
			valueKeys,
			seriesLabels,
			delimiter,
		);
		if (fromDelimiter) return fromDelimiter;
	}

	if (valueKeys.length === 1) {
		const valueKey = valueKeys[0];
		if (!valueKey) return empty;

		const calendar = tryBuildCalendar(rows, valueKey);
		if (calendar) return calendar;

		const rowLabel = seriesLabels[0] ?? "Value";
		const cells = rows.map((row) => ({
			rowLabel,
			colLabel: String(row.name ?? "Unknown"),
			value: Number(row[valueKey]),
		}));
		return {
			cells,
			rowLabels: [rowLabel],
			colLabels: uniqueSorted(cells.map((c) => c.colLabel)),
		};
	}

	const rowLabels = valueKeys.map(
		(_, i) => seriesLabels[i] ?? `Series ${i + 1}`,
	);
	const cells = valueKeys.flatMap((key, i) =>
		rows.map((row, j) => ({
			rowLabel: rowLabels[i] ?? `Series ${i + 1}`,
			colLabel: String(row.name ?? `Column ${j + 1}`),
			value: Number(row[key]),
		})),
	);
	return matrixFromCells(cells);
}

function isCalendar(matrix: HeatmapMatrix): boolean {
	return (
		matrix.rowLabels.length > 0 &&
		matrix.rowLabels.every((l) => /^\d{2}:\d{2}(-\d{2}:\d{2})?$/.test(l)) &&
		matrix.colLabels.some((l) => /^\d{4}-\d{2}-\d{2}$/.test(l))
	);
}

function getLayout(matrix: HeatmapMatrix): HeatmapLayout {
	if (matrix.cells.length === 0) return "grid";
	if (isCalendar(matrix)) return "calendar";
	if (matrix.rowLabels.length === 1 && matrix.colLabels.length > 1) {
		return "mosaic";
	}
	return "grid";
}

function transpose(matrix: HeatmapMatrix): HeatmapMatrix {
	return {
		cells: matrix.cells.map((c) => ({
			rowLabel: c.colLabel,
			colLabel: c.rowLabel,
			value: c.value,
		})),
		rowLabels: [...matrix.colLabels],
		colLabels: [...matrix.rowLabels],
	};
}

function condenseRows(matrix: HeatmapMatrix, maxRows: number): HeatmapMatrix {
	const limit = matrix.rowLabels.every((l) => /^\d{2}:\d{2}/.test(l))
		? Math.max(maxRows, MAX_HOUR_ROWS)
		: maxRows;
	if (matrix.rowLabels.length <= limit) return matrix;

	const bucketSize = Math.ceil(matrix.rowLabels.length / maxRows);
	const groups: string[][] = [];
	for (let i = 0; i < matrix.rowLabels.length; i += bucketSize) {
		groups.push(matrix.rowLabels.slice(i, i + bucketSize));
	}

	const values = new Map(
		matrix.cells.map((c) => [cellKey(c.rowLabel, c.colLabel), c.value]),
	);
	const rowLabels = groups.map((g) =>
		g.length <= 1
			? (g[0] ?? "")
			: /^\d{2}:\d{2}$/.test(g[0] ?? "") && /^\d{2}:\d{2}$/.test(g.at(-1) ?? "")
				? `${g[0]}-${g.at(-1)}`
				: `${g[0]}…${g.at(-1)}`,
	);
	const cells = groups.flatMap((group, i) =>
		matrix.colLabels.map((colLabel) => ({
			rowLabel: rowLabels[i] ?? `Row ${i + 1}`,
			colLabel,
			value: group.reduce(
				(sum, row) => sum + (values.get(cellKey(row, colLabel)) ?? 0),
				0,
			),
		})),
	);
	return { cells, rowLabels, colLabels: matrix.colLabels };
}

export function prepareHeatmapDisplayMatrix(
	matrix: HeatmapMatrix,
	maxRows: number,
): { matrix: HeatmapMatrix; layout: HeatmapLayout } {
	let display = matrix;
	if (
		getLayout(display) === "grid" &&
		display.colLabels.length >= TRANSPOSE_COL_THRESHOLD &&
		display.colLabels.length > display.rowLabels.length * 2
	) {
		display = transpose(display);
	}
	const layout = getLayout(display);
	if (layout === "calendar" || layout === "grid") {
		display = condenseRows(display, maxRows);
	}
	return { matrix: display, layout };
}

export function getHeatmapMosaicItems(
	matrix: HeatmapMatrix,
): HeatmapMosaicItem[] {
	const byCol = new Map(matrix.cells.map((c) => [c.colLabel, c]));
	return uniqueSorted(matrix.colLabels).map((colLabel) => {
		const cell = byCol.get(colLabel);
		return {
			rowLabel: cell?.rowLabel ?? matrix.rowLabels[0] ?? "",
			colLabel,
			value: cell?.value ?? 0,
			displayLabel: formatHeatmapCategoryLabel(colLabel),
		};
	});
}

export function getHeatmapMosaicColumnCount(itemCount: number): number {
	return itemCount <= 4 ? itemCount : Math.min(MAX_MOSAIC_COLS, itemCount);
}

export function formatHeatmapCategoryLabel(label: string): string {
	return /^\d{4}-\d{2}-\d{2}$/.test(label) ? formatHeatmapLabel(label) : label;
}

export function formatHeatmapRowLabel(label: string): string {
	return label;
}

export function formatHeatmapLabel(label: string): string {
	if (/^\d{4}-\d{2}-\d{2}$/.test(label)) {
		const date = new Date(`${label}T00:00:00`);
		if (!Number.isNaN(date.getTime())) {
			return date.toLocaleDateString(undefined, {
				month: "short",
				day: "numeric",
			});
		}
	}
	const normalized = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(label)
		? `${label.replace(" ", "T")}Z`
		: label;
	const date = new Date(normalized);
	if (!Number.isNaN(date.getTime())) {
		return date.toLocaleString(undefined, {
			month: "short",
			day: "numeric",
			hour: "numeric",
			minute: "2-digit",
		});
	}
	return label;
}

export interface HeatmapIntensityScale {
	readonly sortedPositive: readonly number[];
}

export function buildHeatmapIntensityScale(
	values: readonly number[],
): HeatmapIntensityScale {
	return {
		sortedPositive: values
			.filter((v) => v > 0 && Number.isFinite(v))
			.sort((a, b) => a - b),
	};
}

export function getHeatmapCellColor(
	value: number,
	emptyColor: string,
	scale: HeatmapIntensityScale,
	intensityFills: readonly string[],
): string {
	const sorted = scale.sortedPositive;
	if (value <= 0 || !Number.isFinite(value) || sorted.length === 0) {
		return emptyColor;
	}
	if (sorted.length === 1) {
		return intensityFills[INTENSITY_LEVELS - 1] ?? emptyColor;
	}
	let below = 0;
	for (const v of sorted) if (v < value) below++;
	const level = Math.min(
		INTENSITY_LEVELS - 1,
		Math.floor((below / (sorted.length - 1)) * INTENSITY_LEVELS),
	);
	return intensityFills[level] ?? emptyColor;
}

export function sampleHeatmapAxisLabels(
	labels: readonly string[],
	maxCount: number,
): string[] {
	if (maxCount <= 0 || labels.length === 0) return [];
	if (labels.length <= maxCount) return [...labels];
	if (maxCount === 1) return [labels.at(-1) ?? ""];
	const last = labels.length - 1;
	return Array.from(
		{ length: maxCount },
		(_, i) => labels[Math.round((i * last) / (maxCount - 1))] ?? "",
	);
}
