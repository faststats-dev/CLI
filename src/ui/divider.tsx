import { theme } from "./theme.ts";

export function Divider(props?: {
	color?: string;
	marginTop?: number;
	marginBottom?: number;
}) {
	return (
		<box
			height={1}
			flexShrink={0}
			border={["top"]}
			borderStyle="single"
			borderColor={props?.color ?? theme.border}
			marginTop={props?.marginTop ?? 0}
			marginBottom={props?.marginBottom ?? 0}
		/>
	);
}
