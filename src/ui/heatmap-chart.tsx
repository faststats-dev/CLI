import { createMemo, For, Show } from "solid-js";
import {
	buildHeatmapIntensityFills,
	getChartColor,
	resolveChartPalette,
} from "../data/chart-color-palette.ts";
import type { ChartFlowMetaLite } from "../data/chart-data.ts";
import { resolveSeriesRows, truncateLabel } from "../data/chart-data.ts";
import {
	buildHeatmapIntensityScale,
	buildHeatmapMatrix,
	formatHeatmapCategoryLabel,
	formatHeatmapLabel,
	formatHeatmapRowLabel,
	getHeatmapCellColor,
	getHeatmapMosaicColumnCount,
	getHeatmapMosaicItems,
	type HeatmapIntensityScale,
	type HeatmapLayout,
	type HeatmapMatrix,
	MAX_HEATMAP_COL_TICKS,
	MAX_HEATMAP_ROW_TICKS,
	MAX_HEATMAP_ROWS,
	prepareHeatmapDisplayMatrix,
	sampleHeatmapAxisLabels,
} from "../data/chart-heatmap-matrix.ts";
import {
	getChartSeries,
	getChartValueKeys,
} from "../data/chart-query-utils.ts";
import { ChartEmptyState, type SeriesChartProps } from "./chart-shared.tsx";
import { theme } from "./utils/theme.ts";

export interface HeatmapChartProps extends SeriesChartProps {
	readonly preferredChartColors: ReadonlyArray<string> | null;
	readonly flowMeta: ChartFlowMetaLite | null;
	readonly showLegend?: boolean;
}

interface PreparedHeatmapChart {
	readonly displayMatrix: HeatmapMatrix;
	readonly layout: HeatmapLayout;
	readonly intensityFills: readonly string[];
	readonly intensityScale: HeatmapIntensityScale;
}

export function HeatmapChart(props: HeatmapChartProps) {
	const prepared = createMemo((): PreparedHeatmapChart | null => {
		const rows = resolveSeriesRows(
			props.data,
			props.queryConfig?.visualOptions?.list?.selectedTabIndex ?? 0,
		);
		if (!rows || rows.length === 0) return null;

		const valueKeys = getChartValueKeys(rows);
		if (valueKeys.length === 0) return null;

		const seriesLabels = getChartSeries({
			rows,
			metrics: props.queryConfig?.metrics ?? [],
			outputDescriptors: props.flowMeta?.outputs ?? [],
		}).map((entry) => entry.label);
		const matrix = buildHeatmapMatrix(rows, valueKeys, seriesLabels);
		const legendRows = props.showLegend === false ? 0 : 1;
		const maxRows = Math.min(
			MAX_HEATMAP_ROWS,
			Math.max(1, props.innerHeight - legendRows - 1),
		);
		const { matrix: displayMatrix, layout } = prepareHeatmapDisplayMatrix(
			matrix,
			maxRows,
		);
		if (displayMatrix.cells.length === 0) return null;

		const palette = resolveChartPalette(
			props.queryConfig?.visualOptions?.colors,
			props.preferredChartColors,
		);
		const accentColor = getChartColor(palette, 0);
		const intensityFills = buildHeatmapIntensityFills(
			accentColor,
			theme.surface,
		);
		const intensityScale = buildHeatmapIntensityScale(
			displayMatrix.cells.map((cell) => cell.value),
		);

		return { displayMatrix, layout, intensityFills, intensityScale };
	});

	return (
		<Show when={prepared()} fallback={<ChartEmptyState message="No data" />}>
			{(data: () => PreparedHeatmapChart) => (
				<HeatmapChartBody
					innerWidth={props.innerWidth}
					innerHeight={props.innerHeight}
					displayMatrix={data().displayMatrix}
					layout={data().layout}
					intensityFills={data().intensityFills}
					intensityScale={data().intensityScale}
					showLegend={props.showLegend ?? true}
				/>
			)}
		</Show>
	);
}

