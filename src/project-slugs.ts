import { Effect } from "effect";
import { FastStatsApi } from "./api-client.ts";
import type { ProjectsGetProject200 } from "./api.ts";

export const isWebProject = (
	project: ProjectsGetProject200,
): project is Extract<ProjectsGetProject200, { allowedHostnames: unknown }> =>
	"allowedHostnames" in project;

export const listProjectSlugs = Effect.gen(function* () {
	const api = yield* FastStatsApi;
	const response = yield* api.ProjectsListProjects(undefined);
	return response.items.map((item) => item.slug);
});
