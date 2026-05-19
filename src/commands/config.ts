import { Console, Effect } from "effect";
import { Argument, Command, Prompt } from "effect/unstable/cli";
import {
	CONFIG_PATH,
	loadConfig,
	maskApiKey,
	saveConfig,
} from "../config.ts";

const showCommand = Command.make("show", {}, () =>
	Effect.gen(function* () {
		const config = yield* loadConfig;
		yield* Console.log(`Config file: ${CONFIG_PATH}`);
		if (config.apiUrl) {
			yield* Console.log(`API URL: ${config.apiUrl}`);
		} else {
			yield* Console.log("API URL: (default http://localhost:4000)");
		}
		if (config.apiKey) {
			yield* Console.log(`API key: ${maskApiKey(config.apiKey)}`);
		} else {
			yield* Console.log("API key: (not set in config file)");
		}
		if (process.env.FASTSTATS_API_KEY) {
			yield* Console.log("API key env: FASTSTATS_API_KEY is set");
		}
		if (process.env.FASTSTATS_API_URL) {
			yield* Console.log(
				`API URL env: FASTSTATS_API_URL=${process.env.FASTSTATS_API_URL}`,
			);
		}
	}),
).pipe(Command.withDescription("Show CLI configuration"));

const pathCommand = Command.make("path", {}, () =>
	Effect.gen(function* () {
		yield* Console.log(CONFIG_PATH);
	}),
).pipe(Command.withDescription("Print config file path"));

const setCommand = Command.make(
	"set",
	{
		key: Argument.choice("key", ["api-key", "api-url"] as const),
		value: Argument.string("value"),
	},
	({ key, value }) =>
		Effect.gen(function* () {
			const config = yield* loadConfig;
			const next =
				key === "api-key"
					? { ...config, apiKey: value }
					: { ...config, apiUrl: value };
			yield* saveConfig(next);
			yield* Console.log(`Updated ${key} in ${CONFIG_PATH}`);
		}),
).pipe(Command.withDescription("Set a configuration value"));

const initCommand = Command.make("init", {}, () =>
	Effect.gen(function* () {
		const apiKey = yield* Prompt.text({
			message: "API key",
		});
		const apiUrl = yield* Prompt.text({
			message: "API URL",
			default: "http://localhost:4000",
		});

		yield* saveConfig({ apiKey, apiUrl });
		yield* Console.log(`Wrote configuration to ${CONFIG_PATH}`);
	}),
).pipe(Command.withDescription("Interactively configure the CLI"));

export const configCommand = Command.make("config", {}).pipe(
	Command.withDescription("Manage CLI configuration"),
	Command.withSubcommands([showCommand, pathCommand, setCommand, initCommand]),
);
