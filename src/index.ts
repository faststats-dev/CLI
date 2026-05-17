import { BunHttpClient, BunRuntime, BunServices } from "@effect/platform-bun";
import { Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { greetCommand } from "./commands/greet.ts";
import { projectsCommand } from "./commands/projects.ts";
import { testCommand } from "./commands/test.ts";

const cli = Command.make("app", {}, () => Effect.void).pipe(
	Command.withSubcommands([greetCommand, testCommand, projectsCommand]),
);

cli.pipe(
	Command.run({ version: "1.0.0" }),
	Effect.provide(BunServices.layer),
	Effect.provide(BunHttpClient.layer),
	BunRuntime.runMain,
);
