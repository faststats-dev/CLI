import { Effect } from "effect";
import { FastStatsApi } from "./api-client.ts";

export const listProjectSlugs = Effect.gen(function* () {
	const api = yield* FastStatsApi;
	const response = yield* api.ProjectsListProjects(undefined);
	return response.items.map((item) => item.slug);
});

export const normalizeSlug = (slug: string): string =>
	slug.startsWith("/") ? slug.slice(1) : slug;
