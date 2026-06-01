import { type FrameBufferRenderable, RGBA } from "@opentui/core";
import { createMemo } from "solid-js";
import {
	type ChartData,
	type ChartQueryConfig,
	resolveMetricKey,
	resolveSeriesRows,
	seriesToMapHighlights,
} from "../data/chart-data.ts";
import { BRAILLE_BASE, BRAILLE_DOT_BITS } from "./braille.ts";
import { FrameBufferView } from "./chart-shared.tsx";
import { theme } from "./theme.ts";
import { findCountryIndex, rasterizeWorld } from "./world-map-data.ts";

export interface MapChartProps {
	readonly accent: string;
	readonly innerWidth: number;
	readonly innerHeight: number;
	readonly data: ChartData | null;
	readonly queryConfig: ChartQueryConfig | null;
	readonly preferredChartColors: ReadonlyArray<string> | null;
}

export function MapChart(props: MapChartProps) {
	const oceanColor = RGBA.fromHex(theme.surface);
	const landColor = RGBA.fromHex(theme.borderStrong);

	const highlightMap = createMemo(() => {
		const map = new Map<number, RGBA>();
		const highlights = seriesToMapHighlights(
			resolveSeriesRows(props.data) ?? [],
			resolveMetricKey(props.queryConfig),
			{
				chartColors: props.queryConfig?.visualOptions?.colors,
				preferredChartColors: props.preferredChartColors,
			},
		);
		for (const entry of highlights) {
			const idx = findCountryIndex(entry.country);
			if (idx === null) continue;
			map.set(idx + 1, RGBA.fromHex(entry.color));
		}
		return map;
	});

	return (
		<FrameBufferView
			innerWidth={props.innerWidth}
			innerHeight={props.innerHeight}
			draw={(frameBuffer, width, height) =>
				drawWorldMap(
					frameBuffer,
					width,
					height,
					oceanColor,
					landColor,
					highlightMap(),
				)
			}
		/>
	);
}

function drawWorldMap(
	fb: FrameBufferRenderable,
	charWidth: number,
	charHeight: number,
	ocean: RGBA,
	land: RGBA,
	highlights: Map<number, RGBA>,
): void {
	const pxW = charWidth * 2;
	const pxH = charHeight * 4;
	const { pixels } = rasterizeWorld(pxW, pxH);

	fb.frameBuffer.fillRect(0, 0, charWidth, charHeight, ocean);

	for (let cy = 0; cy < charHeight; cy++) {
		for (let cx = 0; cx < charWidth; cx++) {
			let dots = 0;
			let highlightColor: RGBA | undefined;
			for (let sy = 0; sy < 4; sy++) {
				const py = cy * 4 + sy;
				const rowBase = py * pxW;
				const bitRow = BRAILLE_DOT_BITS[sy];
				if (bitRow === undefined) continue;
				for (let sx = 0; sx < 2; sx++) {
					const px = cx * 2 + sx;
					const id = pixels[rowBase + px] ?? 0;
					if (id === 0) continue;
					dots |= bitRow[sx] ?? 0;
					const hit = highlights.get(id);
					if (hit) highlightColor = hit;
				}
			}
			if (dots === 0) continue;
			const char = String.fromCodePoint(BRAILLE_BASE + dots);
			fb.frameBuffer.setCell(cx, cy, char, highlightColor ?? land, ocean);
		}
	}
}
