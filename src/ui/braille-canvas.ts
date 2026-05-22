import { type FrameBufferRenderable, RGBA } from "@opentui/core";

const BRAILLE_BASE = 0x2800;
const BRAILLE_DOT_BITS: ReadonlyArray<ReadonlyArray<number>> = [
	[0x01, 0x08],
	[0x02, 0x10],
	[0x04, 0x20],
	[0x40, 0x80],
];

export interface BrailleCanvas {
	readonly pxW: number;
	readonly pxH: number;
	readonly charW: number;
	readonly charH: number;
	readonly pixels: RGBA[];
}

export function createBrailleCanvas(charW: number, charH: number): BrailleCanvas {
	const pxW = Math.max(2, charW * 2);
	const pxH = Math.max(4, charH * 4);
	return {
		pxW,
		pxH,
		charW,
		charH,
		pixels: Array.from({ length: pxW * pxH }, () => RGBA.fromInts(0, 0, 0, 0)),
	};
}

export function clearCanvas(canvas: BrailleCanvas, color: RGBA): void {
	for (let i = 0; i < canvas.pixels.length; i++) {
		canvas.pixels[i] = color;
	}
}

export function setPixel(canvas: BrailleCanvas, x: number, y: number, color: RGBA): void {
	if (x < 0 || y < 0 || x >= canvas.pxW || y >= canvas.pxH) return;
	canvas.pixels[y * canvas.pxW + x] = color;
}

export function drawLine(
	canvas: BrailleCanvas,
	x0: number,
	y0: number,
	x1: number,
	y1: number,
	color: RGBA,
): void {
	let x = Math.round(x0);
	let y = Math.round(y0);
	const tx = Math.round(x1);
	const ty = Math.round(y1);
	const dx = Math.abs(tx - x);
	const dy = Math.abs(ty - y);
	const sx = x < tx ? 1 : -1;
	const sy = y < ty ? 1 : -1;
	let err = dx - dy;

	while (true) {
		setPixel(canvas, x, y, color);
		if (x === tx && y === ty) break;
		const e2 = err * 2;
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

export function fillRect(
	canvas: BrailleCanvas,
	x: number,
	y: number,
	w: number,
	h: number,
	color: RGBA,
): void {
	const x0 = Math.max(0, Math.floor(x));
	const y0 = Math.max(0, Math.floor(y));
	const x1 = Math.min(canvas.pxW, Math.ceil(x + w));
	const y1 = Math.min(canvas.pxH, Math.ceil(y + h));
	for (let py = y0; py < y1; py++) {
		for (let px = x0; px < x1; px++) {
			setPixel(canvas, px, py, color);
		}
	}
}

export function fillColumn(
	canvas: BrailleCanvas,
	x: number,
	yTop: number,
	yBottom: number,
	color: RGBA,
): void {
	const top = Math.max(0, Math.min(yTop, yBottom));
	const bottom = Math.min(canvas.pxH - 1, Math.max(yTop, yBottom));
	for (let y = top; y <= bottom; y++) {
		setPixel(canvas, x, y, color);
	}
}

export function drawBrailleCanvas(
	fb: FrameBufferRenderable,
	canvas: BrailleCanvas,
	bg: RGBA,
): void {
	fb.frameBuffer.fillRect(0, 0, canvas.charW, canvas.charH, bg);

	for (let cy = 0; cy < canvas.charH; cy++) {
		for (let cx = 0; cx < canvas.charW; cx++) {
			let dots = 0;
			let fg: RGBA | undefined;
			for (let sy = 0; sy < 4; sy++) {
				const py = cy * 4 + sy;
				if (py >= canvas.pxH) continue;
				const rowBase = py * canvas.pxW;
				const bitRow = BRAILLE_DOT_BITS[sy]!;
				for (let sx = 0; sx < 2; sx++) {
					const px = cx * 2 + sx;
					if (px >= canvas.pxW) continue;
					const color = canvas.pixels[rowBase + px];
					if (!color || color.a === 0) continue;
					dots |= bitRow[sx]!;
					fg = color;
				}
			}
			if (dots === 0) continue;
			const char = String.fromCodePoint(BRAILLE_BASE + dots);
			fb.frameBuffer.setCell(cx, cy, char, fg ?? bg, bg);
		}
	}
}

export function blendHex(fg: string, bg: string, ratio: number): string {
	const parse = (hex: string) => {
		const h = hex.replace("#", "");
		return [
			Number.parseInt(h.slice(0, 2), 16),
			Number.parseInt(h.slice(2, 4), 16),
			Number.parseInt(h.slice(4, 6), 16),
		] as const;
	};
	const [fr, fgG, fb] = parse(fg);
	const [br, bgG, bb] = parse(bg);
	const mix = (a: number, b: number) => Math.round(a * ratio + b * (1 - ratio));
	const toHex = (n: number) => n.toString(16).padStart(2, "0");
	return `#${toHex(mix(fr, br))}${toHex(mix(fgG, bgG))}${toHex(mix(fb, bb))}`;
}
