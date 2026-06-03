import { cp, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import rootPackage from "../package.json" with { type: "json" };
import { PLATFORMS } from "./platforms.ts";

const root = join(import.meta.dir, "..");
const version = rootPackage.version;
const npmRoot = join(root, "dist", "npm");
const publishConfig = {
	access: "public",
	...(process.env.GITHUB_ACTIONS === "true" ? { provenance: true } : {}),
};

async function run(command: string[], cwd: string) {
	const proc = Bun.spawn(command, {
		cwd,
		stdin: "inherit",
		stdout: "inherit",
		stderr: "inherit",
	});
	if ((await proc.exited) !== 0) {
		process.exit(1);
	}
}

for (const platform of PLATFORMS) {
	const pkgDir = join(npmRoot, platform.packageName.replace("@faststats/", ""));
	await mkdir(pkgDir, { recursive: true });
	await cp(
		join(root, "dist", platform.distFile),
		join(pkgDir, platform.binaryName),
		{
			mode: 0o755,
		},
	);
	await writeFile(
		join(pkgDir, "package.json"),
		`${JSON.stringify(
			{
				name: platform.packageName,
				version,
				repository: rootPackage.repository,
				publishConfig,
				os: platform.os,
				cpu: platform.cpu,
			},
			null,
			2,
		)}\n`,
	);
	await run(
		[
			"npm",
			"publish",
			"--access",
			"public",
			...(process.env.NPM_OTP ? ["--otp", process.env.NPM_OTP] : []),
		],
		pkgDir,
	);
}

const optionalDependencies = Object.fromEntries(
	PLATFORMS.map((platform) => [platform.packageName, version]),
);

const mainDir = join(npmRoot, "cli");
await mkdir(join(mainDir, "bin"), { recursive: true });
await cp(
	join(root, "bin", "faststats.cjs"),
	join(mainDir, "bin", "faststats.cjs"),
	{
		mode: 0o755,
	},
);
await cp(join(root, "README.md"), join(mainDir, "README.md"));
await cp(join(root, "CHANGELOG.md"), join(mainDir, "CHANGELOG.md"));
await writeFile(
	join(mainDir, "package.json"),
	`${JSON.stringify(
		{
			name: rootPackage.name,
			version,
			description: "The official FastStats CLI",
			bin: {
				faststats: "./bin/faststats.cjs",
			},
			repository: rootPackage.repository,
			publishConfig,
			optionalDependencies,
			engines: {
				node: ">=18",
			},
		},
		null,
		2,
	)}\n`,
);

await run(
	[
		"npm",
		"publish",
		"--access",
		"public",
		...(process.env.NPM_OTP ? ["--otp", process.env.NPM_OTP] : []),
	],
	mainDir,
);
await run(["changeset", "tag"], root);
