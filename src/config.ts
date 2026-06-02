import { secrets } from "bun";
import { Data, Effect } from "effect";

class SecretError extends Data.TaggedError("SecretError")<{
	readonly message: string;
}> {}

const SERVICE = "dev.faststats.cli";
const ACCESS_TOKEN = "access-token";

const DEFAULT_API_URL = "https://api.faststats.dev";
const DEFAULT_APP_URL = "https://faststats.dev";

const normalize = (url: string) => url.replace(/\/$/, "");

export const apiUrl = normalize(
	process.env.FASTSTATS_API_URL ?? DEFAULT_API_URL,
);
export const appUrl = normalize(
	process.env.FASTSTATS_APP_URL ?? DEFAULT_APP_URL,
);

const secretError = (action: string) => (error: unknown) =>
	new SecretError({
		message: `Failed to ${action} access token: ${
			error instanceof Error ? error.message : String(error)
		}`,
	});

export const loadAccessToken = Effect.tryPromise({
	try: () => secrets.get({ service: SERVICE, name: ACCESS_TOKEN }),
	catch: secretError("read"),
}).pipe(Effect.map((value) => value ?? undefined));

export const saveAccessToken = (accessToken: string) =>
	Effect.tryPromise({
		try: () =>
			secrets.set({ service: SERVICE, name: ACCESS_TOKEN, value: accessToken }),
		catch: secretError("store"),
	});

export const clearAccessToken = Effect.tryPromise({
	try: () => secrets.delete({ service: SERVICE, name: ACCESS_TOKEN }),
	catch: secretError("delete"),
}).pipe(Effect.ignore);
