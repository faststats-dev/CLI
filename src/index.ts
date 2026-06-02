import { BunHttpClient, BunRuntime, BunServices } from "@effect/platform-bun";
import { Effect, Layer } from "effect";
import { Command } from "effect/unstable/cli";
import { rootCommand } from "./root-command.ts";

const program = Command.run(rootCommand, { version: "1.0.0" });

const MainLayer = Layer.mergeAll(BunServices.layer, BunHttpClient.layer);

program.pipe(Effect.provide(MainLayer), BunRuntime.runMain);
