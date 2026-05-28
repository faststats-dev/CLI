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

function mixHex(from: string, to: string, amount: number): string {
	const parse = (hex: string) => {
		const h = hex.replace("#", "");
		return [
			Number.parseInt(h.slice(0, 2), 16),
			Number.parseInt(h.slice(2, 4), 16),
			Number.parseInt(h.slice(4, 6), 16),
		] as const;
	};
	const [fr, fg, fb] = parse(from);
	const [tr, tg, tb] = parse(to);
	const channel = (left: number, right: number) =>
		Math.round(left + (right - left) * amount)
			.toString(16)
			.padStart(2, "0");
	return `#${channel(fr, tr)}${channel(fg, tg)}${channel(fb, tb)}`;
}

export function resolveLineAreaSeriesStyle(lineColor: string): {
	readonly lineColor: string;
	readonly fillColor: string;
} {
	return {
		lineColor,
		fillColor: mixHex(theme.surface, lineColor, AREA_FILL_ALPHA),
	};
}

export function resolveLineAreaChartPalette(): LineAreaChartPalette {
	return {
		gridColor: mixHex(theme.surface, theme.border, 0.55),
		bgColor: theme.surface,
	};
}

function createPixelBuffer(width: number, height: number): PixelBuffer {
	return {
		width,
		height,
		pixels: Array.from({ length: height }, () =>
			Array.from({ length: width }, () => null),
		),
	};
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
	let x = Math.round(x0);
	let y = Math.round(y0);
	const endX = Math.round(x1);
	const endY = Math.round(y1);
	let dx = Math.abs(endX - x);
	let dy = Math.abs(endY - y);
	const sx = x < endX ? 1 : -1;
	const sy = y < endY ? 1 : -1;
	let err = dx - dy;

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

function fillColumn(
	buf: PixelBuffer,
	x: number,
	yTop: number,
	yBottom: number,
	color: string,
): void {
	const px = Math.round(x);
	if (px < 0 || px >= buf.width) return;
	const start = Math.min(Math.round(yTop), Math.round(yBottom));
	const end = Math.max(Math.round(yTop), Math.round(yBottom));

	for (let y = start; y <= end; y++) {
		if (y < 0 || y >= buf.height) continue;
		const row = buf.pixels[y];
		if (!row) continue;
		const existing = row[px];
		if (existing && existing.layer >= LAYER_DATA) continue;
		row[px] = { color, layer: LAYER_FILL };
	}
}

function valueToY(
	value: number,
	min: number,
	max: number,
	top: number,
	bottom: number,
): number {
	const range = max - min || 1;
	return Math.round(top + (1 - (value - min) / range) * (bottom - top));
}

function pointX(index: number, count: number, width: number): number {
	if (count <= 1) return Math.floor((width - 1) / 2);
	return Math.round((index / (count - 1)) * (width - 1));
}

function sampleValueAtX(
	values: ReadonlyArray<number>,
	x: number,
	width: number,
): number {
	if (values.length === 1) return values[0]!;
	const t = x / Math.max(width - 1, 1);
	const index = t * (values.length - 1);
	const left = Math.floor(index);
	const right = Math.min(left + 1, values.length - 1);
	const frac = index - left;
	return values[left]! * (1 - frac) + values[right]! * frac;
}

function drawGridLines(
	buf: PixelBuffer,
	chartBottom: number,
	color: string,
	lines: number,
): void {
	for (let index = 0; index <= lines; index++) {
		const y = Math.round((index / lines) * chartBottom);
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
		const x = pointX(index, values.length, buf.width);
		const y = valueToY(values[index]!, min, max, chartTop, chartBottom);
		if (index < values.length - 1) {
			const nextX = pointX(index + 1, values.length, buf.width);
			const nextY = valueToY(
				values[index + 1]!,
				min,
				max,
				chartTop,
				chartBottom,
			);
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
	min: number,
	max: number,
): void {
	for (let x = 0; x < buf.width; x++) {
		const y = valueToY(
			sampleValueAtX(values, x, buf.width),
			min,
			max,
			chartTop,
			chartBottom,
		);
		fillColumn(buf, x, y + 1, chartBottom, fillColor);
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
			let pattern = 0;
			let color: string = theme.text;

			for (let dy = 0; dy < 4; dy++) {
				for (let dx = 0; dx < 2; dx++) {
					const px = col * 2 + dx;
					const py = row * 4 + dy;
					if (px >= buf.width || py >= buf.height) continue;
					const pixel = buf.pixels[py]?.[px];
					if (!pixel) continue;
					if (pixel.layer < topLayer) continue;
					if (pixel.layer > topLayer) {
						topLayer = pixel.layer;
						pattern = 0;
					}
					pattern |= BRAILLE_DOT_BITS[dy]![dx]!;
					color = pixel.color;
				}
			}

			if (pattern === 0) continue;
			fb.frameBuffer.setCell(
				col,
				row,
				String.fromCodePoint(BRAILLE_BASE + pattern),
				RGBA.fromHex(color),
				bgColor,
			);
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

	drawGridLines(buf, chartBottom, palette.gridColor, 3);

	if (area) {
		for (const entry of series) {
			if (entry.values.length === 0) continue;
			drawAreaFill(
				buf,
				entry.values,
				0,
				chartBottom,
				entry.fillColor,
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
