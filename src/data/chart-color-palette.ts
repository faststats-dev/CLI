const HEX_COLOR_RE = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

const SINGLE_COLOR_HUE_OFFSETS = [0, 18, -14, 34, -28, 52, -42, 70, -56, 86];
const SINGLE_COLOR_LIGHTNESS_OFFSETS = [
	0, 8, -8, 14, -14, 18, -18, 24, -24, 28,
];
const SINGLE_COLOR_SATURATION_OFFSETS = [
	0, 6, -6, 10, -10, 12, -12, 14, -14, 16,
];

const DEFAULT_CHART_COLOR = "#FDBA74";
const DEFAULT_CHART_COLORS = [
	"#FDBA74",
	"#F97316",
	"#EA580C",
	"#C2410C",
	"#9A3412",
] as const;

function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(min, value));
}

function normalizeHexColor(value: string): string | null {
	const color = value.trim();
	if (!HEX_COLOR_RE.test(color)) return null;

	if (color.length === 4) {
		const [r, g, b] = color.slice(1);
		return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
	}

	return color.toUpperCase();
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
	const c = hex.slice(1);
	const r = Number.parseInt(c.slice(0, 2), 16) / 255;
	const g = Number.parseInt(c.slice(2, 4), 16) / 255;
	const b = Number.parseInt(c.slice(4, 6), 16) / 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const delta = max - min;

	let h = 0;
	const l = (max + min) / 2;

	if (delta !== 0) {
		switch (max) {
			case r:
				h = ((g - b) / delta) % 6;
				break;
			case g:
				h = (b - r) / delta + 2;
				break;
			default:
				h = (r - g) / delta + 4;
				break;
		}
	}

	h *= 60;
	if (h < 0) h += 360;

	const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	return {
		h,
		s: s * 100,
		l: l * 100,
	};
}

function hslToHex(h: number, s: number, l: number): string {
	const sat = clamp(s, 0, 100) / 100;
	const lig = clamp(l, 0, 100) / 100;
	const c = (1 - Math.abs(2 * lig - 1)) * sat;
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	const m = lig - c / 2;

	let r = 0;
	let g = 0;
	let b = 0;

	if (h < 60) {
		r = c;
		g = x;
	} else if (h < 120) {
		r = x;
		g = c;
	} else if (h < 180) {
		g = c;
		b = x;
	} else if (h < 240) {
		g = x;
		b = c;
	} else if (h < 300) {
		r = x;
		b = c;
	} else {
		r = c;
		b = x;
	}

	const toHex = (value: number) =>
		Math.round((value + m) * 255)
			.toString(16)
			.padStart(2, "0")
			.toUpperCase();

	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function generateFromSingleColor(baseColor: string, index: number): string {
	const base = hexToHsl(baseColor);
	const offsetIndex = index % SINGLE_COLOR_HUE_OFFSETS.length;
	const cycle = Math.floor(index / SINGLE_COLOR_HUE_OFFSETS.length);

	const h =
		(base.h + (SINGLE_COLOR_HUE_OFFSETS[offsetIndex] ?? 0) + cycle * 20 + 360) %
		360;
	const s = clamp(
		base.s + (SINGLE_COLOR_SATURATION_OFFSETS[offsetIndex] ?? 0) - cycle * 3,
		35,
		92,
	);
	const l = clamp(
		base.l + (SINGLE_COLOR_LIGHTNESS_OFFSETS[offsetIndex] ?? 0) + cycle * 5,
		28,
		78,
	);

	return hslToHex(h, s, l);
}

function sanitizeInputColors(colors: readonly string[] | undefined): string[] {
	if (!colors?.length) return [];

	const unique = new Set<string>();
	for (const color of colors) {
		const normalized = normalizeHexColor(color);
		if (normalized) unique.add(normalized);
	}
	return Array.from(unique);
}

function buildChartPalette(
	inputColors: readonly string[] | undefined,
	count: number,
	fallbackColors: readonly string[] = DEFAULT_CHART_COLORS,
): string[] {
	const safeCount = Math.max(1, count);
	const baseColors = sanitizeInputColors(inputColors);
	const fallback = sanitizeInputColors(fallbackColors);
	const seed = baseColors.length > 0 ? baseColors : fallback;

	if (seed.length === 0) return [DEFAULT_CHART_COLOR];
	if (seed.length >= safeCount) return seed.slice(0, safeCount);

	const result = [...seed];
	while (result.length < safeCount) {
		const [firstSeed] = seed;
		if (seed.length === 1 && firstSeed !== undefined) {
			result.push(generateFromSingleColor(firstSeed, result.length));
			continue;
		}

		const anchor = seed[result.length % seed.length];
		if (anchor === undefined) break;
		const bump = Math.floor(result.length / seed.length);
		const { h, s, l } = hexToHsl(anchor);
		result.push(
			hslToHex(
				(h + (bump % 2 === 0 ? 14 : -14) + 360) % 360,
				clamp(s + (bump % 2 === 0 ? 4 : -4), 35, 92),
				clamp(l + (bump % 2 === 0 ? 6 : -6), 28, 78),
			),
		);
	}

	return result;
}

export function getChartColor(
	palette: ReadonlyArray<string>,
	index: number,
): string {
	if (!palette.length) return DEFAULT_CHART_COLOR;
	const normalizedIndex =
		((index % palette.length) + palette.length) % palette.length;
	return palette[normalizedIndex] ?? DEFAULT_CHART_COLOR;
}

interface RgbColor {
	readonly r: number;
	readonly g: number;
	readonly b: number;
}

function parseColor(color: string): RgbColor | null {
	const normalized = normalizeHexColor(color);
	if (!normalized) return null;
	return {
		r: Number.parseInt(normalized.slice(1, 3), 16),
		g: Number.parseInt(normalized.slice(3, 5), 16),
		b: Number.parseInt(normalized.slice(5, 7), 16),
	};
}

function formatRgb(rgb: RgbColor): string {
	const toHex = (value: number) =>
		Math.round(value).toString(16).padStart(2, "0");
	return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`.toUpperCase();
}

export function blendHexOnBackground(
	foreground: string,
	background: string,
	alpha: number,
): string {
	const fg = parseColor(foreground);
	const bg = parseColor(background);
	if (!fg || !bg) return foreground;
	const mix = (c: number, bgC: number) =>
		Math.round(c * alpha + bgC * (1 - alpha));
	return formatRgb({
		r: mix(fg.r, bg.r),
		g: mix(fg.g, bg.g),
		b: mix(fg.b, bg.b),
	});
}

const HEATMAP_INTENSITY_OPACITIES = [0.22, 0.38, 0.58, 0.78, 1] as const;

const FALLBACK_HEATMAP_BASE = "#F97316";

export function buildHeatmapIntensityFills(
	baseColor: string,
	background: string,
): readonly string[] {
	const rgb = parseColor(baseColor);
	const base = rgb ? formatRgb(rgb) : FALLBACK_HEATMAP_BASE;
	return HEATMAP_INTENSITY_OPACITIES.map((opacity) =>
		opacity >= 1 ? base : blendHexOnBackground(base, background, opacity),
	);
}

export function resolveChartPalette(
	chartColors: readonly string[] | null | undefined,
	preferredChartColors: readonly string[] | null | undefined,
	count = 2,
): string[] {
	return buildChartPalette(
		chartColors ?? preferredChartColors ?? undefined,
		count,
	);
}
