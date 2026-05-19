import { Effect, Option } from "effect";
import { Command } from "effect/unstable/cli";
import { listProjectSlugs } from "../../project-slugs.ts";
import { projectCreateCommand } from "./create.ts";
import { projectListCommand } from "./list.ts";
import { makeSlugScopedCommand } from "./slug-scope.ts";

export const buildProjectCommand = Effect.gen(function* () {
	const slugsOption = yield* Effect.option(listProjectSlugs);
	const slugs = Option.getOrElse(slugsOption, () => [] as ReadonlyArray<string>);

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
