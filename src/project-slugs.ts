import { homedir } from "node:os";
import { join } from "node:path";
import { Clock, Effect, Option } from "effect";
import * as FileSystem from "effect/FileSystem";
import type { ProjectsGetProject200 } from "./api.ts";
import { FastStatsApi } from "./api-client.ts";

const CACHE_DIR = join(homedir(), ".cache", "faststats");
const CACHE_PATH = join(CACHE_DIR, "slugs.json");
const COMPLETION_FETCH_TIMEOUT = "2 seconds";

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
	return yield* fs.readFileString(CACHE_PATH).pipe(Effect.map(JSON.parse));
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
						JSON.stringify({ updatedAt: now, slugs }),
					),
				),
				Effect.ignore,
			);
	});

export const loadSlugsForCompletion = Effect.gen(function* () {
	const cached = yield* readCache;
	if (Option.isSome(cached)) {
		return cached;
	}

	return yield* fetchSlugs.pipe(
		Effect.timeoutOption(COMPLETION_FETCH_TIMEOUT),
		Effect.option,
	);
});
