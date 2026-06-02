import { Command } from "effect/unstable/cli";
import { completionsCommand } from "./commands/completions.ts";
import { dashboardCommand } from "./commands/dashboard.ts";
import { exploreCommand } from "./commands/explore.ts";
import { loginCommand } from "./commands/login.ts";
import { logoutCommand } from "./commands/logout.ts";
import { projectCommand } from "./commands/project/build.ts";
import { statusCommand } from "./commands/status.ts";

export const rootCommand = Command.make("faststats", {}).pipe(
	Command.withDescription("FastStats CLI"),
	Command.withSubcommands([
		dashboardCommand,
		exploreCommand,
		projectCommand,
		loginCommand,
		logoutCommand,
		statusCommand,
		completionsCommand,
	]),
);
