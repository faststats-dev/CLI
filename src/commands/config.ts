import { Console, Effect } from "effect";
import { Argument, Command, Prompt } from "effect/unstable/cli";
import {
	CONFIG_PATH,
	DEFAULT_API_URL,
	DEFAULT_APP_URL,
	loadConfig,
	loadCredentials,
	maskSecret,
	saveAccessToken,
	saveApiKey,
	saveConfig,
} from "../config.ts";

const formatUrl = (value: string | undefined, fallback: string) =>
	value ?? `(default ${fallback})`;

const formatSecret = (value: string | undefined) =>
	value ? `${maskSecret(value)} (OS secrets)` : "(not set)";

const showCommand = Command.make(
	"show",
	{},
	Effect.fnUntraced(function* () {
		const config = yield* loadCredentials;

		yield* Console.log(`Config file: ${CONFIG_PATH}`);
		yield* Console.log(`API URL: ${formatUrl(config.apiUrl, DEFAULT_API_URL)}`);
		yield* Console.log(`App URL: ${formatUrl(config.appUrl, DEFAULT_APP_URL)}`);
		yield* Console.log(`API key: ${formatSecret(config.apiKey)}`);
		yield* Console.log(`Access token: ${formatSecret(config.accessToken)}`);

		const envLines = [
			process.env.FASTSTATS_API_KEY && "API key env: FASTSTATS_API_KEY is set",
			process.env.FASTSTATS_ACCESS_TOKEN &&
				"Access token env: FASTSTATS_ACCESS_TOKEN is set",
			process.env.FASTSTATS_API_URL &&
				`API URL env: FASTSTATS_API_URL=${process.env.FASTSTATS_API_URL}`,
			process.env.FASTSTATS_APP_URL &&
				`App URL env: FASTSTATS_APP_URL=${process.env.FASTSTATS_APP_URL}`,
		].filter((line): line is string => Boolean(line));

		for (const line of envLines) {
			yield* Console.log(line);
		}
	}),
).pipe(Command.withDescription("Show CLI configuration"));

const pathCommand = Command.make(
	"path",
	{},
	Effect.fnUntraced(function* () {
		yield* Console.log(CONFIG_PATH);
	}),
).pipe(Command.withDescription("Print config file path"));

const setCommand = Command.make(
	"set",
	{
		key: Argument.choice("key", [
			"api-key",
			"access-token",
			"api-url",
			"app-url",
		] as const),
		value: Argument.string("value"),
	},
	Effect.fnUntraced(function* ({ key, value }) {
		const config = yield* loadConfig;
		switch (key) {
			case "api-key":
				yield* saveApiKey(value);
				yield* Console.log("Updated api-key in OS secrets");
				break;
			case "access-token":
				yield* saveAccessToken(value);
				yield* Console.log("Updated access-token in OS secrets");
				break;
			case "api-url":
				yield* saveConfig({ ...config, apiUrl: value });
				yield* Console.log(`Updated api-url in ${CONFIG_PATH}`);
				break;
			case "app-url":
				yield* saveConfig({ ...config, appUrl: value });
				yield* Console.log(`Updated app-url in ${CONFIG_PATH}`);
				break;
		}
	}),
).pipe(Command.withDescription("Set a configuration value"));

const initCommand = Command.make(
	"init",
	{},
	Effect.fnUntraced(function* () {
		const apiKey = yield* Prompt.text({ message: "API key" });
		const apiUrl = yield* Prompt.text({
			message: "API URL",
			default: DEFAULT_API_URL,
		});
		const appUrl = yield* Prompt.text({
			message: "App URL",
			default: DEFAULT_APP_URL,
		});

		yield* saveApiKey(apiKey);
		yield* saveConfig({ apiUrl, appUrl });
		yield* Console.log(
			`Wrote URLs to ${CONFIG_PATH} and API key to OS secrets`,
		);
	}),
).pipe(Command.withDescription("Interactively configure the CLI"));

export const configCommand = Command.make("config", {}).pipe(
	Command.withDescription("Manage CLI configuration"),
	Command.withSubcommands([showCommand, pathCommand, setCommand, initCommand]),
);
