import type {
	ChartFlowMetaLite,
	ChartQueryConfig,
	SeriesEntry,
} from "./chart-data.ts";

const regionNames = new Intl.DisplayNames("en", { type: "region" });

function getCountryName(code: string): string {
	try {
		return regionNames.of(code.trim().toUpperCase()) ?? code;
	} catch {
		return code;
	}
}

function isCountryChart(
	flowMeta: ChartFlowMetaLite | null | undefined,
	queryConfig: ChartQueryConfig | null | undefined,
	chartName: string | null | undefined,
	tabIndex: number,
): boolean {
	const tab = flowMeta?.outputs?.[tabIndex];
	const groupField =
		tab?.groupField ??
		queryConfig?.dimensions?.find((d) => d.role === "group")?.field;

	return (
		groupField === "country" ||
		groupField === "internal:country" ||
		groupField?.toLowerCase().includes("country") === true ||
		(chartName?.toLowerCase().includes("country") ?? false)
	);
}

export function formatEntryNames(
	entries: ReadonlyArray<SeriesEntry>,
	flowMeta: ChartFlowMetaLite | null | undefined,
	queryConfig: ChartQueryConfig | null | undefined,
	chartName: string | null | undefined,
	tabIndex = 0,
): ReadonlyArray<SeriesEntry> {
	if (!isCountryChart(flowMeta, queryConfig, chartName, tabIndex)) {
		return entries;
	}
	return entries.map((entry) => ({
		...entry,
		name: getCountryName(entry.name),
	}));
}
