import { Cause, Console, Data, Effect, Schema } from "effect";
import * as Stdio from "effect/Stdio";
import * as HttpClientError from "effect/unstable/http/HttpClientError";
import { ForbiddenError, UnauthorizedError } from "./api.ts";
import { isApiError } from "./api-client.ts";
import { apiUrl, loadAccessToken } from "./config.ts";

export const LOGIN_MESSAGE =
	"Not authenticated. Run `faststats login` to sign in.";

export const SESSION_EXPIRED_MESSAGE =
	"Unauthorized. Your session may have expired — run `faststats login` to sign in again.";

const CREATE_PROJECT_PERMISSION_ERROR =
	"You don't have permission to create projects in this organization.";

const ApiMessage = Schema.Struct({ message: Schema.String });

export class AuthError extends Data.TaggedError("AuthError")<{
	readonly message: string;
}> {}

const EXEMPT = new Set(["login", "logout", "status", "completions"]);

export const requireAccessToken = loadAccessToken.pipe(
	Effect.flatMap((token) =>
		token
			? Effect.succeed(token)
			: Effect.fail(new AuthError({ message: LOGIN_MESSAGE })),
	),
);

export const authContext = requireAccessToken.pipe(
	Effect.map((accessToken) => ({
		accessToken,
		authBaseUrl: `${apiUrl}/auth`,
	})),
);

export const failureMessage = (error: unknown): string | undefined => {
	if (isApiError(error)) return failureMessage(error.cause);

	if (error instanceof AuthError) return error.message;
	if (Schema.is(UnauthorizedError)(error)) return SESSION_EXPIRED_MESSAGE;
	if (
		HttpClientError.isHttpClientError(error) &&
		error.reason._tag === "StatusCodeError" &&
		error.reason.response.status === 401
	) {
		return SESSION_EXPIRED_MESSAGE;
	}
	if (Schema.is(ForbiddenError)(error)) {
		if (error.message === "Insufficient permissions") {
			return CREATE_PROJECT_PERMISSION_ERROR;
		}
		return error.message;
	}
	if (Schema.is(ApiMessage)(error) && error.message.length > 0) {
		return error.message;
	}
	if (HttpClientError.isHttpClientError(error)) {
		const { reason } = error;
		if (reason._tag === "StatusCodeError") {
			const description = reason.description;
			if (description !== undefined && description.length > 0) {
				return description;
			}
		}
	}
	if (error instanceof Error && error.message.length > 0) {
		return error.message;
	}
	return undefined;
};

const needsAuth = (args: ReadonlyArray<string>) => {
	const [root, sub] = args.filter((token) => !token.startsWith("-"));
	return Boolean(root && !EXEMPT.has(root) && (root !== "project" || sub));
};

export const runCli = <A, E, R>(program: Effect.Effect<A, E, R>) =>
	Effect.gen(function* () {
		const args = yield* (yield* Stdio.Stdio).args;
		if (needsAuth(args)) yield* requireAccessToken;
		return yield* program;
	}).pipe(
		Effect.catchCause((cause) => {
			const message = failureMessage(Cause.squash(cause));
			if (!message) return Effect.failCause(cause);
			return Console.error(message).pipe(
				Effect.andThen(Effect.fail(Cause.squash(cause) as E)),
			);
		}),
	);
