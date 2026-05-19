import { Data, Effect } from "effect";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as Api from "./api.ts";
import { loadConfig, resolveCredentials } from "./config.ts";

export class MissingApiKeyError extends Data.TaggedError("MissingApiKeyError")<{
	readonly variable: string;
}> {}

export const FastStatsApi = Effect.gen(function* () {
	const fileConfig = yield* loadConfig;
	const { apiKey, apiUrl } = resolveCredentials(fileConfig);

	if (!apiKey) {
		return yield* new MissingApiKeyError({
			variable: "FASTSTATS_API_KEY or ~/.config/faststats/config.json",
		});
	}

	const httpClient = yield* HttpClient.HttpClient;
	const configured = httpClient.pipe(
		HttpClient.mapRequest(HttpClientRequest.prependUrl(apiUrl)),
		HttpClient.mapRequest(HttpClientRequest.setHeader("x-api-key", apiKey)),
	);

	return Api.make(configured);
});
