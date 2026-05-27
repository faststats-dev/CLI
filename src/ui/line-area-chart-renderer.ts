import { type FrameBufferRenderable, RGBA } from "@opentui/core";
import { BRAILLE_BASE, BRAILLE_DOT_BITS } from "./braille.ts";
import { theme } from "./theme.ts";

const LAYER_GRID = 0;
const LAYER_FILL = 1;
const LAYER_DATA = 2;
const AREA_FILL_ALPHA = 0.18;

interface Pixel {
	readonly color: string;
	readonly layer: number;
}

interface PixelBuffer {
	readonly width: number;
	readonly height: number;
	readonly pixels: (Pixel | null)[][];
}

export interface LineAreaChartSeriesStyle {
	readonly values: ReadonlyArray<number>;
	readonly lineColor: string;
	readonly fillColor: string;
}

export interface LineAreaChartPalette {
	readonly gridColor: string;
	readonly bgColor: string;
}

function blendHex(base: string, target: string, ratio: number): string {
	const parse = (hex: string) => {
		const h = hex.replace("#", "");
		return [
			Number.parseInt(h.slice(0, 2), 16),
			Number.parseInt(h.slice(2, 4), 16),
			Number.parseInt(h.slice(4, 6), 16),
		] as const;
	};
	const [br, bg, bb] = parse(base);
	const [tr, tg, tb] = parse(target);
	const mix = (left: number, right: number) =>
		Math.round(left + (right - left) * ratio)
			.toString(16)
			.padStart(2, "0");
	return `#${mix(br, tr)}${mix(bg, tg)}${mix(bb, tb)}`;
}

function compositeHex(foreground: string, background: string, alpha: number): string {
	const parse = (hex: string) => {
		const h = hex.replace("#", "");
		return [
			Number.parseInt(h.slice(0, 2), 16),
			Number.parseInt(h.slice(2, 4), 16),
			Number.parseInt(h.slice(4, 6), 16),
		] as const;
	};
	const [fr, fg, fb] = parse(foreground);
	const [br, bg, bb] = parse(background);
	const a = Math.max(0, Math.min(1, alpha));
	const mix = (left: number, right: number) =>
		Math.round(left * a + right * (1 - a));
	const toHex = (value: number) => value.toString(16).padStart(2, "0");
	return `#${toHex(mix(fr, br))}${toHex(mix(fg, bg))}${toHex(mix(fb, bb))}`;
}

export function resolveLineAreaSeriesStyle(lineColor: string): {
	readonly lineColor: string;
	readonly fillColor: string;
} {
	return {
		lineColor,
		fillColor: blendHex(theme.surface, lineColor, AREA_FILL_ALPHA),
	};
}

export function resolveLineAreaChartPalette(): LineAreaChartPalette {
	return {
		gridColor: blendHex(theme.surface, theme.border, 0.55),
		bgColor: theme.surface,
	};
}

function createPixelBuffer(width: number, height: number): PixelBuffer {
	const pixels: (Pixel | null)[][] = [];
	for (let y = 0; y < height; y++) {
		pixels.push(Array.from({ length: width }, () => null));
	}
	return { width, height, pixels };
}

function setPixel(
	buf: PixelBuffer,
	x: number,
	y: number,
	color: string,
	layer: number,
): void {
	const px = Math.round(x);
	const py = Math.round(y);
	if (px < 0 || px >= buf.width || py < 0 || py >= buf.height) return;
	const row = buf.pixels[py];
	if (!row) return;
	const existing = row[px];
	if (!existing || layer >= existing.layer) {
		row[px] = { color, layer };
	}
}

function drawLine(
	buf: PixelBuffer,
	x0: number,
	y0: number,
	x1: number,
	y1: number,
	color: string,
	layer: number,
): void {
	const startX = Math.round(x0);
	const startY = Math.round(y0);
	const endX = Math.round(x1);
	const endY = Math.round(y1);
	let dx = Math.abs(endX - startX);
	let dy = Math.abs(endY - startY);
	const sx = startX < endX ? 1 : -1;
	const sy = startY < endY ? 1 : -1;
	let err = dx - dy;
	let x = startX;
	let y = startY;

	while (true) {
		setPixel(buf, x, y, color, layer);
		if (x === endX && y === endY) break;
		const e2 = 2 * err;
		if (e2 > -dy) {
			err -= dy;
			x += sx;
		}
		if (e2 < dx) {
			err += dx;
			y += sy;
		}
	}
}

