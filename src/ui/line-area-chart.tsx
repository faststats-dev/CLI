import { type BoxRenderable, FrameBufferRenderable } from "@opentui/core";
import { useRenderer } from "@opentui/solid";
import { createEffect, createMemo, createSignal, onCleanup } from "solid-js";
import {
	drawLineAreaChart,
	resolveLineAreaChartPalette,
	type LineAreaChartSeriesStyle,
} from "./line-area-chart-renderer.ts";

export interface LineAreaChartViewProps {
	readonly series: ReadonlyArray<LineAreaChartSeriesStyle>;
	readonly innerWidth: number;
	readonly innerHeight: number;
	readonly area: boolean;
}

export function LineAreaChartView(props: LineAreaChartViewProps) {
	const renderer = useRenderer();

	const charWidth = createMemo(() =>
		Math.max(1, Math.floor(props.innerWidth)),
	);
	const charHeight = createMemo(() =>
		Math.max(1, Math.floor(props.innerHeight)),
	);
	const palette = createMemo(() => resolveLineAreaChartPalette());

	const [parentBox, setParentBox] = createSignal<BoxRenderable | undefined>();
	let frameBuffer: FrameBufferRenderable | undefined;

	createEffect(() => {
		const parent = parentBox();
		const w = charWidth();
		const h = charHeight();
		const series = props.series;
		const chartPalette = palette();
		if (!parent || w <= 0 || h <= 0 || series.length === 0) return;

		const sizeChanged =
			frameBuffer !== undefined &&
			(frameBuffer.width !== w || frameBuffer.height !== h);

		if (frameBuffer && sizeChanged) {
			parent.remove(frameBuffer.id);
			frameBuffer.destroy();
			frameBuffer = undefined;
		}

		if (!frameBuffer) {
			frameBuffer = new FrameBufferRenderable(renderer, {
				width: w,
				height: h,
			});
			parent.add(frameBuffer);
		}

		drawLineAreaChart(frameBuffer, series, w, h, chartPalette, props.area);
		frameBuffer.requestRender();
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
