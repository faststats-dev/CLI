import { For } from "solid-js";
import { theme } from "./utils/theme.ts";

export function formatAxisValue(value: number): string {
	if (!Number.isFinite(value)) return "";
	if (value === 0) return "0";

	const abs = Math.abs(value);
	if (abs >= 1_000_000) {
		return `${(value / 1_000_000).toFixed(abs >= 10_000_000 ? 0 : 1)}M`;
	}
	if (abs >= 1_000) {
		return `${(value / 1_000).toFixed(abs >= 10_000 ? 0 : 1)}k`;
	}
	if (Number.isInteger(value)) return String(value);
	return value.toFixed(abs < 10 ? 1 : 0);
}

export interface AxisBounds {
	readonly min: number;
	readonly max: number;
	readonly step: number;
}

function niceNum(range: number, round: boolean): number {
	if (range <= 0) return 1;
	const exponent = Math.floor(Math.log10(range));
	const fraction = range / 10 ** exponent;
	let niceFraction: number;
	if (round) {
		if (fraction < 1.5) niceFraction = 1;
		else if (fraction < 3) niceFraction = 2;
		else if (fraction < 7) niceFraction = 5;
		else niceFraction = 10;
	} else if (fraction <= 1) niceFraction = 1;
	else if (fraction <= 2) niceFraction = 2;
	else if (fraction <= 5) niceFraction = 5;
	else niceFraction = 10;
	return niceFraction * 10 ** exponent;
}

export function computeNiceBounds(
	min: number,
	max: number,
	tickCount = 4,
): AxisBounds {
	if (!Number.isFinite(min) || !Number.isFinite(max)) {
		return { min: 0, max: 1, step: 1 };
	}
	if (min === max) {
		if (min === 0) return { min: 0, max: 1, step: 1 };
		const step = niceNum(Math.abs(min), true);
		return min > 0
			? { min: 0, max: Math.ceil(min / step) * step || step, step }
			: { min: Math.floor(min / step) * step, max: 0, step };
	}

	const range = niceNum(max - min, false);
	const step = niceNum(range / Math.max(1, tickCount - 1), true);
	return {
		min: Math.floor(min / step) * step,
		max: Math.ceil(max / step) * step,
		step,
	};
}

export function buildBoundsTicks(bounds: AxisBounds, rows: number): string[] {
	const ticks = Array.from({ length: Math.max(0, rows) }, () => "");
	if (rows <= 0) return ticks;

	const span = bounds.max - bounds.min || 1;
	if (bounds.step > 0) {
		for (
			let value = bounds.min;
			value <= bounds.max + bounds.step * 0.5;
			value += bounds.step
		) {
			const row = Math.round((1 - (value - bounds.min) / span) * (rows - 1));
			if (row >= 0 && row < rows && ticks[row] === "") {
				ticks[row] = formatAxisValue(value);
			}
		}
	}
	if (ticks[0] === "") ticks[0] = formatAxisValue(bounds.max);
	if (ticks[rows - 1] === "") ticks[rows - 1] = formatAxisValue(bounds.min);
	return ticks;
}

export function axisGutterWidth(ticks: ReadonlyArray<string>): number {
	return ticks.reduce((width, tick) => Math.max(width, tick.length), 0);
}

export function YAxis(props: {
	readonly ticks: ReadonlyArray<string>;
	readonly width: number;
}) {
	return (
		<box
			flexDirection="column"
			width={props.width}
			flexShrink={0}
			marginRight={1}
		>
			<For each={props.ticks}>
				{(tick) => (
					<box height={1} width="100%" flexShrink={0} justifyContent="flex-end">
						<text fg={theme.textMuted} flexShrink={0}>
							{tick}
						</text>
					</box>
				)}
			</For>
		</box>
	);
}
