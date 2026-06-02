import { TextAttributes } from "@opentui/core";
import { createMemo, Show } from "solid-js";
import {
	type ChartData,
	type ChartQueryConfig,
	formatWidgetTrend,
	formatWidgetValue,
	resolveWidgetMetric,
} from "../data/chart-data.ts";
import { theme } from "./theme.ts";

export interface WidgetChartProps {
	readonly data: ChartData | null;
	readonly queryConfig: ChartQueryConfig | null;
	readonly accent: string;
	readonly innerWidth: number;
	readonly innerHeight: number;
}

export function WidgetChart(props: WidgetChartProps) {
	const valueFormat = () =>
		props.queryConfig?.visualOptions?.widget?.valueFormat ?? "number";
	const showTrend = () =>
		props.queryConfig?.visualOptions?.widget?.showTrend !== false;

	const metric = createMemo(() => resolveWidgetMetric(props.data));

	const valueText = createMemo(() =>
		formatWidgetValue(metric()?.value, valueFormat()),
	);

	const trendInfo = createMemo(() => {
		const trend = metric()?.trend ?? 0;
		return formatWidgetTrend(Number(trend));
	});

	const compact = () =>
		props.queryConfig?.visualOptions?.widget?.displayMode === "compact";
	const showTrendRow = () =>
		showTrend() && !compact() && props.innerHeight >= 3;

	return (
		<box
			flexDirection="column"
			width="100%"
			height="100%"
			minHeight={0}
			justifyContent="center"
		>
			<text fg={props.accent} attributes={TextAttributes.BOLD} flexShrink={1}>
				{valueText()}
			</text>
			<Show when={showTrendRow()}>
				<box
					flexDirection="row"
					height={1}
					flexShrink={0}
					marginTop={1}
					alignItems="center"
				>
					<text fg={trendInfo().color} flexShrink={0}>
						{trendInfo().arrow} {trendInfo().text}
					</text>
					<text fg={theme.textMuted} flexShrink={1}>
						{"  vs 24h"}
					</text>
				</box>
			</Show>
		</box>
	);
}
