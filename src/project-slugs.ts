import { homedir } from "node:os";
import { join } from "node:path";
import { Clock, Effect, Option } from "effect";
import * as FileSystem from "effect/FileSystem";
import type { ProjectsGetProject200 } from "./api.ts";
import { FastStatsApi } from "./api-client.ts";

const CACHE_DIR = join(homedir(), ".cache", "faststats");
const CACHE_PATH = join(CACHE_DIR, "slugs.json");
const COMPLETION_FETCH_TIMEOUT = "2 seconds";

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

const readCache = Effect.gen(function* () {
	const fs = yield* FileSystem.FileSystem;
	return yield* fs.readFileString(CACHE_PATH).pipe(
		Effect.map((content) => JSON.parse(content) as SlugCache),
		Effect.option,
	);
});

export const writeSlugCache = (slugs: ReadonlyArray<string>) =>
	Effect.gen(function* () {
		const fs = yield* FileSystem.FileSystem;
		const now = yield* Clock.currentTimeMillis;
		yield* fs
			.makeDirectory(CACHE_DIR, { recursive: true })
			.pipe(
				Effect.andThen(
					fs.writeFileString(
						CACHE_PATH,
						JSON.stringify({ updatedAt: now, slugs } satisfies SlugCache),
					),
				),
				Effect.ignore,
			);
	});

export const loadSlugsForCompletion = Effect.gen(function* () {
	const cached = yield* readCache;
	if (Option.isSome(cached)) {
		return cached.value.slugs;
	}

	const fetched = yield* fetchSlugs.pipe(
		Effect.timeoutOption(COMPLETION_FETCH_TIMEOUT),
		Effect.option,
		Effect.map(Option.flatten),
	);

	if (Option.isSome(fetched)) {
		yield* writeSlugCache(fetched.value);
		return fetched.value;
	}

	return [] as ReadonlyArray<string>;
});
