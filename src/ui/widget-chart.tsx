import { TextAttributes } from "@opentui/core";
import { createMemo, Show } from "solid-js";
import {
	type ChartData,
	type ChartQueryConfigLite,
	formatWidgetTrend,
	formatWidgetValue,
	resolveWidgetMetric,
	toFiniteNumber,
} from "../data/chart-data.ts";
import { theme } from "./theme.ts";

export interface WidgetChartProps {
	readonly data: ChartData | null;
	readonly queryConfig: ChartQueryConfigLite | null;
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
		const trend = toFiniteNumber(metric()?.trend) ?? 0;
		return formatWidgetTrend(trend);
	});

	const compact = () =>
		props.queryConfig?.visualOptions?.widget?.displayMode === "compact";
	const showFooter = () => showTrend() && !compact() && props.innerHeight >= 4;

	return (
		<box flexDirection="column" width="100%" height="100%" minHeight={0}>
			<box
				flexGrow={1}
				flexShrink={1}
				minHeight={0}
				justifyContent="center"
				alignItems="flex-start"
			>
				<text fg={props.accent} attributes={TextAttributes.BOLD} flexShrink={1}>
					{valueText()}
				</text>
			</box>
			<Show when={showFooter()}>
				<box
					flexDirection="row"
					height={1}
					flexShrink={0}
					justifyContent="space-between"
					width="100%"
				>
					<text fg={theme.textMuted}>24h</text>
					<text fg={trendInfo().color}>
						{trendInfo().prefix}
						{trendInfo().text}
					</text>
				</box>
			</Show>
		</box>
	);
}
