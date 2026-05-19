import { Console, Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { FastStatsApi } from "../../api-client.ts";
import { makeHostnamesCommand } from "./hostnames.ts";
import { makeNetworkCommand } from "./network/index.ts";

const makeShowCommand = (slug: string) =>
	Command.make("show", {}, () =>
		Effect.gen(function* () {
			const api = yield* FastStatsApi;
			const project = yield* api.ProjectsGetProject(slug, undefined);

			yield* Console.log(`${project.name} (${project.slug})`);
			yield* Console.log(`  id:       ${project.id}`);
			yield* Console.log(
				`  private:  ${project.private ? "yes" : "no"}`,
			);

			if ("allowedHostnames" in project && project.allowedHostnames) {
				yield* Console.log(
					`  hostnames: ${project.allowedHostnames.join(", ")}`,
				);
			}
		}),
	).pipe(Command.withDescription("Show project details"));

export const makeSlugScopedCommand = (slug: string) =>
	Command.make(slug, {}).pipe(
		Command.withDescription(`Manage project ${slug}`),
		Command.withSubcommands([
			makeShowCommand(slug),
			makeNetworkCommand(slug),
			makeHostnamesCommand(slug),
		]),
	);
