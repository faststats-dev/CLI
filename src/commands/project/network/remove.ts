import { Console, Effect } from "effect";
import { Argument, Command } from "effect/unstable/cli";
import { FastStatsApi } from "../../../api-client.ts";

export const networkRemoveCommand = Command.make(
	"remove",
	{
		slug: Argument.string("slug").pipe(
			Argument.withDescription("Project slug"),
		),
		ruleId: Argument.string("rule-id").pipe(
			Argument.withDescription("Network rule ID"),
		),
	},
	Effect.fnUntraced(function* ({ slug, ruleId }) {
		const api = yield* FastStatsApi;
		yield* api.NetworkRulesDeleteNetworkRule(slug, ruleId, undefined);
		yield* Console.log(`Removed network rule ${ruleId}`);
	}),
).pipe(Command.withDescription("Remove an IP network rule"));
