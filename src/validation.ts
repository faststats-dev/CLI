import { Effect, Schema } from "effect";

export const validateWithSchema =
	(schema: Schema.Codec<string, string>) =>
	(value: string): Effect.Effect<string, string> =>
		Schema.decodeUnknownEffect(schema)(value).pipe(
			Effect.mapError((error) => error.message),
		);
