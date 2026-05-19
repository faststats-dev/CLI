import { Effect, Option } from "effect";
import { Command } from "effect/unstable/cli";
import { listProjectEntries } from "../../project-slugs.ts";
import { projectCreateCommand } from "./create.ts";
import { projectListCommand } from "./list.ts";
import { makeSlugScopedCommand } from "./slug-scope.ts";

export const buildProjectCommand = Effect.gen(function* () {
	const entriesOption = yield* Effect.option(listProjectEntries);
	const entries = Option.getOrElse(entriesOption, () => []);

	const slugCommands = entries.map(({ slug, isWeb }) =>
		makeSlugScopedCommand(slug, isWeb),
	);

	return Command.make("project", {}).pipe(
		Command.withDescription("Manage FastStats projects"),
		Command.withSubcommands([
			projectCreateCommand,
			projectListCommand,
			...slugCommands,
		]),
	);
});
