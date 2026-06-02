import { Console, Effect } from "effect";
import { Argument, Command } from "effect/unstable/cli";
import { FastStatsApi } from "../../api-client.ts";
import { isWebProject } from "../../project-slugs.ts";

const slugArgument = Argument.string("slug").pipe(
	Argument.withDescription("Project slug"),
);

const hostnamesListCommand = Command.make(
	"list",
	{
		slug: slugArgument,
	},
	Effect.fnUntraced(function* ({ slug }) {
		const api = yield* FastStatsApi;
		const project = yield* api.ProjectsGetProject(slug, undefined);

		if (!isWebProject(project)) {
			yield* Console.log("Hostnames are only available for web projects.");
			return;
		}

		const hostnames = project.allowedHostnames ?? [];
		if (hostnames.length === 0) {
			yield* Console.log("No allowed hostnames configured.");
			return;
		}

		for (const hostname of hostnames) {
			yield* Console.log(hostname);
		}
	}),
).pipe(Command.withDescription("List allowed hostnames"));

const hostnamesSetCommand = Command.make(
	"set",
	{
		slug: slugArgument,
		hostnames: Argument.string("hostname").pipe(
			Argument.variadic({ min: 1 }),
			Argument.withDescription("Allowed hostnames"),
		),
	},
	Effect.fnUntraced(function* ({ slug, hostnames }) {
		const api = yield* FastStatsApi;
		const existing = yield* api.ProjectsGetProject(slug, undefined);

		if (!isWebProject(existing)) {
			yield* Console.log("Hostnames are only available for web projects.");
			return;
		}

		const updated = yield* api.ProjectsUpdateProject(existing.id, {
			payload: {
				allowedHostnames: hostnames,
			},
		});

		yield* Console.log(`Updated allowed hostnames for ${updated.slug}:`);
		const list = isWebProject(updated)
			? (updated.allowedHostnames ?? hostnames)
			: hostnames;
		for (const hostname of list) {
			yield* Console.log(`  ${hostname}`);
		}
	}),
).pipe(Command.withDescription("Set allowed hostnames"));

export const hostnamesCommand = Command.make("hostnames", {}).pipe(
	Command.withDescription("Manage allowed hostnames"),
	Command.withSubcommands([hostnamesListCommand, hostnamesSetCommand]),
);
