import { type BoxRenderable, FrameBufferRenderable, RGBA } from "@opentui/core";
import { useRenderer } from "@opentui/solid";
import { createEffect, createMemo, createSignal, onCleanup } from "solid-js";
import { theme } from "./theme.ts";
import { findCountryIndex, rasterizeWorld } from "./world-map-data.ts";

const BRAILLE_BASE = 0x2800;
const BRAILLE_DOT_BITS: ReadonlyArray<ReadonlyArray<number>> = [
	[0x01, 0x08],
	[0x02, 0x10],
	[0x04, 0x20],
	[0x40, 0x80],
];

export interface MapChartHighlight {
	/** Country numeric ISO code (e.g. `"840"`) or country name. */
	readonly country: string;
	/** Hex color to fill the country with. */
	readonly color: string;
}

export interface MapChartProps {
	readonly accent: string;
	readonly innerWidth: number;
	readonly innerHeight: number;
	readonly highlights?: ReadonlyArray<MapChartHighlight>;
}

export function MapChart(props: MapChartProps) {
	const renderer = useRenderer();

	const charWidth = createMemo(() =>
		Math.max(1, Math.floor(props.innerWidth)),
	);
	const charHeight = createMemo(() =>
		Math.max(1, Math.floor(props.innerHeight)),
	);

	const oceanColor = RGBA.fromHex(theme.surface);
	const landColor = RGBA.fromHex(theme.borderStrong);

	const highlightMap = createMemo(() => {
		const map = new Map<number, RGBA>();
		for (const entry of props.highlights ?? []) {
			const idx = findCountryIndex(entry.country);
			if (idx === null) continue;
			map.set(idx + 1, RGBA.fromHex(entry.color));
		}
		return map;
	});

	const [parentBox, setParentBox] = createSignal<BoxRenderable | undefined>();
	let frameBuffer: FrameBufferRenderable | undefined;

	createEffect(() => {
		const parent = parentBox();
		const w = charWidth();
		const h = charHeight();
		const highlights = highlightMap();
		if (!parent) return;

		if (!frameBuffer) {
			frameBuffer = new FrameBufferRenderable(renderer, {
				width: w,
				height: h,
			});
			parent.add(frameBuffer);
		} else if (frameBuffer.width !== w || frameBuffer.height !== h) {
			frameBuffer.width = w;
			frameBuffer.height = h;
		}

		drawWorldMap(frameBuffer, w, h, oceanColor, landColor, highlights);
	});

	onCleanup(() => {
		frameBuffer?.destroy();
		frameBuffer = undefined;
	});

	return (
		<box
			ref={(el) => setParentBox(el ?? undefined)}
			flexDirection="column"
			width="100%"
			height="100%"
			alignItems="center"
			justifyContent="center"
			overflow="hidden"
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
				const bitRow = BRAILLE_DOT_BITS[sy]!;
				for (let sx = 0; sx < 2; sx++) {
					const px = cx * 2 + sx;
					const id = pixels[rowBase + px] ?? 0;
					if (id === 0) continue;
					dots |= bitRow[sx]!;
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
