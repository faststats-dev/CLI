import {
    type CliRenderer,
    createCliRenderer,
    type KeyEvent,
    type ScrollBoxRenderable,
    TextAttributes,
} from "@opentui/core";
import { render, useKeyboard, useRenderer } from "@opentui/solid";
import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import { formatWidgetValue } from "../data/chart-data.ts";
import type { Metric, Project, Trend } from "../data/project.ts";
import { chartColor, theme } from "./theme.ts";

const METRIC_COLUMNS = [
	{ label: "Events", width: 14 },
	{ label: "Errors", width: 12 },
	{ label: "Users", width: 14 },
] as const;

const VISIBILITY_GLYPH = { public: "○", private: "⌧" } as const;

const ROW_HEIGHT = 3;
const ROW_GAP = 1;
const ROW_STRIDE = ROW_HEIGHT + ROW_GAP;
const AVATAR_WIDTH = 3;

function formatTrend(trend: Trend): { text: string; color: string } {
	if (trend.direction === "flat" || trend.percent === 0) {
		return { text: "—", color: theme.textMuted };
	}
	const arrow = trend.direction === "up" ? "↑" : "↓";
	const color = trend.direction === "up" ? theme.success : theme.danger;
	const pct =
		trend.percent >= 10 ? trend.percent.toFixed(0) : trend.percent.toFixed(1);
	return { text: `${arrow} ${pct}%`, color };
}

function padLeft(text: string, width: number): string {
	return text.length >= width
		? text.slice(0, width)
		: " ".repeat(width - text.length) + text;
}

function listContentHeight(count: number): number {
	if (count <= 0) return 0;
	return count * ROW_HEIGHT + (count - 1) * ROW_GAP;
}

function projectMatchesQuery(project: Project, query: string): boolean {
	const normalized = query.trim().toLowerCase();
	if (!normalized) return true;
	return (
		project.name.toLowerCase().includes(normalized) ||
		project.slug.toLowerCase().includes(normalized)
	);
}

const SEARCH_NAV_KEYS = new Set(["j", "k", "g", "q"]);

function isSearchKey(key: KeyEvent, hasSearch: boolean): boolean {
	if (key.ctrl || key.meta) return false;
	if (key.sequence.length !== 1) return false;
	const ch = key.sequence;
	if (ch < "!" || ch > "~" || ch === " ") return false;
	if (!hasSearch && SEARCH_NAV_KEYS.has(ch)) return false;
	return true;
}

export interface RunProjectsTableOptions {
	readonly title: string;
	readonly projects: ReadonlyArray<Project>;
}

export type RunProjectsTableResult =
	| { kind: "selected"; project: Project }
	| { kind: "cancelled" };

export async function runProjectsTable(
	options: RunProjectsTableOptions,
): Promise<RunProjectsTableResult> {
	let outcome: RunProjectsTableResult = { kind: "cancelled" };

	const renderer: CliRenderer = await createCliRenderer({
		exitOnCtrlC: false,
		targetFps: 60,
	});

	await render(
		() => (
			<ProjectsApp
				options={options}
				setOutcome={(next) => {
					outcome = next;
				}}
			/>
		),
		renderer,
	);

	return new Promise<RunProjectsTableResult>((resolve) => {
		renderer.once("destroy", () => resolve(outcome));
	});
}

interface ProjectsAppProps {
	options: RunProjectsTableOptions;
	setOutcome: (next: RunProjectsTableResult) => void;
}

