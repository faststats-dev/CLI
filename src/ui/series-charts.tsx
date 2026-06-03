import { createMemo, For, Show } from "solid-js";
import {
	getChartColor,
	resolveChartPalette,
} from "../data/chart-color-palette.ts";
import {
	parseSeriesEntries,
	resolveMetricKey,
	resolveSeriesRows,
	truncateLabel,
} from "../data/chart-data.ts";
import {
	prepareBarChartData,
	prepareLineAreaChartData,
} from "../data/chart-query-utils.ts";
import { formatEntryNames } from "../data/countries.ts";
import {
	axisGutterWidth,
	buildBoundsTicks,
	computeNiceBounds,
	formatAxisValue,
	YAxis,
} from "./chart-axis.tsx";
import { ChartEmptyState, type SeriesChartProps } from "./chart-shared.tsx";
import { LineAreaChartView } from "./line-area-chart.tsx";
import { PieChartView } from "./pie-chart.tsx";
import {
	renderCategoricalBarRows,
	renderVerticalBarLines,
} from "./utils/chart-text-render.ts";
import { resolveLineAreaSeriesStyle } from "./utils/line-area-chart-renderer.ts";
import { theme } from "./utils/theme.ts";

export interface BarChartProps extends SeriesChartProps {
	readonly preferredChartColors: ReadonlyArray<string> | null;
}

export function BarChart(props: BarChartProps) {
	const prepared = createMemo(() => {
		const tabIndex =
			props.queryConfig?.visualOptions?.list?.selectedTabIndex ?? 0;
		const rows = resolveSeriesRows(props.data, tabIndex);
		const preparedData = prepareBarChartData(
			rows,
			props.queryConfig,
			props.flowMeta,
		);
		return {
			...preparedData,
			entries: formatEntryNames(
				preparedData.entries,
				props.flowMeta,
				props.queryConfig,
				props.chartName,
				tabIndex,
			),
		};
	});
	const maxValue = createMemo(() =>
		prepared().entries.reduce((max, entry) => Math.max(max, entry.value), 0),
	);
	const layout = createMemo(() => {
		const height = Math.max(2, props.innerHeight);
		const labelRows = !prepared().isTimeGrouped && height >= 4 ? 1 : 0;
		const plotRows = Math.max(1, height - labelRows - 1);
		const totalRows = plotRows + 1 + labelRows;
		return { plotRows, totalRows };
	});
	const ticks = createMemo(() => {
		const { plotRows, totalRows } = layout();
		const result = Array.from({ length: totalRows }, () => "");
		result[0] = formatAxisValue(maxValue());
		result[plotRows] = "0";
		if (plotRows >= 5) {
			result[Math.floor(plotRows / 2)] = formatAxisValue(maxValue() / 2);
		}
		return result;
	});
	const gutterWidth = createMemo(() => axisGutterWidth(ticks()));
	const chartWidth = createMemo(() => {
		const gutter = gutterWidth();
		return Math.max(1, props.innerWidth - (gutter > 0 ? gutter + 1 : 0));
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
			chartWidth(),
			Math.max(2, props.innerHeight),
			categoryPalette(),
		);
	});
	const lines = createMemo(() => {
		const { entries, isTimeGrouped, useDynamicColors } = prepared();
		if (useDynamicColors) return [];
		return renderVerticalBarLines(
			entries,
			chartWidth(),
			Math.max(2, props.innerHeight),
			{
				isTimeGrouped,
			},
		);
	});
	const axisStart = createMemo(
		() => lines().length - (props.innerHeight >= 4 ? 2 : 1),
	);

	return (
		<Show
			when={prepared().entries.length > 0}
			fallback={<ChartEmptyState message="No data" />}
		>
			<box flexDirection="row" width="100%" height="100%" minHeight={0}>
				<Show when={gutterWidth() > 0}>
					<YAxis ticks={ticks()} width={gutterWidth()} />
				</Show>
				<Show
					when={prepared().useDynamicColors}
					fallback={
						<box flexDirection="column" flexGrow={1} minHeight={0} minWidth={0}>
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
					<box flexDirection="column" flexGrow={1} minHeight={0} minWidth={0}>
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
			</box>
		</Show>
	);
}

export interface PieChartProps extends SeriesChartProps {
	readonly preferredChartColors: ReadonlyArray<string> | null;
}

interface PieLegendItem {
	readonly name: string;
	readonly value: number;
	readonly color: string;
	readonly share: number;
}

