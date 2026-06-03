import * as Data from "effect/Data"
import * as Effect from "effect/Effect"
import type { SchemaError } from "effect/Schema"
import * as Schema from "effect/Schema"
import type * as HttpClient from "effect/unstable/http/HttpClient"
import * as HttpClientError from "effect/unstable/http/HttpClientError"
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest"
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse"
// non-recursive definitions
export type ProjectValidationError = { readonly "_tag": "ProjectValidationError", readonly "message": string }
export const ProjectValidationError = Schema.Struct({ "_tag": Schema.Literal("ProjectValidationError"), "message": Schema.String })
export type ProjectConflictError = { readonly "_tag": "ProjectConflictError", readonly "message": string }
export const ProjectConflictError = Schema.Struct({ "_tag": Schema.Literal("ProjectConflictError"), "message": Schema.String })
export type UnauthorizedError = { readonly "_tag": "UnauthorizedError", readonly "message": string }
export const UnauthorizedError = Schema.Struct({ "_tag": Schema.Literal("UnauthorizedError"), "message": Schema.String })
export type ForbiddenError = { readonly "_tag": "ForbiddenError", readonly "message": string, readonly "code"?: string | null }
export const ForbiddenError = Schema.Struct({ "_tag": Schema.Literal("ForbiddenError"), "message": Schema.String, "code": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type NotFoundError = { readonly "_tag": "NotFoundError", readonly "message": string }
export const NotFoundError = Schema.Struct({ "_tag": Schema.Literal("NotFoundError"), "message": Schema.String })
export type DashboardRecord = { readonly "id": string, readonly "projectId": string, readonly "name": string, readonly "description": string | null, readonly "isPublic": boolean, readonly "isDefault": boolean, readonly "position": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "createdAt": string, readonly "updatedAt": string }
export const DashboardRecord = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "name": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "isPublic": Schema.Boolean, "isDefault": Schema.Boolean, "position": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "createdAt": Schema.String, "updatedAt": Schema.String })
export type DashboardValidationError = { readonly "_tag": "DashboardValidationError", readonly "message": string }
export const DashboardValidationError = Schema.Struct({ "_tag": Schema.Literal("DashboardValidationError"), "message": Schema.String })
export type ChartValidationError = { readonly "_tag": "ChartValidationError", readonly "message": string }
export const ChartValidationError = Schema.Struct({ "_tag": Schema.Literal("ChartValidationError"), "message": Schema.String })
export type InternalServerError = { readonly "_tag": "InternalServerError", readonly "message": string }
export const InternalServerError = Schema.Struct({ "_tag": Schema.Literal("InternalServerError"), "message": Schema.String })
export type TinybirdError = { readonly "_tag": "TinybirdError", readonly "message": string, readonly "cause"?: unknown | null }
export const TinybirdError = Schema.Struct({ "_tag": Schema.Literal("TinybirdError"), "message": Schema.String, "cause": Schema.optionalKey(Schema.Union([Schema.Unknown, Schema.Null])) })
export type EffectDrizzleQueryError = { readonly "_tag": "EffectDrizzleQueryError", readonly "query": string, readonly "params": ReadonlyArray<unknown>, readonly "cause": unknown }
export const EffectDrizzleQueryError = Schema.Struct({ "_tag": Schema.Literal("EffectDrizzleQueryError"), "query": Schema.String, "params": Schema.Array(Schema.Unknown), "cause": Schema.Unknown })
export type FunnelRecord = { readonly "id": string, readonly "projectId": string, readonly "name": string, readonly "description": string | null, readonly "steps": ReadonlyArray<{ readonly "type"?: "event" | null, readonly "id": string, readonly "name": string, readonly "match": "all" | "any", readonly "filters": ReadonlyArray<{ readonly "field": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "starts_with" | "not_starts_with" | "ends_with" | "not_ends_with" | "greater_than" | "less_than", readonly "value": string | number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | boolean }> } | { readonly "type": "feature_flag", readonly "id": string, readonly "name": string, readonly "featureFlagId": string, readonly "flagKey": string, readonly "flagMatch": "set" | "unset" | "value", readonly "value"?: string | null }> | null, readonly "conversionWindowSeconds": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "strictOrder": boolean, readonly "timeRangeSeconds": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "createdAt": string, readonly "updatedAt": string }
export const FunnelRecord = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "name": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "steps": Schema.Union([Schema.Array(Schema.Union([Schema.Struct({ "type": Schema.optionalKey(Schema.Union([Schema.Literal("event"), Schema.Null])), "id": Schema.String, "name": Schema.String, "match": Schema.Literals(["all", "any"]), "filters": Schema.Array(Schema.Struct({ "field": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "starts_with", "not_starts_with", "ends_with", "not_ends_with", "greater_than", "less_than"]), "value": Schema.Union([Schema.String, Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Boolean]) })) }), Schema.Struct({ "type": Schema.Literal("feature_flag"), "id": Schema.String, "name": Schema.String, "featureFlagId": Schema.String, "flagKey": Schema.String, "flagMatch": Schema.Literals(["set", "unset", "value"]), "value": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })])), Schema.Null]), "conversionWindowSeconds": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "strictOrder": Schema.Boolean, "timeRangeSeconds": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "createdAt": Schema.String, "updatedAt": Schema.String })
export type FunnelValidationError = { readonly "_tag": "FunnelValidationError", readonly "message": string }
export const FunnelValidationError = Schema.Struct({ "_tag": Schema.Literal("FunnelValidationError"), "message": Schema.String })
export type FunnelStepResult = { readonly "count": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "conversionRate": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "dropOffRate": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" }
export const FunnelStepResult = Schema.Struct({ "count": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "conversionRate": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "dropOffRate": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })
export type DataSourceRecord = { readonly "id": string, readonly "projectId": string, readonly "name": string, readonly "referenceId": string, readonly "dataType": "number" | "string" | "boolean", readonly "regex": string | null, readonly "allowNegative": boolean | null, readonly "allowFloat": boolean | null, readonly "minValue": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "maxValue": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "isArray": boolean, readonly "metricShape": "scalar" | "array" | "map", readonly "createdAt": string, readonly "updatedAt": string }
export const DataSourceRecord = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "name": Schema.String, "referenceId": Schema.String, "dataType": Schema.Literals(["number", "string", "boolean"]), "regex": Schema.Union([Schema.String, Schema.Null]), "allowNegative": Schema.Union([Schema.Boolean, Schema.Null]), "allowFloat": Schema.Union([Schema.Boolean, Schema.Null]), "minValue": Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "maxValue": Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "isArray": Schema.Boolean, "metricShape": Schema.Literals(["scalar", "array", "map"]), "createdAt": Schema.String, "updatedAt": Schema.String })
export type DataSourceValidationError = { readonly "_tag": "DataSourceValidationError", readonly "message": string }
export const DataSourceValidationError = Schema.Struct({ "_tag": Schema.Literal("DataSourceValidationError"), "message": Schema.String })
export type NetworkRuleRecord = { readonly "id": string, readonly "projectId": string, readonly "ipAddress": string, readonly "allowed": boolean, readonly "createdAt": string }
export const NetworkRuleRecord = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "ipAddress": Schema.String, "allowed": Schema.Boolean, "createdAt": Schema.String })
export type NetworkRuleValidationError = { readonly "_tag": "NetworkRuleValidationError", readonly "message": string }
export const NetworkRuleValidationError = Schema.Struct({ "_tag": Schema.Literal("NetworkRuleValidationError"), "message": Schema.String })
export type DownloadAnalyticsOverview = { readonly "totalDownloads": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "providersTracked": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "projectsTracked": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "latestSnapshotAt": string | null }
export const DownloadAnalyticsOverview = Schema.Struct({ "totalDownloads": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "providersTracked": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "projectsTracked": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "latestSnapshotAt": Schema.Union([Schema.String, Schema.Null]) })
export type DownloadAnalyticsPoint = { readonly "bucket": string, readonly "downloads": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "provider"?: "modrinth" | "spigot" | "hangar" | "ore" | "curseforge" | "github" | null | null }
export const DownloadAnalyticsPoint = Schema.Struct({ "bucket": Schema.String, "downloads": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "provider": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Literals(["modrinth", "spigot", "hangar", "ore", "curseforge", "github"]), Schema.Null]), Schema.Null])) })
export type DownloadProviderSummary = { readonly "provider": "modrinth" | "spigot" | "hangar" | "ore" | "curseforge" | "github", readonly "downloads": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "latestSnapshotAt": string | null, readonly "followers"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null | null, readonly "views"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null | null, readonly "watchers"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null | null, readonly "stars"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null | null, readonly "thumbsUpCount"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null | null }
export const DownloadProviderSummary = Schema.Struct({ "provider": Schema.Literals(["modrinth", "spigot", "hangar", "ore", "curseforge", "github"]), "downloads": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "latestSnapshotAt": Schema.Union([Schema.String, Schema.Null]), "followers": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])), "views": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])), "watchers": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])), "stars": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])), "thumbsUpCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])) })
export type DownloadVersionRow = { readonly "provider": "modrinth" | "spigot" | "hangar" | "ore" | "curseforge" | "github", readonly "externalId": string, readonly "versionId": string, readonly "versionNumber": string, readonly "downloads": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "latestSnapshotAt": string | null, readonly "releaseDate": string | null }
export const DownloadVersionRow = Schema.Struct({ "provider": Schema.Literals(["modrinth", "spigot", "hangar", "ore", "curseforge", "github"]), "externalId": Schema.String, "versionId": Schema.String, "versionNumber": Schema.String, "downloads": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "latestSnapshotAt": Schema.Union([Schema.String, Schema.Null]), "releaseDate": Schema.Union([Schema.String, Schema.Null]) })
export type RetentionFilter = { readonly "field": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "starts_with" | "not_starts_with" | "ends_with" | "not_ends_with" | "greater_than" | "less_than", readonly "value": string | "Infinity" | "-Infinity" | "NaN" | "true" | "false" | string, readonly "dataType": "string" | "number" | "boolean" }
export const RetentionFilter = Schema.Struct({ "field": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "starts_with", "not_starts_with", "ends_with", "not_ends_with", "greater_than", "less_than"]), "value": Schema.Union([Schema.Union([Schema.String.check(Schema.isPattern(new RegExp("^[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?$"))), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Literals(["true", "false"]), Schema.String]), "dataType": Schema.Literals(["string", "number", "boolean"]) })
export type RetentionCohortPeriod = { readonly "period": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "usersRetained": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "retentionRate": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" }
export const RetentionCohortPeriod = Schema.Struct({ "period": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "usersRetained": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "retentionRate": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })
export type RetentionDriverData = { readonly "source": "web" | "mods", readonly "field": string, readonly "value": string, readonly "cohortUsers": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "retainedUsers": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "retentionRate": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "baselineRate": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "deltaPoints": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "impactScore": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" }
export const RetentionDriverData = Schema.Struct({ "source": Schema.Literals(["web", "mods"]), "field": Schema.String, "value": Schema.String, "cohortUsers": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "retainedUsers": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "retentionRate": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "baselineRate": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "deltaPoints": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "impactScore": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })
export type EventExplorerRow = { readonly "id": string, readonly "timestamp": string, readonly "fieldValues": { readonly [x: string]: string }, readonly "rawData": string }
export const EventExplorerRow = Schema.Struct({ "id": Schema.String, "timestamp": Schema.String, "fieldValues": Schema.Record(Schema.String, Schema.String), "rawData": Schema.String })
export type UserListItem = { readonly "userKey": string, readonly "userId": string, readonly "userIds": ReadonlyArray<string>, readonly "firstSeen": string, readonly "lastSeen": string, readonly "eventCount": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "activeDays": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "browser": string, readonly "os": string, readonly "country": string, readonly "device": string, readonly "externalId": string | null, readonly "email": string | null, readonly "name": string | null, readonly "phone": string | null, readonly "avatarUrl": string | null, readonly "traits": {  } | null, readonly "serverCount"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null }
export const UserListItem = Schema.Struct({ "userKey": Schema.String, "userId": Schema.String, "userIds": Schema.Array(Schema.String), "firstSeen": Schema.String, "lastSeen": Schema.String, "eventCount": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "activeDays": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "browser": Schema.String, "os": Schema.String, "country": Schema.String, "device": Schema.String, "externalId": Schema.Union([Schema.String, Schema.Null]), "email": Schema.Union([Schema.String, Schema.Null]), "name": Schema.Union([Schema.String, Schema.Null]), "phone": Schema.Union([Schema.String, Schema.Null]), "avatarUrl": Schema.Union([Schema.String, Schema.Null]), "traits": Schema.Union([Schema.Struct({  }), Schema.Null]), "serverCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) })
export type UsersActiveTimeseriesRow = { readonly "date": string, readonly "dau": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "mau": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" }
export const UsersActiveTimeseriesRow = Schema.Struct({ "date": Schema.String, "dau": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "mau": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })
export type UsersBreakdown = { readonly "total": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "identified": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "anonymous": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "totalEvents": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "avgEvents": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "activeToday": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" }
export const UsersBreakdown = Schema.Struct({ "total": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "identified": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "anonymous": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "totalEvents": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "avgEvents": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "activeToday": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })
export type UserSessionEvent = { readonly "userId": string, readonly "sessionId": string | null, readonly "data": {  }, readonly "createdAt": string }
export const UserSessionEvent = Schema.Struct({ "userId": Schema.String, "sessionId": Schema.Union([Schema.String, Schema.Null]), "data": Schema.Struct({  }), "createdAt": Schema.String })
export type UserErrorOccurrence = { readonly "id": string, readonly "sessionId": string | null, readonly "message": string, readonly "issueHash": string, readonly "createdAt": string }
export const UserErrorOccurrence = Schema.Struct({ "id": Schema.String, "sessionId": Schema.Union([Schema.String, Schema.Null]), "message": Schema.String, "issueHash": Schema.String, "createdAt": Schema.String })
export type WebVitalData = { readonly "id": string, readonly "projectId": string, readonly "sessionId": string | null, readonly "metric": string, readonly "value": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "label": string, readonly "device": string | null, readonly "country": string | null, readonly "os": string | null, readonly "browser": string | null, readonly "url": string | null, readonly "attributes": {  } | null, readonly "createdAt": string }
export const WebVitalData = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "sessionId": Schema.Union([Schema.String, Schema.Null]), "metric": Schema.String, "value": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "label": Schema.String, "device": Schema.Union([Schema.String, Schema.Null]), "country": Schema.Union([Schema.String, Schema.Null]), "os": Schema.Union([Schema.String, Schema.Null]), "browser": Schema.Union([Schema.String, Schema.Null]), "url": Schema.Union([Schema.String, Schema.Null]), "attributes": Schema.Union([Schema.Struct({  }), Schema.Null]), "createdAt": Schema.String })
export type BuildDeploymentData = { readonly "buildId": string, readonly "deployedAt": string }
export const BuildDeploymentData = Schema.Struct({ "buildId": Schema.String, "deployedAt": Schema.String })
export type WebVitalsTrendPoint = { readonly "bucketStart": string, readonly "metric": string, readonly "samples": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "p75": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "p90": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "p99": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" }
export const WebVitalsTrendPoint = Schema.Struct({ "bucketStart": Schema.String, "metric": Schema.String, "samples": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "p75": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "p90": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "p99": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })
export type SessionReplayListItem = { readonly "sessionId": string, readonly "windowId": string, readonly "identifier": string | null, readonly "externalId": string | null, readonly "email": string | null, readonly "name": string | null, readonly "startedAt": string, readonly "endedAt": string, readonly "eventCount": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "snapshotCount": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "actualDuration": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "browser": string | null, readonly "country": string | null, readonly "os": string | null, readonly "viewed": boolean }
export const SessionReplayListItem = Schema.Struct({ "sessionId": Schema.String, "windowId": Schema.String, "identifier": Schema.Union([Schema.String, Schema.Null]), "externalId": Schema.Union([Schema.String, Schema.Null]), "email": Schema.Union([Schema.String, Schema.Null]), "name": Schema.Union([Schema.String, Schema.Null]), "startedAt": Schema.String, "endedAt": Schema.String, "eventCount": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "snapshotCount": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "actualDuration": Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "browser": Schema.Union([Schema.String, Schema.Null]), "country": Schema.Union([Schema.String, Schema.Null]), "os": Schema.Union([Schema.String, Schema.Null]), "viewed": Schema.Boolean })
export type SessionReplaysValidationError = { readonly "_tag": "SessionReplaysValidationError", readonly "message": string }
export const SessionReplaysValidationError = Schema.Struct({ "_tag": Schema.Literal("SessionReplaysValidationError"), "message": Schema.String })
export type ReplayCollectionRecord = { readonly "id": string, readonly "projectId": string, readonly "name": string, readonly "mode": "manual" | "automatic", readonly "filterConfig": { readonly "viewed"?: boolean | null, readonly "identifiedState"?: "identified" | "anonymous" | null, readonly "browserIn"?: ReadonlyArray<string> | null, readonly "osIn"?: ReadonlyArray<string> | null, readonly "countryIn"?: ReadonlyArray<string> | null, readonly "routeVisitedAny"?: ReadonlyArray<string> | null, readonly "minEventCount"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "maxEventCount"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "minDurationMs"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "maxDurationMs"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "hasErrors"?: boolean | null, readonly "hasPoorVitals"?: boolean | null, readonly "poorVitalMetric"?: string | null, readonly "playbackStart"?: "session_start" | "matched_event" | null, readonly "datasourceFilters"?: ReadonlyArray<{ readonly "referenceId": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "greater_than" | "less_than", readonly "value": string, readonly "dataType"?: "string" | "number" | "boolean" | null }> | null } | null, readonly "position": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "defaultKey": string | null, readonly "createdBy": string | null, readonly "updatedBy": string | null, readonly "createdAt": string, readonly "updatedAt": string, readonly "replayCount"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null }
export const ReplayCollectionRecord = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "name": Schema.String, "mode": Schema.Literals(["manual", "automatic"]), "filterConfig": Schema.Union([Schema.Struct({ "viewed": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "identifiedState": Schema.optionalKey(Schema.Union([Schema.Literals(["identified", "anonymous"]), Schema.Null])), "browserIn": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "osIn": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "countryIn": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "routeVisitedAny": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "minEventCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "maxEventCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "minDurationMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "maxDurationMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "hasErrors": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "hasPoorVitals": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "poorVitalMetric": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "playbackStart": Schema.optionalKey(Schema.Union([Schema.Literals(["session_start", "matched_event"]), Schema.Null])), "datasourceFilters": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "referenceId": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "greater_than", "less_than"]), "value": Schema.String, "dataType": Schema.optionalKey(Schema.Union([Schema.Literals(["string", "number", "boolean"]), Schema.Null])) })), Schema.Null])) }), Schema.Null]), "position": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "defaultKey": Schema.Union([Schema.String, Schema.Null]), "createdBy": Schema.Union([Schema.String, Schema.Null]), "updatedBy": Schema.Union([Schema.String, Schema.Null]), "createdAt": Schema.String, "updatedAt": Schema.String, "replayCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) })
export type ReplayCollectionAssignmentsResponse = { readonly "sessionId": string, readonly "windowId": string, readonly "collectionIds": ReadonlyArray<string> }
export const ReplayCollectionAssignmentsResponse = Schema.Struct({ "sessionId": Schema.String, "windowId": Schema.String, "collectionIds": Schema.Array(Schema.String) })
export type ReplayEventsPageResponse = { readonly "sessionId": string, readonly "windowId": string, readonly "events": ReadonlyArray<string | {  }>, readonly "routeSpans": ReadonlyArray<{ readonly "route": string, readonly "from": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "to": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "count": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" }>, readonly "nextCursor": { readonly "id": string, readonly "sequence": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "firstEventTimestampMs": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "createdAt": string } | null, readonly "hasMore": boolean, readonly "loadedFrom": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "loadedTo": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null }
export const ReplayEventsPageResponse = Schema.Struct({ "sessionId": Schema.String, "windowId": Schema.String, "events": Schema.Array(Schema.Union([Schema.String, Schema.Struct({  })])), "routeSpans": Schema.Array(Schema.Struct({ "route": Schema.String, "from": Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "to": Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "count": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })), "nextCursor": Schema.Union([Schema.Struct({ "id": Schema.String, "sequence": Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "firstEventTimestampMs": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "createdAt": Schema.String }), Schema.Null]), "hasMore": Schema.Boolean, "loadedFrom": Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "loadedTo": Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]) })
export type SessionError = { readonly "id": string, readonly "errorId": string, readonly "count": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "errorName": string | null, readonly "createdAt": string }
export const SessionError = Schema.Struct({ "id": Schema.String, "errorId": Schema.String, "count": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "errorName": Schema.Union([Schema.String, Schema.Null]), "createdAt": Schema.String })
export type SessionVital = { readonly "id": string, readonly "metric": string, readonly "value": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "label": string, readonly "url": string, readonly "attributes": {  } | null, readonly "createdAt": string }
export const SessionVital = Schema.Struct({ "id": Schema.String, "metric": Schema.String, "value": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "label": Schema.String, "url": Schema.String, "attributes": Schema.Union([Schema.Struct({  }), Schema.Null]), "createdAt": Schema.String })
export type FunnelDetail = { readonly "funnel": FunnelRecord, readonly "baselineCount"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "steps": ReadonlyArray<FunnelStepResult> }
export const FunnelDetail = Schema.Struct({ "funnel": FunnelRecord, "baselineCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "steps": Schema.Array(FunnelStepResult) })
export type DownloadAnalyticsResponse = { readonly "overview": DownloadAnalyticsOverview, readonly "history": ReadonlyArray<DownloadAnalyticsPoint>, readonly "providerBreakdown": ReadonlyArray<DownloadAnalyticsPoint>, readonly "providerSummaries": ReadonlyArray<DownloadProviderSummary>, readonly "versions": ReadonlyArray<DownloadVersionRow> }
export const DownloadAnalyticsResponse = Schema.Struct({ "overview": DownloadAnalyticsOverview, "history": Schema.Array(DownloadAnalyticsPoint), "providerBreakdown": Schema.Array(DownloadAnalyticsPoint), "providerSummaries": Schema.Array(DownloadProviderSummary), "versions": Schema.Array(DownloadVersionRow) })
export type RetentionCohortData = { readonly "cohort": string, readonly "cohortDate": string, readonly "users": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "periods": ReadonlyArray<RetentionCohortPeriod> }
export const RetentionCohortData = Schema.Struct({ "cohort": Schema.String, "cohortDate": Schema.String, "users": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "periods": Schema.Array(RetentionCohortPeriod) })
export type EventExplorerResult = { readonly "rows": ReadonlyArray<EventExplorerRow>, readonly "total": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "page": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "pageSize": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" }
export const EventExplorerResult = Schema.Struct({ "rows": Schema.Array(EventExplorerRow), "total": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "page": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "pageSize": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })
// schemas
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
export type ProjectsResetProjectErrorTrackingRequestJson = { readonly "password": string }
export const ProjectsResetProjectErrorTrackingRequestJson = Schema.Struct({ "password": Schema.String })
export type ProjectsResetProjectErrorTracking400 = ProjectValidationError
export const ProjectsResetProjectErrorTracking400 = ProjectValidationError
export type ProjectsResetProjectErrorTracking401 = UnauthorizedError
export const ProjectsResetProjectErrorTracking401 = UnauthorizedError
export type ProjectsResetProjectErrorTracking403 = ForbiddenError
export const ProjectsResetProjectErrorTracking403 = ForbiddenError
export type ProjectsResetProjectErrorTracking404 = NotFoundError
export const ProjectsResetProjectErrorTracking404 = NotFoundError
export type ProjectsResetProjectErrorTracking409 = ProjectConflictError
export const ProjectsResetProjectErrorTracking409 = ProjectConflictError
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
export type DashboardsCreateDashboardRequestJson = { readonly "name": string, readonly "description"?: string | null | null, readonly "isPublic"?: boolean | null, readonly "position"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null }
export const DashboardsCreateDashboardRequestJson = Schema.Struct({ "name": Schema.String, "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "isPublic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "position": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) })
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
export type ChartsListChartsParams = { readonly "dashboardId"?: "null" | string | null, readonly "chartId"?: string | null }
export const ChartsListChartsParams = Schema.Struct({ "dashboardId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Literal("null"), Schema.String]), Schema.Null])), "chartId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type ChartsListCharts200 = ReadonlyArray<{ readonly "id": string, readonly "projectId": string, readonly "dashboardId": string, readonly "name": string, readonly "description": string | null, readonly "chartType": "widget" | "line" | "area" | "bar" | "pie" | "map" | "list" | "heatmap" | "radar" | "scatter", readonly "queryConfig": { readonly "primaryMetric"?: { readonly "field": string, readonly "aggregation": "sum" | "avg" | "min" | "max" | "count", readonly "label"?: string | null } | null, readonly "metrics"?: ReadonlyArray<{ readonly "field": string, readonly "aggregation": "sum" | "avg" | "min" | "max" | "count", readonly "label"?: string | null }> | null, readonly "dimensions"?: ReadonlyArray<{ readonly "role": "time", readonly "field": string, readonly "interval": "minute" | "hour" | "day" | "week" | "month" } | { readonly "role": "group", readonly "field": string, readonly "limit"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null } | { readonly "role": "series", readonly "field": string }> | null, readonly "filters"?: ReadonlyArray<{ readonly "field": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "starts_with" | "not_starts_with" | "ends_with" | "not_ends_with" | "greater_than" | "less_than", readonly "value": string | number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | boolean }> | null, readonly "timeRange"?: { readonly "maxAgeMs"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "from"?: string | null, readonly "to"?: string | null } | null, readonly "deduplicateServers"?: boolean | null, readonly "mode"?: "history" | "distribution" | null, readonly "groupLimit"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "visualOptions"?: { readonly "colors"?: ReadonlyArray<string> | null, readonly "pie"?: { readonly "style"?: "pie" | "donut" | null, readonly "showLegend"?: boolean | null, readonly "showTotal"?: boolean | null, readonly "showLabels"?: boolean | null, readonly "totalDisplayMode"?: "sum" | "count" | null, readonly "drilldown"?: { readonly "enabled"?: boolean | null, readonly "splitPattern"?: string | null } | null } | null, readonly "bar"?: { readonly "stacked"?: boolean | null, readonly "orientation"?: "vertical" | "horizontal" | null } | null, readonly "line"?: { readonly "lineType"?: "monotone" | "linear" | "step" | null, readonly "showDots"?: boolean | null } | null, readonly "widget"?: { readonly "showTrend"?: boolean | null, readonly "displayMode"?: "default" | "compact" | null, readonly "valueFormat"?: "number" | "percent" | null } | null, readonly "list"?: { readonly "selectedTabIndex"?: number | null, readonly "splitPattern"?: string | null, readonly "multiMetric"?: boolean | null } | null, readonly "heatmap"?: { readonly "showLegend"?: boolean | null } | null, readonly "radar"?: { readonly "showDots"?: boolean | null, readonly "fillOpacity"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "showLegend"?: boolean | null, readonly "gridType"?: "polygon" | "circle" | null } | null, readonly "scatter"?: { readonly "pointSize"?: "small" | "medium" | "large" | null, readonly "showLegend"?: boolean | null } | null } | null } | null, readonly "flowNodes": ReadonlyArray<{ readonly "id": string, readonly "type"?: string, readonly "data"?: {  }, readonly "position"?: { readonly "x"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "y"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" } }> | null, readonly "flowEdges": ReadonlyArray<{ readonly "id": string, readonly "source": string, readonly "target": string }> | null, readonly "position": { readonly "x": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "y": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "w": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "h": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" } | null, readonly "createdAt": string | string, readonly "updatedAt": string | string }>
export const ChartsListCharts200 = Schema.Array(Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "dashboardId": Schema.String, "name": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "chartType": Schema.Literals(["widget", "line", "area", "bar", "pie", "map", "list", "heatmap", "radar", "scatter"]), "queryConfig": Schema.Union([Schema.Struct({ "primaryMetric": Schema.optionalKey(Schema.Union([Schema.Struct({ "field": Schema.String, "aggregation": Schema.Literals(["sum", "avg", "min", "max", "count"]), "label": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])), "metrics": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "field": Schema.String, "aggregation": Schema.Literals(["sum", "avg", "min", "max", "count"]), "label": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })), Schema.Null])), "dimensions": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Union([Schema.Struct({ "role": Schema.Literal("time"), "field": Schema.String, "interval": Schema.Literals(["minute", "hour", "day", "week", "month"]) }), Schema.Struct({ "role": Schema.Literal("group"), "field": Schema.String, "limit": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) }), Schema.Struct({ "role": Schema.Literal("series"), "field": Schema.String })])), Schema.Null])), "filters": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "field": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "starts_with", "not_starts_with", "ends_with", "not_ends_with", "greater_than", "less_than"]), "value": Schema.Union([Schema.String, Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Boolean]) })), Schema.Null])), "timeRange": Schema.optionalKey(Schema.Union([Schema.Struct({ "maxAgeMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])), "deduplicateServers": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "mode": Schema.optionalKey(Schema.Union([Schema.Literals(["history", "distribution"]), Schema.Null])), "groupLimit": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "visualOptions": Schema.optionalKey(Schema.Union([Schema.Struct({ "colors": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "pie": Schema.optionalKey(Schema.Union([Schema.Struct({ "style": Schema.optionalKey(Schema.Union([Schema.Literals(["pie", "donut"]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showTotal": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showLabels": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "totalDisplayMode": Schema.optionalKey(Schema.Union([Schema.Literals(["sum", "count"]), Schema.Null])), "drilldown": Schema.optionalKey(Schema.Union([Schema.Struct({ "enabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])) }), Schema.Null])), "bar": Schema.optionalKey(Schema.Union([Schema.Struct({ "stacked": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "orientation": Schema.optionalKey(Schema.Union([Schema.Literals(["vertical", "horizontal"]), Schema.Null])) }), Schema.Null])), "line": Schema.optionalKey(Schema.Union([Schema.Struct({ "lineType": Schema.optionalKey(Schema.Union([Schema.Literals(["monotone", "linear", "step"]), Schema.Null])), "showDots": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "widget": Schema.optionalKey(Schema.Union([Schema.Struct({ "showTrend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "displayMode": Schema.optionalKey(Schema.Union([Schema.Literals(["default", "compact"]), Schema.Null])), "valueFormat": Schema.optionalKey(Schema.Union([Schema.Literals(["number", "percent"]), Schema.Null])) }), Schema.Null])), "list": Schema.optionalKey(Schema.Union([Schema.Struct({ "selectedTabIndex": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "multiMetric": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "heatmap": Schema.optionalKey(Schema.Union([Schema.Struct({ "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "radar": Schema.optionalKey(Schema.Union([Schema.Struct({ "showDots": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "fillOpacity": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "gridType": Schema.optionalKey(Schema.Union([Schema.Literals(["polygon", "circle"]), Schema.Null])) }), Schema.Null])), "scatter": Schema.optionalKey(Schema.Union([Schema.Struct({ "pointSize": Schema.optionalKey(Schema.Union([Schema.Literals(["small", "medium", "large"]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])) }), Schema.Null])) }), Schema.Null]), "flowNodes": Schema.Union([Schema.Array(Schema.Struct({ "id": Schema.String, "type": Schema.optionalKey(Schema.String), "data": Schema.optionalKey(Schema.Struct({  })), "position": Schema.optionalKey(Schema.Struct({ "x": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])])), "y": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])])) })) })), Schema.Null]), "flowEdges": Schema.Union([Schema.Array(Schema.Struct({ "id": Schema.String, "source": Schema.String, "target": Schema.String })), Schema.Null]), "position": Schema.Union([Schema.Struct({ "x": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "y": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "w": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "h": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }), Schema.Null]), "createdAt": Schema.Union([Schema.String, Schema.String]), "updatedAt": Schema.Union([Schema.String, Schema.String]) }))
export type ChartsListCharts400 = ChartValidationError
export const ChartsListCharts400 = ChartValidationError
export type ChartsListCharts401 = UnauthorizedError
export const ChartsListCharts401 = UnauthorizedError
export type ChartsListCharts403 = ForbiddenError
export const ChartsListCharts403 = ForbiddenError
export type ChartsListCharts404 = NotFoundError
export const ChartsListCharts404 = NotFoundError
export type ChartsCreateChartRequestJson = { readonly "dashboardId"?: string | null | null, readonly "name": string, readonly "description"?: string | null | null, readonly "chartType": "widget" | "line" | "area" | "bar" | "pie" | "map" | "list" | "heatmap" | "radar" | "scatter", readonly "queryConfig"?: { readonly "primaryMetric"?: { readonly "field": string, readonly "aggregation": "sum" | "avg" | "min" | "max" | "count", readonly "label"?: string | null } | null, readonly "metrics"?: ReadonlyArray<{ readonly "field": string, readonly "aggregation": "sum" | "avg" | "min" | "max" | "count", readonly "label"?: string | null }> | null, readonly "dimensions"?: ReadonlyArray<{ readonly "role": "time", readonly "field": string, readonly "interval": "minute" | "hour" | "day" | "week" | "month" } | { readonly "role": "group", readonly "field": string, readonly "limit"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null } | { readonly "role": "series", readonly "field": string }> | null, readonly "filters"?: ReadonlyArray<{ readonly "field": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "starts_with" | "not_starts_with" | "ends_with" | "not_ends_with" | "greater_than" | "less_than", readonly "value": string | number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | boolean }> | null, readonly "timeRange"?: { readonly "maxAgeMs"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "from"?: string | null, readonly "to"?: string | null } | null, readonly "deduplicateServers"?: boolean | null, readonly "mode"?: "history" | "distribution" | null, readonly "groupLimit"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "visualOptions"?: { readonly "colors"?: ReadonlyArray<string> | null, readonly "pie"?: { readonly "style"?: "pie" | "donut" | null, readonly "showLegend"?: boolean | null, readonly "showTotal"?: boolean | null, readonly "showLabels"?: boolean | null, readonly "totalDisplayMode"?: "sum" | "count" | null, readonly "drilldown"?: { readonly "enabled"?: boolean | null, readonly "splitPattern"?: string | null } | null } | null, readonly "bar"?: { readonly "stacked"?: boolean | null, readonly "orientation"?: "vertical" | "horizontal" | null } | null, readonly "line"?: { readonly "lineType"?: "monotone" | "linear" | "step" | null, readonly "showDots"?: boolean | null } | null, readonly "widget"?: { readonly "showTrend"?: boolean | null, readonly "displayMode"?: "default" | "compact" | null, readonly "valueFormat"?: "number" | "percent" | null } | null, readonly "list"?: { readonly "selectedTabIndex"?: number | null, readonly "splitPattern"?: string | null, readonly "multiMetric"?: boolean | null } | null, readonly "heatmap"?: { readonly "showLegend"?: boolean | null } | null, readonly "radar"?: { readonly "showDots"?: boolean | null, readonly "fillOpacity"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "showLegend"?: boolean | null, readonly "gridType"?: "polygon" | "circle" | null } | null, readonly "scatter"?: { readonly "pointSize"?: "small" | "medium" | "large" | null, readonly "showLegend"?: boolean | null } | null } | null } | null, readonly "flowNodes"?: ReadonlyArray<{ readonly "id": string, readonly "type"?: string, readonly "data"?: {  }, readonly "position"?: { readonly "x"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "y"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" } }> | null, readonly "flowEdges"?: ReadonlyArray<{ readonly "id": string, readonly "source": string, readonly "target": string }> | null, readonly "position"?: { readonly "x": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "y": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "w": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "h": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" } | null }
export const ChartsCreateChartRequestJson = Schema.Struct({ "dashboardId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "name": Schema.String, "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "chartType": Schema.Literals(["widget", "line", "area", "bar", "pie", "map", "list", "heatmap", "radar", "scatter"]), "queryConfig": Schema.optionalKey(Schema.Union([Schema.Struct({ "primaryMetric": Schema.optionalKey(Schema.Union([Schema.Struct({ "field": Schema.String, "aggregation": Schema.Literals(["sum", "avg", "min", "max", "count"]), "label": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])), "metrics": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "field": Schema.String, "aggregation": Schema.Literals(["sum", "avg", "min", "max", "count"]), "label": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })), Schema.Null])), "dimensions": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Union([Schema.Struct({ "role": Schema.Literal("time"), "field": Schema.String, "interval": Schema.Literals(["minute", "hour", "day", "week", "month"]) }), Schema.Struct({ "role": Schema.Literal("group"), "field": Schema.String, "limit": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) }), Schema.Struct({ "role": Schema.Literal("series"), "field": Schema.String })])), Schema.Null])), "filters": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "field": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "starts_with", "not_starts_with", "ends_with", "not_ends_with", "greater_than", "less_than"]), "value": Schema.Union([Schema.String, Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Boolean]) })), Schema.Null])), "timeRange": Schema.optionalKey(Schema.Union([Schema.Struct({ "maxAgeMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])), "deduplicateServers": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "mode": Schema.optionalKey(Schema.Union([Schema.Literals(["history", "distribution"]), Schema.Null])), "groupLimit": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "visualOptions": Schema.optionalKey(Schema.Union([Schema.Struct({ "colors": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "pie": Schema.optionalKey(Schema.Union([Schema.Struct({ "style": Schema.optionalKey(Schema.Union([Schema.Literals(["pie", "donut"]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showTotal": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showLabels": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "totalDisplayMode": Schema.optionalKey(Schema.Union([Schema.Literals(["sum", "count"]), Schema.Null])), "drilldown": Schema.optionalKey(Schema.Union([Schema.Struct({ "enabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])) }), Schema.Null])), "bar": Schema.optionalKey(Schema.Union([Schema.Struct({ "stacked": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "orientation": Schema.optionalKey(Schema.Union([Schema.Literals(["vertical", "horizontal"]), Schema.Null])) }), Schema.Null])), "line": Schema.optionalKey(Schema.Union([Schema.Struct({ "lineType": Schema.optionalKey(Schema.Union([Schema.Literals(["monotone", "linear", "step"]), Schema.Null])), "showDots": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "widget": Schema.optionalKey(Schema.Union([Schema.Struct({ "showTrend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "displayMode": Schema.optionalKey(Schema.Union([Schema.Literals(["default", "compact"]), Schema.Null])), "valueFormat": Schema.optionalKey(Schema.Union([Schema.Literals(["number", "percent"]), Schema.Null])) }), Schema.Null])), "list": Schema.optionalKey(Schema.Union([Schema.Struct({ "selectedTabIndex": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "multiMetric": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "heatmap": Schema.optionalKey(Schema.Union([Schema.Struct({ "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "radar": Schema.optionalKey(Schema.Union([Schema.Struct({ "showDots": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "fillOpacity": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "gridType": Schema.optionalKey(Schema.Union([Schema.Literals(["polygon", "circle"]), Schema.Null])) }), Schema.Null])), "scatter": Schema.optionalKey(Schema.Union([Schema.Struct({ "pointSize": Schema.optionalKey(Schema.Union([Schema.Literals(["small", "medium", "large"]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])) }), Schema.Null])) }), Schema.Null])), "flowNodes": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "id": Schema.String, "type": Schema.optionalKey(Schema.String), "data": Schema.optionalKey(Schema.Struct({  })), "position": Schema.optionalKey(Schema.Struct({ "x": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])])), "y": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])])) })) })), Schema.Null])), "flowEdges": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "id": Schema.String, "source": Schema.String, "target": Schema.String })), Schema.Null])), "position": Schema.optionalKey(Schema.Union([Schema.Struct({ "x": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "y": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "w": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "h": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }), Schema.Null])) })
export type ChartsCreateChart400 = ChartValidationError
export const ChartsCreateChart400 = ChartValidationError
export type ChartsCreateChart401 = UnauthorizedError
export const ChartsCreateChart401 = UnauthorizedError
export type ChartsCreateChart403 = ForbiddenError
export const ChartsCreateChart403 = ForbiddenError
export type ChartsCreateChart404 = NotFoundError
export const ChartsCreateChart404 = NotFoundError
export type ChartsDeleteChart400 = ChartValidationError
export const ChartsDeleteChart400 = ChartValidationError
export type ChartsDeleteChart401 = UnauthorizedError
export const ChartsDeleteChart401 = UnauthorizedError
export type ChartsDeleteChart403 = ForbiddenError
export const ChartsDeleteChart403 = ForbiddenError
export type ChartsDeleteChart404 = NotFoundError
export const ChartsDeleteChart404 = NotFoundError
export type ChartsUpdateChartRequestJson = { readonly "dashboardId"?: string | null | null, readonly "name"?: string | null, readonly "description"?: string | null | null, readonly "chartType"?: "widget" | "line" | "area" | "bar" | "pie" | "map" | "list" | "heatmap" | "radar" | "scatter" | null, readonly "queryConfig"?: { readonly "primaryMetric"?: { readonly "field": string, readonly "aggregation": "sum" | "avg" | "min" | "max" | "count", readonly "label"?: string | null } | null, readonly "metrics"?: ReadonlyArray<{ readonly "field": string, readonly "aggregation": "sum" | "avg" | "min" | "max" | "count", readonly "label"?: string | null }> | null, readonly "dimensions"?: ReadonlyArray<{ readonly "role": "time", readonly "field": string, readonly "interval": "minute" | "hour" | "day" | "week" | "month" } | { readonly "role": "group", readonly "field": string, readonly "limit"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null } | { readonly "role": "series", readonly "field": string }> | null, readonly "filters"?: ReadonlyArray<{ readonly "field": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "starts_with" | "not_starts_with" | "ends_with" | "not_ends_with" | "greater_than" | "less_than", readonly "value": string | number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | boolean }> | null, readonly "timeRange"?: { readonly "maxAgeMs"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "from"?: string | null, readonly "to"?: string | null } | null, readonly "deduplicateServers"?: boolean | null, readonly "mode"?: "history" | "distribution" | null, readonly "groupLimit"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "visualOptions"?: { readonly "colors"?: ReadonlyArray<string> | null, readonly "pie"?: { readonly "style"?: "pie" | "donut" | null, readonly "showLegend"?: boolean | null, readonly "showTotal"?: boolean | null, readonly "showLabels"?: boolean | null, readonly "totalDisplayMode"?: "sum" | "count" | null, readonly "drilldown"?: { readonly "enabled"?: boolean | null, readonly "splitPattern"?: string | null } | null } | null, readonly "bar"?: { readonly "stacked"?: boolean | null, readonly "orientation"?: "vertical" | "horizontal" | null } | null, readonly "line"?: { readonly "lineType"?: "monotone" | "linear" | "step" | null, readonly "showDots"?: boolean | null } | null, readonly "widget"?: { readonly "showTrend"?: boolean | null, readonly "displayMode"?: "default" | "compact" | null, readonly "valueFormat"?: "number" | "percent" | null } | null, readonly "list"?: { readonly "selectedTabIndex"?: number | null, readonly "splitPattern"?: string | null, readonly "multiMetric"?: boolean | null } | null, readonly "heatmap"?: { readonly "showLegend"?: boolean | null } | null, readonly "radar"?: { readonly "showDots"?: boolean | null, readonly "fillOpacity"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "showLegend"?: boolean | null, readonly "gridType"?: "polygon" | "circle" | null } | null, readonly "scatter"?: { readonly "pointSize"?: "small" | "medium" | "large" | null, readonly "showLegend"?: boolean | null } | null } | null } | null, readonly "flowNodes"?: ReadonlyArray<{ readonly "id": string, readonly "type"?: string, readonly "data"?: {  }, readonly "position"?: { readonly "x"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "y"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" } }> | null, readonly "flowEdges"?: ReadonlyArray<{ readonly "id": string, readonly "source": string, readonly "target": string }> | null, readonly "position"?: { readonly "x": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "y": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "w": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "h": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" } | null }
export const ChartsUpdateChartRequestJson = Schema.Struct({ "dashboardId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "name": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "chartType": Schema.optionalKey(Schema.Union([Schema.Literals(["widget", "line", "area", "bar", "pie", "map", "list", "heatmap", "radar", "scatter"]), Schema.Null])), "queryConfig": Schema.optionalKey(Schema.Union([Schema.Struct({ "primaryMetric": Schema.optionalKey(Schema.Union([Schema.Struct({ "field": Schema.String, "aggregation": Schema.Literals(["sum", "avg", "min", "max", "count"]), "label": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])), "metrics": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "field": Schema.String, "aggregation": Schema.Literals(["sum", "avg", "min", "max", "count"]), "label": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })), Schema.Null])), "dimensions": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Union([Schema.Struct({ "role": Schema.Literal("time"), "field": Schema.String, "interval": Schema.Literals(["minute", "hour", "day", "week", "month"]) }), Schema.Struct({ "role": Schema.Literal("group"), "field": Schema.String, "limit": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) }), Schema.Struct({ "role": Schema.Literal("series"), "field": Schema.String })])), Schema.Null])), "filters": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "field": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "starts_with", "not_starts_with", "ends_with", "not_ends_with", "greater_than", "less_than"]), "value": Schema.Union([Schema.String, Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Boolean]) })), Schema.Null])), "timeRange": Schema.optionalKey(Schema.Union([Schema.Struct({ "maxAgeMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])), "deduplicateServers": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "mode": Schema.optionalKey(Schema.Union([Schema.Literals(["history", "distribution"]), Schema.Null])), "groupLimit": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "visualOptions": Schema.optionalKey(Schema.Union([Schema.Struct({ "colors": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "pie": Schema.optionalKey(Schema.Union([Schema.Struct({ "style": Schema.optionalKey(Schema.Union([Schema.Literals(["pie", "donut"]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showTotal": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showLabels": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "totalDisplayMode": Schema.optionalKey(Schema.Union([Schema.Literals(["sum", "count"]), Schema.Null])), "drilldown": Schema.optionalKey(Schema.Union([Schema.Struct({ "enabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])) }), Schema.Null])), "bar": Schema.optionalKey(Schema.Union([Schema.Struct({ "stacked": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "orientation": Schema.optionalKey(Schema.Union([Schema.Literals(["vertical", "horizontal"]), Schema.Null])) }), Schema.Null])), "line": Schema.optionalKey(Schema.Union([Schema.Struct({ "lineType": Schema.optionalKey(Schema.Union([Schema.Literals(["monotone", "linear", "step"]), Schema.Null])), "showDots": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "widget": Schema.optionalKey(Schema.Union([Schema.Struct({ "showTrend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "displayMode": Schema.optionalKey(Schema.Union([Schema.Literals(["default", "compact"]), Schema.Null])), "valueFormat": Schema.optionalKey(Schema.Union([Schema.Literals(["number", "percent"]), Schema.Null])) }), Schema.Null])), "list": Schema.optionalKey(Schema.Union([Schema.Struct({ "selectedTabIndex": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "multiMetric": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "heatmap": Schema.optionalKey(Schema.Union([Schema.Struct({ "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "radar": Schema.optionalKey(Schema.Union([Schema.Struct({ "showDots": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "fillOpacity": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "gridType": Schema.optionalKey(Schema.Union([Schema.Literals(["polygon", "circle"]), Schema.Null])) }), Schema.Null])), "scatter": Schema.optionalKey(Schema.Union([Schema.Struct({ "pointSize": Schema.optionalKey(Schema.Union([Schema.Literals(["small", "medium", "large"]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])) }), Schema.Null])) }), Schema.Null])), "flowNodes": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "id": Schema.String, "type": Schema.optionalKey(Schema.String), "data": Schema.optionalKey(Schema.Struct({  })), "position": Schema.optionalKey(Schema.Struct({ "x": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])])), "y": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])])) })) })), Schema.Null])), "flowEdges": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "id": Schema.String, "source": Schema.String, "target": Schema.String })), Schema.Null])), "position": Schema.optionalKey(Schema.Union([Schema.Struct({ "x": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "y": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "w": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "h": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }), Schema.Null])) })
export type ChartsUpdateChart400 = ChartValidationError
export const ChartsUpdateChart400 = ChartValidationError
export type ChartsUpdateChart401 = UnauthorizedError
export const ChartsUpdateChart401 = UnauthorizedError
export type ChartsUpdateChart403 = ForbiddenError
export const ChartsUpdateChart403 = ForbiddenError
export type ChartsUpdateChart404 = NotFoundError
export const ChartsUpdateChart404 = NotFoundError
export type MetricsGetPreviewDataRequestJson = { readonly "queryConfig": { readonly "primaryMetric"?: { readonly "field": string, readonly "aggregation": "sum" | "avg" | "min" | "max" | "count", readonly "label"?: string | null } | null, readonly "metrics"?: ReadonlyArray<{ readonly "field": string, readonly "aggregation": "sum" | "avg" | "min" | "max" | "count", readonly "label"?: string | null }> | null, readonly "dimensions"?: ReadonlyArray<{ readonly "role": "time", readonly "field": string, readonly "interval": "minute" | "hour" | "day" | "week" | "month" } | { readonly "role": "group", readonly "field": string, readonly "limit"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null } | { readonly "role": "series", readonly "field": string }> | null, readonly "filters"?: ReadonlyArray<{ readonly "field": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "starts_with" | "not_starts_with" | "ends_with" | "not_ends_with" | "greater_than" | "less_than", readonly "value": string | number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | boolean }> | null, readonly "timeRange"?: { readonly "maxAgeMs"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "from"?: string | null, readonly "to"?: string | null } | null, readonly "deduplicateServers"?: boolean | null, readonly "mode"?: "history" | "distribution" | null, readonly "groupLimit"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "visualOptions"?: { readonly "colors"?: ReadonlyArray<string> | null, readonly "pie"?: { readonly "style"?: "pie" | "donut" | null, readonly "showLegend"?: boolean | null, readonly "showTotal"?: boolean | null, readonly "showLabels"?: boolean | null, readonly "totalDisplayMode"?: "sum" | "count" | null, readonly "drilldown"?: { readonly "enabled"?: boolean | null, readonly "splitPattern"?: string | null } | null } | null, readonly "bar"?: { readonly "stacked"?: boolean | null, readonly "orientation"?: "vertical" | "horizontal" | null } | null, readonly "line"?: { readonly "lineType"?: "monotone" | "linear" | "step" | null, readonly "showDots"?: boolean | null } | null, readonly "widget"?: { readonly "showTrend"?: boolean | null, readonly "displayMode"?: "default" | "compact" | null, readonly "valueFormat"?: "number" | "percent" | null } | null, readonly "list"?: { readonly "selectedTabIndex"?: number | null, readonly "splitPattern"?: string | null, readonly "multiMetric"?: boolean | null } | null, readonly "heatmap"?: { readonly "showLegend"?: boolean | null } | null, readonly "radar"?: { readonly "showDots"?: boolean | null, readonly "fillOpacity"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "showLegend"?: boolean | null, readonly "gridType"?: "polygon" | "circle" | null } | null, readonly "scatter"?: { readonly "pointSize"?: "small" | "medium" | "large" | null, readonly "showLegend"?: boolean | null } | null } | null }, readonly "chartType": "widget" | "line" | "area" | "bar" | "pie" | "map" | "list" | "heatmap" | "radar" | "scatter", readonly "flowNodes": ReadonlyArray<{ readonly "id": string, readonly "type"?: string, readonly "data"?: {  }, readonly "position"?: { readonly "x"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "y"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" } }>, readonly "flowEdges": ReadonlyArray<{ readonly "id": string, readonly "source": string, readonly "target": string }> }
export const MetricsGetPreviewDataRequestJson = Schema.Struct({ "queryConfig": Schema.Struct({ "primaryMetric": Schema.optionalKey(Schema.Union([Schema.Struct({ "field": Schema.String, "aggregation": Schema.Literals(["sum", "avg", "min", "max", "count"]), "label": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])), "metrics": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "field": Schema.String, "aggregation": Schema.Literals(["sum", "avg", "min", "max", "count"]), "label": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })), Schema.Null])), "dimensions": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Union([Schema.Struct({ "role": Schema.Literal("time"), "field": Schema.String, "interval": Schema.Literals(["minute", "hour", "day", "week", "month"]) }), Schema.Struct({ "role": Schema.Literal("group"), "field": Schema.String, "limit": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) }), Schema.Struct({ "role": Schema.Literal("series"), "field": Schema.String })])), Schema.Null])), "filters": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "field": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "starts_with", "not_starts_with", "ends_with", "not_ends_with", "greater_than", "less_than"]), "value": Schema.Union([Schema.String, Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Boolean]) })), Schema.Null])), "timeRange": Schema.optionalKey(Schema.Union([Schema.Struct({ "maxAgeMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])), "deduplicateServers": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "mode": Schema.optionalKey(Schema.Union([Schema.Literals(["history", "distribution"]), Schema.Null])), "groupLimit": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "visualOptions": Schema.optionalKey(Schema.Union([Schema.Struct({ "colors": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "pie": Schema.optionalKey(Schema.Union([Schema.Struct({ "style": Schema.optionalKey(Schema.Union([Schema.Literals(["pie", "donut"]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showTotal": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showLabels": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "totalDisplayMode": Schema.optionalKey(Schema.Union([Schema.Literals(["sum", "count"]), Schema.Null])), "drilldown": Schema.optionalKey(Schema.Union([Schema.Struct({ "enabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])) }), Schema.Null])), "bar": Schema.optionalKey(Schema.Union([Schema.Struct({ "stacked": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "orientation": Schema.optionalKey(Schema.Union([Schema.Literals(["vertical", "horizontal"]), Schema.Null])) }), Schema.Null])), "line": Schema.optionalKey(Schema.Union([Schema.Struct({ "lineType": Schema.optionalKey(Schema.Union([Schema.Literals(["monotone", "linear", "step"]), Schema.Null])), "showDots": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "widget": Schema.optionalKey(Schema.Union([Schema.Struct({ "showTrend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "displayMode": Schema.optionalKey(Schema.Union([Schema.Literals(["default", "compact"]), Schema.Null])), "valueFormat": Schema.optionalKey(Schema.Union([Schema.Literals(["number", "percent"]), Schema.Null])) }), Schema.Null])), "list": Schema.optionalKey(Schema.Union([Schema.Struct({ "selectedTabIndex": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "multiMetric": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "heatmap": Schema.optionalKey(Schema.Union([Schema.Struct({ "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "radar": Schema.optionalKey(Schema.Union([Schema.Struct({ "showDots": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "fillOpacity": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "gridType": Schema.optionalKey(Schema.Union([Schema.Literals(["polygon", "circle"]), Schema.Null])) }), Schema.Null])), "scatter": Schema.optionalKey(Schema.Union([Schema.Struct({ "pointSize": Schema.optionalKey(Schema.Union([Schema.Literals(["small", "medium", "large"]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])) }), Schema.Null])) }), "chartType": Schema.Literals(["widget", "line", "area", "bar", "pie", "map", "list", "heatmap", "radar", "scatter"]), "flowNodes": Schema.Array(Schema.Struct({ "id": Schema.String, "type": Schema.optionalKey(Schema.String), "data": Schema.optionalKey(Schema.Struct({  })), "position": Schema.optionalKey(Schema.Struct({ "x": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])])), "y": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])])) })) })), "flowEdges": Schema.Array(Schema.Struct({ "id": Schema.String, "source": Schema.String, "target": Schema.String })) })
export type MetricsGetPreviewData200 = { readonly "data": unknown, readonly "flowMeta": { readonly "outputs": ReadonlyArray<{ readonly "id": string, readonly "index": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "name": string, readonly "explicitName"?: string | null, readonly "iconSetId": string | null, readonly "splitPattern"?: string | null, readonly "splitDataSource"?: string | null, readonly "groupField"?: string | null, readonly "primaryMetric"?: { readonly "field": string, readonly "aggregation": string } | null }>, readonly "hasTimeGroup": boolean, readonly "hasBreakdownTimeSeries": boolean, readonly "datasourceFields": ReadonlyArray<string>, readonly "splitLabelSeparator": string, readonly "timeGroupInterval"?: "minute" | "hour" | "day" | "week" | "month" | "auto" | null } }
export const MetricsGetPreviewData200 = Schema.Struct({ "data": Schema.Unknown, "flowMeta": Schema.Struct({ "outputs": Schema.Array(Schema.Struct({ "id": Schema.String, "index": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "name": Schema.String, "explicitName": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "iconSetId": Schema.Union([Schema.String, Schema.Null]), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "splitDataSource": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "groupField": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "primaryMetric": Schema.optionalKey(Schema.Union([Schema.Struct({ "field": Schema.String, "aggregation": Schema.String }), Schema.Null])) })), "hasTimeGroup": Schema.Boolean, "hasBreakdownTimeSeries": Schema.Boolean, "datasourceFields": Schema.Array(Schema.String), "splitLabelSeparator": Schema.String, "timeGroupInterval": Schema.optionalKey(Schema.Union([Schema.Literals(["minute", "hour", "day", "week", "month", "auto"]), Schema.Null])) }) })
export type MetricsGetPreviewData401 = UnauthorizedError
export const MetricsGetPreviewData401 = UnauthorizedError
export type MetricsGetPreviewData403 = ForbiddenError
export const MetricsGetPreviewData403 = ForbiddenError
export type MetricsGetPreviewData404 = NotFoundError
export const MetricsGetPreviewData404 = NotFoundError
export type MetricsGetPreviewData500 = InternalServerError | TinybirdError | EffectDrizzleQueryError
export const MetricsGetPreviewData500 = Schema.Union([InternalServerError, TinybirdError, EffectDrizzleQueryError])
export type MetricsLoadDashboardDataRequestJson = { readonly "projectId"?: string | null, readonly "slug"?: string | null, readonly "dashboardId"?: string | null | null, readonly "timeRange"?: { readonly "type": "relative", readonly "maxAgeMs": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" } | { readonly "type": "absolute", readonly "fromMs": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "toMs": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" } | null, readonly "dashboardFilters"?: ReadonlyArray<{ readonly "field": string, readonly "operator": "equals" | "not_equals" | "greater_equal" | "less_equal", readonly "value": string, readonly "dataType"?: "string" | "number" | "boolean" | null }> | null, readonly "fusionDebug"?: boolean | null }
export const MetricsLoadDashboardDataRequestJson = Schema.Struct({ "projectId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "slug": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "dashboardId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "timeRange": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Struct({ "type": Schema.Literal("relative"), "maxAgeMs": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }), Schema.Struct({ "type": Schema.Literal("absolute"), "fromMs": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "toMs": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })]), Schema.Null])), "dashboardFilters": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "field": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "greater_equal", "less_equal"]), "value": Schema.String, "dataType": Schema.optionalKey(Schema.Union([Schema.Literals(["string", "number", "boolean"]), Schema.Null])) })), Schema.Null])), "fusionDebug": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) })
export type MetricsLoadDashboardData200 = { readonly "charts": {  }, readonly "flowMeta"?: { readonly [x: string]: { readonly "outputs": ReadonlyArray<{ readonly "id": string, readonly "index": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "name": string, readonly "explicitName"?: string | null, readonly "iconSetId": string | null, readonly "splitPattern"?: string | null, readonly "splitDataSource"?: string | null, readonly "groupField"?: string | null, readonly "primaryMetric"?: { readonly "field": string, readonly "aggregation": string } | null }>, readonly "hasTimeGroup": boolean, readonly "hasBreakdownTimeSeries": boolean, readonly "datasourceFields": ReadonlyArray<string>, readonly "splitLabelSeparator": string, readonly "timeGroupInterval"?: "minute" | "hour" | "day" | "week" | "month" | "auto" | null } } | null, readonly "fusionDebug"?: { readonly "totalCharts": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "totalQueries": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "flowEngineDurationMs"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "executionDurationMs"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "summary": { readonly "eligibleCharts": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "fusedBatchCount": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "fusedChartCount": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "ineligibleCharts": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "unfusedEligibleCharts": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" }, readonly "batches": ReadonlyArray<{ readonly "order": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "kind": "single" | "fused", readonly "durationMs": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "chartIds": ReadonlyArray<string>, readonly "chartNames": ReadonlyArray<string>, readonly "family"?: "time-series-by-output" | "grouping" | "widget" | string | null, readonly "sql"?: string | null, readonly "paramsJson"?: string | null, readonly "datasource"?: string | null, readonly "explainJson"?: string | null, readonly "explainError"?: string | null, readonly "explainDurationMs"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null }>, readonly "totalDurationMs": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" } | null }
export const MetricsLoadDashboardData200 = Schema.Struct({ "charts": Schema.Struct({  }), "flowMeta": Schema.optionalKey(Schema.Union([Schema.Record(Schema.String, Schema.Struct({ "outputs": Schema.Array(Schema.Struct({ "id": Schema.String, "index": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "name": Schema.String, "explicitName": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "iconSetId": Schema.Union([Schema.String, Schema.Null]), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "splitDataSource": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "groupField": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "primaryMetric": Schema.optionalKey(Schema.Union([Schema.Struct({ "field": Schema.String, "aggregation": Schema.String }), Schema.Null])) })), "hasTimeGroup": Schema.Boolean, "hasBreakdownTimeSeries": Schema.Boolean, "datasourceFields": Schema.Array(Schema.String), "splitLabelSeparator": Schema.String, "timeGroupInterval": Schema.optionalKey(Schema.Union([Schema.Literals(["minute", "hour", "day", "week", "month", "auto"]), Schema.Null])) })), Schema.Null])), "fusionDebug": Schema.optionalKey(Schema.Union([Schema.Struct({ "totalCharts": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "totalQueries": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "flowEngineDurationMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "executionDurationMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "summary": Schema.Struct({ "eligibleCharts": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "fusedBatchCount": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "fusedChartCount": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "ineligibleCharts": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "unfusedEligibleCharts": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }), "batches": Schema.Array(Schema.Struct({ "order": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "kind": Schema.Literals(["single", "fused"]), "durationMs": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "chartIds": Schema.Array(Schema.String), "chartNames": Schema.Array(Schema.String), "family": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Literals(["time-series-by-output", "grouping", "widget"]), Schema.String]), Schema.Null])), "sql": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "paramsJson": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "datasource": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "explainJson": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "explainError": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "explainDurationMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) })), "totalDurationMs": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }), Schema.Null])) })
export type MetricsLoadDashboardData401 = UnauthorizedError
export const MetricsLoadDashboardData401 = UnauthorizedError
export type MetricsLoadDashboardData403 = ForbiddenError
export const MetricsLoadDashboardData403 = ForbiddenError
export type MetricsLoadDashboardData404 = NotFoundError
export const MetricsLoadDashboardData404 = NotFoundError
export type MetricsLoadDashboardData500 = InternalServerError | TinybirdError | EffectDrizzleQueryError
export const MetricsLoadDashboardData500 = Schema.Union([InternalServerError, TinybirdError, EffectDrizzleQueryError])
export type MetricsGetDashboardFilterSuggestionsRequestJson = { readonly "dashboardId"?: string | null | null, readonly "fields": ReadonlyArray<string>, readonly "numericFields"?: ReadonlyArray<string> | null, readonly "timeRange"?: { readonly "type": "relative", readonly "maxAgeMs": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" } | { readonly "type": "absolute", readonly "fromMs": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "toMs": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" } | null }
export const MetricsGetDashboardFilterSuggestionsRequestJson = Schema.Struct({ "dashboardId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "fields": Schema.Array(Schema.String), "numericFields": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "timeRange": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Struct({ "type": Schema.Literal("relative"), "maxAgeMs": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }), Schema.Struct({ "type": Schema.Literal("absolute"), "fromMs": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "toMs": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })]), Schema.Null])) })
export type MetricsGetDashboardFilterSuggestions200 = { readonly [x: string]: { readonly "values": ReadonlyArray<string>, readonly "numericRange"?: { readonly "min": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "max": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" } | null } }
export const MetricsGetDashboardFilterSuggestions200 = Schema.Record(Schema.String, Schema.Struct({ "values": Schema.Array(Schema.String), "numericRange": Schema.optionalKey(Schema.Union([Schema.Struct({ "min": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "max": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }), Schema.Null])) }))
export type MetricsGetDashboardFilterSuggestions401 = UnauthorizedError
export const MetricsGetDashboardFilterSuggestions401 = UnauthorizedError
export type MetricsGetDashboardFilterSuggestions403 = ForbiddenError
export const MetricsGetDashboardFilterSuggestions403 = ForbiddenError
export type MetricsGetDashboardFilterSuggestions404 = NotFoundError
export const MetricsGetDashboardFilterSuggestions404 = NotFoundError
export type MetricsGetDashboardFilterSuggestions500 = InternalServerError | TinybirdError | EffectDrizzleQueryError
export const MetricsGetDashboardFilterSuggestions500 = Schema.Union([InternalServerError, TinybirdError, EffectDrizzleQueryError])
export type MetricsGetProjectsDashboardDataRequestJson = { readonly "projectIds": ReadonlyArray<string> }
export const MetricsGetProjectsDashboardDataRequestJson = Schema.Struct({ "projectIds": Schema.Array(Schema.String) })
export type MetricsGetProjectsDashboardData200 = { readonly "stats": { readonly [x: string]: { readonly "events": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "eventsPrevious": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "eventsChange": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "users": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "usersPrevious": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "usersChange": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "errors": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "errorsPrevious": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "errorsChange": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "lastActivity": string } } }
export const MetricsGetProjectsDashboardData200 = Schema.Struct({ "stats": Schema.Record(Schema.String, Schema.Struct({ "events": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "eventsPrevious": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "eventsChange": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "users": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "usersPrevious": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "usersChange": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "errors": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "errorsPrevious": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "errorsChange": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "lastActivity": Schema.String })) })
export type MetricsGetProjectsDashboardData401 = UnauthorizedError
export const MetricsGetProjectsDashboardData401 = UnauthorizedError
export type MetricsGetProjectsDashboardData403 = ForbiddenError
export const MetricsGetProjectsDashboardData403 = ForbiddenError
export type MetricsGetProjectsDashboardData404 = NotFoundError
export const MetricsGetProjectsDashboardData404 = NotFoundError
export type MetricsGetProjectsDashboardData500 = InternalServerError | TinybirdError | EffectDrizzleQueryError
export const MetricsGetProjectsDashboardData500 = Schema.Union([InternalServerError, TinybirdError, EffectDrizzleQueryError])
export type MetricsGetPublicChartData200 = { readonly "chart": { readonly "id": string, readonly "name": string, readonly "description": string | null, readonly "chartType": "widget" | "line" | "area" | "bar" | "pie" | "map" | "list" | "heatmap" | "radar" | "scatter", readonly "queryConfig": { readonly "primaryMetric"?: { readonly "field": string, readonly "aggregation": "sum" | "avg" | "min" | "max" | "count", readonly "label"?: string | null } | null, readonly "metrics"?: ReadonlyArray<{ readonly "field": string, readonly "aggregation": "sum" | "avg" | "min" | "max" | "count", readonly "label"?: string | null }> | null, readonly "dimensions"?: ReadonlyArray<{ readonly "role": "time", readonly "field": string, readonly "interval": "minute" | "hour" | "day" | "week" | "month" } | { readonly "role": "group", readonly "field": string, readonly "limit"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null } | { readonly "role": "series", readonly "field": string }> | null, readonly "filters"?: ReadonlyArray<{ readonly "field": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "starts_with" | "not_starts_with" | "ends_with" | "not_ends_with" | "greater_than" | "less_than", readonly "value": string | number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | boolean }> | null, readonly "timeRange"?: { readonly "maxAgeMs"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "from"?: string | null, readonly "to"?: string | null } | null, readonly "deduplicateServers"?: boolean | null, readonly "mode"?: "history" | "distribution" | null, readonly "groupLimit"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "visualOptions"?: { readonly "colors"?: ReadonlyArray<string> | null, readonly "pie"?: { readonly "style"?: "pie" | "donut" | null, readonly "showLegend"?: boolean | null, readonly "showTotal"?: boolean | null, readonly "showLabels"?: boolean | null, readonly "totalDisplayMode"?: "sum" | "count" | null, readonly "drilldown"?: { readonly "enabled"?: boolean | null, readonly "splitPattern"?: string | null } | null } | null, readonly "bar"?: { readonly "stacked"?: boolean | null, readonly "orientation"?: "vertical" | "horizontal" | null } | null, readonly "line"?: { readonly "lineType"?: "monotone" | "linear" | "step" | null, readonly "showDots"?: boolean | null } | null, readonly "widget"?: { readonly "showTrend"?: boolean | null, readonly "displayMode"?: "default" | "compact" | null, readonly "valueFormat"?: "number" | "percent" | null } | null, readonly "list"?: { readonly "selectedTabIndex"?: number | null, readonly "splitPattern"?: string | null, readonly "multiMetric"?: boolean | null } | null, readonly "heatmap"?: { readonly "showLegend"?: boolean | null } | null, readonly "radar"?: { readonly "showDots"?: boolean | null, readonly "fillOpacity"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "showLegend"?: boolean | null, readonly "gridType"?: "polygon" | "circle" | null } | null, readonly "scatter"?: { readonly "pointSize"?: "small" | "medium" | "large" | null, readonly "showLegend"?: boolean | null } | null } | null } | null, readonly "flowNodes": ReadonlyArray<{ readonly "id": string, readonly "type"?: string, readonly "data"?: {  }, readonly "position"?: { readonly "x"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "y"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" } }> | null, readonly "flowEdges": ReadonlyArray<{ readonly "id": string, readonly "source": string, readonly "target": string }> | null }, readonly "projectName": string, readonly "projectPreferredChartColors": ReadonlyArray<string> | null, readonly "data": unknown, readonly "flowMeta"?: { readonly "outputs": ReadonlyArray<{ readonly "id": string, readonly "index": number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN", readonly "name": string, readonly "explicitName"?: string | null, readonly "iconSetId": string | null, readonly "splitPattern"?: string | null, readonly "splitDataSource"?: string | null, readonly "groupField"?: string | null, readonly "primaryMetric"?: { readonly "field": string, readonly "aggregation": string } | null }>, readonly "hasTimeGroup": boolean, readonly "hasBreakdownTimeSeries": boolean, readonly "datasourceFields": ReadonlyArray<string>, readonly "splitLabelSeparator": string, readonly "timeGroupInterval"?: "minute" | "hour" | "day" | "week" | "month" | "auto" | null } | null }
export const MetricsGetPublicChartData200 = Schema.Struct({ "chart": Schema.Struct({ "id": Schema.String, "name": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "chartType": Schema.Literals(["widget", "line", "area", "bar", "pie", "map", "list", "heatmap", "radar", "scatter"]), "queryConfig": Schema.Union([Schema.Struct({ "primaryMetric": Schema.optionalKey(Schema.Union([Schema.Struct({ "field": Schema.String, "aggregation": Schema.Literals(["sum", "avg", "min", "max", "count"]), "label": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])), "metrics": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "field": Schema.String, "aggregation": Schema.Literals(["sum", "avg", "min", "max", "count"]), "label": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })), Schema.Null])), "dimensions": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Union([Schema.Struct({ "role": Schema.Literal("time"), "field": Schema.String, "interval": Schema.Literals(["minute", "hour", "day", "week", "month"]) }), Schema.Struct({ "role": Schema.Literal("group"), "field": Schema.String, "limit": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) }), Schema.Struct({ "role": Schema.Literal("series"), "field": Schema.String })])), Schema.Null])), "filters": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "field": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "starts_with", "not_starts_with", "ends_with", "not_ends_with", "greater_than", "less_than"]), "value": Schema.Union([Schema.String, Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Boolean]) })), Schema.Null])), "timeRange": Schema.optionalKey(Schema.Union([Schema.Struct({ "maxAgeMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])), "deduplicateServers": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "mode": Schema.optionalKey(Schema.Union([Schema.Literals(["history", "distribution"]), Schema.Null])), "groupLimit": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "visualOptions": Schema.optionalKey(Schema.Union([Schema.Struct({ "colors": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "pie": Schema.optionalKey(Schema.Union([Schema.Struct({ "style": Schema.optionalKey(Schema.Union([Schema.Literals(["pie", "donut"]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showTotal": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showLabels": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "totalDisplayMode": Schema.optionalKey(Schema.Union([Schema.Literals(["sum", "count"]), Schema.Null])), "drilldown": Schema.optionalKey(Schema.Union([Schema.Struct({ "enabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])) }), Schema.Null])), "bar": Schema.optionalKey(Schema.Union([Schema.Struct({ "stacked": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "orientation": Schema.optionalKey(Schema.Union([Schema.Literals(["vertical", "horizontal"]), Schema.Null])) }), Schema.Null])), "line": Schema.optionalKey(Schema.Union([Schema.Struct({ "lineType": Schema.optionalKey(Schema.Union([Schema.Literals(["monotone", "linear", "step"]), Schema.Null])), "showDots": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "widget": Schema.optionalKey(Schema.Union([Schema.Struct({ "showTrend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "displayMode": Schema.optionalKey(Schema.Union([Schema.Literals(["default", "compact"]), Schema.Null])), "valueFormat": Schema.optionalKey(Schema.Union([Schema.Literals(["number", "percent"]), Schema.Null])) }), Schema.Null])), "list": Schema.optionalKey(Schema.Union([Schema.Struct({ "selectedTabIndex": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "multiMetric": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "heatmap": Schema.optionalKey(Schema.Union([Schema.Struct({ "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "radar": Schema.optionalKey(Schema.Union([Schema.Struct({ "showDots": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "fillOpacity": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "gridType": Schema.optionalKey(Schema.Union([Schema.Literals(["polygon", "circle"]), Schema.Null])) }), Schema.Null])), "scatter": Schema.optionalKey(Schema.Union([Schema.Struct({ "pointSize": Schema.optionalKey(Schema.Union([Schema.Literals(["small", "medium", "large"]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])) }), Schema.Null])) }), Schema.Null]), "flowNodes": Schema.Union([Schema.Array(Schema.Struct({ "id": Schema.String, "type": Schema.optionalKey(Schema.String), "data": Schema.optionalKey(Schema.Struct({  })), "position": Schema.optionalKey(Schema.Struct({ "x": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])])), "y": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])])) })) })), Schema.Null]), "flowEdges": Schema.Union([Schema.Array(Schema.Struct({ "id": Schema.String, "source": Schema.String, "target": Schema.String })), Schema.Null]) }), "projectName": Schema.String, "projectPreferredChartColors": Schema.Union([Schema.Array(Schema.String), Schema.Null]), "data": Schema.Unknown, "flowMeta": Schema.optionalKey(Schema.Union([Schema.Struct({ "outputs": Schema.Array(Schema.Struct({ "id": Schema.String, "index": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "name": Schema.String, "explicitName": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "iconSetId": Schema.Union([Schema.String, Schema.Null]), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "splitDataSource": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "groupField": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "primaryMetric": Schema.optionalKey(Schema.Union([Schema.Struct({ "field": Schema.String, "aggregation": Schema.String }), Schema.Null])) })), "hasTimeGroup": Schema.Boolean, "hasBreakdownTimeSeries": Schema.Boolean, "datasourceFields": Schema.Array(Schema.String), "splitLabelSeparator": Schema.String, "timeGroupInterval": Schema.optionalKey(Schema.Union([Schema.Literals(["minute", "hour", "day", "week", "month", "auto"]), Schema.Null])) }), Schema.Null])) })
export type MetricsGetPublicChartData404 = NotFoundError
export const MetricsGetPublicChartData404 = NotFoundError
export type MetricsGetPublicChartData500 = InternalServerError | TinybirdError | EffectDrizzleQueryError
export const MetricsGetPublicChartData500 = Schema.Union([InternalServerError, TinybirdError, EffectDrizzleQueryError])
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
export type DataSourcesListDataSources200 = ReadonlyArray<DataSourceRecord>
export const DataSourcesListDataSources200 = Schema.Array(DataSourceRecord)
export type DataSourcesListDataSources400 = DataSourceValidationError
export const DataSourcesListDataSources400 = DataSourceValidationError
export type DataSourcesListDataSources401 = UnauthorizedError
export const DataSourcesListDataSources401 = UnauthorizedError
export type DataSourcesListDataSources403 = ForbiddenError
export const DataSourcesListDataSources403 = ForbiddenError
export type DataSourcesListDataSources404 = NotFoundError
export const DataSourcesListDataSources404 = NotFoundError
export type DataSourcesCreateDataSourceRequestJson = { readonly "name": string, readonly "referenceId": string, readonly "dataType": "number" | "string" | "boolean", readonly "regex"?: string | null | null, readonly "allowNegative"?: boolean | null | null, readonly "allowFloat"?: boolean | null | null, readonly "minValue"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null | null, readonly "maxValue"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null | null, readonly "isArray"?: boolean | null, readonly "metricShape"?: "scalar" | "array" | "map" | null }
export const DataSourcesCreateDataSourceRequestJson = Schema.Struct({ "name": Schema.String, "referenceId": Schema.String.check(Schema.isMinLength(1)).check(Schema.isPattern(new RegExp("^[a-z0-9_]+$"))), "dataType": Schema.Literals(["number", "string", "boolean"]), "regex": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "allowNegative": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Boolean, Schema.Null]), Schema.Null])), "allowFloat": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Boolean, Schema.Null]), Schema.Null])), "minValue": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])), "maxValue": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])), "isArray": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "metricShape": Schema.optionalKey(Schema.Union([Schema.Literals(["scalar", "array", "map"]), Schema.Null])) })
export type DataSourcesCreateDataSource200 = DataSourceRecord
export const DataSourcesCreateDataSource200 = DataSourceRecord
export type DataSourcesCreateDataSource400 = DataSourceValidationError
export const DataSourcesCreateDataSource400 = DataSourceValidationError
export type DataSourcesCreateDataSource401 = UnauthorizedError
export const DataSourcesCreateDataSource401 = UnauthorizedError
export type DataSourcesCreateDataSource403 = ForbiddenError
export const DataSourcesCreateDataSource403 = ForbiddenError
export type DataSourcesCreateDataSource404 = NotFoundError
export const DataSourcesCreateDataSource404 = NotFoundError
export type DataSourcesDeleteDataSource400 = DataSourceValidationError
export const DataSourcesDeleteDataSource400 = DataSourceValidationError
export type DataSourcesDeleteDataSource401 = UnauthorizedError
export const DataSourcesDeleteDataSource401 = UnauthorizedError
export type DataSourcesDeleteDataSource403 = ForbiddenError
export const DataSourcesDeleteDataSource403 = ForbiddenError
export type DataSourcesDeleteDataSource404 = NotFoundError
export const DataSourcesDeleteDataSource404 = NotFoundError
export type DataSourcesUpdateDataSourceRequestJson = { readonly "name"?: string | null, readonly "referenceId"?: string | null, readonly "dataType"?: "number" | "string" | "boolean" | null, readonly "regex"?: string | null | null, readonly "allowNegative"?: boolean | null | null, readonly "allowFloat"?: boolean | null | null, readonly "minValue"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null | null, readonly "maxValue"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null | null, readonly "isArray"?: boolean | null, readonly "metricShape"?: "scalar" | "array" | "map" | null }
export const DataSourcesUpdateDataSourceRequestJson = Schema.Struct({ "name": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "referenceId": Schema.optionalKey(Schema.Union([Schema.String.check(Schema.isMinLength(1)).check(Schema.isPattern(new RegExp("^[a-z0-9_]+$"))), Schema.Null])), "dataType": Schema.optionalKey(Schema.Union([Schema.Literals(["number", "string", "boolean"]), Schema.Null])), "regex": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "allowNegative": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Boolean, Schema.Null]), Schema.Null])), "allowFloat": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Boolean, Schema.Null]), Schema.Null])), "minValue": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])), "maxValue": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])), "isArray": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "metricShape": Schema.optionalKey(Schema.Union([Schema.Literals(["scalar", "array", "map"]), Schema.Null])) })
export type DataSourcesUpdateDataSource200 = DataSourceRecord
export const DataSourcesUpdateDataSource200 = DataSourceRecord
export type DataSourcesUpdateDataSource400 = DataSourceValidationError
export const DataSourcesUpdateDataSource400 = DataSourceValidationError
export type DataSourcesUpdateDataSource401 = UnauthorizedError
export const DataSourcesUpdateDataSource401 = UnauthorizedError
export type DataSourcesUpdateDataSource403 = ForbiddenError
export const DataSourcesUpdateDataSource403 = ForbiddenError
export type DataSourcesUpdateDataSource404 = NotFoundError
export const DataSourcesUpdateDataSource404 = NotFoundError
export type NetworkRulesListNetworkRules200 = ReadonlyArray<NetworkRuleRecord>
export const NetworkRulesListNetworkRules200 = Schema.Array(NetworkRuleRecord)
export type NetworkRulesListNetworkRules400 = NetworkRuleValidationError
export const NetworkRulesListNetworkRules400 = NetworkRuleValidationError
export type NetworkRulesListNetworkRules401 = UnauthorizedError
export const NetworkRulesListNetworkRules401 = UnauthorizedError
export type NetworkRulesListNetworkRules403 = ForbiddenError
export const NetworkRulesListNetworkRules403 = ForbiddenError
export type NetworkRulesListNetworkRules404 = NotFoundError
export const NetworkRulesListNetworkRules404 = NotFoundError
export type NetworkRulesCreateNetworkRuleRequestJson = { readonly "ipAddress": string, readonly "allowed": boolean }
export const NetworkRulesCreateNetworkRuleRequestJson = Schema.Struct({ "ipAddress": Schema.String, "allowed": Schema.Boolean })
export type NetworkRulesCreateNetworkRule200 = NetworkRuleRecord
export const NetworkRulesCreateNetworkRule200 = NetworkRuleRecord
export type NetworkRulesCreateNetworkRule400 = NetworkRuleValidationError
export const NetworkRulesCreateNetworkRule400 = NetworkRuleValidationError
export type NetworkRulesCreateNetworkRule401 = UnauthorizedError
export const NetworkRulesCreateNetworkRule401 = UnauthorizedError
export type NetworkRulesCreateNetworkRule403 = ForbiddenError
export const NetworkRulesCreateNetworkRule403 = ForbiddenError
export type NetworkRulesCreateNetworkRule404 = NotFoundError
export const NetworkRulesCreateNetworkRule404 = NotFoundError
export type NetworkRulesDeleteNetworkRule400 = NetworkRuleValidationError
export const NetworkRulesDeleteNetworkRule400 = NetworkRuleValidationError
export type NetworkRulesDeleteNetworkRule401 = UnauthorizedError
export const NetworkRulesDeleteNetworkRule401 = UnauthorizedError
export type NetworkRulesDeleteNetworkRule403 = ForbiddenError
export const NetworkRulesDeleteNetworkRule403 = ForbiddenError
export type NetworkRulesDeleteNetworkRule404 = NotFoundError
export const NetworkRulesDeleteNetworkRule404 = NotFoundError
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
export type DownloadsGetDownloadAnalytics500 = TinybirdError | EffectDrizzleQueryError
export const DownloadsGetDownloadAnalytics500 = Schema.Union([TinybirdError, EffectDrizzleQueryError])
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
export type UsersGetUsersForProjectParams = { readonly "from"?: string | null, readonly "to"?: string | null, readonly "limit"?: string | null, readonly "offset"?: string | null, readonly "cohort"?: "identified" | "anonymous" | null }
export const UsersGetUsersForProjectParams = Schema.Struct({ "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "limit": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "offset": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "cohort": Schema.optionalKey(Schema.Union([Schema.Literals(["identified", "anonymous"]), Schema.Null])) })
export type UsersGetUsersForProject200 = ReadonlyArray<UserListItem>
export const UsersGetUsersForProject200 = Schema.Array(UserListItem)
export type UsersGetUsersForProject401 = UnauthorizedError
export const UsersGetUsersForProject401 = UnauthorizedError
export type UsersGetUsersForProject403 = ForbiddenError
export const UsersGetUsersForProject403 = ForbiddenError
export type UsersGetUsersForProject404 = NotFoundError
export const UsersGetUsersForProject404 = NotFoundError
export type UsersGetUsersActiveTimeseriesParams = { readonly "from"?: string | null, readonly "to"?: string | null, readonly "limit"?: string | null, readonly "offset"?: string | null, readonly "cohort"?: "identified" | "anonymous" | null }
export const UsersGetUsersActiveTimeseriesParams = Schema.Struct({ "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "limit": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "offset": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "cohort": Schema.optionalKey(Schema.Union([Schema.Literals(["identified", "anonymous"]), Schema.Null])) })
export type UsersGetUsersActiveTimeseries200 = ReadonlyArray<UsersActiveTimeseriesRow>
export const UsersGetUsersActiveTimeseries200 = Schema.Array(UsersActiveTimeseriesRow)
export type UsersGetUsersActiveTimeseries401 = UnauthorizedError
export const UsersGetUsersActiveTimeseries401 = UnauthorizedError
export type UsersGetUsersActiveTimeseries403 = ForbiddenError
export const UsersGetUsersActiveTimeseries403 = ForbiddenError
export type UsersGetUsersActiveTimeseries404 = NotFoundError
export const UsersGetUsersActiveTimeseries404 = NotFoundError
export type UsersGetUsersBreakdown200 = UsersBreakdown
export const UsersGetUsersBreakdown200 = UsersBreakdown
export type UsersGetUsersBreakdown401 = UnauthorizedError
export const UsersGetUsersBreakdown401 = UnauthorizedError
export type UsersGetUsersBreakdown403 = ForbiddenError
export const UsersGetUsersBreakdown403 = ForbiddenError
export type UsersGetUsersBreakdown404 = NotFoundError
export const UsersGetUsersBreakdown404 = NotFoundError
export type UsersGetUserByKey200 = UserListItem | null
export const UsersGetUserByKey200 = Schema.Union([UserListItem, Schema.Null])
export type UsersGetUserByKey401 = UnauthorizedError
export const UsersGetUserByKey401 = UnauthorizedError
export type UsersGetUserByKey403 = ForbiddenError
export const UsersGetUserByKey403 = ForbiddenError
export type UsersGetUserByKey404 = NotFoundError
export const UsersGetUserByKey404 = NotFoundError
export type UsersGetUserSessionsRequestJson = { readonly "userIds": ReadonlyArray<string> }
export const UsersGetUserSessionsRequestJson = Schema.Struct({ "userIds": Schema.Array(Schema.String) })
export type UsersGetUserSessions200 = ReadonlyArray<UserSessionEvent>
export const UsersGetUserSessions200 = Schema.Array(UserSessionEvent)
export type UsersGetUserSessions401 = UnauthorizedError
export const UsersGetUserSessions401 = UnauthorizedError
export type UsersGetUserSessions403 = ForbiddenError
export const UsersGetUserSessions403 = ForbiddenError
export type UsersGetUserSessions404 = NotFoundError
export const UsersGetUserSessions404 = NotFoundError
export type UsersGetUserErrorsRequestJson = { readonly "userIds": ReadonlyArray<string> }
export const UsersGetUserErrorsRequestJson = Schema.Struct({ "userIds": Schema.Array(Schema.String) })
export type UsersGetUserErrors200 = ReadonlyArray<UserErrorOccurrence>
export const UsersGetUserErrors200 = Schema.Array(UserErrorOccurrence)
export type UsersGetUserErrors401 = UnauthorizedError
export const UsersGetUserErrors401 = UnauthorizedError
export type UsersGetUserErrors403 = ForbiddenError
export const UsersGetUserErrors403 = ForbiddenError
export type UsersGetUserErrors404 = NotFoundError
export const UsersGetUserErrors404 = NotFoundError
export type UsersDeleteUserData401 = UnauthorizedError
export const UsersDeleteUserData401 = UnauthorizedError
export type UsersDeleteUserData403 = ForbiddenError
export const UsersDeleteUserData403 = ForbiddenError
export type UsersDeleteUserData404 = NotFoundError
export const UsersDeleteUserData404 = NotFoundError
export type UsersRemoveUserIdentification401 = UnauthorizedError
export const UsersRemoveUserIdentification401 = UnauthorizedError
export type UsersRemoveUserIdentification403 = ForbiddenError
export const UsersRemoveUserIdentification403 = ForbiddenError
export type UsersRemoveUserIdentification404 = NotFoundError
export const UsersRemoveUserIdentification404 = NotFoundError
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
export type SessionReplaysListReplaysParams = { readonly "from"?: string | null, readonly "to"?: string | null, readonly "pageSize"?: string | null, readonly "cursorStartedAt"?: string | null, readonly "cursorSessionId"?: string | null, readonly "cursorWindowId"?: string | null, readonly "collectionId"?: string | null, readonly "userIds"?: ReadonlyArray<string> | string | null }
export const SessionReplaysListReplaysParams = Schema.Struct({ "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "pageSize": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "cursorStartedAt": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "cursorSessionId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "cursorWindowId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "collectionId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "userIds": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Array(Schema.String), Schema.String]), Schema.Null])) })
export type SessionReplaysListReplays200 = ReadonlyArray<SessionReplayListItem>
export const SessionReplaysListReplays200 = Schema.Array(SessionReplayListItem)
export type SessionReplaysListReplays400 = SessionReplaysValidationError
export const SessionReplaysListReplays400 = SessionReplaysValidationError
export type SessionReplaysListReplays401 = UnauthorizedError
export const SessionReplaysListReplays401 = UnauthorizedError
export type SessionReplaysListReplays403 = ForbiddenError
export const SessionReplaysListReplays403 = ForbiddenError
export type SessionReplaysListReplays404 = NotFoundError
export const SessionReplaysListReplays404 = NotFoundError
export type SessionReplaysDeleteAllReplays400 = SessionReplaysValidationError
export const SessionReplaysDeleteAllReplays400 = SessionReplaysValidationError
export type SessionReplaysDeleteAllReplays401 = UnauthorizedError
export const SessionReplaysDeleteAllReplays401 = UnauthorizedError
export type SessionReplaysDeleteAllReplays403 = ForbiddenError
export const SessionReplaysDeleteAllReplays403 = ForbiddenError
export type SessionReplaysDeleteAllReplays404 = NotFoundError
export const SessionReplaysDeleteAllReplays404 = NotFoundError
export type SessionReplaysGetReplayCountParams = { readonly "from"?: string | null, readonly "to"?: string | null, readonly "collectionId"?: string | null, readonly "userIds"?: ReadonlyArray<string> | string | null }
export const SessionReplaysGetReplayCountParams = Schema.Struct({ "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "collectionId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "userIds": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Array(Schema.String), Schema.String]), Schema.Null])) })
export type SessionReplaysGetReplayCount200 = number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN"
export const SessionReplaysGetReplayCount200 = Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])])
export type SessionReplaysGetReplayCount400 = SessionReplaysValidationError
export const SessionReplaysGetReplayCount400 = SessionReplaysValidationError
export type SessionReplaysGetReplayCount401 = UnauthorizedError
export const SessionReplaysGetReplayCount401 = UnauthorizedError
export type SessionReplaysGetReplayCount403 = ForbiddenError
export const SessionReplaysGetReplayCount403 = ForbiddenError
export type SessionReplaysGetReplayCount404 = NotFoundError
export const SessionReplaysGetReplayCount404 = NotFoundError
export type SessionReplaysListReplayCollections200 = ReadonlyArray<ReplayCollectionRecord>
export const SessionReplaysListReplayCollections200 = Schema.Array(ReplayCollectionRecord)
export type SessionReplaysListReplayCollections400 = SessionReplaysValidationError
export const SessionReplaysListReplayCollections400 = SessionReplaysValidationError
export type SessionReplaysListReplayCollections401 = UnauthorizedError
export const SessionReplaysListReplayCollections401 = UnauthorizedError
export type SessionReplaysListReplayCollections403 = ForbiddenError
export const SessionReplaysListReplayCollections403 = ForbiddenError
export type SessionReplaysListReplayCollections404 = NotFoundError
export const SessionReplaysListReplayCollections404 = NotFoundError
export type SessionReplaysCreateReplayCollectionRequestJson = { readonly "name": string, readonly "mode": "manual" | "automatic", readonly "filterConfig"?: { readonly "viewed"?: boolean | null, readonly "identifiedState"?: "identified" | "anonymous" | null, readonly "browserIn"?: ReadonlyArray<string> | null, readonly "osIn"?: ReadonlyArray<string> | null, readonly "countryIn"?: ReadonlyArray<string> | null, readonly "routeVisitedAny"?: ReadonlyArray<string> | null, readonly "minEventCount"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "maxEventCount"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "minDurationMs"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "maxDurationMs"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "hasErrors"?: boolean | null, readonly "hasPoorVitals"?: boolean | null, readonly "poorVitalMetric"?: string | null, readonly "playbackStart"?: "session_start" | "matched_event" | null, readonly "datasourceFilters"?: ReadonlyArray<{ readonly "referenceId": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "greater_than" | "less_than", readonly "value": string, readonly "dataType"?: "string" | "number" | "boolean" | null }> | null } | null | null }
export const SessionReplaysCreateReplayCollectionRequestJson = Schema.Struct({ "name": Schema.String, "mode": Schema.Literals(["manual", "automatic"]), "filterConfig": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Struct({ "viewed": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "identifiedState": Schema.optionalKey(Schema.Union([Schema.Literals(["identified", "anonymous"]), Schema.Null])), "browserIn": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "osIn": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "countryIn": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "routeVisitedAny": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "minEventCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "maxEventCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "minDurationMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "maxDurationMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "hasErrors": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "hasPoorVitals": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "poorVitalMetric": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "playbackStart": Schema.optionalKey(Schema.Union([Schema.Literals(["session_start", "matched_event"]), Schema.Null])), "datasourceFilters": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "referenceId": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "greater_than", "less_than"]), "value": Schema.String, "dataType": Schema.optionalKey(Schema.Union([Schema.Literals(["string", "number", "boolean"]), Schema.Null])) })), Schema.Null])) }), Schema.Null]), Schema.Null])) })
export type SessionReplaysCreateReplayCollection200 = ReplayCollectionRecord
export const SessionReplaysCreateReplayCollection200 = ReplayCollectionRecord
export type SessionReplaysCreateReplayCollection400 = SessionReplaysValidationError
export const SessionReplaysCreateReplayCollection400 = SessionReplaysValidationError
export type SessionReplaysCreateReplayCollection401 = UnauthorizedError
export const SessionReplaysCreateReplayCollection401 = UnauthorizedError
export type SessionReplaysCreateReplayCollection403 = ForbiddenError
export const SessionReplaysCreateReplayCollection403 = ForbiddenError
export type SessionReplaysCreateReplayCollection404 = NotFoundError
export const SessionReplaysCreateReplayCollection404 = NotFoundError
export type SessionReplaysDeleteReplayCollection400 = SessionReplaysValidationError
export const SessionReplaysDeleteReplayCollection400 = SessionReplaysValidationError
export type SessionReplaysDeleteReplayCollection401 = UnauthorizedError
export const SessionReplaysDeleteReplayCollection401 = UnauthorizedError
export type SessionReplaysDeleteReplayCollection403 = ForbiddenError
export const SessionReplaysDeleteReplayCollection403 = ForbiddenError
export type SessionReplaysDeleteReplayCollection404 = NotFoundError
export const SessionReplaysDeleteReplayCollection404 = NotFoundError
export type SessionReplaysUpdateReplayCollectionRequestJson = { readonly "name"?: string | null, readonly "mode"?: "manual" | "automatic" | null, readonly "filterConfig"?: { readonly "viewed"?: boolean | null, readonly "identifiedState"?: "identified" | "anonymous" | null, readonly "browserIn"?: ReadonlyArray<string> | null, readonly "osIn"?: ReadonlyArray<string> | null, readonly "countryIn"?: ReadonlyArray<string> | null, readonly "routeVisitedAny"?: ReadonlyArray<string> | null, readonly "minEventCount"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "maxEventCount"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "minDurationMs"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "maxDurationMs"?: number | "NaN" | "Infinity" | "-Infinity" | "Infinity" | "-Infinity" | "NaN" | null, readonly "hasErrors"?: boolean | null, readonly "hasPoorVitals"?: boolean | null, readonly "poorVitalMetric"?: string | null, readonly "playbackStart"?: "session_start" | "matched_event" | null, readonly "datasourceFilters"?: ReadonlyArray<{ readonly "referenceId": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "greater_than" | "less_than", readonly "value": string, readonly "dataType"?: "string" | "number" | "boolean" | null }> | null } | null | null }
export const SessionReplaysUpdateReplayCollectionRequestJson = Schema.Struct({ "name": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "mode": Schema.optionalKey(Schema.Union([Schema.Literals(["manual", "automatic"]), Schema.Null])), "filterConfig": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Struct({ "viewed": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "identifiedState": Schema.optionalKey(Schema.Union([Schema.Literals(["identified", "anonymous"]), Schema.Null])), "browserIn": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "osIn": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "countryIn": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "routeVisitedAny": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "minEventCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "maxEventCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "minDurationMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "maxDurationMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite()), Schema.Literal("NaN"), Schema.Literal("Infinity"), Schema.Literal("-Infinity")]), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "hasErrors": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "hasPoorVitals": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "poorVitalMetric": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "playbackStart": Schema.optionalKey(Schema.Union([Schema.Literals(["session_start", "matched_event"]), Schema.Null])), "datasourceFilters": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "referenceId": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "greater_than", "less_than"]), "value": Schema.String, "dataType": Schema.optionalKey(Schema.Union([Schema.Literals(["string", "number", "boolean"]), Schema.Null])) })), Schema.Null])) }), Schema.Null]), Schema.Null])) })
export type SessionReplaysUpdateReplayCollection200 = ReplayCollectionRecord
export const SessionReplaysUpdateReplayCollection200 = ReplayCollectionRecord
export type SessionReplaysUpdateReplayCollection400 = SessionReplaysValidationError
export const SessionReplaysUpdateReplayCollection400 = SessionReplaysValidationError
export type SessionReplaysUpdateReplayCollection401 = UnauthorizedError
export const SessionReplaysUpdateReplayCollection401 = UnauthorizedError
export type SessionReplaysUpdateReplayCollection403 = ForbiddenError
export const SessionReplaysUpdateReplayCollection403 = ForbiddenError
export type SessionReplaysUpdateReplayCollection404 = NotFoundError
export const SessionReplaysUpdateReplayCollection404 = NotFoundError
export type SessionReplaysListReplayCollectionAssignments200 = ReplayCollectionAssignmentsResponse
export const SessionReplaysListReplayCollectionAssignments200 = ReplayCollectionAssignmentsResponse
export type SessionReplaysListReplayCollectionAssignments400 = SessionReplaysValidationError
export const SessionReplaysListReplayCollectionAssignments400 = SessionReplaysValidationError
export type SessionReplaysListReplayCollectionAssignments401 = UnauthorizedError
export const SessionReplaysListReplayCollectionAssignments401 = UnauthorizedError
export type SessionReplaysListReplayCollectionAssignments403 = ForbiddenError
export const SessionReplaysListReplayCollectionAssignments403 = ForbiddenError
export type SessionReplaysListReplayCollectionAssignments404 = NotFoundError
export const SessionReplaysListReplayCollectionAssignments404 = NotFoundError
export type SessionReplaysSetReplayCollectionAssignmentsRequestJson = { readonly "collectionIds": ReadonlyArray<string> }
export const SessionReplaysSetReplayCollectionAssignmentsRequestJson = Schema.Struct({ "collectionIds": Schema.Array(Schema.String) })
export type SessionReplaysSetReplayCollectionAssignments200 = ReplayCollectionAssignmentsResponse
export const SessionReplaysSetReplayCollectionAssignments200 = ReplayCollectionAssignmentsResponse
export type SessionReplaysSetReplayCollectionAssignments400 = SessionReplaysValidationError
export const SessionReplaysSetReplayCollectionAssignments400 = SessionReplaysValidationError
export type SessionReplaysSetReplayCollectionAssignments401 = UnauthorizedError
export const SessionReplaysSetReplayCollectionAssignments401 = UnauthorizedError
export type SessionReplaysSetReplayCollectionAssignments403 = ForbiddenError
export const SessionReplaysSetReplayCollectionAssignments403 = ForbiddenError
export type SessionReplaysSetReplayCollectionAssignments404 = NotFoundError
export const SessionReplaysSetReplayCollectionAssignments404 = NotFoundError
export type SessionReplaysGetReplayEventsPageParams = { readonly "cursorId"?: string | null, readonly "cursorSequence"?: string | null, readonly "cursorFirstEventTimestampMs"?: string | null, readonly "cursorCreatedAt"?: string | null, readonly "limitChunks"?: string | null, readonly "pageBytes"?: string | null }
export const SessionReplaysGetReplayEventsPageParams = Schema.Struct({ "cursorId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "cursorSequence": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "cursorFirstEventTimestampMs": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "cursorCreatedAt": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "limitChunks": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "pageBytes": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type SessionReplaysGetReplayEventsPage200 = ReplayEventsPageResponse
export const SessionReplaysGetReplayEventsPage200 = ReplayEventsPageResponse
export type SessionReplaysGetReplayEventsPage400 = SessionReplaysValidationError
export const SessionReplaysGetReplayEventsPage400 = SessionReplaysValidationError
export type SessionReplaysGetReplayEventsPage401 = UnauthorizedError
export const SessionReplaysGetReplayEventsPage401 = UnauthorizedError
export type SessionReplaysGetReplayEventsPage403 = ForbiddenError
export const SessionReplaysGetReplayEventsPage403 = ForbiddenError
export type SessionReplaysGetReplayEventsPage404 = NotFoundError
export const SessionReplaysGetReplayEventsPage404 = NotFoundError
export type SessionReplaysGetSessionErrors200 = ReadonlyArray<SessionError>
export const SessionReplaysGetSessionErrors200 = Schema.Array(SessionError)
export type SessionReplaysGetSessionErrors400 = SessionReplaysValidationError
export const SessionReplaysGetSessionErrors400 = SessionReplaysValidationError
export type SessionReplaysGetSessionErrors401 = UnauthorizedError
export const SessionReplaysGetSessionErrors401 = UnauthorizedError
export type SessionReplaysGetSessionErrors403 = ForbiddenError
export const SessionReplaysGetSessionErrors403 = ForbiddenError
export type SessionReplaysGetSessionErrors404 = NotFoundError
export const SessionReplaysGetSessionErrors404 = NotFoundError
export type SessionReplaysGetSessionVitals200 = ReadonlyArray<SessionVital>
export const SessionReplaysGetSessionVitals200 = Schema.Array(SessionVital)
export type SessionReplaysGetSessionVitals400 = SessionReplaysValidationError
export const SessionReplaysGetSessionVitals400 = SessionReplaysValidationError
export type SessionReplaysGetSessionVitals401 = UnauthorizedError
export const SessionReplaysGetSessionVitals401 = UnauthorizedError
export type SessionReplaysGetSessionVitals403 = ForbiddenError
export const SessionReplaysGetSessionVitals403 = ForbiddenError
export type SessionReplaysGetSessionVitals404 = NotFoundError
export const SessionReplaysGetSessionVitals404 = NotFoundError
export type SessionReplaysDeleteReplay400 = SessionReplaysValidationError
export const SessionReplaysDeleteReplay400 = SessionReplaysValidationError
export type SessionReplaysDeleteReplay401 = UnauthorizedError
export const SessionReplaysDeleteReplay401 = UnauthorizedError
export type SessionReplaysDeleteReplay403 = ForbiddenError
export const SessionReplaysDeleteReplay403 = ForbiddenError
export type SessionReplaysDeleteReplay404 = NotFoundError
export const SessionReplaysDeleteReplay404 = NotFoundError
export type SessionReplaysMarkReplayViewed400 = SessionReplaysValidationError
export const SessionReplaysMarkReplayViewed400 = SessionReplaysValidationError
export type SessionReplaysMarkReplayViewed401 = UnauthorizedError
export const SessionReplaysMarkReplayViewed401 = UnauthorizedError
export type SessionReplaysMarkReplayViewed403 = ForbiddenError
export const SessionReplaysMarkReplayViewed403 = ForbiddenError
export type SessionReplaysMarkReplayViewed404 = NotFoundError
export const SessionReplaysMarkReplayViewed404 = NotFoundError

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
    "ProjectsResetProjectErrorTracking": (id, options) => HttpClientRequest.post(`/v0/project/${id}/error-tracking/reset`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("ProjectsResetProjectErrorTracking400", ProjectsResetProjectErrorTracking400),
      "401": decodeError("ProjectsResetProjectErrorTracking401", ProjectsResetProjectErrorTracking401),
      "403": decodeError("ProjectsResetProjectErrorTracking403", ProjectsResetProjectErrorTracking403),
      "404": decodeError("ProjectsResetProjectErrorTracking404", ProjectsResetProjectErrorTracking404),
      "409": decodeError("ProjectsResetProjectErrorTracking409", ProjectsResetProjectErrorTracking409),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "DashboardsListDashboards": (idOrSlug, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/dashboards`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DashboardsListDashboards200),
      "400": decodeError("DashboardsListDashboards400", DashboardsListDashboards400),
      "401": decodeError("DashboardsListDashboards401", DashboardsListDashboards401),
      "403": decodeError("DashboardsListDashboards403", DashboardsListDashboards403),
      "404": decodeError("DashboardsListDashboards404", DashboardsListDashboards404),
      orElse: unexpectedStatus
    }))
  ),
    "DashboardsCreateDashboard": (idOrSlug, options) => HttpClientRequest.post(`/v0/project/${idOrSlug}/dashboards`).pipe(
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
    "DashboardsReorderDashboards": (idOrSlug, options) => HttpClientRequest.patch(`/v0/project/${idOrSlug}/dashboards/reorder`).pipe(
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
    "DashboardsDuplicateDashboard": (idOrSlug, id, options) => HttpClientRequest.post(`/v0/project/${idOrSlug}/dashboards/${id}/duplicate`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DashboardsDuplicateDashboard200),
      "400": decodeError("DashboardsDuplicateDashboard400", DashboardsDuplicateDashboard400),
      "401": decodeError("DashboardsDuplicateDashboard401", DashboardsDuplicateDashboard401),
      "403": decodeError("DashboardsDuplicateDashboard403", DashboardsDuplicateDashboard403),
      "404": decodeError("DashboardsDuplicateDashboard404", DashboardsDuplicateDashboard404),
      orElse: unexpectedStatus
    }))
  ),
    "DashboardsCopyDashboard": (idOrSlug, id, options) => HttpClientRequest.post(`/v0/project/${idOrSlug}/dashboards/${id}/copy`).pipe(
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
    "DashboardsDeleteDashboard": (idOrSlug, id, options) => HttpClientRequest.delete(`/v0/project/${idOrSlug}/dashboards/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("DashboardsDeleteDashboard400", DashboardsDeleteDashboard400),
      "401": decodeError("DashboardsDeleteDashboard401", DashboardsDeleteDashboard401),
      "403": decodeError("DashboardsDeleteDashboard403", DashboardsDeleteDashboard403),
      "404": decodeError("DashboardsDeleteDashboard404", DashboardsDeleteDashboard404),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "DashboardsUpdateDashboard": (idOrSlug, id, options) => HttpClientRequest.patch(`/v0/project/${idOrSlug}/dashboards/${id}`).pipe(
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
    "ChartsListCharts": (idOrSlug, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/charts`).pipe(
    HttpClientRequest.setUrlParams({ "dashboardId": options?.params?.["dashboardId"] as any, "chartId": options?.params?.["chartId"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ChartsListCharts200),
      "400": decodeError("ChartsListCharts400", ChartsListCharts400),
      "401": decodeError("ChartsListCharts401", ChartsListCharts401),
      "403": decodeError("ChartsListCharts403", ChartsListCharts403),
      "404": decodeError("ChartsListCharts404", ChartsListCharts404),
      orElse: unexpectedStatus
    }))
  ),
    "ChartsCreateChart": (idOrSlug, options) => HttpClientRequest.post(`/v0/project/${idOrSlug}/charts`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("ChartsCreateChart400", ChartsCreateChart400),
      "401": decodeError("ChartsCreateChart401", ChartsCreateChart401),
      "403": decodeError("ChartsCreateChart403", ChartsCreateChart403),
      "404": decodeError("ChartsCreateChart404", ChartsCreateChart404),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "ChartsDeleteChart": (idOrSlug, id, options) => HttpClientRequest.delete(`/v0/project/${idOrSlug}/charts/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("ChartsDeleteChart400", ChartsDeleteChart400),
      "401": decodeError("ChartsDeleteChart401", ChartsDeleteChart401),
      "403": decodeError("ChartsDeleteChart403", ChartsDeleteChart403),
      "404": decodeError("ChartsDeleteChart404", ChartsDeleteChart404),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "ChartsUpdateChart": (idOrSlug, id, options) => HttpClientRequest.patch(`/v0/project/${idOrSlug}/charts/${id}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("ChartsUpdateChart400", ChartsUpdateChart400),
      "401": decodeError("ChartsUpdateChart401", ChartsUpdateChart401),
      "403": decodeError("ChartsUpdateChart403", ChartsUpdateChart403),
      "404": decodeError("ChartsUpdateChart404", ChartsUpdateChart404),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "MetricsGetPreviewData": (idOrSlug, options) => HttpClientRequest.post(`/v0/project/${idOrSlug}/metrics/preview`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(MetricsGetPreviewData200),
      "401": decodeError("MetricsGetPreviewData401", MetricsGetPreviewData401),
      "403": decodeError("MetricsGetPreviewData403", MetricsGetPreviewData403),
      "404": decodeError("MetricsGetPreviewData404", MetricsGetPreviewData404),
      "500": decodeError("MetricsGetPreviewData500", MetricsGetPreviewData500),
      orElse: unexpectedStatus
    }))
  ),
    "MetricsLoadDashboardData": (options) => HttpClientRequest.post(`/v0/metrics/dashboard-data`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(MetricsLoadDashboardData200),
      "401": decodeError("MetricsLoadDashboardData401", MetricsLoadDashboardData401),
      "403": decodeError("MetricsLoadDashboardData403", MetricsLoadDashboardData403),
      "404": decodeError("MetricsLoadDashboardData404", MetricsLoadDashboardData404),
      "500": decodeError("MetricsLoadDashboardData500", MetricsLoadDashboardData500),
      orElse: unexpectedStatus
    }))
  ),
    "MetricsGetDashboardFilterSuggestions": (idOrSlug, options) => HttpClientRequest.post(`/v0/project/${idOrSlug}/metrics/filter-suggestions`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(MetricsGetDashboardFilterSuggestions200),
      "401": decodeError("MetricsGetDashboardFilterSuggestions401", MetricsGetDashboardFilterSuggestions401),
      "403": decodeError("MetricsGetDashboardFilterSuggestions403", MetricsGetDashboardFilterSuggestions403),
      "404": decodeError("MetricsGetDashboardFilterSuggestions404", MetricsGetDashboardFilterSuggestions404),
      "500": decodeError("MetricsGetDashboardFilterSuggestions500", MetricsGetDashboardFilterSuggestions500),
      orElse: unexpectedStatus
    }))
  ),
    "MetricsGetProjectsDashboardData": (options) => HttpClientRequest.post(`/v0/metrics/projects-dashboard`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(MetricsGetProjectsDashboardData200),
      "401": decodeError("MetricsGetProjectsDashboardData401", MetricsGetProjectsDashboardData401),
      "403": decodeError("MetricsGetProjectsDashboardData403", MetricsGetProjectsDashboardData403),
      "404": decodeError("MetricsGetProjectsDashboardData404", MetricsGetProjectsDashboardData404),
      "500": decodeError("MetricsGetProjectsDashboardData500", MetricsGetProjectsDashboardData500),
      orElse: unexpectedStatus
    }))
  ),
    "MetricsGetPublicChartData": (chartId, options) => HttpClientRequest.get(`/v0/metrics/embed/${chartId}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(MetricsGetPublicChartData200),
      "404": decodeError("MetricsGetPublicChartData404", MetricsGetPublicChartData404),
      "500": decodeError("MetricsGetPublicChartData500", MetricsGetPublicChartData500),
      orElse: unexpectedStatus
    }))
  ),
    "FunnelsListFunnels": (idOrSlug, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/funnels`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FunnelsListFunnels200),
      "400": decodeError("FunnelsListFunnels400", FunnelsListFunnels400),
      "401": decodeError("FunnelsListFunnels401", FunnelsListFunnels401),
      "403": decodeError("FunnelsListFunnels403", FunnelsListFunnels403),
      "404": decodeError("FunnelsListFunnels404", FunnelsListFunnels404),
      orElse: unexpectedStatus
    }))
  ),
    "FunnelsCreateFunnel": (idOrSlug, options) => HttpClientRequest.post(`/v0/project/${idOrSlug}/funnels`).pipe(
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
    "FunnelsGetFunnel": (idOrSlug, id, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/funnels/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FunnelsGetFunnel200),
      "400": decodeError("FunnelsGetFunnel400", FunnelsGetFunnel400),
      "401": decodeError("FunnelsGetFunnel401", FunnelsGetFunnel401),
      "403": decodeError("FunnelsGetFunnel403", FunnelsGetFunnel403),
      "404": decodeError("FunnelsGetFunnel404", FunnelsGetFunnel404),
      orElse: unexpectedStatus
    }))
  ),
    "FunnelsDeleteFunnel": (idOrSlug, id, options) => HttpClientRequest.delete(`/v0/project/${idOrSlug}/funnels/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("FunnelsDeleteFunnel400", FunnelsDeleteFunnel400),
      "401": decodeError("FunnelsDeleteFunnel401", FunnelsDeleteFunnel401),
      "403": decodeError("FunnelsDeleteFunnel403", FunnelsDeleteFunnel403),
      "404": decodeError("FunnelsDeleteFunnel404", FunnelsDeleteFunnel404),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "FunnelsUpdateFunnel": (idOrSlug, id, options) => HttpClientRequest.patch(`/v0/project/${idOrSlug}/funnels/${id}`).pipe(
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
    "FunnelsDuplicateFunnel": (idOrSlug, id, options) => HttpClientRequest.post(`/v0/project/${idOrSlug}/funnels/${id}/duplicate`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FunnelsDuplicateFunnel200),
      "400": decodeError("FunnelsDuplicateFunnel400", FunnelsDuplicateFunnel400),
      "401": decodeError("FunnelsDuplicateFunnel401", FunnelsDuplicateFunnel401),
      "403": decodeError("FunnelsDuplicateFunnel403", FunnelsDuplicateFunnel403),
      "404": decodeError("FunnelsDuplicateFunnel404", FunnelsDuplicateFunnel404),
      orElse: unexpectedStatus
    }))
  ),
    "DataSourcesListDataSources": (idOrSlug, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/data-sources`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DataSourcesListDataSources200),
      "400": decodeError("DataSourcesListDataSources400", DataSourcesListDataSources400),
      "401": decodeError("DataSourcesListDataSources401", DataSourcesListDataSources401),
      "403": decodeError("DataSourcesListDataSources403", DataSourcesListDataSources403),
      "404": decodeError("DataSourcesListDataSources404", DataSourcesListDataSources404),
      orElse: unexpectedStatus
    }))
  ),
    "DataSourcesCreateDataSource": (idOrSlug, options) => HttpClientRequest.post(`/v0/project/${idOrSlug}/data-sources`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DataSourcesCreateDataSource200),
      "400": decodeError("DataSourcesCreateDataSource400", DataSourcesCreateDataSource400),
      "401": decodeError("DataSourcesCreateDataSource401", DataSourcesCreateDataSource401),
      "403": decodeError("DataSourcesCreateDataSource403", DataSourcesCreateDataSource403),
      "404": decodeError("DataSourcesCreateDataSource404", DataSourcesCreateDataSource404),
      orElse: unexpectedStatus
    }))
  ),
    "DataSourcesDeleteDataSource": (idOrSlug, id, options) => HttpClientRequest.delete(`/v0/project/${idOrSlug}/data-sources/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("DataSourcesDeleteDataSource400", DataSourcesDeleteDataSource400),
      "401": decodeError("DataSourcesDeleteDataSource401", DataSourcesDeleteDataSource401),
      "403": decodeError("DataSourcesDeleteDataSource403", DataSourcesDeleteDataSource403),
      "404": decodeError("DataSourcesDeleteDataSource404", DataSourcesDeleteDataSource404),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "DataSourcesUpdateDataSource": (idOrSlug, id, options) => HttpClientRequest.patch(`/v0/project/${idOrSlug}/data-sources/${id}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DataSourcesUpdateDataSource200),
      "400": decodeError("DataSourcesUpdateDataSource400", DataSourcesUpdateDataSource400),
      "401": decodeError("DataSourcesUpdateDataSource401", DataSourcesUpdateDataSource401),
      "403": decodeError("DataSourcesUpdateDataSource403", DataSourcesUpdateDataSource403),
      "404": decodeError("DataSourcesUpdateDataSource404", DataSourcesUpdateDataSource404),
      orElse: unexpectedStatus
    }))
  ),
    "NetworkRulesListNetworkRules": (idOrSlug, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/network-rules`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(NetworkRulesListNetworkRules200),
      "400": decodeError("NetworkRulesListNetworkRules400", NetworkRulesListNetworkRules400),
      "401": decodeError("NetworkRulesListNetworkRules401", NetworkRulesListNetworkRules401),
      "403": decodeError("NetworkRulesListNetworkRules403", NetworkRulesListNetworkRules403),
      "404": decodeError("NetworkRulesListNetworkRules404", NetworkRulesListNetworkRules404),
      orElse: unexpectedStatus
    }))
  ),
    "NetworkRulesCreateNetworkRule": (idOrSlug, options) => HttpClientRequest.post(`/v0/project/${idOrSlug}/network-rules`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(NetworkRulesCreateNetworkRule200),
      "400": decodeError("NetworkRulesCreateNetworkRule400", NetworkRulesCreateNetworkRule400),
      "401": decodeError("NetworkRulesCreateNetworkRule401", NetworkRulesCreateNetworkRule401),
      "403": decodeError("NetworkRulesCreateNetworkRule403", NetworkRulesCreateNetworkRule403),
      "404": decodeError("NetworkRulesCreateNetworkRule404", NetworkRulesCreateNetworkRule404),
      orElse: unexpectedStatus
    }))
  ),
    "NetworkRulesDeleteNetworkRule": (idOrSlug, id, options) => HttpClientRequest.delete(`/v0/project/${idOrSlug}/network-rules/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("NetworkRulesDeleteNetworkRule400", NetworkRulesDeleteNetworkRule400),
      "401": decodeError("NetworkRulesDeleteNetworkRule401", NetworkRulesDeleteNetworkRule401),
      "403": decodeError("NetworkRulesDeleteNetworkRule403", NetworkRulesDeleteNetworkRule403),
      "404": decodeError("NetworkRulesDeleteNetworkRule404", NetworkRulesDeleteNetworkRule404),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "DownloadsGetDownloadAnalytics": (idOrSlug, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/downloads`).pipe(
    HttpClientRequest.setUrlParams({ "dateFrom": options?.params?.["dateFrom"] as any, "dateTo": options?.params?.["dateTo"] as any, "versionNumber": options?.params?.["versionNumber"] as any, "granularity": options?.params?.["granularity"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DownloadsGetDownloadAnalytics200),
      "401": decodeError("DownloadsGetDownloadAnalytics401", DownloadsGetDownloadAnalytics401),
      "403": decodeError("DownloadsGetDownloadAnalytics403", DownloadsGetDownloadAnalytics403),
      "404": decodeError("DownloadsGetDownloadAnalytics404", DownloadsGetDownloadAnalytics404),
      "500": decodeError("DownloadsGetDownloadAnalytics500", DownloadsGetDownloadAnalytics500),
      orElse: unexpectedStatus
    }))
  ),
    "RetentionGetRetentionForProject": (idOrSlug, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/retention`).pipe(
    HttpClientRequest.setUrlParams({ "granularity": options.params["granularity"] as any, "cohortFrom": options.params["cohortFrom"] as any, "cohortTo": options.params["cohortTo"] as any, "periodCount": options.params["periodCount"] as any, "filters": options.params["filters"] as any, "filterMatch": options.params["filterMatch"] as any, "source": options.params["source"] as any }),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RetentionGetRetentionForProject200),
      "401": decodeError("RetentionGetRetentionForProject401", RetentionGetRetentionForProject401),
      "403": decodeError("RetentionGetRetentionForProject403", RetentionGetRetentionForProject403),
      "404": decodeError("RetentionGetRetentionForProject404", RetentionGetRetentionForProject404),
      orElse: unexpectedStatus
    }))
  ),
    "RetentionGetRetentionDriversForProject": (idOrSlug, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/retention/drivers`).pipe(
    HttpClientRequest.setUrlParams({ "granularity": options.params["granularity"] as any, "cohortFrom": options.params["cohortFrom"] as any, "cohortTo": options.params["cohortTo"] as any, "targetPeriod": options.params["targetPeriod"] as any, "source": options.params["source"] as any, "minSegmentUsers": options.params["minSegmentUsers"] as any }),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RetentionGetRetentionDriversForProject200),
      "401": decodeError("RetentionGetRetentionDriversForProject401", RetentionGetRetentionDriversForProject401),
      "403": decodeError("RetentionGetRetentionDriversForProject403", RetentionGetRetentionDriversForProject403),
      "404": decodeError("RetentionGetRetentionDriversForProject404", RetentionGetRetentionDriversForProject404),
      orElse: unexpectedStatus
    }))
  ),
    "EventExplorerGetEventExplorerRows": (idOrSlug, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/events`).pipe(
    HttpClientRequest.setUrlParams({ "templateId": options?.params?.["templateId"] as any, "mode": options?.params?.["mode"] as any, "page": options?.params?.["page"] as any, "pageSize": options?.params?.["pageSize"] as any, "fromTime": options?.params?.["fromTime"] as any, "toTime": options?.params?.["toTime"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(EventExplorerGetEventExplorerRows200),
      "401": decodeError("EventExplorerGetEventExplorerRows401", EventExplorerGetEventExplorerRows401),
      "403": decodeError("EventExplorerGetEventExplorerRows403", EventExplorerGetEventExplorerRows403),
      "404": decodeError("EventExplorerGetEventExplorerRows404", EventExplorerGetEventExplorerRows404),
      orElse: unexpectedStatus
    }))
  ),
    "UsersGetUsersForProject": (idOrSlug, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/users`).pipe(
    HttpClientRequest.setUrlParams({ "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any, "limit": options?.params?.["limit"] as any, "offset": options?.params?.["offset"] as any, "cohort": options?.params?.["cohort"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UsersGetUsersForProject200),
      "401": decodeError("UsersGetUsersForProject401", UsersGetUsersForProject401),
      "403": decodeError("UsersGetUsersForProject403", UsersGetUsersForProject403),
      "404": decodeError("UsersGetUsersForProject404", UsersGetUsersForProject404),
      orElse: unexpectedStatus
    }))
  ),
    "UsersGetUsersActiveTimeseries": (idOrSlug, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/users/active`).pipe(
    HttpClientRequest.setUrlParams({ "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any, "limit": options?.params?.["limit"] as any, "offset": options?.params?.["offset"] as any, "cohort": options?.params?.["cohort"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UsersGetUsersActiveTimeseries200),
      "401": decodeError("UsersGetUsersActiveTimeseries401", UsersGetUsersActiveTimeseries401),
      "403": decodeError("UsersGetUsersActiveTimeseries403", UsersGetUsersActiveTimeseries403),
      "404": decodeError("UsersGetUsersActiveTimeseries404", UsersGetUsersActiveTimeseries404),
      orElse: unexpectedStatus
    }))
  ),
    "UsersGetUsersBreakdown": (idOrSlug, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/users/breakdown`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UsersGetUsersBreakdown200),
      "401": decodeError("UsersGetUsersBreakdown401", UsersGetUsersBreakdown401),
      "403": decodeError("UsersGetUsersBreakdown403", UsersGetUsersBreakdown403),
      "404": decodeError("UsersGetUsersBreakdown404", UsersGetUsersBreakdown404),
      orElse: unexpectedStatus
    }))
  ),
    "UsersGetUserByKey": (idOrSlug, userKey, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/users/key/${userKey}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UsersGetUserByKey200),
      "401": decodeError("UsersGetUserByKey401", UsersGetUserByKey401),
      "403": decodeError("UsersGetUserByKey403", UsersGetUserByKey403),
      "404": decodeError("UsersGetUserByKey404", UsersGetUserByKey404),
      orElse: unexpectedStatus
    }))
  ),
    "UsersGetUserSessions": (idOrSlug, options) => HttpClientRequest.post(`/v0/project/${idOrSlug}/users/sessions`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UsersGetUserSessions200),
      "401": decodeError("UsersGetUserSessions401", UsersGetUserSessions401),
      "403": decodeError("UsersGetUserSessions403", UsersGetUserSessions403),
      "404": decodeError("UsersGetUserSessions404", UsersGetUserSessions404),
      orElse: unexpectedStatus
    }))
  ),
    "UsersGetUserErrors": (idOrSlug, options) => HttpClientRequest.post(`/v0/project/${idOrSlug}/users/errors`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UsersGetUserErrors200),
      "401": decodeError("UsersGetUserErrors401", UsersGetUserErrors401),
      "403": decodeError("UsersGetUserErrors403", UsersGetUserErrors403),
      "404": decodeError("UsersGetUserErrors404", UsersGetUserErrors404),
      orElse: unexpectedStatus
    }))
  ),
    "UsersDeleteUserData": (idOrSlug, userId, options) => HttpClientRequest.delete(`/v0/project/${idOrSlug}/users/${userId}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("UsersDeleteUserData401", UsersDeleteUserData401),
      "403": decodeError("UsersDeleteUserData403", UsersDeleteUserData403),
      "404": decodeError("UsersDeleteUserData404", UsersDeleteUserData404),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "UsersRemoveUserIdentification": (idOrSlug, userId, options) => HttpClientRequest.delete(`/v0/project/${idOrSlug}/users/${userId}/identification`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("UsersRemoveUserIdentification401", UsersRemoveUserIdentification401),
      "403": decodeError("UsersRemoveUserIdentification403", UsersRemoveUserIdentification403),
      "404": decodeError("UsersRemoveUserIdentification404", UsersRemoveUserIdentification404),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "WebVitalsGetWebVitalsForProject": (idOrSlug, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/vitals`).pipe(
    HttpClientRequest.setUrlParams({ "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(WebVitalsGetWebVitalsForProject200),
      "401": decodeError("WebVitalsGetWebVitalsForProject401", WebVitalsGetWebVitalsForProject401),
      "403": decodeError("WebVitalsGetWebVitalsForProject403", WebVitalsGetWebVitalsForProject403),
      "404": decodeError("WebVitalsGetWebVitalsForProject404", WebVitalsGetWebVitalsForProject404),
      orElse: unexpectedStatus
    }))
  ),
    "WebVitalsGetBuildDeploymentsForProject": (idOrSlug, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/vitals/build-deployments`).pipe(
    HttpClientRequest.setUrlParams({ "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(WebVitalsGetBuildDeploymentsForProject200),
      "401": decodeError("WebVitalsGetBuildDeploymentsForProject401", WebVitalsGetBuildDeploymentsForProject401),
      "403": decodeError("WebVitalsGetBuildDeploymentsForProject403", WebVitalsGetBuildDeploymentsForProject403),
      "404": decodeError("WebVitalsGetBuildDeploymentsForProject404", WebVitalsGetBuildDeploymentsForProject404),
      orElse: unexpectedStatus
    }))
  ),
    "WebVitalsGetWebVitalsTrends": (idOrSlug, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/vitals/trends`).pipe(
    HttpClientRequest.setUrlParams({ "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any, "bucketMs": options?.params?.["bucketMs"] as any, "device": options?.params?.["device"] as any, "browser": options?.params?.["browser"] as any, "os": options?.params?.["os"] as any, "country": options?.params?.["country"] as any, "route": options?.params?.["route"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(WebVitalsGetWebVitalsTrends200),
      "401": decodeError("WebVitalsGetWebVitalsTrends401", WebVitalsGetWebVitalsTrends401),
      "403": decodeError("WebVitalsGetWebVitalsTrends403", WebVitalsGetWebVitalsTrends403),
      "404": decodeError("WebVitalsGetWebVitalsTrends404", WebVitalsGetWebVitalsTrends404),
      orElse: unexpectedStatus
    }))
  ),
    "SessionReplaysListReplays": (idOrSlug, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/replays`).pipe(
    HttpClientRequest.setUrlParams({ "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any, "pageSize": options?.params?.["pageSize"] as any, "cursorStartedAt": options?.params?.["cursorStartedAt"] as any, "cursorSessionId": options?.params?.["cursorSessionId"] as any, "cursorWindowId": options?.params?.["cursorWindowId"] as any, "collectionId": options?.params?.["collectionId"] as any, "userIds": options?.params?.["userIds"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysListReplays200),
      "400": decodeError("SessionReplaysListReplays400", SessionReplaysListReplays400),
      "401": decodeError("SessionReplaysListReplays401", SessionReplaysListReplays401),
      "403": decodeError("SessionReplaysListReplays403", SessionReplaysListReplays403),
      "404": decodeError("SessionReplaysListReplays404", SessionReplaysListReplays404),
      orElse: unexpectedStatus
    }))
  ),
    "SessionReplaysDeleteAllReplays": (idOrSlug, options) => HttpClientRequest.delete(`/v0/project/${idOrSlug}/replays`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("SessionReplaysDeleteAllReplays400", SessionReplaysDeleteAllReplays400),
      "401": decodeError("SessionReplaysDeleteAllReplays401", SessionReplaysDeleteAllReplays401),
      "403": decodeError("SessionReplaysDeleteAllReplays403", SessionReplaysDeleteAllReplays403),
      "404": decodeError("SessionReplaysDeleteAllReplays404", SessionReplaysDeleteAllReplays404),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "SessionReplaysGetReplayCount": (idOrSlug, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/replays/count`).pipe(
    HttpClientRequest.setUrlParams({ "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any, "collectionId": options?.params?.["collectionId"] as any, "userIds": options?.params?.["userIds"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysGetReplayCount200),
      "400": decodeError("SessionReplaysGetReplayCount400", SessionReplaysGetReplayCount400),
      "401": decodeError("SessionReplaysGetReplayCount401", SessionReplaysGetReplayCount401),
      "403": decodeError("SessionReplaysGetReplayCount403", SessionReplaysGetReplayCount403),
      "404": decodeError("SessionReplaysGetReplayCount404", SessionReplaysGetReplayCount404),
      orElse: unexpectedStatus
    }))
  ),
    "SessionReplaysListReplayCollections": (idOrSlug, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/replay-collections`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysListReplayCollections200),
      "400": decodeError("SessionReplaysListReplayCollections400", SessionReplaysListReplayCollections400),
      "401": decodeError("SessionReplaysListReplayCollections401", SessionReplaysListReplayCollections401),
      "403": decodeError("SessionReplaysListReplayCollections403", SessionReplaysListReplayCollections403),
      "404": decodeError("SessionReplaysListReplayCollections404", SessionReplaysListReplayCollections404),
      orElse: unexpectedStatus
    }))
  ),
    "SessionReplaysCreateReplayCollection": (idOrSlug, options) => HttpClientRequest.post(`/v0/project/${idOrSlug}/replay-collections`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysCreateReplayCollection200),
      "400": decodeError("SessionReplaysCreateReplayCollection400", SessionReplaysCreateReplayCollection400),
      "401": decodeError("SessionReplaysCreateReplayCollection401", SessionReplaysCreateReplayCollection401),
      "403": decodeError("SessionReplaysCreateReplayCollection403", SessionReplaysCreateReplayCollection403),
      "404": decodeError("SessionReplaysCreateReplayCollection404", SessionReplaysCreateReplayCollection404),
      orElse: unexpectedStatus
    }))
  ),
    "SessionReplaysDeleteReplayCollection": (idOrSlug, id, options) => HttpClientRequest.delete(`/v0/project/${idOrSlug}/replay-collections/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("SessionReplaysDeleteReplayCollection400", SessionReplaysDeleteReplayCollection400),
      "401": decodeError("SessionReplaysDeleteReplayCollection401", SessionReplaysDeleteReplayCollection401),
      "403": decodeError("SessionReplaysDeleteReplayCollection403", SessionReplaysDeleteReplayCollection403),
      "404": decodeError("SessionReplaysDeleteReplayCollection404", SessionReplaysDeleteReplayCollection404),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "SessionReplaysUpdateReplayCollection": (idOrSlug, id, options) => HttpClientRequest.patch(`/v0/project/${idOrSlug}/replay-collections/${id}`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysUpdateReplayCollection200),
      "400": decodeError("SessionReplaysUpdateReplayCollection400", SessionReplaysUpdateReplayCollection400),
      "401": decodeError("SessionReplaysUpdateReplayCollection401", SessionReplaysUpdateReplayCollection401),
      "403": decodeError("SessionReplaysUpdateReplayCollection403", SessionReplaysUpdateReplayCollection403),
      "404": decodeError("SessionReplaysUpdateReplayCollection404", SessionReplaysUpdateReplayCollection404),
      orElse: unexpectedStatus
    }))
  ),
    "SessionReplaysListReplayCollectionAssignments": (idOrSlug, sessionId, windowId, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/replays/${sessionId}/${windowId}/collection-assignments`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysListReplayCollectionAssignments200),
      "400": decodeError("SessionReplaysListReplayCollectionAssignments400", SessionReplaysListReplayCollectionAssignments400),
      "401": decodeError("SessionReplaysListReplayCollectionAssignments401", SessionReplaysListReplayCollectionAssignments401),
      "403": decodeError("SessionReplaysListReplayCollectionAssignments403", SessionReplaysListReplayCollectionAssignments403),
      "404": decodeError("SessionReplaysListReplayCollectionAssignments404", SessionReplaysListReplayCollectionAssignments404),
      orElse: unexpectedStatus
    }))
  ),
    "SessionReplaysSetReplayCollectionAssignments": (idOrSlug, sessionId, windowId, options) => HttpClientRequest.put(`/v0/project/${idOrSlug}/replays/${sessionId}/${windowId}/collection-assignments`).pipe(
    HttpClientRequest.bodyJsonUnsafe(options.payload),
    withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysSetReplayCollectionAssignments200),
      "400": decodeError("SessionReplaysSetReplayCollectionAssignments400", SessionReplaysSetReplayCollectionAssignments400),
      "401": decodeError("SessionReplaysSetReplayCollectionAssignments401", SessionReplaysSetReplayCollectionAssignments401),
      "403": decodeError("SessionReplaysSetReplayCollectionAssignments403", SessionReplaysSetReplayCollectionAssignments403),
      "404": decodeError("SessionReplaysSetReplayCollectionAssignments404", SessionReplaysSetReplayCollectionAssignments404),
      orElse: unexpectedStatus
    }))
  ),
    "SessionReplaysGetReplayEventsPage": (idOrSlug, sessionId, windowId, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/replays/${sessionId}/${windowId}/events`).pipe(
    HttpClientRequest.setUrlParams({ "cursorId": options?.params?.["cursorId"] as any, "cursorSequence": options?.params?.["cursorSequence"] as any, "cursorFirstEventTimestampMs": options?.params?.["cursorFirstEventTimestampMs"] as any, "cursorCreatedAt": options?.params?.["cursorCreatedAt"] as any, "limitChunks": options?.params?.["limitChunks"] as any, "pageBytes": options?.params?.["pageBytes"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysGetReplayEventsPage200),
      "400": decodeError("SessionReplaysGetReplayEventsPage400", SessionReplaysGetReplayEventsPage400),
      "401": decodeError("SessionReplaysGetReplayEventsPage401", SessionReplaysGetReplayEventsPage401),
      "403": decodeError("SessionReplaysGetReplayEventsPage403", SessionReplaysGetReplayEventsPage403),
      "404": decodeError("SessionReplaysGetReplayEventsPage404", SessionReplaysGetReplayEventsPage404),
      orElse: unexpectedStatus
    }))
  ),
    "SessionReplaysGetSessionErrors": (idOrSlug, sessionId, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/replays/${sessionId}/errors`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysGetSessionErrors200),
      "400": decodeError("SessionReplaysGetSessionErrors400", SessionReplaysGetSessionErrors400),
      "401": decodeError("SessionReplaysGetSessionErrors401", SessionReplaysGetSessionErrors401),
      "403": decodeError("SessionReplaysGetSessionErrors403", SessionReplaysGetSessionErrors403),
      "404": decodeError("SessionReplaysGetSessionErrors404", SessionReplaysGetSessionErrors404),
      orElse: unexpectedStatus
    }))
  ),
    "SessionReplaysGetSessionVitals": (idOrSlug, sessionId, options) => HttpClientRequest.get(`/v0/project/${idOrSlug}/replays/${sessionId}/vitals`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysGetSessionVitals200),
      "400": decodeError("SessionReplaysGetSessionVitals400", SessionReplaysGetSessionVitals400),
      "401": decodeError("SessionReplaysGetSessionVitals401", SessionReplaysGetSessionVitals401),
      "403": decodeError("SessionReplaysGetSessionVitals403", SessionReplaysGetSessionVitals403),
      "404": decodeError("SessionReplaysGetSessionVitals404", SessionReplaysGetSessionVitals404),
      orElse: unexpectedStatus
    }))
  ),
    "SessionReplaysDeleteReplay": (idOrSlug, sessionId, windowId, options) => HttpClientRequest.delete(`/v0/project/${idOrSlug}/replays/${sessionId}/${windowId}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("SessionReplaysDeleteReplay400", SessionReplaysDeleteReplay400),
      "401": decodeError("SessionReplaysDeleteReplay401", SessionReplaysDeleteReplay401),
      "403": decodeError("SessionReplaysDeleteReplay403", SessionReplaysDeleteReplay403),
      "404": decodeError("SessionReplaysDeleteReplay404", SessionReplaysDeleteReplay404),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "SessionReplaysMarkReplayViewed": (idOrSlug, sessionId, windowId, options) => HttpClientRequest.post(`/v0/project/${idOrSlug}/replays/${sessionId}/${windowId}/viewed`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("SessionReplaysMarkReplayViewed400", SessionReplaysMarkReplayViewed400),
      "401": decodeError("SessionReplaysMarkReplayViewed401", SessionReplaysMarkReplayViewed401),
      "403": decodeError("SessionReplaysMarkReplayViewed403", SessionReplaysMarkReplayViewed403),
      "404": decodeError("SessionReplaysMarkReplayViewed404", SessionReplaysMarkReplayViewed404),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
  )
  }
}

