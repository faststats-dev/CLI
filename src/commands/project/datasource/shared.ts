import { Console, Effect, Option, Record } from "effect";
import { Prompt } from "effect/unstable/cli";
import type { DataSourceRecord } from "../../../api.ts";
import { withApiError } from "../../../command-helpers.ts";

export const withDataSourceError = <A, E, R>(effect: Effect.Effect<A, E, R>) =>
	withApiError(effect, "Data source request failed");

export const resolveDataSourceTarget = (
	dataSources: ReadonlyArray<DataSourceRecord>,
	target: Option.Option<string>,
	action: string,
) =>
	Option.match(target, {
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
				message: `Select a data source to ${action}`,
				choices: dataSources.map((item) => ({
					title: item.name,
					value: item,
					description: item.referenceId,
				})),
			}),
	});

export const logDataSource = (action: string, record: DataSourceRecord) =>
	Console.log(
		[
			`${action} data source "${record.name}"`,
			`  id:            ${record.id}`,
			`  reference id:  ${record.referenceId}`,
			`  type:          ${record.dataType}`,
			`  metric shape:  ${record.metricShape}`,
			`  array:         ${record.isArray ? "yes" : "no"}`,
		].join("\n"),
	);

export const unwrapFlags = <A extends Record<string, Option.Option<unknown>>>(
	flags: A,
): { [K in keyof A]: Option.Option.Value<A[K]> | undefined } =>
	Record.map(flags, Option.getOrUndefined) as never;
