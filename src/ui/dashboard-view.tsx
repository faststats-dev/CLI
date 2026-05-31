import { type ScrollBoxRenderable, TextAttributes } from "@opentui/core";
import { render, useKeyboard, useTerminalDimensions } from "@opentui/solid";
import {
	createEffect,
	createMemo,
	createSignal,
	For,
	onCleanup,
	Show,
} from "solid-js";
import type { ChartsListCharts200, DashboardRecord } from "../api.ts";
import {
	type ChartData,
	type ChartFlowMetaLite,
	isSeriesResult,
	resolveMetricKey,
	seriesToMapHighlights,
} from "../data/chart-data.ts";
import { HeatmapChart } from "./heatmap-chart.tsx";
import { ListChart } from "./list-chart.tsx";
import { MapChart } from "./map-chart.tsx";
import { runOpenTui } from "./open-tui.ts";
import { BarChart, LineAreaChart, PieChart } from "./series-charts.tsx";
import { chartColor, theme } from "./theme.ts";
import { WidgetChart } from "./widget-chart.tsx";

const GRID_COLS = 12;
const CELL_GAP = 1;
const CONTAINER_PADDING_X = 2;
const ROW_HEIGHT_MIN = 2;
const ROW_HEIGHT_MAX = 6;
const ROW_HEIGHT_RATIO = 0.6;

const CHART_SIZES: Partial<Record<string, { w: number; h: number }>> = {
	widget: { w: 3, h: 2 },
	pie: { w: 4, h: 4 },
	list: { w: 4, h: 6 },
	map: { w: 6, h: 4 },
	heatmap: { w: 6, h: 5 },
};
const DEFAULT_CHART_SIZE = { w: 4, h: 3 } as const;

const CHART_GLYPH: Record<string, string> = {
	widget: "▣",
	line: "╱",
	area: "▆",
	bar: "▌",
	pie: "●",
	map: "⊕",
	list: "☰",
	heatmap: "▦",
	radar: "◈",
};

export type DashboardChart = ChartsListCharts200[number] & {
	readonly data: ChartData | null;
	readonly flowMeta: ChartFlowMetaLite | null;
};

export interface RunDashboardViewOptions {
	readonly projectName: string;
	readonly projectSlug: string;
	readonly preferredChartColors: ReadonlyArray<string> | null;
	readonly dashboards: ReadonlyArray<DashboardRecord>;
	readonly loadDashboard: (
		dashboardId: string,
	) => Promise<ReadonlyArray<DashboardChart>>;
}

export type RunDashboardViewResult = { kind: "closed" };

export async function runDashboardView(
	options: RunDashboardViewOptions,
): Promise<RunDashboardViewResult> {
	return runOpenTui(({ renderer, close }) =>
		render(
			() => (
				<DashboardApp
					options={options}
					onExit={() => close({ kind: "closed" })}
				/>
			),
			renderer,
		),
	);
}

interface DashboardAppProps {
	options: RunDashboardViewOptions;
	onExit: () => void;
}

