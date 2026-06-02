import { homedir } from "node:os";
import { join } from "node:path";
import { Clock, Effect, Option } from "effect";
import * as FileSystem from "effect/FileSystem";
import type { ProjectsGetProject200 } from "./api.ts";
import { FastStatsApi } from "./api-client.ts";

const CACHE_DIR = join(homedir(), ".cache", "faststats");
const CACHE_PATH = join(CACHE_DIR, "slugs.json");
const CACHE_TTL_MS = 5 * 60 * 1000;

interface SlugCache {
	readonly updatedAt: number;
	readonly slugs: ReadonlyArray<string>;
}

export const isWebProject = (
	project: ProjectsGetProject200,
): project is Extract<ProjectsGetProject200, { allowedHostnames: unknown }> =>
	"allowedHostnames" in project;

const fetchSlugs = Effect.gen(function* () {
	const api = yield* FastStatsApi;
	const { items } = yield* api.ProjectsListProjects(undefined);
	return items.map((item) => item.slug);
});

export const loadCachedProjectSlugs = Effect.gen(function* () {
	const fs = yield* FileSystem.FileSystem;
	const now = yield* Clock.currentTimeMillis;

	const cached = yield* fs.readFileString(CACHE_PATH).pipe(
		Effect.map((content) => JSON.parse(content) as SlugCache),
		Effect.option,
	);
	if (Option.isSome(cached) && now - cached.value.updatedAt < CACHE_TTL_MS) {
		return cached.value.slugs;
	}

	const fetched = yield* Effect.option(fetchSlugs);
	if (Option.isSome(fetched)) {
		yield* fs
			.makeDirectory(CACHE_DIR, { recursive: true })
			.pipe(
				Effect.andThen(
					fs.writeFileString(
						CACHE_PATH,
						JSON.stringify({ updatedAt: now, slugs: fetched.value }),
					),
				),
				Effect.ignore,
			);
		return fetched.value;
	}

	return Option.isSome(cached) ? cached.value.slugs : [];
});
