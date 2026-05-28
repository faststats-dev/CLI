import type { MetricsLoadDashboardData200 } from "../api.ts";
import { getChartColor, resolveChartPalette } from "./chart-color-palette.ts";
import { theme } from "../ui/theme.ts";

export interface MapChartHighlight {
	readonly country: string;
	readonly color: string;
}

interface WidgetMetric {
	readonly value?: number | string;
	readonly trend?: number | string;
}

export type WidgetChartData = ReadonlyArray<ReadonlyArray<WidgetMetric>>;

export type SeriesRows = ReadonlyArray<{
	readonly name: string;
	readonly [x: string]: string | number;
}>;

type TabsChartData = {
	readonly tabs:
		| ReadonlyArray<SeriesRows>
		| Record<string, SeriesRows>;
};

export type ChartData = SeriesRows | TabsChartData | WidgetChartData;

export type ChartFlowMetaLite = NonNullable<
	MetricsLoadDashboardData200["flowMeta"]
>[string];

export interface ChartQueryConfigLite {
	readonly primaryMetric?: {
		readonly field: string;
	} | null;
	readonly metrics?: ReadonlyArray<{ readonly field: string }> | null;
	readonly visualOptions?: {
		readonly colors?: ReadonlyArray<string> | null;
		readonly widget?: {
			readonly showTrend?: boolean | null;
			readonly displayMode?: "default" | "compact" | null;
			readonly valueFormat?: "number" | "percent" | null;
		} | null;
		readonly list?: {
			readonly selectedTabIndex?: number | null;
		} | null;
	} | null;
}

export interface SeriesEntry {
	readonly name: string;
	readonly value: number;
}

const percentFormatter = new Intl.NumberFormat(undefined, {
	maximumFractionDigits: 1,
});

export function isWidgetResult(
	data: ChartData | null | undefined,
): data is WidgetChartData {
	return (
		Array.isArray(data) &&
		data.length > 0 &&
		Array.isArray(data[0])
	);
}

export function isSeriesResult(
	data: ChartData | null | undefined,
): data is SeriesRows {
	return (
		Array.isArray(data) &&
		(data.length === 0 ||
			(typeof data[0] === "object" && data[0] != null && "name" in data[0]))
	);
}

function isTabsResult(
	data: ChartData | null | undefined,
): data is TabsChartData {
	return (
		data != null &&
		typeof data === "object" &&
		"tabs" in data &&
		data.tabs != null
	);
}

export function resolveSeriesRows(
	data: ChartData | null | undefined,
	tabIndex = 0,
): SeriesRows | null {
	if (data == null) return null;
	if (isSeriesResult(data)) return data;
	if (isTabsResult(data)) {
		const tabs = data.tabs;
		if (Array.isArray(tabs)) {
			return tabs[tabIndex] ?? tabs[0] ?? null;
		}
		const values = Object.values(tabs);
		return values[tabIndex] ?? values[0] ?? null;
	}
	return null;
}

export function parseSeriesEntries(
	rows: SeriesRows | null | undefined,
	metricKey: string | null,
	options: { readonly sort?: "desc" | "none" } = {},
): ReadonlyArray<SeriesEntry> {
	if (rows == null || rows.length === 0) return [];

	const valueKey = resolveSeriesValueKey(rows[0]!, metricKey);
	if (valueKey == null) return [];

	const entries: SeriesEntry[] = [];
	for (const row of rows) {
		const value = toFiniteNumber(row[valueKey]);
		if (value == null) continue;
		entries.push({ name: row.name, value });
	}

	if (options.sort === "none") return entries;
	return entries.sort((a, b) => b.value - a.value);
}

export function bucketSeriesEntries(
	entries: ReadonlyArray<SeriesEntry>,
	columns: number,
): ReadonlyArray<SeriesEntry> {
	if (columns <= 0 || entries.length === 0) return [];
	if (entries.length <= columns) return entries;

	const bucketed: SeriesEntry[] = [];
	const bucketSize = entries.length / columns;
	for (let i = 0; i < columns; i++) {
		const start = Math.floor(i * bucketSize);
		const end = Math.floor((i + 1) * bucketSize);
		const slice = entries.slice(start, end);
		if (slice.length === 0) continue;
		const peak = Math.max(...slice.map((entry) => entry.value));
		bucketed.push({ name: slice[0]!.name, value: peak });
	}
	return bucketed;
}

export function truncateLabel(label: string, maxLength: number): string {
	if (maxLength <= 1) return label.slice(0, maxLength);
	if (label.length <= maxLength) return label;
	if (maxLength <= 3) return label.slice(0, maxLength);
	return `${label.slice(0, maxLength - 1)}…`;
}

export function resolveListTabIndex(
	queryConfig: ChartQueryConfigLite | null | undefined,
): number {
	const saved = queryConfig?.visualOptions?.list?.selectedTabIndex ?? 0;
	return saved >= 0 ? saved : 0;
}

