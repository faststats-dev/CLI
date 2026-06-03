import { Console, Effect } from "effect";
import type { DashboardsListDashboards200 } from "../api.ts";
import { FastStatsApi } from "../api-client.ts";
import { mergeDashboardCharts } from "../data/chart-data.ts";
import type { Project } from "../data/project.ts";
import { runDashboardView } from "../ui/dashboard-view.tsx";
import { runProjectsTable } from "../ui/projects-table.tsx";

const DEFAULT_TIME_RANGE_MS = 7 * 24 * 60 * 60 * 1000;

export interface BrowseDashboardsOptions {
	readonly title: string;
	readonly projects: ReadonlyArray<Project>;
	readonly dashboardFilter?: (
		dashboard: DashboardsListDashboards200[number],
	) => boolean;
}

export const browseDashboards = Effect.fnUntraced(function* (
	options: BrowseDashboardsOptions,
) {
	const api = yield* FastStatsApi;

	while (true) {
		const result = yield* Effect.tryPromise(() =>
			runProjectsTable({
				title: options.title,
				projects: options.projects,
			}),
		);
		if (result.kind !== "selected") break;

		const project = result.project;
		yield* Console.log(`Loading ${project.name}…`);

		const allDashboards = yield* api.DashboardsListDashboards(
			project.id,
			undefined,
		);
		const dashboards = options.dashboardFilter
			? allDashboards.filter(options.dashboardFilter)
			: allDashboards;

		const loadDashboard = (dashboardId: string) =>
			Effect.gen(function* () {
				const charts = yield* api.ChartsListCharts(project.id, {
					params: { dashboardId },
				});
				if (!charts.length) return [] as const;
				return mergeDashboardCharts(
					charts,
					yield* api.MetricsLoadDashboardData({
						payload: {
							projectId: project.id,
							dashboardId,
							timeRange: {
								type: "relative",
								maxAgeMs: DEFAULT_TIME_RANGE_MS,
							},
						},
					}),
				);
			}).pipe(Effect.runPromise);

		yield* Effect.tryPromise(() =>
			runDashboardView({ project, dashboards, loadDashboard }),
		);
	}
});
