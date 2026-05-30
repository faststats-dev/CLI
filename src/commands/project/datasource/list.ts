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

			const nameWidth = Math.max(
				4,
				...dataSources.map((item) => item.name.length),
			);
			const referenceWidth = Math.max(
				12,
				...dataSources.map((item) => item.referenceId.length),
			);
			const typeWidth = Math.max(
				4,
				...dataSources.map((item) => item.dataType.length),
			);

			yield* Console.log(
				`${"NAME".padEnd(nameWidth)}  ${"REFERENCE ID".padEnd(referenceWidth)}  ${"TYPE".padEnd(typeWidth)}  SHAPE   ARRAY`,
			);

			for (const item of dataSources) {
				yield* Console.log(
					`${item.name.padEnd(nameWidth)}  ${item.referenceId.padEnd(referenceWidth)}  ${item.dataType.padEnd(typeWidth)}  ${item.metricShape.padEnd(6)}  ${item.isArray ? "yes" : "no"}`,
				);
			}
		}),
	).pipe(Command.withDescription("List project data sources"));
