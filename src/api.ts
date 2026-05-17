import * as Data from "effect/Data"
import * as Effect from "effect/Effect"
import type { SchemaError } from "effect/Schema"
import * as Schema from "effect/Schema"
import type * as HttpClient from "effect/unstable/http/HttpClient"
import * as HttpClientError from "effect/unstable/http/HttpClientError"
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest"
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse"
// non-recursive definitions
export type DashboardRecord = { readonly "id": string, readonly "projectId": string, readonly "name": string, readonly "description": string | null, readonly "isPublic": boolean, readonly "isDefault": boolean, readonly "position": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "createdAt": string, readonly "updatedAt": string }
export const DashboardRecord = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "name": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "isPublic": Schema.Boolean, "isDefault": Schema.Boolean, "position": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "createdAt": Schema.String, "updatedAt": Schema.String })
export type DashboardValidationError = { readonly "_tag": "DashboardValidationError", readonly "message": string }
export const DashboardValidationError = Schema.Struct({ "_tag": Schema.Literal("DashboardValidationError"), "message": Schema.String })
export type UnauthorizedError = { readonly "_tag": "UnauthorizedError", readonly "message": string }
export const UnauthorizedError = Schema.Struct({ "_tag": Schema.Literal("UnauthorizedError"), "message": Schema.String })
export type ForbiddenError = { readonly "_tag": "ForbiddenError", readonly "message": string, readonly "code"?: string | null }
export const ForbiddenError = Schema.Struct({ "_tag": Schema.Literal("ForbiddenError"), "message": Schema.String, "code": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type NotFoundError = { readonly "_tag": "NotFoundError", readonly "message": string }
export const NotFoundError = Schema.Struct({ "_tag": Schema.Literal("NotFoundError"), "message": Schema.String })
export type DownloadAnalyticsOverview = { readonly "totalDownloads": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "providersTracked": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "projectsTracked": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "latestSnapshotAt": string | null }
export const DownloadAnalyticsOverview = Schema.Struct({ "totalDownloads": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "providersTracked": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "projectsTracked": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "latestSnapshotAt": Schema.Union([Schema.String, Schema.Null]) })
export type DownloadAnalyticsPoint = { readonly "bucket": string, readonly "downloads": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "provider"?: "modrinth" | "spigot" | "hangar" | "ore" | "curseforge" | "github" | null | null }
export const DownloadAnalyticsPoint = Schema.Struct({ "bucket": Schema.String, "downloads": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "provider": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Literals(["modrinth", "spigot", "hangar", "ore", "curseforge", "github"]), Schema.Null]), Schema.Null])) })
export type DownloadProviderSummary = { readonly "provider": "modrinth" | "spigot" | "hangar" | "ore" | "curseforge" | "github", readonly "downloads": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "latestSnapshotAt": string | null, readonly "followers"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null | null, readonly "views"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null | null, readonly "watchers"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null | null, readonly "stars"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null | null, readonly "thumbsUpCount"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null | null }
export const DownloadProviderSummary = Schema.Struct({ "provider": Schema.Literals(["modrinth", "spigot", "hangar", "ore", "curseforge", "github"]), "downloads": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "latestSnapshotAt": Schema.Union([Schema.String, Schema.Null]), "followers": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])), "views": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])), "watchers": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])), "stars": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])), "thumbsUpCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])) })
export type DownloadVersionRow = { readonly "provider": "modrinth" | "spigot" | "hangar" | "ore" | "curseforge" | "github", readonly "externalId": string, readonly "versionId": string, readonly "versionNumber": string, readonly "downloads": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "latestSnapshotAt": string | null, readonly "releaseDate": string | null }
export const DownloadVersionRow = Schema.Struct({ "provider": Schema.Literals(["modrinth", "spigot", "hangar", "ore", "curseforge", "github"]), "externalId": Schema.String, "versionId": Schema.String, "versionNumber": Schema.String, "downloads": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "latestSnapshotAt": Schema.Union([Schema.String, Schema.Null]), "releaseDate": Schema.Union([Schema.String, Schema.Null]) })
export type EventExplorerRow = { readonly "id": string, readonly "timestamp": string, readonly "fieldValues": { readonly [x: string]: string }, readonly "rawData": string }
export const EventExplorerRow = Schema.Struct({ "id": Schema.String, "timestamp": Schema.String, "fieldValues": Schema.Record(Schema.String, Schema.String), "rawData": Schema.String })
export type FunnelRecord = { readonly "id": string, readonly "projectId": string, readonly "name": string, readonly "description": string | null, readonly "steps": ReadonlyArray<{ readonly "type"?: "event" | null, readonly "id": string, readonly "name": string, readonly "match": "all" | "any", readonly "filters": ReadonlyArray<{ readonly "field": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "starts_with" | "not_starts_with" | "ends_with" | "not_ends_with" | "greater_than" | "less_than", readonly "value": string | number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | boolean }> } | { readonly "type": "feature_flag", readonly "id": string, readonly "name": string, readonly "featureFlagId": string, readonly "flagKey": string, readonly "flagMatch": "set" | "unset" | "value", readonly "value"?: string | null }> | null, readonly "conversionWindowSeconds": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "strictOrder": boolean, readonly "timeRangeSeconds": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "createdAt": string, readonly "updatedAt": string }
export const FunnelRecord = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "name": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "steps": Schema.Union([Schema.Array(Schema.Union([Schema.Struct({ "type": Schema.optionalKey(Schema.Union([Schema.Literal("event"), Schema.Null])), "id": Schema.String, "name": Schema.String, "match": Schema.Literals(["all", "any"]), "filters": Schema.Array(Schema.Struct({ "field": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "starts_with", "not_starts_with", "ends_with", "not_ends_with", "greater_than", "less_than"]), "value": Schema.Union([Schema.String, Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Boolean]) })) }), Schema.Struct({ "type": Schema.Literal("feature_flag"), "id": Schema.String, "name": Schema.String, "featureFlagId": Schema.String, "flagKey": Schema.String, "flagMatch": Schema.Literals(["set", "unset", "value"]), "value": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })])), Schema.Null]), "conversionWindowSeconds": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "strictOrder": Schema.Boolean, "timeRangeSeconds": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "createdAt": Schema.String, "updatedAt": Schema.String })
export type FunnelValidationError = { readonly "_tag": "FunnelValidationError", readonly "message": string }
export const FunnelValidationError = Schema.Struct({ "_tag": Schema.Literal("FunnelValidationError"), "message": Schema.String })
export type FunnelStepResult = { readonly "count": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "conversionRate": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "dropOffRate": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" }
export const FunnelStepResult = Schema.Struct({ "count": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "conversionRate": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "dropOffRate": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })
export type ProjectValidationError = { readonly "_tag": "ProjectValidationError", readonly "message": string }
export const ProjectValidationError = Schema.Struct({ "_tag": Schema.Literal("ProjectValidationError"), "message": Schema.String })
export type ProjectConflictError = { readonly "_tag": "ProjectConflictError", readonly "message": string }
export const ProjectConflictError = Schema.Struct({ "_tag": Schema.Literal("ProjectConflictError"), "message": Schema.String })
export type RetentionFilter = { readonly "field": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "starts_with" | "not_starts_with" | "ends_with" | "not_ends_with" | "greater_than" | "less_than", readonly "value": string | "Infinity" | "-Infinity" | "NaN" | "true" | "false" | string, readonly "dataType": "string" | "number" | "boolean" }
export const RetentionFilter = Schema.Struct({ "field": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "starts_with", "not_starts_with", "ends_with", "not_ends_with", "greater_than", "less_than"]), "value": Schema.Union([Schema.Union([Schema.String.check(Schema.isPattern(new RegExp("^[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?$"))), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Literals(["true", "false"]), Schema.String]), "dataType": Schema.Literals(["string", "number", "boolean"]) })
export type RetentionCohortPeriod = { readonly "period": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "usersRetained": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "retentionRate": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" }
export const RetentionCohortPeriod = Schema.Struct({ "period": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "usersRetained": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "retentionRate": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })
export type RetentionDriverData = { readonly "source": "web" | "mods", readonly "field": string, readonly "value": string, readonly "cohortUsers": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "retainedUsers": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "retentionRate": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "baselineRate": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "deltaPoints": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "impactScore": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" }
export const RetentionDriverData = Schema.Struct({ "source": Schema.Literals(["web", "mods"]), "field": Schema.String, "value": Schema.String, "cohortUsers": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "retainedUsers": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "retentionRate": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "baselineRate": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "deltaPoints": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "impactScore": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })
export type WebVitalData = { readonly "id": string, readonly "projectId": string, readonly "sessionId": string | null, readonly "metric": string, readonly "value": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "label": string, readonly "device": string | null, readonly "country": string | null, readonly "os": string | null, readonly "browser": string | null, readonly "url": string | null, readonly "attributes": {  } | null, readonly "createdAt": string }
export const WebVitalData = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "sessionId": Schema.Union([Schema.String, Schema.Null]), "metric": Schema.String, "value": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "label": Schema.String, "device": Schema.Union([Schema.String, Schema.Null]), "country": Schema.Union([Schema.String, Schema.Null]), "os": Schema.Union([Schema.String, Schema.Null]), "browser": Schema.Union([Schema.String, Schema.Null]), "url": Schema.Union([Schema.String, Schema.Null]), "attributes": Schema.Union([Schema.Struct({  }), Schema.Null]), "createdAt": Schema.String })
export type BuildDeploymentData = { readonly "buildId": string, readonly "deployedAt": string }
export const BuildDeploymentData = Schema.Struct({ "buildId": Schema.String, "deployedAt": Schema.String })
export type WebVitalsTrendPoint = { readonly "bucketStart": string, readonly "metric": string, readonly "samples": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "p75": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "p90": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "p99": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" }
export const WebVitalsTrendPoint = Schema.Struct({ "bucketStart": Schema.String, "metric": Schema.String, "samples": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "p75": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "p90": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "p99": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })
export type DownloadAnalyticsResponse = { readonly "overview": DownloadAnalyticsOverview, readonly "history": ReadonlyArray<DownloadAnalyticsPoint>, readonly "providerBreakdown": ReadonlyArray<DownloadAnalyticsPoint>, readonly "providerSummaries": ReadonlyArray<DownloadProviderSummary>, readonly "versions": ReadonlyArray<DownloadVersionRow> }
export const DownloadAnalyticsResponse = Schema.Struct({ "overview": DownloadAnalyticsOverview, "history": Schema.Array(DownloadAnalyticsPoint), "providerBreakdown": Schema.Array(DownloadAnalyticsPoint), "providerSummaries": Schema.Array(DownloadProviderSummary), "versions": Schema.Array(DownloadVersionRow) })
export type EventExplorerResult = { readonly "rows": ReadonlyArray<EventExplorerRow>, readonly "total": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "page": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "pageSize": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" }
export const EventExplorerResult = Schema.Struct({ "rows": Schema.Array(EventExplorerRow), "total": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "page": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "pageSize": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })
export type FunnelDetail = { readonly "funnel": FunnelRecord, readonly "baselineCount"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "steps": ReadonlyArray<FunnelStepResult> }
export const FunnelDetail = Schema.Struct({ "funnel": FunnelRecord, "baselineCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "steps": Schema.Array(FunnelStepResult) })
export type RetentionCohortData = { readonly "cohort": string, readonly "cohortDate": string, readonly "users": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "periods": ReadonlyArray<RetentionCohortPeriod> }
export const RetentionCohortData = Schema.Struct({ "cohort": Schema.String, "cohortDate": Schema.String, "users": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "periods": Schema.Array(RetentionCohortPeriod) })
// schemas
export type DashboardsListDashboards200 = ReadonlyArray<DashboardRecord>
export const DashboardsListDashboards200 = Schema.Array(DashboardRecord)
export type DashboardsListDashboards400 = DashboardValidationError
export const DashboardsListDashboards400 = DashboardValidationError
export type DashboardsListDashboards401 = UnauthorizedError
export const DashboardsListDashboards401 = UnauthorizedError
export type DashboardsListDashboards403 = ForbiddenError
export const DashboardsListDashboards403 = ForbiddenError
export type DashboardsListDashboards404 = NotFoundError
export const DashboardsListDashboards404 = NotFoundError
export type DashboardsCreateDashboardRequestJson = { readonly "id"?: string | null, readonly "name": string, readonly "description"?: string | null | null, readonly "isPublic"?: boolean | null, readonly "position"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null }
export const DashboardsCreateDashboardRequestJson = Schema.Struct({ "id": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "name": Schema.String, "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "isPublic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "position": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) })
export type DashboardsCreateDashboard200 = DashboardRecord
export const DashboardsCreateDashboard200 = DashboardRecord
export type DashboardsCreateDashboard400 = DashboardValidationError
export const DashboardsCreateDashboard400 = DashboardValidationError
export type DashboardsCreateDashboard401 = UnauthorizedError
export const DashboardsCreateDashboard401 = UnauthorizedError
export type DashboardsCreateDashboard403 = ForbiddenError
export const DashboardsCreateDashboard403 = ForbiddenError
export type DashboardsCreateDashboard404 = NotFoundError
export const DashboardsCreateDashboard404 = NotFoundError
export type DashboardsReorderDashboardsRequestJson = { readonly "dashboards": ReadonlyArray<{ readonly "id": string, readonly "position": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" }> }
export const DashboardsReorderDashboardsRequestJson = Schema.Struct({ "dashboards": Schema.Array(Schema.Struct({ "id": Schema.String, "position": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })) })
export type DashboardsReorderDashboards400 = DashboardValidationError
export const DashboardsReorderDashboards400 = DashboardValidationError
export type DashboardsReorderDashboards401 = UnauthorizedError
export const DashboardsReorderDashboards401 = UnauthorizedError
export type DashboardsReorderDashboards403 = ForbiddenError
export const DashboardsReorderDashboards403 = ForbiddenError
export type DashboardsReorderDashboards404 = NotFoundError
export const DashboardsReorderDashboards404 = NotFoundError
export type DashboardsDuplicateDashboard200 = DashboardRecord
export const DashboardsDuplicateDashboard200 = DashboardRecord
export type DashboardsDuplicateDashboard400 = DashboardValidationError
export const DashboardsDuplicateDashboard400 = DashboardValidationError
export type DashboardsDuplicateDashboard401 = UnauthorizedError
export const DashboardsDuplicateDashboard401 = UnauthorizedError
export type DashboardsDuplicateDashboard403 = ForbiddenError
export const DashboardsDuplicateDashboard403 = ForbiddenError
export type DashboardsDuplicateDashboard404 = NotFoundError
export const DashboardsDuplicateDashboard404 = NotFoundError
export type DashboardsCopyDashboardRequestJson = { readonly "targetProjectId": string }
export const DashboardsCopyDashboardRequestJson = Schema.Struct({ "targetProjectId": Schema.String })
export type DashboardsCopyDashboard200 = DashboardRecord
export const DashboardsCopyDashboard200 = DashboardRecord
export type DashboardsCopyDashboard400 = DashboardValidationError
export const DashboardsCopyDashboard400 = DashboardValidationError
export type DashboardsCopyDashboard401 = UnauthorizedError
export const DashboardsCopyDashboard401 = UnauthorizedError
export type DashboardsCopyDashboard403 = ForbiddenError
export const DashboardsCopyDashboard403 = ForbiddenError
export type DashboardsCopyDashboard404 = NotFoundError
export const DashboardsCopyDashboard404 = NotFoundError
export type DashboardsDeleteDashboard400 = DashboardValidationError
export const DashboardsDeleteDashboard400 = DashboardValidationError
export type DashboardsDeleteDashboard401 = UnauthorizedError
export const DashboardsDeleteDashboard401 = UnauthorizedError
export type DashboardsDeleteDashboard403 = ForbiddenError
export const DashboardsDeleteDashboard403 = ForbiddenError
export type DashboardsDeleteDashboard404 = NotFoundError
export const DashboardsDeleteDashboard404 = NotFoundError
export type DashboardsUpdateDashboardRequestJson = { readonly "name"?: string | null, readonly "description"?: string | null | null, readonly "isPublic"?: boolean | null, readonly "position"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null }
export const DashboardsUpdateDashboardRequestJson = Schema.Struct({ "name": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "isPublic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "position": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) })
export type DashboardsUpdateDashboard200 = DashboardRecord
export const DashboardsUpdateDashboard200 = DashboardRecord
export type DashboardsUpdateDashboard400 = DashboardValidationError
export const DashboardsUpdateDashboard400 = DashboardValidationError
export type DashboardsUpdateDashboard401 = UnauthorizedError
export const DashboardsUpdateDashboard401 = UnauthorizedError
export type DashboardsUpdateDashboard403 = ForbiddenError
export const DashboardsUpdateDashboard403 = ForbiddenError
export type DashboardsUpdateDashboard404 = NotFoundError
export const DashboardsUpdateDashboard404 = NotFoundError
export type DownloadsGetDownloadAnalyticsParams = { readonly "dateFrom"?: string | null, readonly "dateTo"?: string | null, readonly "versionNumber"?: string | null, readonly "granularity"?: "day" | "30min" | null }
export const DownloadsGetDownloadAnalyticsParams = Schema.Struct({ "dateFrom": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "dateTo": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "versionNumber": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "granularity": Schema.optionalKey(Schema.Union([Schema.Literals(["day", "30min"]), Schema.Null])) })
export type DownloadsGetDownloadAnalytics200 = DownloadAnalyticsResponse
export const DownloadsGetDownloadAnalytics200 = DownloadAnalyticsResponse
export type DownloadsGetDownloadAnalytics401 = UnauthorizedError
export const DownloadsGetDownloadAnalytics401 = UnauthorizedError
export type DownloadsGetDownloadAnalytics403 = ForbiddenError
export const DownloadsGetDownloadAnalytics403 = ForbiddenError
export type DownloadsGetDownloadAnalytics404 = NotFoundError
export const DownloadsGetDownloadAnalytics404 = NotFoundError
export type EventExplorerGetEventExplorerRowsParams = { readonly "templateId"?: "null" | string | null, readonly "mode"?: "events" | "errors" | "vitals" | "replays" | "feature-flags" | null, readonly "page"?: string | null, readonly "pageSize"?: string | null, readonly "fromTime"?: string | null, readonly "toTime"?: string | null }
export const EventExplorerGetEventExplorerRowsParams = Schema.Struct({ "templateId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Literal("null"), Schema.String]), Schema.Null])), "mode": Schema.optionalKey(Schema.Union([Schema.Literals(["events", "errors", "vitals", "replays", "feature-flags"]), Schema.Null])), "page": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "pageSize": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "fromTime": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "toTime": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type EventExplorerGetEventExplorerRows200 = EventExplorerResult
export const EventExplorerGetEventExplorerRows200 = EventExplorerResult
export type EventExplorerGetEventExplorerRows401 = UnauthorizedError
export const EventExplorerGetEventExplorerRows401 = UnauthorizedError
export type EventExplorerGetEventExplorerRows403 = ForbiddenError
export const EventExplorerGetEventExplorerRows403 = ForbiddenError
export type EventExplorerGetEventExplorerRows404 = NotFoundError
export const EventExplorerGetEventExplorerRows404 = NotFoundError
export type FunnelsListFunnels200 = ReadonlyArray<FunnelRecord>
export const FunnelsListFunnels200 = Schema.Array(FunnelRecord)
export type FunnelsListFunnels400 = FunnelValidationError
export const FunnelsListFunnels400 = FunnelValidationError
export type FunnelsListFunnels401 = UnauthorizedError
export const FunnelsListFunnels401 = UnauthorizedError
export type FunnelsListFunnels403 = ForbiddenError
export const FunnelsListFunnels403 = ForbiddenError
export type FunnelsListFunnels404 = NotFoundError
export const FunnelsListFunnels404 = NotFoundError
export type FunnelsCreateFunnelRequestJson = { readonly "name": string, readonly "description"?: string | null | null, readonly "steps": ReadonlyArray<{ readonly "type"?: "event" | null, readonly "id": string, readonly "name": string, readonly "match": "all" | "any", readonly "filters": ReadonlyArray<{ readonly "field": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "starts_with" | "not_starts_with" | "ends_with" | "not_ends_with" | "greater_than" | "less_than", readonly "value": string | number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | boolean }> } | { readonly "type": "feature_flag", readonly "id": string, readonly "name": string, readonly "featureFlagId": string, readonly "flagKey": string, readonly "flagMatch": "set" | "unset" | "value", readonly "value"?: string | null }>, readonly "conversionWindowSeconds": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "strictOrder": boolean, readonly "timeRangeSeconds": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" }
export const FunnelsCreateFunnelRequestJson = Schema.Struct({ "name": Schema.String, "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "steps": Schema.Array(Schema.Union([Schema.Struct({ "type": Schema.optionalKey(Schema.Union([Schema.Literal("event"), Schema.Null])), "id": Schema.String, "name": Schema.String, "match": Schema.Literals(["all", "any"]), "filters": Schema.Array(Schema.Struct({ "field": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "starts_with", "not_starts_with", "ends_with", "not_ends_with", "greater_than", "less_than"]), "value": Schema.Union([Schema.String, Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Boolean]) })) }), Schema.Struct({ "type": Schema.Literal("feature_flag"), "id": Schema.String, "name": Schema.String, "featureFlagId": Schema.String, "flagKey": Schema.String, "flagMatch": Schema.Literals(["set", "unset", "value"]), "value": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })])), "conversionWindowSeconds": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "strictOrder": Schema.Boolean, "timeRangeSeconds": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })
export type FunnelsCreateFunnel200 = FunnelRecord
export const FunnelsCreateFunnel200 = FunnelRecord
export type FunnelsCreateFunnel400 = FunnelValidationError
export const FunnelsCreateFunnel400 = FunnelValidationError
export type FunnelsCreateFunnel401 = UnauthorizedError
export const FunnelsCreateFunnel401 = UnauthorizedError
export type FunnelsCreateFunnel403 = ForbiddenError
export const FunnelsCreateFunnel403 = ForbiddenError
export type FunnelsCreateFunnel404 = NotFoundError
export const FunnelsCreateFunnel404 = NotFoundError
export type FunnelsGetFunnel200 = FunnelDetail
export const FunnelsGetFunnel200 = FunnelDetail
export type FunnelsGetFunnel400 = FunnelValidationError
export const FunnelsGetFunnel400 = FunnelValidationError
export type FunnelsGetFunnel401 = UnauthorizedError
export const FunnelsGetFunnel401 = UnauthorizedError
export type FunnelsGetFunnel403 = ForbiddenError
export const FunnelsGetFunnel403 = ForbiddenError
export type FunnelsGetFunnel404 = NotFoundError
export const FunnelsGetFunnel404 = NotFoundError
export type FunnelsDeleteFunnel400 = FunnelValidationError
export const FunnelsDeleteFunnel400 = FunnelValidationError
export type FunnelsDeleteFunnel401 = UnauthorizedError
export const FunnelsDeleteFunnel401 = UnauthorizedError
export type FunnelsDeleteFunnel403 = ForbiddenError
export const FunnelsDeleteFunnel403 = ForbiddenError
export type FunnelsDeleteFunnel404 = NotFoundError
export const FunnelsDeleteFunnel404 = NotFoundError
export type FunnelsUpdateFunnelRequestJson = { readonly "name"?: string | null, readonly "description"?: string | null | null, readonly "steps"?: ReadonlyArray<{ readonly "type"?: "event" | null, readonly "id": string, readonly "name": string, readonly "match": "all" | "any", readonly "filters": ReadonlyArray<{ readonly "field": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "starts_with" | "not_starts_with" | "ends_with" | "not_ends_with" | "greater_than" | "less_than", readonly "value": string | number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | boolean }> } | { readonly "type": "feature_flag", readonly "id": string, readonly "name": string, readonly "featureFlagId": string, readonly "flagKey": string, readonly "flagMatch": "set" | "unset" | "value", readonly "value"?: string | null }> | null, readonly "conversionWindowSeconds"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "strictOrder"?: boolean | null, readonly "timeRangeSeconds"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null }
export const FunnelsUpdateFunnelRequestJson = Schema.Struct({ "name": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "steps": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Union([Schema.Struct({ "type": Schema.optionalKey(Schema.Union([Schema.Literal("event"), Schema.Null])), "id": Schema.String, "name": Schema.String, "match": Schema.Literals(["all", "any"]), "filters": Schema.Array(Schema.Struct({ "field": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "starts_with", "not_starts_with", "ends_with", "not_ends_with", "greater_than", "less_than"]), "value": Schema.Union([Schema.String, Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Boolean]) })) }), Schema.Struct({ "type": Schema.Literal("feature_flag"), "id": Schema.String, "name": Schema.String, "featureFlagId": Schema.String, "flagKey": Schema.String, "flagMatch": Schema.Literals(["set", "unset", "value"]), "value": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })])), Schema.Null])), "conversionWindowSeconds": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "strictOrder": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "timeRangeSeconds": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) })
export type FunnelsUpdateFunnel200 = FunnelRecord
export const FunnelsUpdateFunnel200 = FunnelRecord
export type FunnelsUpdateFunnel400 = FunnelValidationError
export const FunnelsUpdateFunnel400 = FunnelValidationError
export type FunnelsUpdateFunnel401 = UnauthorizedError
export const FunnelsUpdateFunnel401 = UnauthorizedError
export type FunnelsUpdateFunnel403 = ForbiddenError
export const FunnelsUpdateFunnel403 = ForbiddenError
export type FunnelsUpdateFunnel404 = NotFoundError
export const FunnelsUpdateFunnel404 = NotFoundError
export type FunnelsDuplicateFunnel200 = FunnelRecord
export const FunnelsDuplicateFunnel200 = FunnelRecord
export type FunnelsDuplicateFunnel400 = FunnelValidationError
export const FunnelsDuplicateFunnel400 = FunnelValidationError
export type FunnelsDuplicateFunnel401 = UnauthorizedError
export const FunnelsDuplicateFunnel401 = UnauthorizedError
export type FunnelsDuplicateFunnel403 = ForbiddenError
export const FunnelsDuplicateFunnel403 = ForbiddenError
export type FunnelsDuplicateFunnel404 = NotFoundError
export const FunnelsDuplicateFunnel404 = NotFoundError
export type ProjectsListProjectsParams = { readonly "ownerId"?: string | null, readonly "projectId"?: string | null, readonly "slug"?: string | null, readonly "search"?: string | null, readonly "limit"?: string | null, readonly "offset"?: string | null }
export const ProjectsListProjectsParams = Schema.Struct({ "ownerId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "projectId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "slug": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "search": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "limit": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "offset": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type ProjectsListProjects200 = { readonly "items": ReadonlyArray<{ readonly "id": string, readonly "name": string, readonly "errorTrackingEnabled": boolean, readonly "webVitalsEnabled": boolean, readonly "sessionReplaysEnabled": boolean, readonly "slug": string, readonly "private": boolean, readonly "templateId": string | null, readonly "createdAt": string, readonly "firstEventAt": string | null, readonly "ownerId": string, readonly "preferredChartColors": ReadonlyArray<string> | null }>, readonly "total": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "limit": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "offset": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "hasMore": boolean }
export const ProjectsListProjects200 = Schema.Struct({ "items": Schema.Array(Schema.Struct({ "id": Schema.String, "name": Schema.String, "errorTrackingEnabled": Schema.Boolean, "webVitalsEnabled": Schema.Boolean, "sessionReplaysEnabled": Schema.Boolean, "slug": Schema.String, "private": Schema.Boolean, "templateId": Schema.Union([Schema.String, Schema.Null]), "createdAt": Schema.String, "firstEventAt": Schema.Union([Schema.String, Schema.Null]), "ownerId": Schema.String, "preferredChartColors": Schema.Union([Schema.Array(Schema.String), Schema.Null]) })), "total": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "limit": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "offset": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "hasMore": Schema.Boolean })
export type ProjectsListPublicProjectsParams = { readonly "ownerId"?: string | null, readonly "ownerSlug"?: string | null, readonly "slug"?: string | null, readonly "search"?: string | null, readonly "limit"?: string | null, readonly "offset"?: string | null, readonly "sort"?: "createdAt" | "name" | "creator" | "online" | "total" | null, readonly "direction"?: "asc" | "desc" | null }
export const ProjectsListPublicProjectsParams = Schema.Struct({ "ownerId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "ownerSlug": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "slug": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "search": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "limit": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "offset": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "sort": Schema.optionalKey(Schema.Union([Schema.Literals(["createdAt", "name", "creator", "online", "total"]), Schema.Null])), "direction": Schema.optionalKey(Schema.Union([Schema.Literals(["asc", "desc"]), Schema.Null])) })
export type ProjectsListPublicProjects200 = { readonly "items": ReadonlyArray<{ readonly "id": string, readonly "name": string, readonly "slug": string, readonly "createdAt": string, readonly "ownerId": string, readonly "owner": { readonly "id": string, readonly "name": string, readonly "slug": string, readonly "image": string | null, readonly "type": "user" | "organization", readonly "createdAt": string } | null, readonly "templateId": string | null, readonly "online": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "total": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" }>, readonly "total": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "limit": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "offset": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "hasMore": boolean }
export const ProjectsListPublicProjects200 = Schema.Struct({ "items": Schema.Array(Schema.Struct({ "id": Schema.String, "name": Schema.String, "slug": Schema.String, "createdAt": Schema.String, "ownerId": Schema.String, "owner": Schema.Union([Schema.Struct({ "id": Schema.String, "name": Schema.String, "slug": Schema.String, "image": Schema.Union([Schema.String, Schema.Null]), "type": Schema.Literals(["user", "organization"]), "createdAt": Schema.String }), Schema.Null]), "templateId": Schema.Union([Schema.String, Schema.Null]), "online": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "total": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })), "total": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "limit": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "offset": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "hasMore": Schema.Boolean })
export type ProjectsGetProject200 = { readonly "id": string, readonly "name": string, readonly "allowedHostnames": ReadonlyArray<string> | null, readonly "errorTrackingEnabled": boolean, readonly "webVitalsEnabled": boolean, readonly "sessionReplaysEnabled": boolean, readonly "cookielessMode": boolean, readonly "searchConsoleSiteUrl": string | null, readonly "token": string | null, readonly "slug": string, readonly "private": boolean, readonly "templateId": string | null, readonly "preferredChartColors": ReadonlyArray<string> | null, readonly "codeContextConfig": { readonly "enabled": boolean, readonly "codebergApiUrl"?: string | null | null, readonly "repository": string | null, readonly "ref": string | null, readonly "mappings": ReadonlyArray<{ readonly "id": string, readonly "provider": "github" | "codeberg" | null, readonly "javaPrefix": string, readonly "repository": string | null, readonly "ref": string | null, readonly "pathPattern": string }> } | null, readonly "createdAt": string, readonly "firstEventAt": string | null, readonly "ownerId": string, readonly "owner"?: { readonly "id": string, readonly "name": string, readonly "slug": string, readonly "image": string | null, readonly "type": "user" | "organization", readonly "createdAt": string } | null | null } | { readonly "id": string, readonly "name": string, readonly "errorTrackingEnabled"?: boolean | null, readonly "webVitalsEnabled"?: boolean | null, readonly "sessionReplaysEnabled"?: boolean | null, readonly "slug": string, readonly "private": boolean, readonly "templateId": string | null, readonly "createdAt": string, readonly "firstEventAt": string | null, readonly "ownerId": string, readonly "owner": { readonly "id": string, readonly "name": string, readonly "slug": string, readonly "image": string | null, readonly "type": "user" | "organization", readonly "createdAt": string } | null, readonly "preferredChartColors": ReadonlyArray<string> | null }
export const ProjectsGetProject200 = Schema.Union([Schema.Struct({ "id": Schema.String, "name": Schema.String, "allowedHostnames": Schema.Union([Schema.Array(Schema.String), Schema.Null]), "errorTrackingEnabled": Schema.Boolean, "webVitalsEnabled": Schema.Boolean, "sessionReplaysEnabled": Schema.Boolean, "cookielessMode": Schema.Boolean, "searchConsoleSiteUrl": Schema.Union([Schema.String, Schema.Null]), "token": Schema.Union([Schema.String, Schema.Null]), "slug": Schema.String, "private": Schema.Boolean, "templateId": Schema.Union([Schema.String, Schema.Null]), "preferredChartColors": Schema.Union([Schema.Array(Schema.String), Schema.Null]), "codeContextConfig": Schema.Union([Schema.Struct({ "enabled": Schema.Boolean, "codebergApiUrl": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "repository": Schema.Union([Schema.String, Schema.Null]), "ref": Schema.Union([Schema.String, Schema.Null]), "mappings": Schema.Array(Schema.Struct({ "id": Schema.String, "provider": Schema.Union([Schema.Literals(["github", "codeberg"]), Schema.Null]), "javaPrefix": Schema.String, "repository": Schema.Union([Schema.String, Schema.Null]), "ref": Schema.Union([Schema.String, Schema.Null]), "pathPattern": Schema.String })) }), Schema.Null]), "createdAt": Schema.String, "firstEventAt": Schema.Union([Schema.String, Schema.Null]), "ownerId": Schema.String, "owner": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Struct({ "id": Schema.String, "name": Schema.String, "slug": Schema.String, "image": Schema.Union([Schema.String, Schema.Null]), "type": Schema.Literals(["user", "organization"]), "createdAt": Schema.String }), Schema.Null]), Schema.Null])) }), Schema.Struct({ "id": Schema.String, "name": Schema.String, "errorTrackingEnabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "webVitalsEnabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "sessionReplaysEnabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "slug": Schema.String, "private": Schema.Boolean, "templateId": Schema.Union([Schema.String, Schema.Null]), "createdAt": Schema.String, "firstEventAt": Schema.Union([Schema.String, Schema.Null]), "ownerId": Schema.String, "owner": Schema.Union([Schema.Struct({ "id": Schema.String, "name": Schema.String, "slug": Schema.String, "image": Schema.Union([Schema.String, Schema.Null]), "type": Schema.Literals(["user", "organization"]), "createdAt": Schema.String }), Schema.Null]), "preferredChartColors": Schema.Union([Schema.Array(Schema.String), Schema.Null]) })])
export type ProjectsGetProject400 = ProjectValidationError
export const ProjectsGetProject400 = ProjectValidationError
export type ProjectsGetProject401 = UnauthorizedError
export const ProjectsGetProject401 = UnauthorizedError
export type ProjectsGetProject403 = ForbiddenError
export const ProjectsGetProject403 = ForbiddenError
export type ProjectsGetProject404 = NotFoundError
export const ProjectsGetProject404 = NotFoundError
export type ProjectsGetProject409 = ProjectConflictError
export const ProjectsGetProject409 = ProjectConflictError
export type ProjectsCreateProjectRequestJson = { readonly "name": string, readonly "private": boolean, readonly "templateId"?: string | null | null, readonly "allowedHostnames"?: ReadonlyArray<string> | null | null }
export const ProjectsCreateProjectRequestJson = Schema.Struct({ "name": Schema.String, "private": Schema.Boolean, "templateId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "allowedHostnames": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Array(Schema.String), Schema.Null]), Schema.Null])) })
export type ProjectsCreateProject200 = { readonly "id": string, readonly "name": string, readonly "allowedHostnames": ReadonlyArray<string> | null, readonly "errorTrackingEnabled": boolean, readonly "webVitalsEnabled": boolean, readonly "sessionReplaysEnabled": boolean, readonly "cookielessMode": boolean, readonly "searchConsoleSiteUrl": string | null, readonly "token": string | null, readonly "slug": string, readonly "private": boolean, readonly "templateId": string | null, readonly "preferredChartColors": ReadonlyArray<string> | null, readonly "codeContextConfig": { readonly "enabled": boolean, readonly "codebergApiUrl"?: string | null | null, readonly "repository": string | null, readonly "ref": string | null, readonly "mappings": ReadonlyArray<{ readonly "id": string, readonly "provider": "github" | "codeberg" | null, readonly "javaPrefix": string, readonly "repository": string | null, readonly "ref": string | null, readonly "pathPattern": string }> } | null, readonly "createdAt": string, readonly "firstEventAt": string | null, readonly "ownerId": string, readonly "owner"?: { readonly "id": string, readonly "name": string, readonly "slug": string, readonly "image": string | null, readonly "type": "user" | "organization", readonly "createdAt": string } | null | null }
export const ProjectsCreateProject200 = Schema.Struct({ "id": Schema.String, "name": Schema.String, "allowedHostnames": Schema.Union([Schema.Array(Schema.String), Schema.Null]), "errorTrackingEnabled": Schema.Boolean, "webVitalsEnabled": Schema.Boolean, "sessionReplaysEnabled": Schema.Boolean, "cookielessMode": Schema.Boolean, "searchConsoleSiteUrl": Schema.Union([Schema.String, Schema.Null]), "token": Schema.Union([Schema.String, Schema.Null]), "slug": Schema.String, "private": Schema.Boolean, "templateId": Schema.Union([Schema.String, Schema.Null]), "preferredChartColors": Schema.Union([Schema.Array(Schema.String), Schema.Null]), "codeContextConfig": Schema.Union([Schema.Struct({ "enabled": Schema.Boolean, "codebergApiUrl": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "repository": Schema.Union([Schema.String, Schema.Null]), "ref": Schema.Union([Schema.String, Schema.Null]), "mappings": Schema.Array(Schema.Struct({ "id": Schema.String, "provider": Schema.Union([Schema.Literals(["github", "codeberg"]), Schema.Null]), "javaPrefix": Schema.String, "repository": Schema.Union([Schema.String, Schema.Null]), "ref": Schema.Union([Schema.String, Schema.Null]), "pathPattern": Schema.String })) }), Schema.Null]), "createdAt": Schema.String, "firstEventAt": Schema.Union([Schema.String, Schema.Null]), "ownerId": Schema.String, "owner": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Struct({ "id": Schema.String, "name": Schema.String, "slug": Schema.String, "image": Schema.Union([Schema.String, Schema.Null]), "type": Schema.Literals(["user", "organization"]), "createdAt": Schema.String }), Schema.Null]), Schema.Null])) })
export type ProjectsCreateProject400 = ProjectValidationError
export const ProjectsCreateProject400 = ProjectValidationError
export type ProjectsCreateProject401 = UnauthorizedError
export const ProjectsCreateProject401 = UnauthorizedError
export type ProjectsCreateProject403 = ForbiddenError
export const ProjectsCreateProject403 = ForbiddenError
export type ProjectsCreateProject404 = NotFoundError
export const ProjectsCreateProject404 = NotFoundError
export type ProjectsCreateProject409 = ProjectConflictError
export const ProjectsCreateProject409 = ProjectConflictError
export type ProjectsDeleteProjectRequestJson = { readonly "password": string }
export const ProjectsDeleteProjectRequestJson = Schema.Struct({ "password": Schema.String })
export type ProjectsDeleteProject400 = ProjectValidationError
export const ProjectsDeleteProject400 = ProjectValidationError
export type ProjectsDeleteProject401 = UnauthorizedError
export const ProjectsDeleteProject401 = UnauthorizedError
export type ProjectsDeleteProject403 = ForbiddenError
export const ProjectsDeleteProject403 = ForbiddenError
export type ProjectsDeleteProject404 = NotFoundError
export const ProjectsDeleteProject404 = NotFoundError
export type ProjectsDeleteProject409 = ProjectConflictError
export const ProjectsDeleteProject409 = ProjectConflictError
export type ProjectsUpdateProjectRequestJson = { readonly "name"?: string | null, readonly "slug"?: string | null, readonly "private"?: boolean | null, readonly "allowedHostnames"?: ReadonlyArray<string> | null | null, readonly "errorTrackingEnabled"?: boolean | null, readonly "webVitalsEnabled"?: boolean | null, readonly "sessionReplaysEnabled"?: boolean | null, readonly "cookielessMode"?: boolean | null, readonly "searchConsoleSiteUrl"?: string | null | null, readonly "preferredChartColors"?: ReadonlyArray<string> | null | null, readonly "codeContextConfig"?: { readonly "enabled": boolean, readonly "codebergApiUrl"?: string | null | null, readonly "repository": string | null, readonly "ref": string | null, readonly "mappings": ReadonlyArray<{ readonly "id": string, readonly "provider": "github" | "codeberg" | null, readonly "javaPrefix": string, readonly "repository": string | null, readonly "ref": string | null, readonly "pathPattern": string }> } | null | null }
export const ProjectsUpdateProjectRequestJson = Schema.Struct({ "name": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "slug": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "private": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "allowedHostnames": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Array(Schema.String), Schema.Null]), Schema.Null])), "errorTrackingEnabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "webVitalsEnabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "sessionReplaysEnabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "cookielessMode": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "searchConsoleSiteUrl": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "preferredChartColors": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Array(Schema.String), Schema.Null]), Schema.Null])), "codeContextConfig": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Struct({ "enabled": Schema.Boolean, "codebergApiUrl": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "repository": Schema.Union([Schema.String, Schema.Null]), "ref": Schema.Union([Schema.String, Schema.Null]), "mappings": Schema.Array(Schema.Struct({ "id": Schema.String, "provider": Schema.Union([Schema.Literals(["github", "codeberg"]), Schema.Null]), "javaPrefix": Schema.String, "repository": Schema.Union([Schema.String, Schema.Null]), "ref": Schema.Union([Schema.String, Schema.Null]), "pathPattern": Schema.String })) }), Schema.Null]), Schema.Null])) })
export type ProjectsUpdateProject200 = { readonly "id": string, readonly "name": string, readonly "allowedHostnames": ReadonlyArray<string> | null, readonly "errorTrackingEnabled": boolean, readonly "webVitalsEnabled": boolean, readonly "sessionReplaysEnabled": boolean, readonly "cookielessMode": boolean, readonly "searchConsoleSiteUrl": string | null, readonly "token": string | null, readonly "slug": string, readonly "private": boolean, readonly "templateId": string | null, readonly "preferredChartColors": ReadonlyArray<string> | null, readonly "codeContextConfig": { readonly "enabled": boolean, readonly "codebergApiUrl"?: string | null | null, readonly "repository": string | null, readonly "ref": string | null, readonly "mappings": ReadonlyArray<{ readonly "id": string, readonly "provider": "github" | "codeberg" | null, readonly "javaPrefix": string, readonly "repository": string | null, readonly "ref": string | null, readonly "pathPattern": string }> } | null, readonly "createdAt": string, readonly "firstEventAt": string | null, readonly "ownerId": string, readonly "owner"?: { readonly "id": string, readonly "name": string, readonly "slug": string, readonly "image": string | null, readonly "type": "user" | "organization", readonly "createdAt": string } | null | null }
export const ProjectsUpdateProject200 = Schema.Struct({ "id": Schema.String, "name": Schema.String, "allowedHostnames": Schema.Union([Schema.Array(Schema.String), Schema.Null]), "errorTrackingEnabled": Schema.Boolean, "webVitalsEnabled": Schema.Boolean, "sessionReplaysEnabled": Schema.Boolean, "cookielessMode": Schema.Boolean, "searchConsoleSiteUrl": Schema.Union([Schema.String, Schema.Null]), "token": Schema.Union([Schema.String, Schema.Null]), "slug": Schema.String, "private": Schema.Boolean, "templateId": Schema.Union([Schema.String, Schema.Null]), "preferredChartColors": Schema.Union([Schema.Array(Schema.String), Schema.Null]), "codeContextConfig": Schema.Union([Schema.Struct({ "enabled": Schema.Boolean, "codebergApiUrl": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "repository": Schema.Union([Schema.String, Schema.Null]), "ref": Schema.Union([Schema.String, Schema.Null]), "mappings": Schema.Array(Schema.Struct({ "id": Schema.String, "provider": Schema.Union([Schema.Literals(["github", "codeberg"]), Schema.Null]), "javaPrefix": Schema.String, "repository": Schema.Union([Schema.String, Schema.Null]), "ref": Schema.Union([Schema.String, Schema.Null]), "pathPattern": Schema.String })) }), Schema.Null]), "createdAt": Schema.String, "firstEventAt": Schema.Union([Schema.String, Schema.Null]), "ownerId": Schema.String, "owner": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Struct({ "id": Schema.String, "name": Schema.String, "slug": Schema.String, "image": Schema.Union([Schema.String, Schema.Null]), "type": Schema.Literals(["user", "organization"]), "createdAt": Schema.String }), Schema.Null]), Schema.Null])) })
export type ProjectsUpdateProject400 = ProjectValidationError
export const ProjectsUpdateProject400 = ProjectValidationError
export type ProjectsUpdateProject401 = UnauthorizedError
export const ProjectsUpdateProject401 = UnauthorizedError
export type ProjectsUpdateProject403 = ForbiddenError
export const ProjectsUpdateProject403 = ForbiddenError
export type ProjectsUpdateProject404 = NotFoundError
export const ProjectsUpdateProject404 = NotFoundError
export type ProjectsUpdateProject409 = ProjectConflictError
export const ProjectsUpdateProject409 = ProjectConflictError
export type ProjectsCheckSlugAvailabilityParams = { readonly "slug": string, readonly "excludeProjectId"?: string | null }
export const ProjectsCheckSlugAvailabilityParams = Schema.Struct({ "slug": Schema.String, "excludeProjectId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type ProjectsCheckSlugAvailability200 = { readonly "available": boolean, readonly "reason"?: string | null }
export const ProjectsCheckSlugAvailability200 = Schema.Struct({ "available": Schema.Boolean, "reason": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type ProjectsCheckSlugAvailability400 = ProjectValidationError
export const ProjectsCheckSlugAvailability400 = ProjectValidationError
export type ProjectsCheckSlugAvailability401 = UnauthorizedError
export const ProjectsCheckSlugAvailability401 = UnauthorizedError
export type ProjectsCheckSlugAvailability403 = ForbiddenError
export const ProjectsCheckSlugAvailability403 = ForbiddenError
export type ProjectsCheckSlugAvailability404 = NotFoundError
export const ProjectsCheckSlugAvailability404 = NotFoundError
export type ProjectsCheckSlugAvailability409 = ProjectConflictError
export const ProjectsCheckSlugAvailability409 = ProjectConflictError
export type ProjectsMoveProjectRequestJson = { readonly "targetOwnerId": string | null }
export const ProjectsMoveProjectRequestJson = Schema.Struct({ "targetOwnerId": Schema.Union([Schema.String, Schema.Null]) })
export type ProjectsMoveProject400 = ProjectValidationError
export const ProjectsMoveProject400 = ProjectValidationError
export type ProjectsMoveProject401 = UnauthorizedError
export const ProjectsMoveProject401 = UnauthorizedError
export type ProjectsMoveProject403 = ForbiddenError
export const ProjectsMoveProject403 = ForbiddenError
export type ProjectsMoveProject404 = NotFoundError
export const ProjectsMoveProject404 = NotFoundError
export type ProjectsMoveProject409 = ProjectConflictError
export const ProjectsMoveProject409 = ProjectConflictError
export type ProjectsWipeProjectDataRequestJson = { readonly "password": string }
export const ProjectsWipeProjectDataRequestJson = Schema.Struct({ "password": Schema.String })
export type ProjectsWipeProjectData400 = ProjectValidationError
export const ProjectsWipeProjectData400 = ProjectValidationError
export type ProjectsWipeProjectData401 = UnauthorizedError
export const ProjectsWipeProjectData401 = UnauthorizedError
export type ProjectsWipeProjectData403 = ForbiddenError
export const ProjectsWipeProjectData403 = ForbiddenError
export type ProjectsWipeProjectData404 = NotFoundError
export const ProjectsWipeProjectData404 = NotFoundError
export type ProjectsWipeProjectData409 = ProjectConflictError
export const ProjectsWipeProjectData409 = ProjectConflictError
export type RetentionGetRetentionForProjectParams = { readonly "granularity"?: "day" | "week" | null, readonly "cohortFrom": string, readonly "cohortTo": string, readonly "periodCount"?: string | null, readonly "filters"?: ReadonlyArray<RetentionFilter> | string | null, readonly "filterMatch"?: "all" | "any" | null, readonly "source": "web" | "mods" }
export const RetentionGetRetentionForProjectParams = Schema.Struct({ "granularity": Schema.optionalKey(Schema.Union([Schema.Literals(["day", "week"]), Schema.Null])), "cohortFrom": Schema.String, "cohortTo": Schema.String, "periodCount": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "filters": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Array(RetentionFilter), Schema.String]), Schema.Null])), "filterMatch": Schema.optionalKey(Schema.Union([Schema.Literals(["all", "any"]), Schema.Null])), "source": Schema.Literals(["web", "mods"]) })
export type RetentionGetRetentionForProject200 = ReadonlyArray<RetentionCohortData>
export const RetentionGetRetentionForProject200 = Schema.Array(RetentionCohortData)
export type RetentionGetRetentionForProject401 = UnauthorizedError
export const RetentionGetRetentionForProject401 = UnauthorizedError
export type RetentionGetRetentionForProject403 = ForbiddenError
export const RetentionGetRetentionForProject403 = ForbiddenError
export type RetentionGetRetentionForProject404 = NotFoundError
export const RetentionGetRetentionForProject404 = NotFoundError
export type RetentionGetRetentionDriversForProjectParams = { readonly "granularity"?: "day" | "week" | null, readonly "cohortFrom": string, readonly "cohortTo": string, readonly "targetPeriod"?: string | null, readonly "source": "web" | "mods", readonly "minSegmentUsers"?: string | null }
export const RetentionGetRetentionDriversForProjectParams = Schema.Struct({ "granularity": Schema.optionalKey(Schema.Union([Schema.Literals(["day", "week"]), Schema.Null])), "cohortFrom": Schema.String, "cohortTo": Schema.String, "targetPeriod": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "source": Schema.Literals(["web", "mods"]), "minSegmentUsers": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type RetentionGetRetentionDriversForProject200 = ReadonlyArray<RetentionDriverData>
export const RetentionGetRetentionDriversForProject200 = Schema.Array(RetentionDriverData)
export type RetentionGetRetentionDriversForProject401 = UnauthorizedError
export const RetentionGetRetentionDriversForProject401 = UnauthorizedError
export type RetentionGetRetentionDriversForProject403 = ForbiddenError
export const RetentionGetRetentionDriversForProject403 = ForbiddenError
export type RetentionGetRetentionDriversForProject404 = NotFoundError
export const RetentionGetRetentionDriversForProject404 = NotFoundError
export type SpotlightGetSpotlightProjects200 = ReadonlyArray<{ readonly "id": string, readonly "name": string, readonly "slug": string, readonly "ownerName": string, readonly "activeServers": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" }>
export const SpotlightGetSpotlightProjects200 = Schema.Array(Schema.Struct({ "id": Schema.String, "name": Schema.String, "slug": Schema.String, "ownerName": Schema.String, "activeServers": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }))
export type WebVitalsGetWebVitalsForProjectParams = { readonly "from"?: string | null, readonly "to"?: string | null }
export const WebVitalsGetWebVitalsForProjectParams = Schema.Struct({ "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type WebVitalsGetWebVitalsForProject200 = ReadonlyArray<WebVitalData>
export const WebVitalsGetWebVitalsForProject200 = Schema.Array(WebVitalData)
export type WebVitalsGetWebVitalsForProject401 = UnauthorizedError
export const WebVitalsGetWebVitalsForProject401 = UnauthorizedError
export type WebVitalsGetWebVitalsForProject403 = ForbiddenError
export const WebVitalsGetWebVitalsForProject403 = ForbiddenError
export type WebVitalsGetWebVitalsForProject404 = NotFoundError
export const WebVitalsGetWebVitalsForProject404 = NotFoundError
export type WebVitalsGetBuildDeploymentsForProjectParams = { readonly "from"?: string | null, readonly "to"?: string | null }
export const WebVitalsGetBuildDeploymentsForProjectParams = Schema.Struct({ "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type WebVitalsGetBuildDeploymentsForProject200 = ReadonlyArray<BuildDeploymentData>
export const WebVitalsGetBuildDeploymentsForProject200 = Schema.Array(BuildDeploymentData)
export type WebVitalsGetBuildDeploymentsForProject401 = UnauthorizedError
export const WebVitalsGetBuildDeploymentsForProject401 = UnauthorizedError
export type WebVitalsGetBuildDeploymentsForProject403 = ForbiddenError
export const WebVitalsGetBuildDeploymentsForProject403 = ForbiddenError
export type WebVitalsGetBuildDeploymentsForProject404 = NotFoundError
export const WebVitalsGetBuildDeploymentsForProject404 = NotFoundError
export type WebVitalsGetWebVitalsTrendsParams = { readonly "from"?: string | null, readonly "to"?: string | null, readonly "bucketMs"?: string | null, readonly "device"?: string | null, readonly "browser"?: string | null, readonly "os"?: string | null, readonly "country"?: string | null, readonly "route"?: string | null }
export const WebVitalsGetWebVitalsTrendsParams = Schema.Struct({ "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "bucketMs": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "device": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "browser": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "os": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "country": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "route": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type WebVitalsGetWebVitalsTrends200 = ReadonlyArray<WebVitalsTrendPoint>
export const WebVitalsGetWebVitalsTrends200 = Schema.Array(WebVitalsTrendPoint)
export type WebVitalsGetWebVitalsTrends401 = UnauthorizedError
export const WebVitalsGetWebVitalsTrends401 = UnauthorizedError
export type WebVitalsGetWebVitalsTrends403 = ForbiddenError
export const WebVitalsGetWebVitalsTrends403 = ForbiddenError
export type WebVitalsGetWebVitalsTrends404 = NotFoundError
export const WebVitalsGetWebVitalsTrends404 = NotFoundError

export interface OperationConfig {
  /**
   * Whether or not the response should be included in the value returned from
   * an operation.
   *
   * If set to `true`, a tuple of `[A, HttpClientResponse]` will be returned,
   * where `A` is the success type of the operation.
   *
   * If set to `false`, only the success type of the operation will be returned.
   */
  readonly includeResponse?: boolean | undefined
}

/**
 * A utility type which optionally includes the response in the return result
 * of an operation based upon the value of the `includeResponse` configuration
 * option.
 */
export type WithOptionalResponse<A, Config extends OperationConfig> = Config extends {
  readonly includeResponse: true
} ? [A, HttpClientResponse.HttpClientResponse] : A

export const make = (
  httpClient: HttpClient.HttpClient,
  options: {
    readonly transformClient?: ((client: HttpClient.HttpClient) => Effect.Effect<HttpClient.HttpClient>) | undefined
  } = {}
): Api => {
  const unexpectedStatus = (response: HttpClientResponse.HttpClientResponse) =>
    Effect.flatMap(
      Effect.orElseSucceed(response.json, () => "Unexpected status code"),
      (description) =>
        Effect.fail(
          new HttpClientError.HttpClientError({
            reason: new HttpClientError.StatusCodeError({
              request: response.request,
              response,
              description: typeof description === "string" ? description : JSON.stringify(description),
            }),
          }),
        ),
    )
  const withResponse = <Config extends OperationConfig>(config: Config | undefined) => (
    f: (response: HttpClientResponse.HttpClientResponse) => Effect.Effect<any, any>,
  ): (request: HttpClientRequest.HttpClientRequest) => Effect.Effect<any, any> => {
    const withOptionalResponse = (
      config?.includeResponse
        ? (response: HttpClientResponse.HttpClientResponse) => Effect.map(f(response), (a) => [a, response])
        : (response: HttpClientResponse.HttpClientResponse) => f(response)
    ) as any
    return options?.transformClient
      ? (request) =>
          Effect.flatMap(
            Effect.flatMap(options.transformClient!(httpClient), (client) => client.execute(request)),
            withOptionalResponse
          )
      : (request) => Effect.flatMap(httpClient.execute(request), withOptionalResponse)
  }
  const decodeSuccess =
    <Schema extends Schema.Top>(schema: Schema) =>
    (response: HttpClientResponse.HttpClientResponse) =>
      HttpClientResponse.schemaBodyJson(schema)(response)
  const decodeError =
    <const Tag extends string, Schema extends Schema.Top>(tag: Tag, schema: Schema) =>
    (response: HttpClientResponse.HttpClientResponse) =>
      Effect.flatMap(
        HttpClientResponse.schemaBodyJson(schema)(response),
        (cause) => Effect.fail(ApiError(tag, cause, response)),
      )
  return {
    httpClient,
    "DashboardsListDashboards": (projectIdOrSlug, options) => HttpClientRequest.get(`/v0/project/${projectIdOrSlug}/dashboards`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DashboardsListDashboards200),
      "400": decodeError("DashboardsListDashboards400", DashboardsListDashboards400),
      "401": decodeError("DashboardsListDashboards401", DashboardsListDashboards401),
      "403": decodeError("DashboardsListDashboards403", DashboardsListDashboards403),
      "404": decodeError("DashboardsListDashboards404", DashboardsListDashboards404),
      orElse: unexpectedStatus
    }))
  ),
    "DashboardsCreateDashboard": (projectIdOrSlug, options) => HttpClientRequest.post(`/v0/project/${projectIdOrSlug}/dashboards`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DashboardsCreateDashboard200),
      "400": decodeError("DashboardsCreateDashboard400", DashboardsCreateDashboard400),
      "401": decodeError("DashboardsCreateDashboard401", DashboardsCreateDashboard401),
      "403": decodeError("DashboardsCreateDashboard403", DashboardsCreateDashboard403),
      "404": decodeError("DashboardsCreateDashboard404", DashboardsCreateDashboard404),
      orElse: unexpectedStatus
    }))
  ),
    "DashboardsReorderDashboards": (projectIdOrSlug, options) => HttpClientRequest.patch(`/v0/project/${projectIdOrSlug}/dashboards/reorder`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("DashboardsReorderDashboards400", DashboardsReorderDashboards400),
      "401": decodeError("DashboardsReorderDashboards401", DashboardsReorderDashboards401),
      "403": decodeError("DashboardsReorderDashboards403", DashboardsReorderDashboards403),
      "404": decodeError("DashboardsReorderDashboards404", DashboardsReorderDashboards404),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "DashboardsDuplicateDashboard": (projectIdOrSlug, id, options) => HttpClientRequest.post(`/v0/project/${projectIdOrSlug}/dashboards/${id}/duplicate`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DashboardsDuplicateDashboard200),
      "400": decodeError("DashboardsDuplicateDashboard400", DashboardsDuplicateDashboard400),
      "401": decodeError("DashboardsDuplicateDashboard401", DashboardsDuplicateDashboard401),
      "403": decodeError("DashboardsDuplicateDashboard403", DashboardsDuplicateDashboard403),
      "404": decodeError("DashboardsDuplicateDashboard404", DashboardsDuplicateDashboard404),
      orElse: unexpectedStatus
    }))
  ),
    "DashboardsCopyDashboard": (projectIdOrSlug, id, options) => HttpClientRequest.post(`/v0/project/${projectIdOrSlug}/dashboards/${id}/copy`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DashboardsCopyDashboard200),
      "400": decodeError("DashboardsCopyDashboard400", DashboardsCopyDashboard400),
      "401": decodeError("DashboardsCopyDashboard401", DashboardsCopyDashboard401),
      "403": decodeError("DashboardsCopyDashboard403", DashboardsCopyDashboard403),
      "404": decodeError("DashboardsCopyDashboard404", DashboardsCopyDashboard404),
      orElse: unexpectedStatus
    }))
  ),
    "DashboardsDeleteDashboard": (projectIdOrSlug, id, options) => HttpClientRequest.delete(`/v0/project/${projectIdOrSlug}/dashboards/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("DashboardsDeleteDashboard400", DashboardsDeleteDashboard400),
      "401": decodeError("DashboardsDeleteDashboard401", DashboardsDeleteDashboard401),
      "403": decodeError("DashboardsDeleteDashboard403", DashboardsDeleteDashboard403),
      "404": decodeError("DashboardsDeleteDashboard404", DashboardsDeleteDashboard404),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "DashboardsUpdateDashboard": (projectIdOrSlug, id, options) => HttpClientRequest.patch(`/v0/project/${projectIdOrSlug}/dashboards/${id}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DashboardsUpdateDashboard200),
      "400": decodeError("DashboardsUpdateDashboard400", DashboardsUpdateDashboard400),
      "401": decodeError("DashboardsUpdateDashboard401", DashboardsUpdateDashboard401),
      "403": decodeError("DashboardsUpdateDashboard403", DashboardsUpdateDashboard403),
      "404": decodeError("DashboardsUpdateDashboard404", DashboardsUpdateDashboard404),
      orElse: unexpectedStatus
    }))
  ),
    "DownloadsGetDownloadAnalytics": (projectIdOrSlug, options) => HttpClientRequest.get(`/v0/project/${projectIdOrSlug}/downloads`).pipe(
    HttpClientRequest.setUrlParams({ "dateFrom": options?.params?.["dateFrom"] as any, "dateTo": options?.params?.["dateTo"] as any, "versionNumber": options?.params?.["versionNumber"] as any, "granularity": options?.params?.["granularity"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DownloadsGetDownloadAnalytics200),
      "401": decodeError("DownloadsGetDownloadAnalytics401", DownloadsGetDownloadAnalytics401),
      "403": decodeError("DownloadsGetDownloadAnalytics403", DownloadsGetDownloadAnalytics403),
      "404": decodeError("DownloadsGetDownloadAnalytics404", DownloadsGetDownloadAnalytics404),
      orElse: unexpectedStatus
    }))
  ),
    "EventExplorerGetEventExplorerRows": (projectIdOrSlug, options) => HttpClientRequest.get(`/v0/project/${projectIdOrSlug}/events`).pipe(
    HttpClientRequest.setUrlParams({ "templateId": options?.params?.["templateId"] as any, "mode": options?.params?.["mode"] as any, "page": options?.params?.["page"] as any, "pageSize": options?.params?.["pageSize"] as any, "fromTime": options?.params?.["fromTime"] as any, "toTime": options?.params?.["toTime"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(EventExplorerGetEventExplorerRows200),
      "401": decodeError("EventExplorerGetEventExplorerRows401", EventExplorerGetEventExplorerRows401),
      "403": decodeError("EventExplorerGetEventExplorerRows403", EventExplorerGetEventExplorerRows403),
      "404": decodeError("EventExplorerGetEventExplorerRows404", EventExplorerGetEventExplorerRows404),
      orElse: unexpectedStatus
    }))
  ),
    "FunnelsListFunnels": (projectIdOrSlug, options) => HttpClientRequest.get(`/v0/project/${projectIdOrSlug}/funnels`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FunnelsListFunnels200),
      "400": decodeError("FunnelsListFunnels400", FunnelsListFunnels400),
      "401": decodeError("FunnelsListFunnels401", FunnelsListFunnels401),
      "403": decodeError("FunnelsListFunnels403", FunnelsListFunnels403),
      "404": decodeError("FunnelsListFunnels404", FunnelsListFunnels404),
      orElse: unexpectedStatus
    }))
  ),
    "FunnelsCreateFunnel": (projectIdOrSlug, options) => HttpClientRequest.post(`/v0/project/${projectIdOrSlug}/funnels`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FunnelsCreateFunnel200),
      "400": decodeError("FunnelsCreateFunnel400", FunnelsCreateFunnel400),
      "401": decodeError("FunnelsCreateFunnel401", FunnelsCreateFunnel401),
      "403": decodeError("FunnelsCreateFunnel403", FunnelsCreateFunnel403),
      "404": decodeError("FunnelsCreateFunnel404", FunnelsCreateFunnel404),
      orElse: unexpectedStatus
    }))
  ),
    "FunnelsGetFunnel": (projectIdOrSlug, id, options) => HttpClientRequest.get(`/v0/project/${projectIdOrSlug}/funnels/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FunnelsGetFunnel200),
      "400": decodeError("FunnelsGetFunnel400", FunnelsGetFunnel400),
      "401": decodeError("FunnelsGetFunnel401", FunnelsGetFunnel401),
      "403": decodeError("FunnelsGetFunnel403", FunnelsGetFunnel403),
      "404": decodeError("FunnelsGetFunnel404", FunnelsGetFunnel404),
      orElse: unexpectedStatus
    }))
  ),
    "FunnelsDeleteFunnel": (projectIdOrSlug, id, options) => HttpClientRequest.delete(`/v0/project/${projectIdOrSlug}/funnels/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("FunnelsDeleteFunnel400", FunnelsDeleteFunnel400),
      "401": decodeError("FunnelsDeleteFunnel401", FunnelsDeleteFunnel401),
      "403": decodeError("FunnelsDeleteFunnel403", FunnelsDeleteFunnel403),
      "404": decodeError("FunnelsDeleteFunnel404", FunnelsDeleteFunnel404),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "FunnelsUpdateFunnel": (projectIdOrSlug, id, options) => HttpClientRequest.patch(`/v0/project/${projectIdOrSlug}/funnels/${id}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FunnelsUpdateFunnel200),
      "400": decodeError("FunnelsUpdateFunnel400", FunnelsUpdateFunnel400),
      "401": decodeError("FunnelsUpdateFunnel401", FunnelsUpdateFunnel401),
      "403": decodeError("FunnelsUpdateFunnel403", FunnelsUpdateFunnel403),
      "404": decodeError("FunnelsUpdateFunnel404", FunnelsUpdateFunnel404),
      orElse: unexpectedStatus
    }))
  ),
    "FunnelsDuplicateFunnel": (projectIdOrSlug, id, options) => HttpClientRequest.post(`/v0/project/${projectIdOrSlug}/funnels/${id}/duplicate`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FunnelsDuplicateFunnel200),
      "400": decodeError("FunnelsDuplicateFunnel400", FunnelsDuplicateFunnel400),
      "401": decodeError("FunnelsDuplicateFunnel401", FunnelsDuplicateFunnel401),
      "403": decodeError("FunnelsDuplicateFunnel403", FunnelsDuplicateFunnel403),
      "404": decodeError("FunnelsDuplicateFunnel404", FunnelsDuplicateFunnel404),
      orElse: unexpectedStatus
    }))
  ),
    "ProjectsListProjects": (options) => HttpClientRequest.get(`/v0/projects`).pipe(
    HttpClientRequest.setUrlParams({ "ownerId": options?.params?.["ownerId"] as any, "projectId": options?.params?.["projectId"] as any, "slug": options?.params?.["slug"] as any, "search": options?.params?.["search"] as any, "limit": options?.params?.["limit"] as any, "offset": options?.params?.["offset"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ProjectsListProjects200),
      orElse: unexpectedStatus
    }))
  ),
    "ProjectsListPublicProjects": (options) => HttpClientRequest.get(`/v0/public-projects`).pipe(
    HttpClientRequest.setUrlParams({ "ownerId": options?.params?.["ownerId"] as any, "ownerSlug": options?.params?.["ownerSlug"] as any, "slug": options?.params?.["slug"] as any, "search": options?.params?.["search"] as any, "limit": options?.params?.["limit"] as any, "offset": options?.params?.["offset"] as any, "sort": options?.params?.["sort"] as any, "direction": options?.params?.["direction"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ProjectsListPublicProjects200),
      orElse: unexpectedStatus
    }))
  ),
    "ProjectsGetProject": (idOrSlug, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ProjectsGetProject200),
      "400": decodeError("ProjectsGetProject400", ProjectsGetProject400),
      "401": decodeError("ProjectsGetProject401", ProjectsGetProject401),
      "403": decodeError("ProjectsGetProject403", ProjectsGetProject403),
      "404": decodeError("ProjectsGetProject404", ProjectsGetProject404),
      "409": decodeError("ProjectsGetProject409", ProjectsGetProject409),
      orElse: unexpectedStatus
    }))
  ),
    "ProjectsCreateProject": (options) => HttpClientRequest.post(`/v0/project`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ProjectsCreateProject200),
      "400": decodeError("ProjectsCreateProject400", ProjectsCreateProject400),
      "401": decodeError("ProjectsCreateProject401", ProjectsCreateProject401),
      "403": decodeError("ProjectsCreateProject403", ProjectsCreateProject403),
      "404": decodeError("ProjectsCreateProject404", ProjectsCreateProject404),
      "409": decodeError("ProjectsCreateProject409", ProjectsCreateProject409),
      orElse: unexpectedStatus
    }))
  ),
    "ProjectsDeleteProject": (id, options) => HttpClientRequest.delete(`/v0/project/${id}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("ProjectsDeleteProject400", ProjectsDeleteProject400),
      "401": decodeError("ProjectsDeleteProject401", ProjectsDeleteProject401),
      "403": decodeError("ProjectsDeleteProject403", ProjectsDeleteProject403),
      "404": decodeError("ProjectsDeleteProject404", ProjectsDeleteProject404),
      "409": decodeError("ProjectsDeleteProject409", ProjectsDeleteProject409),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "ProjectsUpdateProject": (id, options) => HttpClientRequest.patch(`/v0/project/${id}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ProjectsUpdateProject200),
      "400": decodeError("ProjectsUpdateProject400", ProjectsUpdateProject400),
      "401": decodeError("ProjectsUpdateProject401", ProjectsUpdateProject401),
      "403": decodeError("ProjectsUpdateProject403", ProjectsUpdateProject403),
      "404": decodeError("ProjectsUpdateProject404", ProjectsUpdateProject404),
      "409": decodeError("ProjectsUpdateProject409", ProjectsUpdateProject409),
      orElse: unexpectedStatus
    }))
  ),
    "ProjectsCheckSlugAvailability": (options) => HttpClientRequest.get(`/v0/project-slug`).pipe(
    HttpClientRequest.setUrlParams({ "slug": options.params["slug"] as any, "excludeProjectId": options.params["excludeProjectId"] as any }),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ProjectsCheckSlugAvailability200),
      "400": decodeError("ProjectsCheckSlugAvailability400", ProjectsCheckSlugAvailability400),
      "401": decodeError("ProjectsCheckSlugAvailability401", ProjectsCheckSlugAvailability401),
      "403": decodeError("ProjectsCheckSlugAvailability403", ProjectsCheckSlugAvailability403),
      "404": decodeError("ProjectsCheckSlugAvailability404", ProjectsCheckSlugAvailability404),
      "409": decodeError("ProjectsCheckSlugAvailability409", ProjectsCheckSlugAvailability409),
      orElse: unexpectedStatus
    }))
  ),
    "ProjectsMoveProject": (id, options) => HttpClientRequest.patch(`/v0/project/${id}/owner`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("ProjectsMoveProject400", ProjectsMoveProject400),
      "401": decodeError("ProjectsMoveProject401", ProjectsMoveProject401),
      "403": decodeError("ProjectsMoveProject403", ProjectsMoveProject403),
      "404": decodeError("ProjectsMoveProject404", ProjectsMoveProject404),
      "409": decodeError("ProjectsMoveProject409", ProjectsMoveProject409),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "ProjectsWipeProjectData": (id, options) => HttpClientRequest.post(`/v0/project/${id}/wipe`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("ProjectsWipeProjectData400", ProjectsWipeProjectData400),
      "401": decodeError("ProjectsWipeProjectData401", ProjectsWipeProjectData401),
      "403": decodeError("ProjectsWipeProjectData403", ProjectsWipeProjectData403),
      "404": decodeError("ProjectsWipeProjectData404", ProjectsWipeProjectData404),
      "409": decodeError("ProjectsWipeProjectData409", ProjectsWipeProjectData409),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "RetentionGetRetentionForProject": (projectIdOrSlug, options) => HttpClientRequest.get(`/v0/project/${projectIdOrSlug}/retention`).pipe(
    HttpClientRequest.setUrlParams({ "granularity": options.params["granularity"] as any, "cohortFrom": options.params["cohortFrom"] as any, "cohortTo": options.params["cohortTo"] as any, "periodCount": options.params["periodCount"] as any, "filters": options.params["filters"] as any, "filterMatch": options.params["filterMatch"] as any, "source": options.params["source"] as any }),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RetentionGetRetentionForProject200),
      "401": decodeError("RetentionGetRetentionForProject401", RetentionGetRetentionForProject401),
      "403": decodeError("RetentionGetRetentionForProject403", RetentionGetRetentionForProject403),
      "404": decodeError("RetentionGetRetentionForProject404", RetentionGetRetentionForProject404),
      orElse: unexpectedStatus
    }))
  ),
    "RetentionGetRetentionDriversForProject": (projectIdOrSlug, options) => HttpClientRequest.get(`/v0/project/${projectIdOrSlug}/retention/drivers`).pipe(
    HttpClientRequest.setUrlParams({ "granularity": options.params["granularity"] as any, "cohortFrom": options.params["cohortFrom"] as any, "cohortTo": options.params["cohortTo"] as any, "targetPeriod": options.params["targetPeriod"] as any, "source": options.params["source"] as any, "minSegmentUsers": options.params["minSegmentUsers"] as any }),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RetentionGetRetentionDriversForProject200),
      "401": decodeError("RetentionGetRetentionDriversForProject401", RetentionGetRetentionDriversForProject401),
      "403": decodeError("RetentionGetRetentionDriversForProject403", RetentionGetRetentionDriversForProject403),
      "404": decodeError("RetentionGetRetentionDriversForProject404", RetentionGetRetentionDriversForProject404),
      orElse: unexpectedStatus
    }))
  ),
    "SpotlightGetSpotlightProjects": (options) => HttpClientRequest.get(`/v0/spotlight`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SpotlightGetSpotlightProjects200),
      orElse: unexpectedStatus
    }))
  ),
    "WebVitalsGetWebVitalsForProject": (projectIdOrSlug, options) => HttpClientRequest.get(`/v0/project/${projectIdOrSlug}/vitals`).pipe(
    HttpClientRequest.setUrlParams({ "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(WebVitalsGetWebVitalsForProject200),
      "401": decodeError("WebVitalsGetWebVitalsForProject401", WebVitalsGetWebVitalsForProject401),
      "403": decodeError("WebVitalsGetWebVitalsForProject403", WebVitalsGetWebVitalsForProject403),
      "404": decodeError("WebVitalsGetWebVitalsForProject404", WebVitalsGetWebVitalsForProject404),
      orElse: unexpectedStatus
    }))
  ),
    "WebVitalsGetBuildDeploymentsForProject": (projectIdOrSlug, options) => HttpClientRequest.get(`/v0/project/${projectIdOrSlug}/vitals/build-deployments`).pipe(
    HttpClientRequest.setUrlParams({ "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(WebVitalsGetBuildDeploymentsForProject200),
      "401": decodeError("WebVitalsGetBuildDeploymentsForProject401", WebVitalsGetBuildDeploymentsForProject401),
      "403": decodeError("WebVitalsGetBuildDeploymentsForProject403", WebVitalsGetBuildDeploymentsForProject403),
      "404": decodeError("WebVitalsGetBuildDeploymentsForProject404", WebVitalsGetBuildDeploymentsForProject404),
      orElse: unexpectedStatus
    }))
  ),
    "WebVitalsGetWebVitalsTrends": (projectIdOrSlug, options) => HttpClientRequest.get(`/v0/project/${projectIdOrSlug}/vitals/trends`).pipe(
    HttpClientRequest.setUrlParams({ "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any, "bucketMs": options?.params?.["bucketMs"] as any, "device": options?.params?.["device"] as any, "browser": options?.params?.["browser"] as any, "os": options?.params?.["os"] as any, "country": options?.params?.["country"] as any, "route": options?.params?.["route"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(WebVitalsGetWebVitalsTrends200),
      "401": decodeError("WebVitalsGetWebVitalsTrends401", WebVitalsGetWebVitalsTrends401),
      "403": decodeError("WebVitalsGetWebVitalsTrends403", WebVitalsGetWebVitalsTrends403),
      "404": decodeError("WebVitalsGetWebVitalsTrends404", WebVitalsGetWebVitalsTrends404),
      orElse: unexpectedStatus
    }))
  )
  }
}

export interface Api {
  readonly httpClient: HttpClient.HttpClient
  readonly "DashboardsListDashboards": <Config extends OperationConfig>(projectIdOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof DashboardsListDashboards200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DashboardsListDashboards400", typeof DashboardsListDashboards400.Type> | ApiError<"DashboardsListDashboards401", typeof DashboardsListDashboards401.Type> | ApiError<"DashboardsListDashboards403", typeof DashboardsListDashboards403.Type> | ApiError<"DashboardsListDashboards404", typeof DashboardsListDashboards404.Type>>
  readonly "DashboardsCreateDashboard": <Config extends OperationConfig>(projectIdOrSlug: string, options: { readonly payload: typeof DashboardsCreateDashboardRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof DashboardsCreateDashboard200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DashboardsCreateDashboard400", typeof DashboardsCreateDashboard400.Type> | ApiError<"DashboardsCreateDashboard401", typeof DashboardsCreateDashboard401.Type> | ApiError<"DashboardsCreateDashboard403", typeof DashboardsCreateDashboard403.Type> | ApiError<"DashboardsCreateDashboard404", typeof DashboardsCreateDashboard404.Type>>
  readonly "DashboardsReorderDashboards": <Config extends OperationConfig>(projectIdOrSlug: string, options: { readonly payload: typeof DashboardsReorderDashboardsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DashboardsReorderDashboards400", typeof DashboardsReorderDashboards400.Type> | ApiError<"DashboardsReorderDashboards401", typeof DashboardsReorderDashboards401.Type> | ApiError<"DashboardsReorderDashboards403", typeof DashboardsReorderDashboards403.Type> | ApiError<"DashboardsReorderDashboards404", typeof DashboardsReorderDashboards404.Type>>
  readonly "DashboardsDuplicateDashboard": <Config extends OperationConfig>(projectIdOrSlug: string, id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof DashboardsDuplicateDashboard200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DashboardsDuplicateDashboard400", typeof DashboardsDuplicateDashboard400.Type> | ApiError<"DashboardsDuplicateDashboard401", typeof DashboardsDuplicateDashboard401.Type> | ApiError<"DashboardsDuplicateDashboard403", typeof DashboardsDuplicateDashboard403.Type> | ApiError<"DashboardsDuplicateDashboard404", typeof DashboardsDuplicateDashboard404.Type>>
  readonly "DashboardsCopyDashboard": <Config extends OperationConfig>(projectIdOrSlug: string, id: string, options: { readonly payload: typeof DashboardsCopyDashboardRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof DashboardsCopyDashboard200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DashboardsCopyDashboard400", typeof DashboardsCopyDashboard400.Type> | ApiError<"DashboardsCopyDashboard401", typeof DashboardsCopyDashboard401.Type> | ApiError<"DashboardsCopyDashboard403", typeof DashboardsCopyDashboard403.Type> | ApiError<"DashboardsCopyDashboard404", typeof DashboardsCopyDashboard404.Type>>
  readonly "DashboardsDeleteDashboard": <Config extends OperationConfig>(projectIdOrSlug: string, id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DashboardsDeleteDashboard400", typeof DashboardsDeleteDashboard400.Type> | ApiError<"DashboardsDeleteDashboard401", typeof DashboardsDeleteDashboard401.Type> | ApiError<"DashboardsDeleteDashboard403", typeof DashboardsDeleteDashboard403.Type> | ApiError<"DashboardsDeleteDashboard404", typeof DashboardsDeleteDashboard404.Type>>
  readonly "DashboardsUpdateDashboard": <Config extends OperationConfig>(projectIdOrSlug: string, id: string, options: { readonly payload: typeof DashboardsUpdateDashboardRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof DashboardsUpdateDashboard200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DashboardsUpdateDashboard400", typeof DashboardsUpdateDashboard400.Type> | ApiError<"DashboardsUpdateDashboard401", typeof DashboardsUpdateDashboard401.Type> | ApiError<"DashboardsUpdateDashboard403", typeof DashboardsUpdateDashboard403.Type> | ApiError<"DashboardsUpdateDashboard404", typeof DashboardsUpdateDashboard404.Type>>
  readonly "DownloadsGetDownloadAnalytics": <Config extends OperationConfig>(projectIdOrSlug: string, options: { readonly params?: typeof DownloadsGetDownloadAnalyticsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof DownloadsGetDownloadAnalytics200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DownloadsGetDownloadAnalytics401", typeof DownloadsGetDownloadAnalytics401.Type> | ApiError<"DownloadsGetDownloadAnalytics403", typeof DownloadsGetDownloadAnalytics403.Type> | ApiError<"DownloadsGetDownloadAnalytics404", typeof DownloadsGetDownloadAnalytics404.Type>>
  readonly "EventExplorerGetEventExplorerRows": <Config extends OperationConfig>(projectIdOrSlug: string, options: { readonly params?: typeof EventExplorerGetEventExplorerRowsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof EventExplorerGetEventExplorerRows200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"EventExplorerGetEventExplorerRows401", typeof EventExplorerGetEventExplorerRows401.Type> | ApiError<"EventExplorerGetEventExplorerRows403", typeof EventExplorerGetEventExplorerRows403.Type> | ApiError<"EventExplorerGetEventExplorerRows404", typeof EventExplorerGetEventExplorerRows404.Type>>
  readonly "FunnelsListFunnels": <Config extends OperationConfig>(projectIdOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof FunnelsListFunnels200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FunnelsListFunnels400", typeof FunnelsListFunnels400.Type> | ApiError<"FunnelsListFunnels401", typeof FunnelsListFunnels401.Type> | ApiError<"FunnelsListFunnels403", typeof FunnelsListFunnels403.Type> | ApiError<"FunnelsListFunnels404", typeof FunnelsListFunnels404.Type>>
  readonly "FunnelsCreateFunnel": <Config extends OperationConfig>(projectIdOrSlug: string, options: { readonly payload: typeof FunnelsCreateFunnelRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof FunnelsCreateFunnel200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FunnelsCreateFunnel400", typeof FunnelsCreateFunnel400.Type> | ApiError<"FunnelsCreateFunnel401", typeof FunnelsCreateFunnel401.Type> | ApiError<"FunnelsCreateFunnel403", typeof FunnelsCreateFunnel403.Type> | ApiError<"FunnelsCreateFunnel404", typeof FunnelsCreateFunnel404.Type>>
  readonly "FunnelsGetFunnel": <Config extends OperationConfig>(projectIdOrSlug: string, id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof FunnelsGetFunnel200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FunnelsGetFunnel400", typeof FunnelsGetFunnel400.Type> | ApiError<"FunnelsGetFunnel401", typeof FunnelsGetFunnel401.Type> | ApiError<"FunnelsGetFunnel403", typeof FunnelsGetFunnel403.Type> | ApiError<"FunnelsGetFunnel404", typeof FunnelsGetFunnel404.Type>>
  readonly "FunnelsDeleteFunnel": <Config extends OperationConfig>(projectIdOrSlug: string, id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FunnelsDeleteFunnel400", typeof FunnelsDeleteFunnel400.Type> | ApiError<"FunnelsDeleteFunnel401", typeof FunnelsDeleteFunnel401.Type> | ApiError<"FunnelsDeleteFunnel403", typeof FunnelsDeleteFunnel403.Type> | ApiError<"FunnelsDeleteFunnel404", typeof FunnelsDeleteFunnel404.Type>>
  readonly "FunnelsUpdateFunnel": <Config extends OperationConfig>(projectIdOrSlug: string, id: string, options: { readonly payload: typeof FunnelsUpdateFunnelRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof FunnelsUpdateFunnel200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FunnelsUpdateFunnel400", typeof FunnelsUpdateFunnel400.Type> | ApiError<"FunnelsUpdateFunnel401", typeof FunnelsUpdateFunnel401.Type> | ApiError<"FunnelsUpdateFunnel403", typeof FunnelsUpdateFunnel403.Type> | ApiError<"FunnelsUpdateFunnel404", typeof FunnelsUpdateFunnel404.Type>>
  readonly "FunnelsDuplicateFunnel": <Config extends OperationConfig>(projectIdOrSlug: string, id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof FunnelsDuplicateFunnel200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FunnelsDuplicateFunnel400", typeof FunnelsDuplicateFunnel400.Type> | ApiError<"FunnelsDuplicateFunnel401", typeof FunnelsDuplicateFunnel401.Type> | ApiError<"FunnelsDuplicateFunnel403", typeof FunnelsDuplicateFunnel403.Type> | ApiError<"FunnelsDuplicateFunnel404", typeof FunnelsDuplicateFunnel404.Type>>
  readonly "ProjectsListProjects": <Config extends OperationConfig>(options: { readonly params?: typeof ProjectsListProjectsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ProjectsListProjects200.Type, Config>, HttpClientError.HttpClientError | SchemaError>
  readonly "ProjectsListPublicProjects": <Config extends OperationConfig>(options: { readonly params?: typeof ProjectsListPublicProjectsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ProjectsListPublicProjects200.Type, Config>, HttpClientError.HttpClientError | SchemaError>
  readonly "ProjectsGetProject": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ProjectsGetProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsGetProject400", typeof ProjectsGetProject400.Type> | ApiError<"ProjectsGetProject401", typeof ProjectsGetProject401.Type> | ApiError<"ProjectsGetProject403", typeof ProjectsGetProject403.Type> | ApiError<"ProjectsGetProject404", typeof ProjectsGetProject404.Type> | ApiError<"ProjectsGetProject409", typeof ProjectsGetProject409.Type>>
  readonly "ProjectsCreateProject": <Config extends OperationConfig>(options: { readonly payload: typeof ProjectsCreateProjectRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ProjectsCreateProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsCreateProject400", typeof ProjectsCreateProject400.Type> | ApiError<"ProjectsCreateProject401", typeof ProjectsCreateProject401.Type> | ApiError<"ProjectsCreateProject403", typeof ProjectsCreateProject403.Type> | ApiError<"ProjectsCreateProject404", typeof ProjectsCreateProject404.Type> | ApiError<"ProjectsCreateProject409", typeof ProjectsCreateProject409.Type>>
  readonly "ProjectsDeleteProject": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof ProjectsDeleteProjectRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsDeleteProject400", typeof ProjectsDeleteProject400.Type> | ApiError<"ProjectsDeleteProject401", typeof ProjectsDeleteProject401.Type> | ApiError<"ProjectsDeleteProject403", typeof ProjectsDeleteProject403.Type> | ApiError<"ProjectsDeleteProject404", typeof ProjectsDeleteProject404.Type> | ApiError<"ProjectsDeleteProject409", typeof ProjectsDeleteProject409.Type>>
  readonly "ProjectsUpdateProject": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof ProjectsUpdateProjectRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ProjectsUpdateProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsUpdateProject400", typeof ProjectsUpdateProject400.Type> | ApiError<"ProjectsUpdateProject401", typeof ProjectsUpdateProject401.Type> | ApiError<"ProjectsUpdateProject403", typeof ProjectsUpdateProject403.Type> | ApiError<"ProjectsUpdateProject404", typeof ProjectsUpdateProject404.Type> | ApiError<"ProjectsUpdateProject409", typeof ProjectsUpdateProject409.Type>>
  readonly "ProjectsCheckSlugAvailability": <Config extends OperationConfig>(options: { readonly params: typeof ProjectsCheckSlugAvailabilityParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ProjectsCheckSlugAvailability200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsCheckSlugAvailability400", typeof ProjectsCheckSlugAvailability400.Type> | ApiError<"ProjectsCheckSlugAvailability401", typeof ProjectsCheckSlugAvailability401.Type> | ApiError<"ProjectsCheckSlugAvailability403", typeof ProjectsCheckSlugAvailability403.Type> | ApiError<"ProjectsCheckSlugAvailability404", typeof ProjectsCheckSlugAvailability404.Type> | ApiError<"ProjectsCheckSlugAvailability409", typeof ProjectsCheckSlugAvailability409.Type>>
  readonly "ProjectsMoveProject": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof ProjectsMoveProjectRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsMoveProject400", typeof ProjectsMoveProject400.Type> | ApiError<"ProjectsMoveProject401", typeof ProjectsMoveProject401.Type> | ApiError<"ProjectsMoveProject403", typeof ProjectsMoveProject403.Type> | ApiError<"ProjectsMoveProject404", typeof ProjectsMoveProject404.Type> | ApiError<"ProjectsMoveProject409", typeof ProjectsMoveProject409.Type>>
  readonly "ProjectsWipeProjectData": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof ProjectsWipeProjectDataRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsWipeProjectData400", typeof ProjectsWipeProjectData400.Type> | ApiError<"ProjectsWipeProjectData401", typeof ProjectsWipeProjectData401.Type> | ApiError<"ProjectsWipeProjectData403", typeof ProjectsWipeProjectData403.Type> | ApiError<"ProjectsWipeProjectData404", typeof ProjectsWipeProjectData404.Type> | ApiError<"ProjectsWipeProjectData409", typeof ProjectsWipeProjectData409.Type>>
  readonly "RetentionGetRetentionForProject": <Config extends OperationConfig>(projectIdOrSlug: string, options: { readonly params: typeof RetentionGetRetentionForProjectParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof RetentionGetRetentionForProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"RetentionGetRetentionForProject401", typeof RetentionGetRetentionForProject401.Type> | ApiError<"RetentionGetRetentionForProject403", typeof RetentionGetRetentionForProject403.Type> | ApiError<"RetentionGetRetentionForProject404", typeof RetentionGetRetentionForProject404.Type>>
  readonly "RetentionGetRetentionDriversForProject": <Config extends OperationConfig>(projectIdOrSlug: string, options: { readonly params: typeof RetentionGetRetentionDriversForProjectParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof RetentionGetRetentionDriversForProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"RetentionGetRetentionDriversForProject401", typeof RetentionGetRetentionDriversForProject401.Type> | ApiError<"RetentionGetRetentionDriversForProject403", typeof RetentionGetRetentionDriversForProject403.Type> | ApiError<"RetentionGetRetentionDriversForProject404", typeof RetentionGetRetentionDriversForProject404.Type>>
  readonly "SpotlightGetSpotlightProjects": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SpotlightGetSpotlightProjects200.Type, Config>, HttpClientError.HttpClientError | SchemaError>
  readonly "WebVitalsGetWebVitalsForProject": <Config extends OperationConfig>(projectIdOrSlug: string, options: { readonly params?: typeof WebVitalsGetWebVitalsForProjectParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof WebVitalsGetWebVitalsForProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"WebVitalsGetWebVitalsForProject401", typeof WebVitalsGetWebVitalsForProject401.Type> | ApiError<"WebVitalsGetWebVitalsForProject403", typeof WebVitalsGetWebVitalsForProject403.Type> | ApiError<"WebVitalsGetWebVitalsForProject404", typeof WebVitalsGetWebVitalsForProject404.Type>>
  readonly "WebVitalsGetBuildDeploymentsForProject": <Config extends OperationConfig>(projectIdOrSlug: string, options: { readonly params?: typeof WebVitalsGetBuildDeploymentsForProjectParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof WebVitalsGetBuildDeploymentsForProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"WebVitalsGetBuildDeploymentsForProject401", typeof WebVitalsGetBuildDeploymentsForProject401.Type> | ApiError<"WebVitalsGetBuildDeploymentsForProject403", typeof WebVitalsGetBuildDeploymentsForProject403.Type> | ApiError<"WebVitalsGetBuildDeploymentsForProject404", typeof WebVitalsGetBuildDeploymentsForProject404.Type>>
  readonly "WebVitalsGetWebVitalsTrends": <Config extends OperationConfig>(projectIdOrSlug: string, options: { readonly params?: typeof WebVitalsGetWebVitalsTrendsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof WebVitalsGetWebVitalsTrends200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"WebVitalsGetWebVitalsTrends401", typeof WebVitalsGetWebVitalsTrends401.Type> | ApiError<"WebVitalsGetWebVitalsTrends403", typeof WebVitalsGetWebVitalsTrends403.Type> | ApiError<"WebVitalsGetWebVitalsTrends404", typeof WebVitalsGetWebVitalsTrends404.Type>>
}

export interface ApiError<Tag extends string, E> {
  readonly _tag: Tag
  readonly request: HttpClientRequest.HttpClientRequest
  readonly response: HttpClientResponse.HttpClientResponse
  readonly cause: E
}

class ApiErrorImpl extends Data.Error<{
  _tag: string
  cause: any
  request: HttpClientRequest.HttpClientRequest
  response: HttpClientResponse.HttpClientResponse
}> {}

export const ApiError = <Tag extends string, E>(
  tag: Tag,
  cause: E,
  response: HttpClientResponse.HttpClientResponse,
): ApiError<Tag, E> =>
  new ApiErrorImpl({
    _tag: tag,
    cause,
    response,
    request: response.request,
  }) as any
