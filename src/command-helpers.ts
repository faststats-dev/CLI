import { Cause, Effect, Option } from "effect";
import type { Prompt } from "effect/unstable/cli";

export const promptIfAbsent = <A>(
	value: Option.Option<A>,
	prompt: Prompt.Prompt<A>,
) => Option.match(value, { onNone: () => prompt, onSome: Effect.succeed });

export const formatApiErrorMessage = (
	error: unknown,
	fallback: string,
): string => {
	if (
		typeof error === "object" &&
		error !== null &&
		"message" in error &&
		typeof error.message === "string" &&
		error.message.length > 0
	) {
		return error.message;
	}
	return fallback;
};

export const withApiError = <A, E, R>(
	effect: Effect.Effect<A, E, R>,
	fallback: string,
) =>
	Effect.catchCause(effect, (cause) =>
		Effect.fail(
			new Error(formatApiErrorMessage(Cause.squash(cause), fallback)),
		),
	);
