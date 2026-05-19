import { Command } from "effect/unstable/cli";
import { makeNetworkAddCommand } from "./add.ts";
import { makeNetworkListCommand } from "./list.ts";
import { makeNetworkRemoveCommand } from "./remove.ts";

export const makeNetworkCommand = (slug: string) =>
	Command.make("network", {}).pipe(
		Command.withDescription("Manage IP network rules"),
		Command.withSubcommands([
			makeNetworkListCommand(slug),
			makeNetworkAddCommand(slug),
			makeNetworkRemoveCommand(slug),
		]),
	);