export function PieChart(props: PieChartProps) {
	const entries = createMemo(() => {
		const tabIndex =
			props.queryConfig?.visualOptions?.list?.selectedTabIndex ?? 0;
		const rows = resolveSeriesRows(props.data, tabIndex);
		return formatEntryNames(
			parseSeriesEntries(rows, resolveMetricKey(props.queryConfig)),
			props.flowMeta,
			props.queryConfig,
			props.chartName,
			tabIndex,
		);
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
	const legend = createMemo<ReadonlyArray<PieLegendItem>>(() =>
		entries()
			.slice(0, Math.max(1, props.innerHeight))
			.map((entry, index) => ({
				name: entry.name,
				value: entry.value,
				color: getChartColor(palette(), index),
				share: total() === 0 ? 0 : (entry.value / total()) * 100,
			})),
	);
	const slices = createMemo(() =>
		legend().map((item) => ({ color: item.color, value: item.value })),
	);
	const pieWidth = createMemo(() => {
		if (props.innerHeight < 5 || props.innerWidth < 26) return 0;
		const square = props.innerHeight * 2;
		const maxForLegend = props.innerWidth - 16;
		return Math.min(square, maxForLegend);
	});
	const showPie = () => pieWidth() >= 8;
	const stackedSegments = createMemo(() => {
		const width = Math.max(1, props.innerWidth);
		const items = legend();
		if (total() <= 0 || items.length === 0) return [];

		const segments: Array<{ color: string; chars: number }> = [];
		let used = 0;
		items.forEach((item, index) => {
			const remaining = width - used;
			if (remaining <= 0) return;
			const chars =
				index === items.length - 1
					? remaining
					: Math.min(
							remaining,
							Math.max(1, Math.round((item.share / 100) * width)),
						);
			segments.push({ color: item.color, chars });
			used += chars;
		});
		return segments;
	});

	return (
		<Show
			when={entries().length > 0}
			fallback={<ChartEmptyState message="No data" />}
		>
			<Show
				when={showPie()}
				fallback={
					<box flexDirection="column" width="100%" height="100%" minHeight={0}>
						<Show when={props.innerHeight >= 2}>
							<box flexDirection="row" height={1} width="100%" flexShrink={0}>
								<For each={stackedSegments()}>
									{(segment) => (
										<text fg={segment.color} flexShrink={0}>
											{"█".repeat(segment.chars)}
										</text>
									)}
								</For>
							</box>
						</Show>
						<PieLegend
							items={legend()}
							labelWidth={Math.max(6, props.innerWidth - 10)}
						/>
					</box>
				}
			>
				<box flexDirection="row" width="100%" height="100%" minHeight={0}>
					<box width={pieWidth()} height="100%" flexShrink={0}>
						<PieChartView
							slices={slices()}
							innerWidth={pieWidth()}
							innerHeight={props.innerHeight}
						/>
					</box>
					<box
						flexDirection="column"
						flexGrow={1}
						minWidth={0}
						marginLeft={2}
						justifyContent="center"
					>
						<PieLegend
							items={legend()}
							labelWidth={Math.max(6, props.innerWidth - pieWidth() - 8)}
						/>
					</box>
				</box>
			</Show>
		</Show>
	);
}

function PieLegend(props: {
	items: ReadonlyArray<PieLegendItem>;
	labelWidth: number;
}) {
	return (
		<For each={props.items}>
			{(item) => (
				<box flexDirection="row" height={1} width="100%" flexShrink={0}>
					<text fg={item.color} flexShrink={0}>
						{"● "}
					</text>
					<text fg={theme.text} flexGrow={1} flexShrink={1}>
						{truncateLabel(item.name, props.labelWidth)}
					</text>
					<text fg={theme.textMuted} flexShrink={0}>
						{`${item.share.toFixed(0)}%`}
					</text>
				</box>
			)}
		</For>
	);
}

export interface LineAreaChartProps extends SeriesChartProps {
	readonly chartType: "line" | "area";
	readonly preferredChartColors: ReadonlyArray<string> | null;
}

export function LineAreaChart(props: LineAreaChartProps) {
	const prepared = createMemo(() => {
		const tabIndex =
			props.queryConfig?.visualOptions?.list?.selectedTabIndex ?? 0;
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
			const lineColor = getChartColor(palette(), index);
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
	const bounds = createMemo(() => {
		const values = styledSeries().flatMap((entry) => entry.values);
		if (values.length === 0) return { min: 0, max: 1, step: 1 };
		return computeNiceBounds(Math.min(...values), Math.max(...values));
	});
	const ticks = createMemo(() => buildBoundsTicks(bounds(), plotHeight()));
	const gutterWidth = createMemo(() => axisGutterWidth(ticks()));
	const chartWidth = createMemo(() => {
		const gutter = gutterWidth();
		return Math.max(1, props.innerWidth - (gutter > 0 ? gutter + 1 : 0));
	});

	return (
		<Show
			when={pointCount() > 1 && styledSeries().length > 0}
			fallback={<ChartEmptyState message="Not enough data" />}
		>
			<box flexDirection="column" width="100%" height="100%" minHeight={0}>
				<Show when={showLegend()}>
					<box
						flexDirection="row"
						height={1}
						width="100%"
						flexShrink={0}
						justifyContent="flex-end"
					>
						<For each={styledSeries()}>
							{(item, index) => (
								<box
									flexDirection="row"
									flexShrink={1}
									minWidth={0}
									marginLeft={index() === 0 ? 0 : 2}
								>
									<text fg={item.lineColor} flexShrink={0}>
										{"▬ "}
									</text>
									<text fg={theme.text} flexShrink={1}>
										{truncateLabel(
											item.label,
											Math.max(
												4,
												Math.floor(
													(props.innerWidth - styledSeries().length * 4) /
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
				<box flexDirection="row" flexGrow={1} width="100%" minHeight={0}>
					<Show when={gutterWidth() > 0}>
						<YAxis ticks={ticks()} width={gutterWidth()} />
					</Show>
					<box flexGrow={1} minWidth={0} minHeight={0}>
						<LineAreaChartView
							series={styledSeries()}
							innerWidth={chartWidth()}
							innerHeight={plotHeight()}
							area={props.chartType === "area"}
							bounds={bounds()}
						/>
					</box>
				</box>
			</box>
		</Show>
	);
}
