export type Platform = {
	target: Bun.Build.CompileTarget;
	npmSuffix: string;
	packageName: string;
	os: string[];
	cpu: string[];
	binaryName: string;
	distFile: string;
};

export const PLATFORMS: Platform[] = [
	{
		target: "bun-linux-x64",
		npmSuffix: "linux-x64",
		packageName: "@faststats/cli-linux-x64",
		os: ["linux"],
		cpu: ["x64"],
		binaryName: "faststats",
		distFile: "faststats-linux-x64",
	},
	{
		target: "bun-linux-arm64",
		npmSuffix: "linux-arm64",
		packageName: "@faststats/cli-linux-arm64",
		os: ["linux"],
		cpu: ["arm64"],
		binaryName: "faststats",
		distFile: "faststats-linux-arm64",
	},
	{
		target: "bun-darwin-x64",
		npmSuffix: "darwin-x64",
		packageName: "@faststats/cli-darwin-x64",
		os: ["darwin"],
		cpu: ["x64"],
		binaryName: "faststats",
		distFile: "faststats-darwin-x64",
	},
	{
		target: "bun-darwin-arm64",
		npmSuffix: "darwin-arm64",
		packageName: "@faststats/cli-darwin-arm64",
		os: ["darwin"],
		cpu: ["arm64"],
		binaryName: "faststats",
		distFile: "faststats-darwin-arm64",
	},
	{
		target: "bun-windows-x64",
		npmSuffix: "win32-x64",
		packageName: "@faststats/cli-win32-x64",
		os: ["win32"],
		cpu: ["x64"],
		binaryName: "faststats.exe",
		distFile: "faststats-win32-x64.exe",
	},
	// {
	// 	target: "bun-windows-arm64",
	// 	npmSuffix: "win32-arm64",
	// 	packageName: "@faststats/cli-win32-arm64",
	// 	os: ["win32"],
	// 	cpu: ["arm64"],
	// 	binaryName: "faststats.exe",
	// 	distFile: "faststats-win32-arm64.exe",
	// },
];

export function platformBinImportPath(platform: Platform): string {
	return `${platform.packageName}/${platform.binaryName}`;
}
