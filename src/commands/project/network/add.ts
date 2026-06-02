import { Console, Effect } from "effect";
import { Argument, Command, Flag } from "effect/unstable/cli";
import { FastStatsApi } from "../../../api-client.ts";

export const networkAddCommand = Command.make(
	"add",
	{
		slug: Argument.string("slug").pipe(
			Argument.withDescription("Project slug"),
		),
		ip: Flag.string("ip").pipe(Flag.withDescription("IP address or CIDR")),
		allow: Flag.boolean("allow").pipe(
			Flag.withDescription("Allow traffic from this IP"),
		),
		deny: Flag.boolean("deny").pipe(
			Flag.withDescription("Deny traffic from this IP"),
		),
	},
	Effect.fnUntraced(function* ({ slug, ip, allow, deny }) {
		if (allow === deny) {
			return yield* Effect.fail(
				new Error("Specify exactly one of --allow or --deny"),
			);
		}

		const api = yield* FastStatsApi;
		const rule = yield* api.NetworkRulesCreateNetworkRule(slug, {
			payload: {
				ipAddress: ip,
				allowed: allow,
			},
		});

		const action = rule.allowed ? "allow" : "deny";
		yield* Console.log(
			`Added ${action} rule for ${rule.ipAddress} (${rule.id})`,
		);
	}),
).pipe(Command.withDescription("Add an IP network rule"));
