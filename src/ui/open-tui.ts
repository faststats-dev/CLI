import { type CliRenderer, createCliRenderer } from "@opentui/core";


export async function runOpenTui<T>(
	mount: (ctx: {
		renderer: CliRenderer;
		close: (result: T) => void;
	}) => void | Promise<void>,
): Promise<T> {
	const renderer = await createCliRenderer({ exitOnCtrlC: false, targetFps: 60 });
	return new Promise<T>((resolve) => {
		const close = (result: T) => {
			renderer.once("destroy", () => resolve(result));
			renderer.destroy();
		};
		void Promise.resolve(mount({ renderer, close }));
	});
}
