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
	readonly preferredChartColors: ReadonlyArray<string> | null;
	readonly events: Metric;
	readonly errors: Metric;
	readonly users: Metric;
}

export const EMPTY_METRIC: Metric = {
	value: 0,
	trend: { direction: "flat", percent: 0 },
};

function trendFromChange(change: number | null): Trend {
	if (change == null || change === 0) {
		return { direction: "flat", percent: 0 };
	}
	return {
		direction: change > 0 ? "up" : "down",
		percent: Math.abs(change),
	};
}

