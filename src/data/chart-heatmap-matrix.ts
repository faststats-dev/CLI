import type { SeriesRows } from "./chart-data.ts";

type HeatmapCell = { rowLabel: string; colLabel: string; value: number };

export type HeatmapMatrix = {
	cells: HeatmapCell[];
	rowLabels: string[];
	colLabels: string[];
};

export type HeatmapLayout = "mosaic" | "grid";

export type HeatmapMosaicItem = HeatmapCell & { displayLabel: string };

export const MAX_HEATMAP_ROWS = 16;
export const MAX_HEATMAP_COL_TICKS = 8;
export const MAX_HEATMAP_ROW_TICKS = 12;

const EMPTY: HeatmapMatrix = { cells: [], rowLabels: [], colLabels: [] };
const DELIMITERS = ["|", "::", " / ", " > ", " - ", ">", "/"];
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
	const threshold = Math.max(2, Math.ceil(names.length * 0.6));
	let best = { delimiter: "", count: 0 };
	for (const delimiter of DELIMITERS) {
		const count = names.filter((name) => name.includes(delimiter)).length;
		if (count > best.count) best = { delimiter, count };
	}
	return best.count >= threshold ? best.delimiter : null;
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
			.map((part) => part.trim())
			.filter(Boolean);
		if (parts.length < 2) continue;
		const rowLabel = parts[0];
		if (!rowLabel) continue;
		const colBase = parts.slice(1).join(delimiter);
		valueKeys.forEach((key, index) => {
			const colLabel =
				valueKeys.length > 1
					? `${colBase} • ${seriesLabels[index] ?? `Series ${index + 1}`}`
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

export function buildHeatmapMatrix(
	rows: SeriesRows,
	valueKeys: readonly string[],
	seriesLabels: readonly string[],
): HeatmapMatrix {
	if (valueKeys.length === 0) return EMPTY;

	const names = rows.map((row) => String(row.name ?? "")).filter(Boolean);
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

	const singleSeries = valueKeys.length === 1;
	const rowLabels = singleSeries
		? [seriesLabels[0] ?? "Value"]
		: valueKeys.map((_, index) => seriesLabels[index] ?? `Series ${index + 1}`);

	const cells = valueKeys.flatMap((key, index) =>
		rows.map((row, rowIndex) => ({
			rowLabel: rowLabels[index] ?? `Series ${index + 1}`,
			colLabel: String(
				row.name ?? (singleSeries ? "Unknown" : `Column ${rowIndex + 1}`),
			),
			value: Number(row[key]),
		})),
	);
	return matrixFromCells(cells);
}

function getLayout(matrix: HeatmapMatrix): HeatmapLayout {
	return matrix.rowLabels.length === 1 && matrix.colLabels.length > 1
		? "mosaic"
		: "grid";
}

function transpose(matrix: HeatmapMatrix): HeatmapMatrix {
	return {
		cells: matrix.cells.map((cell) => ({
			rowLabel: cell.colLabel,
			colLabel: cell.rowLabel,
			value: cell.value,
		})),
		rowLabels: [...matrix.colLabels],
		colLabels: [...matrix.rowLabels],
	};
}

function condenseRows(matrix: HeatmapMatrix, maxRows: number): HeatmapMatrix {
	if (matrix.rowLabels.length <= maxRows) return matrix;

	const bucketSize = Math.ceil(matrix.rowLabels.length / maxRows);
	const groups = Array.from(
		{ length: Math.ceil(matrix.rowLabels.length / bucketSize) },
		(_, index) =>
			matrix.rowLabels.slice(index * bucketSize, (index + 1) * bucketSize),
	);
	const values = new Map(
		matrix.cells.map((cell) => [
			cellKey(cell.rowLabel, cell.colLabel),
			cell.value,
		]),
	);
	const rowLabels = groups.map((group) => {
		if (group.length <= 1) return group[0] ?? "";
		const first = group[0] ?? "";
		const last = group.at(-1) ?? "";
		return first === last ? first : `${first}…${last}`;
	});
	const cells = groups.flatMap((group, index) =>
		matrix.colLabels.map((colLabel) => ({
			rowLabel: rowLabels[index] ?? `Row ${index + 1}`,
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
	let layout = getLayout(display);
	if (
		layout === "grid" &&
		display.colLabels.length >= TRANSPOSE_COL_THRESHOLD &&
		display.colLabels.length > display.rowLabels.length * 2
	) {
		display = transpose(display);
		layout = getLayout(display);
	}
	if (layout === "grid") display = condenseRows(display, maxRows);
	return { matrix: display, layout };
}

export function getHeatmapMosaicItems(
	matrix: HeatmapMatrix,
): HeatmapMosaicItem[] {
	const byCol = new Map(matrix.cells.map((cell) => [cell.colLabel, cell]));
	return uniqueSorted(matrix.colLabels).map((colLabel) => {
		const cell = byCol.get(colLabel);
		return {
			rowLabel: cell?.rowLabel ?? matrix.rowLabels[0] ?? "",
			colLabel,
			value: cell?.value ?? 0,
			displayLabel: formatHeatmapLabel(colLabel),
		};
	});
}

export function getHeatmapMosaicColumnCount(itemCount: number): number {
	return itemCount <= 4 ? itemCount : Math.min(MAX_MOSAIC_COLS, itemCount);
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

export type HeatmapIntensityScale = readonly number[];

export function buildHeatmapIntensityScale(
	values: readonly number[],
): HeatmapIntensityScale {
	return values
		.filter((value) => value > 0 && Number.isFinite(value))
		.sort((a, b) => a - b);
}

export function getHeatmapCellColor(
	value: number,
	emptyColor: string,
	sortedPositive: HeatmapIntensityScale,
	intensityFills: readonly string[],
): string {
	if (value <= 0 || !Number.isFinite(value) || sortedPositive.length === 0) {
		return emptyColor;
	}
	if (sortedPositive.length === 1) {
		return intensityFills[INTENSITY_LEVELS - 1] ?? emptyColor;
	}
	let below = 0;
	for (const entry of sortedPositive) if (entry < value) below++;
	const level = Math.min(
		INTENSITY_LEVELS - 1,
		Math.floor((below / (sortedPositive.length - 1)) * INTENSITY_LEVELS),
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
		(_, index) => labels[Math.round((index * last) / (maxCount - 1))] ?? "",
	);
}
