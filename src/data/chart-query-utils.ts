import type {
    ChartFlowMetaLite,
    ChartQueryConfigLite,
    SeriesEntry,
    SeriesRows,
} from "./chart-data.ts";
import { parseSeriesEntries, resolveMetricKey } from "./chart-data.ts";

const VALUE_KEY_RE = /^value_(\d+)$/;
const SERIES_KEY_RE = /^series_(\d+)$/;

interface ChartSeriesDescriptor {
	readonly dataKey: string;
	readonly label: string;
}

function getChartValueKeys(rows: SeriesRows): string[] {
	const keys = new Set<string>();
	for (const row of rows) {
		for (const key of Object.keys(row)) {
			if (VALUE_KEY_RE.test(key)) keys.add(key);
		}
	}
	return [...keys].sort(
		(left, right) =>
			Number(VALUE_KEY_RE.exec(left)?.[1] ?? 0) -
			Number(VALUE_KEY_RE.exec(right)?.[1] ?? 0),
	);
}

function getBreakdownLabels(rows: SeriesRows): Map<string, string> {
	const labels = new Map<string, string>();
	for (const row of rows) {
		for (const [key, value] of Object.entries(row)) {
			const match = SERIES_KEY_RE.exec(key);
			if (match && typeof value === "string" && value.length > 0) {
				labels.set(`value_${match[1]}`, value);
			}
		}
	}
	return labels;
}

function getChartSeries({
	rows,
	metrics,
	outputDescriptors = [],
}: {
	readonly rows: SeriesRows;
	readonly metrics: ChartQueryConfigLite["metrics"];
	readonly outputDescriptors?: ChartFlowMetaLite["outputs"];
}): ReadonlyArray<ChartSeriesDescriptor> {
	const breakdownLabels = getBreakdownLabels(rows);
	const dataKeys = getChartValueKeys(rows);
	const metricList = metrics ?? [];
	const keys =
		dataKeys.length > 0 ? dataKeys : metricList.map((_, index) => `value_${index}`);

	return keys.map((dataKey, index) => {
		const descriptor = outputDescriptors[index];
		const metric = metricList[index];
		const label =
			breakdownLabels.get(dataKey) ??
			descriptor?.explicitName ??
			(outputDescriptors.length > 1 ? descriptor?.name : undefined) ??
			metric?.field ??
			`Series ${index + 1}`;
		return { dataKey, label };
	});
}

function pivotScalarMultiOutputToCategories({
	rows,
	metrics = [],
	outputDescriptors = [],
}: {
	readonly rows: SeriesRows;
	readonly metrics?: ChartQueryConfigLite["metrics"];
	readonly outputDescriptors?: ChartFlowMetaLite["outputs"];
}): SeriesRows | null {
	const series = getChartSeries({ rows, metrics, outputDescriptors });
	if (rows.length !== 1 || series.length <= 1) return null;

	const sourceRow = rows[0]!;
	return series.map((entry) => {
		return {
			name: entry.label,
			value: Number(sourceRow[entry.dataKey]),
			value_0: Number(sourceRow[entry.dataKey]),
		};
	});
}

export interface PreparedBarChartData {
	readonly entries: ReadonlyArray<SeriesEntry>;
	readonly isTimeGrouped: boolean;
	readonly useDynamicColors: boolean;
}

interface PreparedLineAreaSeries {
	readonly label: string;
	readonly values: ReadonlyArray<number>;
}

export interface PreparedLineAreaChartData {
	readonly series: ReadonlyArray<PreparedLineAreaSeries>;
}

export function prepareLineAreaChartData(
	rows: SeriesRows | null | undefined,
	queryConfig: ChartQueryConfigLite | null | undefined,
	flowMeta: ChartFlowMetaLite | null | undefined,
): PreparedLineAreaChartData {
	if (rows == null || rows.length === 0) {
		return { series: [] };
	}

	const outputDescriptors = flowMeta?.outputs ?? [];
	const descriptors = getChartSeries({
		rows,
		metrics: queryConfig?.metrics ?? [],
		outputDescriptors,
	});

	return {
		series: descriptors.map(({ dataKey, label }) => ({
			label,
			values: rows.map((row) => Number(row[dataKey]) ?? 0),
		})),
	};
}

export function prepareBarChartData(
	rows: SeriesRows | null | undefined,
	queryConfig: ChartQueryConfigLite | null | undefined,
	flowMeta: ChartFlowMetaLite | null | undefined,
): PreparedBarChartData {
	if (rows == null || rows.length === 0) {
		return { entries: [], isTimeGrouped: false, useDynamicColors: false };
	}

	const isTimeGrouped = flowMeta?.hasTimeGroup ?? false;
	const outputDescriptors = flowMeta?.outputs ?? [];
	const metrics = queryConfig?.metrics ?? [];

	const pivoted =
		!isTimeGrouped &&
		pivotScalarMultiOutputToCategories({
			rows,
			metrics,
			outputDescriptors,
		});

	if (pivoted) {
		return {
			entries: pivoted.map((row) => ({
				name: String(row.name),
				value: Number(row.value_0 ?? row.value),
			})),
			isTimeGrouped: false,
			useDynamicColors: true,
		};
	}

	const chartRows = rows;
	const series = getChartSeries({
		rows: chartRows,
		metrics,
		outputDescriptors,
	});
	const metricKey = series[0]?.dataKey ?? resolveMetricKey(queryConfig);

	return {
		entries: parseSeriesEntries(chartRows, metricKey, { sort: "none" }),
		isTimeGrouped,
		useDynamicColors: !isTimeGrouped && series.length === 1,
	};
}
