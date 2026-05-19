import { Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { buildProjectCommand } from "./commands/project/build.ts";
import { configCommand } from "./commands/config.ts";
import { projectsCommand } from "./commands/projects.ts";

export const buildRootCommand = Effect.gen(function* () {
	const projectCommand = yield* buildProjectCommand;

	return Command.make("faststats", {}, () => Effect.void).pipe(
		Command.withDescription("FastStats CLI"),
		Command.withSubcommands([projectsCommand, projectCommand, configCommand]),
	);
});
