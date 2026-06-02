import { Console, Effect } from "effect";
import { Argument, Command } from "effect/unstable/cli";
import { FastStatsApi } from "../../../api-client.ts";

export const networkListCommand = Command.make(
	"list",
	{
		slug: Argument.string("slug").pipe(
			Argument.withDescription("Project slug"),
		),
	},
	Effect.fnUntraced(function* ({ slug }) {
		const api = yield* FastStatsApi;
		const rules = yield* api.NetworkRulesListNetworkRules(slug, undefined);

		if (rules.length === 0) {
			yield* Console.log("No network rules configured.");
			return;
		}

		yield* Console.table(
			rules.map((rule) => ({
				ID: rule.id,
				IP: rule.ipAddress,
				ACTION: rule.allowed ? "allow" : "deny",
			})),
		);
	}),
).pipe(Command.withDescription("List IP network rules"));
