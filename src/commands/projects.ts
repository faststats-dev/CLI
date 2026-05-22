import { Console, Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { FastStatsApi } from "../api-client.ts";
import type { ChartData, ChartFlowMetaLite, ChartQueryConfigLite } from "../data/chart-data.ts";
import type { ChartsListCharts200 } from "../api.ts";
import type { Project } from "../data/project.ts";
import {
    type ChartLite,
    type DashboardLite,
    type GridPosition,
    runDashboardView,
} from "../ui/dashboard-view.tsx";
import { runProjectsTable } from "../ui/projects-table.tsx";

const DEFAULT_TIME_RANGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

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
			preferredChartColors: item.preferredChartColors,
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

			const chartDataByDashboard = yield* Effect.all(
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
						Effect.map((response) => ({
							dashboardId: dashboard.id,
							charts: response.charts,
							flowMeta: response.flowMeta ?? null,
						})),
					),
				),
				{ concurrency: "unbounded" },
			).pipe(
				Effect.map((results) => {
					const byDashboard = new Map<
						string,
						{
							charts: Record<string, ChartData>;
							flowMeta: Record<string, ChartFlowMetaLite> | null;
						}
					>();
					for (const { dashboardId, charts, flowMeta } of results) {
						byDashboard.set(dashboardId, { charts, flowMeta });
					}
					return byDashboard;
				}),
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
