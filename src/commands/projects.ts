import { Console, Effect } from "effect";
import { Command } from "effect/unstable/cli";
import type { ChartsListCharts200 } from "../api.ts";
import { FastStatsApi } from "../api-client.ts";
import type { ChartData, ChartQueryConfigLite } from "../data/chart-data.ts";
import type { Project } from "../data/project.ts";
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

		const projects: ReadonlyArray<Project> = response.items.map((item) => ({
			id: item.id,
			name: item.name,
			slug: `/${item.slug}`,
			visibility: item.private ? "private" : "public",
			preferredChartColors: item.preferredChartColors,
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

			const dashboards = yield* api.DashboardsListDashboards(
				project.id,
				undefined,
			);
			const dashboardLite: ReadonlyArray<DashboardLite> = dashboards.map(
				(d) => ({
					id: d.id,
					name: d.name,
					isDefault: d.isDefault,
				}),
			);

			const loadDashboard = (dashboardId: string) =>
				Effect.gen(function* () {
					const charts = yield* api.ChartsListCharts(project.id, {
						params: { dashboardId },
					});
					if (charts.length === 0) return [] as const;

					const dashboardData = yield* api.MetricsLoadDashboardData({
						payload: {
							projectId: project.id,
							dashboardId,
							timeRange: {
								type: "relative",
								maxAgeMs: DEFAULT_TIME_RANGE_MS,
							},
						},
					});

					const chartData = dashboardData.charts as Record<string, ChartData>;
					return charts.map((c) =>
						toChartLite(c, chartData, dashboardData.flowMeta),
					);
				}).pipe(Effect.runPromise);

			yield* Effect.tryPromise(() =>
				runDashboardView({
					projectName: project.name,
					projectSlug: project.slug,
					preferredChartColors: project.preferredChartColors,
					dashboards: dashboardLite,
					loadDashboard,
				}),
			);
		}
	}),
).pipe(Command.withDescription("Browse projects in the terminal UI"));

function toChartLite(
	chart: ChartsListCharts200[number],
	chartData: Record<string, ChartData>,
	flowMeta: { readonly [x: string]: ChartLite["flowMeta"] } | null | undefined,
): ChartLite {
	return {
		id: chart.id,
		name: chart.name,
		chartType: chart.chartType,
		dashboardId: chart.dashboardId,
		position: toGridPosition(chart.position),
		queryConfig: toQueryConfigLite(chart.queryConfig),
		data: chartData[chart.id] ?? null,
		flowMeta: flowMeta?.[chart.id] ?? null,
	};
}

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
	const x = Number(pos.x);
	const y = Number(pos.y);
	const w = Number(pos.w);
	const h = Number(pos.h);
	if (![x, y, w, h].every(Number.isFinite)) return null;
	return { x, y, w, h };
}

type ApiChartQueryConfig = NonNullable<
	ChartsListCharts200[number]["queryConfig"]
>;

function toQueryConfigLite(
	queryConfig: ApiChartQueryConfig | null,
): ChartQueryConfigLite | null {
	if (!queryConfig) return null;
	const { primaryMetric, metrics, visualOptions } = queryConfig;
	return {
		primaryMetric: primaryMetric ? { field: primaryMetric.field } : null,
		metrics: metrics?.map((m) => ({ field: m.field })) ?? null,
		visualOptions: visualOptions
			? {
					colors: visualOptions.colors,
					widget: visualOptions.widget
						? {
								showTrend: visualOptions.widget.showTrend,
								displayMode: visualOptions.widget.displayMode,
								valueFormat: visualOptions.widget.valueFormat,
							}
						: null,
				}
			: null,
	};
}
