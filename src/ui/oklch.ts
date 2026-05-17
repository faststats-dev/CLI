function oklchToLinearRgb(
	l: number,
	c: number,
	h: number,
): [number, number, number] {
	const hRad = (h * Math.PI) / 180;
	const a = c * Math.cos(hRad);
	const b = c * Math.sin(hRad);

	const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
	const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
	const s_ = l - 0.0894841775 * a - 1.291485548 * b;

	const lc = l_ * l_ * l_;
	const mc = m_ * m_ * m_;
	const sc = s_ * s_ * s_;

	return [
		+4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc,
		-1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc,
		-0.0041960863 * lc - 0.7034186147 * mc + 1.707614701 * sc,
	];
}

function linearToSrgb(value: number): number {
	const clamped = Math.max(0, Math.min(1, value));
	return clamped <= 0.0031308
		? 12.92 * clamped
		: 1.055 * clamped ** (1 / 2.4) - 0.055;
}

function toByte(channel: number): number {
	return Math.max(0, Math.min(255, Math.round(channel * 255)));
}

function byteToHex(channel: number): string {
	return channel.toString(16).padStart(2, "0");
}

function hexToBytes(hex: string): [number, number, number] {
	const cleaned = hex.replace("#", "");
	return [
		parseInt(cleaned.slice(0, 2), 16),
		parseInt(cleaned.slice(2, 4), 16),
		parseInt(cleaned.slice(4, 6), 16),
	];
}

export function oklch(l: number, c: number, h: number): string {
	const [r, g, b] = oklchToLinearRgb(l, c, h);
	return `#${byteToHex(toByte(linearToSrgb(r)))}${byteToHex(toByte(linearToSrgb(g)))}${byteToHex(toByte(linearToSrgb(b)))}`;
}

export function compositeOver(fg: string, bg: string, alpha: number): string {
	const [fr, fg_, fb] = hexToBytes(fg);
	const [br, bg_, bb] = hexToBytes(bg);
	const a = Math.max(0, Math.min(1, alpha));
	const inv = 1 - a;
	return `#${byteToHex(Math.round(fr * a + br * inv))}${byteToHex(Math.round(fg_ * a + bg_ * inv))}${byteToHex(Math.round(fb * a + bb * inv))}`;
}