function DashboardApp(props: DashboardAppProps) {
	const dashboards = () => props.options.dashboards;
	const dashboardCount = () => dashboards().length;

	const [currentIndex, setCurrentIndex] = createSignal(
		Math.max(
			0,
			dashboards().findIndex((d) => d.isDefault),
		),
	);

	const currentDashboard = createMemo(() => dashboards()[currentIndex()]);

	const [charts, setCharts] = createSignal<ReadonlyArray<DashboardChart>>([]);
	const [loading, setLoading] = createSignal(false);
	const chartCache = new Map<string, ReadonlyArray<DashboardChart>>();

	createEffect(() => {
		const dash = currentDashboard();
		if (!dash) {
			setCharts([]);
			setLoading(false);
			return;
		}

		const cached = chartCache.get(dash.id);
		if (cached) {
			setCharts(cached);
			setLoading(false);
			return;
		}

		const dashboardId = dash.id;
		let active = true;
		setLoading(true);
		setCharts([]);

		void props.options.loadDashboard(dashboardId).then((loaded) => {
			if (!active || currentDashboard()?.id !== dashboardId) return;
			chartCache.set(dashboardId, loaded);
			setCharts(loaded);
			setLoading(false);
		});

		onCleanup(() => {
			active = false;
		});
	});

	const moveTab = (delta: number) => {
		const total = dashboardCount();
		if (total === 0) return;
		setCurrentIndex((i) => Math.max(0, Math.min(total - 1, i + delta)));
	};

	const exit = () => props.onExit();

	useKeyboard((key) => {
		switch (key.name) {
			case "left":
			case "h":
				moveTab(-1);
				break;
			case "right":
			case "l":
				moveTab(1);
				break;
			case "tab":
				moveTab(key.shift ? -1 : 1);
				break;
			case "escape":
			case "q":
				exit();
				break;
			case "c":
				if (key.ctrl) exit();
				break;
		}
	});

	return (
		<box
			flexDirection="column"
			width="100%"
			height="100%"
			backgroundColor={theme.bg}
			paddingX={CONTAINER_PADDING_X}
			paddingY={1}
		>
			<Header
				title={props.options.projectName}
				subtitle={props.options.projectSlug}
			/>
			<Tabs dashboards={dashboards()} currentIndex={currentIndex()} />
			<Divider />
			<Show
				when={!loading()}
				fallback={
					<box
						flexGrow={1}
						marginY={1}
						alignItems="center"
						justifyContent="center"
					>
						<text fg={theme.textMuted}>Loading dashboard…</text>
					</box>
				}
			>
				<DashboardGrid
					charts={charts()}
					dashboardId={currentDashboard()?.id ?? null}
					preferredChartColors={props.options.preferredChartColors}
				/>
			</Show>
			<Divider />
			<Footer
				chartCount={charts().length}
				dashboardName={currentDashboard()?.name ?? "No dashboards"}
				dashboardIndex={currentIndex()}
				dashboardTotal={dashboardCount()}
			/>
		</box>
	);
}

function Header(props: { title: string; subtitle: string }) {
	return (
		<box flexDirection="row" height={1} marginBottom={1}>
			<box flexDirection="row" flexGrow={1} flexShrink={1}>
				<text
					fg={theme.textBright}
					attributes={TextAttributes.BOLD}
					flexShrink={1}
				>
					{props.title}
				</text>
				<text fg={theme.textDim}>{` ${props.subtitle}`}</text>
			</box>
			<text fg={theme.textMuted}>← → switch ↑ ↓ scroll ⇥ tab q back</text>
		</box>
	);
}

function Tabs(props: {
	dashboards: ReadonlyArray<DashboardRecord>;
	currentIndex: number;
}) {
	return (
		<Show
			when={props.dashboards.length > 0}
			fallback={
				<box height={1} marginBottom={1}>
					<text fg={theme.textMuted}>No dashboards</text>
				</box>
			}
		>
			<box flexDirection="row" height={1} marginBottom={1}>
				<For each={props.dashboards}>
					{(dashboard, index) => {
						const isActive = () => index() === props.currentIndex;
						return (
							<box
								paddingX={1}
								marginRight={1}
								backgroundColor={isActive() ? theme.selectedBg : theme.bg}
							>
								<text
									fg={isActive() ? theme.selectedAccent : theme.textMuted}
									attributes={
										isActive() ? TextAttributes.BOLD : TextAttributes.NONE
									}
								>
									{dashboard.name}
									{dashboard.isDefault ? " ★" : ""}
								</text>
							</box>
						);
					}}
				</For>
			</box>
		</Show>
	);
}

function Divider() {
	return <box height={1} backgroundColor={theme.border} />;
}

function Footer(props: {
	chartCount: number;
	dashboardName: string;
	dashboardIndex: number;
	dashboardTotal: number;
}) {
	const position = () =>
		props.dashboardTotal > 0
			? `${props.dashboardIndex + 1}/${props.dashboardTotal}`
			: "0/0";
	return (
		<box flexDirection="row" height={1} marginTop={1}>
			<text fg={theme.textMuted} flexGrow={1} flexShrink={1}>
				{props.dashboardName} · {props.chartCount} chart
				{props.chartCount === 1 ? "" : "s"}
			</text>
			<text fg={theme.textMuted}>{position()} · live</text>
		</box>
	);
}

