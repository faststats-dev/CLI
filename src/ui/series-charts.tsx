import { createMemo, For, Show } from "solid-js";
import { getChartColor, resolveChartPalette } from "../data/chart-color-palette.ts";
import {
	parseSeriesEntries,
	resolveListTabIndex,
	resolveMetricKey,
	resolveSeriesRows,
	truncateLabel,
} from "../data/chart-data.ts";
import { prepareBarChartData, prepareLineAreaChartData } from "../data/chart-query-utils.ts";
import {
	renderCategoricalBarRows,
	renderVerticalBarLines,
} from "./chart-text-render.ts";
import { ChartEmptyState, type SeriesChartProps } from "./list-chart.tsx";
import { LineAreaChartView } from "./line-area-chart.tsx";
import { resolveLineAreaSeriesStyle } from "./line-area-chart-renderer.ts";
import { theme } from "./theme.ts";
import type { ChartFlowMetaLite } from "../data/chart-data.ts";

export interface BarChartProps extends SeriesChartProps {
	readonly preferredChartColors: ReadonlyArray<string> | null;
	readonly flowMeta: ChartFlowMetaLite | null;
}

export function BarChart(props: BarChartProps) {
	const prepared = createMemo(() => {
		const rows = resolveSeriesRows(
			props.data,
			resolveListTabIndex(props.queryConfig),
		);
		return prepareBarChartData(rows, props.queryConfig, props.flowMeta);
	});
	const categoryPalette = createMemo(() => {
		const { entries, useDynamicColors } = prepared();
		if (!useDynamicColors) return [];
		return resolveChartPalette(
			props.queryConfig?.visualOptions?.colors,
			props.preferredChartColors,
			Math.max(entries.length, 1),
		);
	});
	const coloredRows = createMemo(() => {
		const { entries, useDynamicColors } = prepared();
		if (!useDynamicColors) return [];
		return renderCategoricalBarRows(
			entries,
			Math.max(1, props.innerWidth),
			Math.max(2, props.innerHeight),
			categoryPalette(),
		);
	});
	const lines = createMemo(() => {
		const { entries, isTimeGrouped, useDynamicColors } = prepared();
		if (useDynamicColors) return [];
		return renderVerticalBarLines(
			entries,
			Math.max(1, props.innerWidth),
			Math.max(2, props.innerHeight),
			{ isTimeGrouped },
		);
	});
	const axisStart = createMemo(() => lines().length - (props.innerHeight >= 4 ? 2 : 1));

	return (
		<Show
			when={prepared().entries.length > 0}
			fallback={<ChartEmptyState message="No data" />}
		>
			<Show
				when={prepared().useDynamicColors}
				fallback={
					<box flexDirection="column" width="100%" height="100%" minHeight={0}>
						<For each={lines()}>
							{(line, index) => (
								<text
									fg={index() >= axisStart() ? theme.textMuted : props.accent}
									height={1}
									flexShrink={0}
								>
									{line}
								</text>
							)}
						</For>
					</box>
				}
			>
				<box flexDirection="column" width="100%" height="100%" minHeight={0}>
					<For each={coloredRows()}>
						{(row) => (
							<box flexDirection="row" height={1} width="100%" flexShrink={0}>
								<For each={row.segments}>
									{(segment) => (
										<text fg={segment.color} flexShrink={0}>
											{segment.text}
										</text>
									)}
								</For>
							</box>
						)}
					</For>
				</box>
			</Show>
		</Show>
	);
}

export interface PieChartProps extends SeriesChartProps {
	readonly preferredChartColors: ReadonlyArray<string> | null;
}

