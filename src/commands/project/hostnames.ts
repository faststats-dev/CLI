import { Console, Effect } from "effect";
import { Argument, Command } from "effect/unstable/cli";
import { FastStatsApi } from "../../api-client.ts";

export const makeHostnamesCommand = (slug: string) => {
	const listCommand = Command.make("list", {}, () =>
		Effect.gen(function* () {
			const api = yield* FastStatsApi;
			const project = yield* api.ProjectsGetProject(slug, undefined);

			if (!("allowedHostnames" in project) || !project.allowedHostnames) {
				yield* Console.log("No allowed hostnames configured.");
				return;
			}

			if (project.allowedHostnames.length === 0) {
				yield* Console.log("No allowed hostnames configured.");
				return;
			}

			for (const hostname of project.allowedHostnames) {
				yield* Console.log(hostname);
			}
		}),
	).pipe(Command.withDescription("List allowed hostnames"));

	const setCommand = Command.make(
		"set",
		{
			hostnames: Argument.string("hostname").pipe(
				Argument.variadic({ min: 1 }),
				Argument.withDescription("Allowed hostnames"),
			),
		},
		({ hostnames }) =>
			Effect.gen(function* () {
				const api = yield* FastStatsApi;
				const existing = yield* api.ProjectsGetProject(slug, undefined);

				const updated = yield* api.ProjectsUpdateProject(existing.id, {
					payload: {
						allowedHostnames: hostnames,
					},
				});

				yield* Console.log(`Updated allowed hostnames for ${updated.slug}:`);
				const list =
					"allowedHostnames" in updated && updated.allowedHostnames
						? updated.allowedHostnames
						: hostnames;
				for (const hostname of list) {
					yield* Console.log(`  ${hostname}`);
				}
			}),
	).pipe(Command.withDescription("Set allowed hostnames"));

	return Command.make("hostnames", {}).pipe(
		Command.withDescription("Manage allowed hostnames"),
		Command.withSubcommands([listCommand, setCommand]),
	);
};
