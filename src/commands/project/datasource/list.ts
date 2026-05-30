import { Console, Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { FastStatsApi } from "../../../api-client.ts";

export const makeDatasourceListCommand = (slug: string) =>
	Command.make(
		"list",
		{},
		Effect.fnUntraced(function* () {
			const api = yield* FastStatsApi;
			const dataSources = yield* api.DataSourcesListDataSources(
				slug,
				undefined,
			);

			if (dataSources.length === 0) {
				yield* Console.log("No data sources found.");
				return;
			}

			yield* Console.table(
				dataSources.map((item) => ({
					NAME: item.name,
					"REFERENCE ID": item.referenceId,
					TYPE: item.dataType,
					SHAPE: item.metricShape,
					ARRAY: item.isArray ? "yes" : "no",
				})),
			);
		}),
	).pipe(Command.withDescription("List project data sources"));
