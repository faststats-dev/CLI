import { join } from "node:path";
import { Clock, Effect, Option } from "effect";
import * as FileSystem from "effect/FileSystem";
import type { ProjectsGetProject200 } from "./api.ts";
import { FastStatsApi } from "./api-client.ts";
import { CONFIG_DIR } from "./config.ts";

const SLUG_CACHE_PATH = join(CONFIG_DIR, "cache", "project-slugs.json");
const SLUG_CACHE_TTL_MS = 5 * 60 * 1000;

interface SlugCache {
	readonly updatedAt: number;
	readonly slugs: ReadonlyArray<string>;
}

export const isWebProject = (
	project: ProjectsGetProject200,
): project is Extract<ProjectsGetProject200, { allowedHostnames: unknown }> =>
	"allowedHostnames" in project;

export const listProjectSlugs = Effect.gen(function* () {
	const api = yield* FastStatsApi;
	const response = yield* api.ProjectsListProjects(undefined);
	return response.items.map((item) => item.slug);
});

const readSlugCache = Effect.gen(function* () {
	const fs = yield* FileSystem.FileSystem;
	if (!(yield* fs.exists(SLUG_CACHE_PATH))) {
		return Option.none<SlugCache>();
	}
	const content = yield* fs.readFileString(SLUG_CACHE_PATH);
	const parsed = yield* Effect.try({
		try: () => JSON.parse(content) as SlugCache,
		catch: () => new Error(`Failed to parse ${SLUG_CACHE_PATH}`),
	});
	return Option.some(parsed);
}).pipe(Effect.orElseSucceed(() => Option.none<SlugCache>()));

const writeSlugCache = (slugs: ReadonlyArray<string>) =>
	Effect.gen(function* () {
		const fs = yield* FileSystem.FileSystem;
		const updatedAt = yield* Clock.currentTimeMillis;
		yield* fs.makeDirectory(join(CONFIG_DIR, "cache"), { recursive: true });
		yield* fs.writeFileString(
			SLUG_CACHE_PATH,
			JSON.stringify({ updatedAt, slugs } satisfies SlugCache),
		);
	}).pipe(Effect.ignore);

export const loadCachedProjectSlugs = Effect.gen(function* () {
	const now = yield* Clock.currentTimeMillis;
	const cache = yield* readSlugCache;

	if (Option.isSome(cache) && now - cache.value.updatedAt < SLUG_CACHE_TTL_MS) {
		return cache.value.slugs;
	}

	const fetched = yield* Effect.option(listProjectSlugs);
	if (Option.isSome(fetched)) {
		yield* writeSlugCache(fetched.value);
		return fetched.value;
	}

	return Option.isSome(cache) ? cache.value.slugs : [];
});
