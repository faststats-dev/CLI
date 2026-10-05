import type {
	ChartFlowMetaLite,
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

export function getChartValueKeys(rows: SeriesRows): string[] {
	const keys = new Set<string>();
	for (const row of rows) {
		for (const key of Object.keys(row))
			if (VALUE_KEY_RE.test(key)) keys.add(key);
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

export function getChartSeries(
	rows: SeriesRows,
	flowMeta: ChartFlowMetaLite | null | undefined,
): ReadonlyArray<ChartSeriesDescriptor> {
	const outputDescriptors = flowMeta?.outputs ?? [];
	const metricList = outputDescriptors.flatMap((output) =>
		output.primaryMetric ? [output.primaryMetric] : [],
	);
	const breakdownLabels = getBreakdownLabels(rows);
	const dataKeys = getChartValueKeys(rows);
	const keys =
		dataKeys.length > 0
			? dataKeys
			: metricList.map((_, index) => `value_${index}`);

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

export interface PreparedBarChartData {
	readonly entries: ReadonlyArray<SeriesEntry>;
	readonly isTimeGrouped: boolean;
	readonly useDynamicColors: boolean;
}

interface LineAreaSeries {
	readonly label: string;
	readonly values: ReadonlyArray<number>;
}

export function prepareLineAreaSeries(
	rows: SeriesRows | null | undefined,
	flowMeta: ChartFlowMetaLite | null | undefined,
): ReadonlyArray<LineAreaSeries> {
	if (rows == null || rows.length === 0) {
		return [];
	}

	const descriptors = getChartSeries(rows, flowMeta);

	return descriptors.map(({ dataKey, label }) => ({
		label,
		values: rows.map((row) => Number(row[dataKey]) || 0),
	}));
}

export function prepareBarChartData(
	rows: SeriesRows | null | undefined,
	flowMeta: ChartFlowMetaLite | null | undefined,
): PreparedBarChartData {
	if (rows == null || rows.length === 0) {
		return { entries: [], isTimeGrouped: false, useDynamicColors: false };
	}
	const isTimeGrouped = flowMeta?.hasTimeGroup ?? false;

	const series = getChartSeries(rows, flowMeta);
	const metricKey = series[0]?.dataKey ?? resolveMetricKey(flowMeta);

	return {
		entries: parseSeriesEntries(rows, metricKey, { sort: "none" }),
		isTimeGrouped,
		useDynamicColors: !isTimeGrouped && series.length === 1,
	};
}
