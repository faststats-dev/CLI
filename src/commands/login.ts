import { Command } from "effect/unstable/cli";
import { runDeviceLogin } from "../auth/device-auth.ts";

export const loginCommand = Command.make(
	"login",
	{},
	() => runDeviceLogin,
).pipe(
	Command.withDescription("Log in with browser-based device authorization"),
);
