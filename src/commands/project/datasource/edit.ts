import { Console, Effect, Option } from "effect";
import { Argument, Command, Flag, Prompt } from "effect/cli";
import type { DataSourceRecordEncoded as DataSourceRecord } from "../../../api.ts";
import { FastStatsApi } from "../../../api-client.ts";
import {
	DataSourceNameSchema,
	ReferenceIdSchema,
} from "../../../datasource-validation.ts";
import { validateWithSchema } from "../../../validation.ts";
import { logDataSource, resolveDataSourceTarget } from "./shared.ts";

type DataType = "number" | "string" | "boolean";
type MetricShape = "scalar" | "array" | "map";

const promptEdits = Effect.fnUntraced(function* (current: DataSourceRecord) {
	const name = yield* Prompt.String({
		message: "Data source name",
		default: current.name,
		validate: validateWithSchema(DataSourceNameSchema),
	});

	const referenceId = yield* Prompt.String({
		message: "Reference ID",
		default: current.referenceId,
		validate: validateWithSchema(ReferenceIdSchema),
	});

	const dataType = yield* Prompt.Select<DataType>({
		message: "Data type",
		choices: (["number", "string", "boolean"] as const).map((value) => ({
			title: value,
			value,
			selected: value === current.dataType,
		})),
	});

	const metricShape = yield* Prompt.Select<MetricShape>({
		message: "Metric shape",
		choices: (["scalar", "array", "map"] as const).map((value) => ({
			title: value,
			value,
			selected: value === current.metricShape,
		})),
	});

	const isArray = yield* Prompt.Confirm({
		message: "Treat values as an array?",
		initial: current.isArray,
	});

	const allowNegative =
		dataType === "number"
			? yield* Prompt.Confirm({
					message: "Allow negative numbers?",
					initial: current.allowNegative ?? true,
				})
			: undefined;

	const allowFloat =
		dataType === "number"
			? yield* Prompt.Confirm({
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

export const datasourceEditCommand = Command.make(
	"edit",
	{
		slug: Argument.String("slug").pipe(
			Argument.withDescription("Project slug"),
		),
		target: Argument.String("datasource").pipe(
			Argument.optional,
			Argument.withDescription("Data source id or reference id"),
		),
		name: Flag.String("name").pipe(
			Flag.withSchema(DataSourceNameSchema),
			Flag.optional,
			Flag.withDescription("New data source name"),
		),
		referenceId: Flag.String("reference-id").pipe(
			Flag.withSchema(ReferenceIdSchema),
			Flag.optional,
			Flag.withDescription("New reference ID (lowercase letters, numbers, _)"),
		),
		dataType: Flag.Literals("data-type", ["number", "string", "boolean"]).pipe(
			Flag.optional,
			Flag.withDescription("Data type: number, string, or boolean"),
		),
		metricShape: Flag.Literals("metric-shape", ["scalar", "array", "map"]).pipe(
			Flag.optional,
			Flag.withDescription("Metric shape: scalar, array, or map"),
		),
		array: Flag.Boolean("array").pipe(
			Flag.optional,
			Flag.withDescription("Treat values as an array"),
		),
		allowNegative: Flag.Boolean("allow-negative").pipe(
			Flag.optional,
			Flag.withDescription("Allow negative numbers (number type only)"),
		),
		allowFloat: Flag.Boolean("allow-float").pipe(
			Flag.optional,
			Flag.withDescription("Allow floating point numbers (number type only)"),
		),
		regex: Flag.String("regex").pipe(
			Flag.optional,
			Flag.withDescription("Validation regex (string type only)"),
		),
		minValue: Flag.Finite("min-value").pipe(
			Flag.optional,
			Flag.withDescription("Minimum value (number type only)"),
		),
		maxValue: Flag.Finite("max-value").pipe(
			Flag.optional,
			Flag.withDescription("Maximum value (number type only)"),
		),
	},
	Effect.fnUntraced(function* (params) {
		const api = yield* FastStatsApi;
		const dataSources = yield* api.DataSourcesListDataSources(
			params.slug,
			undefined,
		);

		if (dataSources.length === 0) {
			yield* Console.log("No data sources found.");
			return;
		}

		const current = yield* resolveDataSourceTarget(
			dataSources,
			params.target,
			"edit",
		);

		const flags = {
			name: Option.getOrUndefined(params.name),
			referenceId: Option.getOrUndefined(params.referenceId),
			dataType: Option.getOrUndefined(params.dataType),
			metricShape: Option.getOrUndefined(params.metricShape),
			isArray: Option.getOrUndefined(params.array),
			allowNegative: Option.getOrUndefined(params.allowNegative),
			allowFloat: Option.getOrUndefined(params.allowFloat),
			regex: Option.getOrUndefined(params.regex),
			minValue: Option.getOrUndefined(params.minValue),
			maxValue: Option.getOrUndefined(params.maxValue),
		};

		const hasFlags = Object.values(flags).some((v) => v !== undefined);
		const payload = hasFlags
			? { ...flags, metricShape: flags.metricShape ?? current.metricShape }
			: yield* promptEdits(current);

		const updated = yield* api.DataSourcesUpdateDataSource(
			params.slug,
			current.id,
			{ payload },
		);

		yield* logDataSource("Updated", updated);
	}),
).pipe(
	Command.withDescription(
		"Edit a data source (interactive prompts when flags are omitted)",
	),
);
