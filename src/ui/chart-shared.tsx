import { type BoxRenderable, FrameBufferRenderable } from "@opentui/core";
import { useRenderer } from "@opentui/solid";
import { createEffect, createMemo, createSignal, onCleanup } from "solid-js";
import type {
	ChartData,
	ChartFlowMetaLite,
	ChartQueryConfig,
} from "../data/chart-data.ts";
import { theme } from "./theme.ts";

export interface SeriesChartProps {
	readonly data: ChartData | null;
	readonly queryConfig: ChartQueryConfig | null;
	readonly flowMeta?: ChartFlowMetaLite | null;
	readonly chartName?: string | null;
	readonly accent: string;
	readonly innerWidth: number;
	readonly innerHeight: number;
}

export function ChartEmptyState(props: { readonly message?: string }) {
	return (
		<box
			flexDirection="column"
			width="100%"
			height="100%"
			justifyContent="center"
			alignItems="center"
		>
			<text fg={theme.textMuted}>{props.message ?? "No data"}</text>
		</box>
	);
}

export function FrameBufferView(props: {
	readonly innerWidth: number;
	readonly innerHeight: number;
	readonly draw: (
		frameBuffer: FrameBufferRenderable,
		width: number,
		height: number,
	) => void;
}) {
	const renderer = useRenderer();
	const width = createMemo(() => Math.max(1, Math.floor(props.innerWidth)));
	const height = createMemo(() => Math.max(1, Math.floor(props.innerHeight)));
	const [parentBox, setParentBox] = createSignal<BoxRenderable | undefined>();
	const [frameBufferVersion, setFrameBufferVersion] = createSignal(0);
	let frameBuffer: FrameBufferRenderable | undefined;

	createEffect(() => {
		const parent = parentBox();
		const w = width();
		const h = height();
		if (!parent) return;

		if (frameBuffer && (frameBuffer.width !== w || frameBuffer.height !== h)) {
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
			setFrameBufferVersion((version) => version + 1);
		}
	});

	createEffect(() => {
		frameBufferVersion();
		const fb = frameBuffer;
		if (!fb) return;
		props.draw(fb, fb.width, fb.height);
		fb.requestRender();
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