export interface Api {
  readonly httpClient: HttpClient.HttpClient
  readonly "ProjectsListProjects": <Config extends OperationConfig>(options: { readonly params?: typeof ProjectsListProjectsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ProjectsListProjects200.Type, Config>, HttpClientError.HttpClientError | SchemaError>
  readonly "ProjectsListPublicProjects": <Config extends OperationConfig>(options: { readonly params?: typeof ProjectsListPublicProjectsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ProjectsListPublicProjects200.Type, Config>, HttpClientError.HttpClientError | SchemaError>
  readonly "ProjectsGetProject": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ProjectsGetProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsGetProject400", typeof ProjectsGetProject400.Type> | ApiError<"ProjectsGetProject401", typeof ProjectsGetProject401.Type> | ApiError<"ProjectsGetProject403", typeof ProjectsGetProject403.Type> | ApiError<"ProjectsGetProject404", typeof ProjectsGetProject404.Type> | ApiError<"ProjectsGetProject409", typeof ProjectsGetProject409.Type>>
  readonly "ProjectsCreateProject": <Config extends OperationConfig>(options: { readonly payload: typeof ProjectsCreateProjectRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ProjectsCreateProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsCreateProject400", typeof ProjectsCreateProject400.Type> | ApiError<"ProjectsCreateProject401", typeof ProjectsCreateProject401.Type> | ApiError<"ProjectsCreateProject403", typeof ProjectsCreateProject403.Type> | ApiError<"ProjectsCreateProject404", typeof ProjectsCreateProject404.Type> | ApiError<"ProjectsCreateProject409", typeof ProjectsCreateProject409.Type>>
  readonly "ProjectsDeleteProject": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof ProjectsDeleteProjectRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsDeleteProject400", typeof ProjectsDeleteProject400.Type> | ApiError<"ProjectsDeleteProject401", typeof ProjectsDeleteProject401.Type> | ApiError<"ProjectsDeleteProject403", typeof ProjectsDeleteProject403.Type> | ApiError<"ProjectsDeleteProject404", typeof ProjectsDeleteProject404.Type> | ApiError<"ProjectsDeleteProject409", typeof ProjectsDeleteProject409.Type>>
  readonly "ProjectsUpdateProject": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof ProjectsUpdateProjectRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ProjectsUpdateProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsUpdateProject400", typeof ProjectsUpdateProject400.Type> | ApiError<"ProjectsUpdateProject401", typeof ProjectsUpdateProject401.Type> | ApiError<"ProjectsUpdateProject403", typeof ProjectsUpdateProject403.Type> | ApiError<"ProjectsUpdateProject404", typeof ProjectsUpdateProject404.Type> | ApiError<"ProjectsUpdateProject409", typeof ProjectsUpdateProject409.Type>>
  readonly "ProjectsCheckSlugAvailability": <Config extends OperationConfig>(options: { readonly params: typeof ProjectsCheckSlugAvailabilityParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ProjectsCheckSlugAvailability200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsCheckSlugAvailability400", typeof ProjectsCheckSlugAvailability400.Type> | ApiError<"ProjectsCheckSlugAvailability401", typeof ProjectsCheckSlugAvailability401.Type> | ApiError<"ProjectsCheckSlugAvailability403", typeof ProjectsCheckSlugAvailability403.Type> | ApiError<"ProjectsCheckSlugAvailability404", typeof ProjectsCheckSlugAvailability404.Type> | ApiError<"ProjectsCheckSlugAvailability409", typeof ProjectsCheckSlugAvailability409.Type>>
  readonly "ProjectsMoveProject": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof ProjectsMoveProjectRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsMoveProject400", typeof ProjectsMoveProject400.Type> | ApiError<"ProjectsMoveProject401", typeof ProjectsMoveProject401.Type> | ApiError<"ProjectsMoveProject403", typeof ProjectsMoveProject403.Type> | ApiError<"ProjectsMoveProject404", typeof ProjectsMoveProject404.Type> | ApiError<"ProjectsMoveProject409", typeof ProjectsMoveProject409.Type>>
  readonly "ProjectsWipeProjectData": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof ProjectsWipeProjectDataRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsWipeProjectData400", typeof ProjectsWipeProjectData400.Type> | ApiError<"ProjectsWipeProjectData401", typeof ProjectsWipeProjectData401.Type> | ApiError<"ProjectsWipeProjectData403", typeof ProjectsWipeProjectData403.Type> | ApiError<"ProjectsWipeProjectData404", typeof ProjectsWipeProjectData404.Type> | ApiError<"ProjectsWipeProjectData409", typeof ProjectsWipeProjectData409.Type>>
  readonly "ProjectsResetProjectErrorTracking": <Config extends OperationConfig>(id: string, options: { readonly payload: typeof ProjectsResetProjectErrorTrackingRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsResetProjectErrorTracking400", typeof ProjectsResetProjectErrorTracking400.Type> | ApiError<"ProjectsResetProjectErrorTracking401", typeof ProjectsResetProjectErrorTracking401.Type> | ApiError<"ProjectsResetProjectErrorTracking403", typeof ProjectsResetProjectErrorTracking403.Type> | ApiError<"ProjectsResetProjectErrorTracking404", typeof ProjectsResetProjectErrorTracking404.Type> | ApiError<"ProjectsResetProjectErrorTracking409", typeof ProjectsResetProjectErrorTracking409.Type>>
  readonly "DashboardsListDashboards": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof DashboardsListDashboards200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DashboardsListDashboards400", typeof DashboardsListDashboards400.Type> | ApiError<"DashboardsListDashboards401", typeof DashboardsListDashboards401.Type> | ApiError<"DashboardsListDashboards403", typeof DashboardsListDashboards403.Type> | ApiError<"DashboardsListDashboards404", typeof DashboardsListDashboards404.Type>>
  readonly "DashboardsCreateDashboard": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof DashboardsCreateDashboardRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof DashboardsCreateDashboard200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DashboardsCreateDashboard400", typeof DashboardsCreateDashboard400.Type> | ApiError<"DashboardsCreateDashboard401", typeof DashboardsCreateDashboard401.Type> | ApiError<"DashboardsCreateDashboard403", typeof DashboardsCreateDashboard403.Type> | ApiError<"DashboardsCreateDashboard404", typeof DashboardsCreateDashboard404.Type>>
  readonly "DashboardsReorderDashboards": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof DashboardsReorderDashboardsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DashboardsReorderDashboards400", typeof DashboardsReorderDashboards400.Type> | ApiError<"DashboardsReorderDashboards401", typeof DashboardsReorderDashboards401.Type> | ApiError<"DashboardsReorderDashboards403", typeof DashboardsReorderDashboards403.Type> | ApiError<"DashboardsReorderDashboards404", typeof DashboardsReorderDashboards404.Type>>
  readonly "DashboardsDuplicateDashboard": <Config extends OperationConfig>(idOrSlug: string, id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof DashboardsDuplicateDashboard200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DashboardsDuplicateDashboard400", typeof DashboardsDuplicateDashboard400.Type> | ApiError<"DashboardsDuplicateDashboard401", typeof DashboardsDuplicateDashboard401.Type> | ApiError<"DashboardsDuplicateDashboard403", typeof DashboardsDuplicateDashboard403.Type> | ApiError<"DashboardsDuplicateDashboard404", typeof DashboardsDuplicateDashboard404.Type>>
  readonly "DashboardsCopyDashboard": <Config extends OperationConfig>(idOrSlug: string, id: string, options: { readonly payload: typeof DashboardsCopyDashboardRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof DashboardsCopyDashboard200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DashboardsCopyDashboard400", typeof DashboardsCopyDashboard400.Type> | ApiError<"DashboardsCopyDashboard401", typeof DashboardsCopyDashboard401.Type> | ApiError<"DashboardsCopyDashboard403", typeof DashboardsCopyDashboard403.Type> | ApiError<"DashboardsCopyDashboard404", typeof DashboardsCopyDashboard404.Type>>
  readonly "DashboardsDeleteDashboard": <Config extends OperationConfig>(idOrSlug: string, id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DashboardsDeleteDashboard400", typeof DashboardsDeleteDashboard400.Type> | ApiError<"DashboardsDeleteDashboard401", typeof DashboardsDeleteDashboard401.Type> | ApiError<"DashboardsDeleteDashboard403", typeof DashboardsDeleteDashboard403.Type> | ApiError<"DashboardsDeleteDashboard404", typeof DashboardsDeleteDashboard404.Type>>
  readonly "DashboardsUpdateDashboard": <Config extends OperationConfig>(idOrSlug: string, id: string, options: { readonly payload: typeof DashboardsUpdateDashboardRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof DashboardsUpdateDashboard200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DashboardsUpdateDashboard400", typeof DashboardsUpdateDashboard400.Type> | ApiError<"DashboardsUpdateDashboard401", typeof DashboardsUpdateDashboard401.Type> | ApiError<"DashboardsUpdateDashboard403", typeof DashboardsUpdateDashboard403.Type> | ApiError<"DashboardsUpdateDashboard404", typeof DashboardsUpdateDashboard404.Type>>
  readonly "ChartsListCharts": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof ChartsListChartsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ChartsListCharts200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ChartsListCharts400", typeof ChartsListCharts400.Type> | ApiError<"ChartsListCharts401", typeof ChartsListCharts401.Type> | ApiError<"ChartsListCharts403", typeof ChartsListCharts403.Type> | ApiError<"ChartsListCharts404", typeof ChartsListCharts404.Type>>
  readonly "ChartsCreateChart": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof ChartsCreateChartRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ChartsCreateChart400", typeof ChartsCreateChart400.Type> | ApiError<"ChartsCreateChart401", typeof ChartsCreateChart401.Type> | ApiError<"ChartsCreateChart403", typeof ChartsCreateChart403.Type> | ApiError<"ChartsCreateChart404", typeof ChartsCreateChart404.Type>>
  readonly "ChartsDeleteChart": <Config extends OperationConfig>(idOrSlug: string, id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ChartsDeleteChart400", typeof ChartsDeleteChart400.Type> | ApiError<"ChartsDeleteChart401", typeof ChartsDeleteChart401.Type> | ApiError<"ChartsDeleteChart403", typeof ChartsDeleteChart403.Type> | ApiError<"ChartsDeleteChart404", typeof ChartsDeleteChart404.Type>>
  readonly "ChartsUpdateChart": <Config extends OperationConfig>(idOrSlug: string, id: string, options: { readonly payload: typeof ChartsUpdateChartRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ChartsUpdateChart400", typeof ChartsUpdateChart400.Type> | ApiError<"ChartsUpdateChart401", typeof ChartsUpdateChart401.Type> | ApiError<"ChartsUpdateChart403", typeof ChartsUpdateChart403.Type> | ApiError<"ChartsUpdateChart404", typeof ChartsUpdateChart404.Type>>
  readonly "MetricsGetPreviewData": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof MetricsGetPreviewDataRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof MetricsGetPreviewData200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"MetricsGetPreviewData401", typeof MetricsGetPreviewData401.Type> | ApiError<"MetricsGetPreviewData403", typeof MetricsGetPreviewData403.Type> | ApiError<"MetricsGetPreviewData404", typeof MetricsGetPreviewData404.Type> | ApiError<"MetricsGetPreviewData500", typeof MetricsGetPreviewData500.Type>>
  readonly "MetricsLoadDashboardData": <Config extends OperationConfig>(options: { readonly payload: typeof MetricsLoadDashboardDataRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof MetricsLoadDashboardData200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"MetricsLoadDashboardData401", typeof MetricsLoadDashboardData401.Type> | ApiError<"MetricsLoadDashboardData403", typeof MetricsLoadDashboardData403.Type> | ApiError<"MetricsLoadDashboardData404", typeof MetricsLoadDashboardData404.Type> | ApiError<"MetricsLoadDashboardData500", typeof MetricsLoadDashboardData500.Type>>
  readonly "MetricsGetDashboardFilterSuggestions": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof MetricsGetDashboardFilterSuggestionsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof MetricsGetDashboardFilterSuggestions200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"MetricsGetDashboardFilterSuggestions401", typeof MetricsGetDashboardFilterSuggestions401.Type> | ApiError<"MetricsGetDashboardFilterSuggestions403", typeof MetricsGetDashboardFilterSuggestions403.Type> | ApiError<"MetricsGetDashboardFilterSuggestions404", typeof MetricsGetDashboardFilterSuggestions404.Type> | ApiError<"MetricsGetDashboardFilterSuggestions500", typeof MetricsGetDashboardFilterSuggestions500.Type>>
  readonly "MetricsGetProjectsDashboardData": <Config extends OperationConfig>(options: { readonly payload: typeof MetricsGetProjectsDashboardDataRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof MetricsGetProjectsDashboardData200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"MetricsGetProjectsDashboardData401", typeof MetricsGetProjectsDashboardData401.Type> | ApiError<"MetricsGetProjectsDashboardData403", typeof MetricsGetProjectsDashboardData403.Type> | ApiError<"MetricsGetProjectsDashboardData404", typeof MetricsGetProjectsDashboardData404.Type> | ApiError<"MetricsGetProjectsDashboardData500", typeof MetricsGetProjectsDashboardData500.Type>>
  readonly "MetricsGetPublicChartData": <Config extends OperationConfig>(chartId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof MetricsGetPublicChartData200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"MetricsGetPublicChartData404", typeof MetricsGetPublicChartData404.Type> | ApiError<"MetricsGetPublicChartData500", typeof MetricsGetPublicChartData500.Type>>
  readonly "FunnelsListFunnels": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof FunnelsListFunnels200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FunnelsListFunnels400", typeof FunnelsListFunnels400.Type> | ApiError<"FunnelsListFunnels401", typeof FunnelsListFunnels401.Type> | ApiError<"FunnelsListFunnels403", typeof FunnelsListFunnels403.Type> | ApiError<"FunnelsListFunnels404", typeof FunnelsListFunnels404.Type>>
  readonly "FunnelsCreateFunnel": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof FunnelsCreateFunnelRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof FunnelsCreateFunnel200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FunnelsCreateFunnel400", typeof FunnelsCreateFunnel400.Type> | ApiError<"FunnelsCreateFunnel401", typeof FunnelsCreateFunnel401.Type> | ApiError<"FunnelsCreateFunnel403", typeof FunnelsCreateFunnel403.Type> | ApiError<"FunnelsCreateFunnel404", typeof FunnelsCreateFunnel404.Type>>
  readonly "FunnelsGetFunnel": <Config extends OperationConfig>(idOrSlug: string, id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof FunnelsGetFunnel200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FunnelsGetFunnel400", typeof FunnelsGetFunnel400.Type> | ApiError<"FunnelsGetFunnel401", typeof FunnelsGetFunnel401.Type> | ApiError<"FunnelsGetFunnel403", typeof FunnelsGetFunnel403.Type> | ApiError<"FunnelsGetFunnel404", typeof FunnelsGetFunnel404.Type>>
  readonly "FunnelsDeleteFunnel": <Config extends OperationConfig>(idOrSlug: string, id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FunnelsDeleteFunnel400", typeof FunnelsDeleteFunnel400.Type> | ApiError<"FunnelsDeleteFunnel401", typeof FunnelsDeleteFunnel401.Type> | ApiError<"FunnelsDeleteFunnel403", typeof FunnelsDeleteFunnel403.Type> | ApiError<"FunnelsDeleteFunnel404", typeof FunnelsDeleteFunnel404.Type>>
  readonly "FunnelsUpdateFunnel": <Config extends OperationConfig>(idOrSlug: string, id: string, options: { readonly payload: typeof FunnelsUpdateFunnelRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof FunnelsUpdateFunnel200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FunnelsUpdateFunnel400", typeof FunnelsUpdateFunnel400.Type> | ApiError<"FunnelsUpdateFunnel401", typeof FunnelsUpdateFunnel401.Type> | ApiError<"FunnelsUpdateFunnel403", typeof FunnelsUpdateFunnel403.Type> | ApiError<"FunnelsUpdateFunnel404", typeof FunnelsUpdateFunnel404.Type>>
  readonly "FunnelsDuplicateFunnel": <Config extends OperationConfig>(idOrSlug: string, id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof FunnelsDuplicateFunnel200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FunnelsDuplicateFunnel400", typeof FunnelsDuplicateFunnel400.Type> | ApiError<"FunnelsDuplicateFunnel401", typeof FunnelsDuplicateFunnel401.Type> | ApiError<"FunnelsDuplicateFunnel403", typeof FunnelsDuplicateFunnel403.Type> | ApiError<"FunnelsDuplicateFunnel404", typeof FunnelsDuplicateFunnel404.Type>>
  readonly "DataSourcesListDataSources": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof DataSourcesListDataSources200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DataSourcesListDataSources400", typeof DataSourcesListDataSources400.Type> | ApiError<"DataSourcesListDataSources401", typeof DataSourcesListDataSources401.Type> | ApiError<"DataSourcesListDataSources403", typeof DataSourcesListDataSources403.Type> | ApiError<"DataSourcesListDataSources404", typeof DataSourcesListDataSources404.Type>>
  readonly "DataSourcesCreateDataSource": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof DataSourcesCreateDataSourceRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof DataSourcesCreateDataSource200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DataSourcesCreateDataSource400", typeof DataSourcesCreateDataSource400.Type> | ApiError<"DataSourcesCreateDataSource401", typeof DataSourcesCreateDataSource401.Type> | ApiError<"DataSourcesCreateDataSource403", typeof DataSourcesCreateDataSource403.Type> | ApiError<"DataSourcesCreateDataSource404", typeof DataSourcesCreateDataSource404.Type>>
  readonly "DataSourcesDeleteDataSource": <Config extends OperationConfig>(idOrSlug: string, id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DataSourcesDeleteDataSource400", typeof DataSourcesDeleteDataSource400.Type> | ApiError<"DataSourcesDeleteDataSource401", typeof DataSourcesDeleteDataSource401.Type> | ApiError<"DataSourcesDeleteDataSource403", typeof DataSourcesDeleteDataSource403.Type> | ApiError<"DataSourcesDeleteDataSource404", typeof DataSourcesDeleteDataSource404.Type>>
  readonly "DataSourcesUpdateDataSource": <Config extends OperationConfig>(idOrSlug: string, id: string, options: { readonly payload: typeof DataSourcesUpdateDataSourceRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof DataSourcesUpdateDataSource200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DataSourcesUpdateDataSource400", typeof DataSourcesUpdateDataSource400.Type> | ApiError<"DataSourcesUpdateDataSource401", typeof DataSourcesUpdateDataSource401.Type> | ApiError<"DataSourcesUpdateDataSource403", typeof DataSourcesUpdateDataSource403.Type> | ApiError<"DataSourcesUpdateDataSource404", typeof DataSourcesUpdateDataSource404.Type>>
  readonly "NetworkRulesListNetworkRules": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof NetworkRulesListNetworkRules200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"NetworkRulesListNetworkRules400", typeof NetworkRulesListNetworkRules400.Type> | ApiError<"NetworkRulesListNetworkRules401", typeof NetworkRulesListNetworkRules401.Type> | ApiError<"NetworkRulesListNetworkRules403", typeof NetworkRulesListNetworkRules403.Type> | ApiError<"NetworkRulesListNetworkRules404", typeof NetworkRulesListNetworkRules404.Type>>
  readonly "NetworkRulesCreateNetworkRule": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof NetworkRulesCreateNetworkRuleRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof NetworkRulesCreateNetworkRule200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"NetworkRulesCreateNetworkRule400", typeof NetworkRulesCreateNetworkRule400.Type> | ApiError<"NetworkRulesCreateNetworkRule401", typeof NetworkRulesCreateNetworkRule401.Type> | ApiError<"NetworkRulesCreateNetworkRule403", typeof NetworkRulesCreateNetworkRule403.Type> | ApiError<"NetworkRulesCreateNetworkRule404", typeof NetworkRulesCreateNetworkRule404.Type>>
  readonly "NetworkRulesDeleteNetworkRule": <Config extends OperationConfig>(idOrSlug: string, id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"NetworkRulesDeleteNetworkRule400", typeof NetworkRulesDeleteNetworkRule400.Type> | ApiError<"NetworkRulesDeleteNetworkRule401", typeof NetworkRulesDeleteNetworkRule401.Type> | ApiError<"NetworkRulesDeleteNetworkRule403", typeof NetworkRulesDeleteNetworkRule403.Type> | ApiError<"NetworkRulesDeleteNetworkRule404", typeof NetworkRulesDeleteNetworkRule404.Type>>
  readonly "DownloadsGetDownloadAnalytics": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof DownloadsGetDownloadAnalyticsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof DownloadsGetDownloadAnalytics200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DownloadsGetDownloadAnalytics401", typeof DownloadsGetDownloadAnalytics401.Type> | ApiError<"DownloadsGetDownloadAnalytics403", typeof DownloadsGetDownloadAnalytics403.Type> | ApiError<"DownloadsGetDownloadAnalytics404", typeof DownloadsGetDownloadAnalytics404.Type> | ApiError<"DownloadsGetDownloadAnalytics500", typeof DownloadsGetDownloadAnalytics500.Type>>
  readonly "RetentionGetRetentionForProject": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params: typeof RetentionGetRetentionForProjectParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof RetentionGetRetentionForProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"RetentionGetRetentionForProject401", typeof RetentionGetRetentionForProject401.Type> | ApiError<"RetentionGetRetentionForProject403", typeof RetentionGetRetentionForProject403.Type> | ApiError<"RetentionGetRetentionForProject404", typeof RetentionGetRetentionForProject404.Type>>
  readonly "RetentionGetRetentionDriversForProject": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params: typeof RetentionGetRetentionDriversForProjectParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof RetentionGetRetentionDriversForProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"RetentionGetRetentionDriversForProject401", typeof RetentionGetRetentionDriversForProject401.Type> | ApiError<"RetentionGetRetentionDriversForProject403", typeof RetentionGetRetentionDriversForProject403.Type> | ApiError<"RetentionGetRetentionDriversForProject404", typeof RetentionGetRetentionDriversForProject404.Type>>
  readonly "EventExplorerGetEventExplorerRows": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof EventExplorerGetEventExplorerRowsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof EventExplorerGetEventExplorerRows200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"EventExplorerGetEventExplorerRows401", typeof EventExplorerGetEventExplorerRows401.Type> | ApiError<"EventExplorerGetEventExplorerRows403", typeof EventExplorerGetEventExplorerRows403.Type> | ApiError<"EventExplorerGetEventExplorerRows404", typeof EventExplorerGetEventExplorerRows404.Type>>
  readonly "UsersGetUsersForProject": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof UsersGetUsersForProjectParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof UsersGetUsersForProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"UsersGetUsersForProject401", typeof UsersGetUsersForProject401.Type> | ApiError<"UsersGetUsersForProject403", typeof UsersGetUsersForProject403.Type> | ApiError<"UsersGetUsersForProject404", typeof UsersGetUsersForProject404.Type>>
  readonly "UsersGetUsersActiveTimeseries": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof UsersGetUsersActiveTimeseriesParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof UsersGetUsersActiveTimeseries200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"UsersGetUsersActiveTimeseries401", typeof UsersGetUsersActiveTimeseries401.Type> | ApiError<"UsersGetUsersActiveTimeseries403", typeof UsersGetUsersActiveTimeseries403.Type> | ApiError<"UsersGetUsersActiveTimeseries404", typeof UsersGetUsersActiveTimeseries404.Type>>
  readonly "UsersGetUsersBreakdown": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof UsersGetUsersBreakdown200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"UsersGetUsersBreakdown401", typeof UsersGetUsersBreakdown401.Type> | ApiError<"UsersGetUsersBreakdown403", typeof UsersGetUsersBreakdown403.Type> | ApiError<"UsersGetUsersBreakdown404", typeof UsersGetUsersBreakdown404.Type>>
  readonly "UsersGetUserByKey": <Config extends OperationConfig>(idOrSlug: string, userKey: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof UsersGetUserByKey200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"UsersGetUserByKey401", typeof UsersGetUserByKey401.Type> | ApiError<"UsersGetUserByKey403", typeof UsersGetUserByKey403.Type> | ApiError<"UsersGetUserByKey404", typeof UsersGetUserByKey404.Type>>
  readonly "UsersGetUserSessions": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof UsersGetUserSessionsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof UsersGetUserSessions200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"UsersGetUserSessions401", typeof UsersGetUserSessions401.Type> | ApiError<"UsersGetUserSessions403", typeof UsersGetUserSessions403.Type> | ApiError<"UsersGetUserSessions404", typeof UsersGetUserSessions404.Type>>
  readonly "UsersGetUserErrors": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof UsersGetUserErrorsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof UsersGetUserErrors200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"UsersGetUserErrors401", typeof UsersGetUserErrors401.Type> | ApiError<"UsersGetUserErrors403", typeof UsersGetUserErrors403.Type> | ApiError<"UsersGetUserErrors404", typeof UsersGetUserErrors404.Type>>
  readonly "UsersDeleteUserData": <Config extends OperationConfig>(idOrSlug: string, userId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"UsersDeleteUserData401", typeof UsersDeleteUserData401.Type> | ApiError<"UsersDeleteUserData403", typeof UsersDeleteUserData403.Type> | ApiError<"UsersDeleteUserData404", typeof UsersDeleteUserData404.Type>>
  readonly "UsersRemoveUserIdentification": <Config extends OperationConfig>(idOrSlug: string, userId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"UsersRemoveUserIdentification401", typeof UsersRemoveUserIdentification401.Type> | ApiError<"UsersRemoveUserIdentification403", typeof UsersRemoveUserIdentification403.Type> | ApiError<"UsersRemoveUserIdentification404", typeof UsersRemoveUserIdentification404.Type>>
  readonly "WebVitalsGetWebVitalsForProject": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof WebVitalsGetWebVitalsForProjectParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof WebVitalsGetWebVitalsForProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"WebVitalsGetWebVitalsForProject401", typeof WebVitalsGetWebVitalsForProject401.Type> | ApiError<"WebVitalsGetWebVitalsForProject403", typeof WebVitalsGetWebVitalsForProject403.Type> | ApiError<"WebVitalsGetWebVitalsForProject404", typeof WebVitalsGetWebVitalsForProject404.Type>>
  readonly "WebVitalsGetBuildDeploymentsForProject": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof WebVitalsGetBuildDeploymentsForProjectParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof WebVitalsGetBuildDeploymentsForProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"WebVitalsGetBuildDeploymentsForProject401", typeof WebVitalsGetBuildDeploymentsForProject401.Type> | ApiError<"WebVitalsGetBuildDeploymentsForProject403", typeof WebVitalsGetBuildDeploymentsForProject403.Type> | ApiError<"WebVitalsGetBuildDeploymentsForProject404", typeof WebVitalsGetBuildDeploymentsForProject404.Type>>
  readonly "WebVitalsGetWebVitalsTrends": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof WebVitalsGetWebVitalsTrendsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof WebVitalsGetWebVitalsTrends200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"WebVitalsGetWebVitalsTrends401", typeof WebVitalsGetWebVitalsTrends401.Type> | ApiError<"WebVitalsGetWebVitalsTrends403", typeof WebVitalsGetWebVitalsTrends403.Type> | ApiError<"WebVitalsGetWebVitalsTrends404", typeof WebVitalsGetWebVitalsTrends404.Type>>
  readonly "SessionReplaysListReplays": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof SessionReplaysListReplaysParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysListReplays200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysListReplays400", typeof SessionReplaysListReplays400.Type> | ApiError<"SessionReplaysListReplays401", typeof SessionReplaysListReplays401.Type> | ApiError<"SessionReplaysListReplays403", typeof SessionReplaysListReplays403.Type> | ApiError<"SessionReplaysListReplays404", typeof SessionReplaysListReplays404.Type>>
  readonly "SessionReplaysDeleteAllReplays": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysDeleteAllReplays400", typeof SessionReplaysDeleteAllReplays400.Type> | ApiError<"SessionReplaysDeleteAllReplays401", typeof SessionReplaysDeleteAllReplays401.Type> | ApiError<"SessionReplaysDeleteAllReplays403", typeof SessionReplaysDeleteAllReplays403.Type> | ApiError<"SessionReplaysDeleteAllReplays404", typeof SessionReplaysDeleteAllReplays404.Type>>
  readonly "SessionReplaysGetReplayCount": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof SessionReplaysGetReplayCountParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysGetReplayCount200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysGetReplayCount400", typeof SessionReplaysGetReplayCount400.Type> | ApiError<"SessionReplaysGetReplayCount401", typeof SessionReplaysGetReplayCount401.Type> | ApiError<"SessionReplaysGetReplayCount403", typeof SessionReplaysGetReplayCount403.Type> | ApiError<"SessionReplaysGetReplayCount404", typeof SessionReplaysGetReplayCount404.Type>>
  readonly "SessionReplaysListReplayCollections": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysListReplayCollections200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysListReplayCollections400", typeof SessionReplaysListReplayCollections400.Type> | ApiError<"SessionReplaysListReplayCollections401", typeof SessionReplaysListReplayCollections401.Type> | ApiError<"SessionReplaysListReplayCollections403", typeof SessionReplaysListReplayCollections403.Type> | ApiError<"SessionReplaysListReplayCollections404", typeof SessionReplaysListReplayCollections404.Type>>
  readonly "SessionReplaysCreateReplayCollection": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof SessionReplaysCreateReplayCollectionRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysCreateReplayCollection200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysCreateReplayCollection400", typeof SessionReplaysCreateReplayCollection400.Type> | ApiError<"SessionReplaysCreateReplayCollection401", typeof SessionReplaysCreateReplayCollection401.Type> | ApiError<"SessionReplaysCreateReplayCollection403", typeof SessionReplaysCreateReplayCollection403.Type> | ApiError<"SessionReplaysCreateReplayCollection404", typeof SessionReplaysCreateReplayCollection404.Type>>
  readonly "SessionReplaysDeleteReplayCollection": <Config extends OperationConfig>(idOrSlug: string, id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysDeleteReplayCollection400", typeof SessionReplaysDeleteReplayCollection400.Type> | ApiError<"SessionReplaysDeleteReplayCollection401", typeof SessionReplaysDeleteReplayCollection401.Type> | ApiError<"SessionReplaysDeleteReplayCollection403", typeof SessionReplaysDeleteReplayCollection403.Type> | ApiError<"SessionReplaysDeleteReplayCollection404", typeof SessionReplaysDeleteReplayCollection404.Type>>
  readonly "SessionReplaysUpdateReplayCollection": <Config extends OperationConfig>(idOrSlug: string, id: string, options: { readonly payload: typeof SessionReplaysUpdateReplayCollectionRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysUpdateReplayCollection200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysUpdateReplayCollection400", typeof SessionReplaysUpdateReplayCollection400.Type> | ApiError<"SessionReplaysUpdateReplayCollection401", typeof SessionReplaysUpdateReplayCollection401.Type> | ApiError<"SessionReplaysUpdateReplayCollection403", typeof SessionReplaysUpdateReplayCollection403.Type> | ApiError<"SessionReplaysUpdateReplayCollection404", typeof SessionReplaysUpdateReplayCollection404.Type>>
  readonly "SessionReplaysListReplayCollectionAssignments": <Config extends OperationConfig>(idOrSlug: string, sessionId: string, windowId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysListReplayCollectionAssignments200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysListReplayCollectionAssignments400", typeof SessionReplaysListReplayCollectionAssignments400.Type> | ApiError<"SessionReplaysListReplayCollectionAssignments401", typeof SessionReplaysListReplayCollectionAssignments401.Type> | ApiError<"SessionReplaysListReplayCollectionAssignments403", typeof SessionReplaysListReplayCollectionAssignments403.Type> | ApiError<"SessionReplaysListReplayCollectionAssignments404", typeof SessionReplaysListReplayCollectionAssignments404.Type>>
  readonly "SessionReplaysSetReplayCollectionAssignments": <Config extends OperationConfig>(idOrSlug: string, sessionId: string, windowId: string, options: { readonly payload: typeof SessionReplaysSetReplayCollectionAssignmentsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysSetReplayCollectionAssignments200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysSetReplayCollectionAssignments400", typeof SessionReplaysSetReplayCollectionAssignments400.Type> | ApiError<"SessionReplaysSetReplayCollectionAssignments401", typeof SessionReplaysSetReplayCollectionAssignments401.Type> | ApiError<"SessionReplaysSetReplayCollectionAssignments403", typeof SessionReplaysSetReplayCollectionAssignments403.Type> | ApiError<"SessionReplaysSetReplayCollectionAssignments404", typeof SessionReplaysSetReplayCollectionAssignments404.Type>>
  readonly "SessionReplaysGetReplayEventsPage": <Config extends OperationConfig>(idOrSlug: string, sessionId: string, windowId: string, options: { readonly params?: typeof SessionReplaysGetReplayEventsPageParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysGetReplayEventsPage200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysGetReplayEventsPage400", typeof SessionReplaysGetReplayEventsPage400.Type> | ApiError<"SessionReplaysGetReplayEventsPage401", typeof SessionReplaysGetReplayEventsPage401.Type> | ApiError<"SessionReplaysGetReplayEventsPage403", typeof SessionReplaysGetReplayEventsPage403.Type> | ApiError<"SessionReplaysGetReplayEventsPage404", typeof SessionReplaysGetReplayEventsPage404.Type>>
  readonly "SessionReplaysGetSessionErrors": <Config extends OperationConfig>(idOrSlug: string, sessionId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysGetSessionErrors200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysGetSessionErrors400", typeof SessionReplaysGetSessionErrors400.Type> | ApiError<"SessionReplaysGetSessionErrors401", typeof SessionReplaysGetSessionErrors401.Type> | ApiError<"SessionReplaysGetSessionErrors403", typeof SessionReplaysGetSessionErrors403.Type> | ApiError<"SessionReplaysGetSessionErrors404", typeof SessionReplaysGetSessionErrors404.Type>>
  readonly "SessionReplaysGetSessionVitals": <Config extends OperationConfig>(idOrSlug: string, sessionId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysGetSessionVitals200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysGetSessionVitals400", typeof SessionReplaysGetSessionVitals400.Type> | ApiError<"SessionReplaysGetSessionVitals401", typeof SessionReplaysGetSessionVitals401.Type> | ApiError<"SessionReplaysGetSessionVitals403", typeof SessionReplaysGetSessionVitals403.Type> | ApiError<"SessionReplaysGetSessionVitals404", typeof SessionReplaysGetSessionVitals404.Type>>
  readonly "SessionReplaysDeleteReplay": <Config extends OperationConfig>(idOrSlug: string, sessionId: string, windowId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysDeleteReplay400", typeof SessionReplaysDeleteReplay400.Type> | ApiError<"SessionReplaysDeleteReplay401", typeof SessionReplaysDeleteReplay401.Type> | ApiError<"SessionReplaysDeleteReplay403", typeof SessionReplaysDeleteReplay403.Type> | ApiError<"SessionReplaysDeleteReplay404", typeof SessionReplaysDeleteReplay404.Type>>
  readonly "SessionReplaysMarkReplayViewed": <Config extends OperationConfig>(idOrSlug: string, sessionId: string, windowId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysMarkReplayViewed400", typeof SessionReplaysMarkReplayViewed400.Type> | ApiError<"SessionReplaysMarkReplayViewed401", typeof SessionReplaysMarkReplayViewed401.Type> | ApiError<"SessionReplaysMarkReplayViewed403", typeof SessionReplaysMarkReplayViewed403.Type> | ApiError<"SessionReplaysMarkReplayViewed404", typeof SessionReplaysMarkReplayViewed404.Type>>
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