function HeatmapChartBody(props: {
	readonly innerWidth: number;
	readonly innerHeight: number;
	readonly displayMatrix: HeatmapMatrix;
	readonly layout: HeatmapLayout;
	readonly intensityFills: readonly string[];
	readonly intensityScale: HeatmapIntensityScale;
	readonly showLegend: boolean;
}) {
	return (
		<Show
			when={props.layout === "mosaic"}
			fallback={
				<HeatmapGridChart
					innerWidth={props.innerWidth}
					innerHeight={props.innerHeight}
					displayMatrix={props.displayMatrix}
					layout={props.layout}
					intensityFills={props.intensityFills}
					intensityScale={props.intensityScale}
					showLegend={props.showLegend}
				/>
			}
		>
			<HeatmapMosaicChart
				innerWidth={props.innerWidth}
				innerHeight={props.innerHeight}
				displayMatrix={props.displayMatrix}
				intensityFills={props.intensityFills}
				intensityScale={props.intensityScale}
				showLegend={props.showLegend}
			/>
		</Show>
	);
}

function HeatmapMosaicChart(props: {
	readonly innerWidth: number;
	readonly innerHeight: number;
	readonly displayMatrix: HeatmapMatrix;
	readonly intensityFills: readonly string[];
	readonly intensityScale: HeatmapIntensityScale;
	readonly showLegend: boolean;
}) {
	const items = createMemo(() => getHeatmapMosaicItems(props.displayMatrix));
	const columnCount = createMemo(() =>
		getHeatmapMosaicColumnCount(items().length),
	);
	const legendHeight = () => (props.showLegend ? 1 : 0);
	const availableHeight = () => Math.max(1, props.innerHeight - legendHeight());
	const maxRows = createMemo(() =>
		Math.max(1, Math.floor(availableHeight() / 2)),
	);
	const visibleItems = createMemo(() =>
		items().slice(0, maxRows() * columnCount()),
	);
	const rows = createMemo(() => {
		const cols = columnCount();
		const count = visibleItems().length;
		const rowCount = Math.ceil(count / cols);
		return Array.from({ length: rowCount }, (_, rowIndex) =>
			visibleItems().slice(rowIndex * cols, rowIndex * cols + cols),
		);
	});
	const tileWidth = createMemo(() => {
		const cols = columnCount();
		if (cols <= 0) return 1;
		return Math.max(2, Math.floor(props.innerWidth / cols));
	});

	return (
		<box
			flexDirection="column"
			width="100%"
			height="100%"
			minHeight={0}
			overflow="hidden"
		>
			<box
				flexDirection="column"
				height={availableHeight()}
				overflow="hidden"
				flexShrink={0}
			>
				<For each={rows()}>
					{(rowItems) => (
						<box flexDirection="row" height={2} flexShrink={0}>
							<For each={rowItems}>
								{(item) => {
									const fill = () =>
										getHeatmapCellColor(
											item.value,
											theme.border,
											props.intensityScale,
											props.intensityFills,
										);
									return (
										<box
											flexDirection="column"
											width={tileWidth()}
											flexShrink={0}
										>
											<text bg={fill()} fg={fill()} height={1}>
												{"█".repeat(Math.max(1, tileWidth() - 1))}
											</text>
											<text fg={theme.textMuted} height={1} flexShrink={0}>
												{truncateLabel(
													item.displayLabel,
													Math.max(2, tileWidth()),
												)}
											</text>
										</box>
									);
								}}
							</For>
						</box>
					)}
				</For>
			</box>
			<Show when={props.showLegend}>
				<HeatmapLegend intensityFills={props.intensityFills} />
			</Show>
		</box>
	);
}

