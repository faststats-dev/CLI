import { Console, Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { FastStatsApi } from "../api-client.ts";
import type { Project } from "../data/project.ts";
import {
	type ChartLite,
	type DashboardLite,
	type GridPosition,
	runDashboardView,
} from "../ui/dashboard-view.tsx";
import { runProjectsTable } from "../ui/projects-table.tsx";

const FLAT_TREND = { direction: "flat", percent: 0 } as const;
const ZERO_METRIC = { value: 0, trend: FLAT_TREND } as const;

export const projectsCommand = Command.make("projects", {}, () =>
	Effect.gen(function* () {
		const api = yield* FastStatsApi;
		const response = yield* api.ProjectsListProjects(undefined);

		const projects: ReadonlyArray<Project> = response.items.map((item) => ({
			id: item.id,
			name: item.name,
			slug: `/${item.slug}`,
			visibility: item.private ? "private" : "public",
			events: ZERO_METRIC,
			errors: ZERO_METRIC,
			users: ZERO_METRIC,
		}));

		while (true) {
			const result = yield* Effect.tryPromise(() =>
				runProjectsTable({
					title: "Projects",
					projects,
				}),
			);

			if (result.kind !== "selected") break;

			const project = result.project;
			yield* Console.log(`Loading ${project.name}…`);

			const [dashboards, charts] = yield* Effect.all(
				[
					api.DashboardsListDashboards(project.id, undefined),
					api.ChartsListCharts(project.id, undefined),
				],
				{ concurrency: "unbounded" },
			);

			const dashboardLite: ReadonlyArray<DashboardLite> = dashboards.map(
				(d) => ({
					id: d.id,
					name: d.name,
					isDefault: d.isDefault,
				}),
			);

			const chartLite: ReadonlyArray<ChartLite> = charts.map((c) => ({
				id: c.id,
				name: c.name,
				chartType: c.chartType,
				dashboardId: c.dashboardId,
				position: toGridPosition(c.position),
			}));

			yield* Effect.tryPromise(() =>
				runDashboardView({
					projectName: project.name,
					projectSlug: project.slug,
					dashboards: dashboardLite,
					charts: chartLite,
				}),
			);
		}
	}),
).pipe(Command.withDescription("Browse projects in the terminal UI"));

function toGridPosition(
	pos:
		| {
				readonly x: number | "NaN" | "Infinity" | "-Infinity";
				readonly y: number | "NaN" | "Infinity" | "-Infinity";
				readonly w: number | "NaN" | "Infinity" | "-Infinity";
				readonly h: number | "NaN" | "Infinity" | "-Infinity";
		  }
		| null
		| undefined,
): GridPosition | null {
	if (!pos) return null;
	const x = toFiniteOrNull(pos.x);
	const y = toFiniteOrNull(pos.y);
	const w = toFiniteOrNull(pos.w);
	const h = toFiniteOrNull(pos.h);
	if (x === null || y === null || w === null || h === null) return null;
	return { x, y, w, h };
}

function toFiniteOrNull(
	value: number | "NaN" | "Infinity" | "-Infinity",
): number | null {
	if (typeof value === "number" && Number.isFinite(value)) return value;
	return null;
}