function ProjectsApp(props: ProjectsAppProps) {
	const renderer = useRenderer();
	const allProjects = () => props.options.projects;
	const [searchQuery, setSearchQuery] = createSignal("");
	const filteredProjects = createMemo(() => {
		const query = searchQuery();
		return allProjects().filter((project) => projectMatchesQuery(project, query));
	});
	const projectCount = () => filteredProjects().length;
	const [selectedIndex, setSelectedIndex] = createSignal(0);
	const listHeight = createMemo(() => listContentHeight(projectCount()));

	let scrollBox: ScrollBoxRenderable | undefined;

	createEffect(() => {
		searchQuery();
		setSelectedIndex((current) =>
			Math.min(current, Math.max(0, projectCount() - 1)),
		);
	});

	createEffect(() => {
		const index = selectedIndex();
		scrollBox?.scrollTo({ x: 0, y: index * ROW_STRIDE });
	});

	const moveBy = (delta: number) => {
		setSelectedIndex((current) =>
			Math.max(0, Math.min(projectCount() - 1, current + delta)),
		);
	};

	const select = () => {
		const project = filteredProjects()[selectedIndex()];
		if (!project) return;
		props.setOutcome({ kind: "selected", project });
		renderer.destroy();
	};

	const cancel = () => {
		props.setOutcome({ kind: "cancelled" });
		renderer.destroy();
	};

	const clearSearch = () => {
		setSearchQuery("");
		setSelectedIndex(0);
	};

	useKeyboard((key) => {
		if (key.name === "backspace") {
			if (searchQuery()) {
				setSearchQuery((query) => query.slice(0, -1));
				return;
			}
			return;
		}

		if (key.name === "escape") {
			if (searchQuery()) {
				clearSearch();
				return;
			}
			cancel();
			return;
		}

		if (isSearchKey(key, searchQuery().length > 0)) {
			setSearchQuery((query) => query + key.sequence);
			setSelectedIndex(0);
			return;
		}

		switch (key.name) {
			case "up":
			case "k":
				moveBy(-1);
				break;
			case "down":
			case "j":
				moveBy(1);
				break;
			case "home":
			case "g":
				setSelectedIndex(0);
				break;
			case "end":
			case "G":
				setSelectedIndex(Math.max(0, projectCount() - 1));
				break;
			case "pageup":
				moveBy(-5);
				break;
			case "pagedown":
				moveBy(5);
				break;
			case "return":
			case "space":
				select();
				break;
			case "q":
				cancel();
				break;
			case "c":
				if (key.ctrl) cancel();
				break;
		}
	});

	return (
		<box
			flexDirection="column"
			width="100%"
			height="100%"
			backgroundColor={theme.bg}
			paddingX={2}
			paddingY={1}
		>
			<Header title={props.options.title} />
			<Show when={searchQuery()}>
				<SearchBar query={searchQuery()} />
			</Show>
			<ColumnLabels />
			<Divider />
			<scrollbox
				ref={(el) => {
					scrollBox = el ?? undefined;
				}}
				flexGrow={1}
				flexShrink={1}
				minHeight={0}
				marginY={1}
				width="100%"
				scrollX={false}
				scrollY={true}
				viewportCulling={true}
				contentOptions={{
					width: "100%",
					height: listHeight(),
				}}
				verticalScrollbarOptions={{
					trackOptions: {
						backgroundColor: theme.surface,
						foregroundColor: theme.borderStrong,
					},
				}}
			>
				<Show
					when={projectCount() > 0}
					fallback={
						<box height={3} alignItems="center" justifyContent="center">
							<text fg={theme.textMuted}>No matching projects</text>
						</box>
					}
				>
					<box flexDirection="column" gap={ROW_GAP} width="100%">
						<For each={filteredProjects()}>
							{(project, index) => (
								<Row
									project={project}
									accent={chartColor(index())}
									selected={index() === selectedIndex()}
								/>
							)}
						</For>
					</box>
				</Show>
			</scrollbox>
			<Divider />
			<Footer
				count={projectCount()}
				totalCount={allProjects().length}
				searchQuery={searchQuery()}
			/>
		</box>
	);
}

function Header(props: { title: string }) {
	return (
		<box flexDirection="row" height={1} marginBottom={1} flexShrink={0}>
			<text fg={theme.textBright} attributes={TextAttributes.BOLD} flexGrow={1}>
				{props.title}
			</text>
			<text fg={theme.textMuted}>
				type to search · ↑↓ navigate · ↵ select · esc clear · q quit
			</text>
		</box>
	);
}

