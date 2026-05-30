import type { SeriesRows } from "./chart-data.ts";

type HeatmapCellDatum = {
	rowLabel: string;
	colLabel: string;
	value: number;
};

export type HeatmapMatrix = {
	cells: HeatmapCellDatum[];
	rowLabels: string[];
	colLabels: string[];
};

export type HeatmapLayout = "calendar" | "mosaic" | "grid";

export type HeatmapMosaicItem = HeatmapCellDatum & {
	displayLabel: string;
};

const SPLIT_DELIMITERS = ["|", "::", " / ", " > ", " - ", ">", "/"];
export const MAX_HEATMAP_ROWS = 16;
const MAX_HEATMAP_HOUR_ROWS = 24;
export const MAX_HEATMAP_COL_TICKS = 8;
export const MAX_HEATMAP_ROW_TICKS = 12;
const MAX_HEATMAP_MOSAIC_COLS = 6;
const HEATMAP_TRANSPOSE_COL_THRESHOLD = 10;
const HEATMAP_INTENSITY_LEVEL_COUNT = 5;

function pickDelimiter(names: readonly string[]): string | null {
	let winner: string | null = null;
	let maxScore = 0;
	for (const delimiter of SPLIT_DELIMITERS) {
		const score = names.filter((name) => name.includes(delimiter)).length;
		if (score > maxScore) {
			maxScore = score;
			winner = delimiter;
		}
	}
	if (!winner) return null;
	return maxScore >= Math.max(2, Math.ceil(names.length * 0.6)) ? winner : null;
}

