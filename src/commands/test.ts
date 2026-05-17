import { createCliRenderer, Text } from "@opentui/core";
import { Effect } from "effect";
import { Command } from "effect/unstable/cli";

export const testCommand = Command.make("test", {}, () =>
	Effect.gen(function* () {
		const renderer = yield* Effect.tryPromise(() =>
			createCliRenderer({ exitOnCtrlC: true }),
		);

		renderer.root.add(Text({ content: "Hello, World!", fg: "#00FF00" }));
	}),
);
