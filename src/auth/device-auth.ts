import { Console, Effect, Schema } from "effect";
import {
	HttpBody,
	HttpClientRequest,
	HttpClientResponse,
} from "effect/unstable/http";
import { HttpClient } from "effect/unstable/http/HttpClient";
import { apiUrl, saveAccessToken } from "../config.ts";

const CLIENT_ID = "faststats-cli";
const DEVICE_GRANT_TYPE =
	"urn:ietf:params:oauth:grant-type:device_code" as const;

const DeviceCodeResponse = Schema.Struct({
	device_code: Schema.String,
	user_code: Schema.String,
	verification_uri: Schema.String,
	verification_uri_complete: Schema.optional(Schema.String),
	interval: Schema.optional(Schema.Number),
});

const DeviceCodeResponseSchema = Schema.Struct({
	access_token: Schema.optional(Schema.String),
	error: Schema.optional(Schema.String),
	error_description: Schema.optional(Schema.String),
});

const openBrowser = (url: string) =>
	Effect.sync(() => {
		const command =
			process.platform === "darwin"
				? ["open", url]
				: process.platform === "win32"
					? ["cmd", "/c", "start", "", url]
					: ["xdg-open", url];

		try {
			Bun.spawn(command, { stdout: "ignore", stderr: "ignore" });
		} catch {
			// best-effort
		}
	});

const pollForToken = (deviceCode: string, interval: number) =>
	Effect.gen(function* () {
		const client = yield* HttpClient;
		const request = HttpClientRequest.post(`${apiUrl}/auth/device/token`, {
			body: yield* HttpBody.json({
				grant_type: DEVICE_GRANT_TYPE,
				device_code: deviceCode,
				client_id: CLIENT_ID,
			}),
		});

		while (true) {
			yield* Effect.sleep(interval * 1000);
			const response = yield* client.execute(request);
			const body = yield* HttpClientResponse.schemaBodyJson(
				DeviceCodeResponseSchema,
			)(response);

			switch (body.error) {
				case "authorization_pending":
					break;
				case "slow_down":
					interval += 5;
					yield* Console.log(`Polling slowed to every ${interval}s.`);
					break;
				case undefined:
					break;
				default:
					return yield* Effect.fail(
						`Device authentication failed: ${body.error_description ?? body.error}`,
					);
			}

			if (body.access_token) {
				return body.access_token;
			}
		}
	});

export const runDeviceLogin = Effect.gen(function* () {
	const client = yield* HttpClient;
	const request = HttpClientRequest.post(`${apiUrl}/auth/device/code`, {
		body: yield* HttpBody.json({
			client_id: CLIENT_ID,
			scope: "openid profile email",
		}),
	});

	yield* Console.log("Requesting device authorization...");
	const device = yield* client.execute(request);
	const body =
		yield* HttpClientResponse.schemaBodyJson(DeviceCodeResponse)(device);

	yield* Console.log(
		`Open this URL: ${`${body.verification_uri}?user_code=${body.user_code}`}`,
	);
	yield* openBrowser(`${body.verification_uri}?user_code=${body.user_code}`);
	yield* Console.log("Waiting for approval...");

	const accessToken = yield* pollForToken(body.device_code, body.interval ?? 5);

	yield* saveAccessToken(accessToken);
	yield* Console.log("Logged in. Stored access token in OS secrets.");
});
