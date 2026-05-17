import { Console } from "effect";
import { Command, Flag } from "effect/unstable/cli";

export const greetCommand = Command.make(
	"greet",
	{
		name: Flag.string("name").pipe(Flag.withDefault("World")),
	},
	({ name }) => Console.log(`Hello, ${name}!`),
);