export function PieChart(props: PieChartProps) {
	const entries = createMemo(() => {
		const tabIndex = resolveListTabIndex(props.queryConfig);
		const rows = resolveSeriesRows(props.data, tabIndex);
		return parseSeriesEntries(rows, resolveMetricKey(props.queryConfig));
	});
	const palette = createMemo(() =>
		resolveChartPalette(
			props.queryConfig?.visualOptions?.colors,
			props.preferredChartColors,
			Math.max(entries().length, 2),
		),
	);
	const total = createMemo(() =>
		entries().reduce((sum, item) => sum + item.value, 0),
	);
	const legend = createMemo(() =>
		entries().slice(0, Math.max(1, props.innerHeight)).map((entry, index) => ({
			entry,
			color: getChartColor(palette(), index),
			share: total() === 0 ? 0 : (entry.value / total()) * 100,
		})),
	);
	const stacked = createMemo(() => {
		const width = Math.max(1, props.innerWidth);
		if (total() <= 0) return "";
		let line = "";
		for (const item of legend()) {
			const chars = Math.max(1, Math.round((item.share / 100) * width));
			line += "█".repeat(chars);
		}
		return line.slice(0, width);
	});

	return (
		<Show
			when={entries().length > 0}
			fallback={<ChartEmptyState message="No data" />}
		>
			<box flexDirection="column" width="100%" height="100%" minHeight={0}>
				<Show when={props.innerHeight >= 2}>
					<text fg={props.accent} height={1} flexShrink={0}>
						{stacked()}
					</text>
				</Show>
				<For each={legend()}>
					{(item) => (
						<box flexDirection="row" height={1} width="100%" flexShrink={0}>
							<text fg={item.color} flexShrink={0}>
								{"● "}
							</text>
							<text fg={theme.text} flexGrow={1} flexShrink={1}>
								{truncateLabel(
									item.entry.name,
									Math.max(6, props.innerWidth - 10),
								)}
							</text>
							<text fg={theme.textMuted} flexShrink={0}>
								{`${item.share.toFixed(0)}%`}
							</text>
						</box>
					)}
				</For>
			</box>
		</Show>
	);
}

export interface LineAreaChartProps extends SeriesChartProps {
	readonly chartType: "line" | "area";
	readonly preferredChartColors: ReadonlyArray<string> | null;
	readonly flowMeta: ChartFlowMetaLite | null;
}

export function LineAreaChart(props: LineAreaChartProps) {
	const prepared = createMemo(() => {
		const tabIndex = resolveListTabIndex(props.queryConfig);
		const rows = resolveSeriesRows(props.data, tabIndex);
		return prepareLineAreaChartData(rows, props.queryConfig, props.flowMeta);
	});
	const palette = createMemo(() =>
		resolveChartPalette(
			props.queryConfig?.visualOptions?.colors,
			props.preferredChartColors,
			Math.max(prepared().series.length, 1),
		),
	);
	const styledSeries = createMemo(() =>
		prepared().series.map((entry, index) => {
			const lineColor =
				getChartColor(palette(), index) ?? props.accent;
			const colors = resolveLineAreaSeriesStyle(lineColor);
			return {
				label: entry.label,
				values: entry.values,
				lineColor: colors.lineColor,
				fillColor: colors.fillColor,
			};
		}),
	);
	const showLegend = createMemo(() => styledSeries().length > 1);
	const plotHeight = createMemo(() =>
		Math.max(1, props.innerHeight - (showLegend() ? 1 : 0)),
	);
	const pointCount = createMemo(() => styledSeries()[0]?.values.length ?? 0);

	return (
		<Show
			when={pointCount() > 1 && styledSeries().length > 0}
			fallback={<ChartEmptyState message="Not enough data" />}
		>
			<box flexDirection="column" width="100%" height="100%" minHeight={0}>
				<Show when={showLegend()}>
					<box flexDirection="row" height={1} width="100%" flexShrink={0}>
						<For each={styledSeries()}>
							{(item) => (
								<box flexDirection="row" flexShrink={1} minWidth={0}>
									<text fg={item.lineColor} flexShrink={0}>
										{"● "}
									</text>
									<text fg={theme.textMuted} flexShrink={1}>
										{truncateLabel(
											item.label,
											Math.max(
												4,
												Math.floor(
													(props.innerWidth - styledSeries().length * 2) /
														styledSeries().length,
												),
											),
										)}
									</text>
								</box>
							)}
						</For>
					</box>
				</Show>
				<LineAreaChartView
					series={styledSeries()}
					innerWidth={props.innerWidth}
					innerHeight={plotHeight()}
					area={props.chartType === "area"}
				/>
			</box>
		</Show>
	);
}