export function toFiniteNumber(
	value:
		| number
		| string
		| "NaN"
		| "Infinity"
		| "-Infinity"
		| null
		| undefined,
): number | null {
	if (value == null) return null;
	if (typeof value === "string") {
		const parsed = Number(value);
		return Number.isFinite(parsed) ? parsed : null;
	}
	if (typeof value !== "number" || !Number.isFinite(value)) {
		return null;
	}
	return value;
}

export function formatWidgetValue(
	value: number | null | undefined,
	format: "number" | "percent" = "number",
): string {
	if (value == null || !Number.isFinite(value)) {
		return "—";
	}

	if (format === "percent") {
		return `${percentFormatter.format(value)}%`;
	}

	if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
	if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
	return value.toLocaleString();
}

export function formatWidgetTrend(trend: number): {
	readonly text: string;
	readonly color: string;
	readonly prefix: string;
} {
	if (!Number.isFinite(trend) || trend === 0) {
		return { text: "0%", color: theme.textMuted, prefix: "" };
	}
	if (trend > 0) {
		const pct =
			trend >= 10 ? trend.toFixed(0) : percentFormatter.format(trend);
		return { text: `${pct}%`, color: theme.success, prefix: "+" };
	}
	const abs = Math.abs(trend);
	const pct = abs >= 10 ? abs.toFixed(0) : percentFormatter.format(abs);
	return { text: `${pct}%`, color: theme.danger, prefix: "" };
}

export function resolveMetricLabel(
	queryConfig: ChartQueryConfigLite | null | undefined,
	fallback = "Value",
): string {
	return resolveMetricKey(queryConfig) ?? fallback;
}

export function resolveMetricKey(
	queryConfig: ChartQueryConfigLite | null | undefined,
): string | null {
	if (!queryConfig) return null;
	const primary = queryConfig.primaryMetric?.field;
	if (primary) return primary;
	const first = queryConfig.metrics?.[0]?.field;
	return first ?? null;
}

function resolveSeriesValueKey(
	row: { readonly [x: string]: string | number },
	preferredKey: string | null,
): string | null {
	if ("value" in row && toFiniteNumber(row.value) != null) {
		return "value";
	}
	if (preferredKey != null) {
		if (toFiniteNumber(row[preferredKey]) != null) {
			return preferredKey;
		}
	}
	for (const [key, value] of Object.entries(row)) {
		if (key === "name") continue;
		if (toFiniteNumber(value) != null) return key;
	}
	return null;
}

export interface MapHighlightOptions {
	readonly chartColors?: ReadonlyArray<string> | null;
	readonly preferredChartColors?: ReadonlyArray<string> | null;
}

export function seriesToMapHighlights(
	rows: ReadonlyArray<{
		readonly name: string;
		readonly [x: string]: string | number;
	}>,
	metricKey: string | null,
	options: MapHighlightOptions = {},
): ReadonlyArray<MapChartHighlight> {
	if (rows.length === 0) return [];

	const valueKey = resolveSeriesValueKey(rows[0]!, metricKey);
	if (valueKey == null) return [];

	const values: number[] = [];
	const entries: Array<{ country: string; value: number }> = [];

	for (const row of rows) {
		const raw = row[valueKey];
		const value = toFiniteNumber(raw);
		if (value == null) continue;
		values.push(value);
		entries.push({ country: row.name, value });
	}

	if (entries.length === 0) return [];

	const min = Math.min(...values);
	const max = Math.max(...values);
	const palette = resolveChartPalette(
		options.chartColors,
		options.preferredChartColors,
	);
	const fillColor = getChartColor(palette, 1);

	return entries.map((entry) => ({
		country: entry.country,
		color: valueToMapFillColor(entry.value, min, max, fillColor),
	}));
}

function valueToMapFillColor(
	value: number,
	min: number,
	max: number,
	fillColor: string,
): string {
	const opacity =
		min === max ? 1 : 0.2 + ((value - min) * 0.8) / (max - min);
	return blendWithBackground(fillColor, opacity);
}

function blendWithBackground(hex: string, alpha: number): string {
	const r = Number.parseInt(hex.slice(1, 3), 16);
	const g = Number.parseInt(hex.slice(3, 5), 16);
	const b = Number.parseInt(hex.slice(5, 7), 16);
	const bg = theme.surface;
	const bgR = Number.parseInt(bg.slice(1, 3), 16);
	const bgG = Number.parseInt(bg.slice(3, 5), 16);
	const bgB = Number.parseInt(bg.slice(5, 7), 16);
	const mix = (c: number, bgC: number) =>
		Math.round(c * alpha + bgC * (1 - alpha));
	const toHex = (n: number) => n.toString(16).padStart(2, "0");
	return `#${toHex(mix(r, bgR))}${toHex(mix(g, bgG))}${toHex(mix(b, bgB))}`;
}
