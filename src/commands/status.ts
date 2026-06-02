import { Console, Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { apiUrl, appUrl, loadAccessToken } from "../config.ts";

export const statusCommand = Command.make(
	"status",
	{},
	Effect.fnUntraced(function* () {
		const accessToken = yield* loadAccessToken;

		yield* Console.log(
			`Authentication: ${accessToken ? "logged in" : "not logged in"}`,
		);
		yield* Console.log(`API URL: ${apiUrl}`);
		yield* Console.log(`App URL: ${appUrl}`);

		if (!accessToken) {
			yield* Console.log("Run `faststats login` to authenticate.");
		}
	}),
).pipe(Command.withDescription("Show authentication status"));
