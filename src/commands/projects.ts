import { Console, Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { FastStatsApi } from "../api-client.ts";
import type { Project } from "../data/mock-projects.ts";
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

		const result = yield* Effect.tryPromise(() =>
			runProjectsTable({
				title: "Projects",
				projects,
			}),
		);

		if (result.kind === "selected") {
			yield* Console.log(result.project.name);
		}
	}),
);
