import type { SeriesEntry } from "../data/chart-data.ts";
import { bucketSeriesEntries } from "../data/chart-data.ts";
import { getChartColor } from "../data/chart-color-palette.ts";
import { theme } from "./theme.ts";

export interface ChartLineSegment {
	readonly text: string;
	readonly color: string;
}

export interface ColoredBarChartRow {
	readonly segments: ReadonlyArray<ChartLineSegment>;
	readonly muted?: boolean;
}

export function renderVerticalBarLines(
	entries: ReadonlyArray<SeriesEntry>,
	width: number,
	height: number,
	options: { readonly isTimeGrouped: boolean } = { isTimeGrouped: false },
): ReadonlyArray<string> {
	if (entries.length === 0 || width <= 0 || height <= 0) return [];

	return options.isTimeGrouped
		? renderTimeSeriesBarLines(entries, width, height)
		: renderCategoricalBarLines(entries, width, height);
}

export function renderCategoricalBarRows(
	entries: ReadonlyArray<SeriesEntry>,
	width: number,
	height: number,
	palette: ReadonlyArray<string>,
): ReadonlyArray<ColoredBarChartRow> {
	if (entries.length === 0 || width <= 0 || height <= 0) return [];

	const labelRows = height >= 4 ? 1 : 0;
	const plotRows = Math.max(1, height - labelRows - 1);
	const max = Math.max(...entries.map((entry) => entry.value), 1);
	const grid = Array.from({ length: plotRows }, () =>
		Array.from({ length: width }, () => " "),
	);
	const colors: string[] = Array.from({ length: width }, () => theme.surface);

	for (let index = 0; index < entries.length; index++) {
		const entry = entries[index]!;
		const color = getChartColor([...palette], index);
		const slotStart = Math.floor((index * width) / entries.length);
		const slotEnd = Math.floor(((index + 1) * width) / entries.length);
		const slotWidth = Math.max(1, slotEnd - slotStart);
		const barWidth = Math.max(1, Math.floor(slotWidth * 0.65));
		const center = slotStart + Math.floor(slotWidth / 2);
		const barStart = Math.max(
			0,
			Math.min(width - barWidth, center - Math.floor(barWidth / 2)),
		);
		const barHeight = Math.max(
			1,
			Math.round((entry.value / max) * plotRows),
		);

		for (let row = 0; row < barHeight; row++) {
			for (let col = barStart; col < barStart + barWidth; col++) {
				grid[plotRows - 1 - row]![col] = "█";
				colors[col] = color;
			}
		}
	}

	const rows: ColoredBarChartRow[] = grid.map((line) => ({
		segments: compressLineSegments(line, colors),
	}));
	rows.push({
		segments: [{ text: "─".repeat(width), color: theme.textMuted }],
		muted: true,
	});

	if (labelRows > 0) {
		const labels = Array.from({ length: width }, () => " ");
		for (let index = 0; index < entries.length; index++) {
			const slotStart = Math.floor((index * width) / entries.length);
			const slotEnd = Math.floor(((index + 1) * width) / entries.length);
			const slotWidth = Math.max(1, slotEnd - slotStart);
			const label = entries[index]!.name.slice(0, slotWidth);
			const offset =
				slotStart + Math.max(0, Math.floor((slotWidth - label.length) / 2));
			for (let i = 0; i < label.length && offset + i < width; i++) {
				labels[offset + i] = label[i]!;
			}
		}
		rows.push({
			segments: [{ text: labels.join(""), color: theme.textMuted }],
			muted: true,
		});
	}

	return rows;
}

function compressLineSegments(
	chars: ReadonlyArray<string>,
	colors: ReadonlyArray<string>,
): ReadonlyArray<ChartLineSegment> {
	if (chars.length === 0) return [];

	const segments: ChartLineSegment[] = [];
	let text = chars[0]!;
	let color = colors[0] ?? theme.surface;

	for (let index = 1; index < chars.length; index++) {
		const nextColor = colors[index] ?? theme.surface;
		if (nextColor === color) {
			text += chars[index];
			continue;
		}
		segments.push({ text, color });
		text = chars[index]!;
		color = nextColor;
	}

	segments.push({ text, color });
	return segments;
}

function renderCategoricalBarLines(
	entries: ReadonlyArray<SeriesEntry>,
	width: number,
	height: number,
): ReadonlyArray<string> {
	const labelRows = height >= 4 ? 1 : 0;
	const plotRows = Math.max(1, height - labelRows - 1);
	const max = Math.max(...entries.map((entry) => entry.value), 1);
	const grid = Array.from({ length: plotRows }, () =>
		Array.from({ length: width }, () => " "),
	);

	for (let index = 0; index < entries.length; index++) {
		const entry = entries[index]!;
		const slotStart = Math.floor((index * width) / entries.length);
		const slotEnd = Math.floor(((index + 1) * width) / entries.length);
		const slotWidth = Math.max(1, slotEnd - slotStart);
		const barWidth = Math.max(1, Math.floor(slotWidth * 0.65));
		const center = slotStart + Math.floor(slotWidth / 2);
		const barStart = Math.max(0, Math.min(width - barWidth, center - Math.floor(barWidth / 2)));
		const barHeight = Math.max(
			1,
			Math.round((entry.value / max) * plotRows),
		);

		for (let row = 0; row < barHeight; row++) {
			for (let col = barStart; col < barStart + barWidth; col++) {
				grid[plotRows - 1 - row]![col] = "█";
			}
		}
	}

	const lines = grid.map((row) => row.join(""));
	lines.push("─".repeat(width));

	if (labelRows > 0) {
		const labels = Array.from({ length: width }, () => " ");
		for (let index = 0; index < entries.length; index++) {
			const slotStart = Math.floor((index * width) / entries.length);
			const slotEnd = Math.floor(((index + 1) * width) / entries.length);
			const slotWidth = Math.max(1, slotEnd - slotStart);
			const label = entries[index]!.name.slice(0, slotWidth);
			const offset = slotStart + Math.max(0, Math.floor((slotWidth - label.length) / 2));
			for (let i = 0; i < label.length && offset + i < width; i++) {
				labels[offset + i] = label[i]!;
			}
		}
		lines.push(labels.join(""));
	}

	return lines;
}

function renderTimeSeriesBarLines(
	entries: ReadonlyArray<SeriesEntry>,
	width: number,
	height: number,
): ReadonlyArray<string> {
	const plotRows = Math.max(1, height - 1);
	const data = bucketSeriesEntries(entries, width);
	const max = Math.max(...data.map((entry) => entry.value), 1);
	const grid = Array.from({ length: plotRows }, () =>
		Array.from({ length: width }, () => " "),
	);

	for (let col = 0; col < data.length; col++) {
		const barHeight = Math.max(
			1,
			Math.round((data[col]!.value / max) * plotRows),
		);
		for (let row = 0; row < barHeight; row++) {
			grid[plotRows - 1 - row]![col] = "█";
		}
	}

	const lines = grid.map((row) => row.join(""));
	lines.push("─".repeat(width));
	return lines;
}
