import { Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { FastStatsApi } from "../api-client.ts";
import type { Project } from "../data/project.ts";
import { browseDashboards } from "./browse-dashboards.ts";

export const exploreCommand = Command.make(
	"explore",
	{},
	Effect.fnUntraced(function* () {
		const api = yield* FastStatsApi;
		const response = yield* api.ProjectsListPublicProjects(undefined);

		const projects: ReadonlyArray<Project> = response.items.map((item) => ({
			id: item.id,
			name: item.name,
			slug: `/${item.slug}`,
			visibility: "public",
			preferredChartColors: null,
		}));

		yield* browseDashboards({
			title: "Explore",
			projects,
			dashboardFilter: (dashboard) => dashboard.isPublic,
		});
	}),
).pipe(
	Command.withDescription(
		"Explore public projects and their dashboards in the terminal UI",
	),
);
