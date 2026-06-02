import { Console, Effect } from "effect";
import { Argument, Command } from "effect/unstable/cli";
import { FastStatsApi } from "../../api-client.ts";
import { isWebProject } from "../../project-slugs.ts";

export const projectShowCommand = Command.make(
	"show",
	{
		slug: Argument.string("slug").pipe(
			Argument.withDescription("Project slug"),
		),
	},
	Effect.fnUntraced(function* ({ slug }) {
		const api = yield* FastStatsApi;
		const project = yield* api.ProjectsGetProject(slug, undefined);

		yield* Console.log(`${project.name} (${project.slug})`);
		yield* Console.log(`  id:       ${project.id}`);
		yield* Console.log(`  private:  ${project.private ? "yes" : "no"}`);

		if (
			isWebProject(project) &&
			project.allowedHostnames &&
			project.allowedHostnames.length > 0
		) {
			yield* Console.log(`  hostnames: ${project.allowedHostnames.join(", ")}`);
		}
	}),
).pipe(Command.withDescription("Show project details"));
