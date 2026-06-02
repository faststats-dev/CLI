import { Command } from "effect/unstable/cli";
import { datasourceCreateCommand } from "./create.ts";
import { datasourceEditCommand } from "./edit.ts";
import { datasourceListCommand } from "./list.ts";
import { datasourceRemoveCommand } from "./remove.ts";

export const datasourceCommand = Command.make("datasource", {}).pipe(
	Command.withDescription("Manage project data sources"),
	Command.withSubcommands([
		datasourceListCommand,
		datasourceCreateCommand,
		datasourceEditCommand,
		datasourceRemoveCommand,
	]),
);
