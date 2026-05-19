import { mkdir, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

const shell = (process.argv[2] ?? "fish") as "fish" | "zsh" | "bash";
if (shell !== "fish" && shell !== "zsh" && shell !== "bash") {
	console.error(`Unsupported shell: ${shell} (use fish, zsh, or bash)`);
	process.exit(1);
}

const projectRoot = join(import.meta.dir, "..");
const faststatsBin = join(projectRoot, "faststats");

const build = await Bun.build({
	entrypoints: [join(projectRoot, "src/index.ts")],
	target: "bun",
	plugins: [(await import("@opentui/solid/bun-plugin")).default],
	compile: { outfile: faststatsBin },
});

if (!build.success) {
	for (const log of build.logs) console.error(log);
	process.exit(1);
}

const proc = Bun.spawn([faststatsBin, "--completions", shell], {
	cwd: projectRoot,
	env: process.env,
	stdout: "pipe",
	stderr: "inherit",
});

const script = await new Response(proc.stdout).text();
const exit = await proc.exited;
if (exit !== 0) {
	console.error(`faststats --completions ${shell} failed with code ${exit}`);
	process.exit(exit);
}

const home = homedir();
const paths: Record<typeof shell, string> = {
	fish: join(home, ".config/fish/completions/faststats.fish"),
	zsh: join(home, ".zsh/completions/_faststats"),
	bash: join(home, ".bash_completion.d/faststats.bash"),
};

const dest = paths[shell];
await mkdir(join(dest, ".."), { recursive: true });
await writeFile(dest, script, "utf8");

const localBin = join(home, ".local/bin");
await mkdir(localBin, { recursive: true });
const linkedBin = join(localBin, "faststats");

try {
	await Bun.write(linkedBin, Bun.file(faststatsBin));
	await Bun.spawn(["chmod", "+x", linkedBin]).exited;
} catch {
	console.warn(`Could not install binary to ${linkedBin}`);
}

console.log(`Installed completions: ${dest}`);
console.log(`Installed binary:      ${linkedBin}`);
console.log("");
console.log("Ensure ~/.local/bin is on your PATH, then restart your shell.");
console.log("Test with: faststats <TAB>");

if (shell === "fish") {
	console.log("");
	console.log("Fish loads completions from ~/.config/fish/completions/ automatically.");
}

if (shell === "zsh") {
	console.log("");
	console.log('Add to ~/.zshrc before compinit: fpath=(~/.zsh/completions $fpath)');
}

if (shell === "bash") {
	console.log("");
	console.log('Add to ~/.bashrc: source ~/.bash_completion.d/faststats.bash');
}
