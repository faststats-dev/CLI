import { Console, Effect, Option } from "effect";
import { Argument, Command, Flag, Prompt } from "effect/unstable/cli";
import type { DataSourceRecord } from "../../../api.ts";
import { FastStatsApi } from "../../../api-client.ts";
import {
	DataSourceNameSchema,
	ReferenceIdSchema,
} from "../../../datasource-validation.ts";
import { validateWithSchema } from "../../../validation.ts";
import { logDataSource, unwrapFlags, withDataSourceError } from "./shared.ts";

type DataType = "number" | "string" | "boolean";
type MetricShape = "scalar" | "array" | "map";

const promptEdits = Effect.fnUntraced(function* (current: DataSourceRecord) {
	const name = yield* Prompt.text({
		message: "Data source name",
		default: current.name,
		validate: validateWithSchema(DataSourceNameSchema),
	});

	const referenceId = yield* Prompt.text({
		message: "Reference ID",
		default: current.referenceId,
		validate: validateWithSchema(ReferenceIdSchema),
	});

	const dataType = yield* Prompt.select<DataType>({
		message: "Data type",
		choices: (["number", "string", "boolean"] as const).map((value) => ({
			title: value,
			value,
			selected: value === current.dataType,
		})),
	});

	const metricShape = yield* Prompt.select<MetricShape>({
		message: "Metric shape",
		choices: (["scalar", "array", "map"] as const).map((value) => ({
			title: value,
			value,
			selected: value === current.metricShape,
		})),
	});

	const isArray = yield* Prompt.confirm({
		message: "Treat values as an array?",
		initial: current.isArray,
	});

	const allowNegative =
		dataType === "number"
			? yield* Prompt.confirm({
					message: "Allow negative numbers?",
					initial: current.allowNegative ?? true,
				})
			: undefined;

	const allowFloat =
		dataType === "number"
			? yield* Prompt.confirm({
					message: "Allow floating point numbers?",
					initial: current.allowFloat ?? true,
				})
			: undefined;

	return {
		name,
		referenceId,
		dataType,
		metricShape,
		isArray,
		allowNegative,
		allowFloat,
	};
});

export const makeDatasourceEditCommand = (slug: string) =>
	Command.make(
		"edit",
		{
			target: Argument.string("datasource").pipe(
				Argument.optional,
				Argument.withDescription("Data source id or reference id"),
			),
			name: Flag.string("name").pipe(
				Flag.withSchema(DataSourceNameSchema),
				Flag.optional,
				Flag.withDescription("New data source name"),
			),
			referenceId: Flag.string("reference-id").pipe(
				Flag.withSchema(ReferenceIdSchema),
				Flag.optional,
				Flag.withDescription(
					"New reference ID (lowercase letters, numbers, _)",
				),
			),
			dataType: Flag.choice("data-type", ["number", "string", "boolean"]).pipe(
				Flag.optional,
				Flag.withDescription("Data type: number, string, or boolean"),
			),
			metricShape: Flag.choice("metric-shape", ["scalar", "array", "map"]).pipe(
				Flag.optional,
				Flag.withDescription("Metric shape: scalar, array, or map"),
			),
			array: Flag.boolean("array").pipe(
				Flag.optional,
				Flag.withDescription("Treat values as an array"),
			),
			allowNegative: Flag.boolean("allow-negative").pipe(
				Flag.optional,
				Flag.withDescription("Allow negative numbers (number type only)"),
			),
			allowFloat: Flag.boolean("allow-float").pipe(
				Flag.optional,
				Flag.withDescription("Allow floating point numbers (number type only)"),
			),
			regex: Flag.string("regex").pipe(
				Flag.optional,
				Flag.withDescription("Validation regex (string type only)"),
			),
			minValue: Flag.float("min-value").pipe(
				Flag.optional,
				Flag.withDescription("Minimum value (number type only)"),
			),
			maxValue: Flag.float("max-value").pipe(
				Flag.optional,
				Flag.withDescription("Maximum value (number type only)"),
			),
		},
		Effect.fnUntraced(function* (params) {
			const api = yield* FastStatsApi;
			const dataSources = yield* api.DataSourcesListDataSources(
				slug,
				undefined,
			);

			if (dataSources.length === 0) {
				yield* Console.log("No data sources found.");
				return;
			}

			const current = yield* Option.match(params.target, {
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
						message: "Select a data source to edit",
						choices: dataSources.map((item) => ({
							title: item.name,
							value: item,
							description: item.referenceId,
						})),
					}),
			});

			const flags = unwrapFlags({
				name: params.name,
				referenceId: params.referenceId,
				dataType: params.dataType,
				metricShape: params.metricShape,
				isArray: params.array,
				allowNegative: params.allowNegative,
				allowFloat: params.allowFloat,
				regex: params.regex,
				minValue: params.minValue,
				maxValue: params.maxValue,
			});

			const hasFlags = Object.values(flags).some((v) => v !== undefined);
			const payload = hasFlags ? flags : yield* promptEdits(current);

			const updated = yield* withDataSourceError(
				api.DataSourcesUpdateDataSource(slug, current.id, { payload }),
			);

			yield* logDataSource("Updated", updated);
		}),
	).pipe(
		Command.withDescription(
			"Edit a data source (interactive prompts when flags are omitted)",
		),
	);
