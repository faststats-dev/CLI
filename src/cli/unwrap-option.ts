import { Option } from "effect";

export const unwrapOption = <A>(value: A | Option.Option<A>): A =>
	Option.isOption(value) ? Option.getOrThrow(value) : value;
