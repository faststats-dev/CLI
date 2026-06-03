import { homedir } from "node:os";
import { join } from "node:path";
import { Clock, Effect, Option, Schema } from "effect";
import * as FileSystem from "effect/FileSystem";
import type { ProjectsGetProject200 } from "./api.ts";
import { FastStatsApi } from "./api-client.ts";

const CACHE_DIR = join(homedir(), ".cache", "faststats");
const CACHE_PATH = join(CACHE_DIR, "slugs.json");
const COMPLETION_FETCH_TIMEOUT = "2 seconds";
const NO_SLUGS: ReadonlyArray<string> = [];

const SlugCacheFile = Schema.Struct({
	updatedAt: Schema.Number,
	slugs: Schema.Array(Schema.String),
});

export const isWebProject = (
	project: ProjectsGetProject200,
): project is Extract<ProjectsGetProject200, { allowedHostnames: unknown }> =>
	"allowedHostnames" in project;

const fetchSlugs = Effect.gen(function* () {
	const api = yield* FastStatsApi;
	const { items } = yield* api.ProjectsListProjects(undefined);
	return items.map((item) => item.slug);
});

const readCachedSlugs = Effect.gen(function* () {
	const fs = yield* FileSystem.FileSystem;
	const content = yield* fs.readFileString(CACHE_PATH).pipe(Effect.option);
	if (Option.isNone(content)) {
		return Option.none<ReadonlyArray<string>>();
	}

	const file = yield* Effect.try({
		try: () => JSON.parse(content.value),
		catch: () => new Error("invalid json"),
	}).pipe(
		Effect.flatMap(Schema.decodeUnknownEffect(SlugCacheFile)),
		Effect.option,
	);

	return Option.map(file, (cache) => cache.slugs);
});

const slugsFromNetwork = fetchSlugs.pipe(
	Effect.timeoutOption(COMPLETION_FETCH_TIMEOUT),
	Effect.map(Option.getOrElse(() => NO_SLUGS)),
	Effect.catch(() => Effect.succeed(NO_SLUGS)),
);

export const writeSlugCache = (slugs: ReadonlyArray<string>) =>
	Effect.gen(function* () {
		const fs = yield* FileSystem.FileSystem;
		const now = yield* Clock.currentTimeMillis;
		const cache: typeof SlugCacheFile.Type = { updatedAt: now, slugs };
		yield* fs
			.makeDirectory(CACHE_DIR, { recursive: true })
			.pipe(
				Effect.andThen(fs.writeFileString(CACHE_PATH, JSON.stringify(cache))),
				Effect.ignore,
			);
	});

export const loadSlugsForCompletion = readCachedSlugs.pipe(
	Effect.flatMap(
		Option.match({
			onNone: () => slugsFromNetwork,
			onSome: Effect.succeed,
		}),
	),
);
