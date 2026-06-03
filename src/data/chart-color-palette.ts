const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

const DEFAULT = "#FDBA74";
const DEFAULTS = [
	"#FDBA74",
	"#F97316",
	"#EA580C",
	"#C2410C",
	"#9A3412",
] as const;

const HEATMAP_OPACITIES = [0.22, 0.38, 0.58, 0.78, 1] as const;

function normalizeHex(value: string): string | null {
	const color = value.trim();
	if (!HEX.test(color)) return null;
	if (color.length === 4) {
		const [r, g, b] = color.slice(1);
		return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
	}
	return color.toUpperCase();
}

function parseRgb(hex: string) {
	const n = normalizeHex(hex);
	if (!n) return null;
	return {
		r: Number.parseInt(n.slice(1, 3), 16),
		g: Number.parseInt(n.slice(3, 5), 16),
		b: Number.parseInt(n.slice(5, 7), 16),
	};
}

function toHex(r: number, g: number, b: number) {
	const channel = (v: number) =>
		Math.round(v).toString(16).padStart(2, "0").toUpperCase();
	return `#${channel(r)}${channel(g)}${channel(b)}`;
}

export function blendHexOnBackground(
	foreground: string,
	background: string,
	alpha: number,
): string {
	const fg = parseRgb(foreground);
	const bg = parseRgb(background);
	if (!fg || !bg) return foreground;
	const mix = (c: number, bgC: number) =>
		Math.round(c * alpha + bgC * (1 - alpha));
	return toHex(mix(fg.r, bg.r), mix(fg.g, bg.g), mix(fg.b, bg.b));
}

function uniqueColors(colors: readonly string[] | null | undefined): string[] {
	if (!colors?.length) return [];
	const out: string[] = [];
	for (const color of colors) {
		const hex = normalizeHex(color);
		if (hex && !out.includes(hex)) out.push(hex);
	}
	return out;
}

function buildPalette(seed: readonly string[], count: number): string[] {
	const n = Math.max(1, count);
	const base = seed.length ? seed : [...DEFAULTS];
	if (base.length >= n) return base.slice(0, n);
	if (base.length === 1) {
		const only = base[0] ?? DEFAULT;
		const extras = DEFAULTS.filter((c) => c !== only);
		return [
			only,
			...Array.from(
				{ length: n - 1 },
				(_, i) => extras[i % extras.length] ?? DEFAULT,
			),
		];
	}
	return Array.from({ length: n }, (_, i) => base[i % base.length] ?? DEFAULT);
}

export function getChartColor(
	palette: ReadonlyArray<string>,
	index: number,
): string {
	if (!palette.length) return DEFAULT;
	return (
		palette[((index % palette.length) + palette.length) % palette.length] ??
		DEFAULT
	);
}

export function resolveChartPalette(
	chartColors: readonly string[] | null | undefined,
	preferredChartColors: readonly string[] | null | undefined,
	count = 2,
): string[] {
	return buildPalette(
		uniqueColors(chartColors) || uniqueColors(preferredChartColors),
		count,
	);
}

export function buildHeatmapIntensityFills(
	baseColor: string,
	background: string,
): readonly string[] {
	const base = normalizeHex(baseColor) ?? "#F97316";
	return HEATMAP_OPACITIES.map((opacity) =>
		opacity >= 1 ? base : blendHexOnBackground(base, background, opacity),
	);
}
