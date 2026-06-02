import { RGBA } from "@opentui/core";
import { FrameBufferView } from "./chart-shared.tsx";
import { drawPieChart, type PieSlice } from "./pie-chart-renderer.ts";
import { theme } from "./theme.ts";

export interface PieChartViewProps {
	readonly slices: ReadonlyArray<PieSlice>;
	readonly innerWidth: number;
	readonly innerHeight: number;
}

const PIE_BG = RGBA.fromHex(theme.surface);

export function PieChartView(props: PieChartViewProps) {
	return (
		<FrameBufferView
			innerWidth={props.innerWidth}
			innerHeight={props.innerHeight}
			draw={(frameBuffer, width, height) => {
				drawPieChart(frameBuffer, props.slices, width, height, PIE_BG);
			}}
		/>
	);
}
