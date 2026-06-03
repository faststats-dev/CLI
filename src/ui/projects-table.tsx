import {
	type KeyEvent,
	type ScrollBoxRenderable,
	TextAttributes,
} from "@opentui/core";
import { render, useKeyboard } from "@opentui/solid";
import {
	type Accessor,
	createEffect,
	createMemo,
	createSignal,
	For,
	Show,
} from "solid-js";
import type { Project } from "../data/project.ts";
import { Divider } from "./divider.tsx";
import { runOpenTui } from "./open-tui.ts";
import { chartColor, theme } from "./theme.ts";

const VISIBILITY_GLYPH = { public: "○", private: "⌧" } as const;
const ROW_HEIGHT = 3;
const ROW_GAP = 1;
const ROW_STRIDE = ROW_HEIGHT + ROW_GAP;
const AVATAR_WIDTH = 3;

const scoreProject = (project: Project, query: string): number => {
	const name = project.name.toLowerCase();
	const slug = project.slug.toLowerCase();
	const slugBare = slug.replace(/^\//, "");

	if (name === query || slug === query || slugBare === query) return 100;
	if (name.startsWith(query) || slugBare.startsWith(query)) return 80;
	if (name.includes(query) || slugBare.includes(query)) return 60;
	return 0;
};

const filterProjects = (
	projects: ReadonlyArray<Project>,
	rawQuery: string,
): ReadonlyArray<Project> => {
	const query = rawQuery.trim().toLowerCase();
	if (!query) return projects;

	return projects
		.map((project) => ({ project, score: scoreProject(project, query) }))
		.filter((entry) => entry.score > 0)
		.sort(
			(a, b) =>
				b.score - a.score ||
				a.project.name.localeCompare(b.project.name, undefined, {
					sensitivity: "base",
				}),
		)
		.map((entry) => entry.project);
};

const isSearchKey = (key: KeyEvent, searching: boolean) => {
	if (key.ctrl || key.meta || key.sequence.length !== 1) return false;
	const ch = key.sequence;
	if (ch < "!" || ch > "~" || ch === " ") return false;
	if (!searching && (ch === "j" || ch === "k" || ch === "g" || ch === "q")) {
		return false;
	}
	return true;
};

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
	return runOpenTui(({ renderer, close }) =>
		render(() => <ProjectsApp options={options} onDone={close} />, renderer),
	);
}

interface ProjectsAppProps {
	options: RunProjectsTableOptions;
	onDone: (result: RunProjectsTableResult) => void;
}

function ProjectsApp(props: ProjectsAppProps) {
	const [searchQuery, setSearchQuery] = createSignal("");
	const visibleProjects = createMemo(() =>
		filterProjects(props.options.projects, searchQuery()),
	);
	const list = useSelectableList(() => visibleProjects().length);

	useKeyboard((key) => {
		if (key.name === "backspace") {
			if (searchQuery()) setSearchQuery((query) => query.slice(0, -1));
			return;
		}

		if (key.name === "escape") {
			if (searchQuery()) {
				setSearchQuery("");
				return;
			}
			props.onDone({ kind: "cancelled" });
			return;
		}

		if (isSearchKey(key, searchQuery().length > 0)) {
			setSearchQuery((query) => query + key.sequence);
			return;
		}

		if (key.name === "return" || key.name === "space") {
			const project = visibleProjects()[list.index()];
			if (project) props.onDone({ kind: "selected", project });
			return;
		}

		if (key.name === "q" || (key.name === "c" && key.ctrl)) {
			props.onDone({ kind: "cancelled" });
			return;
		}

		const navigation: Partial<
			Record<KeyEvent["name"], number | "start" | "end">
		> = {
			up: -1,
			k: -1,
			down: 1,
			j: 1,
			pageup: -5,
			pagedown: 5,
			home: "start",
			g: "start",
			end: "end",
			G: "end",
		};

		const action = navigation[key.name];
		if (action === "start") list.goTo(0);
		else if (action === "end") list.goTo(visibleProjects().length - 1);
		else if (typeof action === "number") list.moveBy(action);
	});

	createEffect(() => {
		searchQuery();
		list.goTo(0);
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
			<Header title={props.options.title} searchQuery={searchQuery()} />
			<ColumnLabels />
			<Divider />
			<scrollbox
				ref={list.bindScrollTarget}
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
					height: "auto",
				}}
				verticalScrollbarOptions={{
					trackOptions: {
						backgroundColor: theme.surface,
						foregroundColor: theme.borderStrong,
					},
				}}
			>
				<Show
					when={visibleProjects().length > 0}
					fallback={
						<box height={3} alignItems="center" justifyContent="center">
							<text fg={theme.textMuted}>No matching projects</text>
						</box>
					}
				>
					<box flexDirection="column" gap={ROW_GAP} width="100%">
						<For each={visibleProjects()}>
							{(project, index) => (
								<ProjectRow
									project={project}
									accent={chartColor(index())}
									selected={index() === list.index()}
								/>
							)}
						</For>
					</box>
				</Show>
			</scrollbox>
			<Divider />
			<Footer
				visibleCount={visibleProjects().length}
				totalCount={props.options.projects.length}
				searchQuery={searchQuery()}
			/>
		</box>
	);
}

