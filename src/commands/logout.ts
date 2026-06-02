import { Console, Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { clearAccessToken } from "../config.ts";

export const logoutCommand = Command.make(
	"logout",
	{},
	Effect.fnUntraced(function* () {
		yield* clearAccessToken;
		yield* Console.log("Logged out.");
	}),
).pipe(Command.withDescription("Remove stored access token"));
