import { Console, Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { FastStatsApi } from "../../api-client.ts";

export const projectListCommand = Command.make(
	"list",
	{},
	Effect.fnUntraced(function* () {
		const api = yield* FastStatsApi;
		const response = yield* api.ProjectsListProjects(undefined);

		if (response.items.length === 0) {
			yield* Console.log("No projects found.");
			return;
		}

		const nameWidth = Math.max(
			4,
			...response.items.map((item) => item.name.length),
		);
		const slugWidth = Math.max(
			4,
			...response.items.map((item) => item.slug.length),
		);

		yield* Console.log(
			`${"NAME".padEnd(nameWidth)}  ${"SLUG".padEnd(slugWidth)}  VISIBILITY`,
		);

		for (const item of response.items) {
			const visibility = item.private ? "private" : "public";
			yield* Console.log(
				`${item.name.padEnd(nameWidth)}  ${item.slug.padEnd(slugWidth)}  ${visibility}`,
			);
		}
	}),
).pipe(Command.withDescription("List your projects"));
