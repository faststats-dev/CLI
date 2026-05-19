const dark = {
	background: "#0d0d0d",
	foreground: "#fafafa",
	card: "#171717",
	cardForeground: "#fafafa",
	popover: "#171717",
	popoverForeground: "#fafafa",
	primary: "#ff6900",
	primaryForeground: "#fff7ed",
	secondary: "#27272a",
	secondaryForeground: "#fafafa",
	muted: "#262626",
	mutedForeground: "#a1a1a1",
	accent: "#404040",
	accentForeground: "#fafafa",
	destructive: "#ff6467",
	ring: "#737373",
	chart1: "#ffb86a",
	chart2: "#ff6900",
	chart3: "#f54900",
	chart4: "#ca3500",
	chart5: "#9f2d00",
	sidebar: "#171717",
	sidebarForeground: "#fafafa",
	sidebarPrimary: "#ff6900",
	sidebarPrimaryForeground: "#fff7ed",
	sidebarAccent: "#262626",
	sidebarAccentForeground: "#fafafa",
	sidebarRing: "#737373",
} as const;

export const tokens = {
	...dark,
	border: "#252525",
	input: "#313131",
	sidebarBorder: "#2e2e2e",
	success: "#3cbd4b",
} as const;

export type Tokens = typeof tokens;

export const theme = {
	bg: tokens.background,
	surface: tokens.card,
	border: tokens.border,
	borderStrong: "#3d3d3d",
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
