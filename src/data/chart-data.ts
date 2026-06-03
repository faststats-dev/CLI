import type {
	ChartsListCharts200,
	MetricsLoadDashboardData200,
} from "../api.ts";
import { theme } from "../ui/theme.ts";
import {
	blendHexOnBackground,
	getChartColor,
	resolveChartPalette,
} from "./chart-color-palette.ts";

export interface MapChartHighlight {
	readonly country: string;
	readonly color: string;
}

export interface WidgetMetric {
	readonly value?: number | string;
	readonly trend?: number | string;
}

export type SeriesRows = ReadonlyArray<{
	readonly name: string;
	readonly [x: string]: string | number;
}>;

type TabsChartData = {
	readonly tabs: ReadonlyArray<SeriesRows> | Record<string, SeriesRows>;
};

export type ChartData =
	| SeriesRows
	| TabsChartData
	| WidgetMetric
	| ReadonlyArray<WidgetMetric>
	| ReadonlyArray<ReadonlyArray<WidgetMetric>>;

export type ChartFlowMetaLite = NonNullable<
	MetricsLoadDashboardData200["flowMeta"]
>[string];

export type ChartQueryConfig = NonNullable<
	ChartsListCharts200[number]["queryConfig"]
>;

export type DashboardChart = ChartsListCharts200[number] & {
	readonly data: ChartData | null;
	readonly flowMeta: ChartFlowMetaLite | null;
};

export const mergeDashboardCharts = (
	charts: ChartsListCharts200,
	metrics: MetricsLoadDashboardData200,
): ReadonlyArray<DashboardChart> =>
	charts.map((chart) => ({
		...chart,
		data: (metrics.charts[chart.id] as ChartData | undefined) ?? null,
		flowMeta: metrics.flowMeta?.[chart.id] ?? null,
	}));

export interface SeriesEntry {
	readonly name: string;
	readonly value: number;
}

const percentFormatter = new Intl.NumberFormat(undefined, {
	maximumFractionDigits: 1,
});
const numberFormatter = new Intl.NumberFormat();
const NUMERIC_PREFIX_PATTERN = /^([+-]?\d+(?:\.\d+)?)(.*)$/;

function isWidgetMetric(value: unknown): value is WidgetMetric {
	return (
		typeof value === "object" &&
		value != null &&
		"value" in value &&
		!("name" in value)
	);
}

export function resolveWidgetMetric(
	data: ChartData | null | undefined,
): WidgetMetric | null {
	if (!Array.isArray(data)) return isWidgetMetric(data) ? data : null;
	const first = data[0];
	const metric = Array.isArray(first) ? first[0] : first;
	return isWidgetMetric(metric) ? metric : null;
}

export function resolveSeriesRows(
	data: ChartData | null | undefined,
	tabIndex = 0,
): SeriesRows | null {
	if (data == null) return null;
	if (Array.isArray(data)) return data;
	if ("tabs" in data) {
		const tabs = Array.isArray(data.tabs)
			? data.tabs
			: Object.values(data.tabs);
		return tabs[tabIndex] ?? tabs[0] ?? null;
	}
	return null;
}

function rowsToEntries(
	rows: SeriesRows,
	metricKey: string | null,
): SeriesEntry[] {
	const valueKey = rows[0] ? resolveSeriesValueKey(rows[0], metricKey) : null;
	if (valueKey == null) return [];
	const entries: SeriesEntry[] = [];
	for (const row of rows) {
		const value = Number(row[valueKey]);
		if (Number.isFinite(value)) entries.push({ name: row.name, value });
	}
	return entries;
}

export function parseSeriesEntries(
	rows: SeriesRows | null,
	metricKey: string | null,
	options: { readonly sort?: "desc" | "none" } = {},
): ReadonlyArray<SeriesEntry> {
	if (rows == null) return [];
	const entries = rowsToEntries(rows, metricKey);
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
		bucketed.push({ name: slice[0]?.name ?? "", value: peak });
	}
	return bucketed;
}

export function truncateLabel(label: string, maxLength: number): string {
	if (label.length <= maxLength) return label;
	if (maxLength <= 3) return label.slice(0, maxLength);
	return `${label.slice(0, maxLength - 1)}…`;
}

export function resolveListTabIndex(
	queryConfig: ChartQueryConfig | null | undefined,
): number {
	const saved = queryConfig?.visualOptions?.list?.selectedTabIndex ?? 0;
	const index = Number(saved);
	return Number.isFinite(index) && index >= 0 ? index : 0;
}

function formatNumber(value: number, format: "number" | "percent"): string {
	return format === "percent"
		? `${percentFormatter.format(value)}%`
		: numberFormatter.format(value);
}

export function formatWidgetValue(
	value: string | number | null | undefined,
	format: "number" | "percent" = "number",
): string {
	if (value == null || value === "") return "—";
	if (typeof value === "number") {
		return Number.isFinite(value) ? formatNumber(value, format) : "—";
	}
	const match = value.match(NUMERIC_PREFIX_PATTERN);
	if (!match) return value;
	const numericValue = Number(match[1]);
	if (!Number.isFinite(numericValue)) return value;
	return `${formatNumber(numericValue, format)}${match[2] ?? ""}`;
}

export function formatWidgetTrend(trend: number): {
	readonly text: string;
	readonly color: string;
	readonly arrow: string;
} {
	if (!Number.isFinite(trend) || trend === 0) {
		return { text: "0%", color: theme.textMuted, arrow: "→" };
	}
	const abs = Math.abs(trend);
	const text = `${abs >= 10 ? abs.toFixed(0) : percentFormatter.format(abs)}%`;
	return trend > 0
		? { text, color: theme.success, arrow: "▲" }
		: { text, color: theme.danger, arrow: "▼" };
}

export function resolveMetricKey(
	queryConfig: ChartQueryConfig | null | undefined,
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
	if (Number.isFinite(Number(row.value))) return "value";
	if (preferredKey != null && Number.isFinite(Number(row[preferredKey]))) {
		return preferredKey;
	}
	for (const [key, value] of Object.entries(row)) {
		if (key !== "name" && Number.isFinite(Number(value))) return key;
	}
	return null;
}

export interface MapHighlightOptions {
	readonly chartColors?: ReadonlyArray<string> | null;
	readonly preferredChartColors?: ReadonlyArray<string> | null;
}

export function seriesToMapHighlights(
	rows: SeriesRows,
	metricKey: string | null,
	options: MapHighlightOptions = {},
): ReadonlyArray<MapChartHighlight> {
	const entries = rowsToEntries(rows, metricKey);
	if (entries.length === 0) return [];

	const values = entries.map((entry) => entry.value);
	const min = Math.min(...values);
	const max = Math.max(...values);
	const palette = resolveChartPalette(
		options.chartColors,
		options.preferredChartColors,
	);
	const fillColor = getChartColor(palette, 1);

	return entries.map((entry) => {
		const opacity =
			min === max ? 1 : 0.2 + ((entry.value - min) * 0.8) / (max - min);
		return {
			country: entry.name,
			color: blendHexOnBackground(fillColor, theme.surface, opacity),
		};
	});
}
