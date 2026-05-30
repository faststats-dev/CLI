import { Cause, Console, Effect, Option } from "effect";
import { Command, Flag, Prompt } from "effect/unstable/cli";
import { FastStatsApi } from "../../api-client.ts";
import {
	hasProjectCreatePermission,
	listCreatableOrganizations,
	listOrganizations,
	type OrganizationSummary,
	resolveAccessToken,
	resolveOrganizationByRef,
	setActiveOrganization,
} from "../../auth/organization-client.ts";
import {
	formatApiErrorMessage,
	promptIfAbsent,
} from "../../command-helpers.ts";
import { ProjectNameSchema } from "../../project-validation.ts";
import { validateWithSchema } from "../../validation.ts";

const CREATE_PROJECT_PERMISSION_ERROR =
	"You don't have permission to create projects in this organization.";

const PROJECT_CREATE_TEMPLATE_ID = "minecraft-plugin";

const formatApiError = (error: unknown): string =>
	typeof error === "object" &&
	error !== null &&
	"_tag" in error &&
	error._tag === "ForbiddenError" &&
	"message" in error &&
	error.message === "Insufficient permissions"
		? CREATE_PROJECT_PERMISSION_ERROR
		: formatApiErrorMessage(error, "Failed to create project");

const resolveInteractiveOrganization = (
	authBaseUrl: string,
	accessToken: string,
	creatableOrganizations: ReadonlyArray<OrganizationSummary>,
) => {
	const choices = [
		{
			title: "Personal account",
			value: null as string | null,
			description: "Create under your user account",
		},
		...creatableOrganizations.map((org) => ({
			title: org.name,
			value: org.id,
			description: org.slug,
		})),
	];

	return Prompt.select({
		message: "Create project in",
		choices,
	}).pipe(
		Effect.flatMap((organizationId) =>
			setActiveOrganization(authBaseUrl, accessToken, { organizationId }),
		),
	);
};

const resolveOrganizationContext = (orgFlag: Option.Option<string>) =>
	Effect.gen(function* () {
		const orgRef = Option.getOrUndefined(orgFlag);
		if (orgRef !== undefined) {
			const { accessToken, authBaseUrl } = yield* resolveAccessToken;
			const organizations = yield* listOrganizations(authBaseUrl, accessToken);
			const target = resolveOrganizationByRef(organizations, orgRef);
			if (!target) {
				return yield* Effect.fail(
					new Error(
						`Unknown organization "${orgRef}". Use an organization slug, id, or "personal".`,
					),
				);
			}
			if (target.organizationId !== null) {
				const allowed = yield* hasProjectCreatePermission(
					authBaseUrl,
					accessToken,
					target.organizationId,
				);
				if (!allowed) {
					return yield* Effect.fail(
						new Error(
							`You do not have permission to create projects in "${orgRef}".`,
						),
					);
				}
			}
			yield* setActiveOrganization(authBaseUrl, accessToken, target);
			return;
		}

		const access = yield* Effect.option(resolveAccessToken);
		if (Option.isNone(access)) {
			return;
		}

		const creatableOrganizations = yield* listCreatableOrganizations(
			access.value.authBaseUrl,
			access.value.accessToken,
		).pipe(Effect.catch(() => Effect.succeed([] as OrganizationSummary[])));

		if (creatableOrganizations.length === 0) {
			return;
		}

		yield* resolveInteractiveOrganization(
			access.value.authBaseUrl,
			access.value.accessToken,
			creatableOrganizations,
		);
	});

export const projectCreateCommand = Command.make(
	"create",
	{
		name: Flag.string("name").pipe(
			Flag.withDescription("Project name"),
			Flag.withSchema(ProjectNameSchema),
			Flag.withFallbackPrompt(
				Prompt.text({
					message: "Project name",
					validate: validateWithSchema(ProjectNameSchema),
				}),
			),
		),
		private: Flag.boolean("private").pipe(
			Flag.optional,
			Flag.withDescription("Make the project private"),
		),
		errorTracking: Flag.boolean("error-tracking").pipe(
			Flag.optional,
			Flag.withDescription("Enable error tracking"),
		),
		org: Flag.string("org").pipe(
			Flag.optional,
			Flag.withDescription(
				'Organization slug, id, or "personal" (requires access token)',
			),
		),
		hostname: Flag.string("hostname").pipe(
			Flag.optional,
			Flag.withDescription("Allowed hostname"),
		),
	},
	Effect.fnUntraced(function* ({
		name,
		private: privateFlag,
		errorTracking: errorTrackingFlag,
		org,
		hostname,
	}) {
		yield* resolveOrganizationContext(org);

		const isPrivate = yield* promptIfAbsent(
			privateFlag,
			Prompt.select({
				message: "Project visibility",
				choices: [
					{
						title: "Public",
						value: false,
						description: "Visible on explore and embed pages",
					},
					{
						title: "Private",
						value: true,
						description: "Only accessible to you and your team",
					},
				],
			}),
		);

		const errorTrackingEnabled = yield* promptIfAbsent(
			errorTrackingFlag,
			Prompt.confirm({
				message: "Enable error tracking?",
				initial: true,
			}),
		);

		const api = yield* FastStatsApi;
		const allowedHostnames = Option.match(hostname, {
			onNone: () => undefined,
			onSome: (value) => [value],
		});

		const project = yield* api
			.ProjectsCreateProject({
				payload: {
					name,
					private: isPrivate,
					templateId: PROJECT_CREATE_TEMPLATE_ID,
					allowedHostnames,
				},
			})
			.pipe(
				Effect.catchCause((cause) =>
					Effect.fail(new Error(formatApiError(Cause.squash(cause)))),
				),
			);

		const updateResult = yield* Effect.result(
			api.ProjectsUpdateProject(project.id, {
				payload: {
					errorTrackingEnabled,
					webVitalsEnabled: false,
					sessionReplaysEnabled: false,
				},
			}),
		);
		if (updateResult._tag === "Failure") {
			yield* Console.log(
				`Warning: project created but feature settings could not be applied (${formatApiError(updateResult.failure)})`,
			);
		}

		yield* Console.log(`Created project "${project.name}"`);
		yield* Console.log(`  slug: ${project.slug}`);
		yield* Console.log(`  id:   ${project.id}`);
		yield* Console.log(
			`  visibility: ${project.private ? "private" : "public"}`,
		);
		yield* Console.log(
			`  error tracking: ${errorTrackingEnabled ? "enabled" : "disabled"}`,
		);
		if (project.token) {
			yield* Console.log(`  token: ${project.token}`);
		}
	}),
).pipe(
	Command.withDescription(
		"Create a new project (interactive prompts when flags are omitted)",
	),
);
