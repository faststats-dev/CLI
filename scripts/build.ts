import solidPlugin from "@opentui/solid/bun-plugin";

const result = await Bun.build({
	entrypoints: ["src/index.ts"],
	target: "bun",
	minify: true,
	sourcemap: false,
	plugins: [solidPlugin],
	compile: {
		outfile: "faststats",
	},
});

if (!result.success) {
	for (const log of result.logs) {
		console.error(log);
	}
	process.exit(1);
}
