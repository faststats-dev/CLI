import { Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { loadCachedProjectSlugs } from "../../project-slugs.ts";
import { projectCreateCommand } from "./create.ts";
import { projectListCommand } from "./list.ts";
import { makeSlugScopedCommand } from "./slug-scope.ts";

export const buildProjectCommand = Effect.gen(function* () {
	const slugs = process.argv.includes("project")
		? yield* loadCachedProjectSlugs
		: [];

	const slugCommands = slugs.map((slug) => makeSlugScopedCommand(slug));

	return Command.make("project", {}).pipe(
		Command.withDescription("Manage FastStats projects"),
		Command.withSubcommands([
			projectCreateCommand,
			projectListCommand,
			...slugCommands,
		]),
	);
});
