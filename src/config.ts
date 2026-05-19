import { homedir } from "node:os";
import { join } from "node:path";
import { Data, Effect } from "effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";

export class ConfigError extends Data.TaggedError("ConfigError")<{
	readonly message: string;
}> {}

export interface FastStatsConfig {
	readonly apiKey?: string;
	readonly apiUrl?: string;
}

const CONFIG_DIR = join(homedir(), ".config", "faststats");
export const CONFIG_PATH = join(CONFIG_DIR, "config.json");

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

export const saveConfig = (config: FastStatsConfig) =>
	Effect.gen(function* () {
		const fs = yield* FileSystem.FileSystem;
		const path = yield* Path.Path;
		yield* fs.makeDirectory(path.dirname(CONFIG_PATH), { recursive: true });
		yield* fs.writeFileString(
			CONFIG_PATH,
			`${JSON.stringify(config, null, 2)}\n`,
		);
	});

export const resolveCredentials = (fileConfig: FastStatsConfig) => ({
	apiKey: process.env.FASTSTATS_API_KEY ?? fileConfig.apiKey,
	apiUrl:
		process.env.FASTSTATS_API_URL ??
		fileConfig.apiUrl ??
		"http://localhost:4000",
});

export const maskApiKey = (apiKey: string): string => {
	if (apiKey.length <= 8) return "****";
	return `${apiKey.slice(0, 4)}…${apiKey.slice(-4)}`;
};
