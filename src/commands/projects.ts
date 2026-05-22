import { Console, Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { FastStatsApi } from "../api-client.ts";
import type { ChartsListCharts200 } from "../api.ts";
import { toFiniteNumber } from "../data/chart-data.ts";
import type { ChartQueryConfigLite } from "../data/chart-data.ts";
import {
	EMPTY_METRIC,
	metricFromChange,
	type Project,
} from "../data/project.ts";
import {
	type ChartLite,
	type DashboardLite,
	type GridPosition,
	runDashboardView,
} from "../ui/dashboard-view.tsx";
import { runProjectsTable } from "../ui/projects-table.tsx";

const DEFAULT_TIME_RANGE_MS = 7 * 24 * 60 * 60 * 1000;

export const projectsCommand = Command.make("projects", {}, () =>
	Effect.gen(function* () {
		const api = yield* FastStatsApi;
		const response = yield* api.ProjectsListProjects(undefined);
		const dashboardStats = yield* api.MetricsGetProjectsDashboardData({
			payload: { projectIds: response.items.map((item) => item.id) },
		});

		const projects: ReadonlyArray<Project> = response.items.map((item) => {
			const stats = dashboardStats.stats[item.id];
			return {
				id: item.id,
				name: item.name,
				slug: `/${item.slug}`,
				visibility: item.private ? "private" : "public",
				preferredChartColors: item.preferredChartColors,
				events: stats
					? metricFromChange(
							toFiniteNumber(stats.events),
							toFiniteNumber(stats.eventsChange),
						)
					: EMPTY_METRIC,
				errors: stats
					? metricFromChange(
							toFiniteNumber(stats.errors),
							toFiniteNumber(stats.errorsChange),
						)
					: EMPTY_METRIC,
				users: stats
					? metricFromChange(
							toFiniteNumber(stats.users),
							toFiniteNumber(stats.usersChange),
						)
					: EMPTY_METRIC,
			};
		});

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

			const chartDataByDashboard = new Map(
				(yield* Effect.all(
					dashboards.map((dashboard) =>
						api.MetricsLoadDashboardData({
							payload: {
								projectId: project.id,
								dashboardId: dashboard.id,
								timeRange: {
									type: "relative",
									maxAgeMs: DEFAULT_TIME_RANGE_MS,
								},
							},
						}).pipe(
							Effect.map((response) => [
								dashboard.id,
								{
									charts: response.charts,
									flowMeta: response.flowMeta ?? null,
								},
							] as const),
						),
					),
					{ concurrency: "unbounded" },
				)),
			);

			const dashboardLite: ReadonlyArray<DashboardLite> = dashboards.map(
				(d) => ({
					id: d.id,
					name: d.name,
					isDefault: d.isDefault,
				}),
			);

			const chartLite: ReadonlyArray<ChartLite> = charts.map((c) => {
				const dashboardData =
					c.dashboardId != null
						? chartDataByDashboard.get(c.dashboardId)
						: null;
				return {
					id: c.id,
					name: c.name,
					chartType: c.chartType,
					dashboardId: c.dashboardId,
					position: toGridPosition(c.position),
					queryConfig: toQueryConfigLite(c.queryConfig),
					data: dashboardData?.charts[c.id] ?? null,
					flowMeta: dashboardData?.flowMeta?.[c.id] ?? null,
				};
			});

			yield* Effect.tryPromise(() =>
				runDashboardView({
					projectName: project.name,
					projectSlug: project.slug,
					preferredChartColors: project.preferredChartColors,
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
	const x = toFiniteNumber(pos.x);
	const y = toFiniteNumber(pos.y);
	const w = toFiniteNumber(pos.w);
	const h = toFiniteNumber(pos.h);
	if (x == null || y == null || w == null || h == null) return null;
	return { x, y, w, h };
}

type ApiChartQueryConfig = NonNullable<ChartsListCharts200[number]["queryConfig"]>;

function toQueryConfigLite(
	queryConfig: ApiChartQueryConfig | null,
): ChartQueryConfigLite | null {
	if (!queryConfig) return null;
	return {
		primaryMetric: queryConfig.primaryMetric
			? { field: queryConfig.primaryMetric.field }
			: null,
		metrics: queryConfig.metrics?.map((m) => ({ field: m.field })) ?? null,
		visualOptions: queryConfig.visualOptions
			? {
					colors: queryConfig.visualOptions.colors,
					widget: queryConfig.visualOptions.widget
						? {
								showTrend: queryConfig.visualOptions.widget.showTrend,
								displayMode: queryConfig.visualOptions.widget.displayMode,
								valueFormat: queryConfig.visualOptions.widget.valueFormat,
							}
						: null,
				}
			: null,
	};
}
