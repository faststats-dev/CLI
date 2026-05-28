import { Effect } from "effect";
import { loadCredentials, resolveCredentials } from "../config.ts";

export interface OrganizationSummary {
	readonly id: string;
	readonly name: string;
	readonly slug: string;
}

interface HasPermissionResponse {
	readonly success?: boolean;
}

const authHeaders = (accessToken: string) => ({
	"content-type": "application/json",
	authorization: `Bearer ${accessToken}`,
	"user-agent": "FastStats CLI",
});

const authRequest = <T>(
	authBaseUrl: string,
	accessToken: string,
	path: string,
	init: RequestInit,
) =>
	Effect.tryPromise({
		try: async () => {
			const response = await fetch(`${authBaseUrl}${path}`, {
				...init,
				headers: {
					...authHeaders(accessToken),
					...(init.headers ?? {}),
				},
			});
			const payload = (await response.json().catch(() => ({}))) as T & {
				message?: string;
			};
			if (!response.ok) {
				throw new Error(
					payload.message ??
						`Organization request failed with HTTP ${response.status}`,
				);
			}
			return payload;
		},
		catch: (error) =>
			error instanceof Error
				? error
				: new Error("Organization request failed"),
	});

export const resolveAccessToken = Effect.gen(function* () {
	const credentials = yield* loadCredentials;
	const { accessToken } = resolveCredentials(credentials);
	if (!accessToken) {
		return yield* Effect.fail(
			new Error(
				"Organization selection requires an access token. Run faststats login or pass --org only when logged in.",
			),
		);
	}
	const { apiUrl } = resolveCredentials(credentials);
	return {
		accessToken,
		authBaseUrl: `${apiUrl.replace(/\/$/, "")}/auth`,
	};
});

export const listOrganizations = (authBaseUrl: string, accessToken: string) =>
	authRequest<ReadonlyArray<OrganizationSummary>>(
		authBaseUrl,
		accessToken,
		"/organization/list",
		{ method: "GET" },
	);

export const setActiveOrganization = (
	authBaseUrl: string,
	accessToken: string,
	target: { readonly organizationId: string | null } | { readonly organizationSlug: string },
) =>
	authRequest(authBaseUrl, accessToken, "/organization/set-active", {
		method: "POST",
		body: JSON.stringify(target),
	});

export const hasProjectCreatePermission = (
	authBaseUrl: string,
	accessToken: string,
	organizationId: string,
) =>
	authRequest<HasPermissionResponse>(
		authBaseUrl,
		accessToken,
		"/organization/has-permission",
		{
			method: "POST",
			body: JSON.stringify({
				organizationId,
				permissions: { project: ["create"] },
			}),
		},
	).pipe(Effect.map((response) => response.success === true));

export const listCreatableOrganizations = (
	authBaseUrl: string,
	accessToken: string,
) =>
	Effect.gen(function* () {
		const organizations = yield* listOrganizations(authBaseUrl, accessToken);
		const results = yield* Effect.forEach(
			organizations,
			(org) =>
				hasProjectCreatePermission(authBaseUrl, accessToken, org.id).pipe(
					Effect.map((allowed) => (allowed ? org : null)),
				),
			{ concurrency: "unbounded" },
		);
		return results.filter((org): org is OrganizationSummary => org !== null);
	});

export const resolveOrganizationByRef = (
	organizations: ReadonlyArray<OrganizationSummary>,
	ref: string,
) => {
	const normalized = ref.trim().toLowerCase();
	if (normalized === "personal" || normalized === "user") {
		return { organizationId: null } as const;
	}
	const match = organizations.find(
		(org) =>
			org.id === ref ||
			org.slug.toLowerCase() === normalized ||
			org.name.toLowerCase() === normalized,
	);
	if (!match) {
		return undefined;
	}
	return { organizationId: match.id } as const;
};