function fillColumnArea(
	buf: PixelBuffer,
	x: number,
	y0: number,
	y1: number,
	color: string,
	bgColor: string,
): void {
	const px = Math.round(x);
	if (px < 0 || px >= buf.width) return;
	const start = Math.min(Math.round(y0), Math.round(y1));
	const end = Math.max(Math.round(y0), Math.round(y1));

	for (let y = start; y <= end; y++) {
		if (y < 0 || y >= buf.height) continue;
		const row = buf.pixels[y];
		if (!row) continue;
		const existing = row[px];
		if (existing && existing.layer >= LAYER_DATA) continue;
		const under =
			existing?.layer === LAYER_FILL ? existing.color : bgColor;
		row[px] = {
			color: compositeHex(color, under, AREA_FILL_ALPHA),
			layer: LAYER_FILL,
		};
	}
}

function getSeriesPosition(
	index: number,
	pointCount: number,
	width: number,
): number {
	if (pointCount <= 1) return Math.round((width - 1) / 2);
	return Math.round((index / (pointCount - 1)) * (width - 1));
}

function getScaledY(
	value: number,
	min: number,
	max: number,
	top: number,
	bottom: number,
): number {
	const range = max - min || 1;
	const height = bottom - top;
	return top + Math.round((1 - (value - min) / range) * height);
}

function computeGridLines(
	min: number,
	max: number,
	chartTop: number,
	chartBottom: number,
	numLines: number,
): ReadonlyArray<{ readonly y: number; readonly price: number }> {
	const range = max - min || 1;
	const chartH = chartBottom - chartTop;
	const result: Array<{ y: number; price: number }> = [];
	for (let index = 0; index <= numLines; index++) {
		const frac = index / numLines;
		result.push({
			y: chartTop + Math.round(frac * chartH),
			price: max - frac * range,
		});
	}
	return result;
}

function drawGridLines(buf: PixelBuffer, yPositions: ReadonlyArray<number>, color: string): void {
	for (const rawY of yPositions) {
		const y = Math.round(rawY);
		if (y < 0 || y >= buf.height) continue;
		const row = buf.pixels[y];
		if (!row) continue;
		for (let x = 0; x < buf.width; x++) {
			if (x % 6 === 0 && !row[x]) {
				setPixel(buf, x, y, color, LAYER_GRID);
			}
		}
	}
}

function drawLineSeries(
	buf: PixelBuffer,
	values: ReadonlyArray<number>,
	chartTop: number,
	chartBottom: number,
	lineColor: string,
	min: number,
	max: number,
): void {
	if (values.length === 0) return;

	for (let index = 0; index < values.length; index++) {
		const x = getSeriesPosition(index, values.length, buf.width);
		const y = getScaledY(values[index]!, min, max, chartTop, chartBottom);
		if (index < values.length - 1) {
			const nextX = getSeriesPosition(index + 1, values.length, buf.width);
			const nextY = getScaledY(values[index + 1]!, min, max, chartTop, chartBottom);
			drawLine(buf, x, y, nextX, nextY, lineColor, LAYER_DATA);
		} else {
			setPixel(buf, x, y, lineColor, LAYER_DATA);
		}
	}
}

function drawAreaFill(
	buf: PixelBuffer,
	values: ReadonlyArray<number>,
	chartTop: number,
	chartBottom: number,
	fillColor: string,
	bgColor: string,
	min: number,
	max: number,
): void {
	if (values.length === 0) return;

	for (let index = 0; index < values.length; index++) {
		const x = getSeriesPosition(index, values.length, buf.width);
		const y = getScaledY(values[index]!, min, max, chartTop, chartBottom);

		fillColumnArea(buf, x, y + 1, chartBottom, fillColor, bgColor);

		if (index >= values.length - 1) continue;

		const nextX = getSeriesPosition(index + 1, values.length, buf.width);
		const nextY = getScaledY(values[index + 1]!, min, max, chartTop, chartBottom);

		for (let cx = Math.min(x, nextX); cx <= Math.max(x, nextX); cx++) {
			if (cx === x || cx === nextX) continue;
			const t = (cx - x) / Math.max(Math.abs(nextX - x), 1);
			const interpolatedY = Math.round(y + t * (nextY - y));
			fillColumnArea(buf, cx, interpolatedY + 1, chartBottom, fillColor, bgColor);
		}
	}
}

