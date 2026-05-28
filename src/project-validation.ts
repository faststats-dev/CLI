import { Schema } from "effect";

const PROJECT_NAME_MIN_LENGTH = 3;
const PROJECT_NAME_MAX_LENGTH = 48;
const PROJECT_NAME_REGEX = /^[a-zA-Z0-9\s\-_.+]+$/;

const ProjectNameSchema = Schema.String.pipe(
	Schema.check(
		Schema.makeFilter(
			(value) => value.trim().length > 0 || "Project name is required",
			{ title: "required" },
		),
	),
	Schema.check(
		Schema.isMinLength(PROJECT_NAME_MIN_LENGTH, {
			message: `Project name must be at least ${PROJECT_NAME_MIN_LENGTH} characters`,
		}),
	),
	Schema.check(
		Schema.isMaxLength(PROJECT_NAME_MAX_LENGTH, {
			message: `Project name must be at most ${PROJECT_NAME_MAX_LENGTH} characters`,
		}),
	),
	Schema.check(
		Schema.isPattern(PROJECT_NAME_REGEX, {
			message:
				"Project name can only contain letters, numbers, spaces, hyphens, underscores, periods, and plus signs",
		}),
	),
);

export const validateProjectName = (name: string): string | undefined => {
	try {
		Schema.decodeUnknownSync(ProjectNameSchema)(name);
		return undefined;
	} catch (error) {
		return error instanceof Error ? error.message : "Invalid project name";
	}
};
