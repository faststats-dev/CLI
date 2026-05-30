import { Effect, Option } from "effect";
import { Command, Flag, Prompt } from "effect/unstable/cli";
import { FastStatsApi } from "../../../api-client.ts";
import { promptIfAbsent } from "../../../command-helpers.ts";
import {
	DataSourceNameSchema,
	ReferenceIdSchema,
} from "../../../datasource-validation.ts";
import { validateWithSchema } from "../../../validation.ts";
import { logDataSource, unwrapFlags, withDataSourceError } from "./shared.ts";

export const makeDatasourceCreateCommand = (slug: string) =>
	Command.make(
		"create",
		{
			name: Flag.string("name").pipe(
				Flag.withDescription("Data source name"),
				Flag.withSchema(DataSourceNameSchema),
				Flag.withFallbackPrompt(
					Prompt.text({
						message: "Data source name",
						validate: validateWithSchema(DataSourceNameSchema),
					}),
				),
			),
			referenceId: Flag.string("reference-id").pipe(
				Flag.withDescription("Reference ID (lowercase letters, numbers, _)"),
				Flag.withSchema(ReferenceIdSchema),
				Flag.withFallbackPrompt(
					Prompt.text({
						message: "Reference ID",
						validate: validateWithSchema(ReferenceIdSchema),
					}),
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
		Effect.fnUntraced(function* ({
			name,
			referenceId,
			dataType: dataTypeFlag,
			metricShape: metricShapeFlag,
			array: arrayFlag,
			allowNegative: allowNegativeFlag,
			allowFloat: allowFloatFlag,
			regex,
			minValue,
			maxValue,
		}) {
			const dataType = yield* promptIfAbsent(
				dataTypeFlag,
				Prompt.select({
					message: "Data type",
					choices: [
						{
							title: "Number",
							value: "number" as const,
							description: "Numeric values",
						},
						{
							title: "String",
							value: "string" as const,
							description: "Text values",
						},
						{
							title: "Boolean",
							value: "boolean" as const,
							description: "True/false values",
						},
					],
				}),
			);

			const metricShape = yield* promptIfAbsent(
				metricShapeFlag,
				Prompt.select({
					message: "Metric shape",
					choices: [
						{
							title: "Scalar",
							value: "scalar" as const,
							description: "A single value",
							selected: true,
						},
						{
							title: "Array",
							value: "array" as const,
							description: "A list of values",
						},
						{
							title: "Map",
							value: "map" as const,
							description: "Key/value pairs",
						},
					],
				}),
			);

			const isArray = yield* promptIfAbsent(
				arrayFlag,
				Prompt.confirm({
					message: "Treat values as an array?",
					initial: false,
				}),
			);

			const allowNegative =
				dataType === "number"
					? yield* promptIfAbsent(
							allowNegativeFlag,
							Prompt.confirm({
								message: "Allow negative numbers?",
								initial: true,
							}),
						)
					: Option.getOrUndefined(allowNegativeFlag);

			const allowFloat =
				dataType === "number"
					? yield* promptIfAbsent(
							allowFloatFlag,
							Prompt.confirm({
								message: "Allow floating point numbers?",
								initial: true,
							}),
						)
					: Option.getOrUndefined(allowFloatFlag);

			const api = yield* FastStatsApi;
			const dataSource = yield* withDataSourceError(
				api.DataSourcesCreateDataSource(slug, {
					payload: {
						name,
						referenceId,
						dataType,
						metricShape,
						isArray,
						allowNegative,
						allowFloat,
						...unwrapFlags({ regex, minValue, maxValue }),
					},
				}),
			);

			yield* logDataSource("Created", dataSource);
		}),
	).pipe(
		Command.withDescription(
			"Create a data source (interactive prompts when flags are omitted)",
		),
	);
