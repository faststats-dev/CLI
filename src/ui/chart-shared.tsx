import type { ChartData, ChartQueryConfigLite } from "../data/chart-data.ts";
import { theme } from "./theme.ts";

export interface SeriesChartProps {
	readonly data: ChartData | null;
	readonly queryConfig: ChartQueryConfigLite | null;
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
