import { Console, Effect, Option } from "effect";
import { Argument, Command, Prompt } from "effect/unstable/cli";
import { FastStatsApi } from "../../../api-client.ts";

export const makeDatasourceRemoveCommand = (slug: string) =>
	Command.make(
		"remove",
		{
			target: Argument.string("datasource").pipe(
				Argument.optional,
				Argument.withDescription("Data source id or reference id"),
			),
		},
		Effect.fnUntraced(function* ({ target }) {
			const api = yield* FastStatsApi;
			const dataSources = yield* api.DataSourcesListDataSources(
				slug,
				undefined,
			);

			if (dataSources.length === 0) {
				yield* Console.log("No data sources found.");
				return;
			}

			const dataSource = yield* Option.match(target, {
				onSome: (ref) => {
					const match = dataSources.find(
						(item) => item.id === ref || item.referenceId === ref,
					);
					return match
						? Effect.succeed(match)
						: Effect.fail(new Error(`Unknown data source "${ref}".`));
				},
				onNone: () =>
					Prompt.select({
						message: "Select a data source to remove",
						choices: dataSources.map((item) => ({
							title: item.name,
							value: item,
							description: item.referenceId,
						})),
					}),
			});

			yield* api.DataSourcesDeleteDataSource(slug, dataSource.id, undefined);
			yield* Console.log(
				`Removed data source "${dataSource.name}" (${dataSource.referenceId})`,
			);
		}),
	).pipe(Command.withDescription("Remove a data source"));
