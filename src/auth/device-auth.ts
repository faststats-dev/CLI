import { Console, Effect } from "effect";
import { saveAccessToken, saveConfig } from "../config.ts";

const CLIENT_ID = "faststats-cli";
const DEVICE_GRANT_TYPE =
	"urn:ietf:params:oauth:grant-type:device_code" as const;

interface DeviceCodeResponse {
	readonly device_code: string;
	readonly user_code: string;
	readonly verification_uri: string;
	readonly verification_uri_complete?: string;
	readonly interval?: number;
}

interface DeviceTokenResponse {
	readonly access_token?: string;
	readonly error?: string;
	readonly error_description?: string;
}

class DeviceAuthError extends Error {
	constructor(
		readonly code: string,
		message: string,
	) {
		super(message);
	}
}

const postJson = <T>(url: string, body: unknown, allowError = false) =>
	Effect.tryPromise({
		try: async () => {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"content-type": "application/json",
					"user-agent": "FastStats CLI",
				},
				body: JSON.stringify(body),
			});
			const payload = (await response.json().catch(() => ({}))) as T;
			if (!response.ok && !allowError) {
				const errorPayload = payload as DeviceTokenResponse;
				throw new Error(
					errorPayload.error_description ||
						errorPayload.error ||
						`Request failed with HTTP ${response.status}`,
				);
			}
			return payload;
		},
		catch: (error) =>
			error instanceof Error ? error : new Error("Device authorization failed"),
	});

const resolveVerificationUrl = (value: string, appUrl: string) =>
	new URL(value, `${appUrl.replace(/\/$/, "")}/`).toString();

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

const pollForToken = (
	authBaseUrl: string,
	deviceCode: string,
	initialInterval: number,
) =>
	Effect.gen(function* () {
		let pollingInterval = initialInterval;

		while (true) {
			yield* Effect.sleep(pollingInterval * 1000);
			const response = yield* postJson<DeviceTokenResponse>(
				`${authBaseUrl}/device/token`,
				{
					grant_type: DEVICE_GRANT_TYPE,
					device_code: deviceCode,
					client_id: CLIENT_ID,
				},
				true,
			);

			if (response.access_token) {
				return response.access_token;
			}

			switch (response.error) {
				case "authorization_pending":
					break;
				case "slow_down":
					pollingInterval += 5;
					yield* Console.log(`Polling slowed to every ${pollingInterval}s.`);
					break;
				case "access_denied":
					return yield* Effect.fail(
						new DeviceAuthError("access_denied", "Access was denied."),
					);
				case "expired_token":
					return yield* Effect.fail(
						new DeviceAuthError(
							"expired_token",
							"The device code expired. Run faststats login again.",
						),
					);
				default:
					return yield* Effect.fail(
						new DeviceAuthError(
							response.error ?? "device_authorization_failed",
							response.error_description ||
								response.error ||
								"Device authorization failed.",
						),
					);
			}
		}
	});

export const runDeviceLogin = (apiUrl: string, appUrl: string) =>
	Effect.gen(function* () {
		const authBaseUrl = `${apiUrl.replace(/\/$/, "")}/auth`;

		yield* Console.log("Requesting device authorization...");
		const device = yield* postJson<DeviceCodeResponse>(
			`${authBaseUrl}/device/code`,
			{ client_id: CLIENT_ID, scope: "openid profile email" },
		);

		const verificationUrl = resolveVerificationUrl(
			device.verification_uri_complete ?? device.verification_uri,
			appUrl,
		);

		yield* Console.log(`Open this URL: ${verificationUrl}`);
		yield* Console.log(`Enter code: ${device.user_code}`);
		yield* openBrowser(verificationUrl);
		yield* Console.log("Waiting for approval...");

		const accessToken = yield* pollForToken(
			authBaseUrl,
			device.device_code,
			device.interval ?? 5,
		);

		yield* saveAccessToken(accessToken);
		yield* saveConfig({ apiUrl, appUrl });
		yield* Console.log("Logged in. Stored access token in OS secrets.");
	});
