import { Data, Effect } from "effect";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as Api from "./api.ts";

export class MissingApiKeyError extends Data.TaggedError("MissingApiKeyError")<{
	readonly variable: string;
}> {}

export const FastStatsApi = Effect.gen(function* () {
	const apiKey = process.env.FASTSTATS_API_KEY;
	if (!apiKey) {
		return yield* new MissingApiKeyError({ variable: "FASTSTATS_API_KEY" });
	}

	const baseUrl = process.env.FASTSTATS_API_URL ?? "http://localhost:4000";

	const httpClient = yield* HttpClient.HttpClient;
	const configured = httpClient.pipe(
		HttpClient.mapRequest(HttpClientRequest.prependUrl(baseUrl)),
		HttpClient.mapRequest(HttpClientRequest.setHeader("x-api-key", apiKey)),
	);

	return Api.make(configured);
});
