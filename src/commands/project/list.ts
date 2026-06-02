import { Console, Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { FastStatsApi } from "../../api-client.ts";
import { writeSlugCache } from "../../project-slugs.ts";

export const projectListCommand = Command.make(
	"list",
	{},
	Effect.fnUntraced(function* () {
		const api = yield* FastStatsApi;
		const response = yield* api.ProjectsListProjects(undefined);

		yield* writeSlugCache(response.items.map((item) => item.slug));

		if (response.items.length === 0) {
			yield* Console.log("No projects found.");
			return;
		}

		yield* Console.table(
			response.items.map((item) => ({
				NAME: item.name,
				SLUG: item.slug,
				VISIBILITY: item.private ? "private" : "public",
			})),
		);
	}),
).pipe(Command.withDescription("List your projects"));
