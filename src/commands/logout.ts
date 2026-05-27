import { Console, Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { envAuthOverrides } from "../auth/status.ts";
import { clearStoredCredentials } from "../config.ts";

export const logoutCommand = Command.make("logout", {}, () =>
	Effect.gen(function* () {
		yield* clearStoredCredentials;
		yield* Console.log("Removed stored credentials from OS secrets.");

		const overrides = envAuthOverrides();
		if (overrides.length > 0) {
			yield* Console.log(
				`Still authenticated via: ${overrides.join(", ")}. Unset those variables to fully log out.`,
			);
		}
	}),
).pipe(Command.withDescription("Remove stored API key and access token"));
