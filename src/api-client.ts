import { Data, Effect } from "effect";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as Api from "./api.ts";
import { loadCredentials, resolveCredentials } from "./config.ts";

class MissingApiKeyError extends Data.TaggedError("MissingApiKeyError")<{
	readonly variable: string;
}> {}

export const FastStatsApi = Effect.gen(function* () {
	const credentials = yield* loadCredentials;
	const { accessToken, apiKey, apiUrl } = resolveCredentials(credentials);

	if (!apiKey && !accessToken) {
		return yield* new MissingApiKeyError({
			variable: "FASTSTATS_API_KEY, FASTSTATS_ACCESS_TOKEN, or OS secrets",
		});
	}

	const httpClient = yield* HttpClient.HttpClient;
	const configured = httpClient.pipe(
		HttpClient.mapRequest(HttpClientRequest.prependUrl(apiUrl)),
		HttpClient.mapRequest((request) =>
			apiKey
				? HttpClientRequest.setHeader(request, "x-api-key", apiKey)
				: HttpClientRequest.setHeader(
						request,
						"Authorization",
						`Bearer ${accessToken}`,
					),
		),
	);

	return Api.make(configured);
});
