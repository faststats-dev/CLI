import { Effect } from "effect";
import { FastStatsApi } from "./api-client.ts";
import type { ProjectsGetProject200 } from "./api.ts";

export const isWebProject = (
	project: ProjectsGetProject200,
): project is Extract<ProjectsGetProject200, { allowedHostnames: unknown }> =>
	"allowedHostnames" in project;

export type ProjectEntry = {
	readonly slug: string;
	readonly isWeb: boolean;
};

export const listProjectEntries = Effect.gen(function* () {
	const api = yield* FastStatsApi;
	const response = yield* api.ProjectsListProjects(undefined);

	return yield* Effect.forEach(
		response.items,
		(item) =>
			Effect.gen(function* () {
				const project = yield* api.ProjectsGetProject(item.slug, undefined);
				return { slug: item.slug, isWeb: isWebProject(project) };
			}),
		{ concurrency: "unbounded" },
	);
});

export const listProjectSlugs = listProjectEntries.pipe(
	Effect.map((entries) => entries.map((entry) => entry.slug)),
);

export const normalizeSlug = (slug: string): string =>
	slug.startsWith("/") ? slug.slice(1) : slug;
