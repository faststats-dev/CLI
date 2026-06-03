import { Cause, Console, Data, Effect } from "effect";
import * as Stdio from "effect/Stdio";
import * as HttpClientError from "effect/unstable/http/HttpClientError";
import { apiUrl, loadAccessToken } from "./config.ts";

export const LOGIN_MESSAGE =
	"Not authenticated. Run `faststats login` to sign in.";

export const SESSION_EXPIRED_MESSAGE =
	"Unauthorized. Your session may have expired — run `faststats login` to sign in again.";

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

const authMessage = (error: unknown): string | undefined => {
	if (error instanceof AuthError) return error.message;
	if (
		HttpClientError.isHttpClientError(error) &&
		error.reason._tag === "StatusCodeError" &&
		error.reason.response.status === 401
	) {
		return SESSION_EXPIRED_MESSAGE;
	}
	const tag =
		typeof error === "object" && error !== null && "_tag" in error
			? error._tag
			: undefined;
	if (
		tag === "UnauthorizedError" ||
		(typeof tag === "string" && tag.endsWith("401"))
	) {
		return SESSION_EXPIRED_MESSAGE;
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
			const message = authMessage(Cause.squash(cause));
			if (!message) return Effect.failCause(cause);
			return Console.error(message).pipe(
				Effect.andThen(Effect.fail(new AuthError({ message }) as E)),
			);
		}),
	);
