import { Command } from "effect/unstable/cli";
import { networkAddCommand } from "./add.ts";
import { networkListCommand } from "./list.ts";
import { networkRemoveCommand } from "./remove.ts";

export const networkCommand = Command.make("network", {}).pipe(
	Command.withDescription("Manage IP network rules"),
	Command.withSubcommands([
		networkListCommand,
		networkAddCommand,
		networkRemoveCommand,
	]),
);
