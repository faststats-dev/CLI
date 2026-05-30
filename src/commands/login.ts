import { Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { runDeviceLogin } from "../auth/device-auth.ts";
import { loadConfig, resolveCredentials } from "../config.ts";

export const loginCommand = Command.make(
	"login",
	{},
	Effect.fnUntraced(function* () {
		const config = yield* loadConfig;
		const { apiUrl, appUrl } = resolveCredentials(config);
		yield* runDeviceLogin(apiUrl, appUrl);
	}),
).pipe(
	Command.withDescription("Log in with browser-based device authorization"),
);
