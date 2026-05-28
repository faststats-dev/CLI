import { Console, Effect } from "effect";
import { Command } from "effect/unstable/cli";
import {
	type AuthMethod,
	type AuthSource,
	type AuthStatus,
	loadAuthStatus,
	loadConfig,
	resolveCredentials,
} from "../config.ts";

const METHOD_LABEL: Record<AuthMethod, string> = {
	"api-key": "API key",
	"access-token": "access token",
};

const SOURCE_LABEL: Record<AuthSource, string> = {
	environment: "environment",
	"os-secrets": "OS secrets",
};

const formatAuthStatus = (status: AuthStatus): string => {
	if (!status.authenticated) return "not logged in";
	return `logged in (${METHOD_LABEL[status.method]}, ${SOURCE_LABEL[status.source]})`;
};

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
