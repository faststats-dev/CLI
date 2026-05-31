import { Console, Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { FastStatsApi } from "../api-client.ts";
import type { ChartData } from "../data/chart-data.ts";
import type { Project } from "../data/project.ts";
import {
	type DashboardChart,
	type DashboardLite,
	runDashboardView,
} from "../ui/dashboard-view.tsx";
import { runProjectsTable } from "../ui/projects-table.tsx";

const DEFAULT_TIME_RANGE_MS = 7 * 24 * 60 * 60 * 1000;

export const dashboardCommand = Command.make(
	"dashboard",
	{},
	Effect.fnUntraced(function* () {
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

					const chartDataById = dashboardData.charts as Record<
						string,
						ChartData
					>;
					return charts.map(
						(chart): DashboardChart => ({
							...chart,
							data: chartDataById[chart.id] ?? null,
							flowMeta: dashboardData.flowMeta?.[chart.id] ?? null,
						}),
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
).pipe(Command.withDescription("Browse project dashboards in the terminal UI"));
