import { FrameBufferView } from "./chart-shared.tsx";
import {
	drawLineAreaChart,
	type LineAreaChartSeriesStyle,
	resolveLineAreaChartPalette,
} from "./utils/line-area-chart-renderer.ts";

export interface LineAreaChartViewProps {
	readonly series: ReadonlyArray<LineAreaChartSeriesStyle>;
	readonly innerWidth: number;
	readonly innerHeight: number;
	readonly area: boolean;
	readonly bounds?: {
		readonly min: number;
		readonly max: number;
		readonly step: number;
	};
}

const LINE_AREA_CHART_PALETTE = resolveLineAreaChartPalette();

export function LineAreaChartView(props: LineAreaChartViewProps) {
	return (
		<FrameBufferView
			innerWidth={props.innerWidth}
			innerHeight={props.innerHeight}
			draw={(frameBuffer, width, height) => {
				if (props.series.length === 0) return;
				drawLineAreaChart(
					frameBuffer,
					props.series,
					width,
					height,
					LINE_AREA_CHART_PALETTE,
					props.area,
					props.bounds,
				);
			}}
		/>
	);
}
