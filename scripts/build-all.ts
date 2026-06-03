import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import solidPlugin from "@opentui/solid/bun-plugin";
import { PLATFORMS } from "./platforms.ts";

const distDir = join(import.meta.dir, "..", "dist");
await mkdir(distDir, { recursive: true });

for (const platform of PLATFORMS) {
	const outfile = join(distDir, platform.distFile);
	const result = await Bun.build({
		entrypoints: [join(import.meta.dir, "..", "src/index.ts")],
		target: "bun",
		minify: true,
		sourcemap: false,
		plugins: [solidPlugin],
		compile: {
			target: platform.target,
			outfile,
		},
	});

	if (!result.success) {
		for (const log of result.logs) {
			console.error(log);
		}
		process.exit(1);
	}

	console.log(`built ${platform.distFile}`);
}