function renderPixelBufferToFrameBuffer(
	fb: FrameBufferRenderable,
	buf: PixelBuffer,
	charWidth: number,
	charHeight: number,
	bgColor: RGBA,
): void {
	fb.frameBuffer.fillRect(0, 0, charWidth, charHeight, bgColor);

	for (let row = 0; row < charHeight; row++) {
		for (let col = 0; col < charWidth; col++) {
			let topLayer = -1;
			const dotsByLayer = new Map<number, number>();
			const colorByLayer = new Map<number, Map<string, number>>();

			for (let dy = 0; dy < 4; dy++) {
				for (let dx = 0; dx < 2; dx++) {
					const px = col * 2 + dx;
					const py = row * 4 + dy;
					if (px >= buf.width || py >= buf.height) continue;
					const pixel = buf.pixels[py]?.[px] ?? null;
					if (!pixel) continue;
					const bit = BRAILLE_DOT_BITS[dy]![dx]!;
					dotsByLayer.set(pixel.layer, (dotsByLayer.get(pixel.layer) ?? 0) | bit);
					if (!colorByLayer.has(pixel.layer)) {
						colorByLayer.set(pixel.layer, new Map());
					}
					const counts = colorByLayer.get(pixel.layer)!;
					counts.set(pixel.color, (counts.get(pixel.color) ?? 0) + 1);
					if (pixel.layer > topLayer) topLayer = pixel.layer;
				}
			}

			if (topLayer < 0) continue;

			const pattern = dotsByLayer.get(topLayer) ?? 0;
			if (pattern === 0) continue;

			const topCounts = colorByLayer.get(topLayer) ?? new Map();
			let topColor = theme.text;
			let bestCount = 0;
			for (const [color, count] of topCounts) {
				if (count > bestCount) {
					bestCount = count;
					topColor = color;
				}
			}

			const char = String.fromCodePoint(BRAILLE_BASE + pattern);
			fb.frameBuffer.setCell(col, row, char, RGBA.fromHex(topColor), bgColor);
		}
	}
}

export function drawLineAreaChart(
	fb: FrameBufferRenderable,
	series: ReadonlyArray<LineAreaChartSeriesStyle>,
	charWidth: number,
	charHeight: number,
	palette: LineAreaChartPalette,
	area: boolean,
): void {
	if (series.length === 0 || charWidth <= 0 || charHeight <= 0) return;

	const allValues = series.flatMap((entry) => entry.values);
	if (allValues.length === 0) return;

	const min = Math.min(...allValues);
	const max = Math.max(...allValues);
	const dotWidth = Math.max(2, charWidth * 2);
	const dotHeight = Math.max(4, charHeight * 4);
	const chartBottom = dotHeight - 1;
	const buf = createPixelBuffer(dotWidth, dotHeight);
	const gridLines = computeGridLines(min, max, 0, chartBottom, 3);

	drawGridLines(buf, gridLines.map((line) => line.y), palette.gridColor);

	if (area) {
		for (const entry of series) {
			if (entry.values.length === 0) continue;
			drawAreaFill(
				buf,
				entry.values,
				0,
				chartBottom,
				entry.lineColor,
				palette.bgColor,
				min,
				max,
			);
		}
		for (const entry of series) {
			if (entry.values.length === 0) continue;
			drawLineSeries(buf, entry.values, 0, chartBottom, entry.lineColor, min, max);
		}
	} else {
		for (const entry of series) {
			if (entry.values.length === 0) continue;
			drawLineSeries(buf, entry.values, 0, chartBottom, entry.lineColor, min, max);
		}
	}

	renderPixelBufferToFrameBuffer(
		fb,
		buf,
		charWidth,
		charHeight,
		RGBA.fromHex(palette.bgColor),
	);
}
