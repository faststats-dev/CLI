export interface Project {
	readonly id: string;
	readonly name: string;
	readonly slug: string;
	readonly visibility: "public" | "private";
	readonly preferredChartColors: ReadonlyArray<string> | null;
}
