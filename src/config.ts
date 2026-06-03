import { secrets } from "bun";
import { Data, Effect } from "effect";

class SecretError extends Data.TaggedError("SecretError")<{
	readonly message: string;
}> {}

const SERVICE = "dev.faststats.cli";
const ACCESS_TOKEN = "access-token";

const DEFAULT_API_URL = "https://api.faststats.dev";
const DEFAULT_APP_URL = "https://faststats.dev";

export const apiUrl = process.env.FASTSTATS_API_URL ?? DEFAULT_API_URL;
export const appUrl = process.env.FASTSTATS_APP_URL ?? DEFAULT_APP_URL;

export const loadAccessToken = Effect.tryPromise({
	try: () => secrets.get({ service: SERVICE, name: ACCESS_TOKEN }),
	catch: () => new SecretError({ message: "Failed to read access token" }),
}).pipe(Effect.map((value) => value ?? undefined));

export const saveAccessToken = (accessToken: string) =>
	Effect.tryPromise({
		try: () =>
			secrets.set({ service: SERVICE, name: ACCESS_TOKEN, value: accessToken }),
		catch: () => new SecretError({ message: "Failed to store access token" }),
	});

export const clearAccessToken = Effect.tryPromise({
	try: () => secrets.delete({ service: SERVICE, name: ACCESS_TOKEN }),
	catch: () => new SecretError({ message: "Failed to delete access token" }),
}).pipe(Effect.ignore);
