import { Schema } from "effect";

const DATA_SOURCE_NAME_MAX_LENGTH = 64;
const REFERENCE_ID_REGEX = /^[a-z0-9_]+$/;

export const DataSourceNameSchema = Schema.Trim.pipe(
	Schema.check(
		Schema.isMinLength(1, { message: "Data source name is required" }),
	),
	Schema.check(
		Schema.isMaxLength(DATA_SOURCE_NAME_MAX_LENGTH, {
			message: `Data source name must be at most ${DATA_SOURCE_NAME_MAX_LENGTH} characters`,
		}),
	),
);

export const ReferenceIdSchema = Schema.Trim.pipe(
	Schema.check(Schema.isMinLength(1, { message: "Reference ID is required" })),
	Schema.check(
		Schema.isPattern(REFERENCE_ID_REGEX, {
			message:
				"Reference ID can only contain lowercase letters, numbers, and underscores",
		}),
	),
);
