import { type FrameBufferRenderable, RGBA } from "@opentui/core";
import { BRAILLE_BASE, BRAILLE_DOT_BITS } from "./braille.ts";
import { theme } from "./theme.ts";

const LAYER_GRID = 0;
const LAYER_FILL = 1;
const LAYER_DATA = 2;
const LAYER_EMPTY = -1;
const AREA_FILL_ALPHA = 0.18;

interface PixelBuffer {
	readonly width: number;
	readonly height: number;
	readonly color: (string | null)[];
	readonly layer: Int8Array;
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

let pooledBuffer: PixelBuffer | null = null;

function getPixelBuffer(width: number, height: number): PixelBuffer {
	if (
		pooledBuffer &&
		pooledBuffer.width === width &&
		pooledBuffer.height === height
	) {
		pooledBuffer.color.fill(null);
		pooledBuffer.layer.fill(LAYER_EMPTY);
		return pooledBuffer;
	}
	const size = width * height;
	pooledBuffer = {
		width,
		height,
		color: new Array<string | null>(size).fill(null),
		layer: new Int8Array(size).fill(LAYER_EMPTY),
	};
	return pooledBuffer;
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
	const idx = py * buf.width + px;
	const existing = buf.layer[idx] ?? LAYER_EMPTY;
	if (existing < 0 || layer >= existing) {
		buf.color[idx] = color;
		buf.layer[idx] = layer;
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
	const dx = Math.abs(endX - x);
	const dy = Math.abs(endY - y);
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
		const idx = y * buf.width + px;
		if ((buf.layer[idx] ?? LAYER_EMPTY) >= LAYER_DATA) continue;
		buf.color[idx] = color;
		buf.layer[idx] = LAYER_FILL;
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
	if (values.length === 1) return values[0] ?? 0;
	const t = x / Math.max(width - 1, 1);
	const index = t * (values.length - 1);
	const left = Math.floor(index);
	const right = Math.min(left + 1, values.length - 1);
	const frac = index - left;
	return (values[left] ?? 0) * (1 - frac) + (values[right] ?? 0) * frac;
}

function drawGridLines(
	buf: PixelBuffer,
	chartBottom: number,
	color: string,
	min: number,
	max: number,
	step: number,
): void {
	const values: number[] = [];
	if (step > 0 && Number.isFinite(step)) {
		for (let value = min; value <= max + step * 0.5; value += step) {
			values.push(value);
		}
	} else {
		for (let index = 0; index <= 3; index++) {
			values.push(min + (index / 3) * (max - min));
		}
	}

	for (const value of values) {
		const y = valueToY(value, min, max, 0, chartBottom);
		if (y < 0 || y >= buf.height) continue;
		const rowBase = y * buf.width;
		for (let x = 0; x < buf.width; x++) {
			if ((buf.layer[rowBase + x] ?? LAYER_EMPTY) < 0) {
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
		const value = values[index];
		if (value === undefined) continue;
		const x = pointX(index, values.length, buf.width);
		const y = valueToY(value, min, max, chartTop, chartBottom);
		if (index < values.length - 1) {
			const nextValue = values[index + 1];
			if (nextValue === undefined) continue;
			const nextX = pointX(index + 1, values.length, buf.width);
			const nextY = valueToY(nextValue, min, max, chartTop, chartBottom);
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
					const idx = py * buf.width + px;
					const pixelLayer = buf.layer[idx] ?? LAYER_EMPTY;
					if (pixelLayer < 0) continue;
					if (pixelLayer < topLayer) continue;
					if (pixelLayer > topLayer) {
						topLayer = pixelLayer;
						pattern = 0;
					}
					pattern |= BRAILLE_DOT_BITS[dy]?.[dx] ?? 0;
					color = buf.color[idx] ?? color;
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
	bounds?: {
		readonly min: number;
		readonly max: number;
		readonly step: number;
	},
): void {
	if (series.length === 0 || charWidth <= 0 || charHeight <= 0) return;

	const allValues = series.flatMap((entry) => entry.values);
	if (allValues.length === 0) return;

	const min = bounds ? bounds.min : Math.min(...allValues);
	const max = bounds ? bounds.max : Math.max(...allValues);
	const step = bounds ? bounds.step : 0;
	const dotWidth = Math.max(2, charWidth * 2);
	const dotHeight = Math.max(4, charHeight * 4);
	const chartBottom = dotHeight - 1;
	const buf = getPixelBuffer(dotWidth, dotHeight);

	drawGridLines(buf, chartBottom, palette.gridColor, min, max, step);

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
			drawLineSeries(
				buf,
				entry.values,
				0,
				chartBottom,
				entry.lineColor,
				min,
				max,
			);
		}
	} else {
		for (const entry of series) {
			if (entry.values.length === 0) continue;
			drawLineSeries(
				buf,
				entry.values,
				0,
				chartBottom,
				entry.lineColor,
				min,
				max,
			);
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
