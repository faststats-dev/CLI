import { homedir } from "node:os";
import { join } from "node:path";
import { secrets } from "bun";
import { Data, Effect } from "effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";

export class ConfigError extends Data.TaggedError("ConfigError")<{
	readonly message: string;
}> {}

export interface FastStatsConfig {
	readonly apiUrl?: string;
	readonly appUrl?: string;
}

export interface FastStatsCredentials extends FastStatsConfig {
	readonly apiKey?: string;
	readonly accessToken?: string;
}

export const DEFAULT_API_URL = "http://localhost:4000";
export const DEFAULT_APP_URL = "http://localhost:3000";

const CONFIG_DIR = join(homedir(), ".config", "faststats");
export const CONFIG_PATH = join(CONFIG_DIR, "config.json");
const SECRET_SERVICE = "dev.faststats.cli";
const API_KEY_SECRET = "api-key";
const ACCESS_TOKEN_SECRET = "access-token";

const secretError =
	(action: string, name: string) => (error: unknown) =>
		new ConfigError({
			message:
				error instanceof Error
					? `Failed to ${action} ${name} in OS secrets: ${error.message}`
					: `Failed to ${action} ${name} in OS secrets`,
		});

const getSecret = (name: string) =>
	Effect.tryPromise({
		try: () => secrets.get({ service: SECRET_SERVICE, name }),
		catch: secretError("read", name),
	});

const setSecret = (name: string, value: string) =>
	Effect.tryPromise({
		try: () => secrets.set({ service: SECRET_SERVICE, name, value }),
		catch: secretError("store", name),
	});

const deleteSecret = (name: string) =>
	Effect.tryPromise({
		try: () => secrets.delete({ service: SECRET_SERVICE, name }),
		catch: secretError("delete", name),
	});

const deleteSecretIfPresent = (name: string) =>
	Effect.gen(function* () {
		const value = yield* getSecret(name);
		if (value != null) {
			yield* deleteSecret(name);
		}
	});

export const loadConfig = Effect.gen(function* () {
	const fs = yield* FileSystem.FileSystem;
	const exists = yield* fs.exists(CONFIG_PATH);
	if (!exists) {
		return {} satisfies FastStatsConfig;
	}
	const content = yield* fs.readFileString(CONFIG_PATH);
	const parsed = JSON.parse(content) as FastStatsConfig;
	return parsed;
});

export const loadCredentials = Effect.gen(function* () {
	const fileConfig = yield* loadConfig;
	return {
		...fileConfig,
		apiKey:
			process.env.FASTSTATS_API_KEY ??
			((yield* getSecret(API_KEY_SECRET)) ?? undefined),
		accessToken:
			process.env.FASTSTATS_ACCESS_TOKEN ??
			((yield* getSecret(ACCESS_TOKEN_SECRET)) ?? undefined),
	} satisfies FastStatsCredentials;
});

export const saveConfig = (config: FastStatsConfig) =>
	Effect.gen(function* () {
		const fs = yield* FileSystem.FileSystem;
		const path = yield* Path.Path;
		const fileConfig = {
			...(config.apiUrl ? { apiUrl: config.apiUrl } : {}),
			...(config.appUrl ? { appUrl: config.appUrl } : {}),
		} satisfies FastStatsConfig;
		yield* fs.makeDirectory(path.dirname(CONFIG_PATH), { recursive: true });
		yield* fs.writeFileString(
			CONFIG_PATH,
			`${JSON.stringify(fileConfig, null, 2)}\n`,
		);
	});

export const saveApiKey = (apiKey: string) =>
	Effect.gen(function* () {
		yield* setSecret(API_KEY_SECRET, apiKey);
		yield* deleteSecretIfPresent(ACCESS_TOKEN_SECRET);
	});

export const saveAccessToken = (accessToken: string) =>
	Effect.gen(function* () {
		yield* setSecret(ACCESS_TOKEN_SECRET, accessToken);
		yield* deleteSecretIfPresent(API_KEY_SECRET);
	});

export const clearStoredCredentials = Effect.all(
	[deleteSecretIfPresent(API_KEY_SECRET), deleteSecretIfPresent(ACCESS_TOKEN_SECRET)],
	{ discard: true },
);

export const resolveCredentials = (credentials: FastStatsCredentials) => ({
	apiKey: credentials.apiKey,
	accessToken: credentials.accessToken,
	apiUrl:
		process.env.FASTSTATS_API_URL ?? credentials.apiUrl ?? DEFAULT_API_URL,
	appUrl:
		process.env.FASTSTATS_APP_URL ?? credentials.appUrl ?? DEFAULT_APP_URL,
});

export const maskSecret = (value: string): string => {
	if (value.length <= 8) return "****";
	return `${value.slice(0, 4)}…${value.slice(-4)}`;
};