function HeatmapGridChart(props: {
	readonly innerWidth: number;
	readonly innerHeight: number;
	readonly displayMatrix: HeatmapMatrix;
	readonly layout: HeatmapLayout;
	readonly intensityFills: readonly string[];
	readonly intensityScale: HeatmapIntensityScale;
	readonly showLegend: boolean;
}) {
	const labelColW = () => (props.layout === "calendar" ? 5 : 7);
	const headerH = 1;
	const legendH = () => (props.showLegend ? 1 : 0);
	const hideRowLabels = () => props.displayMatrix.rowLabels.length <= 1;
	const gridW = createMemo(() =>
		Math.max(4, props.innerWidth - (hideRowLabels() ? 0 : labelColW() + 1)),
	);
	const gridBodyH = createMemo(() =>
		Math.max(1, props.innerHeight - legendH() - headerH),
	);
	const visibleColLabels = createMemo(() =>
		sampleHeatmapAxisLabels(
			props.displayMatrix.colLabels,
			Math.max(1, Math.min(props.displayMatrix.colLabels.length, gridW())),
		),
	);
	const visibleRowLabels = createMemo(() =>
		sampleHeatmapAxisLabels(props.displayMatrix.rowLabels, gridBodyH()),
	);
	const colTickEvery = createMemo(() => {
		const count = visibleColLabels().length;
		if (count <= 10) return 1;
		return Math.max(1, Math.ceil(count / MAX_HEATMAP_COL_TICKS));
	});
	const rowTickEvery = createMemo(() => {
		const count = visibleRowLabels().length;
		if (count <= 12) return 1;
		if (count <= 24) return 2;
		return Math.max(1, Math.ceil(count / MAX_HEATMAP_ROW_TICKS));
	});
	const cellW = createMemo(() => {
		const count = visibleColLabels().length;
		if (count <= 0) return 1;
		return Math.max(1, Math.floor(gridW() / count));
	});
	const cellMap = createMemo(
		() =>
			new Map(
				props.displayMatrix.cells.map((cell) => [
					`${cell.rowLabel}__${cell.colLabel}`,
					cell,
				]),
			),
	);

	return (
		<box
			flexDirection="column"
			width="100%"
			height="100%"
			minHeight={0}
			overflow="hidden"
		>
			<box flexDirection="row" height={headerH} flexShrink={0}>
				<Show when={!hideRowLabels()}>
					<box width={labelColW()} flexShrink={0} />
				</Show>
				<box
					flexDirection="row"
					width={gridW()}
					overflow="hidden"
					flexShrink={0}
				>
					<For each={visibleColLabels()}>
						{(colLabel, index) => (
							<text fg={theme.textMuted} width={cellW()} flexShrink={0}>
								{index() % colTickEvery() === 0
									? truncateLabel(
											props.layout === "calendar"
												? formatHeatmapLabel(colLabel)
												: formatHeatmapCategoryLabel(colLabel),
											cellW(),
										)
									: ""}
							</text>
						)}
					</For>
				</box>
			</box>
			<box
				flexDirection="column"
				height={gridBodyH()}
				overflow="hidden"
				flexShrink={0}
			>
				<For each={visibleRowLabels()}>
					{(rowLabel, rowIndex) => (
						<box flexDirection="row" height={1} flexShrink={0}>
							<Show when={!hideRowLabels()}>
								<text fg={theme.textMuted} width={labelColW()} flexShrink={0}>
									<Show when={rowIndex() % rowTickEvery() === 0} fallback={" "}>
										{truncateLabel(
											formatHeatmapRowLabel(rowLabel),
											labelColW(),
										)}
									</Show>
								</text>
							</Show>
							<box
								flexDirection="row"
								width={gridW()}
								overflow="hidden"
								flexShrink={0}
							>
								<For each={visibleColLabels()}>
									{(colLabel) => {
										const cell = () =>
											cellMap().get(`${rowLabel}__${colLabel}`);
										const value = () => cell()?.value ?? 0;
										const fill = () =>
											getHeatmapCellColor(
												value(),
												theme.border,
												props.intensityScale,
												props.intensityFills,
											);
										return (
											<text
												bg={fill()}
												fg={fill()}
												width={cellW()}
												flexShrink={0}
											>
												{"█".repeat(Math.max(1, cellW()))}
											</text>
										);
									}}
								</For>
							</box>
						</box>
					)}
				</For>
			</box>
			<Show when={props.showLegend}>
				<HeatmapLegend intensityFills={props.intensityFills} />
			</Show>
		</box>
	);
}

function HeatmapLegend(props: { readonly intensityFills: readonly string[] }) {
	return (
		<box
			flexDirection="row"
			height={1}
			width="100%"
			flexShrink={0}
			justifyContent="flex-end"
			alignItems="center"
		>
			<text fg={theme.textMuted} flexShrink={0}>
				Quiet
			</text>
			<For each={[theme.border, ...props.intensityFills]}>
				{(fill) => (
					<text bg={fill} fg={fill} flexShrink={0}>
						{" "}
					</text>
				)}
			</For>
			<text fg={theme.textMuted} flexShrink={0}>
				Busy
			</text>
		</box>
	);
}
