import {
    type CliRenderer,
    createCliRenderer,
    TextAttributes,
} from "@opentui/core";
import { render, useKeyboard, useRenderer } from "@opentui/solid";
import { createSignal, For } from "solid-js";
import type { Metric, Project, Trend } from "../data/mock-projects.ts";
import { chartColor, theme } from "./theme.ts";

interface Column {
	readonly id: "project" | "events" | "errors" | "users";
	readonly label: string;
	readonly width: number;
}

const COLUMNS: ReadonlyArray<Column> = [
	{ id: "project", label: "Project", width: 0 },
	{ id: "events", label: "Events", width: 14 },
	{ id: "errors", label: "Errors", width: 12 },
	{ id: "users", label: "Users", width: 14 },
];

const VISIBILITY_GLYPH = { public: "○", private: "⌧" } as const;

const ROW_HEIGHT = 3;
const ROW_GAP = 1;
const AVATAR_WIDTH = 3;

function formatCount(value: number): string {
	if (value === 0) return "0";
	if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
	if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
	return value.toString();
}

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
	const projectCount = () => props.options.projects.length;
	const [selectedIndex, setSelectedIndex] = createSignal(0);

	const moveBy = (delta: number) => {
		setSelectedIndex((current) =>
			Math.max(0, Math.min(projectCount() - 1, current + delta)),
		);
	};

	const select = () => {
		const project = props.options.projects[selectedIndex()];
		if (!project) return;
		props.setOutcome({ kind: "selected", project });
		renderer.destroy();
	};

	const cancel = () => {
		props.setOutcome({ kind: "cancelled" });
		renderer.destroy();
	};

	useKeyboard((key) => {
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
			case "escape":
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
			<ColumnLabels />
			<Divider />
			<box flexDirection="column" gap={ROW_GAP} marginY={1} flexGrow={1}>
				<For each={props.options.projects}>
					{(project, index) => (
						<Row
							project={project}
							accent={chartColor(index())}
							selected={index() === selectedIndex()}
						/>
					)}
				</For>
			</box>
			<Divider />
			<Footer count={projectCount()} />
		</box>
	);
}

function Header(props: { title: string }) {
	return (
		<box flexDirection="row" height={1} marginBottom={1}>
			<text fg={theme.textBright} attributes={TextAttributes.BOLD} flexGrow={1}>
				{props.title}
			</text>
			<text fg={theme.textMuted}>↑↓ navigate ↵ select q quit</text>
		</box>
	);
}

function ColumnLabels() {
	return (
		<box flexDirection="row" height={1} paddingLeft={4}>
			<For each={COLUMNS}>
				{(column) => {
					const isProject = column.id === "project";
					const label = isProject ? `${column.label} ↑` : `${column.label} ⇅`;
					return (
						<text
							fg={theme.textMuted}
							attributes={TextAttributes.BOLD}
							flexGrow={isProject ? 1 : 0}
							flexShrink={isProject ? 1 : 0}
							width={isProject ? "auto" : column.width}
						>
							{isProject ? label : padLeft(label, column.width)}
						</text>
					);
				}}
			</For>
		</box>
	);
}

function Divider() {
	return <box height={1} backgroundColor={theme.border} />;
}

function Footer(props: { count: number }) {
	return (
		<box flexDirection="row" height={1} marginTop={1}>
			<text fg={theme.textMuted} flexGrow={1}>
				{props.count} project{props.count === 1 ? "" : "s"}
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

			<box
				flexDirection="column"
				flexGrow={1}
				justifyContent="center"
			>
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
			{padLeft(formatCount(props.metric.value), props.width)}
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
