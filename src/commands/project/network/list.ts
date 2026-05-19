import { Console, Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { FastStatsApi } from "../../../api-client.ts";

export const makeNetworkListCommand = (slug: string) =>
	Command.make("list", {}, () =>
		Effect.gen(function* () {
			const api = yield* FastStatsApi;
			const rules = yield* api.NetworkRulesListNetworkRules(slug, undefined);

			if (rules.length === 0) {
				yield* Console.log("No network rules configured.");
				return;
			}

			yield* Console.log("ID\tIP\t\tACTION");
			for (const rule of rules) {
				const action = rule.allowed ? "allow" : "deny";
				yield* Console.log(`${rule.id}\t${rule.ipAddress}\t${action}`);
			}
		}),
	).pipe(Command.withDescription("List IP network rules"));
