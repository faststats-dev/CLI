import { Console, Effect, Option } from "effect";
import { Command, Flag, Prompt } from "effect/unstable/cli";
import { FastStatsApi } from "../../api-client.ts";
import { unwrapOption } from "../../cli/unwrap-option.ts";

export const projectCreateCommand = Command.make(
	"create",
	{
		name: Flag.string("name").pipe(
			Flag.optional,
			Flag.withDescription("Project name"),
			Flag.withFallbackPrompt(
				Prompt.text({ message: "Project name" }),
			),
		),
		private: Flag.boolean("private").pipe(
			Flag.optional,
			Flag.withDescription("Make the project private"),
			Flag.withFallbackPrompt(
				Prompt.confirm({
					message: "Private project?",
					initial: false,
				}),
			),
		),
		hostname: Flag.string("hostname").pipe(
			Flag.optional,
			Flag.withDescription("Allowed hostname"),
		),
	},
	({ name, private: isPrivate, hostname }) =>
		Effect.gen(function* () {
			const api = yield* FastStatsApi;
			const allowedHostnames = Option.match(hostname, {
				onNone: () => undefined,
				onSome: (value) => [value],
			});

			const project = yield* api.ProjectsCreateProject({
				payload: {
					name: unwrapOption(name),
					private: unwrapOption(isPrivate),
					allowedHostnames,
				},
			});

			yield* Console.log(`Created project "${project.name}"`);
			yield* Console.log(`  slug: ${project.slug}`);
			yield* Console.log(`  id:   ${project.id}`);
			if (project.token) {
				yield* Console.log(`  token: ${project.token}`);
			}
		}),
).pipe(Command.withDescription("Create a new project"));
