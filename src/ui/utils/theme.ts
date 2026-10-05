export const theme = {
	bg: "#0d0d0d",
	surface: "#171717",
	muted: "#262626",
	border: "#252525",
	borderStrong: "#3d3d3d",
	text: "#fafafa",
	textBright: "#fafafa",
	textDim: "#a1a1a1",
	textMuted: "#a1a1a1",
	selectedBg: "#404040",
	selectedAccent: "#ff6900",
	success: "#3cbd4b",
	danger: "#ff6467",
	chartPalette: [
		"#ffb86a",
		"#ff6900",
		"#f54900",
		"#ca3500",
		"#9f2d00",
	] as const,
} as const;

export function chartColor(index: number): string {
	const palette = theme.chartPalette;
	const safeIndex =
		((index % palette.length) + palette.length) % palette.length;
	return palette[safeIndex] ?? "#ff6900";
}