function ColumnLabels() {
	return (
		<box flexDirection="row" height={1} paddingLeft={4} flexShrink={0}>
			<text
				fg={theme.textMuted}
				attributes={TextAttributes.BOLD}
				flexGrow={1}
				flexShrink={1}
			>
				Project ↑
			</text>
			<For each={METRIC_COLUMNS}>
				{(column) => (
					<text
						fg={theme.textMuted}
						attributes={TextAttributes.BOLD}
						flexShrink={0}
						width={column.width}
					>
						{padLeft(`${column.label} ⇅`, column.width)}
					</text>
				)}
			</For>
		</box>
	);
}

function SearchBar(props: { query: string }) {
	return (
		<box flexDirection="row" height={1} marginBottom={1} flexShrink={0}>
			<text fg={theme.textMuted}>/</text>
			<text fg={theme.selectedAccent}>{props.query}</text>
			<text fg={theme.textMuted}>█</text>
		</box>
	);
}

function Divider() {
	return <box height={1} backgroundColor={theme.border} flexShrink={0} />;
}

function Footer(props: {
	count: number;
	totalCount: number;
	searchQuery: string;
}) {
	const label = () => {
		if (props.searchQuery) {
			return `${props.count}/${props.totalCount} matching`;
		}
		return `${props.count} project${props.count === 1 ? "" : "s"}`;
	};

	return (
		<box flexDirection="row" height={1} marginTop={1} flexShrink={0}>
			<text fg={theme.textMuted} flexGrow={1}>
				{label()}
			</text>
			<text fg={theme.textMuted}>live</text>
		</box>
	);
}

interface RowProps {
	project: Project;
	accent: string;
	selected: boolean;
}

function Row(props: RowProps) {
	return (
		<box
			flexDirection="row"
			height={ROW_HEIGHT}
			flexShrink={0}
			backgroundColor={props.selected ? theme.selectedBg : theme.bg}
			alignItems="stretch"
		>
			<box
				backgroundColor={props.accent}
				alignItems="center"
				justifyContent="center"
				width={AVATAR_WIDTH}
				marginRight={1}
			>
				<text fg={theme.bg} attributes={TextAttributes.BOLD}>
					{props.project.name.charAt(0).toUpperCase()}
				</text>
			</box>

			<box flexDirection="column" flexGrow={1} justifyContent="center">
				<box flexDirection="row" height={1}>
					<text
						fg={props.selected ? theme.selectedAccent : theme.textBright}
						attributes={TextAttributes.BOLD}
						flexGrow={1}
						flexShrink={1}
					>
						{props.project.name}
					</text>
					<MetricValue metric={props.project.events} width={14} />
					<MetricValue metric={props.project.errors} width={12} />
					<MetricValue metric={props.project.users} width={14} />
				</box>

				<box flexDirection="row" height={1}>
					<text fg={theme.textDim} flexGrow={1} flexShrink={1}>
						{props.project.slug} {VISIBILITY_GLYPH[props.project.visibility]}
					</text>
					<MetricTrend trend={props.project.events.trend} width={14} />
					<MetricTrend trend={props.project.errors.trend} width={12} />
					<MetricTrend trend={props.project.users.trend} width={14} />
				</box>
			</box>
		</box>
	);
}

function MetricValue(props: { metric: Metric; width: number }) {
	return (
		<text
			width={props.width}
			flexShrink={0}
			fg={props.metric.value === 0 ? theme.textMuted : theme.text}
		>
			{padLeft(formatWidgetValue(props.metric.value), props.width)}
		</text>
	);
}

function MetricTrend(props: { trend: Trend; width: number }) {
	const info = () => formatTrend(props.trend);
	return (
		<text width={props.width} flexShrink={0} fg={info().color}>
			{padLeft(info().text, props.width)}
		</text>
	);
}
