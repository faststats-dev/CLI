import { Command } from "effect/unstable/cli";
import { projectCreateCommand } from "./create.ts";
import { datasourceCommand } from "./datasource/index.ts";
import { hostnamesCommand } from "./hostnames.ts";
import { projectListCommand } from "./list.ts";
import { networkCommand } from "./network/index.ts";
import { projectShowCommand } from "./show.ts";

export const projectCommand = Command.make("project", {}).pipe(
	Command.withDescription("Manage FastStats projects"),
	Command.withSubcommands([
		projectCreateCommand,
		projectListCommand,
		projectShowCommand,
		networkCommand,
		hostnamesCommand,
		datasourceCommand,
	]),
);
