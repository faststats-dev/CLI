import type { MouseEvent, ScrollBoxRenderable } from "@opentui/core";
import { createMemo, For, Show } from "solid-js";
import {
	formatWidgetValue,
	parseSeriesEntries,
	resolveListTabIndex,
	resolveMetricKey,
	resolveSeriesRows,
	truncateLabel,
} from "../data/chart-data.ts";
import { ChartEmptyState, type SeriesChartProps } from "./chart-shared.tsx";
import { theme } from "./theme.ts";

export function ListChart(props: SeriesChartProps) {
	const entries = createMemo(() =>
		parseSeriesEntries(
			resolveSeriesRows(props.data, resolveListTabIndex(props.queryConfig)),
			resolveMetricKey(props.queryConfig),
		),
	);
	const showHeader = createMemo(() => props.innerHeight >= 3);
	const maxValue = createMemo(() => {
		const items = entries();
		if (items.length === 0) return 0;
		return Math.max(...items.map((item) => item.value));
	});
	const valueWidth = createMemo(() => {
		const widths = entries().map(
			(entry) => formatWidgetValue(entry.value).length,
		);
		return Math.max(5, ...widths);
	});
	const metricLabel = () => resolveMetricKey(props.queryConfig) ?? "Value";

	let scrollBox: ScrollBoxRenderable | undefined;
	const handleScroll = (event: MouseEvent) => {
		if (!scrollBox) return;
		if (scrollBox.scrollHeight > scrollBox.viewport.height) {
			event.stopPropagation();
		}
	};

	return (
		<Show
			when={entries().length > 0}
			fallback={<ChartEmptyState message="No items" />}
		>
			<box flexDirection="column" width="100%" height="100%" minHeight={0}>
				<Show when={showHeader()}>
					<box
						flexDirection="row"
						height={1}
						width="100%"
						flexShrink={0}
						backgroundColor={theme.muted}
					>
						<text fg={theme.textMuted} flexGrow={1} flexShrink={1}>
							{truncateLabel(
								"Name",
								Math.max(8, props.innerWidth - valueWidth() - 1),
							)}
						</text>
						<text fg={theme.textMuted} flexShrink={0}>
							{truncateLabel(metricLabel(), valueWidth())}
						</text>
					</box>
				</Show>
				<scrollbox
					ref={(el) => {
						scrollBox = el ?? undefined;
					}}
					onMouseScroll={handleScroll}
					flexGrow={1}
					flexShrink={1}
					minHeight={0}
					width="100%"
					scrollX={false}
					scrollY={true}
					viewportCulling={true}
					contentOptions={{
						width: "100%",
						height: entries().length,
					}}
					verticalScrollbarOptions={{
						trackOptions: {
							backgroundColor: theme.surface,
							foregroundColor: theme.borderStrong,
						},
					}}
				>
					<For each={entries()}>
						{(entry) => (
							<ListRow
								name={entry.name}
								value={entry.value}
								maxValue={maxValue()}
								innerWidth={props.innerWidth}
								valueWidth={valueWidth()}
							/>
						)}
					</For>
				</scrollbox>
			</box>
		</Show>
	);
}

function ListRow(props: {
	readonly name: string;
	readonly value: number;
	readonly maxValue: number;
	readonly innerWidth: number;
	readonly valueWidth: number;
}) {
	const fillWidth = createMemo(() => {
		if (props.maxValue <= 0) return 0;
		const ratio = props.value / props.maxValue;
		return Math.max(
			0,
			Math.min(props.innerWidth, Math.round(ratio * props.innerWidth)),
		);
	});
	const nameMax = createMemo(() =>
		Math.max(4, props.innerWidth - props.valueWidth - 1),
	);
	const segments = createMemo(() =>
		buildListRowSegments({
			name: props.name,
			value: props.value,
			fillWidth: fillWidth(),
			innerWidth: props.innerWidth,
			valueWidth: props.valueWidth,
			nameMax: nameMax(),
		}),
	);

	return (
		<box flexDirection="row" height={1} width={props.innerWidth} flexShrink={0}>
			<For each={segments()}>
				{(segment) => (
					<text fg={segment.fg} bg={segment.bg} flexShrink={0}>
						{segment.text}
					</text>
				)}
			</For>
		</box>
	);
}

interface ListRowSegment {
	readonly text: string;
	readonly fg?: string;
	readonly bg?: string;
}

function buildListRowSegments(options: {
	readonly name: string;
	readonly value: number;
	readonly fillWidth: number;
	readonly innerWidth: number;
	readonly valueWidth: number;
	readonly nameMax: number;
}): ReadonlyArray<ListRowSegment> {
	const chars = Array.from({ length: options.innerWidth }, () => " ");
	const fg: Array<string | undefined> = Array.from(
		{ length: options.innerWidth },
		() => undefined,
	);
	const bg: Array<string | undefined> = Array.from(
		{ length: options.innerWidth },
		() => undefined,
	);

	for (let index = 0; index < options.fillWidth; index++) {
		bg[index] = theme.muted;
	}

	const name = truncateLabel(options.name, options.nameMax);
	for (let index = 0; index < name.length; index++) {
		chars[index] = name[index] ?? " ";
		fg[index] = theme.text;
		if (index < options.fillWidth) {
			bg[index] = theme.muted;
		}
	}

	const valueText = formatWidgetValue(options.value).padStart(
		options.valueWidth,
	);
	const valueStart = options.innerWidth - options.valueWidth;
	for (let index = 0; index < valueText.length; index++) {
		const column = valueStart + index;
		if (column < 0 || column >= options.innerWidth) continue;
		chars[column] = valueText[index] ?? " ";
		fg[column] = theme.textMuted;
	}

	return compressListRowSegments(chars, fg, bg);
}

function compressListRowSegments(
	chars: ReadonlyArray<string>,
	fg: ReadonlyArray<string | undefined>,
	bg: ReadonlyArray<string | undefined>,
): ReadonlyArray<ListRowSegment> {
	if (chars.length === 0) return [];

	const segments: ListRowSegment[] = [];
	let text = chars[0] ?? "";
	let currentFg = fg[0];
	let currentBg = bg[0];

	for (let index = 1; index < chars.length; index++) {
		const nextFg = fg[index];
		const nextBg = bg[index];
		if (nextFg === currentFg && nextBg === currentBg) {
			text += chars[index];
			continue;
		}
		segments.push({
			text,
			...(currentFg ? { fg: currentFg } : {}),
			...(currentBg ? { bg: currentBg } : {}),
		});
		text = chars[index] ?? "";
		currentFg = nextFg;
		currentBg = nextBg;
	}

	segments.push({
		text,
		...(currentFg ? { fg: currentFg } : {}),
		...(currentBg ? { bg: currentBg } : {}),
	});

	return segments;
}
