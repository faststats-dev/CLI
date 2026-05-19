import { BunHttpClient, BunRuntime, BunServices } from "@effect/platform-bun";
import { Effect, Layer } from "effect";
import { Command } from "effect/unstable/cli";
import { buildRootCommand } from "./root-command.ts";

const program = Effect.gen(function* () {
	const cli = yield* buildRootCommand;
	yield* Command.run(cli, { version: "1.0.0" });
});

const MainLayer = Layer.mergeAll(BunServices.layer, BunHttpClient.layer);

program.pipe(Effect.provide(MainLayer), BunRuntime.runMain);
