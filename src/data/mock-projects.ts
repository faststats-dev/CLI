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

export const mockProjects: ReadonlyArray<Project> = [
	{
		id: "characters",
		name: "Characters",
		slug: "/characters",
		visibility: "public",
		events: { value: 6_400, trend: { direction: "up", percent: 12 } },
		errors: { value: 0, trend: { direction: "flat", percent: 0 } },
		users: { value: 55, trend: { direction: "down", percent: 0.3 } },
	},
	{
		id: "commander",
		name: "Commander",
		slug: "/commander",
		visibility: "public",
		events: { value: 16_100, trend: { direction: "up", percent: 7.2 } },
		errors: { value: 0, trend: { direction: "flat", percent: 0 } },
		users: { value: 84, trend: { direction: "up", percent: 12 } },
	},
	{
		id: "creative-utilities",
		name: "CreativeUtilities",
		slug: "/creative-utilities",
		visibility: "public",
		events: { value: 6_100, trend: { direction: "up", percent: 14.9 } },
		errors: { value: 0, trend: { direction: "flat", percent: 0 } },
		users: { value: 23, trend: { direction: "flat", percent: 0 } },
	},
	{
		id: "docs",
		name: "Docs",
		slug: "/docs",
		visibility: "private",
		events: { value: 1_700, trend: { direction: "down", percent: 0.9 } },
		errors: { value: 1, trend: { direction: "up", percent: 100 } },
		users: { value: 124, trend: { direction: "down", percent: 21.5 } },
	},
	{
		id: "economist",
		name: "Economist",
		slug: "/economist",
		visibility: "public",
		events: { value: 0, trend: { direction: "down", percent: 100 } },
		errors: { value: 0, trend: { direction: "flat", percent: 0 } },
		users: { value: 0, trend: { direction: "down", percent: 100 } },
	},
	{
		id: "holograms",
		name: "Holograms",
		slug: "/holograms",
		visibility: "public",
		events: { value: 21_300, trend: { direction: "up", percent: 4 } },
		errors: { value: 0, trend: { direction: "flat", percent: 0 } },
		users: { value: 135, trend: { direction: "down", percent: 5.4 } },
	},
	{
		id: "per-worlds",
		name: "PerWorlds",
		slug: "/per-worlds",
		visibility: "public",
		events: { value: 8_700, trend: { direction: "up", percent: 1.6 } },
		errors: { value: 0, trend: { direction: "down", percent: 100 } },
		users: { value: 53, trend: { direction: "down", percent: 7 } },
	},
];
