import type { AuthMethod, AuthSource, AuthStatus } from "../config.ts";

const METHOD_LABEL: Record<AuthMethod, string> = {
	"api-key": "API key",
	"access-token": "access token",
};

const SOURCE_LABEL: Record<AuthSource, string> = {
	environment: "environment",
	"os-secrets": "OS secrets",
};

export const formatAuthStatus = (status: AuthStatus): string => {
	if (!status.authenticated) return "not logged in";
	return `logged in (${METHOD_LABEL[status.method]}, ${SOURCE_LABEL[status.source]})`;
};

export const envAuthOverrides = (): ReadonlyArray<string> =>
	[
		process.env.FASTSTATS_API_KEY && "FASTSTATS_API_KEY",
		process.env.FASTSTATS_ACCESS_TOKEN && "FASTSTATS_ACCESS_TOKEN",
	].filter((name): name is string => Boolean(name));
