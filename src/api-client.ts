import { Effect } from "effect";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as Api from "./api.ts";
import { requireAccessToken } from "./auth.ts";
import { apiUrl } from "./config.ts";

export const FastStatsApi = Effect.gen(function* () {
	const accessToken = yield* requireAccessToken;

	const httpClient = yield* HttpClient.HttpClient;
	const configured = httpClient.pipe(
		HttpClient.mapRequest(HttpClientRequest.prependUrl(apiUrl)),
		HttpClient.mapRequest((request) =>
			HttpClientRequest.setHeader(
				request,
				"Authorization",
				`Bearer ${accessToken}`,
			),
		),
	);

	return Api.make(configured);
});
