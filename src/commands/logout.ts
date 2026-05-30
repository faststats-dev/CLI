import { Console, Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { clearStoredCredentials } from "../config.ts";

export const logoutCommand = Command.make(
	"logout",
	{},
	Effect.fnUntraced(function* () {
		yield* clearStoredCredentials;
		yield* Console.log("Removed stored credentials from OS secrets.");

		const overrides =
			process.env.FASTSTATS_API_KEY || process.env.FASTSTATS_ACCESS_TOKEN
				? [
						process.env.FASTSTATS_API_KEY && "FASTSTATS_API_KEY",
						process.env.FASTSTATS_ACCESS_TOKEN && "FASTSTATS_ACCESS_TOKEN",
					].filter((name): name is string => Boolean(name))
				: [];
		if (overrides.length > 0) {
			yield* Console.log(
				`Still authenticated via: ${overrides.join(", ")}. Unset those variables to fully log out.`,
			);
		}
	}),
).pipe(Command.withDescription("Remove stored API key and access token"));
