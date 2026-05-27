import { Console, Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { clearStoredCredentials } from "../config.ts";

const envCredentialHints = [
	process.env.FASTSTATS_API_KEY && "FASTSTATS_API_KEY",
	process.env.FASTSTATS_ACCESS_TOKEN && "FASTSTATS_ACCESS_TOKEN",
].filter((value): value is string => Boolean(value));

export const logoutCommand = Command.make("logout", {}, () =>
	Effect.gen(function* () {
		yield* clearStoredCredentials;
		yield* Console.log("Removed stored credentials from OS secrets.");

		if (envCredentialHints.length > 0) {
			yield* Console.log(
				`Still authenticated via: ${envCredentialHints.join(", ")}. Unset those variables to fully log out.`,
			);
		}
	}),
).pipe(Command.withDescription("Remove stored API key and access token"));
