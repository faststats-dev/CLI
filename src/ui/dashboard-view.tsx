import {
	type CliRenderer,
	createCliRenderer,
	type ScrollBoxRenderable,
	TextAttributes,
} from "@opentui/core";
import {
	render,
	useKeyboard,
	useRenderer,
	useTerminalDimensions,
} from "@opentui/solid";
import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import { chartColor, theme } from "./theme.ts";

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

function getChartSize(chartType: string): { w: number; h: number } {
	return CHART_SIZES[chartType] ?? DEFAULT_CHART_SIZE;
}

export interface DashboardLite {
	readonly id: string;
	readonly name: string;
	readonly isDefault: boolean;
}

export interface GridPosition {
	readonly x: number;
	readonly y: number;
	readonly w: number;
	readonly h: number;
}

export interface ChartLite {
	readonly id: string;
	readonly name: string;
	readonly chartType: string;
	readonly dashboardId: string | null;
	readonly position: GridPosition | null;
}

export interface RunDashboardViewOptions {
	readonly projectName: string;
	readonly projectSlug: string;
	readonly dashboards: ReadonlyArray<DashboardLite>;
	readonly charts: ReadonlyArray<ChartLite>;
}

export type RunDashboardViewResult = { kind: "closed" };

export async function runDashboardView(
	options: RunDashboardViewOptions,
): Promise<RunDashboardViewResult> {
	const renderer: CliRenderer = await createCliRenderer({
		exitOnCtrlC: false,
		targetFps: 60,
	});

	await render(() => <DashboardApp options={options} />, renderer);

	return new Promise<RunDashboardViewResult>((resolve) => {
		renderer.once("destroy", () => resolve({ kind: "closed" }));
	});
}

interface DashboardAppProps {
	options: RunDashboardViewOptions;
}

function DashboardApp(props: DashboardAppProps) {
	const renderer = useRenderer();
	const dashboards = () => props.options.dashboards;
	const dashboardCount = () => dashboards().length;

	const [currentIndex, setCurrentIndex] = createSignal(
		Math.max(
			0,
			dashboards().findIndex((d) => d.isDefault),
		),
	);

	const currentDashboard = createMemo(() => dashboards()[currentIndex()]);

	const dashboardCharts = createMemo(() => {
		const dash = currentDashboard();
		if (!dash) return [];
		return props.options.charts.filter((c) => c.dashboardId === dash.id);
	});

	const moveTab = (delta: number) => {
		const total = dashboardCount();
		if (total === 0) return;
		setCurrentIndex((i) => Math.max(0, Math.min(total - 1, i + delta)));
	};

	const exit = () => renderer.destroy();

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
			<DashboardGrid
				charts={dashboardCharts()}
				dashboardId={currentDashboard()?.id ?? null}
			/>
			<Divider />
			<Footer
				chartCount={dashboardCharts().length}
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
			<text fg={theme.textMuted}>
				← → switch  ↑ ↓ scroll  ⇥ tab  q back
			</text>
		</box>
	);
}

function Tabs(props: {
	dashboards: ReadonlyArray<DashboardLite>;
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
			<text fg={theme.textMuted}>{position()} · layout preview</text>
		</box>
	);
}

function DashboardGrid(props: {
	charts: ReadonlyArray<ChartLite>;
	dashboardId: string | null;
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
	const placedCharts = createMemo(() => placeCharts(props.charts));
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
		<Show when={props.charts.length > 0} fallback={<EmptyDashboard />}>
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
						/>
					)}
				</For>
			</scrollbox>
		</Show>
	);
}

function ChartBox(props: {
	chart: ChartLite;
	pos: GridPosition;
	cellWidth: number;
	rowHeight: number;
	accent: string;
}) {
	const left = createMemo(() => props.pos.x * props.cellWidth);
	const width = createMemo(() =>
		Math.max(2, props.pos.w * props.cellWidth - CELL_GAP),
	);
	const top = createMemo(() => props.pos.y * props.rowHeight);
	const height = createMemo(() =>
		Math.max(2, props.pos.h * props.rowHeight - CELL_GAP),
	);
	const glyph = () => CHART_GLYPH[props.chart.chartType] ?? "▢";

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
			<box
				flexDirection="column"
				width="100%"
				height="100%"
				justifyContent="center"
				alignItems="center"
			>
				<text fg={props.accent} attributes={TextAttributes.BOLD}>
					{glyph()} {props.chart.chartType}
				</text>
			</box>
		</box>
	);
}

function EmptyDashboard() {
	return (
		<box
			flexGrow={1}
			marginY={1}
			alignItems="center"
			justifyContent="center"
		>
			<text fg={theme.textMuted}>This dashboard has no charts yet.</text>
		</box>
	);
}

interface PlacedChart {
	readonly chart: ChartLite;
	readonly pos: GridPosition;
}

function placeCharts(charts: ReadonlyArray<ChartLite>): ReadonlyArray<PlacedChart> {
	const placed: PlacedChart[] = [];
	const occupied: number[] = [];

	for (const chart of charts) {
		const fromApi = sanitizePosition(chart.position);
		const pos = fromApi ?? autoPlace(chart, occupied);
		markOccupied(occupied, pos);
		placed.push({ chart, pos });
	}

	return placed;
}

function sanitizePosition(pos: GridPosition | null): GridPosition | null {
	if (!pos) return null;
	const w = clampInt(pos.w, 1, GRID_COLS);
	const h = clampInt(pos.h, 1, 32);
	const x = clampInt(pos.x, 0, GRID_COLS - w);
	const y = clampInt(pos.y, 0, 1024);
	return { x, y, w, h };
}

function clampInt(value: number, min: number, max: number): number {
	if (!Number.isFinite(value)) return min;
	return Math.max(min, Math.min(max, Math.round(value)));
}

function autoPlace(chart: ChartLite, occupied: number[]): GridPosition {
	const { w, h } = getChartSize(chart.chartType);
	for (let y = 0; y < 1024; y++) {
		for (let x = 0; x <= GRID_COLS - w; x++) {
			if (isFree(occupied, x, y, w, h)) {
				return { x, y, w, h };
			}
		}
	}
	return { x: 0, y: 0, w, h };
}

function isFree(
	occupied: number[],
	x: number,
	y: number,
	w: number,
	h: number,
): boolean {
	for (let row = y; row < y + h; row++) {
		const mask = occupied[row] ?? 0;
		const slot = (((1 << w) - 1) << x) >>> 0;
		if ((mask & slot) !== 0) return false;
	}
	return true;
}

function markOccupied(occupied: number[], pos: GridPosition): void {
	const slot = (((1 << pos.w) - 1) << pos.x) >>> 0;
	for (let row = pos.y; row < pos.y + pos.h; row++) {
		occupied[row] = (occupied[row] ?? 0) | slot;
	}
}
