import { Cause, Console, Effect, Option, Record } from "effect";
import type { DataSourceRecord } from "../../../api.ts";

const formatDataSourceError = (error: unknown): string => {
	if (
		typeof error === "object" &&
		error !== null &&
		"message" in error &&
		typeof error.message === "string" &&
		error.message.length > 0
	) {
		return error.message;
	}
	if (error instanceof Error && error.message) {
		return error.message;
	}
	return "Data source request failed";
};

export const withDataSourceError = <A, E, R>(effect: Effect.Effect<A, E, R>) =>
	Effect.catchCause(effect, (cause) =>
		Effect.fail(new Error(formatDataSourceError(Cause.squash(cause)))),
	);

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
