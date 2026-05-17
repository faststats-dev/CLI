import { compositeOver, oklch } from "./oklch.ts";

const dark = {
	background: oklch(0.16, 0, 0),
	foreground: oklch(0.985, 0, 0),
	card: oklch(0.205, 0, 0),
	cardForeground: oklch(0.985, 0, 0),
	popover: oklch(0.205, 0, 0),
	popoverForeground: oklch(0.985, 0, 0),
	primary: oklch(0.705, 0.213, 47.604),
	primaryForeground: oklch(0.98, 0.016, 73.684),
	secondary: oklch(0.274, 0.006, 286.033),
	secondaryForeground: oklch(0.985, 0, 0),
	muted: oklch(0.269, 0, 0),
	mutedForeground: oklch(0.708, 0, 0),
	accent: oklch(0.371, 0, 0),
	accentForeground: oklch(0.985, 0, 0),
	destructive: oklch(0.704, 0.191, 22.216),
	ring: oklch(0.556, 0, 0),
	chart1: oklch(0.837, 0.128, 66.29),
	chart2: oklch(0.705, 0.213, 47.604),
	chart3: oklch(0.646, 0.222, 41.116),
	chart4: oklch(0.553, 0.195, 38.402),
	chart5: oklch(0.47, 0.157, 37.304),
	sidebar: oklch(0.205, 0, 0),
	sidebarForeground: oklch(0.985, 0, 0),
	sidebarPrimary: oklch(0.705, 0.213, 47.604),
	sidebarPrimaryForeground: oklch(0.98, 0.016, 73.684),
	sidebarAccent: oklch(0.269, 0, 0),
	sidebarAccentForeground: oklch(0.985, 0, 0),
	sidebarRing: oklch(0.556, 0, 0),
} as const;

const darkBorder = compositeOver(oklch(1, 0, 0), dark.background, 0.1);
const darkInput = compositeOver(oklch(1, 0, 0), dark.background, 0.15);
const darkSidebarBorder = compositeOver(oklch(1, 0, 0), dark.sidebar, 0.1);
const darkSuccess = oklch(0.704, 0.191, 145);

export const tokens = {
	...dark,
	border: darkBorder,
	input: darkInput,
	sidebarBorder: darkSidebarBorder,
	success: darkSuccess,
} as const;

export type Tokens = typeof tokens;

export const theme = {
	bg: tokens.background,
	surface: tokens.card,
	border: tokens.border,
	borderStrong: compositeOver(oklch(1, 0, 0), tokens.background, 0.2),
	text: tokens.foreground,
	textBright: tokens.foreground,
	textDim: tokens.mutedForeground,
	textMuted: tokens.mutedForeground,
	selectedBg: tokens.accent,
	selectedAccent: tokens.primary,
	success: tokens.success,
	danger: tokens.destructive,
	warning: tokens.chart1,
	hint: tokens.ring,
	chartPalette: [
		tokens.chart1,
		tokens.chart2,
		tokens.chart3,
		tokens.chart4,
		tokens.chart5,
	] as const,
} as const;

export type Theme = typeof theme;

export function chartColor(index: number): string {
	const palette = theme.chartPalette;
	const safeIndex =
		((index % palette.length) + palette.length) % palette.length;
	return palette[safeIndex] ?? tokens.primary;
}
