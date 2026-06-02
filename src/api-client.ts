import { Data, Effect } from "effect";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as Api from "./api.ts";
import { apiUrl, loadAccessToken } from "./config.ts";

class NotAuthenticatedError extends Data.TaggedError("NotAuthenticatedError")<{
	readonly message: string;
}> {}

export const FastStatsApi = Effect.gen(function* () {
	const accessToken = yield* loadAccessToken;
	if (!accessToken) {
		return yield* new NotAuthenticatedError({
			message: "Not authenticated. Run `faststats login`.",
		});
	}

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
