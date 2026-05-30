import { Console, Effect } from "effect";
import { Argument, Command } from "effect/unstable/cli";
import { FastStatsApi } from "../../../api-client.ts";

export const makeNetworkRemoveCommand = (slug: string) =>
	Command.make(
		"remove",
		{
			ruleId: Argument.string("rule-id").pipe(
				Argument.withDescription("Network rule ID"),
			),
		},
		Effect.fnUntraced(function* ({ ruleId }) {
			const api = yield* FastStatsApi;
			yield* api.NetworkRulesDeleteNetworkRule(slug, ruleId, undefined);
			yield* Console.log(`Removed network rule ${ruleId}`);
		}),
	).pipe(Command.withDescription("Remove an IP network rule"));