function DashboardGrid(props: {
	charts: ReadonlyArray<DashboardChart>;
	dashboardId: string | null;
	preferredChartColors: ReadonlyArray<string> | null;
}) {
	const dimensions = useTerminalDimensions();
	const cellWidth = createMemo(() => {
		const available = Math.max(
			GRID_COLS,
			dimensions().width - CONTAINER_PADDING_X * 2,
		);
		return Math.max(1, Math.floor(available / GRID_COLS));
	});
	const rowHeight = createMemo(() =>
		Math.max(
			ROW_HEIGHT_MIN,
			Math.min(ROW_HEIGHT_MAX, Math.round(cellWidth() * ROW_HEIGHT_RATIO)),
		),
	);
	const placedCharts = createMemo(() => layoutCharts(props.charts));
	const gridHeight = createMemo(() => {
		const items = placedCharts();
		if (items.length === 0) return rowHeight();
		const maxBottom = items.reduce(
			(max, entry) => Math.max(max, entry.pos.y + entry.pos.h),
			0,
		);
		return maxBottom * rowHeight();
	});

	let scrollBox: ScrollBoxRenderable | undefined;

	createEffect(() => {
		props.dashboardId;
		scrollBox?.scrollTo(0);
	});

	useKeyboard((key) => {
		if (!scrollBox || props.charts.length === 0) return;
		switch (key.name) {
			case "up":
			case "k":
				scrollBox.scrollBy(-1, "step");
				break;
			case "down":
			case "j":
				scrollBox.scrollBy(1, "step");
				break;
			case "pageup":
				scrollBox.scrollBy(-1, "viewport");
				break;
			case "pagedown":
				scrollBox.scrollBy(1, "viewport");
				break;
			case "home":
			case "g":
				scrollBox.scrollTo(0);
				break;
			case "end":
			case "G":
				scrollBox.scrollTo(scrollBox.scrollHeight);
				break;
		}
	});

	return (
		<Show
			when={props.charts.length > 0}
			fallback={
				<box
					flexGrow={1}
					marginY={1}
					alignItems="center"
					justifyContent="center"
				>
					<text fg={theme.textMuted}>This dashboard has no charts yet.</text>
				</box>
			}
		>
			<scrollbox
				ref={(el) => {
					scrollBox = el ?? undefined;
				}}
				flexGrow={1}
				marginY={1}
				width="100%"
				scrollX={false}
				scrollY={true}
				viewportCulling={true}
				contentOptions={{
					width: "100%",
					height: gridHeight(),
				}}
				verticalScrollbarOptions={{
					trackOptions: {
						backgroundColor: theme.surface,
						foregroundColor: theme.borderStrong,
					},
				}}
			>
				<For each={placedCharts()}>
					{(entry, i) => (
						<ChartBox
							chart={entry.chart}
							pos={entry.pos}
							cellWidth={cellWidth()}
							rowHeight={rowHeight()}
							accent={chartColor(i())}
							preferredChartColors={props.preferredChartColors}
						/>
					)}
				</For>
			</scrollbox>
		</Show>
	);
}

function ChartBox(props: {
	chart: DashboardChart;
	pos: {
		readonly x: number;
		readonly y: number;
		readonly w: number;
		readonly h: number;
	};
	cellWidth: number;
	rowHeight: number;
	accent: string;
	preferredChartColors: ReadonlyArray<string> | null;
}) {
	const left = createMemo(() => props.pos.x * props.cellWidth);
	const width = createMemo(() =>
		Math.max(2, props.pos.w * props.cellWidth - CELL_GAP),
	);
	const top = createMemo(() => props.pos.y * props.rowHeight);
	const height = createMemo(() =>
		Math.max(2, props.pos.h * props.rowHeight - CELL_GAP),
	);
	const innerWidth = createMemo(() => Math.max(1, width() - 4));
	const innerHeight = createMemo(() => Math.max(1, height() - 2));

	const mapHighlights = createMemo(() => {
		if (props.chart.chartType !== "map" || !isSeriesResult(props.chart.data)) {
			return [];
		}
		return seriesToMapHighlights(
			props.chart.data,
			resolveMetricKey(props.chart.queryConfig),
			{
				chartColors: props.chart.queryConfig?.visualOptions?.colors,
				preferredChartColors: props.preferredChartColors,
			},
		);
	});

	return (
		<box
			position="absolute"
			left={left()}
			top={top()}
			width={width()}
			height={height()}
			border={true}
			borderStyle="single"
			borderColor={props.accent}
			backgroundColor={theme.surface}
			title={` ${props.chart.name} `}
			titleAlignment="left"
			paddingX={1}
		>
			<ChartContent
				chart={props.chart}
				accent={props.accent}
				innerWidth={innerWidth}
				innerHeight={innerHeight}
				preferredChartColors={props.preferredChartColors}
				mapHighlights={mapHighlights}
			/>
		</box>
	);
}

