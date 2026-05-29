import { Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { configCommand } from "./commands/config.ts";
import { dashboardCommand } from "./commands/dashboard.ts";
import { loginCommand } from "./commands/login.ts";
import { logoutCommand } from "./commands/logout.ts";
import { buildProjectCommand } from "./commands/project/build.ts";
import { statusCommand } from "./commands/status.ts";

export const buildRootCommand = Effect.gen(function* () {
	const projectCommand = yield* buildProjectCommand;

	return Command.make("faststats", {}, () => Effect.void).pipe(
		Command.withDescription("FastStats CLI"),
		Command.withSubcommands([
			dashboardCommand,
			projectCommand,
			configCommand,
			loginCommand,
			logoutCommand,
			statusCommand,
		]),
	);
});