function useSelectableList(itemCount: Accessor<number>) {
	const [index, setIndex] = createSignal(0);
	let scrollTarget: ScrollBoxRenderable | undefined;

	const clamp = (value: number) => {
		const max = Math.max(0, itemCount() - 1);
		return Math.min(max, Math.max(0, value));
	};

	createEffect(() => {
		itemCount();
		scrollTarget?.scrollTo({ x: 0, y: index() * ROW_STRIDE });
	});

	return {
		index,
		goTo: (next: number) => setIndex(clamp(next)),
		moveBy: (delta: number) => setIndex((current) => clamp(current + delta)),
		bindScrollTarget: (element: ScrollBoxRenderable | undefined) => {
			scrollTarget = element;
		},
	};
}

function Header(props: { title: string; searchQuery: string }) {
	return (
		<box flexDirection="column" flexShrink={0} marginBottom={1}>
			<box flexDirection="row" height={1}>
				<text
					fg={theme.textBright}
					attributes={TextAttributes.BOLD}
					flexGrow={1}
				>
					{props.title}
				</text>
				<text fg={theme.textMuted}>↑↓ ↵ select · esc clear · q quit</text>
			</box>
			<Show when={props.searchQuery}>
				<box flexDirection="row" height={1} marginTop={1}>
					<text fg={theme.textMuted}>/</text>
					<text fg={theme.selectedAccent}>{props.searchQuery}</text>
				</box>
			</Show>
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
		</box>
	);
}

function Footer(props: {
	visibleCount: number;
	totalCount: number;
	searchQuery: string;
}) {
	const label = () =>
		props.searchQuery
			? `${props.visibleCount}/${props.totalCount} matching`
			: `${props.visibleCount} project${props.visibleCount === 1 ? "" : "s"}`;

	return (
		<box flexDirection="row" height={1} marginTop={1} flexShrink={0}>
			<text fg={theme.textMuted} flexGrow={1}>
				{label()}
			</text>
			<text fg={theme.textMuted}>live</text>
		</box>
	);
}

function ProjectRow(props: {
	project: Project;
	accent: string;
	selected: boolean;
}) {
	const nameColor = () =>
		props.selected ? theme.selectedAccent : theme.textBright;

	return (
		<box
			flexDirection="row"
			height={ROW_HEIGHT}
			flexShrink={0}
			backgroundColor={props.selected ? theme.selectedBg : theme.bg}
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
						fg={nameColor()}
						attributes={TextAttributes.BOLD}
						flexGrow={1}
						flexShrink={1}
					>
						{props.project.name}
					</text>
				</box>
				<box flexDirection="row" height={1}>
					<text fg={theme.textDim} flexGrow={1} flexShrink={1}>
						{props.project.slug} {VISIBILITY_GLYPH[props.project.visibility]}
					</text>
				</box>
			</box>
		</box>
	);
}
