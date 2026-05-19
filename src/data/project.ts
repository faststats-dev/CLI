export interface Trend {
	readonly direction: "up" | "down" | "flat";
	readonly percent: number;
}

export interface Metric {
	readonly value: number;
	readonly trend: Trend;
}

export interface Project {
	readonly id: string;
	readonly name: string;
	readonly slug: string;
	readonly visibility: "public" | "private";
	readonly events: Metric;
	readonly errors: Metric;
	readonly users: Metric;
}
