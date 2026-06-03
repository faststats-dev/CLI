import { BunHttpClient, BunRuntime, BunServices } from "@effect/platform-bun";
import { Effect, Layer } from "effect";
import { Command } from "effect/unstable/cli";
import packageJson from "../package.json" with { type: "json" };
import { runCli } from "./auth.ts";
import { rootCommand } from "./root-command.ts";

const MainLayer = Layer.mergeAll(BunServices.layer, BunHttpClient.layer);

runCli(Command.run(rootCommand, { version: packageJson.version })).pipe(
	Effect.provide(MainLayer),
	BunRuntime.runMain,
);
