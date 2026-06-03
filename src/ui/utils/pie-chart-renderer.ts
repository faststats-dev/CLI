import { type FrameBufferRenderable, RGBA } from "@opentui/core";
import { BRAILLE_BASE, BRAILLE_DOT_BITS } from "./braille.ts";
import { theme } from "./theme.ts";

const TAU = Math.PI * 2;

export interface PieSlice {
	readonly color: string;
	readonly value: number;
}

export function drawPieChart(
	fb: FrameBufferRenderable,
	slices: ReadonlyArray<PieSlice>,
	charWidth: number,
	charHeight: number,
	bgColor: RGBA,
): void {
	fb.frameBuffer.fillRect(0, 0, charWidth, charHeight, bgColor);
	if (charWidth <= 0 || charHeight <= 0 || slices.length === 0) return;

	const pxWidth = Math.max(2, charWidth * 2);
	const pxHeight = Math.max(4, charHeight * 4);
	const colors = new Array<string | null>(pxWidth * pxHeight).fill(null);

	const centerX = (pxWidth - 1) / 2;
	const centerY = (pxHeight - 1) / 2;
	const radius = Math.min(pxWidth, pxHeight) / 2 - 0.5;

	const total = slices.reduce(
		(sum, slice) => sum + Math.max(0, slice.value),
		0,
	);
	if (total <= 0 || radius <= 0) return;

	const boundaries: Array<{ readonly end: number; readonly color: string }> =
		[];
	let cumulative = 0;
	for (const slice of slices) {
		cumulative += Math.max(0, slice.value) / total;
		boundaries.push({ end: cumulative * TAU, color: slice.color });
	}
	const lastColor = slices[slices.length - 1]?.color ?? theme.textMuted;

	for (let py = 0; py < pxHeight; py++) {
		for (let px = 0; px < pxWidth; px++) {
			const dx = px - centerX;
			const dy = py - centerY;
			if (Math.hypot(dx, dy) > radius) continue;

			let angle = Math.atan2(dx, -dy);
			if (angle < 0) angle += TAU;

			let color = lastColor;
			for (const boundary of boundaries) {
				if (angle <= boundary.end) {
					color = boundary.color;
					break;
				}
			}
			colors[py * pxWidth + px] = color;
		}
	}

	for (let row = 0; row < charHeight; row++) {
		for (let col = 0; col < charWidth; col++) {
			let pattern = 0;
			let color: string | null = null;
			for (let dy = 0; dy < 4; dy++) {
				for (let dx = 0; dx < 2; dx++) {
					const px = col * 2 + dx;
					const py = row * 4 + dy;
					if (px >= pxWidth || py >= pxHeight) continue;
					const cell = colors[py * pxWidth + px];
					if (!cell) continue;
					pattern |= BRAILLE_DOT_BITS[dy]?.[dx] ?? 0;
					color = cell;
				}
			}
			if (pattern === 0 || !color) continue;
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
