import { type CliRenderer, createCliRenderer } from "@opentui/core";

export async function createOpenTuiRenderer(): Promise<CliRenderer> {
	return createCliRenderer({ exitOnCtrlC: false, targetFps: 60 });
}

export function waitForDestroy<T>(renderer: CliRenderer, value: T): Promise<T> {
	return new Promise((resolve) => {
		renderer.once("destroy", () => resolve(value));
	});
}
