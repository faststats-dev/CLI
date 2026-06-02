import { Console, Effect } from "effect";
import { Argument, Command } from "effect/unstable/cli";
import { FastStatsApi } from "../../../api-client.ts";
import { resolveDataSourceTarget } from "./shared.ts";

export const datasourceRemoveCommand = Command.make(
	"remove",
	{
		slug: Argument.string("slug").pipe(
			Argument.withDescription("Project slug"),
		),
		target: Argument.string("datasource").pipe(
			Argument.optional,
			Argument.withDescription("Data source id or reference id"),
		),
	},
	Effect.fnUntraced(function* ({ slug, target }) {
		const api = yield* FastStatsApi;
		const dataSources = yield* api.DataSourcesListDataSources(slug, undefined);

		if (dataSources.length === 0) {
			yield* Console.log("No data sources found.");
			return;
		}

		const dataSource = yield* resolveDataSourceTarget(
			dataSources,
			target,
			"remove",
		);

		yield* api.DataSourcesDeleteDataSource(slug, dataSource.id, undefined);
		yield* Console.log(
			`Removed data source "${dataSource.name}" (${dataSource.referenceId})`,
		);
	}),
).pipe(Command.withDescription("Remove a data source"));
