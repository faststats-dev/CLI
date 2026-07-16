import { Console, Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { listDashboardProjects } from "../../project-list.ts";
import { writeSlugCache } from "../../project-slugs.ts";

export const projectListCommand = Command.make(
	"list",
	{},
	Effect.fnUntraced(function* () {
		const projects = yield* listDashboardProjects;

		yield* writeSlugCache(projects.map((project) => project.slug.slice(1)));

		if (projects.length === 0) {
			yield* Console.log("No projects found.");
			return;
		}

		yield* Console.table(
			projects.map((project) => ({
				NAME: project.name,
				SLUG: project.slug.slice(1),
				VISIBILITY: project.visibility,
			})),
		);
	}),
).pipe(Command.withDescription("List your projects"));
