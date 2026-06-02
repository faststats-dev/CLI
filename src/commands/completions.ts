import { Console, Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { loadSlugsForCompletion } from "../project-slugs.ts";

const completionsSlugsCommand = Command.make(
	"slugs",
	{},
	Effect.fnUntraced(function* () {
		const slugs = yield* loadSlugsForCompletion;
		for (const slug of slugs) {
			yield* Console.log(slug);
		}
	}),
).pipe(Command.withDescription("Print project slugs for shell completion"));

export const completionsCommand = Command.make("completions", {}).pipe(
	Command.withDescription("Shell completion helpers"),
	Command.withSubcommands([completionsSlugsCommand]),
);
