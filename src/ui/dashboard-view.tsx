import { type ScrollBoxRenderable, TextAttributes } from "@opentui/core";
import { render, useKeyboard, useTerminalDimensions } from "@opentui/solid";
import {
	createEffect,
	createMemo,
	createSignal,
	For,
	type JSX,
	onCleanup,
	Show,
} from "solid-js";
import type { ChartsListCharts200, DashboardRecord } from "../api.ts";
import type { ChartData, ChartFlowMetaLite } from "../data/chart-data.ts";
import type { Project } from "../data/project.ts";
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
	readonly project: Project;
	readonly dashboards: ReadonlyArray<DashboardRecord>;
	readonly loadDashboard: (
		dashboardId: string,
	) => Promise<ReadonlyArray<DashboardChart>>;
}

export async function runDashboardView(
	options: RunDashboardViewOptions,
): Promise<{ kind: "closed" }> {
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

function DashboardApp(props: {
	options: RunDashboardViewOptions;
	onExit: () => void;
}) {
	const dashboards = () => props.options.dashboards;
	const [tab, setTab] = createSignal(
		Math.max(
			0,
			dashboards().findIndex((d) => d.isDefault),
		),
	);
	const dashboard = createMemo(() => dashboards()[tab()]);
	const [charts, setCharts] = createSignal<ReadonlyArray<DashboardChart>>([]);
	const [loading, setLoading] = createSignal(false);
	const cache = new Map<string, ReadonlyArray<DashboardChart>>();

	createEffect(() => {
		const dash = dashboard();
		if (!dash) {
			setCharts([]);
			setLoading(false);
			return;
		}
		const hit = cache.get(dash.id);
		if (hit) {
			setCharts(hit);
			setLoading(false);
			return;
		}
		const id = dash.id;
		let active = true;
		setLoading(true);
		setCharts([]);
		void props.options.loadDashboard(id).then((loaded) => {
			if (!active || dashboard()?.id !== id) return;
			cache.set(id, loaded);
			setCharts(loaded);
			setLoading(false);
		});
		onCleanup(() => {
			active = false;
		});
	});

	const moveTab = (delta: number) => {
		const n = dashboards().length;
		if (n === 0) return;
		setTab((i) => Math.max(0, Math.min(n - 1, i + delta)));
	};

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
				props.onExit();
				break;
			case "c":
				if (key.ctrl) props.onExit();
				break;
		}
	});

	const dashTotal = () => dashboards().length;
	const footerPos = () =>
		dashTotal() > 0 ? `${tab() + 1}/${dashTotal()}` : "0/0";

	return (
		<box
			flexDirection="column"
			width="100%"
			height="100%"
			backgroundColor={theme.bg}
			paddingX={CONTAINER_PADDING_X}
			paddingY={1}
		>
			<box flexDirection="row" height={1} marginBottom={1}>
				<box flexDirection="row" flexGrow={1} flexShrink={1}>
					<text
						fg={theme.textBright}
						attributes={TextAttributes.BOLD}
						flexShrink={1}
					>
						{props.options.project.name}
					</text>
					<text fg={theme.textDim}>{` ${props.options.project.slug}`}</text>
				</box>
				<text fg={theme.textMuted}>← → switch ↑ ↓ scroll ⇥ tab q back</text>
			</box>

			<Show
				when={dashTotal() > 0}
				fallback={
					<box height={1} marginBottom={1}>
						<text fg={theme.textMuted}>No dashboards</text>
					</box>
				}
			>
				<box flexDirection="row" height={1} marginBottom={1}>
					<For each={dashboards()}>
						{(d, i) => {
							const active = () => i() === tab();
							return (
								<box
									paddingX={1}
									marginRight={1}
									backgroundColor={active() ? theme.selectedBg : theme.bg}
								>
									<text
										fg={active() ? theme.selectedAccent : theme.textMuted}
										attributes={
											active() ? TextAttributes.BOLD : TextAttributes.NONE
										}
									>
										{d.name}
										{d.isDefault ? " ★" : ""}
									</text>
								</box>
							);
						}}
					</For>
				</box>
			</Show>

			<box height={1} backgroundColor={theme.border} />

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
					dashboardId={dashboard()?.id ?? null}
					preferredChartColors={props.options.project.preferredChartColors}
				/>
			</Show>

			<box height={1} backgroundColor={theme.border} />

			<box flexDirection="row" height={1} marginTop={1}>
				<text fg={theme.textMuted} flexGrow={1} flexShrink={1}>
					{dashboard()?.name ?? "No dashboards"} · {charts().length} chart
					{charts().length === 1 ? "" : "s"}
				</text>
				<text fg={theme.textMuted}>{footerPos()} · live</text>
			</box>
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
	const tiles = createMemo(() => layoutCharts(props.charts));
	const gridHeight = createMemo(() => {
		const items = tiles();
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
				contentOptions={{ width: "100%", height: gridHeight() }}
				verticalScrollbarOptions={{
					trackOptions: {
						backgroundColor: theme.surface,
						foregroundColor: theme.borderStrong,
					},
				}}
			>
				<For each={tiles()}>
					{(entry, i) => (
						<ChartTile
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

function ChartTile(props: {
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
	const left = props.pos.x * props.cellWidth;
	const width = Math.max(2, props.pos.w * props.cellWidth - CELL_GAP);
	const top = props.pos.y * props.rowHeight;
	const height = Math.max(2, props.pos.h * props.rowHeight - CELL_GAP);
	const innerWidth = Math.max(1, width - 4);
	const innerHeight = Math.max(1, height - 2);
	const series = {
		data: props.chart.data,
		queryConfig: props.chart.queryConfig,
		accent: props.accent,
		innerWidth,
		innerHeight,
	};
	const colors = props.preferredChartColors;
	const flowMeta = props.chart.flowMeta;

	let body: JSX.Element;
	switch (props.chart.chartType) {
		case "widget":
			body = <WidgetChart {...series} />;
			break;
		case "list":
			body = <ListChart {...series} />;
			break;
		case "bar":
			body = (
				<BarChart
					{...series}
					flowMeta={flowMeta}
					preferredChartColors={colors}
				/>
			);
			break;
		case "pie":
			body = <PieChart {...series} preferredChartColors={colors} />;
			break;
		case "line":
		case "area":
			body = (
				<LineAreaChart
					{...series}
					chartType={props.chart.chartType}
					flowMeta={flowMeta}
					preferredChartColors={colors}
				/>
			);
			break;
		case "map":
			body = <MapChart {...series} preferredChartColors={colors} />;
			break;
		case "heatmap":
			body = (
				<HeatmapChart
					{...series}
					flowMeta={flowMeta}
					preferredChartColors={colors}
					showLegend={
						props.chart.queryConfig?.visualOptions?.heatmap?.showLegend ?? true
					}
				/>
			);
			break;
		default:
			body = (
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

	return (
		<box
			position="absolute"
			left={left}
			top={top}
			width={width}
			height={height}
			border={true}
			borderStyle="single"
			borderColor={props.accent}
			backgroundColor={theme.surface}
			title={` ${props.chart.name} `}
			titleAlignment="left"
			paddingX={1}
		>
			{body}
		</box>
	);
}

function layoutCharts(charts: ReadonlyArray<DashboardChart>) {
	const finite = (value: number, min: number, max: number) => {
		const n = Math.round(Number(value));
		return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : min;
	};

	let nextY = 0;
	return charts.map((chart) => {
		const raw = chart.position;
		if (raw) {
			const w = finite(Number(raw.w), 1, GRID_COLS);
			const h = finite(Number(raw.h), 1, 32);
			const pos = {
				x: finite(Number(raw.x), 0, GRID_COLS - w),
				y: finite(Number(raw.y), 0, 1024),
				w,
				h,
			};
			nextY = Math.max(nextY, pos.y + pos.h);
			return { chart, pos };
		}
		const size = CHART_SIZES[chart.chartType] ?? DEFAULT_CHART_SIZE;
		const pos = { x: 0, y: nextY, w: size.w, h: size.h };
		nextY += size.h;
		return { chart, pos };
	});
}