function ChartContent(props: {
	chart: DashboardChart;
	accent: string;
	innerWidth: () => number;
	innerHeight: () => number;
	preferredChartColors: ReadonlyArray<string> | null;
	mapHighlights: () => ReturnType<typeof seriesToMapHighlights>;
}) {
	const seriesProps = () => ({
		data: props.chart.data,
		queryConfig: props.chart.queryConfig,
		accent: props.accent,
		innerWidth: props.innerWidth(),
		innerHeight: props.innerHeight(),
	});

	switch (props.chart.chartType) {
		case "widget":
			return <WidgetChart {...seriesProps()} />;
		case "list":
			return <ListChart {...seriesProps()} />;
		case "bar":
			return (
				<BarChart
					{...seriesProps()}
					flowMeta={props.chart.flowMeta}
					preferredChartColors={props.preferredChartColors}
				/>
			);
		case "pie":
			return (
				<PieChart
					{...seriesProps()}
					preferredChartColors={props.preferredChartColors}
				/>
			);
		case "line":
			return (
				<LineAreaChart
					{...seriesProps()}
					chartType="line"
					flowMeta={props.chart.flowMeta}
					preferredChartColors={props.preferredChartColors}
				/>
			);
		case "area":
			return (
				<LineAreaChart
					{...seriesProps()}
					chartType="area"
					flowMeta={props.chart.flowMeta}
					preferredChartColors={props.preferredChartColors}
				/>
			);
		case "map":
			return (
				<MapChart
					accent={props.accent}
					innerWidth={props.innerWidth()}
					innerHeight={props.innerHeight()}
					highlights={props.mapHighlights()}
				/>
			);
		case "heatmap":
			return (
				<HeatmapChart
					{...seriesProps()}
					flowMeta={props.chart.flowMeta}
					preferredChartColors={props.preferredChartColors}
					showLegend={
						props.chart.queryConfig?.visualOptions?.heatmap?.showLegend ?? true
					}
				/>
			);
		default:
			return (
				<box
					flexDirection="column"
					width="100%"
					height="100%"
					justifyContent="center"
					alignItems="center"
				>
					<text fg={props.accent} attributes={TextAttributes.BOLD}>
						{CHART_GLYPH[props.chart.chartType] ?? "▢"} {props.chart.chartType}
					</text>
				</box>
			);
	}
}

function layoutCharts(charts: ReadonlyArray<DashboardChart>) {
	let nextY = 0;
	return charts.map((chart) => {
		const fromApi = parseChartPosition(chart.position);
		if (fromApi) {
			nextY = Math.max(nextY, fromApi.y + fromApi.h);
			return { chart, pos: fromApi };
		}
		const size = CHART_SIZES[chart.chartType] ?? DEFAULT_CHART_SIZE;
		const pos = { x: 0, y: nextY, w: size.w, h: size.h };
		nextY += size.h;
		return { chart, pos };
	});
}

function parseChartPosition(
	pos: ChartsListCharts200[number]["position"],
): { x: number; y: number; w: number; h: number } | null {
	if (!pos) return null;
	const finite = (value: number, min: number, max: number) => {
		const n = Math.round(Number(value));
		return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : min;
	};
	const w = finite(Number(pos.w), 1, GRID_COLS);
	const h = finite(Number(pos.h), 1, 32);
	return {
		x: finite(Number(pos.x), 0, GRID_COLS - w),
		y: finite(Number(pos.y), 0, 1024),
		w,
		h,
	};
}
