#!/usr/bin/env node
const { existsSync } = require("node:fs");
const { join } = require("node:path");
const { env, platform: osPlatform, arch: osArch } = require("node:process");
const { spawnSync } = require("node:child_process");

const PLATFORMS = {
	win32: {
		x64: "@faststats/cli-win32-x64/faststats.exe",
		// arm64: "@faststats/cli-win32-arm64/faststats.exe",
	},
	darwin: {
		x64: "@faststats/cli-darwin-x64/faststats",
		arm64: "@faststats/cli-darwin-arm64/faststats",
	},
	linux: {
		x64: "@faststats/cli-linux-x64/faststats",
		arm64: "@faststats/cli-linux-arm64/faststats",
	},
};

const binPath = env.FASTSTATS_BINARY ?? PLATFORMS[osPlatform]?.[osArch];
const localBinary = join(__dirname, "..", "faststats");

let binary;
if (binPath) {
	try {
		binary = require.resolve(binPath);
	} catch {}
}

if (!binary && existsSync(localBinary)) {
	binary = localBinary;
}

if (!binary) {
	console.error(
		`Could not find the @faststats/cli binary for ${osPlatform}-${osArch}. ` +
			"Try reinstalling the package.",
	);
	process.exit(1);
}

const result = spawnSync(binary, process.argv.slice(2), {
	stdio: "inherit",
	env,
});

if (result.error) {
	throw result.error;
}

process.exit(result.status ?? 1);
