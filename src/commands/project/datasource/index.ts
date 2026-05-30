import { Command } from "effect/unstable/cli";
import { makeDatasourceCreateCommand } from "./create.ts";
import { makeDatasourceEditCommand } from "./edit.ts";
import { makeDatasourceListCommand } from "./list.ts";
import { makeDatasourceRemoveCommand } from "./remove.ts";

export const makeDatasourceCommand = (slug: string) =>
	Command.make("datasource", {}).pipe(
		Command.withDescription("Manage project data sources"),
		Command.withSubcommands([
			makeDatasourceListCommand(slug),
			makeDatasourceCreateCommand(slug),
			makeDatasourceEditCommand(slug),
			makeDatasourceRemoveCommand(slug),
		]),
	);
