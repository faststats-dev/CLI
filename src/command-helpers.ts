import { Effect, Option } from "effect";
import type { Prompt } from "effect/unstable/cli";

export const promptIfAbsent = <A>(
	value: Option.Option<A>,
	prompt: Prompt.Prompt<A>,
) => Option.match(value, { onNone: () => prompt, onSome: Effect.succeed });
