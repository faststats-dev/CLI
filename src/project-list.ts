import { Effect } from "effect";
import type {
	ProjectsListProjects200,
	ProjectsListPublicProjects200,
} from "./api.ts";
import { FastStatsApi } from "./api-client.ts";
import {
	getSessionUserId,
	listOrganizations,
} from "./auth/organization-client.ts";
import { authContext } from "./auth.ts";
import type { Project } from "./data/project.ts";

type PrivateProject = ProjectsListProjects200["items"][number];
type PublicProject = ProjectsListPublicProjects200["items"][number];

const listPublicProjectsForOwner = (ownerId: string) =>
	Effect.gen(function* () {
		const api = yield* FastStatsApi;
		const projects: Array<PublicProject> = [];
		let offset = 0;

		while (true) {
			const response = yield* api.ProjectsListPublicProjects({
				params: { ownerId, limit: "100", offset: String(offset) },
			});
			projects.push(...response.items);
			if (!response.hasMore || response.items.length === 0) break;
			offset += response.items.length;
		}

		return projects;
	});

const listOwnedPublicProjects = Effect.gen(function* () {
	const { accessToken, authBaseUrl } = yield* authContext;
	const [userId, organizations] = yield* Effect.all([
		getSessionUserId(authBaseUrl, accessToken),
		listOrganizations(authBaseUrl, accessToken),
	]);
	const ownerIds = [
		userId,
		...organizations.map((organization) => organization.id),
	].filter((ownerId): ownerId is string => ownerId !== undefined);

	return yield* Effect.forEach(ownerIds, listPublicProjectsForOwner, {
		concurrency: "unbounded",
	}).pipe(Effect.map((pages) => pages.flat()));
}).pipe(Effect.catch(() => Effect.succeed([] as ReadonlyArray<PublicProject>)));

const fromPrivateProject = (project: PrivateProject): Project => ({
	id: project.id,
	name: project.name,
	slug: `/${project.slug}`,
	visibility: project.private ? "private" : "public",
	preferredChartColors: project.preferredChartColors,
});

const fromPublicProject = (project: PublicProject): Project => ({
	id: project.id,
	name: project.name,
	slug: `/${project.slug}`,
	visibility: "public",
	preferredChartColors: null,
});

export const listDashboardProjects = Effect.gen(function* () {
	const api = yield* FastStatsApi;
	const [response, ownedPublicProjects] = yield* Effect.all([
		api.ProjectsListProjects(undefined),
		listOwnedPublicProjects,
	]);
	const projects = new Map<string, Project>();

	for (const project of response.items) {
		projects.set(project.id, fromPrivateProject(project));
	}
	for (const project of ownedPublicProjects) {
		if (!projects.has(project.id))
			projects.set(project.id, fromPublicProject(project));
	}

	return [...projects.values()].sort((a, b) =>
		a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
	);
});
