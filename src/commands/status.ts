import { Console, Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { formatAuthStatus } from "../auth/status.ts";
import { loadAuthStatus, loadConfig, resolveCredentials } from "../config.ts";

export const statusCommand = Command.make("status", {}, () =>
	Effect.gen(function* () {
		const auth = yield* loadAuthStatus;
		const config = yield* loadConfig;
		const { apiUrl, appUrl } = resolveCredentials(config);

		yield* Console.log(`Authentication: ${formatAuthStatus(auth)}`);
		yield* Console.log(`API URL: ${apiUrl}`);
		yield* Console.log(`App URL: ${appUrl}`);

		if (!auth.authenticated) {
			yield* Console.log(
				"Run `faststats login` or `faststats config init` to authenticate.",
			);
		}
	}),
).pipe(Command.withDescription("Show authentication status"));