export function buildHeatmapMatrix(
	rows: SeriesRows,
	valueKeys: readonly string[],
	seriesLabels: readonly string[],
): HeatmapMatrix {
	if (valueKeys.length === 0) {
		return { cells: [], rowLabels: [], colLabels: [] };
	}

	const names = rows.map((row) => String(row.name ?? "")).filter(Boolean);
	const delimiter = names.length > 0 ? pickDelimiter(names) : null;

	if (delimiter) {
		const map = new Map<string, HeatmapCellDatum>();
		for (const row of rows) {
			const rawName = String(row.name ?? "");
			if (!rawName.includes(delimiter)) continue;
			const [rowLabel, ...rest] = rawName
				.split(delimiter)
				.map((part) => part.trim())
				.filter(Boolean);
			const colBase = rest.join(delimiter).trim();
			if (!rowLabel || !colBase) continue;
			valueKeys.forEach((valueKey, index) => {
				const colLabel =
					valueKeys.length > 1
						? `${colBase} • ${seriesLabels[index] ?? `Series ${index + 1}`}`
						: colBase;
				map.set(`${rowLabel}__${colLabel}`, {
					rowLabel,
					colLabel,
					value: Number(row[valueKey]),
				});
			});
		}
		const cells = [...map.values()];
		if (cells.length > 0) {
			const rowLabels = [...new Set(cells.map((cell) => cell.rowLabel))];
			const colLabels = sortHeatmapCategoryLabels([
				...new Set(cells.map((cell) => cell.colLabel)),
			]);
			return { cells, rowLabels, colLabels };
		}
	}

	if (valueKeys.length <= 1) {
		const valueKey = valueKeys[0];
		if (!valueKey) {
			return { cells: [], rowLabels: [], colLabels: [] };
		}
		const parsedDates = rows.map((row) => {
			const raw = String(row.name ?? "");
			return /^\d{4}-\d{2}-\d{2}$/.test(raw)
				? new Date(`${raw}T00:00:00`)
				: new Date(raw);
		});
		const allDateLike =
			parsedDates.length > 0 &&
			parsedDates.every((date) => !Number.isNaN(date.getTime()));
		if (allDateLike && parsedDates.length >= 12) {
			const dayKey = (date: Date) =>
				`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
			const valueMap = new Map<string, number>();
			const dayOrder: string[] = [];
			const daySeen = new Set<string>();
			const hours = new Set<number>();
			rows.forEach((row, index) => {
				const date = parsedDates[index];
				if (!date || Number.isNaN(date.getTime())) return;
				const day = dayKey(date);
				const hour = date.getHours();
				if (!daySeen.has(day)) {
					daySeen.add(day);
					dayOrder.push(day);
				}
				hours.add(hour);
				valueMap.set(`${day}__${hour}`, Number(row[valueKey]));
			});
			const hourList = [...hours].sort((a, b) => a - b);
			if (hourList.length > 2) {
				const rowLabels = hourList.map(
					(hour) => `${String(hour).padStart(2, "0")}:00`,
				);
				const colLabels = dayOrder;
				const cells: HeatmapCellDatum[] = [];
				hourList.forEach((hour) => {
					const rowLabel = `${String(hour).padStart(2, "0")}:00`;
					dayOrder.forEach((day) => {
						cells.push({
							rowLabel,
							colLabel: day,
							value: valueMap.get(`${day}__${hour}`) ?? 0,
						});
					});
				});
				return {
					cells,
					rowLabels,
					colLabels: sortDateColLabels(colLabels),
				};
			}
		}

		const cells = rows.map((row) => ({
			rowLabel: seriesLabels[0] ?? "Value",
			colLabel: String(row.name ?? "Unknown"),
			value: Number(row[valueKey]),
		}));
		const colLabels = sortHeatmapCategoryLabels([
			...new Set(cells.map((cell) => cell.colLabel)),
		]);
		return {
			cells,
			rowLabels: [seriesLabels[0] ?? "Value"],
			colLabels,
		};
	}

	const rowLabels = valueKeys.map(
		(_, index) => seriesLabels[index] ?? `Series ${index + 1}`,
	);
	const cells: HeatmapCellDatum[] = [];
	valueKeys.forEach((valueKey, seriesIndex) => {
		const rowLabel = rowLabels[seriesIndex] ?? `Series ${seriesIndex + 1}`;
		rows.forEach((row, colIndex) => {
			cells.push({
				rowLabel,
				colLabel: String(row.name ?? `Column ${colIndex + 1}`),
				value: Number(row[valueKey]),
			});
		});
	});
	const colLabels = sortHeatmapCategoryLabels([
		...new Set(cells.map((cell) => cell.colLabel)),
	]);
	return { cells, rowLabels, colLabels };
}

function isHeatmapCalendarMatrix(matrix: HeatmapMatrix): boolean {
	return (
		matrix.rowLabels.length > 0 &&
		matrix.rowLabels.every(isHourBasedRowLabel) &&
		matrix.colLabels.some((label) => /^\d{4}-\d{2}-\d{2}$/.test(label))
	);
}

function getHeatmapLayout(matrix: HeatmapMatrix): HeatmapLayout {
	if (matrix.cells.length === 0) return "grid";
	if (isHeatmapCalendarMatrix(matrix)) return "calendar";
	if (matrix.rowLabels.length === 1 && matrix.colLabels.length > 1) {
		return "mosaic";
	}
	return "grid";
}

function transposeHeatmapMatrix(matrix: HeatmapMatrix): HeatmapMatrix {
	const cells = matrix.cells.map((cell) => ({
		rowLabel: cell.colLabel,
		colLabel: cell.rowLabel,
		value: cell.value,
	}));
	return {
		cells,
		rowLabels: [...matrix.colLabels],
		colLabels: [...matrix.rowLabels],
	};
}

export function prepareHeatmapDisplayMatrix(
	matrix: HeatmapMatrix,
	maxRows: number,
): { matrix: HeatmapMatrix; layout: HeatmapLayout } {
	let display = matrix;

	if (
		getHeatmapLayout(display) === "grid" &&
		display.colLabels.length >= HEATMAP_TRANSPOSE_COL_THRESHOLD &&
		display.colLabels.length > display.rowLabels.length * 2
	) {
		display = transposeHeatmapMatrix(display);
	}

	const layout = getHeatmapLayout(display);

	if (layout === "calendar" || layout === "grid") {
		display = condenseHeatmapRows(display, maxRows);
	}

	return { matrix: display, layout };
}

export function getHeatmapMosaicItems(
	matrix: HeatmapMatrix,
): HeatmapMosaicItem[] {
	const orderedLabels = sortHeatmapCategoryLabels([...matrix.colLabels]);
	const cellByCol = new Map(
		matrix.cells.map((cell) => [cell.colLabel, cell] as const),
	);
	return orderedLabels.map((colLabel) => {
		const cell = cellByCol.get(colLabel);
		return {
			rowLabel: cell?.rowLabel ?? matrix.rowLabels[0] ?? "",
			colLabel,
			value: cell?.value ?? 0,
			displayLabel: formatHeatmapCategoryLabel(colLabel),
		};
	});
}

export function getHeatmapMosaicColumnCount(itemCount: number): number {
	if (itemCount <= 4) return itemCount;
	if (itemCount <= 12) return Math.min(MAX_HEATMAP_MOSAIC_COLS, itemCount);
	return MAX_HEATMAP_MOSAIC_COLS;
}

function sortHeatmapCategoryLabels(labels: readonly string[]): string[] {
	const copy = [...labels];
	const allIsoDates = copy.every((label) => /^\d{4}-\d{2}-\d{2}$/.test(label));
	if (allIsoDates) {
		return copy.sort();
	}
	const allNumeric = copy.every((label) =>
		/^-?\d+(\.\d+)?$/.test(label.trim()),
	);
	if (allNumeric) {
		return copy.sort((a, b) => Number(a) - Number(b));
	}
	return copy.sort((a, b) =>
		a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
	);
}

export function formatHeatmapCategoryLabel(label: string): string {
	if (/^\d{4}-\d{2}-\d{2}$/.test(label)) {
		return formatHeatmapLabel(label);
	}
	return label;
}

function isHourLabel(label: string): boolean {
	return /^\d{2}:\d{2}$/.test(label);
}

function isHourRangeLabel(label: string): boolean {
	return /^\d{2}:\d{2}-\d{2}:\d{2}$/.test(label);
}

function isHourBasedRowLabel(label: string): boolean {
	return isHourLabel(label) || isHourRangeLabel(label);
}

function sortDateColLabels(labels: readonly string[]): string[] {
	if (!labels.every((label) => /^\d{4}-\d{2}-\d{2}$/.test(label))) {
		return [...labels];
	}
	return [...labels].sort();
}

const HEATMAP_HOUR_ANCHOR = new Date(2000, 0, 1);

let heatmapHourFormatter: Intl.DateTimeFormat | null = null;
let heatmapHourMinuteFormatter: Intl.DateTimeFormat | null = null;

function getHeatmapHourFormatter(includeMinutes: boolean): Intl.DateTimeFormat {
	if (includeMinutes) {
		if (!heatmapHourMinuteFormatter) {
			heatmapHourMinuteFormatter = new Intl.DateTimeFormat(undefined, {
				hour: "numeric",
				minute: "2-digit",
			});
		}
		return heatmapHourMinuteFormatter;
	}
	if (!heatmapHourFormatter) {
		heatmapHourFormatter = new Intl.DateTimeFormat(undefined, {
			hour: "numeric",
		});
	}
	return heatmapHourFormatter;
}

function formatHeatmapHour(hour: number, minute = 0): string {
	const date = new Date(
		HEATMAP_HOUR_ANCHOR.getFullYear(),
		HEATMAP_HOUR_ANCHOR.getMonth(),
		HEATMAP_HOUR_ANCHOR.getDate(),
		hour,
		minute,
	);
	return getHeatmapHourFormatter(minute > 0).format(date);
}

function toRangeLabel(labels: readonly string[]): string {
	if (labels.length === 0) return "";
	if (labels.length === 1) return labels[0] ?? "";
	const first = labels[0] ?? "";
	const last = labels[labels.length - 1] ?? "";
	if (isHourLabel(first) && isHourLabel(last)) return `${first}-${last}`;
	return `${first}…${last}`;
}

function condenseHeatmapRows(
	matrix: HeatmapMatrix,
	maxRows: number,
): HeatmapMatrix {
	const hourRowLimit = Math.max(maxRows, MAX_HEATMAP_HOUR_ROWS);
	if (
		matrix.rowLabels.length <= maxRows ||
		(matrix.rowLabels.every(isHourBasedRowLabel) &&
			matrix.rowLabels.length <= hourRowLimit)
	) {
		return matrix;
	}
	const bucketSize = Math.ceil(matrix.rowLabels.length / maxRows);
	const groupedRows: string[][] = [];
	for (let i = 0; i < matrix.rowLabels.length; i += bucketSize) {
		groupedRows.push(matrix.rowLabels.slice(i, i + bucketSize));
	}

	const cellMap = new Map(
		matrix.cells.map((cell) => [
			`${cell.rowLabel}__${cell.colLabel}`,
			cell.value,
		]),
	);
	const rowLabels = groupedRows.map((group) => toRangeLabel(group));
	const cells: HeatmapCellDatum[] = [];

	groupedRows.forEach((group, bucketIndex) => {
		const rowLabel = rowLabels[bucketIndex] ?? `Row ${bucketIndex + 1}`;
		matrix.colLabels.forEach((colLabel) => {
			let sum = 0;
			for (const originalRow of group) {
				sum += cellMap.get(`${originalRow}__${colLabel}`) ?? 0;
			}
			cells.push({ rowLabel, colLabel, value: sum });
		});
	});

	return {
		cells,
		rowLabels,
		colLabels: sortDateColLabels(matrix.colLabels),
	};
}

export function formatHeatmapRowLabel(label: string): string {
	const hourOnly = /^(\d{2}):(\d{2})$/.exec(label);
	if (hourOnly) {
		return formatHeatmapHour(Number(hourOnly[1]), Number(hourOnly[2]));
	}
	const hourRange = /^(\d{2}):(\d{2})-(\d{2}):(\d{2})$/.exec(label);
	if (hourRange) {
		const start = formatHeatmapHour(Number(hourRange[1]), Number(hourRange[2]));
		const end = formatHeatmapHour(Number(hourRange[3]), Number(hourRange[4]));
		return `${start}–${end}`;
	}
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
	const sortedPositive = values
		.filter((entry) => entry > 0 && Number.isFinite(entry))
		.sort((a, b) => a - b);
	return { sortedPositive };
}

function countBelow(sorted: readonly number[], value: number): number {
	let lo = 0;
	let hi = sorted.length;
	while (lo < hi) {
		const mid = (lo + hi) >> 1;
		if ((sorted[mid] ?? 0) < value) {
			lo = mid + 1;
		} else {
			hi = mid;
		}
	}
	return lo;
}

function getHeatmapIntensityLevel(
	value: number,
	scale: HeatmapIntensityScale,
): number {
	if (value <= 0 || !Number.isFinite(value)) return -1;
	const sorted = scale.sortedPositive;
	if (sorted.length === 0) return -1;
	if (sorted.length === 1) return HEATMAP_INTENSITY_LEVEL_COUNT - 1;
	const below = countBelow(sorted, value);
	const percentile = below / (sorted.length - 1);
	return Math.min(
		HEATMAP_INTENSITY_LEVEL_COUNT - 1,
		Math.floor(percentile * HEATMAP_INTENSITY_LEVEL_COUNT),
	);
}

function getHeatmapIntensityFill(
	level: number,
	intensityFills: readonly string[],
): string | null {
	if (level < 0) return null;
	return (
		intensityFills[level] ?? intensityFills[intensityFills.length - 1] ?? null
	);
}

export function getHeatmapCellColor(
	value: number,
	emptyColor: string,
	scale: HeatmapIntensityScale,
	intensityFills: readonly string[],
): string {
	const level = getHeatmapIntensityLevel(value, scale);
	return getHeatmapIntensityFill(level, intensityFills) ?? emptyColor;
}

export function sampleHeatmapAxisLabels(
	labels: readonly string[],
	maxCount: number,
): string[] {
	if (maxCount <= 0 || labels.length === 0) return [];
	if (labels.length <= maxCount) return [...labels];
	if (maxCount === 1) {
		const last = labels[labels.length - 1];
		return last !== undefined ? [last] : [];
	}
	const lastIndex = labels.length - 1;
	return Array.from({ length: maxCount }, (_, index) => {
		const labelIndex = Math.round((index * lastIndex) / (maxCount - 1));
		return labels[labelIndex] ?? "";
	});
}
