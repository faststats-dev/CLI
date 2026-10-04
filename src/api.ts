import * as Data from "effect/Data"
import * as Effect from "effect/Effect"
import type { SchemaError } from "effect/Schema"
import * as Schema from "effect/Schema"
import type * as HttpClient from "effect/http/HttpClient"
import * as HttpClientError from "effect/http/HttpClientError"
import * as HttpClientRequest from "effect/http/HttpClientRequest"
import * as HttpClientResponse from "effect/http/HttpClientResponse"
// non-recursive definitions
export type UnauthorizedErrorEncoded = { readonly "_tag": "UnauthorizedError", readonly "message": string }
export const UnauthorizedErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("UnauthorizedError"), "message": Schema.String }).annotate({ "identifier": "UnauthorizedErrorEncoded" })
export type ForbiddenErrorEncoded = { readonly "_tag": "ForbiddenError", readonly "message": string, readonly "code"?: string | null }
export const ForbiddenErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("ForbiddenError"), "message": Schema.String, "code": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }).annotate({ "identifier": "ForbiddenErrorEncoded" })
export type NotFoundErrorEncoded = { readonly "_tag": "NotFoundError", readonly "message": string }
export const NotFoundErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("NotFoundError"), "message": Schema.String }).annotate({ "identifier": "NotFoundErrorEncoded" })
export type InternalServerErrorEncoded = { readonly "_tag": "InternalServerError", readonly "message": string }
export const InternalServerErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("InternalServerError"), "message": Schema.String }).annotate({ "identifier": "InternalServerErrorEncoded" })
export type EffectDrizzleQueryErrorEncoded = { readonly "_tag": "EffectDrizzleQueryError", readonly "query": string, readonly "params": ReadonlyArray<Schema.Json>, readonly "cause": Schema.Json }
export const EffectDrizzleQueryErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("EffectDrizzleQueryError"), "query": Schema.String, "params": Schema.Array(Schema.Json.annotate({ "expected": "JSON value" })), "cause": Schema.Json.annotate({ "expected": "JSON value" }) }).annotate({ "identifier": "EffectDrizzleQueryErrorEncoded" })
export type ChartValidationErrorEncoded = { readonly "_tag": "ChartValidationError", readonly "message": string }
export const ChartValidationErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("ChartValidationError"), "message": Schema.String }).annotate({ "identifier": "ChartValidationErrorEncoded" })
export type ChartConflictErrorEncoded = { readonly "_tag": "ChartConflictError", readonly "message": string }
export const ChartConflictErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("ChartConflictError"), "message": Schema.String }).annotate({ "identifier": "ChartConflictErrorEncoded" })
export type CommentReplyPreviewEncoded = { readonly "id": string, readonly "authorId": string, readonly "authorName": string | null, readonly "preview": string }
export const CommentReplyPreviewEncoded = Schema.Struct({ "id": Schema.String, "authorId": Schema.String, "authorName": Schema.Union([Schema.String, Schema.Null]), "preview": Schema.String }).annotate({ "identifier": "CommentReplyPreviewEncoded" })
export type CommentValidationErrorEncoded = { readonly "_tag": "CommentValidationError", readonly "message": string }
export const CommentValidationErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("CommentValidationError"), "message": Schema.String }).annotate({ "identifier": "CommentValidationErrorEncoded" })
export type CommentServiceErrorEncoded = { readonly "_tag": "CommentServiceError", readonly "message": string }
export const CommentServiceErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("CommentServiceError"), "message": Schema.String }).annotate({ "identifier": "CommentServiceErrorEncoded" })
export type Effect_sql_SqlError_ConnectionErrorEncoded = { readonly "_tag": "ConnectionError", readonly "cause": Schema.Json, readonly "message"?: string | null, readonly "operation"?: string | null }
export const Effect_sql_SqlError_ConnectionErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("ConnectionError"), "cause": Schema.Json.annotate({ "expected": "JSON value" }), "message": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "operation": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }).annotate({ "identifier": "effect_sql_SqlError_ConnectionErrorEncoded" })
export type Effect_sql_SqlError_AuthenticationErrorEncoded = { readonly "_tag": "AuthenticationError", readonly "cause": Schema.Json, readonly "message"?: string | null, readonly "operation"?: string | null }
export const Effect_sql_SqlError_AuthenticationErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("AuthenticationError"), "cause": Schema.Json.annotate({ "expected": "JSON value" }), "message": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "operation": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }).annotate({ "identifier": "effect_sql_SqlError_AuthenticationErrorEncoded" })
export type Effect_sql_SqlError_AuthorizationErrorEncoded = { readonly "_tag": "AuthorizationError", readonly "cause": Schema.Json, readonly "message"?: string | null, readonly "operation"?: string | null }
export const Effect_sql_SqlError_AuthorizationErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("AuthorizationError"), "cause": Schema.Json.annotate({ "expected": "JSON value" }), "message": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "operation": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }).annotate({ "identifier": "effect_sql_SqlError_AuthorizationErrorEncoded" })
export type Effect_sql_SqlError_SqlSyntaxErrorEncoded = { readonly "_tag": "SqlSyntaxError", readonly "cause": Schema.Json, readonly "message"?: string | null, readonly "operation"?: string | null }
export const Effect_sql_SqlError_SqlSyntaxErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("SqlSyntaxError"), "cause": Schema.Json.annotate({ "expected": "JSON value" }), "message": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "operation": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }).annotate({ "identifier": "effect_sql_SqlError_SqlSyntaxErrorEncoded" })
export type Effect_sql_SqlError_UniqueViolationEncoded = { readonly "_tag": "UniqueViolation", readonly "cause": Schema.Json, readonly "message"?: string | null, readonly "operation"?: string | null, readonly "constraint": string }
export const Effect_sql_SqlError_UniqueViolationEncoded = Schema.Struct({ "_tag": Schema.Literal("UniqueViolation"), "cause": Schema.Json.annotate({ "expected": "JSON value" }), "message": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "operation": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "constraint": Schema.String }).annotate({ "identifier": "effect_sql_SqlError_UniqueViolationEncoded" })
export type Effect_sql_SqlError_ConstraintErrorEncoded = { readonly "_tag": "ConstraintError", readonly "cause": Schema.Json, readonly "message"?: string | null, readonly "operation"?: string | null }
export const Effect_sql_SqlError_ConstraintErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("ConstraintError"), "cause": Schema.Json.annotate({ "expected": "JSON value" }), "message": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "operation": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }).annotate({ "identifier": "effect_sql_SqlError_ConstraintErrorEncoded" })
export type Effect_sql_SqlError_DeadlockErrorEncoded = { readonly "_tag": "DeadlockError", readonly "cause": Schema.Json, readonly "message"?: string | null, readonly "operation"?: string | null }
export const Effect_sql_SqlError_DeadlockErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("DeadlockError"), "cause": Schema.Json.annotate({ "expected": "JSON value" }), "message": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "operation": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }).annotate({ "identifier": "effect_sql_SqlError_DeadlockErrorEncoded" })
export type Effect_sql_SqlError_SerializationErrorEncoded = { readonly "_tag": "SerializationError", readonly "cause": Schema.Json, readonly "message"?: string | null, readonly "operation"?: string | null }
export const Effect_sql_SqlError_SerializationErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("SerializationError"), "cause": Schema.Json.annotate({ "expected": "JSON value" }), "message": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "operation": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }).annotate({ "identifier": "effect_sql_SqlError_SerializationErrorEncoded" })
export type Effect_sql_SqlError_LockTimeoutErrorEncoded = { readonly "_tag": "LockTimeoutError", readonly "cause": Schema.Json, readonly "message"?: string | null, readonly "operation"?: string | null }
export const Effect_sql_SqlError_LockTimeoutErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("LockTimeoutError"), "cause": Schema.Json.annotate({ "expected": "JSON value" }), "message": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "operation": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }).annotate({ "identifier": "effect_sql_SqlError_LockTimeoutErrorEncoded" })
export type Effect_sql_SqlError_StatementTimeoutErrorEncoded = { readonly "_tag": "StatementTimeoutError", readonly "cause": Schema.Json, readonly "message"?: string | null, readonly "operation"?: string | null }
export const Effect_sql_SqlError_StatementTimeoutErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("StatementTimeoutError"), "cause": Schema.Json.annotate({ "expected": "JSON value" }), "message": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "operation": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }).annotate({ "identifier": "effect_sql_SqlError_StatementTimeoutErrorEncoded" })
export type Effect_sql_SqlError_UnknownErrorEncoded = { readonly "_tag": "UnknownError", readonly "cause": Schema.Json, readonly "message"?: string | null, readonly "operation"?: string | null }
export const Effect_sql_SqlError_UnknownErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("UnknownError"), "cause": Schema.Json.annotate({ "expected": "JSON value" }), "message": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "operation": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }).annotate({ "identifier": "effect_sql_SqlError_UnknownErrorEncoded" })
export type CommentRevisionEncoded = { readonly "id": string, readonly "content": string, readonly "createdAt": string }
export const CommentRevisionEncoded = Schema.Struct({ "id": Schema.String, "content": Schema.String, "createdAt": Schema.String }).annotate({ "identifier": "CommentRevisionEncoded" })
export type CommentMentionCandidateEncoded = { readonly "userId": string, readonly "name": string, readonly "image": string | null }
export const CommentMentionCandidateEncoded = Schema.Struct({ "userId": Schema.String, "name": Schema.String, "image": Schema.Union([Schema.String, Schema.Null]) }).annotate({ "identifier": "CommentMentionCandidateEncoded" })
export type CommentReferenceResultEncoded = { readonly "type": "dashboard" | "chart" | "error" | "funnel" | "data_source", readonly "id": string, readonly "label": string, readonly "detail": string | null }
export const CommentReferenceResultEncoded = Schema.Struct({ "type": Schema.Literals(["dashboard", "chart", "error", "funnel", "data_source"]), "id": Schema.String, "label": Schema.String, "detail": Schema.Union([Schema.String, Schema.Null]) }).annotate({ "identifier": "CommentReferenceResultEncoded" })
export type DashboardRecordEncoded = { readonly "id": string, readonly "projectId": string, readonly "name": string, readonly "description": string | null, readonly "isPublic": boolean, readonly "isDefault": boolean, readonly "position": number | "Infinity" | "-Infinity" | "NaN", readonly "markerOverrides": { readonly "mode": "inherit" | "replace" | "add" | "disable", readonly "collections"?: ReadonlyArray<{ readonly "collectionId": string, readonly "enabled"?: boolean | null, readonly "display"?: { readonly "icon"?: string | null | null, readonly "emoji"?: string | null | null, readonly "color"?: string | null | null } | null }> | null, readonly "hiddenCollectionIds"?: ReadonlyArray<string> | null } | null, readonly "createdAt": string, readonly "updatedAt": string }
export const DashboardRecordEncoded = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "name": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "isPublic": Schema.Boolean, "isDefault": Schema.Boolean, "position": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "markerOverrides": Schema.Union([Schema.Struct({ "mode": Schema.Literals(["inherit", "replace", "add", "disable"]), "collections": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "collectionId": Schema.String, "enabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "display": Schema.optionalKey(Schema.Union([Schema.Struct({ "icon": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "emoji": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])) }), Schema.Null])) })), Schema.Null])), "hiddenCollectionIds": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])) }), Schema.Null]), "createdAt": Schema.String, "updatedAt": Schema.String }).annotate({ "identifier": "DashboardRecordEncoded" })
export type DashboardValidationErrorEncoded = { readonly "_tag": "DashboardValidationError", readonly "message": string }
export const DashboardValidationErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("DashboardValidationError"), "message": Schema.String }).annotate({ "identifier": "DashboardValidationErrorEncoded" })
export type DataSourceCoverageResultEncoded = { readonly "fromTime": number | "Infinity" | "-Infinity" | "NaN", readonly "toTime": number | "Infinity" | "-Infinity" | "NaN", readonly "totalEvents": number | "Infinity" | "-Infinity" | "NaN", readonly "sources": ReadonlyArray<{ readonly "referenceId": string, readonly "eventCount": number | "Infinity" | "-Infinity" | "NaN", readonly "percentage": number | "Infinity" | "-Infinity" | "NaN" }> }
export const DataSourceCoverageResultEncoded = Schema.Struct({ "fromTime": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "toTime": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "totalEvents": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "sources": Schema.Array(Schema.Struct({ "referenceId": Schema.String, "eventCount": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "percentage": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })) }).annotate({ "identifier": "DataSourceCoverageResultEncoded" })
export type DataSourceValidationErrorEncoded = { readonly "_tag": "DataSourceValidationError", readonly "message": string }
export const DataSourceValidationErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("DataSourceValidationError"), "message": Schema.String }).annotate({ "identifier": "DataSourceValidationErrorEncoded" })
export type StructuredFieldRecordEncoded = { readonly "sourceReferenceId": string, readonly "path": ReadonlyArray<string>, readonly "dataType": "number" | "string" | "boolean", readonly "observedTypes": ReadonlyArray<"number" | "string" | "boolean">, readonly "observedCount": number | "Infinity" | "-Infinity" | "NaN", readonly "firstSeenAt": string | null, readonly "lastSeenAt": string | null, readonly "sampleValue": string | null }
export const StructuredFieldRecordEncoded = Schema.Struct({ "sourceReferenceId": Schema.String, "path": Schema.Array(Schema.String), "dataType": Schema.Literals(["number", "string", "boolean"]), "observedTypes": Schema.Array(Schema.Literals(["number", "string", "boolean"])), "observedCount": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "firstSeenAt": Schema.Union([Schema.String, Schema.Null]), "lastSeenAt": Schema.Union([Schema.String, Schema.Null]), "sampleValue": Schema.Union([Schema.String, Schema.Null]) }).annotate({ "identifier": "StructuredFieldRecordEncoded" })
export type DataSourceRecordEncoded = { readonly "id": string, readonly "projectId": string, readonly "name": string, readonly "description": string | null, readonly "referenceId": string, readonly "dataType": "number" | "string" | "boolean" | "json", readonly "regex": string | null, readonly "allowNegative": boolean | null, readonly "allowFloat": boolean | null, readonly "minValue": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "maxValue": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "isArray": boolean, readonly "metricShape": "scalar" | "array" | "map", readonly "createdAt": string, readonly "updatedAt": string }
export const DataSourceRecordEncoded = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "name": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "referenceId": Schema.String, "dataType": Schema.Literals(["number", "string", "boolean", "json"]), "regex": Schema.Union([Schema.String, Schema.Null]), "allowNegative": Schema.Union([Schema.Boolean, Schema.Null]), "allowFloat": Schema.Union([Schema.Boolean, Schema.Null]), "minValue": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "maxValue": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "isArray": Schema.Boolean, "metricShape": Schema.Literals(["scalar", "array", "map"]), "createdAt": Schema.String, "updatedAt": Schema.String }).annotate({ "identifier": "DataSourceRecordEncoded" })
export type DownloadAnalyticsOverviewEncoded = { readonly "totalDownloads": number | "Infinity" | "-Infinity" | "NaN", readonly "providersTracked": number | "Infinity" | "-Infinity" | "NaN", readonly "projectsTracked": number | "Infinity" | "-Infinity" | "NaN", readonly "latestSnapshotAt": string | null }
export const DownloadAnalyticsOverviewEncoded = Schema.Struct({ "totalDownloads": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "providersTracked": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "projectsTracked": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "latestSnapshotAt": Schema.Union([Schema.String, Schema.Null]) }).annotate({ "identifier": "DownloadAnalyticsOverviewEncoded" })
export type DownloadHistoryPointEncoded = { readonly "bucket": string, readonly "downloads": number | "Infinity" | "-Infinity" | "NaN", readonly "gained": number | "Infinity" | "-Infinity" | "NaN", readonly "provider"?: "modrinth" | "spigot" | "hangar" | "ore" | "curseforge" | "github" | null | null }
export const DownloadHistoryPointEncoded = Schema.Struct({ "bucket": Schema.String, "downloads": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "gained": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "provider": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Literals(["modrinth", "spigot", "hangar", "ore", "curseforge", "github"]), Schema.Null]), Schema.Null])) }).annotate({ "identifier": "DownloadHistoryPointEncoded" })
export type DownloadAnalyticsPointEncoded = { readonly "bucket": string, readonly "downloads": number | "Infinity" | "-Infinity" | "NaN", readonly "provider"?: "modrinth" | "spigot" | "hangar" | "ore" | "curseforge" | "github" | null | null }
export const DownloadAnalyticsPointEncoded = Schema.Struct({ "bucket": Schema.String, "downloads": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "provider": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Literals(["modrinth", "spigot", "hangar", "ore", "curseforge", "github"]), Schema.Null]), Schema.Null])) }).annotate({ "identifier": "DownloadAnalyticsPointEncoded" })
export type DownloadProviderSummaryEncoded = { readonly "provider": "modrinth" | "spigot" | "hangar" | "ore" | "curseforge" | "github", readonly "downloads": number | "Infinity" | "-Infinity" | "NaN", readonly "latestSnapshotAt": string | null, readonly "followers"?: number | "Infinity" | "-Infinity" | "NaN" | null | null, readonly "views"?: number | "Infinity" | "-Infinity" | "NaN" | null | null, readonly "watchers"?: number | "Infinity" | "-Infinity" | "NaN" | null | null, readonly "stars"?: number | "Infinity" | "-Infinity" | "NaN" | null | null, readonly "thumbsUpCount"?: number | "Infinity" | "-Infinity" | "NaN" | null | null }
export const DownloadProviderSummaryEncoded = Schema.Struct({ "provider": Schema.Literals(["modrinth", "spigot", "hangar", "ore", "curseforge", "github"]), "downloads": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "latestSnapshotAt": Schema.Union([Schema.String, Schema.Null]), "followers": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])), "views": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])), "watchers": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])), "stars": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])), "thumbsUpCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])) }).annotate({ "identifier": "DownloadProviderSummaryEncoded" })
export type DownloadVersionRowEncoded = { readonly "provider": "modrinth" | "spigot" | "hangar" | "ore" | "curseforge" | "github", readonly "externalId": string, readonly "versionId": string, readonly "versionNumber": string, readonly "downloads": number | "Infinity" | "-Infinity" | "NaN", readonly "latestSnapshotAt": string | null, readonly "releaseDate": string | null }
export const DownloadVersionRowEncoded = Schema.Struct({ "provider": Schema.Literals(["modrinth", "spigot", "hangar", "ore", "curseforge", "github"]), "externalId": Schema.String, "versionId": Schema.String, "versionNumber": Schema.String, "downloads": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "latestSnapshotAt": Schema.Union([Schema.String, Schema.Null]), "releaseDate": Schema.Union([Schema.String, Schema.Null]) }).annotate({ "identifier": "DownloadVersionRowEncoded" })
export type TinybirdErrorEncoded = { readonly "_tag": "TinybirdError", readonly "message": string, readonly "cause"?: Schema.Json | null }
export const TinybirdErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("TinybirdError"), "message": Schema.String, "cause": Schema.optionalKey(Schema.Union([Schema.Json.annotate({ "expected": "JSON value" }), Schema.Null])) }).annotate({ "identifier": "TinybirdErrorEncoded" })
export type DownloadProviderRecordEncoded = { readonly "id": string, readonly "projectId": string, readonly "provider": "modrinth" | "spigot" | "hangar" | "ore" | "curseforge" | "github", readonly "externalId": string, readonly "title": string, readonly "excludedFiles"?: ReadonlyArray<string> | null, readonly "slug"?: string | null | null, readonly "url"?: string | null | null, readonly "iconUrl"?: string | null | null, readonly "summary"?: string | null | null, readonly "totalDownloads"?: number | "Infinity" | "-Infinity" | "NaN" | null | null, readonly "lastSyncedAt": string | null, readonly "createdAt": string }
export const DownloadProviderRecordEncoded = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "provider": Schema.Literals(["modrinth", "spigot", "hangar", "ore", "curseforge", "github"]), "externalId": Schema.String, "title": Schema.String, "excludedFiles": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "slug": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "url": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "iconUrl": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "summary": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "totalDownloads": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])), "lastSyncedAt": Schema.Union([Schema.String, Schema.Null]), "createdAt": Schema.String }).annotate({ "identifier": "DownloadProviderRecordEncoded" })
export type DownloadProviderErrorEncoded = { readonly "_tag": "DownloadProviderError", readonly "message": string }
export const DownloadProviderErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("DownloadProviderError"), "message": Schema.String }).annotate({ "identifier": "DownloadProviderErrorEncoded" })
export type DownloadProviderSearchResultEncoded = { readonly "provider": "modrinth" | "spigot" | "hangar" | "ore" | "curseforge" | "github", readonly "externalId": string, readonly "title": string, readonly "slug"?: string | null | null, readonly "url"?: string | null | null, readonly "iconUrl"?: string | null | null, readonly "summary"?: string | null | null, readonly "totalDownloads"?: number | "Infinity" | "-Infinity" | "NaN" | null | null }
export const DownloadProviderSearchResultEncoded = Schema.Struct({ "provider": Schema.Literals(["modrinth", "spigot", "hangar", "ore", "curseforge", "github"]), "externalId": Schema.String, "title": Schema.String, "slug": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "url": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "iconUrl": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "summary": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "totalDownloads": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])) }).annotate({ "identifier": "DownloadProviderSearchResultEncoded" })
export type ErrorTrackingServiceErrorEncoded = { readonly "_tag": "ErrorTrackingServiceError", readonly "message": string, readonly "cause"?: Schema.Json | null }
export const ErrorTrackingServiceErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("ErrorTrackingServiceError"), "message": Schema.String, "cause": Schema.optionalKey(Schema.Union([Schema.Json.annotate({ "expected": "JSON value" }), Schema.Null])) }).annotate({ "identifier": "ErrorTrackingServiceErrorEncoded" })
export type ErrorFilterEncoded = { readonly "field": string, readonly "operator": "equals" | "not_equals", readonly "value": string }
export const ErrorFilterEncoded = Schema.Struct({ "field": Schema.String, "operator": Schema.Literals(["equals", "not_equals"]), "value": Schema.String }).annotate({ "identifier": "ErrorFilterEncoded" })
export type ErrorResolutionInfoEncoded = { readonly "mode": "once" | "version" | "version_and_prior" | "forever", readonly "resolvedAt": string, readonly "resolvedByUserId": string | null, readonly "resolvedByName": string | null, readonly "resolvedVersionToken": string | null, readonly "resolvedVersionSource": "build_id" | "plugin_version" | null, readonly "note": string | null }
export const ErrorResolutionInfoEncoded = Schema.Struct({ "mode": Schema.Literals(["once", "version", "version_and_prior", "forever"]), "resolvedAt": Schema.String, "resolvedByUserId": Schema.Union([Schema.String, Schema.Null]), "resolvedByName": Schema.Union([Schema.String, Schema.Null]), "resolvedVersionToken": Schema.Union([Schema.String, Schema.Null]), "resolvedVersionSource": Schema.Union([Schema.Literals(["build_id", "plugin_version"]), Schema.Null]), "note": Schema.Union([Schema.String, Schema.Null]) }).annotate({ "identifier": "ErrorResolutionInfoEncoded" })
export type ErrorLabelEncoded = { readonly "id": string, readonly "name": string, readonly "color": string, readonly "projectId"?: string | null, readonly "position"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "createdBy"?: string | null | null, readonly "updatedBy"?: string | null | null, readonly "createdAt"?: string | null, readonly "updatedAt"?: string | null, readonly "issueCount"?: number | "Infinity" | "-Infinity" | "NaN" | null }
export const ErrorLabelEncoded = Schema.Struct({ "id": Schema.String, "name": Schema.String, "color": Schema.String, "projectId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "position": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "createdBy": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "updatedBy": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "createdAt": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "updatedAt": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "issueCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) }).annotate({ "identifier": "ErrorLabelEncoded" })
export type ErrorTimelinePointEncoded = { readonly "date": string, readonly "errors": number | "Infinity" | "-Infinity" | "NaN", readonly "uniqueErrors": number | "Infinity" | "-Infinity" | "NaN", readonly "bucketStart": string }
export const ErrorTimelinePointEncoded = Schema.Struct({ "date": Schema.String, "errors": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "uniqueErrors": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "bucketStart": Schema.String }).annotate({ "identifier": "ErrorTimelinePointEncoded" })
export type ErrorOccurrenceEncoded = { readonly "id": string, readonly "projectId": string, readonly "hash": string, readonly "errorId": string, readonly "dataEntryId": string | null, readonly "count": number | "Infinity" | "-Infinity" | "NaN", readonly "sessionId": string | null, readonly "windowId": string | null, readonly "buildId": string | null, readonly "errorName": string | null, readonly "errorMessage": string | null, readonly "language": string | null, readonly "createdAt": string, readonly "latestStack": ReadonlyArray<string>, readonly "mappedStack": ReadonlyArray<string>, readonly "sourceMapUsedName": string | null, readonly "context": { readonly [x: string]: Schema.Json } | null, readonly "browser": string | null, readonly "browserVersion": string | null, readonly "os": string | null, readonly "country": string | null, readonly "device": string | null, readonly "playerCount": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "onlineMode": boolean | null, readonly "pluginVersion": string | null, readonly "minecraftVersion": string | null, readonly "javaVersion": string | null, readonly "serverType": string | null, readonly "osVersion": string | null, readonly "osArch": string | null, readonly "coreCount": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "handled": boolean | null }
export const ErrorOccurrenceEncoded = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "hash": Schema.String, "errorId": Schema.String, "dataEntryId": Schema.Union([Schema.String, Schema.Null]), "count": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "sessionId": Schema.Union([Schema.String, Schema.Null]), "windowId": Schema.Union([Schema.String, Schema.Null]), "buildId": Schema.Union([Schema.String, Schema.Null]), "errorName": Schema.Union([Schema.String, Schema.Null]), "errorMessage": Schema.Union([Schema.String, Schema.Null]), "language": Schema.Union([Schema.String, Schema.Null]), "createdAt": Schema.String, "latestStack": Schema.Array(Schema.String), "mappedStack": Schema.Array(Schema.String), "sourceMapUsedName": Schema.Union([Schema.String, Schema.Null]), "context": Schema.Union([Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })), Schema.Null]), "browser": Schema.Union([Schema.String, Schema.Null]), "browserVersion": Schema.Union([Schema.String, Schema.Null]), "os": Schema.Union([Schema.String, Schema.Null]), "country": Schema.Union([Schema.String, Schema.Null]), "device": Schema.Union([Schema.String, Schema.Null]), "playerCount": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "onlineMode": Schema.Union([Schema.Boolean, Schema.Null]), "pluginVersion": Schema.Union([Schema.String, Schema.Null]), "minecraftVersion": Schema.Union([Schema.String, Schema.Null]), "javaVersion": Schema.Union([Schema.String, Schema.Null]), "serverType": Schema.Union([Schema.String, Schema.Null]), "osVersion": Schema.Union([Schema.String, Schema.Null]), "osArch": Schema.Union([Schema.String, Schema.Null]), "coreCount": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "handled": Schema.Union([Schema.Boolean, Schema.Null]) }).annotate({ "identifier": "ErrorOccurrenceEncoded" })
export type EventExplorerRowEncoded = { readonly "id": string, readonly "timestamp": string, readonly "fieldValues": { readonly [x: string]: string } }
export const EventExplorerRowEncoded = Schema.Struct({ "id": Schema.String, "timestamp": Schema.String, "fieldValues": Schema.Record(Schema.String, Schema.String) }).annotate({ "identifier": "EventExplorerRowEncoded" })
export type EventExplorerDetailEncoded = { readonly "id": string, readonly "timestamp": string, readonly "fieldValues": { readonly [x: string]: string }, readonly "rawData": string, readonly "userKey": string | null, readonly "replaySessionId": string | null }
export const EventExplorerDetailEncoded = Schema.Struct({ "id": Schema.String, "timestamp": Schema.String, "fieldValues": Schema.Record(Schema.String, Schema.String), "rawData": Schema.String, "userKey": Schema.Union([Schema.String, Schema.Null]), "replaySessionId": Schema.Union([Schema.String, Schema.Null]) }).annotate({ "identifier": "EventExplorerDetailEncoded" })
export type EventMarkerValidationErrorEncoded = { readonly "_tag": "EventMarkerValidationError", readonly "message": string }
export const EventMarkerValidationErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("EventMarkerValidationError"), "message": Schema.String }).annotate({ "identifier": "EventMarkerValidationErrorEncoded" })
export type EventMarkerTimestampInput = string | string | number | "Infinity" | "-Infinity" | "NaN" | string
export const EventMarkerTimestampInput = Schema.Union([Schema.String, Schema.String, Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.String]).annotate({ "description": "Event time as an ISO 8601 string, Unix seconds, or Unix milliseconds. Values below 1_000_000_000_000 are interpreted as seconds.", "identifier": "EventMarkerTimestampInput" })
export type FeatureFlagRecordEncoded = { readonly "id": string, readonly "projectId": string, readonly "key": string, readonly "name": string, readonly "description": string | null, readonly "type": "boolean" | "string" | "number" | "json", readonly "enabled": boolean, readonly "archivedAt": string | null, readonly "version": number | "Infinity" | "-Infinity" | "NaN", readonly "variants": ReadonlyArray<{ readonly "key": string, readonly "name": string | null, readonly "value": string }>, readonly "offVariant": string, readonly "fallthrough": { readonly "variant": string | null, readonly "rollout": ReadonlyArray<{ readonly "variant": string, readonly "weight": number | "Infinity" | "-Infinity" | "NaN" }> }, readonly "rules": ReadonlyArray<{ readonly "id"?: string | null, readonly "name": string | null, readonly "conditions": ReadonlyArray<{ readonly "attribute": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "starts_with" | "ends_with" | "matches_regex" | "greater_than" | "greater_or_equal" | "less_than" | "less_or_equal" | "semver_equals" | "semver_greater_than" | "semver_greater_or_equal" | "semver_less_than" | "semver_less_or_equal" | "before" | "after" | "exists" | "not_exists" | "in_segment" | "not_in_segment", readonly "values": ReadonlyArray<string> }>, readonly "serve": { readonly "variant": string | null, readonly "rollout": ReadonlyArray<{ readonly "variant": string, readonly "weight": number | "Infinity" | "-Infinity" | "NaN" }> } }>, readonly "targets": ReadonlyArray<{ readonly "kind": "identifier" | "user", readonly "value": string, readonly "variant": string }>, readonly "prerequisites": ReadonlyArray<{ readonly "flagKey": string, readonly "variant": string }>, readonly "createdAt": string, readonly "updatedAt": string }
export const FeatureFlagRecordEncoded = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "key": Schema.String, "name": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "type": Schema.Literals(["boolean", "string", "number", "json"]), "enabled": Schema.Boolean, "archivedAt": Schema.Union([Schema.String, Schema.Null]), "version": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "variants": Schema.Array(Schema.Struct({ "key": Schema.String, "name": Schema.Union([Schema.String, Schema.Null]), "value": Schema.String })), "offVariant": Schema.String, "fallthrough": Schema.Struct({ "variant": Schema.Union([Schema.String, Schema.Null]), "rollout": Schema.Array(Schema.Struct({ "variant": Schema.String, "weight": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })) }), "rules": Schema.Array(Schema.Struct({ "id": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "name": Schema.Union([Schema.String, Schema.Null]), "conditions": Schema.Array(Schema.Struct({ "attribute": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "starts_with", "ends_with", "matches_regex", "greater_than", "greater_or_equal", "less_than", "less_or_equal", "semver_equals", "semver_greater_than", "semver_greater_or_equal", "semver_less_than", "semver_less_or_equal", "before", "after", "exists", "not_exists", "in_segment", "not_in_segment"]), "values": Schema.Array(Schema.String) })), "serve": Schema.Struct({ "variant": Schema.Union([Schema.String, Schema.Null]), "rollout": Schema.Array(Schema.Struct({ "variant": Schema.String, "weight": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })) }) })), "targets": Schema.Array(Schema.Struct({ "kind": Schema.Literals(["identifier", "user"]), "value": Schema.String, "variant": Schema.String })), "prerequisites": Schema.Array(Schema.Struct({ "flagKey": Schema.String, "variant": Schema.String })), "createdAt": Schema.String, "updatedAt": Schema.String }).annotate({ "identifier": "FeatureFlagRecordEncoded" })
export type FeatureFlagValidationErrorEncoded = { readonly "_tag": "FeatureFlagValidationError", readonly "message": string }
export const FeatureFlagValidationErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("FeatureFlagValidationError"), "message": Schema.String }).annotate({ "identifier": "FeatureFlagValidationErrorEncoded" })
export type FeatureFlagActivityRecordEncoded = { readonly "flagId": string, readonly "evaluations": number | "Infinity" | "-Infinity" | "NaN" }
export const FeatureFlagActivityRecordEncoded = Schema.Struct({ "flagId": Schema.String, "evaluations": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }).annotate({ "identifier": "FeatureFlagActivityRecordEncoded" })
export type FeatureFlagVariantExposureEncoded = { readonly "variant": string, readonly "evaluations": number | "Infinity" | "-Infinity" | "NaN", readonly "subjects": number | "Infinity" | "-Infinity" | "NaN" }
export const FeatureFlagVariantExposureEncoded = Schema.Struct({ "variant": Schema.String, "evaluations": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "subjects": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }).annotate({ "identifier": "FeatureFlagVariantExposureEncoded" })
export type FeatureFlagSeriesPointEncoded = { readonly "bucket": string, readonly "variant": string, readonly "evaluations": number | "Infinity" | "-Infinity" | "NaN" }
export const FeatureFlagSeriesPointEncoded = Schema.Struct({ "bucket": Schema.String, "variant": Schema.String, "evaluations": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }).annotate({ "identifier": "FeatureFlagSeriesPointEncoded" })
export type FeatureFlagEvaluationRecordEncoded = { readonly "id": string, readonly "userId": string | null, readonly "externalId": string | null, readonly "sessionId": string | null, readonly "email": string | null, readonly "userKey": string | null, readonly "hasReplay": boolean, readonly "variant": string, readonly "value": string, readonly "reason": string, readonly "ruleId": string | null, readonly "createdAt": string }
export const FeatureFlagEvaluationRecordEncoded = Schema.Struct({ "id": Schema.String, "userId": Schema.Union([Schema.String, Schema.Null]), "externalId": Schema.Union([Schema.String, Schema.Null]), "sessionId": Schema.Union([Schema.String, Schema.Null]), "email": Schema.Union([Schema.String, Schema.Null]), "userKey": Schema.Union([Schema.String, Schema.Null]), "hasReplay": Schema.Boolean, "variant": Schema.String, "value": Schema.String, "reason": Schema.String, "ruleId": Schema.Union([Schema.String, Schema.Null]), "createdAt": Schema.String }).annotate({ "identifier": "FeatureFlagEvaluationRecordEncoded" })
export type TestFeatureFlagResultEncoded = { readonly "value": Schema.Json, readonly "variant": string, readonly "reason": string, readonly "ruleId"?: string | null | null, readonly "attributes": { readonly [x: string]: Schema.Json }, readonly "trace": { readonly "prerequisites": ReadonlyArray<{ readonly "flagKey"?: string | null | null, readonly "servedVariant"?: string | null | null, readonly "passed": boolean }>, readonly "rules": ReadonlyArray<{ readonly "ruleId": string, readonly "name"?: string | null | null, readonly "matched": boolean, readonly "conditions": ReadonlyArray<{ readonly "attribute": string, readonly "operator": string, readonly "actual"?: Schema.Json | null | null, readonly "matched": boolean }> }>, readonly "bucket"?: number | "Infinity" | "-Infinity" | "NaN" | null } }
export const TestFeatureFlagResultEncoded = Schema.Struct({ "value": Schema.Json.annotate({ "expected": "JSON value" }), "variant": Schema.String, "reason": Schema.String, "ruleId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "attributes": Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })), "trace": Schema.Struct({ "prerequisites": Schema.Array(Schema.Struct({ "flagKey": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "servedVariant": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "passed": Schema.Boolean })), "rules": Schema.Array(Schema.Struct({ "ruleId": Schema.String, "name": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "matched": Schema.Boolean, "conditions": Schema.Array(Schema.Struct({ "attribute": Schema.String, "operator": Schema.String, "actual": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Json.annotate({ "expected": "JSON value" }), Schema.Null]), Schema.Null])), "matched": Schema.Boolean })) })), "bucket": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) }) }).annotate({ "identifier": "TestFeatureFlagResultEncoded" })
export type FeatureFlagSegmentRecordEncoded = { readonly "id": string, readonly "projectId": string, readonly "key": string, readonly "name": string, readonly "description": string | null, readonly "matchMode": "all" | "any", readonly "conditions": ReadonlyArray<{ readonly "attribute": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "starts_with" | "ends_with" | "matches_regex" | "greater_than" | "greater_or_equal" | "less_than" | "less_or_equal" | "semver_equals" | "semver_greater_than" | "semver_greater_or_equal" | "semver_less_than" | "semver_less_or_equal" | "before" | "after" | "exists" | "not_exists" | "in_segment" | "not_in_segment", readonly "values": ReadonlyArray<string> }>, readonly "members": ReadonlyArray<{ readonly "kind": "identifier" | "user", readonly "value": string, readonly "excluded": boolean }>, readonly "createdAt": string, readonly "updatedAt": string }
export const FeatureFlagSegmentRecordEncoded = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "key": Schema.String, "name": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "matchMode": Schema.Literals(["all", "any"]), "conditions": Schema.Array(Schema.Struct({ "attribute": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "starts_with", "ends_with", "matches_regex", "greater_than", "greater_or_equal", "less_than", "less_or_equal", "semver_equals", "semver_greater_than", "semver_greater_or_equal", "semver_less_than", "semver_less_or_equal", "before", "after", "exists", "not_exists", "in_segment", "not_in_segment"]), "values": Schema.Array(Schema.String) })), "members": Schema.Array(Schema.Struct({ "kind": Schema.Literals(["identifier", "user"]), "value": Schema.String, "excluded": Schema.Boolean })), "createdAt": Schema.String, "updatedAt": Schema.String }).annotate({ "identifier": "FeatureFlagSegmentRecordEncoded" })
export type FeatureFlagUserStateRecordEncoded = { readonly "flagId": string, readonly "key": string, readonly "name": string, readonly "variant": string | null, readonly "value": string | null, readonly "reason": string | null, readonly "evaluatedAt": string | null }
export const FeatureFlagUserStateRecordEncoded = Schema.Struct({ "flagId": Schema.String, "key": Schema.String, "name": Schema.String, "variant": Schema.Union([Schema.String, Schema.Null]), "value": Schema.Union([Schema.String, Schema.Null]), "reason": Schema.Union([Schema.String, Schema.Null]), "evaluatedAt": Schema.Union([Schema.String, Schema.Null]) }).annotate({ "identifier": "FeatureFlagUserStateRecordEncoded" })
export type FunnelRecordEncoded = { readonly "id": string, readonly "projectId": string, readonly "name": string, readonly "description": string | null, readonly "steps": ReadonlyArray<{ readonly "type"?: "event" | null, readonly "id": string, readonly "name": string, readonly "match": "all" | "any", readonly "filters": ReadonlyArray<{ readonly "field": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "starts_with" | "not_starts_with" | "ends_with" | "not_ends_with" | "greater_than" | "less_than", readonly "value": string | number | "Infinity" | "-Infinity" | "NaN" | boolean }> }> | null, readonly "unsupportedSteps"?: boolean | null, readonly "conversionWindowSeconds": number | "Infinity" | "-Infinity" | "NaN", readonly "strictOrder": boolean, readonly "timeRangeSeconds": number | "Infinity" | "-Infinity" | "NaN", readonly "createdAt": string, readonly "updatedAt": string }
export const FunnelRecordEncoded = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "name": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "steps": Schema.Union([Schema.Array(Schema.Struct({ "type": Schema.optionalKey(Schema.Union([Schema.Literal("event"), Schema.Null])), "id": Schema.String, "name": Schema.String, "match": Schema.Literals(["all", "any"]), "filters": Schema.Array(Schema.Struct({ "field": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "starts_with", "not_starts_with", "ends_with", "not_ends_with", "greater_than", "less_than"]), "value": Schema.Union([Schema.String, Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Boolean]) })) })), Schema.Null]), "unsupportedSteps": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "conversionWindowSeconds": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "strictOrder": Schema.Boolean, "timeRangeSeconds": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "createdAt": Schema.String, "updatedAt": Schema.String }).annotate({ "identifier": "FunnelRecordEncoded" })
export type FunnelValidationErrorEncoded = { readonly "_tag": "FunnelValidationError", readonly "message": string }
export const FunnelValidationErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("FunnelValidationError"), "message": Schema.String }).annotate({ "identifier": "FunnelValidationErrorEncoded" })
export type FunnelQueryErrorEncoded = { readonly "_tag": "FunnelQueryError", readonly "message": string }
export const FunnelQueryErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("FunnelQueryError"), "message": Schema.String }).annotate({ "identifier": "FunnelQueryErrorEncoded" })
export type FunnelStepResultEncoded = { readonly "count": number | "Infinity" | "-Infinity" | "NaN", readonly "conversionRate": number | "Infinity" | "-Infinity" | "NaN", readonly "dropOffRate": number | "Infinity" | "-Infinity" | "NaN" }
export const FunnelStepResultEncoded = Schema.Struct({ "count": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "conversionRate": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "dropOffRate": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }).annotate({ "identifier": "FunnelStepResultEncoded" })
export type CloudflareImageErrorEncoded = { readonly "_tag": "CloudflareImageError", readonly "message": string }
export const CloudflareImageErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("CloudflareImageError"), "message": Schema.String }).annotate({ "identifier": "CloudflareImageErrorEncoded" })
export type ChartQueryValidationErrorEncoded = { readonly "_tag": "ChartQueryValidationError", readonly "message": string, readonly "path"?: string | null }
export const ChartQueryValidationErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("ChartQueryValidationError"), "message": Schema.String, "path": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }).annotate({ "identifier": "ChartQueryValidationErrorEncoded" })
export type MetricsDecodeErrorEncoded = { readonly "_tag": "MetricsDecodeError", readonly "message": string }
export const MetricsDecodeErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("MetricsDecodeError"), "message": Schema.String }).annotate({ "identifier": "MetricsDecodeErrorEncoded" })
export type NetworkRuleRecordEncoded = { readonly "id": string, readonly "projectId": string, readonly "ipAddress": string, readonly "allowed": boolean, readonly "createdAt": string }
export const NetworkRuleRecordEncoded = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "ipAddress": Schema.String, "allowed": Schema.Boolean, "createdAt": Schema.String }).annotate({ "identifier": "NetworkRuleRecordEncoded" })
export type NetworkRuleValidationErrorEncoded = { readonly "_tag": "NetworkRuleValidationError", readonly "message": string }
export const NetworkRuleValidationErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("NetworkRuleValidationError"), "message": Schema.String }).annotate({ "identifier": "NetworkRuleValidationErrorEncoded" })
export type ProjectValidationErrorEncoded = { readonly "_tag": "ProjectValidationError", readonly "message": string }
export const ProjectValidationErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("ProjectValidationError"), "message": Schema.String }).annotate({ "identifier": "ProjectValidationErrorEncoded" })
export type ProjectConflictErrorEncoded = { readonly "_tag": "ProjectConflictError", readonly "message": string }
export const ProjectConflictErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("ProjectConflictError"), "message": Schema.String }).annotate({ "identifier": "ProjectConflictErrorEncoded" })
export type PublicProjectStatsRecord = { readonly "projectId": string, readonly "name": string, readonly "onlineServers": number, readonly "totalServers7d": number, readonly "onlinePlayers": number }
export const PublicProjectStatsRecord = Schema.Struct({ "projectId": Schema.String, "name": Schema.String, "onlineServers": Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })).check(Schema.isGreaterThanOrEqualTo(0).annotate({ "expected": "a value greater than or equal to 0" })), "totalServers7d": Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })).check(Schema.isGreaterThanOrEqualTo(0).annotate({ "expected": "a value greater than or equal to 0" })), "onlinePlayers": Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })).check(Schema.isGreaterThanOrEqualTo(0).annotate({ "expected": "a value greater than or equal to 0" })) }).annotate({ "description": "Public project activity stats.", "identifier": "PublicProjectStatsRecord" })
export type RetentionCohortPeriodEncoded = { readonly "period": number | "Infinity" | "-Infinity" | "NaN", readonly "usersRetained": number | "Infinity" | "-Infinity" | "NaN", readonly "retentionRate": number | "Infinity" | "-Infinity" | "NaN" }
export const RetentionCohortPeriodEncoded = Schema.Struct({ "period": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "usersRetained": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "retentionRate": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }).annotate({ "identifier": "RetentionCohortPeriodEncoded" })
export type RetentionDriverDataEncoded = { readonly "source": "web" | "mods", readonly "field": string, readonly "value": string, readonly "cohortUsers": number | "Infinity" | "-Infinity" | "NaN", readonly "retainedUsers": number | "Infinity" | "-Infinity" | "NaN", readonly "retentionRate": number | "Infinity" | "-Infinity" | "NaN", readonly "baselineRate": number | "Infinity" | "-Infinity" | "NaN", readonly "deltaPoints": number | "Infinity" | "-Infinity" | "NaN", readonly "impactScore": number | "Infinity" | "-Infinity" | "NaN" }
export const RetentionDriverDataEncoded = Schema.Struct({ "source": Schema.Literals(["web", "mods"]), "field": Schema.String, "value": Schema.String, "cohortUsers": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "retainedUsers": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "retentionRate": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "baselineRate": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "deltaPoints": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "impactScore": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }).annotate({ "identifier": "RetentionDriverDataEncoded" })
export type ReplayInsightBadRequestErrorEncoded = { readonly "_tag": "ReplayInsightBadRequestError", readonly "message": string }
export const ReplayInsightBadRequestErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("ReplayInsightBadRequestError"), "message": Schema.String }).annotate({ "identifier": "ReplayInsightBadRequestErrorEncoded" })
export type SessionReplaysValidationErrorEncoded = { readonly "_tag": "SessionReplaysValidationError", readonly "message": string }
export const SessionReplaysValidationErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("SessionReplaysValidationError"), "message": Schema.String }).annotate({ "identifier": "SessionReplaysValidationErrorEncoded" })
export type ReplaySummaryPersonEncoded = { readonly "personId": string, readonly "effect": "include" | "exclude", readonly "externalId": string, readonly "email": string | null, readonly "name": string | null, readonly "avatarUrl": string | null }
export const ReplaySummaryPersonEncoded = Schema.Struct({ "personId": Schema.String, "effect": Schema.Literals(["include", "exclude"]), "externalId": Schema.String, "email": Schema.Union([Schema.String, Schema.Null]), "name": Schema.Union([Schema.String, Schema.Null]), "avatarUrl": Schema.Union([Schema.String, Schema.Null]) }).annotate({ "identifier": "ReplaySummaryPersonEncoded" })
export type ReplaySummaryCostEstimateEncoded = { readonly "avgUsd": number | "Infinity" | "-Infinity" | "NaN", readonly "basedOn": number | "Infinity" | "-Infinity" | "NaN", readonly "scope": "project" | "platform" }
export const ReplaySummaryCostEstimateEncoded = Schema.Struct({ "avgUsd": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "basedOn": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "scope": Schema.Literals(["project", "platform"]) }).annotate({ "identifier": "ReplaySummaryCostEstimateEncoded" })
export type ReplaySummaryPreviewEncoded = { readonly "windowDays": number | "Infinity" | "-Infinity" | "NaN", readonly "eligible": number | "Infinity" | "-Infinity" | "NaN", readonly "selected": number | "Infinity" | "-Infinity" | "NaN" }
export const ReplaySummaryPreviewEncoded = Schema.Struct({ "windowDays": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "eligible": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "selected": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }).annotate({ "identifier": "ReplaySummaryPreviewEncoded" })
export type SessionReplayListItemEncoded = { readonly "sessionId": string, readonly "windowId": string, readonly "identifier": string | null, readonly "externalId": string | null, readonly "email": string | null, readonly "name": string | null, readonly "startedAt": string, readonly "endedAt": string, readonly "clickCount"?: number | "Infinity" | "-Infinity" | "NaN" | null | null, readonly "rageClickCount"?: number | "Infinity" | "-Infinity" | "NaN" | null | null, readonly "eventCount": number | "Infinity" | "-Infinity" | "NaN", readonly "chunkCount": number | "Infinity" | "-Infinity" | "NaN", readonly "actualDuration": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "finalizationState": "open" | "complete" | "timed_out_incomplete", readonly "coverage": { readonly "ranges": ReadonlyArray<ReadonlyArray<number | "Infinity" | "-Infinity" | "NaN">>, readonly "terminal": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "unknown": "legacy_contract" | "range_limit" | null }, readonly "browser": string | null, readonly "country": string | null, readonly "os": string | null, readonly "viewed": boolean, readonly "hasSummary"?: boolean | null, readonly "hasPainPoints"?: boolean | null, readonly "collectionAddedByName"?: string | null | null, readonly "collectionAddedByEmail"?: string | null | null, readonly "collectionAddedAt"?: string | null | null }
export const SessionReplayListItemEncoded = Schema.Struct({ "sessionId": Schema.String, "windowId": Schema.String, "identifier": Schema.Union([Schema.String, Schema.Null]), "externalId": Schema.Union([Schema.String, Schema.Null]), "email": Schema.Union([Schema.String, Schema.Null]), "name": Schema.Union([Schema.String, Schema.Null]), "startedAt": Schema.String, "endedAt": Schema.String, "clickCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])), "rageClickCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])), "eventCount": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "chunkCount": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "actualDuration": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "finalizationState": Schema.Literals(["open", "complete", "timed_out_incomplete"]), "coverage": Schema.Struct({ "ranges": Schema.Array(Schema.Array(Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]))), "terminal": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "unknown": Schema.Union([Schema.Literals(["legacy_contract", "range_limit"]), Schema.Null]) }), "browser": Schema.Union([Schema.String, Schema.Null]), "country": Schema.Union([Schema.String, Schema.Null]), "os": Schema.Union([Schema.String, Schema.Null]), "viewed": Schema.Boolean, "hasSummary": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "hasPainPoints": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "collectionAddedByName": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "collectionAddedByEmail": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "collectionAddedAt": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])) }).annotate({ "identifier": "SessionReplayListItemEncoded" })
export type ReplayCollectionRecordEncoded = { readonly "id": string, readonly "projectId": string, readonly "name": string, readonly "mode": "manual" | "automatic", readonly "filterConfig": { readonly "viewed"?: boolean | null, readonly "identifiedState"?: "identified" | "anonymous" | null, readonly "browserIn"?: ReadonlyArray<string> | null, readonly "osIn"?: ReadonlyArray<string> | null, readonly "countryIn"?: ReadonlyArray<string> | null, readonly "routeVisitedAny"?: ReadonlyArray<string> | null, readonly "minClickCount"?: number | null, readonly "maxClickCount"?: number | null, readonly "minRageClickCount"?: number | null, readonly "maxRageClickCount"?: number | null, readonly "minEventCount"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "maxEventCount"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "minDurationMs"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "maxDurationMs"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "hasErrors"?: boolean | null, readonly "hasSummary"?: boolean | null, readonly "hasPainPoints"?: boolean | null, readonly "hasPoorVitals"?: boolean | null, readonly "poorVitalMetric"?: string | null, readonly "playbackStart"?: "session_start" | "matched_event" | null, readonly "datasourceFilters"?: ReadonlyArray<{ readonly "referenceId": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "greater_than" | "less_than", readonly "value": string, readonly "dataType"?: "string" | "number" | "boolean" | null }> | null } | null, readonly "position": number | "Infinity" | "-Infinity" | "NaN", readonly "defaultKey": string | null, readonly "createdBy": string | null, readonly "updatedBy": string | null, readonly "createdAt": string, readonly "updatedAt": string, readonly "replayCount"?: number | "Infinity" | "-Infinity" | "NaN" | null }
export const ReplayCollectionRecordEncoded = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "name": Schema.String, "mode": Schema.Literals(["manual", "automatic"]), "filterConfig": Schema.Union([Schema.Struct({ "viewed": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "identifiedState": Schema.optionalKey(Schema.Union([Schema.Literals(["identified", "anonymous"]), Schema.Null])), "browserIn": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "osIn": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "countryIn": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "routeVisitedAny": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "minClickCount": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isInt().annotate({ "expected": "an integer" })).check(Schema.isGreaterThanOrEqualTo(0).annotate({ "expected": "a value greater than or equal to 0" })).check(Schema.isLessThanOrEqualTo(2147483647).annotate({ "expected": "a value less than or equal to 2147483647" })), Schema.Null])), "maxClickCount": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isInt().annotate({ "expected": "an integer" })).check(Schema.isGreaterThanOrEqualTo(0).annotate({ "expected": "a value greater than or equal to 0" })).check(Schema.isLessThanOrEqualTo(2147483647).annotate({ "expected": "a value less than or equal to 2147483647" })), Schema.Null])), "minRageClickCount": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isInt().annotate({ "expected": "an integer" })).check(Schema.isGreaterThanOrEqualTo(0).annotate({ "expected": "a value greater than or equal to 0" })).check(Schema.isLessThanOrEqualTo(2147483647).annotate({ "expected": "a value less than or equal to 2147483647" })), Schema.Null])), "maxRageClickCount": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isInt().annotate({ "expected": "an integer" })).check(Schema.isGreaterThanOrEqualTo(0).annotate({ "expected": "a value greater than or equal to 0" })).check(Schema.isLessThanOrEqualTo(2147483647).annotate({ "expected": "a value less than or equal to 2147483647" })), Schema.Null])), "minEventCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "maxEventCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "minDurationMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "maxDurationMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "hasErrors": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "hasSummary": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "hasPainPoints": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "hasPoorVitals": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "poorVitalMetric": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "playbackStart": Schema.optionalKey(Schema.Union([Schema.Literals(["session_start", "matched_event"]), Schema.Null])), "datasourceFilters": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "referenceId": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "greater_than", "less_than"]), "value": Schema.String, "dataType": Schema.optionalKey(Schema.Union([Schema.Literals(["string", "number", "boolean"]), Schema.Null])) })), Schema.Null])) }), Schema.Null]), "position": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "defaultKey": Schema.Union([Schema.String, Schema.Null]), "createdBy": Schema.Union([Schema.String, Schema.Null]), "updatedBy": Schema.Union([Schema.String, Schema.Null]), "createdAt": Schema.String, "updatedAt": Schema.String, "replayCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) }).annotate({ "identifier": "ReplayCollectionRecordEncoded" })
export type ReplayCollectionAssignmentsResponseEncoded = { readonly "sessionId": string, readonly "windowId": string, readonly "collectionIds": ReadonlyArray<string> }
export const ReplayCollectionAssignmentsResponseEncoded = Schema.Struct({ "sessionId": Schema.String, "windowId": Schema.String, "collectionIds": Schema.Array(Schema.String) }).annotate({ "identifier": "ReplayCollectionAssignmentsResponseEncoded" })
export type ReplayEventsPageResponseEncoded = { readonly "sessionId": string, readonly "windowId": string, readonly "events": ReadonlyArray<string | { readonly [x: string]: Schema.Json }>, readonly "routeSpans": ReadonlyArray<{ readonly "route": string, readonly "from": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "to": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "count": number | "Infinity" | "-Infinity" | "NaN" }>, readonly "nextCursor": { readonly "id": string, readonly "sequence": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "firstEventTimestampMs": number | "Infinity" | "-Infinity" | "NaN", readonly "createdAt": string } | null, readonly "hasMore": boolean, readonly "loadedFrom": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "loadedTo": number | "Infinity" | "-Infinity" | "NaN" | null }
export const ReplayEventsPageResponseEncoded = Schema.Struct({ "sessionId": Schema.String, "windowId": Schema.String, "events": Schema.Array(Schema.Union([Schema.String, Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))])), "routeSpans": Schema.Array(Schema.Struct({ "route": Schema.String, "from": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "to": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "count": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })), "nextCursor": Schema.Union([Schema.Struct({ "id": Schema.String, "sequence": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "firstEventTimestampMs": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "createdAt": Schema.String }), Schema.Null]), "hasMore": Schema.Boolean, "loadedFrom": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "loadedTo": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]) }).annotate({ "identifier": "ReplayEventsPageResponseEncoded" })
export type SessionErrorEncoded = { readonly "id": string, readonly "errorId": string, readonly "count": number | "Infinity" | "-Infinity" | "NaN", readonly "errorName": string | null, readonly "createdAt": string }
export const SessionErrorEncoded = Schema.Struct({ "id": Schema.String, "errorId": Schema.String, "count": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "errorName": Schema.Union([Schema.String, Schema.Null]), "createdAt": Schema.String }).annotate({ "identifier": "SessionErrorEncoded" })
export type UploadedSourceMapEncoded = { readonly "filename": string, readonly "s3Key": string, readonly "size": number | "Infinity" | "-Infinity" | "NaN" }
export const UploadedSourceMapEncoded = Schema.Struct({ "filename": Schema.String, "s3Key": Schema.String, "size": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }).annotate({ "identifier": "UploadedSourceMapEncoded" })
export type CleanupUploadedSourceMapsResponseEncoded = { readonly "ok": boolean, readonly "latestBuildId": string | null, readonly "excludedBuildIds": ReadonlyArray<string>, readonly "deletedBuildIds": ReadonlyArray<string>, readonly "deletedFiles": number | "Infinity" | "-Infinity" | "NaN" }
export const CleanupUploadedSourceMapsResponseEncoded = Schema.Struct({ "ok": Schema.Boolean, "latestBuildId": Schema.Union([Schema.String, Schema.Null]), "excludedBuildIds": Schema.Array(Schema.String), "deletedBuildIds": Schema.Array(Schema.String), "deletedFiles": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }).annotate({ "identifier": "CleanupUploadedSourceMapsResponseEncoded" })
export type SourceMapApiKeyEncoded = { readonly "id": string, readonly "keyPrefix": string, readonly "createdAt": string, readonly "lastUsedAt": string | null }
export const SourceMapApiKeyEncoded = Schema.Struct({ "id": Schema.String, "keyPrefix": Schema.String, "createdAt": Schema.String, "lastUsedAt": Schema.Union([Schema.String, Schema.Null]) }).annotate({ "identifier": "SourceMapApiKeyEncoded" })
export type CreateSourceMapApiKeyResponseEncoded = { readonly "id": string, readonly "keyPrefix": string, readonly "createdAt": string, readonly "fullKey": string }
export const CreateSourceMapApiKeyResponseEncoded = Schema.Struct({ "id": Schema.String, "keyPrefix": Schema.String, "createdAt": Schema.String, "fullKey": Schema.String }).annotate({ "identifier": "CreateSourceMapApiKeyResponseEncoded" })
export type UserVitalSummaryEncoded = { readonly "metric": string, readonly "p75": number | "Infinity" | "-Infinity" | "NaN", readonly "samples": number | "Infinity" | "-Infinity" | "NaN" }
export const UserVitalSummaryEncoded = Schema.Struct({ "metric": Schema.String, "p75": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "samples": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }).annotate({ "identifier": "UserVitalSummaryEncoded" })
export type UsersInputErrorEncoded = { readonly "_tag": "UsersInputError", readonly "message": string }
export const UsersInputErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("UsersInputError"), "message": Schema.String }).annotate({ "identifier": "UsersInputErrorEncoded" })
export type UsersUnavailableErrorEncoded = { readonly "_tag": "UsersUnavailableError", readonly "message": string }
export const UsersUnavailableErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("UsersUnavailableError"), "message": Schema.String }).annotate({ "identifier": "UsersUnavailableErrorEncoded" })
export type UserSessionEventEncoded = { readonly "id"?: string | null, readonly "userId": string, readonly "sessionId": string | null, readonly "sessionDurationMs": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "data": { readonly "event": string, readonly "url": string, readonly "page": string, readonly "properties": { readonly [x: string]: Schema.Json } }, readonly "createdAt": string }
export const UserSessionEventEncoded = Schema.Struct({ "id": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "userId": Schema.String, "sessionId": Schema.Union([Schema.String, Schema.Null]), "sessionDurationMs": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "data": Schema.Struct({ "event": Schema.String, "url": Schema.String, "page": Schema.String, "properties": Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })) }), "createdAt": Schema.String }).annotate({ "identifier": "UserSessionEventEncoded" })
export type UserErrorOccurrenceEncoded = { readonly "id": string, readonly "sessionId": string | null, readonly "message": string, readonly "issueHash": string, readonly "createdAt": string }
export const UserErrorOccurrenceEncoded = Schema.Struct({ "id": Schema.String, "sessionId": Schema.Union([Schema.String, Schema.Null]), "message": Schema.String, "issueHash": Schema.String, "createdAt": Schema.String }).annotate({ "identifier": "UserErrorOccurrenceEncoded" })
export type UserTimelineProvenanceEncoded = { readonly "dataset": string, readonly "matchedBy": "visitor_id" | "identifier" | "user_id" | "session_id", readonly "matchedValue": string, readonly "origin": string | null }
export const UserTimelineProvenanceEncoded = Schema.Struct({ "dataset": Schema.String, "matchedBy": Schema.Literals(["visitor_id", "identifier", "user_id", "session_id"]), "matchedValue": Schema.String, "origin": Schema.Union([Schema.String, Schema.Null]) }).annotate({ "identifier": "UserTimelineProvenanceEncoded" })
export type UserTimelineSignalStatusEncoded = { readonly "signal": "event" | "error" | "flag" | "llm", readonly "state": "ok" | "unavailable" | "skipped" }
export const UserTimelineSignalStatusEncoded = Schema.Struct({ "signal": Schema.Literals(["event", "error", "flag", "llm"]), "state": Schema.Literals(["ok", "unavailable", "skipped"]) }).annotate({ "identifier": "UserTimelineSignalStatusEncoded" })
export type UserActivityDayEncoded = { readonly "date": string, readonly "eventCount": number | "Infinity" | "-Infinity" | "NaN" }
export const UserActivityDayEncoded = Schema.Struct({ "date": Schema.String, "eventCount": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }).annotate({ "identifier": "UserActivityDayEncoded" })
export type UserDataOperationEncoded = { readonly "id": string, readonly "state": "pending" | "running" | "failed" | "completed" }
export const UserDataOperationEncoded = Schema.Struct({ "id": Schema.String, "state": Schema.Literals(["pending", "running", "failed", "completed"]) }).annotate({ "identifier": "UserDataOperationEncoded" })
export type UsersDailyActiveEncoded = { readonly "activeToday": number | "Infinity" | "-Infinity" | "NaN", readonly "activeTodayTrend": number | "Infinity" | "-Infinity" | "NaN" }
export const UsersDailyActiveEncoded = Schema.Struct({ "activeToday": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "activeTodayTrend": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }).annotate({ "identifier": "UsersDailyActiveEncoded" })
export type UserListItemEncoded = { readonly "userKey": string, readonly "userId": string, readonly "personId"?: string | null | null, readonly "userIds": ReadonlyArray<string>, readonly "firstSeen": string, readonly "lastSeen": string, readonly "eventCount": number | "Infinity" | "-Infinity" | "NaN", readonly "activeDays": number | "Infinity" | "-Infinity" | "NaN", readonly "avgSessionDurationMs": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "firstBrowser": string, readonly "browser": string, readonly "firstOs": string, readonly "os": string, readonly "firstCountry": string, readonly "country": string, readonly "firstDevice": string, readonly "device": string, readonly "externalId": string | null, readonly "email": string | null, readonly "name": string | null, readonly "phone": string | null, readonly "avatarUrl": string | null, readonly "traits": { readonly [x: string]: Schema.Json } | null, readonly "serverCount"?: number | "Infinity" | "-Infinity" | "NaN" | null }
export const UserListItemEncoded = Schema.Struct({ "userKey": Schema.String, "userId": Schema.String, "personId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "userIds": Schema.Array(Schema.String), "firstSeen": Schema.String, "lastSeen": Schema.String, "eventCount": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "activeDays": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "avgSessionDurationMs": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "firstBrowser": Schema.String, "browser": Schema.String, "firstOs": Schema.String, "os": Schema.String, "firstCountry": Schema.String, "country": Schema.String, "firstDevice": Schema.String, "device": Schema.String, "externalId": Schema.Union([Schema.String, Schema.Null]), "email": Schema.Union([Schema.String, Schema.Null]), "name": Schema.Union([Schema.String, Schema.Null]), "phone": Schema.Union([Schema.String, Schema.Null]), "avatarUrl": Schema.Union([Schema.String, Schema.Null]), "traits": Schema.Union([Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })), Schema.Null]), "serverCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) }).annotate({ "identifier": "UserListItemEncoded" })
export type UsersActiveTimeseriesRowEncoded = { readonly "date": string, readonly "dau": number | "Infinity" | "-Infinity" | "NaN", readonly "mau": number | "Infinity" | "-Infinity" | "NaN" }
export const UsersActiveTimeseriesRowEncoded = Schema.Struct({ "date": Schema.String, "dau": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "mau": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }).annotate({ "identifier": "UsersActiveTimeseriesRowEncoded" })
export type UsersCohortStatsEncoded = { readonly "totalEvents": number | "Infinity" | "-Infinity" | "NaN", readonly "avgEvents": number | "Infinity" | "-Infinity" | "NaN", readonly "activeToday": number | "Infinity" | "-Infinity" | "NaN", readonly "totalTrend": number | "Infinity" | "-Infinity" | "NaN", readonly "totalEventsTrend": number | "Infinity" | "-Infinity" | "NaN", readonly "avgEventsTrend": number | "Infinity" | "-Infinity" | "NaN", readonly "activeTodayTrend": number | "Infinity" | "-Infinity" | "NaN" }
export const UsersCohortStatsEncoded = Schema.Struct({ "totalEvents": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "avgEvents": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "activeToday": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "totalTrend": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "totalEventsTrend": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "avgEventsTrend": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "activeTodayTrend": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }).annotate({ "identifier": "UsersCohortStatsEncoded" })
export type BuildDeploymentDataEncoded = { readonly "buildId": string, readonly "deployedAt": string }
export const BuildDeploymentDataEncoded = Schema.Struct({ "buildId": Schema.String, "deployedAt": Schema.String }).annotate({ "identifier": "BuildDeploymentDataEncoded" })
export type IntegrationConnectionRecordEncoded = { readonly "id": string, readonly "provider": string, readonly "authType": "oauth" | "api_key" | "webhook_secret" | "app_install", readonly "status": "connected" | "needs_reconnect" | "revoked", readonly "displayName": string | null, readonly "externalAccountName": string | null, readonly "ownerType": "workspace" | "project" }
export const IntegrationConnectionRecordEncoded = Schema.Struct({ "id": Schema.String, "provider": Schema.String, "authType": Schema.Literals(["oauth", "api_key", "webhook_secret", "app_install"]), "status": Schema.Literals(["connected", "needs_reconnect", "revoked"]), "displayName": Schema.Union([Schema.String, Schema.Null]), "externalAccountName": Schema.Union([Schema.String, Schema.Null]), "ownerType": Schema.Literals(["workspace", "project"]) }).annotate({ "identifier": "IntegrationConnectionRecordEncoded" })
export type IntegrationValidationErrorEncoded = { readonly "_tag": "IntegrationValidationError", readonly "message": string }
export const IntegrationValidationErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("IntegrationValidationError"), "message": Schema.String }).annotate({ "identifier": "IntegrationValidationErrorEncoded" })
export type ForbiddenErrorEncoded_1 = { readonly "_tag": "ForbiddenError", readonly "message": string }
export const ForbiddenErrorEncoded_1 = Schema.Struct({ "_tag": Schema.Literal("ForbiddenError"), "message": Schema.String }).annotate({ "identifier": "ForbiddenErrorEncoded_1" })
export type IntegrationErrorEncoded = { readonly "_tag": "IntegrationError", readonly "message": string }
export const IntegrationErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("IntegrationError"), "message": Schema.String }).annotate({ "identifier": "IntegrationErrorEncoded" })
export type CodeContextErrorEncoded = { readonly "_tag": "CodeContextError", readonly "message": string }
export const CodeContextErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("CodeContextError"), "message": Schema.String }).annotate({ "identifier": "CodeContextErrorEncoded" })
export type CodeContextFileRecordEncoded = { readonly "provider": "github" | "codeberg" | "gitlab" | "bitbucket" | "origin", readonly "repository": string, readonly "ref": string | null, readonly "path": string, readonly "htmlUrl": string, readonly "content": string, readonly "lineNumber": number | "Infinity" | "-Infinity" | "NaN" | null }
export const CodeContextFileRecordEncoded = Schema.Struct({ "provider": Schema.Literals(["github", "codeberg", "gitlab", "bitbucket", "origin"]), "repository": Schema.String, "ref": Schema.Union([Schema.String, Schema.Null]), "path": Schema.String, "htmlUrl": Schema.String, "content": Schema.String, "lineNumber": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]) }).annotate({ "identifier": "CodeContextFileRecordEncoded" })
export type CodeContextRepositoryRecordEncoded = { readonly "provider": "github" | "codeberg" | "gitlab" | "bitbucket" | "origin", readonly "fullName": string, readonly "private": boolean, readonly "htmlUrl": string, readonly "description": string | null }
export const CodeContextRepositoryRecordEncoded = Schema.Struct({ "provider": Schema.Literals(["github", "codeberg", "gitlab", "bitbucket", "origin"]), "fullName": Schema.String, "private": Schema.Boolean, "htmlUrl": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]) }).annotate({ "identifier": "CodeContextRepositoryRecordEncoded" })
export type NotificationRecordEncoded = { readonly "id": string, readonly "type": "organization_invite" | "error_assignment" | "error_comment" | "comment_mention" | "replay_comment", readonly "userId": string, readonly "actorUserId": string | null, readonly "actorName": string | null, readonly "organizationId": string | null, readonly "organizationName": string | null, readonly "projectId": string | null, readonly "projectName": string | null, readonly "projectSlug": string | null, readonly "issueId": string | null, readonly "issueTitle": string | null, readonly "commentId": string | null, readonly "commentPreview": string | null, readonly "commentTargetType": "error_issue" | "session_replay" | null, readonly "commentTargetId": string | null, readonly "commentAnchorAt": string | null, readonly "invitationId": string | null, readonly "readAt": string | null, readonly "createdAt": string }
export const NotificationRecordEncoded = Schema.Struct({ "id": Schema.String, "type": Schema.Literals(["organization_invite", "error_assignment", "error_comment", "comment_mention", "replay_comment"]), "userId": Schema.String, "actorUserId": Schema.Union([Schema.String, Schema.Null]), "actorName": Schema.Union([Schema.String, Schema.Null]), "organizationId": Schema.Union([Schema.String, Schema.Null]), "organizationName": Schema.Union([Schema.String, Schema.Null]), "projectId": Schema.Union([Schema.String, Schema.Null]), "projectName": Schema.Union([Schema.String, Schema.Null]), "projectSlug": Schema.Union([Schema.String, Schema.Null]), "issueId": Schema.Union([Schema.String, Schema.Null]), "issueTitle": Schema.Union([Schema.String, Schema.Null]), "commentId": Schema.Union([Schema.String, Schema.Null]), "commentPreview": Schema.Union([Schema.String, Schema.Null]), "commentTargetType": Schema.Union([Schema.Literals(["error_issue", "session_replay"]), Schema.Null]), "commentTargetId": Schema.Union([Schema.String, Schema.Null]), "commentAnchorAt": Schema.Union([Schema.String, Schema.Null]), "invitationId": Schema.Union([Schema.String, Schema.Null]), "readAt": Schema.Union([Schema.String, Schema.Null]), "createdAt": Schema.String }).annotate({ "identifier": "NotificationRecordEncoded" })
export type NotificationErrorEncoded = { readonly "_tag": "NotificationError", readonly "message": string }
export const NotificationErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("NotificationError"), "message": Schema.String }).annotate({ "identifier": "NotificationErrorEncoded" })
export type NotificationUnreadCountEncoded = { readonly "count": number | "Infinity" | "-Infinity" | "NaN" }
export const NotificationUnreadCountEncoded = Schema.Struct({ "count": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }).annotate({ "identifier": "NotificationUnreadCountEncoded" })
export type NotificationEmailPreferenceEncoded = { readonly "type": "organization_invite" | "error_assignment" | "error_comment" | "comment_mention" | "replay_comment", readonly "emailEnabled": boolean }
export const NotificationEmailPreferenceEncoded = Schema.Struct({ "type": Schema.Literals(["organization_invite", "error_assignment", "error_comment", "comment_mention", "replay_comment"]), "emailEnabled": Schema.Boolean }).annotate({ "identifier": "NotificationEmailPreferenceEncoded" })
export type CommentEncoded = { readonly "id": string, readonly "targetType": "error_issue" | "session_replay", readonly "targetId": string, readonly "authorId": string, readonly "authorName": string | null, readonly "authorImage": string | null, readonly "content": string, readonly "replyTo": CommentReplyPreviewEncoded | null, readonly "anchorAt": string | null, readonly "editedAt": string | null, readonly "pinnedAt": string | null, readonly "pinnedByUserId": string | null, readonly "createdAt": string, readonly "updatedAt": string }
export const CommentEncoded = Schema.Struct({ "id": Schema.String, "targetType": Schema.Literals(["error_issue", "session_replay"]), "targetId": Schema.String, "authorId": Schema.String, "authorName": Schema.Union([Schema.String, Schema.Null]), "authorImage": Schema.Union([Schema.String, Schema.Null]), "content": Schema.String, "replyTo": Schema.Union([CommentReplyPreviewEncoded, Schema.Null]), "anchorAt": Schema.Union([Schema.String, Schema.Null]), "editedAt": Schema.Union([Schema.String, Schema.Null]), "pinnedAt": Schema.Union([Schema.String, Schema.Null]), "pinnedByUserId": Schema.Union([Schema.String, Schema.Null]), "createdAt": Schema.String, "updatedAt": Schema.String }).annotate({ "identifier": "CommentEncoded" })
export type Effect_sql_SqlErrorEncoded = { readonly "_tag": "SqlError", readonly "reason": Effect_sql_SqlError_ConnectionErrorEncoded | Effect_sql_SqlError_AuthenticationErrorEncoded | Effect_sql_SqlError_AuthorizationErrorEncoded | Effect_sql_SqlError_SqlSyntaxErrorEncoded | Effect_sql_SqlError_UniqueViolationEncoded | Effect_sql_SqlError_ConstraintErrorEncoded | Effect_sql_SqlError_DeadlockErrorEncoded | Effect_sql_SqlError_SerializationErrorEncoded | Effect_sql_SqlError_LockTimeoutErrorEncoded | Effect_sql_SqlError_StatementTimeoutErrorEncoded | Effect_sql_SqlError_UnknownErrorEncoded }
export const Effect_sql_SqlErrorEncoded = Schema.Struct({ "_tag": Schema.Literal("SqlError"), "reason": Schema.Union([Effect_sql_SqlError_ConnectionErrorEncoded, Effect_sql_SqlError_AuthenticationErrorEncoded, Effect_sql_SqlError_AuthorizationErrorEncoded, Effect_sql_SqlError_SqlSyntaxErrorEncoded, Effect_sql_SqlError_UniqueViolationEncoded, Effect_sql_SqlError_ConstraintErrorEncoded, Effect_sql_SqlError_DeadlockErrorEncoded, Effect_sql_SqlError_SerializationErrorEncoded, Effect_sql_SqlError_LockTimeoutErrorEncoded, Effect_sql_SqlError_StatementTimeoutErrorEncoded, Effect_sql_SqlError_UnknownErrorEncoded]) }).annotate({ "identifier": "effect_sql_SqlErrorEncoded" })
export type StructuredFieldCatalogEncoded = { readonly "fields": ReadonlyArray<StructuredFieldRecordEncoded> }
export const StructuredFieldCatalogEncoded = Schema.Struct({ "fields": Schema.Array(StructuredFieldRecordEncoded) }).annotate({ "identifier": "StructuredFieldCatalogEncoded" })
export type DownloadAnalyticsResponseEncoded = { readonly "overview": DownloadAnalyticsOverviewEncoded, readonly "history": ReadonlyArray<DownloadHistoryPointEncoded>, readonly "providerBreakdown": ReadonlyArray<DownloadAnalyticsPointEncoded>, readonly "providerSummaries": ReadonlyArray<DownloadProviderSummaryEncoded>, readonly "versions": ReadonlyArray<DownloadVersionRowEncoded> }
export const DownloadAnalyticsResponseEncoded = Schema.Struct({ "overview": DownloadAnalyticsOverviewEncoded, "history": Schema.Array(DownloadHistoryPointEncoded), "providerBreakdown": Schema.Array(DownloadAnalyticsPointEncoded), "providerSummaries": Schema.Array(DownloadProviderSummaryEncoded), "versions": Schema.Array(DownloadVersionRowEncoded) }).annotate({ "identifier": "DownloadAnalyticsResponseEncoded" })
export type ErrorIssueSummaryEncoded = { readonly "id": string, readonly "projectId": string, readonly "hash": string, readonly "errorId": string, readonly "errorName": string, readonly "errorMessage": string, readonly "language": string | null, readonly "latestStack": ReadonlyArray<string>, readonly "buildId": string | null, readonly "errorCauseId": string | null, readonly "occurrenceCount": number | "Infinity" | "-Infinity" | "NaN", readonly "matchingStackCount"?: number | "Infinity" | "-Infinity" | "NaN", readonly "affectedSessionCount": number | "Infinity" | "-Infinity" | "NaN", readonly "latestOccurrenceId": string, readonly "firstOccurred": string, readonly "lastOccurred": string, readonly "pluginVersion": string | null, readonly "firstPluginVersion": string | null, readonly "firstBuildId": string | null, readonly "affectedVersionCount": number | "Infinity" | "-Infinity" | "NaN", readonly "affectedVersions": ReadonlyArray<string>, readonly "mappedLatestStack": ReadonlyArray<string>, readonly "sourceMapUsedName": string | null, readonly "searchScore"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "matchedFields"?: ReadonlyArray<string> | null, readonly "eventTrend": ReadonlyArray<number | "Infinity" | "-Infinity" | "NaN">, readonly "viewed": boolean, readonly "status": "active" | "resolved", readonly "regressed": boolean, readonly "currentVersionToken": string | null, readonly "currentVersionSource": "build_id" | "plugin_version" | null, readonly "firstSeenVersionToken": string | null, readonly "firstSeenVersionSource": "build_id" | "plugin_version" | null, readonly "resolution": ErrorResolutionInfoEncoded | null, readonly "priority": "critical" | "high" | "medium" | "low" | null, readonly "assigneeId": string | null, readonly "assigneeName": string | null, readonly "labels": ReadonlyArray<ErrorLabelEncoded>, readonly "commentCount": number | "Infinity" | "-Infinity" | "NaN" }
export const ErrorIssueSummaryEncoded = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "hash": Schema.String, "errorId": Schema.String, "errorName": Schema.String, "errorMessage": Schema.String, "language": Schema.Union([Schema.String, Schema.Null]), "latestStack": Schema.Array(Schema.String), "buildId": Schema.Union([Schema.String, Schema.Null]), "errorCauseId": Schema.Union([Schema.String, Schema.Null]), "occurrenceCount": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "matchingStackCount": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])])), "affectedSessionCount": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "latestOccurrenceId": Schema.String, "firstOccurred": Schema.String, "lastOccurred": Schema.String, "pluginVersion": Schema.Union([Schema.String, Schema.Null]), "firstPluginVersion": Schema.Union([Schema.String, Schema.Null]), "firstBuildId": Schema.Union([Schema.String, Schema.Null]), "affectedVersionCount": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "affectedVersions": Schema.Array(Schema.String), "mappedLatestStack": Schema.Array(Schema.String), "sourceMapUsedName": Schema.Union([Schema.String, Schema.Null]), "searchScore": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "matchedFields": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "eventTrend": Schema.Array(Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])])), "viewed": Schema.Boolean, "status": Schema.Literals(["active", "resolved"]), "regressed": Schema.Boolean, "currentVersionToken": Schema.Union([Schema.String, Schema.Null]), "currentVersionSource": Schema.Union([Schema.Literals(["build_id", "plugin_version"]), Schema.Null]), "firstSeenVersionToken": Schema.Union([Schema.String, Schema.Null]), "firstSeenVersionSource": Schema.Union([Schema.Literals(["build_id", "plugin_version"]), Schema.Null]), "resolution": Schema.Union([ErrorResolutionInfoEncoded, Schema.Null]), "priority": Schema.Union([Schema.Literals(["critical", "high", "medium", "low"]), Schema.Null]), "assigneeId": Schema.Union([Schema.String, Schema.Null]), "assigneeName": Schema.Union([Schema.String, Schema.Null]), "labels": Schema.Array(ErrorLabelEncoded), "commentCount": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }).annotate({ "identifier": "ErrorIssueSummaryEncoded" })
export type EventExplorerResultEncoded = { readonly "rows": ReadonlyArray<EventExplorerRowEncoded>, readonly "total": number | "Infinity" | "-Infinity" | "NaN", readonly "page": number | "Infinity" | "-Infinity" | "NaN", readonly "pageSize": number | "Infinity" | "-Infinity" | "NaN" }
export const EventExplorerResultEncoded = Schema.Struct({ "rows": Schema.Array(EventExplorerRowEncoded), "total": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "page": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "pageSize": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }).annotate({ "identifier": "EventExplorerResultEncoded" })
export type FeatureFlagExposureEncoded = { readonly "subjects": number | "Infinity" | "-Infinity" | "NaN", readonly "variants": ReadonlyArray<FeatureFlagVariantExposureEncoded> }
export const FeatureFlagExposureEncoded = Schema.Struct({ "subjects": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "variants": Schema.Array(FeatureFlagVariantExposureEncoded) }).annotate({ "identifier": "FeatureFlagExposureEncoded" })
export type FeatureFlagSeriesEncoded = { readonly "bucketMs": number | "Infinity" | "-Infinity" | "NaN", readonly "points": ReadonlyArray<FeatureFlagSeriesPointEncoded> }
export const FeatureFlagSeriesEncoded = Schema.Struct({ "bucketMs": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "points": Schema.Array(FeatureFlagSeriesPointEncoded) }).annotate({ "identifier": "FeatureFlagSeriesEncoded" })
export type FeatureFlagEvaluationPageEncoded = { readonly "total": number | "Infinity" | "-Infinity" | "NaN", readonly "evaluations": ReadonlyArray<FeatureFlagEvaluationRecordEncoded> }
export const FeatureFlagEvaluationPageEncoded = Schema.Struct({ "total": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "evaluations": Schema.Array(FeatureFlagEvaluationRecordEncoded) }).annotate({ "identifier": "FeatureFlagEvaluationPageEncoded" })
export type FunnelDetailEncoded = { readonly "funnel": FunnelRecordEncoded, readonly "baselineCount"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "steps": ReadonlyArray<FunnelStepResultEncoded> }
export const FunnelDetailEncoded = Schema.Struct({ "funnel": FunnelRecordEncoded, "baselineCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "steps": Schema.Array(FunnelStepResultEncoded) }).annotate({ "identifier": "FunnelDetailEncoded" })
export type RetentionCohortDataEncoded = { readonly "cohort": string, readonly "cohortDate": string, readonly "users": number | "Infinity" | "-Infinity" | "NaN", readonly "periods": ReadonlyArray<RetentionCohortPeriodEncoded> }
export const RetentionCohortDataEncoded = Schema.Struct({ "cohort": Schema.String, "cohortDate": Schema.String, "users": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "periods": Schema.Array(RetentionCohortPeriodEncoded) }).annotate({ "identifier": "RetentionCohortDataEncoded" })
export type ReplaySummaryRulesResponseEncoded = { readonly "mode": "off" | "all" | "filtered", readonly "sampleRate": number | "Infinity" | "-Infinity" | "NaN", readonly "dailyLimit": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "conditionSets": ReadonlyArray<{ readonly "conditions": ReadonlyArray<{ readonly "field": "country" | "browser" | "os" | "identifier" | "route" | "entry_route" | "exit_route" | "user_email" | "user_name" | "user_external_id" | "user_trait", readonly "operator": "is" | "is_not" | "contains" | "not_contains" | "starts_with" | "ends_with" | "is_set" | "is_not_set", readonly "values": ReadonlyArray<string>, readonly "traitKey": string | null } | { readonly "field": "duration_seconds" | "click_count" | "rage_click_count" | "event_count" | "route_count", readonly "operator": "eq" | "neq" | "gt" | "gte" | "lt" | "lte", readonly "value": number | "Infinity" | "-Infinity" | "NaN" } | { readonly "field": "has_errors" | "has_poor_vitals" | "is_identified", readonly "operator": "is_true" | "is_false" }> }>, readonly "people": ReadonlyArray<ReplaySummaryPersonEncoded>, readonly "automaticToday": number | "Infinity" | "-Infinity" | "NaN", readonly "costPerSummary": ReplaySummaryCostEstimateEncoded | null, readonly "updatedAt": string | null }
export const ReplaySummaryRulesResponseEncoded = Schema.Struct({ "mode": Schema.Literals(["off", "all", "filtered"]), "sampleRate": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "dailyLimit": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "conditionSets": Schema.Array(Schema.Struct({ "conditions": Schema.Array(Schema.Union([Schema.Struct({ "field": Schema.Literals(["country", "browser", "os", "identifier", "route", "entry_route", "exit_route", "user_email", "user_name", "user_external_id", "user_trait"]), "operator": Schema.Literals(["is", "is_not", "contains", "not_contains", "starts_with", "ends_with", "is_set", "is_not_set"]), "values": Schema.Array(Schema.String), "traitKey": Schema.Union([Schema.String, Schema.Null]) }), Schema.Struct({ "field": Schema.Literals(["duration_seconds", "click_count", "rage_click_count", "event_count", "route_count"]), "operator": Schema.Literals(["eq", "neq", "gt", "gte", "lt", "lte"]), "value": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }), Schema.Struct({ "field": Schema.Literals(["has_errors", "has_poor_vitals", "is_identified"]), "operator": Schema.Literals(["is_true", "is_false"]) })])) })), "people": Schema.Array(ReplaySummaryPersonEncoded), "automaticToday": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "costPerSummary": Schema.Union([ReplaySummaryCostEstimateEncoded, Schema.Null]), "updatedAt": Schema.Union([Schema.String, Schema.Null]) }).annotate({ "identifier": "ReplaySummaryRulesResponseEncoded" })
export type UserVitalsEncoded = { readonly "from": number | "Infinity" | "-Infinity" | "NaN", readonly "to": number | "Infinity" | "-Infinity" | "NaN", readonly "items": ReadonlyArray<UserVitalSummaryEncoded> }
export const UserVitalsEncoded = Schema.Struct({ "from": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "to": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "items": Schema.Array(UserVitalSummaryEncoded) }).annotate({ "identifier": "UserVitalsEncoded" })
export type UserSessionsPageEncoded = { readonly "items": ReadonlyArray<UserSessionEventEncoded>, readonly "nextCursor": string | null }
export const UserSessionsPageEncoded = Schema.Struct({ "items": Schema.Array(UserSessionEventEncoded), "nextCursor": Schema.Union([Schema.String, Schema.Null]) }).annotate({ "identifier": "UserSessionsPageEncoded" })
export type UserErrorsPageEncoded = { readonly "items": ReadonlyArray<UserErrorOccurrenceEncoded>, readonly "nextCursor": string | null }
export const UserErrorsPageEncoded = Schema.Struct({ "items": Schema.Array(UserErrorOccurrenceEncoded), "nextCursor": Schema.Union([Schema.String, Schema.Null]) }).annotate({ "identifier": "UserErrorsPageEncoded" })
export type UserTimelineItemEncoded = { readonly "id": string, readonly "signal": "event" | "error" | "flag" | "llm", readonly "occurredAt": string, readonly "endedAt": string | null, readonly "sessionId": string | null, readonly "title": string, readonly "subtitle": string | null, readonly "status": string | null, readonly "reference": string | null, readonly "attributes": { readonly [x: string]: string }, readonly "provenance": UserTimelineProvenanceEncoded }
export const UserTimelineItemEncoded = Schema.Struct({ "id": Schema.String, "signal": Schema.Literals(["event", "error", "flag", "llm"]), "occurredAt": Schema.String, "endedAt": Schema.Union([Schema.String, Schema.Null]), "sessionId": Schema.Union([Schema.String, Schema.Null]), "title": Schema.String, "subtitle": Schema.Union([Schema.String, Schema.Null]), "status": Schema.Union([Schema.String, Schema.Null]), "reference": Schema.Union([Schema.String, Schema.Null]), "attributes": Schema.Record(Schema.String, Schema.String), "provenance": UserTimelineProvenanceEncoded }).annotate({ "identifier": "UserTimelineItemEncoded" })
export type UsersPageEncoded = { readonly "items": ReadonlyArray<UserListItemEncoded>, readonly "total": number | "Infinity" | "-Infinity" | "NaN", readonly "nextCursor": string | null }
export const UsersPageEncoded = Schema.Struct({ "items": Schema.Array(UserListItemEncoded), "total": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "nextCursor": Schema.Union([Schema.String, Schema.Null]) }).annotate({ "identifier": "UsersPageEncoded" })
export type UsersBreakdownEncoded = { readonly "total": number | "Infinity" | "-Infinity" | "NaN", readonly "identified": number | "Infinity" | "-Infinity" | "NaN", readonly "anonymous": number | "Infinity" | "-Infinity" | "NaN", readonly "totalEvents": number | "Infinity" | "-Infinity" | "NaN", readonly "avgEvents": number | "Infinity" | "-Infinity" | "NaN", readonly "activeToday": number | "Infinity" | "-Infinity" | "NaN", readonly "totalTrend": number | "Infinity" | "-Infinity" | "NaN", readonly "totalEventsTrend": number | "Infinity" | "-Infinity" | "NaN", readonly "avgEventsTrend": number | "Infinity" | "-Infinity" | "NaN", readonly "activeTodayTrend": number | "Infinity" | "-Infinity" | "NaN", readonly "identifiedStats": UsersCohortStatsEncoded, readonly "anonymousStats": UsersCohortStatsEncoded }
export const UsersBreakdownEncoded = Schema.Struct({ "total": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "identified": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "anonymous": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "totalEvents": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "avgEvents": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "activeToday": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "totalTrend": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "totalEventsTrend": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "avgEventsTrend": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "activeTodayTrend": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "identifiedStats": UsersCohortStatsEncoded, "anonymousStats": UsersCohortStatsEncoded }).annotate({ "identifier": "UsersBreakdownEncoded" })
export type ErrorIssueDetailEncoded = { readonly "issue": ErrorIssueSummaryEncoded, readonly "timeline": ReadonlyArray<ErrorTimelinePointEncoded>, readonly "memberGroupHashes": ReadonlyArray<string> }
export const ErrorIssueDetailEncoded = Schema.Struct({ "issue": ErrorIssueSummaryEncoded, "timeline": Schema.Array(ErrorTimelinePointEncoded), "memberGroupHashes": Schema.Array(Schema.String) }).annotate({ "identifier": "ErrorIssueDetailEncoded" })
export type RetentionCohortPageEncoded = { readonly "cohorts": ReadonlyArray<RetentionCohortDataEncoded>, readonly "hasMore": boolean }
export const RetentionCohortPageEncoded = Schema.Struct({ "cohorts": Schema.Array(RetentionCohortDataEncoded), "hasMore": Schema.Boolean }).annotate({ "identifier": "RetentionCohortPageEncoded" })
export type UserTimelinePageEncoded = { readonly "items": ReadonlyArray<UserTimelineItemEncoded>, readonly "nextCursor": string | null, readonly "signals": ReadonlyArray<UserTimelineSignalStatusEncoded> }
export const UserTimelinePageEncoded = Schema.Struct({ "items": Schema.Array(UserTimelineItemEncoded), "nextCursor": Schema.Union([Schema.String, Schema.Null]), "signals": Schema.Array(UserTimelineSignalStatusEncoded) }).annotate({ "identifier": "UserTimelinePageEncoded" })
// recursive definitions
export type Union_1 = { readonly "type": "comparison", readonly "field": string, readonly "operator": "equals" | "notEquals" | "contains" | "notContains" | "startsWith" | "notStartsWith" | "endsWith" | "notEndsWith" | "regex" | "notRegex" | "greaterThan" | "greaterOrEqual" | "lessThan" | "lessOrEqual" | "in" | "notIn" | "between" | "isNull" | "isNotNull", readonly "value"?: string | number | "Infinity" | "-Infinity" | "NaN" | boolean | null | ReadonlyArray<string | number | "Infinity" | "-Infinity" | "NaN" | boolean | null> | null, readonly "mapTarget"?: "key" | "value" | null } | { readonly "type": "and" | "or", readonly "conditions": ReadonlyArray<Union_1> }
export const Union_1 = Schema.Union([Schema.Struct({ "type": Schema.Literal("comparison"), "field": Schema.String, "operator": Schema.Literals(["equals", "notEquals", "contains", "notContains", "startsWith", "notStartsWith", "endsWith", "notEndsWith", "regex", "notRegex", "greaterThan", "greaterOrEqual", "lessThan", "lessOrEqual", "in", "notIn", "between", "isNull", "isNotNull"]), "value": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Boolean, Schema.Null, Schema.Array(Schema.Union([Schema.String, Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Boolean, Schema.Null]))]), Schema.Null])), "mapTarget": Schema.optionalKey(Schema.Union([Schema.Literals(["key", "value"]), Schema.Null])) }), Schema.Struct({ "type": Schema.Literals(["and", "or"]), "conditions": Schema.Array(Schema.suspend((): Schema.Codec<Union_1> => Union_1)) })]).annotate({ "identifier": "Union_1" })
export type Union_2 = { readonly "type": "literal", readonly "value": number | "Infinity" | "-Infinity" | "NaN" } | { readonly "type": "input", readonly "inputId": string } | { readonly "type": "unary", readonly "operator": "plus" | "minus", readonly "operand": Union_2 } | { readonly "type": "binary", readonly "operator": "add" | "subtract" | "multiply" | "divide", readonly "left": Union_2, readonly "right": Union_2 }
export const Union_2 = Schema.Union([Schema.Struct({ "type": Schema.Literal("literal"), "value": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }), Schema.Struct({ "type": Schema.Literal("input"), "inputId": Schema.String }), Schema.Struct({ "type": Schema.Literal("unary"), "operator": Schema.Literals(["plus", "minus"]), "operand": Schema.suspend((): Schema.Codec<Union_2> => Union_2) }), Schema.Struct({ "type": Schema.Literal("binary"), "operator": Schema.Literals(["add", "subtract", "multiply", "divide"]), "left": Schema.suspend((): Schema.Codec<Union_2> => Union_2), "right": Schema.suspend((): Schema.Codec<Union_2> => Union_2) })]).annotate({ "identifier": "Union_2" })
export type Union_ = { readonly "type": "source", readonly "dataset": "events-web" | "events-mods" | "downloads" | "web-vitals" | "google-search-console" | "llm-traces", readonly "field": string } | { readonly "type": "filter", readonly "predicate": Union_1, readonly "input": Union_ } | { readonly "type": "timeRange", readonly "range": { readonly "type": "relative", readonly "value": number | "Infinity" | "-Infinity" | "NaN", readonly "unit": "millisecond" | "second" | "minute" | "hour" | "day" | "week" } | { readonly "type": "absolute", readonly "from": string, readonly "to": string }, readonly "input": Union_ } | { readonly "type": "minimumAge", readonly "milliseconds": number | "Infinity" | "-Infinity" | "NaN", readonly "input": Union_ } | { readonly "type": "group", readonly "fields": ReadonlyArray<string>, readonly "mode": "combined" | "flat", readonly "input": Union_ } | { readonly "type": "timeBucket", readonly "interval": "auto" | "minute" | "hour" | "day" | "week" | "month", readonly "timezone"?: string | null, readonly "gapFill": "none" | "zero", readonly "cumulative": boolean, readonly "input": Union_ } | { readonly "type": "aggregate", readonly "function": "count" | "sum" | "avg" | "median" | "min" | "max" | "distinct", readonly "input": Union_ } | { readonly "type": "deduplicate", readonly "identity": "user_id" | "server_id" | "version_id" | "project" | null, readonly "input": Union_ } | { readonly "type": "limit", readonly "rows": number | "Infinity" | "-Infinity" | "NaN", readonly "groupOthers": boolean, readonly "input": Union_ } | { readonly "type": "sort", readonly "by": "time" | "dimension" | "value", readonly "direction": "asc" | "desc", readonly "input": Union_ } | { readonly "type": "transform", readonly "operation": "toLowerCase" | "toUpperCase" | "toTitleCase" | "trim" | "append" | "replace" | "replaceRegex" | "length", readonly "pattern"?: string | null, readonly "replacement"?: string | null, readonly "input": Union_ } | { readonly "type": "formula", readonly "inputs": ReadonlyArray<{ readonly "id": string, readonly "query": Union_ }>, readonly "expression": Union_2, readonly "precision": number | "Infinity" | "-Infinity" | "NaN" } | { readonly "type": "combine", readonly "operation": "sum", readonly "inputs": ReadonlyArray<Union_> }
export const Union_ = Schema.Union([Schema.Struct({ "type": Schema.Literal("source"), "dataset": Schema.Literals(["events-web", "events-mods", "downloads", "web-vitals", "google-search-console", "llm-traces"]), "field": Schema.String }), Schema.Struct({ "type": Schema.Literal("filter"), "predicate": Schema.suspend((): Schema.Codec<Union_1> => Union_1), "input": Schema.suspend((): Schema.Codec<Union_> => Union_) }), Schema.Struct({ "type": Schema.Literal("timeRange"), "range": Schema.Union([Schema.Struct({ "type": Schema.Literal("relative"), "value": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "unit": Schema.Literals(["millisecond", "second", "minute", "hour", "day", "week"]) }), Schema.Struct({ "type": Schema.Literal("absolute"), "from": Schema.String, "to": Schema.String })]), "input": Schema.suspend((): Schema.Codec<Union_> => Union_) }), Schema.Struct({ "type": Schema.Literal("minimumAge"), "milliseconds": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "input": Schema.suspend((): Schema.Codec<Union_> => Union_) }), Schema.Struct({ "type": Schema.Literal("group"), "fields": Schema.Array(Schema.String), "mode": Schema.Literals(["combined", "flat"]), "input": Schema.suspend((): Schema.Codec<Union_> => Union_) }), Schema.Struct({ "type": Schema.Literal("timeBucket"), "interval": Schema.Literals(["auto", "minute", "hour", "day", "week", "month"]), "timezone": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "gapFill": Schema.Literals(["none", "zero"]), "cumulative": Schema.Boolean, "input": Schema.suspend((): Schema.Codec<Union_> => Union_) }), Schema.Struct({ "type": Schema.Literal("aggregate"), "function": Schema.Literals(["count", "sum", "avg", "median", "min", "max", "distinct"]), "input": Schema.suspend((): Schema.Codec<Union_> => Union_) }), Schema.Struct({ "type": Schema.Literal("deduplicate"), "identity": Schema.Union([Schema.Literals(["user_id", "server_id", "version_id", "project"]), Schema.Null]), "input": Schema.suspend((): Schema.Codec<Union_> => Union_) }), Schema.Struct({ "type": Schema.Literal("limit"), "rows": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "groupOthers": Schema.Boolean, "input": Schema.suspend((): Schema.Codec<Union_> => Union_) }), Schema.Struct({ "type": Schema.Literal("sort"), "by": Schema.Literals(["time", "dimension", "value"]), "direction": Schema.Literals(["asc", "desc"]), "input": Schema.suspend((): Schema.Codec<Union_> => Union_) }), Schema.Struct({ "type": Schema.Literal("transform"), "operation": Schema.Literals(["toLowerCase", "toUpperCase", "toTitleCase", "trim", "append", "replace", "replaceRegex", "length"]), "pattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "replacement": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "input": Schema.suspend((): Schema.Codec<Union_> => Union_) }), Schema.Struct({ "type": Schema.Literal("formula"), "inputs": Schema.Array(Schema.Struct({ "id": Schema.String, "query": Schema.suspend((): Schema.Codec<Union_> => Union_) })), "expression": Schema.suspend((): Schema.Codec<Union_2> => Union_2), "precision": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }), Schema.Struct({ "type": Schema.Literal("combine"), "operation": Schema.Literal("sum"), "inputs": Schema.Array(Schema.suspend((): Schema.Codec<Union_> => Union_)) })]).annotate({ "identifier": "Union_" })
// schemas
export type AnomaliesGetAnomaliesForProjectParams = { readonly "grain"?: "hour" | "day" | null, readonly "at"?: string | null }
export const AnomaliesGetAnomaliesForProjectParams = Schema.Struct({ "grain": Schema.optionalKey(Schema.Union([Schema.Literals(["hour", "day"]), Schema.Null])), "at": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type AnomaliesGetAnomaliesForProject200 = { readonly "grain": "hour" | "day", readonly "from": number | "Infinity" | "-Infinity" | "NaN", readonly "to": number | "Infinity" | "-Infinity" | "NaN", readonly "baselineFrom": number | "Infinity" | "-Infinity" | "NaN", readonly "seriesScanned": number | "Infinity" | "-Infinity" | "NaN", readonly "health": ReadonlyArray<{ readonly "metric": string, readonly "label": string, readonly "unit": "count" | "percent" | "ms" | "score", readonly "current": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "expected": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "status": "normal" | "anomalous" | "learning", readonly "chart": { readonly "from": number | "Infinity" | "-Infinity" | "NaN", readonly "bucketSeconds": number | "Infinity" | "-Infinity" | "NaN", readonly "values": ReadonlyArray<number | "Infinity" | "-Infinity" | "NaN" | null>, readonly "expected": ReadonlyArray<number | "Infinity" | "-Infinity" | "NaN" | null>, readonly "lower": ReadonlyArray<number | "Infinity" | "-Infinity" | "NaN" | null>, readonly "upper": ReadonlyArray<number | "Infinity" | "-Infinity" | "NaN" | null> } }>, readonly "incidents": ReadonlyArray<{ readonly "id": string, readonly "kind": "anomaly" | "shift" | "gap", readonly "severity": "critical" | "high" | "medium" | "low", readonly "title": string, readonly "start": number | "Infinity" | "-Infinity" | "NaN", readonly "end": number | "Infinity" | "-Infinity" | "NaN", readonly "ongoing": boolean, readonly "findings": ReadonlyArray<{ readonly "id": string, readonly "metric": string, readonly "label": string, readonly "unit": "count" | "percent" | "ms" | "score", readonly "polarity": 1 | -1, readonly "dimension": string | null, readonly "value": string | null, readonly "direction": "increase" | "decrease", readonly "kind": "anomaly" | "shift" | "gap", readonly "start": number | "Infinity" | "-Infinity" | "NaN", readonly "end": number | "Infinity" | "-Infinity" | "NaN", readonly "ongoing": boolean, readonly "observed": number | "Infinity" | "-Infinity" | "NaN", readonly "expected": number | "Infinity" | "-Infinity" | "NaN", readonly "change": number | "Infinity" | "-Infinity" | "NaN", readonly "peakScore": number | "Infinity" | "-Infinity" | "NaN", readonly "contribution": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "chart": { readonly "from": number | "Infinity" | "-Infinity" | "NaN", readonly "bucketSeconds": number | "Infinity" | "-Infinity" | "NaN", readonly "values": ReadonlyArray<number | "Infinity" | "-Infinity" | "NaN" | null>, readonly "expected": ReadonlyArray<number | "Infinity" | "-Infinity" | "NaN" | null>, readonly "lower": ReadonlyArray<number | "Infinity" | "-Infinity" | "NaN" | null>, readonly "upper": ReadonlyArray<number | "Infinity" | "-Infinity" | "NaN" | null> } }>, readonly "absorbed": number | "Infinity" | "-Infinity" | "NaN", readonly "causes": ReadonlyArray<{ readonly "type": "deploy" | "feature_flag" | "event_marker" | "new_error", readonly "title": string, readonly "detail": string | null, readonly "at": number | "Infinity" | "-Infinity" | "NaN", readonly "reference": string | null }> }>, readonly "suppressed": number | "Infinity" | "-Infinity" | "NaN" }
export const AnomaliesGetAnomaliesForProject200 = Schema.Struct({ "grain": Schema.Literals(["hour", "day"]), "from": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "to": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "baselineFrom": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "seriesScanned": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "health": Schema.Array(Schema.Struct({ "metric": Schema.String, "label": Schema.String, "unit": Schema.Literals(["count", "percent", "ms", "score"]), "current": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "expected": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "status": Schema.Literals(["normal", "anomalous", "learning"]), "chart": Schema.Struct({ "from": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "bucketSeconds": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "values": Schema.Array(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "expected": Schema.Array(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "lower": Schema.Array(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "upper": Schema.Array(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) }) })), "incidents": Schema.Array(Schema.Struct({ "id": Schema.String, "kind": Schema.Literals(["anomaly", "shift", "gap"]), "severity": Schema.Literals(["critical", "high", "medium", "low"]), "title": Schema.String, "start": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "end": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "ongoing": Schema.Boolean, "findings": Schema.Array(Schema.Struct({ "id": Schema.String, "metric": Schema.String, "label": Schema.String, "unit": Schema.Literals(["count", "percent", "ms", "score"]), "polarity": Schema.Literals([1, -1]), "dimension": Schema.Union([Schema.String, Schema.Null]), "value": Schema.Union([Schema.String, Schema.Null]), "direction": Schema.Literals(["increase", "decrease"]), "kind": Schema.Literals(["anomaly", "shift", "gap"]), "start": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "end": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "ongoing": Schema.Boolean, "observed": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "expected": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "change": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "peakScore": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "contribution": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "chart": Schema.Struct({ "from": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "bucketSeconds": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "values": Schema.Array(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "expected": Schema.Array(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "lower": Schema.Array(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "upper": Schema.Array(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) }) })), "absorbed": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "causes": Schema.Array(Schema.Struct({ "type": Schema.Literals(["deploy", "feature_flag", "event_marker", "new_error"]), "title": Schema.String, "detail": Schema.Union([Schema.String, Schema.Null]), "at": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "reference": Schema.Union([Schema.String, Schema.Null]) })) })), "suppressed": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })
export type AnomaliesGetAnomaliesForProject401 = UnauthorizedErrorEncoded
export const AnomaliesGetAnomaliesForProject401 = UnauthorizedErrorEncoded
export type AnomaliesGetAnomaliesForProject403 = ForbiddenErrorEncoded
export const AnomaliesGetAnomaliesForProject403 = ForbiddenErrorEncoded
export type AnomaliesGetAnomaliesForProject404 = NotFoundErrorEncoded
export const AnomaliesGetAnomaliesForProject404 = NotFoundErrorEncoded
export type AnomaliesGetAnomaliesForProject500 = InternalServerErrorEncoded | EffectDrizzleQueryErrorEncoded
export const AnomaliesGetAnomaliesForProject500 = Schema.Union([InternalServerErrorEncoded, EffectDrizzleQueryErrorEncoded])
export type ChartsListChartsParams = { readonly "dashboardId"?: "null" | string | null, readonly "chartId"?: string | null }
export const ChartsListChartsParams = Schema.Struct({ "dashboardId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Literal("null"), Schema.String]), Schema.Null])), "chartId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type ChartsListCharts200 = ReadonlyArray<{ readonly "id": string, readonly "projectId": string, readonly "dashboardId": string, readonly "name": string, readonly "description": string | null, readonly "chartType": "widget" | "line" | "area" | "bar" | "pie" | "map" | "list" | "heatmap" | "radar" | "scatter", readonly "queryConfig": { readonly "groupLimit"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "visualOptions"?: { readonly "colors"?: ReadonlyArray<string> | null, readonly "pie"?: { readonly "style"?: "pie" | "donut" | null, readonly "showLegend"?: boolean | null, readonly "showTotal"?: boolean | null, readonly "showLabels"?: boolean | null, readonly "totalDisplayMode"?: "sum" | "count" | null, readonly "drilldown"?: { readonly "enabled"?: boolean | null, readonly "splitPattern"?: string | null } | null } | null, readonly "bar"?: { readonly "logarithmic"?: boolean | null, readonly "stacked"?: boolean | null, readonly "orientation"?: "vertical" | "horizontal" | null } | null, readonly "line"?: { readonly "logarithmic"?: boolean | null, readonly "lineType"?: "monotone" | "linear" | "step" | null, readonly "showDots"?: boolean | null } | null, readonly "widget"?: { readonly "showTrend"?: boolean | null, readonly "displayMode"?: "default" | "compact" | null, readonly "valueFormat"?: "number" | "percent" | "duration_ms" | null } | null, readonly "list"?: { readonly "selectedTabIndex"?: number | null, readonly "splitPattern"?: string | null, readonly "multiMetric"?: boolean | null } | null, readonly "heatmap"?: { readonly "showLegend"?: boolean | null } | null, readonly "radar"?: { readonly "logarithmic"?: boolean | null, readonly "showDots"?: boolean | null, readonly "fillOpacity"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "showLegend"?: boolean | null, readonly "gridType"?: "polygon" | "circle" | null } | null, readonly "scatter"?: { readonly "logarithmic"?: boolean | null, readonly "pointSize"?: "small" | "medium" | "large" | null, readonly "showLegend"?: boolean | null } | null } | null, readonly "markerCollections"?: ReadonlyArray<{ readonly "collectionId": string, readonly "enabled"?: boolean | null, readonly "display"?: { readonly "icon"?: string | null | null, readonly "emoji"?: string | null | null, readonly "color"?: string | null | null } | null }> | null } | null, readonly "query": { readonly "type": "flow", readonly "nodes": ReadonlyArray<{ readonly "id": string, readonly "type"?: string, readonly "data"?: { readonly [x: string]: Schema.Json }, readonly "position"?: { readonly "x"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "y"?: number | "Infinity" | "-Infinity" | "NaN" | null } }>, readonly "edges": ReadonlyArray<{ readonly "id": string, readonly "source": string, readonly "target": string }> }, readonly "position": { readonly "x": number | "Infinity" | "-Infinity" | "NaN", readonly "y": number | "Infinity" | "-Infinity" | "NaN", readonly "w": number | "Infinity" | "-Infinity" | "NaN", readonly "h": number | "Infinity" | "-Infinity" | "NaN" } | null, readonly "createdAt": string | string, readonly "updatedAt": string | string }>
export const ChartsListCharts200 = Schema.Array(Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "dashboardId": Schema.String, "name": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "chartType": Schema.Literals(["widget", "line", "area", "bar", "pie", "map", "list", "heatmap", "radar", "scatter"]), "queryConfig": Schema.Union([Schema.Struct({ "groupLimit": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "visualOptions": Schema.optionalKey(Schema.Union([Schema.Struct({ "colors": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "pie": Schema.optionalKey(Schema.Union([Schema.Struct({ "style": Schema.optionalKey(Schema.Union([Schema.Literals(["pie", "donut"]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showTotal": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showLabels": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "totalDisplayMode": Schema.optionalKey(Schema.Union([Schema.Literals(["sum", "count"]), Schema.Null])), "drilldown": Schema.optionalKey(Schema.Union([Schema.Struct({ "enabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])) }), Schema.Null])), "bar": Schema.optionalKey(Schema.Union([Schema.Struct({ "logarithmic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "stacked": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "orientation": Schema.optionalKey(Schema.Union([Schema.Literals(["vertical", "horizontal"]), Schema.Null])) }), Schema.Null])), "line": Schema.optionalKey(Schema.Union([Schema.Struct({ "logarithmic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "lineType": Schema.optionalKey(Schema.Union([Schema.Literals(["monotone", "linear", "step"]), Schema.Null])), "showDots": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "widget": Schema.optionalKey(Schema.Union([Schema.Struct({ "showTrend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "displayMode": Schema.optionalKey(Schema.Union([Schema.Literals(["default", "compact"]), Schema.Null])), "valueFormat": Schema.optionalKey(Schema.Union([Schema.Literals(["number", "percent", "duration_ms"]), Schema.Null])) }), Schema.Null])), "list": Schema.optionalKey(Schema.Union([Schema.Struct({ "selectedTabIndex": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "multiMetric": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "heatmap": Schema.optionalKey(Schema.Union([Schema.Struct({ "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "radar": Schema.optionalKey(Schema.Union([Schema.Struct({ "logarithmic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showDots": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "fillOpacity": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "gridType": Schema.optionalKey(Schema.Union([Schema.Literals(["polygon", "circle"]), Schema.Null])) }), Schema.Null])), "scatter": Schema.optionalKey(Schema.Union([Schema.Struct({ "logarithmic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "pointSize": Schema.optionalKey(Schema.Union([Schema.Literals(["small", "medium", "large"]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])) }), Schema.Null])), "markerCollections": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "collectionId": Schema.String, "enabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "display": Schema.optionalKey(Schema.Union([Schema.Struct({ "icon": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "emoji": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])) }), Schema.Null])) })), Schema.Null])) }), Schema.Null]), "query": Schema.Struct({ "type": Schema.Literal("flow"), "nodes": Schema.Array(Schema.Struct({ "id": Schema.String, "type": Schema.optionalKey(Schema.String), "data": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))), "position": Schema.optionalKey(Schema.Struct({ "x": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "y": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) })) })), "edges": Schema.Array(Schema.Struct({ "id": Schema.String, "source": Schema.String, "target": Schema.String })) }), "position": Schema.Union([Schema.Struct({ "x": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "y": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "w": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "h": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }), Schema.Null]), "createdAt": Schema.Union([Schema.String, Schema.String]), "updatedAt": Schema.Union([Schema.String, Schema.String]) }))
export type ChartsListCharts400 = ChartValidationErrorEncoded
export const ChartsListCharts400 = ChartValidationErrorEncoded
export type ChartsListCharts401 = UnauthorizedErrorEncoded
export const ChartsListCharts401 = UnauthorizedErrorEncoded
export type ChartsListCharts403 = ForbiddenErrorEncoded
export const ChartsListCharts403 = ForbiddenErrorEncoded
export type ChartsListCharts404 = NotFoundErrorEncoded
export const ChartsListCharts404 = NotFoundErrorEncoded
export type ChartsListCharts409 = ChartConflictErrorEncoded
export const ChartsListCharts409 = ChartConflictErrorEncoded
export type ChartsListCharts500 = InternalServerErrorEncoded
export const ChartsListCharts500 = InternalServerErrorEncoded
export type ChartsCreateChartRequestJson = { readonly "dashboardId"?: string | null | null, readonly "name": string, readonly "description"?: string | null | null, readonly "chartType": "widget" | "line" | "area" | "bar" | "pie" | "map" | "list" | "heatmap" | "radar" | "scatter", readonly "queryConfig"?: { readonly "groupLimit"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "visualOptions"?: { readonly "colors"?: ReadonlyArray<string> | null, readonly "pie"?: { readonly "style"?: "pie" | "donut" | null, readonly "showLegend"?: boolean | null, readonly "showTotal"?: boolean | null, readonly "showLabels"?: boolean | null, readonly "totalDisplayMode"?: "sum" | "count" | null, readonly "drilldown"?: { readonly "enabled"?: boolean | null, readonly "splitPattern"?: string | null } | null } | null, readonly "bar"?: { readonly "logarithmic"?: boolean | null, readonly "stacked"?: boolean | null, readonly "orientation"?: "vertical" | "horizontal" | null } | null, readonly "line"?: { readonly "logarithmic"?: boolean | null, readonly "lineType"?: "monotone" | "linear" | "step" | null, readonly "showDots"?: boolean | null } | null, readonly "widget"?: { readonly "showTrend"?: boolean | null, readonly "displayMode"?: "default" | "compact" | null, readonly "valueFormat"?: "number" | "percent" | "duration_ms" | null } | null, readonly "list"?: { readonly "selectedTabIndex"?: number | null, readonly "splitPattern"?: string | null, readonly "multiMetric"?: boolean | null } | null, readonly "heatmap"?: { readonly "showLegend"?: boolean | null } | null, readonly "radar"?: { readonly "logarithmic"?: boolean | null, readonly "showDots"?: boolean | null, readonly "fillOpacity"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "showLegend"?: boolean | null, readonly "gridType"?: "polygon" | "circle" | null } | null, readonly "scatter"?: { readonly "logarithmic"?: boolean | null, readonly "pointSize"?: "small" | "medium" | "large" | null, readonly "showLegend"?: boolean | null } | null } | null, readonly "markerCollections"?: ReadonlyArray<{ readonly "collectionId": string, readonly "enabled"?: boolean | null, readonly "display"?: { readonly "icon"?: string | null | null, readonly "emoji"?: string | null | null, readonly "color"?: string | null | null } | null }> | null } | null, readonly "query": { readonly "type": "flow", readonly "nodes": ReadonlyArray<{ readonly "id": string, readonly "type"?: string, readonly "data"?: { readonly [x: string]: Schema.Json }, readonly "position"?: { readonly "x"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "y"?: number | "Infinity" | "-Infinity" | "NaN" | null } }>, readonly "edges": ReadonlyArray<{ readonly "id": string, readonly "source": string, readonly "target": string }> }, readonly "position"?: { readonly "x": number | "Infinity" | "-Infinity" | "NaN", readonly "y": number | "Infinity" | "-Infinity" | "NaN", readonly "w": number | "Infinity" | "-Infinity" | "NaN", readonly "h": number | "Infinity" | "-Infinity" | "NaN" } | null }
export const ChartsCreateChartRequestJson = Schema.Struct({ "dashboardId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "name": Schema.String, "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "chartType": Schema.Literals(["widget", "line", "area", "bar", "pie", "map", "list", "heatmap", "radar", "scatter"]), "queryConfig": Schema.optionalKey(Schema.Union([Schema.Struct({ "groupLimit": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "visualOptions": Schema.optionalKey(Schema.Union([Schema.Struct({ "colors": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "pie": Schema.optionalKey(Schema.Union([Schema.Struct({ "style": Schema.optionalKey(Schema.Union([Schema.Literals(["pie", "donut"]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showTotal": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showLabels": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "totalDisplayMode": Schema.optionalKey(Schema.Union([Schema.Literals(["sum", "count"]), Schema.Null])), "drilldown": Schema.optionalKey(Schema.Union([Schema.Struct({ "enabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])) }), Schema.Null])), "bar": Schema.optionalKey(Schema.Union([Schema.Struct({ "logarithmic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "stacked": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "orientation": Schema.optionalKey(Schema.Union([Schema.Literals(["vertical", "horizontal"]), Schema.Null])) }), Schema.Null])), "line": Schema.optionalKey(Schema.Union([Schema.Struct({ "logarithmic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "lineType": Schema.optionalKey(Schema.Union([Schema.Literals(["monotone", "linear", "step"]), Schema.Null])), "showDots": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "widget": Schema.optionalKey(Schema.Union([Schema.Struct({ "showTrend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "displayMode": Schema.optionalKey(Schema.Union([Schema.Literals(["default", "compact"]), Schema.Null])), "valueFormat": Schema.optionalKey(Schema.Union([Schema.Literals(["number", "percent", "duration_ms"]), Schema.Null])) }), Schema.Null])), "list": Schema.optionalKey(Schema.Union([Schema.Struct({ "selectedTabIndex": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "multiMetric": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "heatmap": Schema.optionalKey(Schema.Union([Schema.Struct({ "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "radar": Schema.optionalKey(Schema.Union([Schema.Struct({ "logarithmic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showDots": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "fillOpacity": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "gridType": Schema.optionalKey(Schema.Union([Schema.Literals(["polygon", "circle"]), Schema.Null])) }), Schema.Null])), "scatter": Schema.optionalKey(Schema.Union([Schema.Struct({ "logarithmic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "pointSize": Schema.optionalKey(Schema.Union([Schema.Literals(["small", "medium", "large"]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])) }), Schema.Null])), "markerCollections": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "collectionId": Schema.String, "enabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "display": Schema.optionalKey(Schema.Union([Schema.Struct({ "icon": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "emoji": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])) }), Schema.Null])) })), Schema.Null])) }), Schema.Null])), "query": Schema.Struct({ "type": Schema.Literal("flow"), "nodes": Schema.Array(Schema.Struct({ "id": Schema.String, "type": Schema.optionalKey(Schema.String), "data": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))), "position": Schema.optionalKey(Schema.Struct({ "x": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "y": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) })) })), "edges": Schema.Array(Schema.Struct({ "id": Schema.String, "source": Schema.String, "target": Schema.String })) }), "position": Schema.optionalKey(Schema.Union([Schema.Struct({ "x": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "y": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "w": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "h": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }), Schema.Null])) })
export type ChartsCreateChart200 = { readonly "id": string }
export const ChartsCreateChart200 = Schema.Struct({ "id": Schema.String })
export type ChartsCreateChart400 = ChartValidationErrorEncoded
export const ChartsCreateChart400 = ChartValidationErrorEncoded
export type ChartsCreateChart401 = UnauthorizedErrorEncoded
export const ChartsCreateChart401 = UnauthorizedErrorEncoded
export type ChartsCreateChart403 = ForbiddenErrorEncoded
export const ChartsCreateChart403 = ForbiddenErrorEncoded
export type ChartsCreateChart404 = NotFoundErrorEncoded
export const ChartsCreateChart404 = NotFoundErrorEncoded
export type ChartsCreateChart409 = ChartConflictErrorEncoded
export const ChartsCreateChart409 = ChartConflictErrorEncoded
export type ChartsCreateChart500 = InternalServerErrorEncoded
export const ChartsCreateChart500 = InternalServerErrorEncoded
export type ChartsDeleteChart400 = ChartValidationErrorEncoded
export const ChartsDeleteChart400 = ChartValidationErrorEncoded
export type ChartsDeleteChart401 = UnauthorizedErrorEncoded
export const ChartsDeleteChart401 = UnauthorizedErrorEncoded
export type ChartsDeleteChart403 = ForbiddenErrorEncoded
export const ChartsDeleteChart403 = ForbiddenErrorEncoded
export type ChartsDeleteChart404 = NotFoundErrorEncoded
export const ChartsDeleteChart404 = NotFoundErrorEncoded
export type ChartsDeleteChart409 = ChartConflictErrorEncoded
export const ChartsDeleteChart409 = ChartConflictErrorEncoded
export type ChartsDeleteChart500 = InternalServerErrorEncoded
export const ChartsDeleteChart500 = InternalServerErrorEncoded
export type ChartsUpdateChartRequestJson = { readonly "dashboardId"?: string | null | null, readonly "name"?: string | null, readonly "description"?: string | null | null, readonly "chartType"?: "widget" | "line" | "area" | "bar" | "pie" | "map" | "list" | "heatmap" | "radar" | "scatter" | null, readonly "queryConfig"?: { readonly "groupLimit"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "visualOptions"?: { readonly "colors"?: ReadonlyArray<string> | null, readonly "pie"?: { readonly "style"?: "pie" | "donut" | null, readonly "showLegend"?: boolean | null, readonly "showTotal"?: boolean | null, readonly "showLabels"?: boolean | null, readonly "totalDisplayMode"?: "sum" | "count" | null, readonly "drilldown"?: { readonly "enabled"?: boolean | null, readonly "splitPattern"?: string | null } | null } | null, readonly "bar"?: { readonly "logarithmic"?: boolean | null, readonly "stacked"?: boolean | null, readonly "orientation"?: "vertical" | "horizontal" | null } | null, readonly "line"?: { readonly "logarithmic"?: boolean | null, readonly "lineType"?: "monotone" | "linear" | "step" | null, readonly "showDots"?: boolean | null } | null, readonly "widget"?: { readonly "showTrend"?: boolean | null, readonly "displayMode"?: "default" | "compact" | null, readonly "valueFormat"?: "number" | "percent" | "duration_ms" | null } | null, readonly "list"?: { readonly "selectedTabIndex"?: number | null, readonly "splitPattern"?: string | null, readonly "multiMetric"?: boolean | null } | null, readonly "heatmap"?: { readonly "showLegend"?: boolean | null } | null, readonly "radar"?: { readonly "logarithmic"?: boolean | null, readonly "showDots"?: boolean | null, readonly "fillOpacity"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "showLegend"?: boolean | null, readonly "gridType"?: "polygon" | "circle" | null } | null, readonly "scatter"?: { readonly "logarithmic"?: boolean | null, readonly "pointSize"?: "small" | "medium" | "large" | null, readonly "showLegend"?: boolean | null } | null } | null, readonly "markerCollections"?: ReadonlyArray<{ readonly "collectionId": string, readonly "enabled"?: boolean | null, readonly "display"?: { readonly "icon"?: string | null | null, readonly "emoji"?: string | null | null, readonly "color"?: string | null | null } | null }> | null } | null, readonly "query"?: { readonly "type": "flow", readonly "nodes": ReadonlyArray<{ readonly "id": string, readonly "type"?: string, readonly "data"?: { readonly [x: string]: Schema.Json }, readonly "position"?: { readonly "x"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "y"?: number | "Infinity" | "-Infinity" | "NaN" | null } }>, readonly "edges": ReadonlyArray<{ readonly "id": string, readonly "source": string, readonly "target": string }> } | null, readonly "position"?: { readonly "x": number | "Infinity" | "-Infinity" | "NaN", readonly "y": number | "Infinity" | "-Infinity" | "NaN", readonly "w": number | "Infinity" | "-Infinity" | "NaN", readonly "h": number | "Infinity" | "-Infinity" | "NaN" } | null, readonly "expectedUpdatedAt"?: string | null }
export const ChartsUpdateChartRequestJson = Schema.Struct({ "dashboardId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "name": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "chartType": Schema.optionalKey(Schema.Union([Schema.Literals(["widget", "line", "area", "bar", "pie", "map", "list", "heatmap", "radar", "scatter"]), Schema.Null])), "queryConfig": Schema.optionalKey(Schema.Union([Schema.Struct({ "groupLimit": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "visualOptions": Schema.optionalKey(Schema.Union([Schema.Struct({ "colors": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "pie": Schema.optionalKey(Schema.Union([Schema.Struct({ "style": Schema.optionalKey(Schema.Union([Schema.Literals(["pie", "donut"]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showTotal": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showLabels": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "totalDisplayMode": Schema.optionalKey(Schema.Union([Schema.Literals(["sum", "count"]), Schema.Null])), "drilldown": Schema.optionalKey(Schema.Union([Schema.Struct({ "enabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])) }), Schema.Null])), "bar": Schema.optionalKey(Schema.Union([Schema.Struct({ "logarithmic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "stacked": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "orientation": Schema.optionalKey(Schema.Union([Schema.Literals(["vertical", "horizontal"]), Schema.Null])) }), Schema.Null])), "line": Schema.optionalKey(Schema.Union([Schema.Struct({ "logarithmic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "lineType": Schema.optionalKey(Schema.Union([Schema.Literals(["monotone", "linear", "step"]), Schema.Null])), "showDots": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "widget": Schema.optionalKey(Schema.Union([Schema.Struct({ "showTrend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "displayMode": Schema.optionalKey(Schema.Union([Schema.Literals(["default", "compact"]), Schema.Null])), "valueFormat": Schema.optionalKey(Schema.Union([Schema.Literals(["number", "percent", "duration_ms"]), Schema.Null])) }), Schema.Null])), "list": Schema.optionalKey(Schema.Union([Schema.Struct({ "selectedTabIndex": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "multiMetric": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "heatmap": Schema.optionalKey(Schema.Union([Schema.Struct({ "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "radar": Schema.optionalKey(Schema.Union([Schema.Struct({ "logarithmic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showDots": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "fillOpacity": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "gridType": Schema.optionalKey(Schema.Union([Schema.Literals(["polygon", "circle"]), Schema.Null])) }), Schema.Null])), "scatter": Schema.optionalKey(Schema.Union([Schema.Struct({ "logarithmic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "pointSize": Schema.optionalKey(Schema.Union([Schema.Literals(["small", "medium", "large"]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])) }), Schema.Null])), "markerCollections": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "collectionId": Schema.String, "enabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "display": Schema.optionalKey(Schema.Union([Schema.Struct({ "icon": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "emoji": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])) }), Schema.Null])) })), Schema.Null])) }), Schema.Null])), "query": Schema.optionalKey(Schema.Union([Schema.Struct({ "type": Schema.Literal("flow"), "nodes": Schema.Array(Schema.Struct({ "id": Schema.String, "type": Schema.optionalKey(Schema.String), "data": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))), "position": Schema.optionalKey(Schema.Struct({ "x": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "y": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) })) })), "edges": Schema.Array(Schema.Struct({ "id": Schema.String, "source": Schema.String, "target": Schema.String })) }), Schema.Null])), "position": Schema.optionalKey(Schema.Union([Schema.Struct({ "x": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "y": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "w": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "h": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }), Schema.Null])), "expectedUpdatedAt": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type ChartsUpdateChart400 = ChartValidationErrorEncoded
export const ChartsUpdateChart400 = ChartValidationErrorEncoded
export type ChartsUpdateChart401 = UnauthorizedErrorEncoded
export const ChartsUpdateChart401 = UnauthorizedErrorEncoded
export type ChartsUpdateChart403 = ForbiddenErrorEncoded
export const ChartsUpdateChart403 = ForbiddenErrorEncoded
export type ChartsUpdateChart404 = NotFoundErrorEncoded
export const ChartsUpdateChart404 = NotFoundErrorEncoded
export type ChartsUpdateChart409 = ChartConflictErrorEncoded
export const ChartsUpdateChart409 = ChartConflictErrorEncoded
export type ChartsUpdateChart500 = InternalServerErrorEncoded
export const ChartsUpdateChart500 = InternalServerErrorEncoded
export type CommentsListCommentsParams = { readonly "targetType": "error_issue" | "session_replay", readonly "targetId": string }
export const CommentsListCommentsParams = Schema.Struct({ "targetType": Schema.Literals(["error_issue", "session_replay"]), "targetId": Schema.String.check(Schema.isMinLength(1).annotate({ "expected": "a value with a length of at least 1" })) })
export type CommentsListComments200 = ReadonlyArray<CommentEncoded>
export const CommentsListComments200 = Schema.Array(CommentEncoded)
export type CommentsListComments400 = CommentValidationErrorEncoded
export const CommentsListComments400 = CommentValidationErrorEncoded
export type CommentsListComments401 = UnauthorizedErrorEncoded
export const CommentsListComments401 = UnauthorizedErrorEncoded
export type CommentsListComments403 = ForbiddenErrorEncoded
export const CommentsListComments403 = ForbiddenErrorEncoded
export type CommentsListComments404 = NotFoundErrorEncoded
export const CommentsListComments404 = NotFoundErrorEncoded
export type CommentsListComments500 = InternalServerErrorEncoded | CommentServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const CommentsListComments500 = Schema.Union([InternalServerErrorEncoded, CommentServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type CommentsAddCommentRequestJson = { readonly "targetType": "error_issue" | "session_replay", readonly "targetId": string, readonly "content": string, readonly "replyToId"?: string | null | null, readonly "anchorAt"?: string | null | null }
export const CommentsAddCommentRequestJson = Schema.Struct({ "targetType": Schema.Literals(["error_issue", "session_replay"]), "targetId": Schema.String.check(Schema.isMinLength(1).annotate({ "expected": "a value with a length of at least 1" })), "content": Schema.String, "replyToId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "anchorAt": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])) })
export type CommentsAddComment200 = CommentEncoded
export const CommentsAddComment200 = CommentEncoded
export type CommentsAddComment400 = CommentValidationErrorEncoded
export const CommentsAddComment400 = CommentValidationErrorEncoded
export type CommentsAddComment401 = UnauthorizedErrorEncoded
export const CommentsAddComment401 = UnauthorizedErrorEncoded
export type CommentsAddComment403 = ForbiddenErrorEncoded
export const CommentsAddComment403 = ForbiddenErrorEncoded
export type CommentsAddComment404 = NotFoundErrorEncoded
export const CommentsAddComment404 = NotFoundErrorEncoded
export type CommentsAddComment500 = InternalServerErrorEncoded | CommentServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const CommentsAddComment500 = Schema.Union([InternalServerErrorEncoded, CommentServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type CommentsDeleteComment400 = CommentValidationErrorEncoded
export const CommentsDeleteComment400 = CommentValidationErrorEncoded
export type CommentsDeleteComment401 = UnauthorizedErrorEncoded
export const CommentsDeleteComment401 = UnauthorizedErrorEncoded
export type CommentsDeleteComment403 = ForbiddenErrorEncoded
export const CommentsDeleteComment403 = ForbiddenErrorEncoded
export type CommentsDeleteComment404 = NotFoundErrorEncoded
export const CommentsDeleteComment404 = NotFoundErrorEncoded
export type CommentsDeleteComment500 = InternalServerErrorEncoded | CommentServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const CommentsDeleteComment500 = Schema.Union([InternalServerErrorEncoded, CommentServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type CommentsEditCommentRequestJson = { readonly "content": string }
export const CommentsEditCommentRequestJson = Schema.Struct({ "content": Schema.String })
export type CommentsEditComment200 = CommentEncoded
export const CommentsEditComment200 = CommentEncoded
export type CommentsEditComment400 = CommentValidationErrorEncoded
export const CommentsEditComment400 = CommentValidationErrorEncoded
export type CommentsEditComment401 = UnauthorizedErrorEncoded
export const CommentsEditComment401 = UnauthorizedErrorEncoded
export type CommentsEditComment403 = ForbiddenErrorEncoded
export const CommentsEditComment403 = ForbiddenErrorEncoded
export type CommentsEditComment404 = NotFoundErrorEncoded
export const CommentsEditComment404 = NotFoundErrorEncoded
export type CommentsEditComment500 = InternalServerErrorEncoded | CommentServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const CommentsEditComment500 = Schema.Union([InternalServerErrorEncoded, CommentServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type CommentsListCommentRevisions200 = ReadonlyArray<CommentRevisionEncoded>
export const CommentsListCommentRevisions200 = Schema.Array(CommentRevisionEncoded)
export type CommentsListCommentRevisions400 = CommentValidationErrorEncoded
export const CommentsListCommentRevisions400 = CommentValidationErrorEncoded
export type CommentsListCommentRevisions401 = UnauthorizedErrorEncoded
export const CommentsListCommentRevisions401 = UnauthorizedErrorEncoded
export type CommentsListCommentRevisions403 = ForbiddenErrorEncoded
export const CommentsListCommentRevisions403 = ForbiddenErrorEncoded
export type CommentsListCommentRevisions404 = NotFoundErrorEncoded
export const CommentsListCommentRevisions404 = NotFoundErrorEncoded
export type CommentsListCommentRevisions500 = InternalServerErrorEncoded | CommentServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const CommentsListCommentRevisions500 = Schema.Union([InternalServerErrorEncoded, CommentServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type CommentsToggleCommentPinRequestJson = { readonly "pinned": boolean }
export const CommentsToggleCommentPinRequestJson = Schema.Struct({ "pinned": Schema.Boolean })
export type CommentsToggleCommentPin200 = CommentEncoded
export const CommentsToggleCommentPin200 = CommentEncoded
export type CommentsToggleCommentPin400 = CommentValidationErrorEncoded
export const CommentsToggleCommentPin400 = CommentValidationErrorEncoded
export type CommentsToggleCommentPin401 = UnauthorizedErrorEncoded
export const CommentsToggleCommentPin401 = UnauthorizedErrorEncoded
export type CommentsToggleCommentPin403 = ForbiddenErrorEncoded
export const CommentsToggleCommentPin403 = ForbiddenErrorEncoded
export type CommentsToggleCommentPin404 = NotFoundErrorEncoded
export const CommentsToggleCommentPin404 = NotFoundErrorEncoded
export type CommentsToggleCommentPin500 = InternalServerErrorEncoded | CommentServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const CommentsToggleCommentPin500 = Schema.Union([InternalServerErrorEncoded, CommentServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type CommentsListCommentMentionCandidates200 = ReadonlyArray<CommentMentionCandidateEncoded>
export const CommentsListCommentMentionCandidates200 = Schema.Array(CommentMentionCandidateEncoded)
export type CommentsListCommentMentionCandidates400 = CommentValidationErrorEncoded
export const CommentsListCommentMentionCandidates400 = CommentValidationErrorEncoded
export type CommentsListCommentMentionCandidates401 = UnauthorizedErrorEncoded
export const CommentsListCommentMentionCandidates401 = UnauthorizedErrorEncoded
export type CommentsListCommentMentionCandidates403 = ForbiddenErrorEncoded
export const CommentsListCommentMentionCandidates403 = ForbiddenErrorEncoded
export type CommentsListCommentMentionCandidates404 = NotFoundErrorEncoded
export const CommentsListCommentMentionCandidates404 = NotFoundErrorEncoded
export type CommentsListCommentMentionCandidates500 = InternalServerErrorEncoded | CommentServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const CommentsListCommentMentionCandidates500 = Schema.Union([InternalServerErrorEncoded, CommentServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type CommentsSearchCommentReferencesParams = { readonly "query": string }
export const CommentsSearchCommentReferencesParams = Schema.Struct({ "query": Schema.String })
export type CommentsSearchCommentReferences200 = ReadonlyArray<CommentReferenceResultEncoded>
export const CommentsSearchCommentReferences200 = Schema.Array(CommentReferenceResultEncoded)
export type CommentsSearchCommentReferences400 = CommentValidationErrorEncoded
export const CommentsSearchCommentReferences400 = CommentValidationErrorEncoded
export type CommentsSearchCommentReferences401 = UnauthorizedErrorEncoded
export const CommentsSearchCommentReferences401 = UnauthorizedErrorEncoded
export type CommentsSearchCommentReferences403 = ForbiddenErrorEncoded
export const CommentsSearchCommentReferences403 = ForbiddenErrorEncoded
export type CommentsSearchCommentReferences404 = NotFoundErrorEncoded
export const CommentsSearchCommentReferences404 = NotFoundErrorEncoded
export type CommentsSearchCommentReferences500 = InternalServerErrorEncoded | CommentServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const CommentsSearchCommentReferences500 = Schema.Union([InternalServerErrorEncoded, CommentServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type DashboardsListDashboards200 = ReadonlyArray<DashboardRecordEncoded>
export const DashboardsListDashboards200 = Schema.Array(DashboardRecordEncoded)
export type DashboardsListDashboards400 = DashboardValidationErrorEncoded
export const DashboardsListDashboards400 = DashboardValidationErrorEncoded
export type DashboardsListDashboards401 = UnauthorizedErrorEncoded
export const DashboardsListDashboards401 = UnauthorizedErrorEncoded
export type DashboardsListDashboards403 = ForbiddenErrorEncoded
export const DashboardsListDashboards403 = ForbiddenErrorEncoded
export type DashboardsListDashboards404 = NotFoundErrorEncoded
export const DashboardsListDashboards404 = NotFoundErrorEncoded
export type DashboardsListDashboards500 = InternalServerErrorEncoded
export const DashboardsListDashboards500 = InternalServerErrorEncoded
export type DashboardsCreateDashboardRequestJson = { readonly "name": string, readonly "description"?: string | null | null, readonly "isPublic"?: boolean | null, readonly "position"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "markerOverrides"?: { readonly "mode": "inherit" | "replace" | "add" | "disable", readonly "collections"?: ReadonlyArray<{ readonly "collectionId": string, readonly "enabled"?: boolean | null, readonly "display"?: { readonly "icon"?: string | null | null, readonly "emoji"?: string | null | null, readonly "color"?: string | null | null } | null }> | null, readonly "hiddenCollectionIds"?: ReadonlyArray<string> | null } | null | null }
export const DashboardsCreateDashboardRequestJson = Schema.Struct({ "name": Schema.String, "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "isPublic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "position": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "markerOverrides": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Struct({ "mode": Schema.Literals(["inherit", "replace", "add", "disable"]), "collections": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "collectionId": Schema.String, "enabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "display": Schema.optionalKey(Schema.Union([Schema.Struct({ "icon": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "emoji": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])) }), Schema.Null])) })), Schema.Null])), "hiddenCollectionIds": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])) }), Schema.Null]), Schema.Null])) })
export type DashboardsCreateDashboard200 = DashboardRecordEncoded
export const DashboardsCreateDashboard200 = DashboardRecordEncoded
export type DashboardsCreateDashboard400 = DashboardValidationErrorEncoded
export const DashboardsCreateDashboard400 = DashboardValidationErrorEncoded
export type DashboardsCreateDashboard401 = UnauthorizedErrorEncoded
export const DashboardsCreateDashboard401 = UnauthorizedErrorEncoded
export type DashboardsCreateDashboard403 = ForbiddenErrorEncoded
export const DashboardsCreateDashboard403 = ForbiddenErrorEncoded
export type DashboardsCreateDashboard404 = NotFoundErrorEncoded
export const DashboardsCreateDashboard404 = NotFoundErrorEncoded
export type DashboardsCreateDashboard500 = InternalServerErrorEncoded
export const DashboardsCreateDashboard500 = InternalServerErrorEncoded
export type DashboardsReorderDashboardsRequestJson = { readonly "dashboards": ReadonlyArray<{ readonly "id": string, readonly "position": number | "Infinity" | "-Infinity" | "NaN" }> }
export const DashboardsReorderDashboardsRequestJson = Schema.Struct({ "dashboards": Schema.Array(Schema.Struct({ "id": Schema.String, "position": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })) })
export type DashboardsReorderDashboards400 = DashboardValidationErrorEncoded
export const DashboardsReorderDashboards400 = DashboardValidationErrorEncoded
export type DashboardsReorderDashboards401 = UnauthorizedErrorEncoded
export const DashboardsReorderDashboards401 = UnauthorizedErrorEncoded
export type DashboardsReorderDashboards403 = ForbiddenErrorEncoded
export const DashboardsReorderDashboards403 = ForbiddenErrorEncoded
export type DashboardsReorderDashboards404 = NotFoundErrorEncoded
export const DashboardsReorderDashboards404 = NotFoundErrorEncoded
export type DashboardsReorderDashboards500 = InternalServerErrorEncoded
export const DashboardsReorderDashboards500 = InternalServerErrorEncoded
export type DashboardsDuplicateDashboard200 = DashboardRecordEncoded
export const DashboardsDuplicateDashboard200 = DashboardRecordEncoded
export type DashboardsDuplicateDashboard400 = DashboardValidationErrorEncoded
export const DashboardsDuplicateDashboard400 = DashboardValidationErrorEncoded
export type DashboardsDuplicateDashboard401 = UnauthorizedErrorEncoded
export const DashboardsDuplicateDashboard401 = UnauthorizedErrorEncoded
export type DashboardsDuplicateDashboard403 = ForbiddenErrorEncoded
export const DashboardsDuplicateDashboard403 = ForbiddenErrorEncoded
export type DashboardsDuplicateDashboard404 = NotFoundErrorEncoded
export const DashboardsDuplicateDashboard404 = NotFoundErrorEncoded
export type DashboardsDuplicateDashboard500 = InternalServerErrorEncoded
export const DashboardsDuplicateDashboard500 = InternalServerErrorEncoded
export type DashboardsCopyDashboardRequestJson = { readonly "targetProjectId": string }
export const DashboardsCopyDashboardRequestJson = Schema.Struct({ "targetProjectId": Schema.String })
export type DashboardsCopyDashboard200 = DashboardRecordEncoded
export const DashboardsCopyDashboard200 = DashboardRecordEncoded
export type DashboardsCopyDashboard400 = DashboardValidationErrorEncoded
export const DashboardsCopyDashboard400 = DashboardValidationErrorEncoded
export type DashboardsCopyDashboard401 = UnauthorizedErrorEncoded
export const DashboardsCopyDashboard401 = UnauthorizedErrorEncoded
export type DashboardsCopyDashboard403 = ForbiddenErrorEncoded
export const DashboardsCopyDashboard403 = ForbiddenErrorEncoded
export type DashboardsCopyDashboard404 = NotFoundErrorEncoded
export const DashboardsCopyDashboard404 = NotFoundErrorEncoded
export type DashboardsCopyDashboard500 = InternalServerErrorEncoded
export const DashboardsCopyDashboard500 = InternalServerErrorEncoded
export type DashboardsDeleteDashboard400 = DashboardValidationErrorEncoded
export const DashboardsDeleteDashboard400 = DashboardValidationErrorEncoded
export type DashboardsDeleteDashboard401 = UnauthorizedErrorEncoded
export const DashboardsDeleteDashboard401 = UnauthorizedErrorEncoded
export type DashboardsDeleteDashboard403 = ForbiddenErrorEncoded
export const DashboardsDeleteDashboard403 = ForbiddenErrorEncoded
export type DashboardsDeleteDashboard404 = NotFoundErrorEncoded
export const DashboardsDeleteDashboard404 = NotFoundErrorEncoded
export type DashboardsDeleteDashboard500 = InternalServerErrorEncoded
export const DashboardsDeleteDashboard500 = InternalServerErrorEncoded
export type DashboardsUpdateDashboardRequestJson = { readonly "name"?: string | null, readonly "description"?: string | null | null, readonly "isPublic"?: boolean | null, readonly "position"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "markerOverrides"?: { readonly "mode": "inherit" | "replace" | "add" | "disable", readonly "collections"?: ReadonlyArray<{ readonly "collectionId": string, readonly "enabled"?: boolean | null, readonly "display"?: { readonly "icon"?: string | null | null, readonly "emoji"?: string | null | null, readonly "color"?: string | null | null } | null }> | null, readonly "hiddenCollectionIds"?: ReadonlyArray<string> | null } | null | null, readonly "chartPositions"?: ReadonlyArray<{ readonly "id": string, readonly "position": { readonly "x": number | "Infinity" | "-Infinity" | "NaN", readonly "y": number | "Infinity" | "-Infinity" | "NaN", readonly "w": number | "Infinity" | "-Infinity" | "NaN", readonly "h": number | "Infinity" | "-Infinity" | "NaN" } }> | null }
export const DashboardsUpdateDashboardRequestJson = Schema.Struct({ "name": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "isPublic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "position": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "markerOverrides": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Struct({ "mode": Schema.Literals(["inherit", "replace", "add", "disable"]), "collections": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "collectionId": Schema.String, "enabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "display": Schema.optionalKey(Schema.Union([Schema.Struct({ "icon": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "emoji": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])) }), Schema.Null])) })), Schema.Null])), "hiddenCollectionIds": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])) }), Schema.Null]), Schema.Null])), "chartPositions": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "id": Schema.String, "position": Schema.Struct({ "x": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "y": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "w": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "h": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }) })), Schema.Null])) })
export type DashboardsUpdateDashboard200 = DashboardRecordEncoded
export const DashboardsUpdateDashboard200 = DashboardRecordEncoded
export type DashboardsUpdateDashboard400 = DashboardValidationErrorEncoded
export const DashboardsUpdateDashboard400 = DashboardValidationErrorEncoded
export type DashboardsUpdateDashboard401 = UnauthorizedErrorEncoded
export const DashboardsUpdateDashboard401 = UnauthorizedErrorEncoded
export type DashboardsUpdateDashboard403 = ForbiddenErrorEncoded
export const DashboardsUpdateDashboard403 = ForbiddenErrorEncoded
export type DashboardsUpdateDashboard404 = NotFoundErrorEncoded
export const DashboardsUpdateDashboard404 = NotFoundErrorEncoded
export type DashboardsUpdateDashboard500 = InternalServerErrorEncoded
export const DashboardsUpdateDashboard500 = InternalServerErrorEncoded
export type DataSourcesGetDataSourceCoverage200 = DataSourceCoverageResultEncoded
export const DataSourcesGetDataSourceCoverage200 = DataSourceCoverageResultEncoded
export type DataSourcesGetDataSourceCoverage400 = DataSourceValidationErrorEncoded
export const DataSourcesGetDataSourceCoverage400 = DataSourceValidationErrorEncoded
export type DataSourcesGetDataSourceCoverage401 = UnauthorizedErrorEncoded
export const DataSourcesGetDataSourceCoverage401 = UnauthorizedErrorEncoded
export type DataSourcesGetDataSourceCoverage403 = ForbiddenErrorEncoded
export const DataSourcesGetDataSourceCoverage403 = ForbiddenErrorEncoded
export type DataSourcesGetDataSourceCoverage404 = NotFoundErrorEncoded
export const DataSourcesGetDataSourceCoverage404 = NotFoundErrorEncoded
export type DataSourcesGetDataSourceCoverage500 = InternalServerErrorEncoded
export const DataSourcesGetDataSourceCoverage500 = InternalServerErrorEncoded
export type DataSourcesGetStructuredFieldCatalog200 = StructuredFieldCatalogEncoded
export const DataSourcesGetStructuredFieldCatalog200 = StructuredFieldCatalogEncoded
export type DataSourcesGetStructuredFieldCatalog400 = DataSourceValidationErrorEncoded
export const DataSourcesGetStructuredFieldCatalog400 = DataSourceValidationErrorEncoded
export type DataSourcesGetStructuredFieldCatalog401 = UnauthorizedErrorEncoded
export const DataSourcesGetStructuredFieldCatalog401 = UnauthorizedErrorEncoded
export type DataSourcesGetStructuredFieldCatalog403 = ForbiddenErrorEncoded
export const DataSourcesGetStructuredFieldCatalog403 = ForbiddenErrorEncoded
export type DataSourcesGetStructuredFieldCatalog404 = NotFoundErrorEncoded
export const DataSourcesGetStructuredFieldCatalog404 = NotFoundErrorEncoded
export type DataSourcesGetStructuredFieldCatalog500 = InternalServerErrorEncoded
export const DataSourcesGetStructuredFieldCatalog500 = InternalServerErrorEncoded
export type DataSourcesListDataSources200 = ReadonlyArray<DataSourceRecordEncoded>
export const DataSourcesListDataSources200 = Schema.Array(DataSourceRecordEncoded)
export type DataSourcesListDataSources400 = DataSourceValidationErrorEncoded
export const DataSourcesListDataSources400 = DataSourceValidationErrorEncoded
export type DataSourcesListDataSources401 = UnauthorizedErrorEncoded
export const DataSourcesListDataSources401 = UnauthorizedErrorEncoded
export type DataSourcesListDataSources403 = ForbiddenErrorEncoded
export const DataSourcesListDataSources403 = ForbiddenErrorEncoded
export type DataSourcesListDataSources404 = NotFoundErrorEncoded
export const DataSourcesListDataSources404 = NotFoundErrorEncoded
export type DataSourcesListDataSources500 = InternalServerErrorEncoded
export const DataSourcesListDataSources500 = InternalServerErrorEncoded
export type DataSourcesCreateDataSourceRequestJson = { readonly "name": string, readonly "referenceId": string, readonly "dataType": "number" | "string" | "boolean" | "json", readonly "description"?: string | null | null, readonly "regex"?: string | null | null, readonly "allowNegative"?: boolean | null | null, readonly "allowFloat"?: boolean | null | null, readonly "minValue"?: number | null | null, readonly "maxValue"?: number | null | null, readonly "isArray"?: boolean | null, readonly "metricShape": "scalar" | "array" | "map" }
export const DataSourcesCreateDataSourceRequestJson = Schema.Struct({ "name": Schema.String, "referenceId": Schema.String.check(Schema.isMinLength(1).annotate({ "expected": "a value with a length of at least 1" })), "dataType": Schema.Literals(["number", "string", "boolean", "json"]), "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "regex": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "allowNegative": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Boolean, Schema.Null]), Schema.Null])), "allowFloat": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Boolean, Schema.Null]), Schema.Null])), "minValue": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Null]), Schema.Null])), "maxValue": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Null]), Schema.Null])), "isArray": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "metricShape": Schema.Literals(["scalar", "array", "map"]) })
export type DataSourcesCreateDataSource200 = DataSourceRecordEncoded
export const DataSourcesCreateDataSource200 = DataSourceRecordEncoded
export type DataSourcesCreateDataSource400 = DataSourceValidationErrorEncoded
export const DataSourcesCreateDataSource400 = DataSourceValidationErrorEncoded
export type DataSourcesCreateDataSource401 = UnauthorizedErrorEncoded
export const DataSourcesCreateDataSource401 = UnauthorizedErrorEncoded
export type DataSourcesCreateDataSource403 = ForbiddenErrorEncoded
export const DataSourcesCreateDataSource403 = ForbiddenErrorEncoded
export type DataSourcesCreateDataSource404 = NotFoundErrorEncoded
export const DataSourcesCreateDataSource404 = NotFoundErrorEncoded
export type DataSourcesCreateDataSource500 = InternalServerErrorEncoded
export const DataSourcesCreateDataSource500 = InternalServerErrorEncoded
export type DataSourcesDeleteDataSource400 = DataSourceValidationErrorEncoded
export const DataSourcesDeleteDataSource400 = DataSourceValidationErrorEncoded
export type DataSourcesDeleteDataSource401 = UnauthorizedErrorEncoded
export const DataSourcesDeleteDataSource401 = UnauthorizedErrorEncoded
export type DataSourcesDeleteDataSource403 = ForbiddenErrorEncoded
export const DataSourcesDeleteDataSource403 = ForbiddenErrorEncoded
export type DataSourcesDeleteDataSource404 = NotFoundErrorEncoded
export const DataSourcesDeleteDataSource404 = NotFoundErrorEncoded
export type DataSourcesDeleteDataSource500 = InternalServerErrorEncoded
export const DataSourcesDeleteDataSource500 = InternalServerErrorEncoded
export type DataSourcesUpdateDataSourceRequestJson = { readonly "name"?: string | null, readonly "referenceId"?: string | null, readonly "dataType"?: "number" | "string" | "boolean" | "json" | null, readonly "description"?: string | null | null, readonly "regex"?: string | null | null, readonly "allowNegative"?: boolean | null | null, readonly "allowFloat"?: boolean | null | null, readonly "minValue"?: number | null | null, readonly "maxValue"?: number | null | null, readonly "isArray"?: boolean | null, readonly "metricShape": "scalar" | "array" | "map" }
export const DataSourcesUpdateDataSourceRequestJson = Schema.Struct({ "name": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "referenceId": Schema.optionalKey(Schema.Union([Schema.String.check(Schema.isMinLength(1).annotate({ "expected": "a value with a length of at least 1" })), Schema.Null])), "dataType": Schema.optionalKey(Schema.Union([Schema.Literals(["number", "string", "boolean", "json"]), Schema.Null])), "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "regex": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "allowNegative": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Boolean, Schema.Null]), Schema.Null])), "allowFloat": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Boolean, Schema.Null]), Schema.Null])), "minValue": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Null]), Schema.Null])), "maxValue": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Null]), Schema.Null])), "isArray": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "metricShape": Schema.Literals(["scalar", "array", "map"]) })
export type DataSourcesUpdateDataSource200 = DataSourceRecordEncoded
export const DataSourcesUpdateDataSource200 = DataSourceRecordEncoded
export type DataSourcesUpdateDataSource400 = DataSourceValidationErrorEncoded
export const DataSourcesUpdateDataSource400 = DataSourceValidationErrorEncoded
export type DataSourcesUpdateDataSource401 = UnauthorizedErrorEncoded
export const DataSourcesUpdateDataSource401 = UnauthorizedErrorEncoded
export type DataSourcesUpdateDataSource403 = ForbiddenErrorEncoded
export const DataSourcesUpdateDataSource403 = ForbiddenErrorEncoded
export type DataSourcesUpdateDataSource404 = NotFoundErrorEncoded
export const DataSourcesUpdateDataSource404 = NotFoundErrorEncoded
export type DataSourcesUpdateDataSource500 = InternalServerErrorEncoded
export const DataSourcesUpdateDataSource500 = InternalServerErrorEncoded
export type DownloadsGetDownloadAnalyticsParams = { readonly "dateFrom"?: string | null, readonly "dateTo"?: string | null, readonly "provider"?: "modrinth" | "spigot" | "hangar" | "ore" | "curseforge" | "github" | null, readonly "versionNumber"?: string | null, readonly "granularity"?: "day" | "30min" | null }
export const DownloadsGetDownloadAnalyticsParams = Schema.Struct({ "dateFrom": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "dateTo": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "provider": Schema.optionalKey(Schema.Union([Schema.Literals(["modrinth", "spigot", "hangar", "ore", "curseforge", "github"]), Schema.Null])), "versionNumber": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "granularity": Schema.optionalKey(Schema.Union([Schema.Literals(["day", "30min"]), Schema.Null])) })
export type DownloadsGetDownloadAnalytics200 = DownloadAnalyticsResponseEncoded
export const DownloadsGetDownloadAnalytics200 = DownloadAnalyticsResponseEncoded
export type DownloadsGetDownloadAnalytics401 = UnauthorizedErrorEncoded
export const DownloadsGetDownloadAnalytics401 = UnauthorizedErrorEncoded
export type DownloadsGetDownloadAnalytics403 = ForbiddenErrorEncoded
export const DownloadsGetDownloadAnalytics403 = ForbiddenErrorEncoded
export type DownloadsGetDownloadAnalytics404 = NotFoundErrorEncoded
export const DownloadsGetDownloadAnalytics404 = NotFoundErrorEncoded
export type DownloadsGetDownloadAnalytics500 = InternalServerErrorEncoded | TinybirdErrorEncoded | EffectDrizzleQueryErrorEncoded
export const DownloadsGetDownloadAnalytics500 = Schema.Union([InternalServerErrorEncoded, TinybirdErrorEncoded, EffectDrizzleQueryErrorEncoded])
export type DownloadsListDownloadProviders200 = ReadonlyArray<DownloadProviderRecordEncoded>
export const DownloadsListDownloadProviders200 = Schema.Array(DownloadProviderRecordEncoded)
export type DownloadsListDownloadProviders400 = DownloadProviderErrorEncoded
export const DownloadsListDownloadProviders400 = DownloadProviderErrorEncoded
export type DownloadsListDownloadProviders401 = UnauthorizedErrorEncoded
export const DownloadsListDownloadProviders401 = UnauthorizedErrorEncoded
export type DownloadsListDownloadProviders403 = ForbiddenErrorEncoded
export const DownloadsListDownloadProviders403 = ForbiddenErrorEncoded
export type DownloadsListDownloadProviders404 = NotFoundErrorEncoded
export const DownloadsListDownloadProviders404 = NotFoundErrorEncoded
export type DownloadsListDownloadProviders500 = InternalServerErrorEncoded | TinybirdErrorEncoded | EffectDrizzleQueryErrorEncoded
export const DownloadsListDownloadProviders500 = Schema.Union([InternalServerErrorEncoded, TinybirdErrorEncoded, EffectDrizzleQueryErrorEncoded])
export type DownloadsCreateDownloadProviderRequestJson = { readonly "provider": "modrinth" | "spigot" | "hangar" | "ore" | "curseforge" | "github", readonly "externalId": string }
export const DownloadsCreateDownloadProviderRequestJson = Schema.Struct({ "provider": Schema.Literals(["modrinth", "spigot", "hangar", "ore", "curseforge", "github"]), "externalId": Schema.String })
export type DownloadsCreateDownloadProvider200 = DownloadProviderRecordEncoded
export const DownloadsCreateDownloadProvider200 = DownloadProviderRecordEncoded
export type DownloadsCreateDownloadProvider400 = DownloadProviderErrorEncoded
export const DownloadsCreateDownloadProvider400 = DownloadProviderErrorEncoded
export type DownloadsCreateDownloadProvider401 = UnauthorizedErrorEncoded
export const DownloadsCreateDownloadProvider401 = UnauthorizedErrorEncoded
export type DownloadsCreateDownloadProvider403 = ForbiddenErrorEncoded
export const DownloadsCreateDownloadProvider403 = ForbiddenErrorEncoded
export type DownloadsCreateDownloadProvider404 = NotFoundErrorEncoded
export const DownloadsCreateDownloadProvider404 = NotFoundErrorEncoded
export type DownloadsCreateDownloadProvider500 = InternalServerErrorEncoded | TinybirdErrorEncoded | EffectDrizzleQueryErrorEncoded
export const DownloadsCreateDownloadProvider500 = Schema.Union([InternalServerErrorEncoded, TinybirdErrorEncoded, EffectDrizzleQueryErrorEncoded])
export type DownloadsSearchDownloadProviderProjectsParams = { readonly "provider": "modrinth" | "spigot" | "hangar" | "ore" | "curseforge" | "github", readonly "query": string }
export const DownloadsSearchDownloadProviderProjectsParams = Schema.Struct({ "provider": Schema.Literals(["modrinth", "spigot", "hangar", "ore", "curseforge", "github"]), "query": Schema.String })
export type DownloadsSearchDownloadProviderProjects200 = ReadonlyArray<DownloadProviderSearchResultEncoded>
export const DownloadsSearchDownloadProviderProjects200 = Schema.Array(DownloadProviderSearchResultEncoded)
export type DownloadsSearchDownloadProviderProjects400 = DownloadProviderErrorEncoded
export const DownloadsSearchDownloadProviderProjects400 = DownloadProviderErrorEncoded
export type DownloadsSearchDownloadProviderProjects401 = UnauthorizedErrorEncoded
export const DownloadsSearchDownloadProviderProjects401 = UnauthorizedErrorEncoded
export type DownloadsSearchDownloadProviderProjects403 = ForbiddenErrorEncoded
export const DownloadsSearchDownloadProviderProjects403 = ForbiddenErrorEncoded
export type DownloadsSearchDownloadProviderProjects404 = NotFoundErrorEncoded
export const DownloadsSearchDownloadProviderProjects404 = NotFoundErrorEncoded
export type DownloadsSearchDownloadProviderProjects500 = InternalServerErrorEncoded | TinybirdErrorEncoded | EffectDrizzleQueryErrorEncoded
export const DownloadsSearchDownloadProviderProjects500 = Schema.Union([InternalServerErrorEncoded, TinybirdErrorEncoded, EffectDrizzleQueryErrorEncoded])
export type DownloadsDeleteDownloadProvider400 = DownloadProviderErrorEncoded
export const DownloadsDeleteDownloadProvider400 = DownloadProviderErrorEncoded
export type DownloadsDeleteDownloadProvider401 = UnauthorizedErrorEncoded
export const DownloadsDeleteDownloadProvider401 = UnauthorizedErrorEncoded
export type DownloadsDeleteDownloadProvider403 = ForbiddenErrorEncoded
export const DownloadsDeleteDownloadProvider403 = ForbiddenErrorEncoded
export type DownloadsDeleteDownloadProvider404 = NotFoundErrorEncoded
export const DownloadsDeleteDownloadProvider404 = NotFoundErrorEncoded
export type DownloadsDeleteDownloadProvider500 = InternalServerErrorEncoded | TinybirdErrorEncoded | EffectDrizzleQueryErrorEncoded
export const DownloadsDeleteDownloadProvider500 = Schema.Union([InternalServerErrorEncoded, TinybirdErrorEncoded, EffectDrizzleQueryErrorEncoded])
export type DownloadsUpdateDownloadProviderRequestJson = { readonly "excludedFiles": ReadonlyArray<string> }
export const DownloadsUpdateDownloadProviderRequestJson = Schema.Struct({ "excludedFiles": Schema.Array(Schema.String) })
export type DownloadsUpdateDownloadProvider400 = DownloadProviderErrorEncoded
export const DownloadsUpdateDownloadProvider400 = DownloadProviderErrorEncoded
export type DownloadsUpdateDownloadProvider401 = UnauthorizedErrorEncoded
export const DownloadsUpdateDownloadProvider401 = UnauthorizedErrorEncoded
export type DownloadsUpdateDownloadProvider403 = ForbiddenErrorEncoded
export const DownloadsUpdateDownloadProvider403 = ForbiddenErrorEncoded
export type DownloadsUpdateDownloadProvider404 = NotFoundErrorEncoded
export const DownloadsUpdateDownloadProvider404 = NotFoundErrorEncoded
export type DownloadsUpdateDownloadProvider500 = InternalServerErrorEncoded | TinybirdErrorEncoded | EffectDrizzleQueryErrorEncoded
export const DownloadsUpdateDownloadProvider500 = Schema.Union([InternalServerErrorEncoded, TinybirdErrorEncoded, EffectDrizzleQueryErrorEncoded])
export type ErrorTrackingGetErrorEmbeddingsRequestJson = { readonly "after"?: string, readonly "search"?: string, readonly "filters"?: ReadonlyArray<{ readonly "categoryId": string, readonly "operator": "is" | "is_not" | "gt" | "gte" | "lt" | "lte", readonly "value": string }>, readonly "sortBy"?: "exactHash" | "errorType" | "occurrences" | "matchingStackCount" | "affectedSessionCount" | "firstSeen" | "lastSeen", readonly "sortDirection"?: "asc" | "desc", readonly "offset"?: number, readonly "limit"?: number }
export const ErrorTrackingGetErrorEmbeddingsRequestJson = Schema.Struct({ "after": Schema.optionalKey(Schema.String), "search": Schema.optionalKey(Schema.String.check(Schema.isMaxCodePoints(200).annotate({ "expected": "a string with at most 200 code points" }))), "filters": Schema.optionalKey(Schema.Array(Schema.Struct({ "categoryId": Schema.String, "operator": Schema.Literals(["is", "is_not", "gt", "gte", "lt", "lte"]), "value": Schema.String }))), "sortBy": Schema.optionalKey(Schema.Literals(["exactHash", "errorType", "occurrences", "matchingStackCount", "affectedSessionCount", "firstSeen", "lastSeen"])), "sortDirection": Schema.optionalKey(Schema.Literals(["asc", "desc"])), "offset": Schema.optionalKey(Schema.Number.check(Schema.isInt().annotate({ "expected": "an integer" })).check(Schema.isGreaterThanOrEqualTo(0).annotate({ "expected": "a value greater than or equal to 0" }))), "limit": Schema.optionalKey(Schema.Number.check(Schema.isInt().annotate({ "expected": "an integer" })).check(Schema.isGreaterThanOrEqualTo(0).annotate({ "expected": "a value greater than or equal to 0" })).check(Schema.isLessThanOrEqualTo(100).annotate({ "expected": "a value less than or equal to 100" }))) })
export type ErrorTrackingGetErrorEmbeddings200 = { readonly "rows": ReadonlyArray<{ readonly "exactHash": string, readonly "errorType": string, readonly "message": string, readonly "occurrences": number | "Infinity" | "-Infinity" | "NaN", readonly "matchingStackCount": number | "Infinity" | "-Infinity" | "NaN", readonly "affectedSessionCount": number | "Infinity" | "-Infinity" | "NaN", readonly "errorTypes": ReadonlyArray<string>, readonly "languages": ReadonlyArray<string>, readonly "eventTrend": ReadonlyArray<number | "Infinity" | "-Infinity" | "NaN">, readonly "firstSeen": number | "Infinity" | "-Infinity" | "NaN", readonly "lastSeen": number | "Infinity" | "-Infinity" | "NaN" }>, readonly "total": number | "Infinity" | "-Infinity" | "NaN", readonly "totalGroups": number | "Infinity" | "-Infinity" | "NaN", readonly "errorTypes": ReadonlyArray<string>, readonly "languages": ReadonlyArray<string>, readonly "nextCursor": string | null }
export const ErrorTrackingGetErrorEmbeddings200 = Schema.Struct({ "rows": Schema.Array(Schema.Struct({ "exactHash": Schema.String, "errorType": Schema.String, "message": Schema.String, "occurrences": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "matchingStackCount": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "affectedSessionCount": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "errorTypes": Schema.Array(Schema.String), "languages": Schema.Array(Schema.String), "eventTrend": Schema.Array(Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])])), "firstSeen": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "lastSeen": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })), "total": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "totalGroups": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "errorTypes": Schema.Array(Schema.String), "languages": Schema.Array(Schema.String), "nextCursor": Schema.Union([Schema.String, Schema.Null]) })
export type ErrorTrackingGetErrorEmbeddings401 = UnauthorizedErrorEncoded
export const ErrorTrackingGetErrorEmbeddings401 = UnauthorizedErrorEncoded
export type ErrorTrackingGetErrorEmbeddings403 = ForbiddenErrorEncoded
export const ErrorTrackingGetErrorEmbeddings403 = ForbiddenErrorEncoded
export type ErrorTrackingGetErrorEmbeddings404 = NotFoundErrorEncoded
export const ErrorTrackingGetErrorEmbeddings404 = NotFoundErrorEncoded
export type ErrorTrackingGetErrorEmbeddings500 = InternalServerErrorEncoded | ErrorTrackingServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const ErrorTrackingGetErrorEmbeddings500 = Schema.Union([InternalServerErrorEncoded, ErrorTrackingServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type ErrorTrackingGetErrorIssuesForProjectRequestJson = { readonly "from"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "to"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "limit"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "searchQuery"?: string | null, readonly "status"?: "active" | "resolved" | "all" | null, readonly "filters"?: ReadonlyArray<ErrorFilterEncoded> | null }
export const ErrorTrackingGetErrorIssuesForProjectRequestJson = Schema.Struct({ "from": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "limit": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "searchQuery": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "status": Schema.optionalKey(Schema.Union([Schema.Literals(["active", "resolved", "all"]), Schema.Null])), "filters": Schema.optionalKey(Schema.Union([Schema.Array(ErrorFilterEncoded), Schema.Null])) })
export type ErrorTrackingGetErrorIssuesForProject200 = ReadonlyArray<ErrorIssueSummaryEncoded>
export const ErrorTrackingGetErrorIssuesForProject200 = Schema.Array(ErrorIssueSummaryEncoded)
export type ErrorTrackingGetErrorIssuesForProject401 = UnauthorizedErrorEncoded
export const ErrorTrackingGetErrorIssuesForProject401 = UnauthorizedErrorEncoded
export type ErrorTrackingGetErrorIssuesForProject403 = ForbiddenErrorEncoded
export const ErrorTrackingGetErrorIssuesForProject403 = ForbiddenErrorEncoded
export type ErrorTrackingGetErrorIssuesForProject404 = NotFoundErrorEncoded
export const ErrorTrackingGetErrorIssuesForProject404 = NotFoundErrorEncoded
export type ErrorTrackingGetErrorIssuesForProject500 = InternalServerErrorEncoded | ErrorTrackingServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const ErrorTrackingGetErrorIssuesForProject500 = Schema.Union([InternalServerErrorEncoded, ErrorTrackingServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type ErrorTrackingGetErrorIssuesForProjectsRequestJson = { readonly "projectIds": ReadonlyArray<string>, readonly "from"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "to"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "limit"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "searchQuery"?: string | null, readonly "status"?: "active" | "resolved" | "all" | null, readonly "filters"?: ReadonlyArray<ErrorFilterEncoded> | null }
export const ErrorTrackingGetErrorIssuesForProjectsRequestJson = Schema.Struct({ "projectIds": Schema.Array(Schema.String), "from": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "limit": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "searchQuery": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "status": Schema.optionalKey(Schema.Union([Schema.Literals(["active", "resolved", "all"]), Schema.Null])), "filters": Schema.optionalKey(Schema.Union([Schema.Array(ErrorFilterEncoded), Schema.Null])) })
export type ErrorTrackingGetErrorIssuesForProjects200 = ReadonlyArray<ErrorIssueSummaryEncoded>
export const ErrorTrackingGetErrorIssuesForProjects200 = Schema.Array(ErrorIssueSummaryEncoded)
export type ErrorTrackingGetErrorIssuesForProjects401 = UnauthorizedErrorEncoded
export const ErrorTrackingGetErrorIssuesForProjects401 = UnauthorizedErrorEncoded
export type ErrorTrackingGetErrorIssuesForProjects403 = ForbiddenErrorEncoded
export const ErrorTrackingGetErrorIssuesForProjects403 = ForbiddenErrorEncoded
export type ErrorTrackingGetErrorIssuesForProjects404 = NotFoundErrorEncoded
export const ErrorTrackingGetErrorIssuesForProjects404 = NotFoundErrorEncoded
export type ErrorTrackingGetErrorIssuesForProjects500 = InternalServerErrorEncoded | ErrorTrackingServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const ErrorTrackingGetErrorIssuesForProjects500 = Schema.Union([InternalServerErrorEncoded, ErrorTrackingServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type ErrorTrackingGetErrorIssueDetail200 = ErrorIssueDetailEncoded
export const ErrorTrackingGetErrorIssueDetail200 = ErrorIssueDetailEncoded
export type ErrorTrackingGetErrorIssueDetail401 = UnauthorizedErrorEncoded
export const ErrorTrackingGetErrorIssueDetail401 = UnauthorizedErrorEncoded
export type ErrorTrackingGetErrorIssueDetail403 = ForbiddenErrorEncoded
export const ErrorTrackingGetErrorIssueDetail403 = ForbiddenErrorEncoded
export type ErrorTrackingGetErrorIssueDetail404 = NotFoundErrorEncoded
export const ErrorTrackingGetErrorIssueDetail404 = NotFoundErrorEncoded
export type ErrorTrackingGetErrorIssueDetail500 = InternalServerErrorEncoded | ErrorTrackingServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const ErrorTrackingGetErrorIssueDetail500 = Schema.Union([InternalServerErrorEncoded, ErrorTrackingServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type ErrorTrackingUpdateErrorIssueMetadataRequestJson = { readonly "priority"?: "critical" | "high" | "medium" | "low" | null | null, readonly "assigneeId"?: string | null | null }
export const ErrorTrackingUpdateErrorIssueMetadataRequestJson = Schema.Struct({ "priority": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Literals(["critical", "high", "medium", "low"]), Schema.Null]), Schema.Null])), "assigneeId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])) })
export type ErrorTrackingUpdateErrorIssueMetadata401 = UnauthorizedErrorEncoded
export const ErrorTrackingUpdateErrorIssueMetadata401 = UnauthorizedErrorEncoded
export type ErrorTrackingUpdateErrorIssueMetadata403 = ForbiddenErrorEncoded
export const ErrorTrackingUpdateErrorIssueMetadata403 = ForbiddenErrorEncoded
export type ErrorTrackingUpdateErrorIssueMetadata404 = NotFoundErrorEncoded
export const ErrorTrackingUpdateErrorIssueMetadata404 = NotFoundErrorEncoded
export type ErrorTrackingUpdateErrorIssueMetadata500 = InternalServerErrorEncoded | ErrorTrackingServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const ErrorTrackingUpdateErrorIssueMetadata500 = Schema.Union([InternalServerErrorEncoded, ErrorTrackingServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type ErrorTrackingGetErrorStacktraceVariantsParams = { readonly "limit": string }
export const ErrorTrackingGetErrorStacktraceVariantsParams = Schema.Struct({ "limit": Schema.String })
export type ErrorTrackingGetErrorStacktraceVariants200 = ReadonlyArray<{ readonly "id": string, readonly "latestOccurrenceId": string, readonly "stack": ReadonlyArray<string>, readonly "language": string, readonly "errorName": string, readonly "errorMessage": string, readonly "occurrenceCount": number | "Infinity" | "-Infinity" | "NaN", readonly "firstOccurred": number, readonly "lastOccurred": number }>
export const ErrorTrackingGetErrorStacktraceVariants200 = Schema.Array(Schema.Struct({ "id": Schema.String, "latestOccurrenceId": Schema.String, "stack": Schema.Array(Schema.String), "language": Schema.String, "errorName": Schema.String, "errorMessage": Schema.String, "occurrenceCount": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "firstOccurred": Schema.Number.check(Schema.isInt().annotate({ "expected": "an integer" })), "lastOccurred": Schema.Number.check(Schema.isInt().annotate({ "expected": "an integer" })) }))
export type ErrorTrackingGetErrorStacktraceVariants401 = UnauthorizedErrorEncoded
export const ErrorTrackingGetErrorStacktraceVariants401 = UnauthorizedErrorEncoded
export type ErrorTrackingGetErrorStacktraceVariants403 = ForbiddenErrorEncoded
export const ErrorTrackingGetErrorStacktraceVariants403 = ForbiddenErrorEncoded
export type ErrorTrackingGetErrorStacktraceVariants404 = NotFoundErrorEncoded
export const ErrorTrackingGetErrorStacktraceVariants404 = NotFoundErrorEncoded
export type ErrorTrackingGetErrorStacktraceVariants500 = InternalServerErrorEncoded | ErrorTrackingServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const ErrorTrackingGetErrorStacktraceVariants500 = Schema.Union([InternalServerErrorEncoded, ErrorTrackingServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type ErrorTrackingGetErrorOccurrencesForIssueParams = { readonly "occurrenceId"?: string | null, readonly "limit"?: string | null }
export const ErrorTrackingGetErrorOccurrencesForIssueParams = Schema.Struct({ "occurrenceId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "limit": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type ErrorTrackingGetErrorOccurrencesForIssue200 = ReadonlyArray<ErrorOccurrenceEncoded>
export const ErrorTrackingGetErrorOccurrencesForIssue200 = Schema.Array(ErrorOccurrenceEncoded)
export type ErrorTrackingGetErrorOccurrencesForIssue401 = UnauthorizedErrorEncoded
export const ErrorTrackingGetErrorOccurrencesForIssue401 = UnauthorizedErrorEncoded
export type ErrorTrackingGetErrorOccurrencesForIssue403 = ForbiddenErrorEncoded
export const ErrorTrackingGetErrorOccurrencesForIssue403 = ForbiddenErrorEncoded
export type ErrorTrackingGetErrorOccurrencesForIssue404 = NotFoundErrorEncoded
export const ErrorTrackingGetErrorOccurrencesForIssue404 = NotFoundErrorEncoded
export type ErrorTrackingGetErrorOccurrencesForIssue500 = InternalServerErrorEncoded | ErrorTrackingServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const ErrorTrackingGetErrorOccurrencesForIssue500 = Schema.Union([InternalServerErrorEncoded, ErrorTrackingServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type ErrorTrackingGetErrorOverviewTimeseriesRequestJson = { readonly "from"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "to"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "limit"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "searchQuery"?: string | null, readonly "status"?: "active" | "resolved" | "all" | null, readonly "filters"?: ReadonlyArray<ErrorFilterEncoded> | null }
export const ErrorTrackingGetErrorOverviewTimeseriesRequestJson = Schema.Struct({ "from": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "limit": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "searchQuery": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "status": Schema.optionalKey(Schema.Union([Schema.Literals(["active", "resolved", "all"]), Schema.Null])), "filters": Schema.optionalKey(Schema.Union([Schema.Array(ErrorFilterEncoded), Schema.Null])) })
export type ErrorTrackingGetErrorOverviewTimeseries200 = ReadonlyArray<ErrorTimelinePointEncoded>
export const ErrorTrackingGetErrorOverviewTimeseries200 = Schema.Array(ErrorTimelinePointEncoded)
export type ErrorTrackingGetErrorOverviewTimeseries401 = UnauthorizedErrorEncoded
export const ErrorTrackingGetErrorOverviewTimeseries401 = UnauthorizedErrorEncoded
export type ErrorTrackingGetErrorOverviewTimeseries403 = ForbiddenErrorEncoded
export const ErrorTrackingGetErrorOverviewTimeseries403 = ForbiddenErrorEncoded
export type ErrorTrackingGetErrorOverviewTimeseries404 = NotFoundErrorEncoded
export const ErrorTrackingGetErrorOverviewTimeseries404 = NotFoundErrorEncoded
export type ErrorTrackingGetErrorOverviewTimeseries500 = InternalServerErrorEncoded | ErrorTrackingServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const ErrorTrackingGetErrorOverviewTimeseries500 = Schema.Union([InternalServerErrorEncoded, ErrorTrackingServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type ErrorTrackingGetErrorOverviewTimeseriesForProjectsRequestJson = { readonly "projectIds": ReadonlyArray<string>, readonly "from"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "to"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "limit"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "searchQuery"?: string | null, readonly "status"?: "active" | "resolved" | "all" | null, readonly "filters"?: ReadonlyArray<ErrorFilterEncoded> | null }
export const ErrorTrackingGetErrorOverviewTimeseriesForProjectsRequestJson = Schema.Struct({ "projectIds": Schema.Array(Schema.String), "from": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "limit": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "searchQuery": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "status": Schema.optionalKey(Schema.Union([Schema.Literals(["active", "resolved", "all"]), Schema.Null])), "filters": Schema.optionalKey(Schema.Union([Schema.Array(ErrorFilterEncoded), Schema.Null])) })
export type ErrorTrackingGetErrorOverviewTimeseriesForProjects200 = ReadonlyArray<ErrorTimelinePointEncoded>
export const ErrorTrackingGetErrorOverviewTimeseriesForProjects200 = Schema.Array(ErrorTimelinePointEncoded)
export type ErrorTrackingGetErrorOverviewTimeseriesForProjects401 = UnauthorizedErrorEncoded
export const ErrorTrackingGetErrorOverviewTimeseriesForProjects401 = UnauthorizedErrorEncoded
export type ErrorTrackingGetErrorOverviewTimeseriesForProjects403 = ForbiddenErrorEncoded
export const ErrorTrackingGetErrorOverviewTimeseriesForProjects403 = ForbiddenErrorEncoded
export type ErrorTrackingGetErrorOverviewTimeseriesForProjects404 = NotFoundErrorEncoded
export const ErrorTrackingGetErrorOverviewTimeseriesForProjects404 = NotFoundErrorEncoded
export type ErrorTrackingGetErrorOverviewTimeseriesForProjects500 = InternalServerErrorEncoded | ErrorTrackingServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const ErrorTrackingGetErrorOverviewTimeseriesForProjects500 = Schema.Union([InternalServerErrorEncoded, ErrorTrackingServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type ErrorTrackingDeleteErrorsRequestJson = { readonly "ids": readonly [string, ...Array<string>] }
export const ErrorTrackingDeleteErrorsRequestJson = Schema.Struct({ "ids": Schema.TupleWithRest(Schema.Tuple([Schema.String]), [Schema.String]) })
export type ErrorTrackingDeleteErrors200 = { readonly "ids": ReadonlyArray<string> }
export const ErrorTrackingDeleteErrors200 = Schema.Struct({ "ids": Schema.Array(Schema.String) })
export type ErrorTrackingDeleteErrors401 = UnauthorizedErrorEncoded
export const ErrorTrackingDeleteErrors401 = UnauthorizedErrorEncoded
export type ErrorTrackingDeleteErrors403 = ForbiddenErrorEncoded
export const ErrorTrackingDeleteErrors403 = ForbiddenErrorEncoded
export type ErrorTrackingDeleteErrors404 = NotFoundErrorEncoded
export const ErrorTrackingDeleteErrors404 = NotFoundErrorEncoded
export type ErrorTrackingDeleteErrors500 = InternalServerErrorEncoded | ErrorTrackingServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const ErrorTrackingDeleteErrors500 = Schema.Union([InternalServerErrorEncoded, ErrorTrackingServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type ErrorTrackingMarkErrorsViewedRequestJson = { readonly "ids": readonly [string, ...Array<string>] }
export const ErrorTrackingMarkErrorsViewedRequestJson = Schema.Struct({ "ids": Schema.TupleWithRest(Schema.Tuple([Schema.String]), [Schema.String]) })
export type ErrorTrackingMarkErrorsViewed401 = UnauthorizedErrorEncoded
export const ErrorTrackingMarkErrorsViewed401 = UnauthorizedErrorEncoded
export type ErrorTrackingMarkErrorsViewed403 = ForbiddenErrorEncoded
export const ErrorTrackingMarkErrorsViewed403 = ForbiddenErrorEncoded
export type ErrorTrackingMarkErrorsViewed404 = NotFoundErrorEncoded
export const ErrorTrackingMarkErrorsViewed404 = NotFoundErrorEncoded
export type ErrorTrackingMarkErrorsViewed500 = InternalServerErrorEncoded | ErrorTrackingServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const ErrorTrackingMarkErrorsViewed500 = Schema.Union([InternalServerErrorEncoded, ErrorTrackingServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type ErrorTrackingResolveErrorIssuesRequestJson = { readonly "projects": ReadonlyArray<{ readonly "projectId": string, readonly "errorIds": readonly [string, ...Array<string>], readonly "targets"?: readonly [{ readonly "errorId": string, readonly "source": "selected_occurrence" | "latest_occurrence", readonly "occurrenceId": string | null, readonly "versionToken"?: string | null | null, readonly "versionSource"?: "build_id" | "plugin_version" | null | null }, ...Array<{ readonly "errorId": string, readonly "source": "selected_occurrence" | "latest_occurrence", readonly "occurrenceId": string | null, readonly "versionToken"?: string | null | null, readonly "versionSource"?: "build_id" | "plugin_version" | null | null }>] | null }>, readonly "mode": "once" | "version" | "version_and_prior" | "forever", readonly "note"?: string | null }
export const ErrorTrackingResolveErrorIssuesRequestJson = Schema.Struct({ "projects": Schema.Array(Schema.Struct({ "projectId": Schema.String, "errorIds": Schema.TupleWithRest(Schema.Tuple([Schema.String]), [Schema.String]), "targets": Schema.optionalKey(Schema.Union([Schema.TupleWithRest(Schema.Tuple([Schema.Struct({ "errorId": Schema.String, "source": Schema.Literals(["selected_occurrence", "latest_occurrence"]), "occurrenceId": Schema.Union([Schema.String, Schema.Null]), "versionToken": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "versionSource": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Literals(["build_id", "plugin_version"]), Schema.Null]), Schema.Null])) })]), [Schema.Struct({ "errorId": Schema.String, "source": Schema.Literals(["selected_occurrence", "latest_occurrence"]), "occurrenceId": Schema.Union([Schema.String, Schema.Null]), "versionToken": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "versionSource": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Literals(["build_id", "plugin_version"]), Schema.Null]), Schema.Null])) })]), Schema.Null])) })).check(Schema.isMinLength(1).annotate({ "expected": "a value with a length of at least 1" })), "mode": Schema.Literals(["once", "version", "version_and_prior", "forever"]), "note": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type ErrorTrackingResolveErrorIssues401 = UnauthorizedErrorEncoded
export const ErrorTrackingResolveErrorIssues401 = UnauthorizedErrorEncoded
export type ErrorTrackingResolveErrorIssues403 = ForbiddenErrorEncoded
export const ErrorTrackingResolveErrorIssues403 = ForbiddenErrorEncoded
export type ErrorTrackingResolveErrorIssues404 = NotFoundErrorEncoded
export const ErrorTrackingResolveErrorIssues404 = NotFoundErrorEncoded
export type ErrorTrackingResolveErrorIssues500 = InternalServerErrorEncoded | ErrorTrackingServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const ErrorTrackingResolveErrorIssues500 = Schema.Union([InternalServerErrorEncoded, ErrorTrackingServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type ErrorTrackingClearErrorResolutionsRequestJson = { readonly "errorIds": readonly [string, ...Array<string>] }
export const ErrorTrackingClearErrorResolutionsRequestJson = Schema.Struct({ "errorIds": Schema.TupleWithRest(Schema.Tuple([Schema.String]), [Schema.String]) })
export type ErrorTrackingClearErrorResolutions401 = UnauthorizedErrorEncoded
export const ErrorTrackingClearErrorResolutions401 = UnauthorizedErrorEncoded
export type ErrorTrackingClearErrorResolutions403 = ForbiddenErrorEncoded
export const ErrorTrackingClearErrorResolutions403 = ForbiddenErrorEncoded
export type ErrorTrackingClearErrorResolutions404 = NotFoundErrorEncoded
export const ErrorTrackingClearErrorResolutions404 = NotFoundErrorEncoded
export type ErrorTrackingClearErrorResolutions500 = InternalServerErrorEncoded | ErrorTrackingServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const ErrorTrackingClearErrorResolutions500 = Schema.Union([InternalServerErrorEncoded, ErrorTrackingServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type ErrorTrackingMergeErrorIssuesRequestJson = { readonly "primaryErrorId": string, readonly "mergedErrorIds": readonly [string, ...Array<string>] }
export const ErrorTrackingMergeErrorIssuesRequestJson = Schema.Struct({ "primaryErrorId": Schema.String, "mergedErrorIds": Schema.TupleWithRest(Schema.Tuple([Schema.String]), [Schema.String]) })
export type ErrorTrackingMergeErrorIssues200 = { readonly "primaryErrorId": string }
export const ErrorTrackingMergeErrorIssues200 = Schema.Struct({ "primaryErrorId": Schema.String })
export type ErrorTrackingMergeErrorIssues401 = UnauthorizedErrorEncoded
export const ErrorTrackingMergeErrorIssues401 = UnauthorizedErrorEncoded
export type ErrorTrackingMergeErrorIssues403 = ForbiddenErrorEncoded
export const ErrorTrackingMergeErrorIssues403 = ForbiddenErrorEncoded
export type ErrorTrackingMergeErrorIssues404 = NotFoundErrorEncoded
export const ErrorTrackingMergeErrorIssues404 = NotFoundErrorEncoded
export type ErrorTrackingMergeErrorIssues500 = InternalServerErrorEncoded | ErrorTrackingServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const ErrorTrackingMergeErrorIssues500 = Schema.Union([InternalServerErrorEncoded, ErrorTrackingServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type ErrorTrackingUnmergeErrorIssueHashesRequestJson = { readonly "hashes": readonly [string, ...Array<string>] }
export const ErrorTrackingUnmergeErrorIssueHashesRequestJson = Schema.Struct({ "hashes": Schema.TupleWithRest(Schema.Tuple([Schema.String]), [Schema.String]) })
export type ErrorTrackingUnmergeErrorIssueHashes401 = UnauthorizedErrorEncoded
export const ErrorTrackingUnmergeErrorIssueHashes401 = UnauthorizedErrorEncoded
export type ErrorTrackingUnmergeErrorIssueHashes403 = ForbiddenErrorEncoded
export const ErrorTrackingUnmergeErrorIssueHashes403 = ForbiddenErrorEncoded
export type ErrorTrackingUnmergeErrorIssueHashes404 = NotFoundErrorEncoded
export const ErrorTrackingUnmergeErrorIssueHashes404 = NotFoundErrorEncoded
export type ErrorTrackingUnmergeErrorIssueHashes500 = InternalServerErrorEncoded | ErrorTrackingServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const ErrorTrackingUnmergeErrorIssueHashes500 = Schema.Union([InternalServerErrorEncoded, ErrorTrackingServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type ErrorTrackingGetErrorFilterMeta200 = { readonly "country_values": ReadonlyArray<string>, readonly "browser_values"?: ReadonlyArray<string> | null, readonly "device_values"?: ReadonlyArray<string> | null, readonly "os_values"?: ReadonlyArray<string> | null, readonly "plugin_version_values"?: ReadonlyArray<string> | null, readonly "minecraft_version_values"?: ReadonlyArray<string> | null, readonly "java_version_values"?: ReadonlyArray<string> | null, readonly "server_type_values"?: ReadonlyArray<string> | null }
export const ErrorTrackingGetErrorFilterMeta200 = Schema.Struct({ "country_values": Schema.Array(Schema.String), "browser_values": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "device_values": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "os_values": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "plugin_version_values": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "minecraft_version_values": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "java_version_values": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "server_type_values": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])) })
export type ErrorTrackingGetErrorFilterMeta401 = UnauthorizedErrorEncoded
export const ErrorTrackingGetErrorFilterMeta401 = UnauthorizedErrorEncoded
export type ErrorTrackingGetErrorFilterMeta403 = ForbiddenErrorEncoded
export const ErrorTrackingGetErrorFilterMeta403 = ForbiddenErrorEncoded
export type ErrorTrackingGetErrorFilterMeta404 = NotFoundErrorEncoded
export const ErrorTrackingGetErrorFilterMeta404 = NotFoundErrorEncoded
export type ErrorTrackingGetErrorFilterMeta500 = InternalServerErrorEncoded | ErrorTrackingServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const ErrorTrackingGetErrorFilterMeta500 = Schema.Union([InternalServerErrorEncoded, ErrorTrackingServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type ErrorTrackingInterpretErrorFiltersRequestJson = { readonly "query": string, readonly "categories": ReadonlyArray<{ readonly "id": string, readonly "label": string, readonly "values": ReadonlyArray<string>, readonly "isNumeric": boolean, readonly "isBoolean": boolean, readonly "isArray": boolean }>, readonly "currentFilters": ReadonlyArray<{ readonly "categoryId": string, readonly "operator": "is" | "is_not" | "gt" | "gte" | "lt" | "lte", readonly "value": string }> }
export const ErrorTrackingInterpretErrorFiltersRequestJson = Schema.Struct({ "query": Schema.String, "categories": Schema.Array(Schema.Struct({ "id": Schema.String, "label": Schema.String, "values": Schema.Array(Schema.String), "isNumeric": Schema.Boolean, "isBoolean": Schema.Boolean, "isArray": Schema.Boolean })), "currentFilters": Schema.Array(Schema.Struct({ "categoryId": Schema.String, "operator": Schema.Literals(["is", "is_not", "gt", "gte", "lt", "lte"]), "value": Schema.String })) })
export type ErrorTrackingInterpretErrorFilters200 = { readonly "filters": ReadonlyArray<{ readonly "categoryId": string, readonly "operator": "is" | "is_not" | "gt" | "gte" | "lt" | "lte", readonly "value": string }>, readonly "unresolved": ReadonlyArray<string>, readonly "categoriesSearched": number | "Infinity" | "-Infinity" | "NaN", readonly "categoriesTotal": number | "Infinity" | "-Infinity" | "NaN" }
export const ErrorTrackingInterpretErrorFilters200 = Schema.Struct({ "filters": Schema.Array(Schema.Struct({ "categoryId": Schema.String, "operator": Schema.Literals(["is", "is_not", "gt", "gte", "lt", "lte"]), "value": Schema.String })), "unresolved": Schema.Array(Schema.String), "categoriesSearched": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "categoriesTotal": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })
export type ErrorTrackingInterpretErrorFilters401 = UnauthorizedErrorEncoded
export const ErrorTrackingInterpretErrorFilters401 = UnauthorizedErrorEncoded
export type ErrorTrackingInterpretErrorFilters403 = ForbiddenErrorEncoded
export const ErrorTrackingInterpretErrorFilters403 = ForbiddenErrorEncoded
export type ErrorTrackingInterpretErrorFilters404 = NotFoundErrorEncoded
export const ErrorTrackingInterpretErrorFilters404 = NotFoundErrorEncoded
export type ErrorTrackingInterpretErrorFilters500 = InternalServerErrorEncoded | ErrorTrackingServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const ErrorTrackingInterpretErrorFilters500 = Schema.Union([InternalServerErrorEncoded, ErrorTrackingServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type ErrorTrackingListErrorLabelsParams = { readonly "includeCounts"?: "true" | "false" | null }
export const ErrorTrackingListErrorLabelsParams = Schema.Struct({ "includeCounts": Schema.optionalKey(Schema.Union([Schema.Literals(["true", "false"]), Schema.Null])) })
export type ErrorTrackingListErrorLabels200 = ReadonlyArray<ErrorLabelEncoded>
export const ErrorTrackingListErrorLabels200 = Schema.Array(ErrorLabelEncoded)
export type ErrorTrackingListErrorLabels401 = UnauthorizedErrorEncoded
export const ErrorTrackingListErrorLabels401 = UnauthorizedErrorEncoded
export type ErrorTrackingListErrorLabels403 = ForbiddenErrorEncoded
export const ErrorTrackingListErrorLabels403 = ForbiddenErrorEncoded
export type ErrorTrackingListErrorLabels404 = NotFoundErrorEncoded
export const ErrorTrackingListErrorLabels404 = NotFoundErrorEncoded
export type ErrorTrackingListErrorLabels500 = InternalServerErrorEncoded | ErrorTrackingServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const ErrorTrackingListErrorLabels500 = Schema.Union([InternalServerErrorEncoded, ErrorTrackingServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type ErrorTrackingCreateErrorLabelRequestJson = { readonly "name": string, readonly "color": string }
export const ErrorTrackingCreateErrorLabelRequestJson = Schema.Struct({ "name": Schema.String, "color": Schema.String })
export type ErrorTrackingCreateErrorLabel200 = ErrorLabelEncoded
export const ErrorTrackingCreateErrorLabel200 = ErrorLabelEncoded
export type ErrorTrackingCreateErrorLabel401 = UnauthorizedErrorEncoded
export const ErrorTrackingCreateErrorLabel401 = UnauthorizedErrorEncoded
export type ErrorTrackingCreateErrorLabel403 = ForbiddenErrorEncoded
export const ErrorTrackingCreateErrorLabel403 = ForbiddenErrorEncoded
export type ErrorTrackingCreateErrorLabel404 = NotFoundErrorEncoded
export const ErrorTrackingCreateErrorLabel404 = NotFoundErrorEncoded
export type ErrorTrackingCreateErrorLabel500 = InternalServerErrorEncoded | ErrorTrackingServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const ErrorTrackingCreateErrorLabel500 = Schema.Union([InternalServerErrorEncoded, ErrorTrackingServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type ErrorTrackingDeleteErrorLabel401 = UnauthorizedErrorEncoded
export const ErrorTrackingDeleteErrorLabel401 = UnauthorizedErrorEncoded
export type ErrorTrackingDeleteErrorLabel403 = ForbiddenErrorEncoded
export const ErrorTrackingDeleteErrorLabel403 = ForbiddenErrorEncoded
export type ErrorTrackingDeleteErrorLabel404 = NotFoundErrorEncoded
export const ErrorTrackingDeleteErrorLabel404 = NotFoundErrorEncoded
export type ErrorTrackingDeleteErrorLabel500 = InternalServerErrorEncoded | ErrorTrackingServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const ErrorTrackingDeleteErrorLabel500 = Schema.Union([InternalServerErrorEncoded, ErrorTrackingServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type ErrorTrackingUpdateErrorLabelRequestJson = { readonly "name"?: string | null, readonly "color"?: string | null }
export const ErrorTrackingUpdateErrorLabelRequestJson = Schema.Struct({ "name": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "color": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type ErrorTrackingUpdateErrorLabel200 = ErrorLabelEncoded
export const ErrorTrackingUpdateErrorLabel200 = ErrorLabelEncoded
export type ErrorTrackingUpdateErrorLabel401 = UnauthorizedErrorEncoded
export const ErrorTrackingUpdateErrorLabel401 = UnauthorizedErrorEncoded
export type ErrorTrackingUpdateErrorLabel403 = ForbiddenErrorEncoded
export const ErrorTrackingUpdateErrorLabel403 = ForbiddenErrorEncoded
export type ErrorTrackingUpdateErrorLabel404 = NotFoundErrorEncoded
export const ErrorTrackingUpdateErrorLabel404 = NotFoundErrorEncoded
export type ErrorTrackingUpdateErrorLabel500 = InternalServerErrorEncoded | ErrorTrackingServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const ErrorTrackingUpdateErrorLabel500 = Schema.Union([InternalServerErrorEncoded, ErrorTrackingServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type ErrorTrackingSetErrorLabelAssignmentsRequestJson = { readonly "labelIds": ReadonlyArray<string> }
export const ErrorTrackingSetErrorLabelAssignmentsRequestJson = Schema.Struct({ "labelIds": Schema.Array(Schema.String) })
export type ErrorTrackingSetErrorLabelAssignments401 = UnauthorizedErrorEncoded
export const ErrorTrackingSetErrorLabelAssignments401 = UnauthorizedErrorEncoded
export type ErrorTrackingSetErrorLabelAssignments403 = ForbiddenErrorEncoded
export const ErrorTrackingSetErrorLabelAssignments403 = ForbiddenErrorEncoded
export type ErrorTrackingSetErrorLabelAssignments404 = NotFoundErrorEncoded
export const ErrorTrackingSetErrorLabelAssignments404 = NotFoundErrorEncoded
export type ErrorTrackingSetErrorLabelAssignments500 = InternalServerErrorEncoded | ErrorTrackingServiceErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const ErrorTrackingSetErrorLabelAssignments500 = Schema.Union([InternalServerErrorEncoded, ErrorTrackingServiceErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type EventExplorerGetEventExplorerRowsParams = { readonly "templateId"?: "null" | string | null, readonly "mode"?: "events" | "errors" | "vitals" | "replays" | "feature-flags" | null, readonly "columns"?: string | ReadonlyArray<string> | null, readonly "page"?: string | null, readonly "pageSize"?: string | null, readonly "fromTime"?: string | null, readonly "toTime"?: string | null, readonly "snapshotTime"?: string | null, readonly "beforeId"?: string | null, readonly "beforeTime"?: string | null }
export const EventExplorerGetEventExplorerRowsParams = Schema.Struct({ "templateId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Literal("null"), Schema.String]), Schema.Null])), "mode": Schema.optionalKey(Schema.Union([Schema.Literals(["events", "errors", "vitals", "replays", "feature-flags"]), Schema.Null])), "columns": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Array(Schema.String)]), Schema.Null])), "page": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "pageSize": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "fromTime": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "toTime": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "snapshotTime": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "beforeId": Schema.optionalKey(Schema.Union([Schema.String.annotate({ "format": "uuid" }).check(Schema.isPattern(new RegExp("^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$", "u")).annotate({ "expected": "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$" })), Schema.Null])), "beforeTime": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type EventExplorerGetEventExplorerRows200 = EventExplorerResultEncoded
export const EventExplorerGetEventExplorerRows200 = EventExplorerResultEncoded
export type EventExplorerGetEventExplorerRows401 = UnauthorizedErrorEncoded
export const EventExplorerGetEventExplorerRows401 = UnauthorizedErrorEncoded
export type EventExplorerGetEventExplorerRows403 = ForbiddenErrorEncoded
export const EventExplorerGetEventExplorerRows403 = ForbiddenErrorEncoded
export type EventExplorerGetEventExplorerRows404 = NotFoundErrorEncoded
export const EventExplorerGetEventExplorerRows404 = NotFoundErrorEncoded
export type EventExplorerGetEventExplorerRows500 = InternalServerErrorEncoded
export const EventExplorerGetEventExplorerRows500 = InternalServerErrorEncoded
export type EventExplorerGetEventExplorerDetailParams = { readonly "templateId"?: "null" | string | null, readonly "mode"?: "events" | "errors" | "vitals" | "replays" | "feature-flags" | null, readonly "columns"?: string | ReadonlyArray<string> | null, readonly "timestamp": string }
export const EventExplorerGetEventExplorerDetailParams = Schema.Struct({ "templateId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Literal("null"), Schema.String]), Schema.Null])), "mode": Schema.optionalKey(Schema.Union([Schema.Literals(["events", "errors", "vitals", "replays", "feature-flags"]), Schema.Null])), "columns": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Array(Schema.String)]), Schema.Null])), "timestamp": Schema.String })
export type EventExplorerGetEventExplorerDetail200 = EventExplorerDetailEncoded
export const EventExplorerGetEventExplorerDetail200 = EventExplorerDetailEncoded
export type EventExplorerGetEventExplorerDetail401 = UnauthorizedErrorEncoded
export const EventExplorerGetEventExplorerDetail401 = UnauthorizedErrorEncoded
export type EventExplorerGetEventExplorerDetail403 = ForbiddenErrorEncoded
export const EventExplorerGetEventExplorerDetail403 = ForbiddenErrorEncoded
export type EventExplorerGetEventExplorerDetail404 = NotFoundErrorEncoded
export const EventExplorerGetEventExplorerDetail404 = NotFoundErrorEncoded
export type EventExplorerGetEventExplorerDetail500 = InternalServerErrorEncoded
export const EventExplorerGetEventExplorerDetail500 = InternalServerErrorEncoded
export type EventMarkersListEventMarkerCollections200 = ReadonlyArray<{ readonly "id": string, readonly "projectId": string, readonly "name": string, readonly "description": string | null, readonly "sourceType": "manual" | "download_analytics", readonly "sourceOptions": { readonly "downloadAnalytics"?: { readonly "providers"?: ReadonlyArray<string> | null, readonly "versionPattern"?: string | null, readonly "channel"?: string | null } | null } | null, readonly "defaultIcon": string | null, readonly "defaultEmoji": string | null, readonly "defaultColor": string | null, readonly "grouping": "auto" | "minute" | "hour" | "day" | "week" | "chart_bucket", readonly "visibility": "private" | "project" | "public", readonly "createdAt": string | string, readonly "updatedAt": string | string }>
export const EventMarkersListEventMarkerCollections200 = Schema.Array(Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "name": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "sourceType": Schema.Literals(["manual", "download_analytics"]), "sourceOptions": Schema.Union([Schema.Struct({ "downloadAnalytics": Schema.optionalKey(Schema.Union([Schema.Struct({ "providers": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "versionPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "channel": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])) }), Schema.Null]), "defaultIcon": Schema.Union([Schema.String, Schema.Null]), "defaultEmoji": Schema.Union([Schema.String, Schema.Null]), "defaultColor": Schema.Union([Schema.String, Schema.Null]), "grouping": Schema.Literals(["auto", "minute", "hour", "day", "week", "chart_bucket"]), "visibility": Schema.Literals(["private", "project", "public"]), "createdAt": Schema.Union([Schema.String, Schema.String]), "updatedAt": Schema.Union([Schema.String, Schema.String]) }))
export type EventMarkersListEventMarkerCollections400 = EventMarkerValidationErrorEncoded
export const EventMarkersListEventMarkerCollections400 = EventMarkerValidationErrorEncoded
export type EventMarkersListEventMarkerCollections401 = UnauthorizedErrorEncoded
export const EventMarkersListEventMarkerCollections401 = UnauthorizedErrorEncoded
export type EventMarkersListEventMarkerCollections403 = ForbiddenErrorEncoded
export const EventMarkersListEventMarkerCollections403 = ForbiddenErrorEncoded
export type EventMarkersListEventMarkerCollections404 = NotFoundErrorEncoded
export const EventMarkersListEventMarkerCollections404 = NotFoundErrorEncoded
export type EventMarkersListEventMarkerCollections500 = InternalServerErrorEncoded
export const EventMarkersListEventMarkerCollections500 = InternalServerErrorEncoded
export type EventMarkersCreateEventMarkerCollectionRequestJson = { readonly "name": string, readonly "description"?: string | null | null, readonly "sourceType"?: "manual" | "download_analytics" | null, readonly "sourceOptions"?: { readonly "downloadAnalytics"?: { readonly "providers"?: ReadonlyArray<string> | null, readonly "versionPattern"?: string | null, readonly "channel"?: string | null } | null } | null | null, readonly "defaultIcon"?: string | null | null, readonly "defaultEmoji"?: string | null | null, readonly "defaultColor"?: string | null | null, readonly "grouping"?: "auto" | "minute" | "hour" | "day" | "week" | "chart_bucket" | null, readonly "visibility"?: "private" | "project" | "public" | null }
export const EventMarkersCreateEventMarkerCollectionRequestJson = Schema.Struct({ "name": Schema.String, "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "sourceType": Schema.optionalKey(Schema.Union([Schema.Literals(["manual", "download_analytics"]), Schema.Null])), "sourceOptions": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Struct({ "downloadAnalytics": Schema.optionalKey(Schema.Union([Schema.Struct({ "providers": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "versionPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "channel": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])) }), Schema.Null]), Schema.Null])), "defaultIcon": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "defaultEmoji": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "defaultColor": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "grouping": Schema.optionalKey(Schema.Union([Schema.Literals(["auto", "minute", "hour", "day", "week", "chart_bucket"]), Schema.Null])), "visibility": Schema.optionalKey(Schema.Union([Schema.Literals(["private", "project", "public"]), Schema.Null])) })
export type EventMarkersCreateEventMarkerCollection200 = { readonly "id": string, readonly "projectId": string, readonly "name": string, readonly "description": string | null, readonly "sourceType": "manual" | "download_analytics", readonly "sourceOptions": { readonly "downloadAnalytics"?: { readonly "providers"?: ReadonlyArray<string> | null, readonly "versionPattern"?: string | null, readonly "channel"?: string | null } | null } | null, readonly "defaultIcon": string | null, readonly "defaultEmoji": string | null, readonly "defaultColor": string | null, readonly "grouping": "auto" | "minute" | "hour" | "day" | "week" | "chart_bucket", readonly "visibility": "private" | "project" | "public", readonly "createdAt": string | string, readonly "updatedAt": string | string }
export const EventMarkersCreateEventMarkerCollection200 = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "name": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "sourceType": Schema.Literals(["manual", "download_analytics"]), "sourceOptions": Schema.Union([Schema.Struct({ "downloadAnalytics": Schema.optionalKey(Schema.Union([Schema.Struct({ "providers": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "versionPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "channel": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])) }), Schema.Null]), "defaultIcon": Schema.Union([Schema.String, Schema.Null]), "defaultEmoji": Schema.Union([Schema.String, Schema.Null]), "defaultColor": Schema.Union([Schema.String, Schema.Null]), "grouping": Schema.Literals(["auto", "minute", "hour", "day", "week", "chart_bucket"]), "visibility": Schema.Literals(["private", "project", "public"]), "createdAt": Schema.Union([Schema.String, Schema.String]), "updatedAt": Schema.Union([Schema.String, Schema.String]) })
export type EventMarkersCreateEventMarkerCollection400 = EventMarkerValidationErrorEncoded
export const EventMarkersCreateEventMarkerCollection400 = EventMarkerValidationErrorEncoded
export type EventMarkersCreateEventMarkerCollection401 = UnauthorizedErrorEncoded
export const EventMarkersCreateEventMarkerCollection401 = UnauthorizedErrorEncoded
export type EventMarkersCreateEventMarkerCollection403 = ForbiddenErrorEncoded
export const EventMarkersCreateEventMarkerCollection403 = ForbiddenErrorEncoded
export type EventMarkersCreateEventMarkerCollection404 = NotFoundErrorEncoded
export const EventMarkersCreateEventMarkerCollection404 = NotFoundErrorEncoded
export type EventMarkersCreateEventMarkerCollection500 = InternalServerErrorEncoded
export const EventMarkersCreateEventMarkerCollection500 = InternalServerErrorEncoded
export type EventMarkersDeleteEventMarkerCollection400 = EventMarkerValidationErrorEncoded
export const EventMarkersDeleteEventMarkerCollection400 = EventMarkerValidationErrorEncoded
export type EventMarkersDeleteEventMarkerCollection401 = UnauthorizedErrorEncoded
export const EventMarkersDeleteEventMarkerCollection401 = UnauthorizedErrorEncoded
export type EventMarkersDeleteEventMarkerCollection403 = ForbiddenErrorEncoded
export const EventMarkersDeleteEventMarkerCollection403 = ForbiddenErrorEncoded
export type EventMarkersDeleteEventMarkerCollection404 = NotFoundErrorEncoded
export const EventMarkersDeleteEventMarkerCollection404 = NotFoundErrorEncoded
export type EventMarkersDeleteEventMarkerCollection500 = InternalServerErrorEncoded
export const EventMarkersDeleteEventMarkerCollection500 = InternalServerErrorEncoded
export type EventMarkersUpdateEventMarkerCollectionRequestJson = { readonly "name"?: string | null, readonly "description"?: string | null | null, readonly "sourceOptions"?: { readonly "downloadAnalytics"?: { readonly "providers"?: ReadonlyArray<string> | null, readonly "versionPattern"?: string | null, readonly "channel"?: string | null } | null } | null | null, readonly "defaultIcon"?: string | null | null, readonly "defaultEmoji"?: string | null | null, readonly "defaultColor"?: string | null | null, readonly "grouping"?: "auto" | "minute" | "hour" | "day" | "week" | "chart_bucket" | null, readonly "visibility"?: "private" | "project" | "public" | null }
export const EventMarkersUpdateEventMarkerCollectionRequestJson = Schema.Struct({ "name": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "sourceOptions": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Struct({ "downloadAnalytics": Schema.optionalKey(Schema.Union([Schema.Struct({ "providers": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "versionPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "channel": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])) }), Schema.Null]), Schema.Null])), "defaultIcon": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "defaultEmoji": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "defaultColor": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "grouping": Schema.optionalKey(Schema.Union([Schema.Literals(["auto", "minute", "hour", "day", "week", "chart_bucket"]), Schema.Null])), "visibility": Schema.optionalKey(Schema.Union([Schema.Literals(["private", "project", "public"]), Schema.Null])) })
export type EventMarkersUpdateEventMarkerCollection200 = { readonly "id": string, readonly "projectId": string, readonly "name": string, readonly "description": string | null, readonly "sourceType": "manual" | "download_analytics", readonly "sourceOptions": { readonly "downloadAnalytics"?: { readonly "providers"?: ReadonlyArray<string> | null, readonly "versionPattern"?: string | null, readonly "channel"?: string | null } | null } | null, readonly "defaultIcon": string | null, readonly "defaultEmoji": string | null, readonly "defaultColor": string | null, readonly "grouping": "auto" | "minute" | "hour" | "day" | "week" | "chart_bucket", readonly "visibility": "private" | "project" | "public", readonly "createdAt": string | string, readonly "updatedAt": string | string }
export const EventMarkersUpdateEventMarkerCollection200 = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "name": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "sourceType": Schema.Literals(["manual", "download_analytics"]), "sourceOptions": Schema.Union([Schema.Struct({ "downloadAnalytics": Schema.optionalKey(Schema.Union([Schema.Struct({ "providers": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "versionPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "channel": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])) }), Schema.Null]), "defaultIcon": Schema.Union([Schema.String, Schema.Null]), "defaultEmoji": Schema.Union([Schema.String, Schema.Null]), "defaultColor": Schema.Union([Schema.String, Schema.Null]), "grouping": Schema.Literals(["auto", "minute", "hour", "day", "week", "chart_bucket"]), "visibility": Schema.Literals(["private", "project", "public"]), "createdAt": Schema.Union([Schema.String, Schema.String]), "updatedAt": Schema.Union([Schema.String, Schema.String]) })
export type EventMarkersUpdateEventMarkerCollection400 = EventMarkerValidationErrorEncoded
export const EventMarkersUpdateEventMarkerCollection400 = EventMarkerValidationErrorEncoded
export type EventMarkersUpdateEventMarkerCollection401 = UnauthorizedErrorEncoded
export const EventMarkersUpdateEventMarkerCollection401 = UnauthorizedErrorEncoded
export type EventMarkersUpdateEventMarkerCollection403 = ForbiddenErrorEncoded
export const EventMarkersUpdateEventMarkerCollection403 = ForbiddenErrorEncoded
export type EventMarkersUpdateEventMarkerCollection404 = NotFoundErrorEncoded
export const EventMarkersUpdateEventMarkerCollection404 = NotFoundErrorEncoded
export type EventMarkersUpdateEventMarkerCollection500 = InternalServerErrorEncoded
export const EventMarkersUpdateEventMarkerCollection500 = InternalServerErrorEncoded
export type EventMarkersListEventMarkersParams = { readonly "from"?: string | null, readonly "to"?: string | null, readonly "limit"?: string | null }
export const EventMarkersListEventMarkersParams = Schema.Struct({ "from": Schema.optionalKey(Schema.Union([Schema.String.annotate({ "description": "Inclusive start of the time range. Event time as an ISO 8601 string, Unix seconds, or Unix milliseconds. Values below 1_000_000_000_000 are interpreted as seconds." }), Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String.annotate({ "description": "Inclusive end of the time range. Event time as an ISO 8601 string, Unix seconds, or Unix milliseconds. Values below 1_000_000_000_000 are interpreted as seconds." }), Schema.Null])), "limit": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type EventMarkersListEventMarkers200 = ReadonlyArray<{ readonly "id": string, readonly "projectId": string, readonly "collectionId": string, readonly "timestamp": string | string, readonly "title": string, readonly "description": string | null, readonly "icon": string | null, readonly "emoji": string | null, readonly "color": string | null, readonly "metadata": { readonly [x: string]: Schema.Json } | null, readonly "externalId": string | null, readonly "createdAt": string | string, readonly "updatedAt": string | string }>
export const EventMarkersListEventMarkers200 = Schema.Array(Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "collectionId": Schema.String, "timestamp": Schema.Union([Schema.String, Schema.String]), "title": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "icon": Schema.Union([Schema.String, Schema.Null]), "emoji": Schema.Union([Schema.String, Schema.Null]), "color": Schema.Union([Schema.String, Schema.Null]), "metadata": Schema.Union([Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })), Schema.Null]), "externalId": Schema.Union([Schema.String, Schema.Null]), "createdAt": Schema.Union([Schema.String, Schema.String]), "updatedAt": Schema.Union([Schema.String, Schema.String]) }))
export type EventMarkersListEventMarkers400 = EventMarkerValidationErrorEncoded
export const EventMarkersListEventMarkers400 = EventMarkerValidationErrorEncoded
export type EventMarkersListEventMarkers401 = UnauthorizedErrorEncoded
export const EventMarkersListEventMarkers401 = UnauthorizedErrorEncoded
export type EventMarkersListEventMarkers403 = ForbiddenErrorEncoded
export const EventMarkersListEventMarkers403 = ForbiddenErrorEncoded
export type EventMarkersListEventMarkers404 = NotFoundErrorEncoded
export const EventMarkersListEventMarkers404 = NotFoundErrorEncoded
export type EventMarkersListEventMarkers500 = InternalServerErrorEncoded
export const EventMarkersListEventMarkers500 = InternalServerErrorEncoded
export type EventMarkersCreateEventMarkerRequestJson = { readonly "timestamp": EventMarkerTimestampInput, readonly "title": string, readonly "description"?: string | null | null, readonly "icon"?: string | null | null, readonly "emoji"?: string | null | null, readonly "color"?: string | null | null, readonly "metadata"?: { readonly [x: string]: Schema.Json } | null | null, readonly "externalId"?: string | null | null }
export const EventMarkersCreateEventMarkerRequestJson = Schema.Struct({ "timestamp": EventMarkerTimestampInput, "title": Schema.String, "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "icon": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "emoji": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "metadata": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })), Schema.Null]), Schema.Null])), "externalId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String.annotate({ "description": "Optional stable identifier. When provided, duplicate values upsert the existing marker in the collection." }), Schema.Null]), Schema.Null])) })
export type EventMarkersCreateEventMarker200 = { readonly "id": string, readonly "projectId": string, readonly "collectionId": string, readonly "timestamp": string | string, readonly "title": string, readonly "description": string | null, readonly "icon": string | null, readonly "emoji": string | null, readonly "color": string | null, readonly "metadata": { readonly [x: string]: Schema.Json } | null, readonly "externalId": string | null, readonly "createdAt": string | string, readonly "updatedAt": string | string }
export const EventMarkersCreateEventMarker200 = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "collectionId": Schema.String, "timestamp": Schema.Union([Schema.String, Schema.String]), "title": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "icon": Schema.Union([Schema.String, Schema.Null]), "emoji": Schema.Union([Schema.String, Schema.Null]), "color": Schema.Union([Schema.String, Schema.Null]), "metadata": Schema.Union([Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })), Schema.Null]), "externalId": Schema.Union([Schema.String, Schema.Null]), "createdAt": Schema.Union([Schema.String, Schema.String]), "updatedAt": Schema.Union([Schema.String, Schema.String]) })
export type EventMarkersCreateEventMarker400 = EventMarkerValidationErrorEncoded
export const EventMarkersCreateEventMarker400 = EventMarkerValidationErrorEncoded
export type EventMarkersCreateEventMarker401 = UnauthorizedErrorEncoded
export const EventMarkersCreateEventMarker401 = UnauthorizedErrorEncoded
export type EventMarkersCreateEventMarker403 = ForbiddenErrorEncoded
export const EventMarkersCreateEventMarker403 = ForbiddenErrorEncoded
export type EventMarkersCreateEventMarker404 = NotFoundErrorEncoded
export const EventMarkersCreateEventMarker404 = NotFoundErrorEncoded
export type EventMarkersCreateEventMarker500 = InternalServerErrorEncoded
export const EventMarkersCreateEventMarker500 = InternalServerErrorEncoded
export type EventMarkersBulkCreateEventMarkersRequestJson = { readonly "events": ReadonlyArray<{ readonly "timestamp": EventMarkerTimestampInput, readonly "title": string, readonly "description"?: string | null | null, readonly "icon"?: string | null | null, readonly "emoji"?: string | null | null, readonly "color"?: string | null | null, readonly "metadata"?: { readonly [x: string]: Schema.Json } | null | null, readonly "externalId"?: string | null | null }> }
export const EventMarkersBulkCreateEventMarkersRequestJson = Schema.Struct({ "events": Schema.Array(Schema.Struct({ "timestamp": EventMarkerTimestampInput, "title": Schema.String, "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "icon": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "emoji": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "metadata": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })), Schema.Null]), Schema.Null])), "externalId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String.annotate({ "description": "Optional stable identifier. When provided, duplicate values upsert the existing marker in the collection." }), Schema.Null]), Schema.Null])) })) })
export type EventMarkersBulkCreateEventMarkers200 = ReadonlyArray<{ readonly "id": string, readonly "projectId": string, readonly "collectionId": string, readonly "timestamp": string | string, readonly "title": string, readonly "description": string | null, readonly "icon": string | null, readonly "emoji": string | null, readonly "color": string | null, readonly "metadata": { readonly [x: string]: Schema.Json } | null, readonly "externalId": string | null, readonly "createdAt": string | string, readonly "updatedAt": string | string }>
export const EventMarkersBulkCreateEventMarkers200 = Schema.Array(Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "collectionId": Schema.String, "timestamp": Schema.Union([Schema.String, Schema.String]), "title": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "icon": Schema.Union([Schema.String, Schema.Null]), "emoji": Schema.Union([Schema.String, Schema.Null]), "color": Schema.Union([Schema.String, Schema.Null]), "metadata": Schema.Union([Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })), Schema.Null]), "externalId": Schema.Union([Schema.String, Schema.Null]), "createdAt": Schema.Union([Schema.String, Schema.String]), "updatedAt": Schema.Union([Schema.String, Schema.String]) }))
export type EventMarkersBulkCreateEventMarkers400 = EventMarkerValidationErrorEncoded
export const EventMarkersBulkCreateEventMarkers400 = EventMarkerValidationErrorEncoded
export type EventMarkersBulkCreateEventMarkers401 = UnauthorizedErrorEncoded
export const EventMarkersBulkCreateEventMarkers401 = UnauthorizedErrorEncoded
export type EventMarkersBulkCreateEventMarkers403 = ForbiddenErrorEncoded
export const EventMarkersBulkCreateEventMarkers403 = ForbiddenErrorEncoded
export type EventMarkersBulkCreateEventMarkers404 = NotFoundErrorEncoded
export const EventMarkersBulkCreateEventMarkers404 = NotFoundErrorEncoded
export type EventMarkersBulkCreateEventMarkers500 = InternalServerErrorEncoded
export const EventMarkersBulkCreateEventMarkers500 = InternalServerErrorEncoded
export type EventMarkersDeleteEventMarker400 = EventMarkerValidationErrorEncoded
export const EventMarkersDeleteEventMarker400 = EventMarkerValidationErrorEncoded
export type EventMarkersDeleteEventMarker401 = UnauthorizedErrorEncoded
export const EventMarkersDeleteEventMarker401 = UnauthorizedErrorEncoded
export type EventMarkersDeleteEventMarker403 = ForbiddenErrorEncoded
export const EventMarkersDeleteEventMarker403 = ForbiddenErrorEncoded
export type EventMarkersDeleteEventMarker404 = NotFoundErrorEncoded
export const EventMarkersDeleteEventMarker404 = NotFoundErrorEncoded
export type EventMarkersDeleteEventMarker500 = InternalServerErrorEncoded
export const EventMarkersDeleteEventMarker500 = InternalServerErrorEncoded
export type EventMarkersUpdateEventMarkerRequestJson = { readonly "timestamp"?: EventMarkerTimestampInput | null, readonly "title"?: string | null, readonly "description"?: string | null | null, readonly "icon"?: string | null | null, readonly "emoji"?: string | null | null, readonly "color"?: string | null | null, readonly "metadata"?: { readonly [x: string]: Schema.Json } | null | null, readonly "externalId"?: string | null | null }
export const EventMarkersUpdateEventMarkerRequestJson = Schema.Struct({ "timestamp": Schema.optionalKey(Schema.Union([EventMarkerTimestampInput, Schema.Null])), "title": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "icon": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "emoji": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "metadata": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })), Schema.Null]), Schema.Null])), "externalId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])) })
export type EventMarkersUpdateEventMarker200 = { readonly "id": string, readonly "projectId": string, readonly "collectionId": string, readonly "timestamp": string | string, readonly "title": string, readonly "description": string | null, readonly "icon": string | null, readonly "emoji": string | null, readonly "color": string | null, readonly "metadata": { readonly [x: string]: Schema.Json } | null, readonly "externalId": string | null, readonly "createdAt": string | string, readonly "updatedAt": string | string }
export const EventMarkersUpdateEventMarker200 = Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "collectionId": Schema.String, "timestamp": Schema.Union([Schema.String, Schema.String]), "title": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "icon": Schema.Union([Schema.String, Schema.Null]), "emoji": Schema.Union([Schema.String, Schema.Null]), "color": Schema.Union([Schema.String, Schema.Null]), "metadata": Schema.Union([Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })), Schema.Null]), "externalId": Schema.Union([Schema.String, Schema.Null]), "createdAt": Schema.Union([Schema.String, Schema.String]), "updatedAt": Schema.Union([Schema.String, Schema.String]) })
export type EventMarkersUpdateEventMarker400 = EventMarkerValidationErrorEncoded
export const EventMarkersUpdateEventMarker400 = EventMarkerValidationErrorEncoded
export type EventMarkersUpdateEventMarker401 = UnauthorizedErrorEncoded
export const EventMarkersUpdateEventMarker401 = UnauthorizedErrorEncoded
export type EventMarkersUpdateEventMarker403 = ForbiddenErrorEncoded
export const EventMarkersUpdateEventMarker403 = ForbiddenErrorEncoded
export type EventMarkersUpdateEventMarker404 = NotFoundErrorEncoded
export const EventMarkersUpdateEventMarker404 = NotFoundErrorEncoded
export type EventMarkersUpdateEventMarker500 = InternalServerErrorEncoded
export const EventMarkersUpdateEventMarker500 = InternalServerErrorEncoded
export type FeatureFlagsListFeatureFlags200 = ReadonlyArray<FeatureFlagRecordEncoded>
export const FeatureFlagsListFeatureFlags200 = Schema.Array(FeatureFlagRecordEncoded)
export type FeatureFlagsListFeatureFlags400 = FeatureFlagValidationErrorEncoded
export const FeatureFlagsListFeatureFlags400 = FeatureFlagValidationErrorEncoded
export type FeatureFlagsListFeatureFlags401 = UnauthorizedErrorEncoded
export const FeatureFlagsListFeatureFlags401 = UnauthorizedErrorEncoded
export type FeatureFlagsListFeatureFlags403 = ForbiddenErrorEncoded
export const FeatureFlagsListFeatureFlags403 = ForbiddenErrorEncoded
export type FeatureFlagsListFeatureFlags404 = NotFoundErrorEncoded
export const FeatureFlagsListFeatureFlags404 = NotFoundErrorEncoded
export type FeatureFlagsListFeatureFlags500 = InternalServerErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const FeatureFlagsListFeatureFlags500 = Schema.Union([InternalServerErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type FeatureFlagsCreateFeatureFlagRequestJson = { readonly "key": string, readonly "name": string, readonly "description"?: string | null | null, readonly "type": "boolean" | "string" | "number" | "json", readonly "variants"?: ReadonlyArray<{ readonly "key": string, readonly "name": string | null, readonly "value": string }> | null }
export const FeatureFlagsCreateFeatureFlagRequestJson = Schema.Struct({ "key": Schema.String, "name": Schema.String, "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "type": Schema.Literals(["boolean", "string", "number", "json"]), "variants": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "key": Schema.String, "name": Schema.Union([Schema.String, Schema.Null]), "value": Schema.String })), Schema.Null])) })
export type FeatureFlagsCreateFeatureFlag200 = FeatureFlagRecordEncoded
export const FeatureFlagsCreateFeatureFlag200 = FeatureFlagRecordEncoded
export type FeatureFlagsCreateFeatureFlag400 = FeatureFlagValidationErrorEncoded
export const FeatureFlagsCreateFeatureFlag400 = FeatureFlagValidationErrorEncoded
export type FeatureFlagsCreateFeatureFlag401 = UnauthorizedErrorEncoded
export const FeatureFlagsCreateFeatureFlag401 = UnauthorizedErrorEncoded
export type FeatureFlagsCreateFeatureFlag403 = ForbiddenErrorEncoded
export const FeatureFlagsCreateFeatureFlag403 = ForbiddenErrorEncoded
export type FeatureFlagsCreateFeatureFlag404 = NotFoundErrorEncoded
export const FeatureFlagsCreateFeatureFlag404 = NotFoundErrorEncoded
export type FeatureFlagsCreateFeatureFlag500 = InternalServerErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const FeatureFlagsCreateFeatureFlag500 = Schema.Union([InternalServerErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type FeatureFlagsDeleteFeatureFlag400 = FeatureFlagValidationErrorEncoded
export const FeatureFlagsDeleteFeatureFlag400 = FeatureFlagValidationErrorEncoded
export type FeatureFlagsDeleteFeatureFlag401 = UnauthorizedErrorEncoded
export const FeatureFlagsDeleteFeatureFlag401 = UnauthorizedErrorEncoded
export type FeatureFlagsDeleteFeatureFlag403 = ForbiddenErrorEncoded
export const FeatureFlagsDeleteFeatureFlag403 = ForbiddenErrorEncoded
export type FeatureFlagsDeleteFeatureFlag404 = NotFoundErrorEncoded
export const FeatureFlagsDeleteFeatureFlag404 = NotFoundErrorEncoded
export type FeatureFlagsDeleteFeatureFlag500 = InternalServerErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const FeatureFlagsDeleteFeatureFlag500 = Schema.Union([InternalServerErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type FeatureFlagsUpdateFeatureFlagRequestJson = { readonly "version": number | "Infinity" | "-Infinity" | "NaN", readonly "name"?: string | null, readonly "description"?: string | null | null, readonly "enabled"?: boolean | null, readonly "archived"?: boolean | null, readonly "config"?: { readonly "variants": ReadonlyArray<{ readonly "key": string, readonly "name": string | null, readonly "value": string }>, readonly "offVariant": string, readonly "fallthrough": { readonly "variant": string | null, readonly "rollout": ReadonlyArray<{ readonly "variant": string, readonly "weight": number | "Infinity" | "-Infinity" | "NaN" }> }, readonly "rules": ReadonlyArray<{ readonly "id"?: string | null, readonly "name": string | null, readonly "conditions": ReadonlyArray<{ readonly "attribute": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "starts_with" | "ends_with" | "matches_regex" | "greater_than" | "greater_or_equal" | "less_than" | "less_or_equal" | "semver_equals" | "semver_greater_than" | "semver_greater_or_equal" | "semver_less_than" | "semver_less_or_equal" | "before" | "after" | "exists" | "not_exists" | "in_segment" | "not_in_segment", readonly "values": ReadonlyArray<string> }>, readonly "serve": { readonly "variant": string | null, readonly "rollout": ReadonlyArray<{ readonly "variant": string, readonly "weight": number | "Infinity" | "-Infinity" | "NaN" }> } }>, readonly "targets": ReadonlyArray<{ readonly "kind": "identifier" | "user", readonly "value": string, readonly "variant": string }>, readonly "prerequisites": ReadonlyArray<{ readonly "flagKey": string, readonly "variant": string }> } | null }
export const FeatureFlagsUpdateFeatureFlagRequestJson = Schema.Struct({ "version": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "name": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "enabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "archived": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "config": Schema.optionalKey(Schema.Union([Schema.Struct({ "variants": Schema.Array(Schema.Struct({ "key": Schema.String, "name": Schema.Union([Schema.String, Schema.Null]), "value": Schema.String })), "offVariant": Schema.String, "fallthrough": Schema.Struct({ "variant": Schema.Union([Schema.String, Schema.Null]), "rollout": Schema.Array(Schema.Struct({ "variant": Schema.String, "weight": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })) }), "rules": Schema.Array(Schema.Struct({ "id": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "name": Schema.Union([Schema.String, Schema.Null]), "conditions": Schema.Array(Schema.Struct({ "attribute": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "starts_with", "ends_with", "matches_regex", "greater_than", "greater_or_equal", "less_than", "less_or_equal", "semver_equals", "semver_greater_than", "semver_greater_or_equal", "semver_less_than", "semver_less_or_equal", "before", "after", "exists", "not_exists", "in_segment", "not_in_segment"]), "values": Schema.Array(Schema.String) })), "serve": Schema.Struct({ "variant": Schema.Union([Schema.String, Schema.Null]), "rollout": Schema.Array(Schema.Struct({ "variant": Schema.String, "weight": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })) }) })), "targets": Schema.Array(Schema.Struct({ "kind": Schema.Literals(["identifier", "user"]), "value": Schema.String, "variant": Schema.String })), "prerequisites": Schema.Array(Schema.Struct({ "flagKey": Schema.String, "variant": Schema.String })) }), Schema.Null])) })
export type FeatureFlagsUpdateFeatureFlag200 = FeatureFlagRecordEncoded
export const FeatureFlagsUpdateFeatureFlag200 = FeatureFlagRecordEncoded
export type FeatureFlagsUpdateFeatureFlag400 = FeatureFlagValidationErrorEncoded
export const FeatureFlagsUpdateFeatureFlag400 = FeatureFlagValidationErrorEncoded
export type FeatureFlagsUpdateFeatureFlag401 = UnauthorizedErrorEncoded
export const FeatureFlagsUpdateFeatureFlag401 = UnauthorizedErrorEncoded
export type FeatureFlagsUpdateFeatureFlag403 = ForbiddenErrorEncoded
export const FeatureFlagsUpdateFeatureFlag403 = ForbiddenErrorEncoded
export type FeatureFlagsUpdateFeatureFlag404 = NotFoundErrorEncoded
export const FeatureFlagsUpdateFeatureFlag404 = NotFoundErrorEncoded
export type FeatureFlagsUpdateFeatureFlag500 = InternalServerErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const FeatureFlagsUpdateFeatureFlag500 = Schema.Union([InternalServerErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type FeatureFlagsReshuffleFeatureFlagRollout200 = FeatureFlagRecordEncoded
export const FeatureFlagsReshuffleFeatureFlagRollout200 = FeatureFlagRecordEncoded
export type FeatureFlagsReshuffleFeatureFlagRollout400 = FeatureFlagValidationErrorEncoded
export const FeatureFlagsReshuffleFeatureFlagRollout400 = FeatureFlagValidationErrorEncoded
export type FeatureFlagsReshuffleFeatureFlagRollout401 = UnauthorizedErrorEncoded
export const FeatureFlagsReshuffleFeatureFlagRollout401 = UnauthorizedErrorEncoded
export type FeatureFlagsReshuffleFeatureFlagRollout403 = ForbiddenErrorEncoded
export const FeatureFlagsReshuffleFeatureFlagRollout403 = ForbiddenErrorEncoded
export type FeatureFlagsReshuffleFeatureFlagRollout404 = NotFoundErrorEncoded
export const FeatureFlagsReshuffleFeatureFlagRollout404 = NotFoundErrorEncoded
export type FeatureFlagsReshuffleFeatureFlagRollout500 = InternalServerErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const FeatureFlagsReshuffleFeatureFlagRollout500 = Schema.Union([InternalServerErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type FeatureFlagsGetFeatureFlagActivity200 = ReadonlyArray<FeatureFlagActivityRecordEncoded>
export const FeatureFlagsGetFeatureFlagActivity200 = Schema.Array(FeatureFlagActivityRecordEncoded)
export type FeatureFlagsGetFeatureFlagActivity400 = FeatureFlagValidationErrorEncoded
export const FeatureFlagsGetFeatureFlagActivity400 = FeatureFlagValidationErrorEncoded
export type FeatureFlagsGetFeatureFlagActivity401 = UnauthorizedErrorEncoded
export const FeatureFlagsGetFeatureFlagActivity401 = UnauthorizedErrorEncoded
export type FeatureFlagsGetFeatureFlagActivity403 = ForbiddenErrorEncoded
export const FeatureFlagsGetFeatureFlagActivity403 = ForbiddenErrorEncoded
export type FeatureFlagsGetFeatureFlagActivity404 = NotFoundErrorEncoded
export const FeatureFlagsGetFeatureFlagActivity404 = NotFoundErrorEncoded
export type FeatureFlagsGetFeatureFlagActivity500 = InternalServerErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const FeatureFlagsGetFeatureFlagActivity500 = Schema.Union([InternalServerErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type FeatureFlagsGetFeatureFlagExposureParams = { readonly "fromTime"?: string | "Infinity" | "-Infinity" | "NaN" | null, readonly "toTime"?: string | "Infinity" | "-Infinity" | "NaN" | null }
export const FeatureFlagsGetFeatureFlagExposureParams = Schema.Struct({ "fromTime": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String.check(Schema.isPattern(new RegExp("^[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?$", "u")).annotate({ "expected": "a string matching the RegExp ^[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?$" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "toTime": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String.check(Schema.isPattern(new RegExp("^[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?$", "u")).annotate({ "expected": "a string matching the RegExp ^[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?$" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) })
export type FeatureFlagsGetFeatureFlagExposure200 = FeatureFlagExposureEncoded
export const FeatureFlagsGetFeatureFlagExposure200 = FeatureFlagExposureEncoded
export type FeatureFlagsGetFeatureFlagExposure400 = FeatureFlagValidationErrorEncoded
export const FeatureFlagsGetFeatureFlagExposure400 = FeatureFlagValidationErrorEncoded
export type FeatureFlagsGetFeatureFlagExposure401 = UnauthorizedErrorEncoded
export const FeatureFlagsGetFeatureFlagExposure401 = UnauthorizedErrorEncoded
export type FeatureFlagsGetFeatureFlagExposure403 = ForbiddenErrorEncoded
export const FeatureFlagsGetFeatureFlagExposure403 = ForbiddenErrorEncoded
export type FeatureFlagsGetFeatureFlagExposure404 = NotFoundErrorEncoded
export const FeatureFlagsGetFeatureFlagExposure404 = NotFoundErrorEncoded
export type FeatureFlagsGetFeatureFlagExposure500 = InternalServerErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const FeatureFlagsGetFeatureFlagExposure500 = Schema.Union([InternalServerErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type FeatureFlagsGetFeatureFlagSeriesParams = { readonly "fromTime"?: string | "Infinity" | "-Infinity" | "NaN" | null, readonly "toTime"?: string | "Infinity" | "-Infinity" | "NaN" | null }
export const FeatureFlagsGetFeatureFlagSeriesParams = Schema.Struct({ "fromTime": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String.check(Schema.isPattern(new RegExp("^[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?$", "u")).annotate({ "expected": "a string matching the RegExp ^[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?$" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "toTime": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String.check(Schema.isPattern(new RegExp("^[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?$", "u")).annotate({ "expected": "a string matching the RegExp ^[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?$" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) })
export type FeatureFlagsGetFeatureFlagSeries200 = FeatureFlagSeriesEncoded
export const FeatureFlagsGetFeatureFlagSeries200 = FeatureFlagSeriesEncoded
export type FeatureFlagsGetFeatureFlagSeries400 = FeatureFlagValidationErrorEncoded
export const FeatureFlagsGetFeatureFlagSeries400 = FeatureFlagValidationErrorEncoded
export type FeatureFlagsGetFeatureFlagSeries401 = UnauthorizedErrorEncoded
export const FeatureFlagsGetFeatureFlagSeries401 = UnauthorizedErrorEncoded
export type FeatureFlagsGetFeatureFlagSeries403 = ForbiddenErrorEncoded
export const FeatureFlagsGetFeatureFlagSeries403 = ForbiddenErrorEncoded
export type FeatureFlagsGetFeatureFlagSeries404 = NotFoundErrorEncoded
export const FeatureFlagsGetFeatureFlagSeries404 = NotFoundErrorEncoded
export type FeatureFlagsGetFeatureFlagSeries500 = InternalServerErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const FeatureFlagsGetFeatureFlagSeries500 = Schema.Union([InternalServerErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type FeatureFlagsListFeatureFlagEvaluationsParams = { readonly "fromTime"?: string | "Infinity" | "-Infinity" | "NaN" | null, readonly "toTime"?: string | "Infinity" | "-Infinity" | "NaN" | null, readonly "limit"?: string | "Infinity" | "-Infinity" | "NaN" | null, readonly "offset"?: string | "Infinity" | "-Infinity" | "NaN" | null }
export const FeatureFlagsListFeatureFlagEvaluationsParams = Schema.Struct({ "fromTime": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String.check(Schema.isPattern(new RegExp("^[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?$", "u")).annotate({ "expected": "a string matching the RegExp ^[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?$" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "toTime": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String.check(Schema.isPattern(new RegExp("^[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?$", "u")).annotate({ "expected": "a string matching the RegExp ^[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?$" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "limit": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String.check(Schema.isPattern(new RegExp("^[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?$", "u")).annotate({ "expected": "a string matching the RegExp ^[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?$" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "offset": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String.check(Schema.isPattern(new RegExp("^[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?$", "u")).annotate({ "expected": "a string matching the RegExp ^[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?$" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) })
export type FeatureFlagsListFeatureFlagEvaluations200 = FeatureFlagEvaluationPageEncoded
export const FeatureFlagsListFeatureFlagEvaluations200 = FeatureFlagEvaluationPageEncoded
export type FeatureFlagsListFeatureFlagEvaluations400 = FeatureFlagValidationErrorEncoded
export const FeatureFlagsListFeatureFlagEvaluations400 = FeatureFlagValidationErrorEncoded
export type FeatureFlagsListFeatureFlagEvaluations401 = UnauthorizedErrorEncoded
export const FeatureFlagsListFeatureFlagEvaluations401 = UnauthorizedErrorEncoded
export type FeatureFlagsListFeatureFlagEvaluations403 = ForbiddenErrorEncoded
export const FeatureFlagsListFeatureFlagEvaluations403 = ForbiddenErrorEncoded
export type FeatureFlagsListFeatureFlagEvaluations404 = NotFoundErrorEncoded
export const FeatureFlagsListFeatureFlagEvaluations404 = NotFoundErrorEncoded
export type FeatureFlagsListFeatureFlagEvaluations500 = InternalServerErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const FeatureFlagsListFeatureFlagEvaluations500 = Schema.Union([InternalServerErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type FeatureFlagsTestFeatureFlagRequestJson = { readonly "identifier"?: string | null | null, readonly "userId"?: string | null | null, readonly "attributes"?: { readonly [x: string]: Schema.Json } | null, readonly "userAgent"?: string | null | null, readonly "country"?: string | null | null }
export const FeatureFlagsTestFeatureFlagRequestJson = Schema.Struct({ "identifier": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "userId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "attributes": Schema.optionalKey(Schema.Union([Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })), Schema.Null])), "userAgent": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "country": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])) })
export type FeatureFlagsTestFeatureFlag200 = TestFeatureFlagResultEncoded
export const FeatureFlagsTestFeatureFlag200 = TestFeatureFlagResultEncoded
export type FeatureFlagsTestFeatureFlag400 = FeatureFlagValidationErrorEncoded
export const FeatureFlagsTestFeatureFlag400 = FeatureFlagValidationErrorEncoded
export type FeatureFlagsTestFeatureFlag401 = UnauthorizedErrorEncoded
export const FeatureFlagsTestFeatureFlag401 = UnauthorizedErrorEncoded
export type FeatureFlagsTestFeatureFlag403 = ForbiddenErrorEncoded
export const FeatureFlagsTestFeatureFlag403 = ForbiddenErrorEncoded
export type FeatureFlagsTestFeatureFlag404 = NotFoundErrorEncoded
export const FeatureFlagsTestFeatureFlag404 = NotFoundErrorEncoded
export type FeatureFlagsTestFeatureFlag500 = InternalServerErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const FeatureFlagsTestFeatureFlag500 = Schema.Union([InternalServerErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type FeatureFlagsListFeatureFlagSegments200 = ReadonlyArray<FeatureFlagSegmentRecordEncoded>
export const FeatureFlagsListFeatureFlagSegments200 = Schema.Array(FeatureFlagSegmentRecordEncoded)
export type FeatureFlagsListFeatureFlagSegments400 = FeatureFlagValidationErrorEncoded
export const FeatureFlagsListFeatureFlagSegments400 = FeatureFlagValidationErrorEncoded
export type FeatureFlagsListFeatureFlagSegments401 = UnauthorizedErrorEncoded
export const FeatureFlagsListFeatureFlagSegments401 = UnauthorizedErrorEncoded
export type FeatureFlagsListFeatureFlagSegments403 = ForbiddenErrorEncoded
export const FeatureFlagsListFeatureFlagSegments403 = ForbiddenErrorEncoded
export type FeatureFlagsListFeatureFlagSegments404 = NotFoundErrorEncoded
export const FeatureFlagsListFeatureFlagSegments404 = NotFoundErrorEncoded
export type FeatureFlagsListFeatureFlagSegments500 = InternalServerErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const FeatureFlagsListFeatureFlagSegments500 = Schema.Union([InternalServerErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type FeatureFlagsCreateFeatureFlagSegmentRequestJson = { readonly "key": string, readonly "name": string, readonly "description"?: string | null | null, readonly "matchMode": "all" | "any", readonly "conditions": ReadonlyArray<{ readonly "attribute": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "starts_with" | "ends_with" | "matches_regex" | "greater_than" | "greater_or_equal" | "less_than" | "less_or_equal" | "semver_equals" | "semver_greater_than" | "semver_greater_or_equal" | "semver_less_than" | "semver_less_or_equal" | "before" | "after" | "exists" | "not_exists" | "in_segment" | "not_in_segment", readonly "values": ReadonlyArray<string> }>, readonly "members": ReadonlyArray<{ readonly "kind": "identifier" | "user", readonly "value": string, readonly "excluded": boolean }> }
export const FeatureFlagsCreateFeatureFlagSegmentRequestJson = Schema.Struct({ "key": Schema.String, "name": Schema.String, "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "matchMode": Schema.Literals(["all", "any"]), "conditions": Schema.Array(Schema.Struct({ "attribute": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "starts_with", "ends_with", "matches_regex", "greater_than", "greater_or_equal", "less_than", "less_or_equal", "semver_equals", "semver_greater_than", "semver_greater_or_equal", "semver_less_than", "semver_less_or_equal", "before", "after", "exists", "not_exists", "in_segment", "not_in_segment"]), "values": Schema.Array(Schema.String) })), "members": Schema.Array(Schema.Struct({ "kind": Schema.Literals(["identifier", "user"]), "value": Schema.String, "excluded": Schema.Boolean })) })
export type FeatureFlagsCreateFeatureFlagSegment200 = FeatureFlagSegmentRecordEncoded
export const FeatureFlagsCreateFeatureFlagSegment200 = FeatureFlagSegmentRecordEncoded
export type FeatureFlagsCreateFeatureFlagSegment400 = FeatureFlagValidationErrorEncoded
export const FeatureFlagsCreateFeatureFlagSegment400 = FeatureFlagValidationErrorEncoded
export type FeatureFlagsCreateFeatureFlagSegment401 = UnauthorizedErrorEncoded
export const FeatureFlagsCreateFeatureFlagSegment401 = UnauthorizedErrorEncoded
export type FeatureFlagsCreateFeatureFlagSegment403 = ForbiddenErrorEncoded
export const FeatureFlagsCreateFeatureFlagSegment403 = ForbiddenErrorEncoded
export type FeatureFlagsCreateFeatureFlagSegment404 = NotFoundErrorEncoded
export const FeatureFlagsCreateFeatureFlagSegment404 = NotFoundErrorEncoded
export type FeatureFlagsCreateFeatureFlagSegment500 = InternalServerErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const FeatureFlagsCreateFeatureFlagSegment500 = Schema.Union([InternalServerErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type FeatureFlagsUpdateFeatureFlagSegmentRequestJson = { readonly "key": string, readonly "name": string, readonly "description"?: string | null | null, readonly "matchMode": "all" | "any", readonly "conditions": ReadonlyArray<{ readonly "attribute": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "starts_with" | "ends_with" | "matches_regex" | "greater_than" | "greater_or_equal" | "less_than" | "less_or_equal" | "semver_equals" | "semver_greater_than" | "semver_greater_or_equal" | "semver_less_than" | "semver_less_or_equal" | "before" | "after" | "exists" | "not_exists" | "in_segment" | "not_in_segment", readonly "values": ReadonlyArray<string> }>, readonly "members": ReadonlyArray<{ readonly "kind": "identifier" | "user", readonly "value": string, readonly "excluded": boolean }> }
export const FeatureFlagsUpdateFeatureFlagSegmentRequestJson = Schema.Struct({ "key": Schema.String, "name": Schema.String, "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "matchMode": Schema.Literals(["all", "any"]), "conditions": Schema.Array(Schema.Struct({ "attribute": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "starts_with", "ends_with", "matches_regex", "greater_than", "greater_or_equal", "less_than", "less_or_equal", "semver_equals", "semver_greater_than", "semver_greater_or_equal", "semver_less_than", "semver_less_or_equal", "before", "after", "exists", "not_exists", "in_segment", "not_in_segment"]), "values": Schema.Array(Schema.String) })), "members": Schema.Array(Schema.Struct({ "kind": Schema.Literals(["identifier", "user"]), "value": Schema.String, "excluded": Schema.Boolean })) })
export type FeatureFlagsUpdateFeatureFlagSegment200 = FeatureFlagSegmentRecordEncoded
export const FeatureFlagsUpdateFeatureFlagSegment200 = FeatureFlagSegmentRecordEncoded
export type FeatureFlagsUpdateFeatureFlagSegment400 = FeatureFlagValidationErrorEncoded
export const FeatureFlagsUpdateFeatureFlagSegment400 = FeatureFlagValidationErrorEncoded
export type FeatureFlagsUpdateFeatureFlagSegment401 = UnauthorizedErrorEncoded
export const FeatureFlagsUpdateFeatureFlagSegment401 = UnauthorizedErrorEncoded
export type FeatureFlagsUpdateFeatureFlagSegment403 = ForbiddenErrorEncoded
export const FeatureFlagsUpdateFeatureFlagSegment403 = ForbiddenErrorEncoded
export type FeatureFlagsUpdateFeatureFlagSegment404 = NotFoundErrorEncoded
export const FeatureFlagsUpdateFeatureFlagSegment404 = NotFoundErrorEncoded
export type FeatureFlagsUpdateFeatureFlagSegment500 = InternalServerErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const FeatureFlagsUpdateFeatureFlagSegment500 = Schema.Union([InternalServerErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type FeatureFlagsDeleteFeatureFlagSegment400 = FeatureFlagValidationErrorEncoded
export const FeatureFlagsDeleteFeatureFlagSegment400 = FeatureFlagValidationErrorEncoded
export type FeatureFlagsDeleteFeatureFlagSegment401 = UnauthorizedErrorEncoded
export const FeatureFlagsDeleteFeatureFlagSegment401 = UnauthorizedErrorEncoded
export type FeatureFlagsDeleteFeatureFlagSegment403 = ForbiddenErrorEncoded
export const FeatureFlagsDeleteFeatureFlagSegment403 = ForbiddenErrorEncoded
export type FeatureFlagsDeleteFeatureFlagSegment404 = NotFoundErrorEncoded
export const FeatureFlagsDeleteFeatureFlagSegment404 = NotFoundErrorEncoded
export type FeatureFlagsDeleteFeatureFlagSegment500 = InternalServerErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const FeatureFlagsDeleteFeatureFlagSegment500 = Schema.Union([InternalServerErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type FeatureFlagsListFeatureFlagUserStatesParams = { readonly "userIds": string | ReadonlyArray<string> }
export const FeatureFlagsListFeatureFlagUserStatesParams = Schema.Struct({ "userIds": Schema.Union([Schema.String, Schema.Array(Schema.String)]) })
export type FeatureFlagsListFeatureFlagUserStates200 = ReadonlyArray<FeatureFlagUserStateRecordEncoded>
export const FeatureFlagsListFeatureFlagUserStates200 = Schema.Array(FeatureFlagUserStateRecordEncoded)
export type FeatureFlagsListFeatureFlagUserStates400 = FeatureFlagValidationErrorEncoded
export const FeatureFlagsListFeatureFlagUserStates400 = FeatureFlagValidationErrorEncoded
export type FeatureFlagsListFeatureFlagUserStates401 = UnauthorizedErrorEncoded
export const FeatureFlagsListFeatureFlagUserStates401 = UnauthorizedErrorEncoded
export type FeatureFlagsListFeatureFlagUserStates403 = ForbiddenErrorEncoded
export const FeatureFlagsListFeatureFlagUserStates403 = ForbiddenErrorEncoded
export type FeatureFlagsListFeatureFlagUserStates404 = NotFoundErrorEncoded
export const FeatureFlagsListFeatureFlagUserStates404 = NotFoundErrorEncoded
export type FeatureFlagsListFeatureFlagUserStates500 = InternalServerErrorEncoded | EffectDrizzleQueryErrorEncoded | Effect_sql_SqlErrorEncoded
export const FeatureFlagsListFeatureFlagUserStates500 = Schema.Union([InternalServerErrorEncoded, EffectDrizzleQueryErrorEncoded, Effect_sql_SqlErrorEncoded])
export type FunnelsListFunnels200 = ReadonlyArray<FunnelRecordEncoded>
export const FunnelsListFunnels200 = Schema.Array(FunnelRecordEncoded)
export type FunnelsListFunnels400 = FunnelValidationErrorEncoded
export const FunnelsListFunnels400 = FunnelValidationErrorEncoded
export type FunnelsListFunnels401 = UnauthorizedErrorEncoded
export const FunnelsListFunnels401 = UnauthorizedErrorEncoded
export type FunnelsListFunnels403 = ForbiddenErrorEncoded
export const FunnelsListFunnels403 = ForbiddenErrorEncoded
export type FunnelsListFunnels404 = NotFoundErrorEncoded
export const FunnelsListFunnels404 = NotFoundErrorEncoded
export type FunnelsListFunnels500 = EffectDrizzleQueryErrorEncoded | InternalServerErrorEncoded
export const FunnelsListFunnels500 = Schema.Union([EffectDrizzleQueryErrorEncoded, InternalServerErrorEncoded])
export type FunnelsListFunnels503 = FunnelQueryErrorEncoded
export const FunnelsListFunnels503 = FunnelQueryErrorEncoded
export type FunnelsCreateFunnelRequestJson = { readonly "name": string, readonly "description"?: string | null | null, readonly "steps": ReadonlyArray<{ readonly "type"?: "event" | null, readonly "id": string, readonly "name": string, readonly "match": "all" | "any", readonly "filters": ReadonlyArray<{ readonly "field": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "starts_with" | "not_starts_with" | "ends_with" | "not_ends_with" | "greater_than" | "less_than", readonly "value": string | number | "Infinity" | "-Infinity" | "NaN" | boolean }> }>, readonly "conversionWindowSeconds": number | "Infinity" | "-Infinity" | "NaN", readonly "strictOrder": boolean, readonly "timeRangeSeconds": number | "Infinity" | "-Infinity" | "NaN" }
export const FunnelsCreateFunnelRequestJson = Schema.Struct({ "name": Schema.String, "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "steps": Schema.Array(Schema.Struct({ "type": Schema.optionalKey(Schema.Union([Schema.Literal("event"), Schema.Null])), "id": Schema.String, "name": Schema.String, "match": Schema.Literals(["all", "any"]), "filters": Schema.Array(Schema.Struct({ "field": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "starts_with", "not_starts_with", "ends_with", "not_ends_with", "greater_than", "less_than"]), "value": Schema.Union([Schema.String, Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Boolean]) })) })), "conversionWindowSeconds": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "strictOrder": Schema.Boolean, "timeRangeSeconds": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })
export type FunnelsCreateFunnel200 = FunnelRecordEncoded
export const FunnelsCreateFunnel200 = FunnelRecordEncoded
export type FunnelsCreateFunnel400 = FunnelValidationErrorEncoded
export const FunnelsCreateFunnel400 = FunnelValidationErrorEncoded
export type FunnelsCreateFunnel401 = UnauthorizedErrorEncoded
export const FunnelsCreateFunnel401 = UnauthorizedErrorEncoded
export type FunnelsCreateFunnel403 = ForbiddenErrorEncoded
export const FunnelsCreateFunnel403 = ForbiddenErrorEncoded
export type FunnelsCreateFunnel404 = NotFoundErrorEncoded
export const FunnelsCreateFunnel404 = NotFoundErrorEncoded
export type FunnelsCreateFunnel500 = EffectDrizzleQueryErrorEncoded | InternalServerErrorEncoded
export const FunnelsCreateFunnel500 = Schema.Union([EffectDrizzleQueryErrorEncoded, InternalServerErrorEncoded])
export type FunnelsCreateFunnel503 = FunnelQueryErrorEncoded
export const FunnelsCreateFunnel503 = FunnelQueryErrorEncoded
export type FunnelsGetFunnel200 = FunnelDetailEncoded
export const FunnelsGetFunnel200 = FunnelDetailEncoded
export type FunnelsGetFunnel400 = FunnelValidationErrorEncoded
export const FunnelsGetFunnel400 = FunnelValidationErrorEncoded
export type FunnelsGetFunnel401 = UnauthorizedErrorEncoded
export const FunnelsGetFunnel401 = UnauthorizedErrorEncoded
export type FunnelsGetFunnel403 = ForbiddenErrorEncoded
export const FunnelsGetFunnel403 = ForbiddenErrorEncoded
export type FunnelsGetFunnel404 = NotFoundErrorEncoded
export const FunnelsGetFunnel404 = NotFoundErrorEncoded
export type FunnelsGetFunnel500 = EffectDrizzleQueryErrorEncoded | InternalServerErrorEncoded
export const FunnelsGetFunnel500 = Schema.Union([EffectDrizzleQueryErrorEncoded, InternalServerErrorEncoded])
export type FunnelsGetFunnel503 = FunnelQueryErrorEncoded
export const FunnelsGetFunnel503 = FunnelQueryErrorEncoded
export type FunnelsDeleteFunnel400 = FunnelValidationErrorEncoded
export const FunnelsDeleteFunnel400 = FunnelValidationErrorEncoded
export type FunnelsDeleteFunnel401 = UnauthorizedErrorEncoded
export const FunnelsDeleteFunnel401 = UnauthorizedErrorEncoded
export type FunnelsDeleteFunnel403 = ForbiddenErrorEncoded
export const FunnelsDeleteFunnel403 = ForbiddenErrorEncoded
export type FunnelsDeleteFunnel404 = NotFoundErrorEncoded
export const FunnelsDeleteFunnel404 = NotFoundErrorEncoded
export type FunnelsDeleteFunnel500 = EffectDrizzleQueryErrorEncoded | InternalServerErrorEncoded
export const FunnelsDeleteFunnel500 = Schema.Union([EffectDrizzleQueryErrorEncoded, InternalServerErrorEncoded])
export type FunnelsDeleteFunnel503 = FunnelQueryErrorEncoded
export const FunnelsDeleteFunnel503 = FunnelQueryErrorEncoded
export type FunnelsUpdateFunnelRequestJson = { readonly "name"?: string | null, readonly "description"?: string | null | null, readonly "steps"?: ReadonlyArray<{ readonly "type"?: "event" | null, readonly "id": string, readonly "name": string, readonly "match": "all" | "any", readonly "filters": ReadonlyArray<{ readonly "field": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "starts_with" | "not_starts_with" | "ends_with" | "not_ends_with" | "greater_than" | "less_than", readonly "value": string | number | "Infinity" | "-Infinity" | "NaN" | boolean }> }> | null, readonly "conversionWindowSeconds"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "strictOrder"?: boolean | null, readonly "timeRangeSeconds"?: number | "Infinity" | "-Infinity" | "NaN" | null }
export const FunnelsUpdateFunnelRequestJson = Schema.Struct({ "name": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "description": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "steps": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "type": Schema.optionalKey(Schema.Union([Schema.Literal("event"), Schema.Null])), "id": Schema.String, "name": Schema.String, "match": Schema.Literals(["all", "any"]), "filters": Schema.Array(Schema.Struct({ "field": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "starts_with", "not_starts_with", "ends_with", "not_ends_with", "greater_than", "less_than"]), "value": Schema.Union([Schema.String, Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Boolean]) })) })), Schema.Null])), "conversionWindowSeconds": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "strictOrder": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "timeRangeSeconds": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) })
export type FunnelsUpdateFunnel200 = FunnelRecordEncoded
export const FunnelsUpdateFunnel200 = FunnelRecordEncoded
export type FunnelsUpdateFunnel400 = FunnelValidationErrorEncoded
export const FunnelsUpdateFunnel400 = FunnelValidationErrorEncoded
export type FunnelsUpdateFunnel401 = UnauthorizedErrorEncoded
export const FunnelsUpdateFunnel401 = UnauthorizedErrorEncoded
export type FunnelsUpdateFunnel403 = ForbiddenErrorEncoded
export const FunnelsUpdateFunnel403 = ForbiddenErrorEncoded
export type FunnelsUpdateFunnel404 = NotFoundErrorEncoded
export const FunnelsUpdateFunnel404 = NotFoundErrorEncoded
export type FunnelsUpdateFunnel500 = EffectDrizzleQueryErrorEncoded | InternalServerErrorEncoded
export const FunnelsUpdateFunnel500 = Schema.Union([EffectDrizzleQueryErrorEncoded, InternalServerErrorEncoded])
export type FunnelsUpdateFunnel503 = FunnelQueryErrorEncoded
export const FunnelsUpdateFunnel503 = FunnelQueryErrorEncoded
export type FunnelsDuplicateFunnel200 = FunnelRecordEncoded
export const FunnelsDuplicateFunnel200 = FunnelRecordEncoded
export type FunnelsDuplicateFunnel400 = FunnelValidationErrorEncoded
export const FunnelsDuplicateFunnel400 = FunnelValidationErrorEncoded
export type FunnelsDuplicateFunnel401 = UnauthorizedErrorEncoded
export const FunnelsDuplicateFunnel401 = UnauthorizedErrorEncoded
export type FunnelsDuplicateFunnel403 = ForbiddenErrorEncoded
export const FunnelsDuplicateFunnel403 = ForbiddenErrorEncoded
export type FunnelsDuplicateFunnel404 = NotFoundErrorEncoded
export const FunnelsDuplicateFunnel404 = NotFoundErrorEncoded
export type FunnelsDuplicateFunnel500 = EffectDrizzleQueryErrorEncoded | InternalServerErrorEncoded
export const FunnelsDuplicateFunnel500 = Schema.Union([EffectDrizzleQueryErrorEncoded, InternalServerErrorEncoded])
export type FunnelsDuplicateFunnel503 = FunnelQueryErrorEncoded
export const FunnelsDuplicateFunnel503 = FunnelQueryErrorEncoded
export type ImagesCreateImageUploadUrlRequestJson = { readonly "type": "user-avatar" | "organization-logo" | "project-icon", readonly "organizationId"?: string | null, readonly "projectId"?: string | null }
export const ImagesCreateImageUploadUrlRequestJson = Schema.Struct({ "type": Schema.Literals(["user-avatar", "organization-logo", "project-icon"]), "organizationId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "projectId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type ImagesCreateImageUploadUrl200 = { readonly "imageId": string, readonly "uploadURL": string }
export const ImagesCreateImageUploadUrl200 = Schema.Struct({ "imageId": Schema.String, "uploadURL": Schema.String })
export type ImagesCreateImageUploadUrl401 = UnauthorizedErrorEncoded
export const ImagesCreateImageUploadUrl401 = UnauthorizedErrorEncoded
export type ImagesCreateImageUploadUrl403 = ForbiddenErrorEncoded
export const ImagesCreateImageUploadUrl403 = ForbiddenErrorEncoded
export type ImagesCreateImageUploadUrl404 = NotFoundErrorEncoded
export const ImagesCreateImageUploadUrl404 = NotFoundErrorEncoded
export type ImagesCreateImageUploadUrl500 = InternalServerErrorEncoded
export const ImagesCreateImageUploadUrl500 = InternalServerErrorEncoded
export type ImagesCreateImageUploadUrl502 = CloudflareImageErrorEncoded
export const ImagesCreateImageUploadUrl502 = CloudflareImageErrorEncoded
export type ImagesDeleteImageParams = { readonly "type": "user-avatar" | "organization-logo" | "project-icon", readonly "organizationId"?: string | null, readonly "projectId"?: string | null }
export const ImagesDeleteImageParams = Schema.Struct({ "type": Schema.Literals(["user-avatar", "organization-logo", "project-icon"]), "organizationId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "projectId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type ImagesDeleteImage401 = UnauthorizedErrorEncoded
export const ImagesDeleteImage401 = UnauthorizedErrorEncoded
export type ImagesDeleteImage403 = ForbiddenErrorEncoded
export const ImagesDeleteImage403 = ForbiddenErrorEncoded
export type ImagesDeleteImage404 = NotFoundErrorEncoded
export const ImagesDeleteImage404 = NotFoundErrorEncoded
export type ImagesDeleteImage500 = InternalServerErrorEncoded
export const ImagesDeleteImage500 = InternalServerErrorEncoded
export type ImagesDeleteImage502 = CloudflareImageErrorEncoded
export const ImagesDeleteImage502 = CloudflareImageErrorEncoded
export type MetricsQueryChartAstRequestJson = { readonly "version": 1, readonly "outputs": ReadonlyArray<{ readonly "id": string, readonly "name"?: string | null, readonly "query": Union_, readonly "metadata"?: { readonly "iconSetId"?: string | null | null, readonly "color"?: string | null | null, readonly "colors"?: ReadonlyArray<string> | null | null, readonly "splitPattern"?: string | null, readonly "splitField"?: string | null } | null }> }
export const MetricsQueryChartAstRequestJson = Schema.Struct({ "version": Schema.Literal(1), "outputs": Schema.Array(Schema.Struct({ "id": Schema.String, "name": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "query": Union_, "metadata": Schema.optionalKey(Schema.Union([Schema.Struct({ "iconSetId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "colors": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Array(Schema.String), Schema.Null]), Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "splitField": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])) })) })
export type MetricsQueryChartAst200 = { readonly "outputs": ReadonlyArray<{ readonly "id": string, readonly "name"?: string | null, readonly "dimensions": ReadonlyArray<string>, readonly "metadata"?: { readonly "iconSetId"?: string | null | null, readonly "color"?: string | null | null, readonly "colors"?: ReadonlyArray<string> | null | null, readonly "splitPattern"?: string | null, readonly "splitField"?: string | null } | null, readonly "type": "scalar", readonly "value": string | number | "Infinity" | "-Infinity" | "NaN" | null } | { readonly "id": string, readonly "name"?: string | null, readonly "dimensions": ReadonlyArray<string>, readonly "metadata"?: { readonly "iconSetId"?: string | null | null, readonly "color"?: string | null | null, readonly "colors"?: ReadonlyArray<string> | null | null, readonly "splitPattern"?: string | null, readonly "splitField"?: string | null } | null, readonly "type": "timeSeries", readonly "rows": ReadonlyArray<{ readonly "name": string | "Infinity" | "-Infinity" | "NaN" } & { readonly [x: string]: string | number | "Infinity" | "-Infinity" | "NaN" }> } | { readonly "id": string, readonly "name"?: string | null, readonly "dimensions": ReadonlyArray<string>, readonly "metadata"?: { readonly "iconSetId"?: string | null | null, readonly "color"?: string | null | null, readonly "colors"?: ReadonlyArray<string> | null | null, readonly "splitPattern"?: string | null, readonly "splitField"?: string | null } | null, readonly "type": "grouping", readonly "rows": ReadonlyArray<{ readonly "name": string | "Infinity" | "-Infinity" | "NaN" } & { readonly [x: string]: string | number | "Infinity" | "-Infinity" | "NaN" }> }> }
export const MetricsQueryChartAst200 = Schema.Struct({ "outputs": Schema.Array(Schema.Union([Schema.Struct({ "id": Schema.String, "name": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "dimensions": Schema.Array(Schema.String), "metadata": Schema.optionalKey(Schema.Union([Schema.Struct({ "iconSetId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "colors": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Array(Schema.String), Schema.Null]), Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "splitField": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])), "type": Schema.Literal("scalar"), "value": Schema.Union([Schema.Union([Schema.String, Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])])]), Schema.Null]) }), Schema.Struct({ "id": Schema.String, "name": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "dimensions": Schema.Array(Schema.String), "metadata": Schema.optionalKey(Schema.Union([Schema.Struct({ "iconSetId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "colors": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Array(Schema.String), Schema.Null]), Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "splitField": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])), "type": Schema.Literal("timeSeries"), "rows": Schema.Array(Schema.StructWithRest(Schema.Struct({ "name": Schema.Union([Schema.String, Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }), [Schema.Record(Schema.String, Schema.Union([Schema.String, Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])])]))])) }), Schema.Struct({ "id": Schema.String, "name": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "dimensions": Schema.Array(Schema.String), "metadata": Schema.optionalKey(Schema.Union([Schema.Struct({ "iconSetId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "colors": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Array(Schema.String), Schema.Null]), Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "splitField": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])), "type": Schema.Literal("grouping"), "rows": Schema.Array(Schema.StructWithRest(Schema.Struct({ "name": Schema.Union([Schema.String, Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }), [Schema.Record(Schema.String, Schema.Union([Schema.String, Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])])]))])) })])) })
export type MetricsQueryChartAst400 = ChartQueryValidationErrorEncoded
export const MetricsQueryChartAst400 = ChartQueryValidationErrorEncoded
export type MetricsQueryChartAst401 = UnauthorizedErrorEncoded
export const MetricsQueryChartAst401 = UnauthorizedErrorEncoded
export type MetricsQueryChartAst403 = ForbiddenErrorEncoded
export const MetricsQueryChartAst403 = ForbiddenErrorEncoded
export type MetricsQueryChartAst404 = NotFoundErrorEncoded
export const MetricsQueryChartAst404 = NotFoundErrorEncoded
export type MetricsQueryChartAst500 = InternalServerErrorEncoded | MetricsDecodeErrorEncoded | TinybirdErrorEncoded | EffectDrizzleQueryErrorEncoded
export const MetricsQueryChartAst500 = Schema.Union([InternalServerErrorEncoded, MetricsDecodeErrorEncoded, TinybirdErrorEncoded, EffectDrizzleQueryErrorEncoded])
export type MetricsGetPreviewDataRequestJson = { readonly "queryConfig": { readonly "groupLimit"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "visualOptions"?: { readonly "colors"?: ReadonlyArray<string> | null, readonly "pie"?: { readonly "style"?: "pie" | "donut" | null, readonly "showLegend"?: boolean | null, readonly "showTotal"?: boolean | null, readonly "showLabels"?: boolean | null, readonly "totalDisplayMode"?: "sum" | "count" | null, readonly "drilldown"?: { readonly "enabled"?: boolean | null, readonly "splitPattern"?: string | null } | null } | null, readonly "bar"?: { readonly "logarithmic"?: boolean | null, readonly "stacked"?: boolean | null, readonly "orientation"?: "vertical" | "horizontal" | null } | null, readonly "line"?: { readonly "logarithmic"?: boolean | null, readonly "lineType"?: "monotone" | "linear" | "step" | null, readonly "showDots"?: boolean | null } | null, readonly "widget"?: { readonly "showTrend"?: boolean | null, readonly "displayMode"?: "default" | "compact" | null, readonly "valueFormat"?: "number" | "percent" | "duration_ms" | null } | null, readonly "list"?: { readonly "selectedTabIndex"?: number | null, readonly "splitPattern"?: string | null, readonly "multiMetric"?: boolean | null } | null, readonly "heatmap"?: { readonly "showLegend"?: boolean | null } | null, readonly "radar"?: { readonly "logarithmic"?: boolean | null, readonly "showDots"?: boolean | null, readonly "fillOpacity"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "showLegend"?: boolean | null, readonly "gridType"?: "polygon" | "circle" | null } | null, readonly "scatter"?: { readonly "logarithmic"?: boolean | null, readonly "pointSize"?: "small" | "medium" | "large" | null, readonly "showLegend"?: boolean | null } | null } | null, readonly "markerCollections"?: ReadonlyArray<{ readonly "collectionId": string, readonly "enabled"?: boolean | null, readonly "display"?: { readonly "icon"?: string | null | null, readonly "emoji"?: string | null | null, readonly "color"?: string | null | null } | null }> | null }, readonly "chartType": "widget" | "line" | "area" | "bar" | "pie" | "map" | "list" | "heatmap" | "radar" | "scatter", readonly "query": { readonly "type": "flow", readonly "nodes": ReadonlyArray<{ readonly "id": string, readonly "type"?: string, readonly "data"?: { readonly [x: string]: Schema.Json }, readonly "position"?: { readonly "x"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "y"?: number | "Infinity" | "-Infinity" | "NaN" | null } }>, readonly "edges": ReadonlyArray<{ readonly "id": string, readonly "source": string, readonly "target": string }> } }
export const MetricsGetPreviewDataRequestJson = Schema.Struct({ "queryConfig": Schema.Struct({ "groupLimit": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "visualOptions": Schema.optionalKey(Schema.Union([Schema.Struct({ "colors": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "pie": Schema.optionalKey(Schema.Union([Schema.Struct({ "style": Schema.optionalKey(Schema.Union([Schema.Literals(["pie", "donut"]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showTotal": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showLabels": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "totalDisplayMode": Schema.optionalKey(Schema.Union([Schema.Literals(["sum", "count"]), Schema.Null])), "drilldown": Schema.optionalKey(Schema.Union([Schema.Struct({ "enabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])) }), Schema.Null])), "bar": Schema.optionalKey(Schema.Union([Schema.Struct({ "logarithmic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "stacked": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "orientation": Schema.optionalKey(Schema.Union([Schema.Literals(["vertical", "horizontal"]), Schema.Null])) }), Schema.Null])), "line": Schema.optionalKey(Schema.Union([Schema.Struct({ "logarithmic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "lineType": Schema.optionalKey(Schema.Union([Schema.Literals(["monotone", "linear", "step"]), Schema.Null])), "showDots": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "widget": Schema.optionalKey(Schema.Union([Schema.Struct({ "showTrend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "displayMode": Schema.optionalKey(Schema.Union([Schema.Literals(["default", "compact"]), Schema.Null])), "valueFormat": Schema.optionalKey(Schema.Union([Schema.Literals(["number", "percent", "duration_ms"]), Schema.Null])) }), Schema.Null])), "list": Schema.optionalKey(Schema.Union([Schema.Struct({ "selectedTabIndex": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "multiMetric": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "heatmap": Schema.optionalKey(Schema.Union([Schema.Struct({ "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "radar": Schema.optionalKey(Schema.Union([Schema.Struct({ "logarithmic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showDots": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "fillOpacity": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "gridType": Schema.optionalKey(Schema.Union([Schema.Literals(["polygon", "circle"]), Schema.Null])) }), Schema.Null])), "scatter": Schema.optionalKey(Schema.Union([Schema.Struct({ "logarithmic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "pointSize": Schema.optionalKey(Schema.Union([Schema.Literals(["small", "medium", "large"]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])) }), Schema.Null])), "markerCollections": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "collectionId": Schema.String, "enabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "display": Schema.optionalKey(Schema.Union([Schema.Struct({ "icon": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "emoji": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])) }), Schema.Null])) })), Schema.Null])) }), "chartType": Schema.Literals(["widget", "line", "area", "bar", "pie", "map", "list", "heatmap", "radar", "scatter"]), "query": Schema.Struct({ "type": Schema.Literal("flow"), "nodes": Schema.Array(Schema.Struct({ "id": Schema.String, "type": Schema.optionalKey(Schema.String), "data": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))), "position": Schema.optionalKey(Schema.Struct({ "x": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "y": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) })) })), "edges": Schema.Array(Schema.Struct({ "id": Schema.String, "source": Schema.String, "target": Schema.String })) }) })
export type MetricsGetPreviewData200 = { readonly "data": Schema.Json, readonly "flowMeta": { readonly "outputs": ReadonlyArray<{ readonly "id": string, readonly "index": number | "Infinity" | "-Infinity" | "NaN", readonly "name": string, readonly "explicitName"?: string | null, readonly "iconSetId": string | null, readonly "color"?: string | null | null, readonly "colors"?: ReadonlyArray<string> | null | null, readonly "sort"?: { readonly "by": "value" | "dimension" | "time", readonly "direction": "asc" | "desc" } | null, readonly "splitPattern"?: string | null, readonly "splitDataSource"?: string | null, readonly "groupField"?: string | null, readonly "groupFields"?: ReadonlyArray<string> | null, readonly "primaryMetric"?: { readonly "field": string, readonly "aggregation": string } | null, readonly "dailyRollup"?: "sum" | "mean" | null }>, readonly "hasTimeGroup": boolean, readonly "hasBreakdownTimeSeries": boolean, readonly "datasourceFields": ReadonlyArray<string>, readonly "splitLabelSeparator": string, readonly "timeGroupInterval"?: "minute" | "hour" | "day" | "week" | "month" | "auto" | null }, readonly "markers"?: ReadonlyArray<{ readonly "id": string, readonly "collectionId": string, readonly "collectionName": string, readonly "timestamp": string, readonly "title": string, readonly "description": string | null, readonly "icon": string | null, readonly "emoji": string | null, readonly "color": string | null }> | null, readonly "markerCollectionGrouping"?: { readonly [x: string]: "auto" | "minute" | "hour" | "day" | "week" | "chart_bucket" } | null }
export const MetricsGetPreviewData200 = Schema.Struct({ "data": Schema.Json.annotate({ "expected": "JSON value" }), "flowMeta": Schema.Struct({ "outputs": Schema.Array(Schema.Struct({ "id": Schema.String, "index": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "name": Schema.String, "explicitName": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "iconSetId": Schema.Union([Schema.String, Schema.Null]), "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "colors": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Array(Schema.String), Schema.Null]), Schema.Null])), "sort": Schema.optionalKey(Schema.Union([Schema.Struct({ "by": Schema.Literals(["value", "dimension", "time"]), "direction": Schema.Literals(["asc", "desc"]) }), Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "splitDataSource": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "groupField": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "groupFields": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "primaryMetric": Schema.optionalKey(Schema.Union([Schema.Struct({ "field": Schema.String, "aggregation": Schema.String }), Schema.Null])), "dailyRollup": Schema.optionalKey(Schema.Union([Schema.Literals(["sum", "mean"]), Schema.Null])) })), "hasTimeGroup": Schema.Boolean, "hasBreakdownTimeSeries": Schema.Boolean, "datasourceFields": Schema.Array(Schema.String), "splitLabelSeparator": Schema.String, "timeGroupInterval": Schema.optionalKey(Schema.Union([Schema.Literals(["minute", "hour", "day", "week", "month", "auto"]), Schema.Null])) }), "markers": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "id": Schema.String, "collectionId": Schema.String, "collectionName": Schema.String, "timestamp": Schema.String, "title": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "icon": Schema.Union([Schema.String, Schema.Null]), "emoji": Schema.Union([Schema.String, Schema.Null]), "color": Schema.Union([Schema.String, Schema.Null]) })), Schema.Null])), "markerCollectionGrouping": Schema.optionalKey(Schema.Union([Schema.Record(Schema.String, Schema.Literals(["auto", "minute", "hour", "day", "week", "chart_bucket"])), Schema.Null])) })
export type MetricsGetPreviewData400 = ChartQueryValidationErrorEncoded
export const MetricsGetPreviewData400 = ChartQueryValidationErrorEncoded
export type MetricsGetPreviewData401 = UnauthorizedErrorEncoded
export const MetricsGetPreviewData401 = UnauthorizedErrorEncoded
export type MetricsGetPreviewData403 = ForbiddenErrorEncoded
export const MetricsGetPreviewData403 = ForbiddenErrorEncoded
export type MetricsGetPreviewData404 = NotFoundErrorEncoded
export const MetricsGetPreviewData404 = NotFoundErrorEncoded
export type MetricsGetPreviewData500 = InternalServerErrorEncoded | MetricsDecodeErrorEncoded | TinybirdErrorEncoded | EffectDrizzleQueryErrorEncoded
export const MetricsGetPreviewData500 = Schema.Union([InternalServerErrorEncoded, MetricsDecodeErrorEncoded, TinybirdErrorEncoded, EffectDrizzleQueryErrorEncoded])
export type MetricsLoadDashboardDataRequestJson = { readonly "insightsOnly"?: boolean | null, readonly "projectId"?: string | null, readonly "slug"?: string | null, readonly "dashboardId"?: string | null | null, readonly "dashboardSlug"?: string | null, readonly "timeRange"?: { readonly "type": "all" } | { readonly "type": "relative", readonly "maxAgeMs": number | "Infinity" | "-Infinity" | "NaN" } | { readonly "type": "absolute", readonly "fromMs": number | "Infinity" | "-Infinity" | "NaN", readonly "toMs": number | "Infinity" | "-Infinity" | "NaN" } | null, readonly "dashboardFilters"?: ReadonlyArray<{ readonly "field": string, readonly "operator": "equals" | "not_equals" | "greater_than" | "less_than" | "greater_equal" | "less_equal", readonly "value": string, readonly "dataType"?: "string" | "number" | "boolean" | null }> | null, readonly "queryDebug"?: boolean | null }
export const MetricsLoadDashboardDataRequestJson = Schema.Struct({ "insightsOnly": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "projectId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "slug": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "dashboardId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "dashboardSlug": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "timeRange": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Struct({ "type": Schema.Literal("all") }), Schema.Struct({ "type": Schema.Literal("relative"), "maxAgeMs": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }), Schema.Struct({ "type": Schema.Literal("absolute"), "fromMs": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "toMs": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })]), Schema.Null])), "dashboardFilters": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "field": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "greater_than", "less_than", "greater_equal", "less_equal"]), "value": Schema.String, "dataType": Schema.optionalKey(Schema.Union([Schema.Literals(["string", "number", "boolean"]), Schema.Null])) })), Schema.Null])), "queryDebug": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) })
export type MetricsLoadDashboardData200 = { readonly "charts": { readonly [x: string]: Schema.Json }, readonly "markers"?: { readonly [x: string]: ReadonlyArray<{ readonly "id": string, readonly "collectionId": string, readonly "collectionName": string, readonly "timestamp": string, readonly "title": string, readonly "description": string | null, readonly "icon": string | null, readonly "emoji": string | null, readonly "color": string | null }> } | null, readonly "markerCollectionGrouping"?: { readonly [x: string]: "auto" | "minute" | "hour" | "day" | "week" | "chart_bucket" } | null, readonly "flowMeta"?: { readonly [x: string]: { readonly "outputs": ReadonlyArray<{ readonly "id": string, readonly "index": number | "Infinity" | "-Infinity" | "NaN", readonly "name": string, readonly "explicitName"?: string | null, readonly "iconSetId": string | null, readonly "color"?: string | null | null, readonly "colors"?: ReadonlyArray<string> | null | null, readonly "sort"?: { readonly "by": "value" | "dimension" | "time", readonly "direction": "asc" | "desc" } | null, readonly "splitPattern"?: string | null, readonly "splitDataSource"?: string | null, readonly "groupField"?: string | null, readonly "groupFields"?: ReadonlyArray<string> | null, readonly "primaryMetric"?: { readonly "field": string, readonly "aggregation": string } | null, readonly "dailyRollup"?: "sum" | "mean" | null }>, readonly "hasTimeGroup": boolean, readonly "hasBreakdownTimeSeries": boolean, readonly "datasourceFields": ReadonlyArray<string>, readonly "splitLabelSeparator": string, readonly "timeGroupInterval"?: "minute" | "hour" | "day" | "week" | "month" | "auto" | null } } | null, readonly "queryDebug"?: { readonly "totalQueries": number | "Infinity" | "-Infinity" | "NaN", readonly "totalDurationMs": number | "Infinity" | "-Infinity" | "NaN", readonly "wallDurationMs": number | "Infinity" | "-Infinity" | "NaN", readonly "queries": ReadonlyArray<{ readonly "chartIds": ReadonlyArray<string>, readonly "chartNames": ReadonlyArray<string>, readonly "outputIds": ReadonlyArray<string>, readonly "durationMs": number | "Infinity" | "-Infinity" | "NaN", readonly "rowCount": number | "Infinity" | "-Infinity" | "NaN", readonly "sql": string, readonly "paramsJson": string, readonly "datasource": string, readonly "error"?: string | null }>, readonly "cache": { readonly "hits": number | "Infinity" | "-Infinity" | "NaN", readonly "misses": number | "Infinity" | "-Infinity" | "NaN", readonly "bypasses": number | "Infinity" | "-Infinity" | "NaN", readonly "fallbacks": number | "Infinity" | "-Infinity" | "NaN", readonly "entries": ReadonlyArray<{ readonly "chartId": string, readonly "chartName": string, readonly "mode": "incremental" | "none", readonly "status": "hit" | "miss" | "bypass" | "fallback", readonly "reason"?: string | null, readonly "interval"?: string | null, readonly "durationMs": number | "Infinity" | "-Infinity" | "NaN", readonly "requestedRangeMs"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "queriedRangeMs"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "cachedFromMs"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "cachedThroughMs"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "cachedRanges"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "cachedRows"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "returnedRows"?: number | "Infinity" | "-Infinity" | "NaN" | null }> } } | null }
export const MetricsLoadDashboardData200 = Schema.Struct({ "charts": Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })), "markers": Schema.optionalKey(Schema.Union([Schema.Record(Schema.String, Schema.Array(Schema.Struct({ "id": Schema.String, "collectionId": Schema.String, "collectionName": Schema.String, "timestamp": Schema.String, "title": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "icon": Schema.Union([Schema.String, Schema.Null]), "emoji": Schema.Union([Schema.String, Schema.Null]), "color": Schema.Union([Schema.String, Schema.Null]) }))), Schema.Null])), "markerCollectionGrouping": Schema.optionalKey(Schema.Union([Schema.Record(Schema.String, Schema.Literals(["auto", "minute", "hour", "day", "week", "chart_bucket"])), Schema.Null])), "flowMeta": Schema.optionalKey(Schema.Union([Schema.Record(Schema.String, Schema.Struct({ "outputs": Schema.Array(Schema.Struct({ "id": Schema.String, "index": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "name": Schema.String, "explicitName": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "iconSetId": Schema.Union([Schema.String, Schema.Null]), "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "colors": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Array(Schema.String), Schema.Null]), Schema.Null])), "sort": Schema.optionalKey(Schema.Union([Schema.Struct({ "by": Schema.Literals(["value", "dimension", "time"]), "direction": Schema.Literals(["asc", "desc"]) }), Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "splitDataSource": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "groupField": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "groupFields": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "primaryMetric": Schema.optionalKey(Schema.Union([Schema.Struct({ "field": Schema.String, "aggregation": Schema.String }), Schema.Null])), "dailyRollup": Schema.optionalKey(Schema.Union([Schema.Literals(["sum", "mean"]), Schema.Null])) })), "hasTimeGroup": Schema.Boolean, "hasBreakdownTimeSeries": Schema.Boolean, "datasourceFields": Schema.Array(Schema.String), "splitLabelSeparator": Schema.String, "timeGroupInterval": Schema.optionalKey(Schema.Union([Schema.Literals(["minute", "hour", "day", "week", "month", "auto"]), Schema.Null])) })), Schema.Null])), "queryDebug": Schema.optionalKey(Schema.Union([Schema.Struct({ "totalQueries": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "totalDurationMs": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "wallDurationMs": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "queries": Schema.Array(Schema.Struct({ "chartIds": Schema.Array(Schema.String), "chartNames": Schema.Array(Schema.String), "outputIds": Schema.Array(Schema.String), "durationMs": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "rowCount": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "sql": Schema.String, "paramsJson": Schema.String, "datasource": Schema.String, "error": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })), "cache": Schema.Struct({ "hits": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "misses": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "bypasses": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "fallbacks": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "entries": Schema.Array(Schema.Struct({ "chartId": Schema.String, "chartName": Schema.String, "mode": Schema.Literals(["incremental", "none"]), "status": Schema.Literals(["hit", "miss", "bypass", "fallback"]), "reason": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "interval": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "durationMs": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "requestedRangeMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "queriedRangeMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "cachedFromMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "cachedThroughMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "cachedRanges": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "cachedRows": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "returnedRows": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) })) }) }), Schema.Null])) })
export type MetricsLoadDashboardData400 = ChartQueryValidationErrorEncoded
export const MetricsLoadDashboardData400 = ChartQueryValidationErrorEncoded
export type MetricsLoadDashboardData401 = UnauthorizedErrorEncoded
export const MetricsLoadDashboardData401 = UnauthorizedErrorEncoded
export type MetricsLoadDashboardData403 = ForbiddenErrorEncoded
export const MetricsLoadDashboardData403 = ForbiddenErrorEncoded
export type MetricsLoadDashboardData404 = NotFoundErrorEncoded
export const MetricsLoadDashboardData404 = NotFoundErrorEncoded
export type MetricsLoadDashboardData500 = InternalServerErrorEncoded | MetricsDecodeErrorEncoded | TinybirdErrorEncoded | EffectDrizzleQueryErrorEncoded
export const MetricsLoadDashboardData500 = Schema.Union([InternalServerErrorEncoded, MetricsDecodeErrorEncoded, TinybirdErrorEncoded, EffectDrizzleQueryErrorEncoded])
export type MetricsGetDashboardFilterSuggestionsRequestJson = { readonly "dashboardId"?: string | null | null, readonly "fields": ReadonlyArray<string>, readonly "numericFields"?: ReadonlyArray<string> | null, readonly "timeRange"?: { readonly "type": "all" } | { readonly "type": "relative", readonly "maxAgeMs": number | "Infinity" | "-Infinity" | "NaN" } | { readonly "type": "absolute", readonly "fromMs": number | "Infinity" | "-Infinity" | "NaN", readonly "toMs": number | "Infinity" | "-Infinity" | "NaN" } | null }
export const MetricsGetDashboardFilterSuggestionsRequestJson = Schema.Struct({ "dashboardId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "fields": Schema.Array(Schema.String), "numericFields": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "timeRange": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Struct({ "type": Schema.Literal("all") }), Schema.Struct({ "type": Schema.Literal("relative"), "maxAgeMs": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }), Schema.Struct({ "type": Schema.Literal("absolute"), "fromMs": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "toMs": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })]), Schema.Null])) })
export type MetricsGetDashboardFilterSuggestions200 = { readonly [x: string]: { readonly "values": ReadonlyArray<string>, readonly "numericRange"?: { readonly "min": number | "Infinity" | "-Infinity" | "NaN", readonly "max": number | "Infinity" | "-Infinity" | "NaN" } | null } }
export const MetricsGetDashboardFilterSuggestions200 = Schema.Record(Schema.String, Schema.Struct({ "values": Schema.Array(Schema.String), "numericRange": Schema.optionalKey(Schema.Union([Schema.Struct({ "min": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "max": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }), Schema.Null])) }))
export type MetricsGetDashboardFilterSuggestions400 = ChartQueryValidationErrorEncoded
export const MetricsGetDashboardFilterSuggestions400 = ChartQueryValidationErrorEncoded
export type MetricsGetDashboardFilterSuggestions401 = UnauthorizedErrorEncoded
export const MetricsGetDashboardFilterSuggestions401 = UnauthorizedErrorEncoded
export type MetricsGetDashboardFilterSuggestions403 = ForbiddenErrorEncoded
export const MetricsGetDashboardFilterSuggestions403 = ForbiddenErrorEncoded
export type MetricsGetDashboardFilterSuggestions404 = NotFoundErrorEncoded
export const MetricsGetDashboardFilterSuggestions404 = NotFoundErrorEncoded
export type MetricsGetDashboardFilterSuggestions500 = InternalServerErrorEncoded | MetricsDecodeErrorEncoded | TinybirdErrorEncoded | EffectDrizzleQueryErrorEncoded
export const MetricsGetDashboardFilterSuggestions500 = Schema.Union([InternalServerErrorEncoded, MetricsDecodeErrorEncoded, TinybirdErrorEncoded, EffectDrizzleQueryErrorEncoded])
export type MetricsInterpretDashboardFilterRequestJson = { readonly "query": string, readonly "categories": ReadonlyArray<{ readonly "id": string, readonly "label": string, readonly "values": ReadonlyArray<string>, readonly "isNumeric": boolean, readonly "isBoolean": boolean, readonly "isArray": boolean }>, readonly "currentFilters": ReadonlyArray<{ readonly "categoryId": string, readonly "operator": "is" | "is_not" | "gt" | "gte" | "lt" | "lte", readonly "value": string }> }
export const MetricsInterpretDashboardFilterRequestJson = Schema.Struct({ "query": Schema.String, "categories": Schema.Array(Schema.Struct({ "id": Schema.String, "label": Schema.String, "values": Schema.Array(Schema.String), "isNumeric": Schema.Boolean, "isBoolean": Schema.Boolean, "isArray": Schema.Boolean })), "currentFilters": Schema.Array(Schema.Struct({ "categoryId": Schema.String, "operator": Schema.Literals(["is", "is_not", "gt", "gte", "lt", "lte"]), "value": Schema.String })) })
export type MetricsInterpretDashboardFilter200 = { readonly "filters": ReadonlyArray<{ readonly "categoryId": string, readonly "operator": "is" | "is_not" | "gt" | "gte" | "lt" | "lte", readonly "value": string }>, readonly "unresolved": ReadonlyArray<string>, readonly "categoriesSearched": number | "Infinity" | "-Infinity" | "NaN", readonly "categoriesTotal": number | "Infinity" | "-Infinity" | "NaN" }
export const MetricsInterpretDashboardFilter200 = Schema.Struct({ "filters": Schema.Array(Schema.Struct({ "categoryId": Schema.String, "operator": Schema.Literals(["is", "is_not", "gt", "gte", "lt", "lte"]), "value": Schema.String })), "unresolved": Schema.Array(Schema.String), "categoriesSearched": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "categoriesTotal": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })
export type MetricsInterpretDashboardFilter400 = ChartQueryValidationErrorEncoded
export const MetricsInterpretDashboardFilter400 = ChartQueryValidationErrorEncoded
export type MetricsInterpretDashboardFilter401 = UnauthorizedErrorEncoded
export const MetricsInterpretDashboardFilter401 = UnauthorizedErrorEncoded
export type MetricsInterpretDashboardFilter403 = ForbiddenErrorEncoded
export const MetricsInterpretDashboardFilter403 = ForbiddenErrorEncoded
export type MetricsInterpretDashboardFilter404 = NotFoundErrorEncoded
export const MetricsInterpretDashboardFilter404 = NotFoundErrorEncoded
export type MetricsInterpretDashboardFilter500 = InternalServerErrorEncoded | MetricsDecodeErrorEncoded | TinybirdErrorEncoded | EffectDrizzleQueryErrorEncoded
export const MetricsInterpretDashboardFilter500 = Schema.Union([InternalServerErrorEncoded, MetricsDecodeErrorEncoded, TinybirdErrorEncoded, EffectDrizzleQueryErrorEncoded])
export type MetricsGetProjectsDashboardDataRequestJson = { readonly "ownerId": string, readonly "metrics"?: ReadonlyArray<string> | null }
export const MetricsGetProjectsDashboardDataRequestJson = Schema.Struct({ "ownerId": Schema.String, "metrics": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])) })
export type MetricsGetProjectsDashboardData200 = { readonly "projects": ReadonlyArray<{ readonly "id": string, readonly "name": string, readonly "errorTrackingEnabled": boolean, readonly "webVitalsEnabled": boolean, readonly "sessionReplaysEnabled": boolean, readonly "slug": string, readonly "private": boolean, readonly "templateId": string | null, readonly "createdAt": string, readonly "firstEventAt": string | null, readonly "ownerId": string, readonly "preferredChartColors": ReadonlyArray<string> | null, readonly "icon": { readonly "type": "icon" | "emoji" | "image" | "provider" | "favicon", readonly "value": string, readonly "color"?: string | null | null } | null }>, readonly "stats": { readonly [x: string]: { readonly "events": number | "Infinity" | "-Infinity" | "NaN", readonly "eventsPrevious": number | "Infinity" | "-Infinity" | "NaN", readonly "eventsChange": number | "Infinity" | "-Infinity" | "NaN", readonly "users": number | "Infinity" | "-Infinity" | "NaN", readonly "usersPrevious": number | "Infinity" | "-Infinity" | "NaN", readonly "usersChange": number | "Infinity" | "-Infinity" | "NaN", readonly "errors": number | "Infinity" | "-Infinity" | "NaN", readonly "errorsPrevious": number | "Infinity" | "-Infinity" | "NaN", readonly "errorsChange": number | "Infinity" | "-Infinity" | "NaN", readonly "onlineServers": number | "Infinity" | "-Infinity" | "NaN", readonly "totalServers": number | "Infinity" | "-Infinity" | "NaN", readonly "onlinePlayers": number | "Infinity" | "-Infinity" | "NaN", readonly "totalDownloads": number | "Infinity" | "-Infinity" | "NaN", readonly "lastActivity": string } } }
export const MetricsGetProjectsDashboardData200 = Schema.Struct({ "projects": Schema.Array(Schema.Struct({ "id": Schema.String, "name": Schema.String, "errorTrackingEnabled": Schema.Boolean, "webVitalsEnabled": Schema.Boolean, "sessionReplaysEnabled": Schema.Boolean, "slug": Schema.String, "private": Schema.Boolean, "templateId": Schema.Union([Schema.String, Schema.Null]), "createdAt": Schema.String, "firstEventAt": Schema.Union([Schema.String, Schema.Null]), "ownerId": Schema.String, "preferredChartColors": Schema.Union([Schema.Array(Schema.String), Schema.Null]), "icon": Schema.Union([Schema.Struct({ "type": Schema.Literals(["icon", "emoji", "image", "provider", "favicon"]), "value": Schema.String, "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])) }), Schema.Null]) })), "stats": Schema.Record(Schema.String, Schema.Struct({ "events": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "eventsPrevious": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "eventsChange": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "users": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "usersPrevious": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "usersChange": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "errors": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "errorsPrevious": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "errorsChange": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "onlineServers": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "totalServers": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "onlinePlayers": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "totalDownloads": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "lastActivity": Schema.String })) })
export type MetricsGetProjectsDashboardData400 = ChartQueryValidationErrorEncoded
export const MetricsGetProjectsDashboardData400 = ChartQueryValidationErrorEncoded
export type MetricsGetProjectsDashboardData401 = UnauthorizedErrorEncoded
export const MetricsGetProjectsDashboardData401 = UnauthorizedErrorEncoded
export type MetricsGetProjectsDashboardData403 = ForbiddenErrorEncoded
export const MetricsGetProjectsDashboardData403 = ForbiddenErrorEncoded
export type MetricsGetProjectsDashboardData404 = NotFoundErrorEncoded
export const MetricsGetProjectsDashboardData404 = NotFoundErrorEncoded
export type MetricsGetProjectsDashboardData500 = InternalServerErrorEncoded | MetricsDecodeErrorEncoded | TinybirdErrorEncoded | EffectDrizzleQueryErrorEncoded
export const MetricsGetProjectsDashboardData500 = Schema.Union([InternalServerErrorEncoded, MetricsDecodeErrorEncoded, TinybirdErrorEncoded, EffectDrizzleQueryErrorEncoded])
export type MetricsGetPublicChartData200 = { readonly "chart": { readonly "id": string, readonly "name": string, readonly "description": string | null, readonly "chartType": "widget" | "line" | "area" | "bar" | "pie" | "map" | "list" | "heatmap" | "radar" | "scatter", readonly "queryConfig": { readonly "groupLimit"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "visualOptions"?: { readonly "colors"?: ReadonlyArray<string> | null, readonly "pie"?: { readonly "style"?: "pie" | "donut" | null, readonly "showLegend"?: boolean | null, readonly "showTotal"?: boolean | null, readonly "showLabels"?: boolean | null, readonly "totalDisplayMode"?: "sum" | "count" | null, readonly "drilldown"?: { readonly "enabled"?: boolean | null, readonly "splitPattern"?: string | null } | null } | null, readonly "bar"?: { readonly "logarithmic"?: boolean | null, readonly "stacked"?: boolean | null, readonly "orientation"?: "vertical" | "horizontal" | null } | null, readonly "line"?: { readonly "logarithmic"?: boolean | null, readonly "lineType"?: "monotone" | "linear" | "step" | null, readonly "showDots"?: boolean | null } | null, readonly "widget"?: { readonly "showTrend"?: boolean | null, readonly "displayMode"?: "default" | "compact" | null, readonly "valueFormat"?: "number" | "percent" | "duration_ms" | null } | null, readonly "list"?: { readonly "selectedTabIndex"?: number | null, readonly "splitPattern"?: string | null, readonly "multiMetric"?: boolean | null } | null, readonly "heatmap"?: { readonly "showLegend"?: boolean | null } | null, readonly "radar"?: { readonly "logarithmic"?: boolean | null, readonly "showDots"?: boolean | null, readonly "fillOpacity"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "showLegend"?: boolean | null, readonly "gridType"?: "polygon" | "circle" | null } | null, readonly "scatter"?: { readonly "logarithmic"?: boolean | null, readonly "pointSize"?: "small" | "medium" | "large" | null, readonly "showLegend"?: boolean | null } | null } | null, readonly "markerCollections"?: ReadonlyArray<{ readonly "collectionId": string, readonly "enabled"?: boolean | null, readonly "display"?: { readonly "icon"?: string | null | null, readonly "emoji"?: string | null | null, readonly "color"?: string | null | null } | null }> | null } | null, readonly "query": { readonly "type": "flow", readonly "nodes": ReadonlyArray<{ readonly "id": string, readonly "type"?: string, readonly "data"?: { readonly [x: string]: Schema.Json }, readonly "position"?: { readonly "x"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "y"?: number | "Infinity" | "-Infinity" | "NaN" | null } }>, readonly "edges": ReadonlyArray<{ readonly "id": string, readonly "source": string, readonly "target": string }> } }, readonly "projectName": string, readonly "projectPreferredChartColors": ReadonlyArray<string> | null, readonly "data": Schema.Json, readonly "markers"?: ReadonlyArray<{ readonly "id": string, readonly "collectionId": string, readonly "collectionName": string, readonly "timestamp": string, readonly "title": string, readonly "description": string | null, readonly "icon": string | null, readonly "emoji": string | null, readonly "color": string | null }> | null, readonly "markerCollectionGrouping"?: { readonly [x: string]: "auto" | "minute" | "hour" | "day" | "week" | "chart_bucket" } | null, readonly "flowMeta"?: { readonly "outputs": ReadonlyArray<{ readonly "id": string, readonly "index": number | "Infinity" | "-Infinity" | "NaN", readonly "name": string, readonly "explicitName"?: string | null, readonly "iconSetId": string | null, readonly "color"?: string | null | null, readonly "colors"?: ReadonlyArray<string> | null | null, readonly "sort"?: { readonly "by": "value" | "dimension" | "time", readonly "direction": "asc" | "desc" } | null, readonly "splitPattern"?: string | null, readonly "splitDataSource"?: string | null, readonly "groupField"?: string | null, readonly "groupFields"?: ReadonlyArray<string> | null, readonly "primaryMetric"?: { readonly "field": string, readonly "aggregation": string } | null, readonly "dailyRollup"?: "sum" | "mean" | null }>, readonly "hasTimeGroup": boolean, readonly "hasBreakdownTimeSeries": boolean, readonly "datasourceFields": ReadonlyArray<string>, readonly "splitLabelSeparator": string, readonly "timeGroupInterval"?: "minute" | "hour" | "day" | "week" | "month" | "auto" | null } | null }
export const MetricsGetPublicChartData200 = Schema.Struct({ "chart": Schema.Struct({ "id": Schema.String, "name": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "chartType": Schema.Literals(["widget", "line", "area", "bar", "pie", "map", "list", "heatmap", "radar", "scatter"]), "queryConfig": Schema.Union([Schema.Struct({ "groupLimit": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "visualOptions": Schema.optionalKey(Schema.Union([Schema.Struct({ "colors": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "pie": Schema.optionalKey(Schema.Union([Schema.Struct({ "style": Schema.optionalKey(Schema.Union([Schema.Literals(["pie", "donut"]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showTotal": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showLabels": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "totalDisplayMode": Schema.optionalKey(Schema.Union([Schema.Literals(["sum", "count"]), Schema.Null])), "drilldown": Schema.optionalKey(Schema.Union([Schema.Struct({ "enabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) }), Schema.Null])) }), Schema.Null])), "bar": Schema.optionalKey(Schema.Union([Schema.Struct({ "logarithmic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "stacked": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "orientation": Schema.optionalKey(Schema.Union([Schema.Literals(["vertical", "horizontal"]), Schema.Null])) }), Schema.Null])), "line": Schema.optionalKey(Schema.Union([Schema.Struct({ "logarithmic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "lineType": Schema.optionalKey(Schema.Union([Schema.Literals(["monotone", "linear", "step"]), Schema.Null])), "showDots": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "widget": Schema.optionalKey(Schema.Union([Schema.Struct({ "showTrend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "displayMode": Schema.optionalKey(Schema.Union([Schema.Literals(["default", "compact"]), Schema.Null])), "valueFormat": Schema.optionalKey(Schema.Union([Schema.Literals(["number", "percent", "duration_ms"]), Schema.Null])) }), Schema.Null])), "list": Schema.optionalKey(Schema.Union([Schema.Struct({ "selectedTabIndex": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "multiMetric": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "heatmap": Schema.optionalKey(Schema.Union([Schema.Struct({ "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])), "radar": Schema.optionalKey(Schema.Union([Schema.Struct({ "logarithmic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "showDots": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "fillOpacity": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "gridType": Schema.optionalKey(Schema.Union([Schema.Literals(["polygon", "circle"]), Schema.Null])) }), Schema.Null])), "scatter": Schema.optionalKey(Schema.Union([Schema.Struct({ "logarithmic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "pointSize": Schema.optionalKey(Schema.Union([Schema.Literals(["small", "medium", "large"]), Schema.Null])), "showLegend": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }), Schema.Null])) }), Schema.Null])), "markerCollections": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "collectionId": Schema.String, "enabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "display": Schema.optionalKey(Schema.Union([Schema.Struct({ "icon": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "emoji": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])) }), Schema.Null])) })), Schema.Null])) }), Schema.Null]), "query": Schema.Struct({ "type": Schema.Literal("flow"), "nodes": Schema.Array(Schema.Struct({ "id": Schema.String, "type": Schema.optionalKey(Schema.String), "data": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))), "position": Schema.optionalKey(Schema.Struct({ "x": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "y": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) })) })), "edges": Schema.Array(Schema.Struct({ "id": Schema.String, "source": Schema.String, "target": Schema.String })) }) }), "projectName": Schema.String, "projectPreferredChartColors": Schema.Union([Schema.Array(Schema.String), Schema.Null]), "data": Schema.Json.annotate({ "expected": "JSON value" }), "markers": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "id": Schema.String, "collectionId": Schema.String, "collectionName": Schema.String, "timestamp": Schema.String, "title": Schema.String, "description": Schema.Union([Schema.String, Schema.Null]), "icon": Schema.Union([Schema.String, Schema.Null]), "emoji": Schema.Union([Schema.String, Schema.Null]), "color": Schema.Union([Schema.String, Schema.Null]) })), Schema.Null])), "markerCollectionGrouping": Schema.optionalKey(Schema.Union([Schema.Record(Schema.String, Schema.Literals(["auto", "minute", "hour", "day", "week", "chart_bucket"])), Schema.Null])), "flowMeta": Schema.optionalKey(Schema.Union([Schema.Struct({ "outputs": Schema.Array(Schema.Struct({ "id": Schema.String, "index": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "name": Schema.String, "explicitName": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "iconSetId": Schema.Union([Schema.String, Schema.Null]), "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "colors": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Array(Schema.String), Schema.Null]), Schema.Null])), "sort": Schema.optionalKey(Schema.Union([Schema.Struct({ "by": Schema.Literals(["value", "dimension", "time"]), "direction": Schema.Literals(["asc", "desc"]) }), Schema.Null])), "splitPattern": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "splitDataSource": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "groupField": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "groupFields": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "primaryMetric": Schema.optionalKey(Schema.Union([Schema.Struct({ "field": Schema.String, "aggregation": Schema.String }), Schema.Null])), "dailyRollup": Schema.optionalKey(Schema.Union([Schema.Literals(["sum", "mean"]), Schema.Null])) })), "hasTimeGroup": Schema.Boolean, "hasBreakdownTimeSeries": Schema.Boolean, "datasourceFields": Schema.Array(Schema.String), "splitLabelSeparator": Schema.String, "timeGroupInterval": Schema.optionalKey(Schema.Union([Schema.Literals(["minute", "hour", "day", "week", "month", "auto"]), Schema.Null])) }), Schema.Null])) })
export type MetricsGetPublicChartData404 = NotFoundErrorEncoded
export const MetricsGetPublicChartData404 = NotFoundErrorEncoded
export type MetricsGetPublicChartData500 = InternalServerErrorEncoded | MetricsDecodeErrorEncoded | TinybirdErrorEncoded | EffectDrizzleQueryErrorEncoded
export const MetricsGetPublicChartData500 = Schema.Union([InternalServerErrorEncoded, MetricsDecodeErrorEncoded, TinybirdErrorEncoded, EffectDrizzleQueryErrorEncoded])
export type NetworkRulesListNetworkRules200 = ReadonlyArray<NetworkRuleRecordEncoded>
export const NetworkRulesListNetworkRules200 = Schema.Array(NetworkRuleRecordEncoded)
export type NetworkRulesListNetworkRules400 = NetworkRuleValidationErrorEncoded
export const NetworkRulesListNetworkRules400 = NetworkRuleValidationErrorEncoded
export type NetworkRulesListNetworkRules401 = UnauthorizedErrorEncoded
export const NetworkRulesListNetworkRules401 = UnauthorizedErrorEncoded
export type NetworkRulesListNetworkRules403 = ForbiddenErrorEncoded
export const NetworkRulesListNetworkRules403 = ForbiddenErrorEncoded
export type NetworkRulesListNetworkRules404 = NotFoundErrorEncoded
export const NetworkRulesListNetworkRules404 = NotFoundErrorEncoded
export type NetworkRulesListNetworkRules500 = InternalServerErrorEncoded
export const NetworkRulesListNetworkRules500 = InternalServerErrorEncoded
export type NetworkRulesCreateNetworkRuleRequestJson = { readonly "ipAddress": string, readonly "allowed": boolean }
export const NetworkRulesCreateNetworkRuleRequestJson = Schema.Struct({ "ipAddress": Schema.String, "allowed": Schema.Boolean })
export type NetworkRulesCreateNetworkRule200 = NetworkRuleRecordEncoded
export const NetworkRulesCreateNetworkRule200 = NetworkRuleRecordEncoded
export type NetworkRulesCreateNetworkRule400 = NetworkRuleValidationErrorEncoded
export const NetworkRulesCreateNetworkRule400 = NetworkRuleValidationErrorEncoded
export type NetworkRulesCreateNetworkRule401 = UnauthorizedErrorEncoded
export const NetworkRulesCreateNetworkRule401 = UnauthorizedErrorEncoded
export type NetworkRulesCreateNetworkRule403 = ForbiddenErrorEncoded
export const NetworkRulesCreateNetworkRule403 = ForbiddenErrorEncoded
export type NetworkRulesCreateNetworkRule404 = NotFoundErrorEncoded
export const NetworkRulesCreateNetworkRule404 = NotFoundErrorEncoded
export type NetworkRulesCreateNetworkRule500 = InternalServerErrorEncoded
export const NetworkRulesCreateNetworkRule500 = InternalServerErrorEncoded
export type NetworkRulesDeleteNetworkRule400 = NetworkRuleValidationErrorEncoded
export const NetworkRulesDeleteNetworkRule400 = NetworkRuleValidationErrorEncoded
export type NetworkRulesDeleteNetworkRule401 = UnauthorizedErrorEncoded
export const NetworkRulesDeleteNetworkRule401 = UnauthorizedErrorEncoded
export type NetworkRulesDeleteNetworkRule403 = ForbiddenErrorEncoded
export const NetworkRulesDeleteNetworkRule403 = ForbiddenErrorEncoded
export type NetworkRulesDeleteNetworkRule404 = NotFoundErrorEncoded
export const NetworkRulesDeleteNetworkRule404 = NotFoundErrorEncoded
export type NetworkRulesDeleteNetworkRule500 = InternalServerErrorEncoded
export const NetworkRulesDeleteNetworkRule500 = InternalServerErrorEncoded
export type ProjectsGetProjectBilling200 = { readonly "daily": ReadonlyArray<{ readonly "date": string, readonly "replays": number | "Infinity" | "-Infinity" | "NaN", readonly "summaries": number | "Infinity" | "-Infinity" | "NaN", readonly "summaryCostUsd": number | "Infinity" | "-Infinity" | "NaN", readonly "summariesWithoutCost": number | "Infinity" | "-Infinity" | "NaN", readonly "events": number | "Infinity" | "-Infinity" | "NaN", readonly "errors": number | "Infinity" | "-Infinity" | "NaN", readonly "vitals": number | "Infinity" | "-Infinity" | "NaN" }>, readonly "replayDurations": ReadonlyArray<{ readonly "label": string, readonly "count": number | "Infinity" | "-Infinity" | "NaN" }>, readonly "replays": number | "Infinity" | "-Infinity" | "NaN", readonly "summaries": number | "Infinity" | "-Infinity" | "NaN", readonly "summaryCostUsd": number | "Infinity" | "-Infinity" | "NaN", readonly "summariesWithoutCost": number | "Infinity" | "-Infinity" | "NaN", readonly "events": number | "Infinity" | "-Infinity" | "NaN", readonly "errors": number | "Infinity" | "-Infinity" | "NaN", readonly "vitals": number | "Infinity" | "-Infinity" | "NaN" }
export const ProjectsGetProjectBilling200 = Schema.Struct({ "daily": Schema.Array(Schema.Struct({ "date": Schema.String, "replays": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "summaries": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "summaryCostUsd": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "summariesWithoutCost": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "events": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "errors": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "vitals": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })), "replayDurations": Schema.Array(Schema.Struct({ "label": Schema.String, "count": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })), "replays": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "summaries": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "summaryCostUsd": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "summariesWithoutCost": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "events": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "errors": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "vitals": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })
export type ProjectsGetProjectBilling400 = ProjectValidationErrorEncoded
export const ProjectsGetProjectBilling400 = ProjectValidationErrorEncoded
export type ProjectsGetProjectBilling401 = UnauthorizedErrorEncoded
export const ProjectsGetProjectBilling401 = UnauthorizedErrorEncoded
export type ProjectsGetProjectBilling403 = ForbiddenErrorEncoded
export const ProjectsGetProjectBilling403 = ForbiddenErrorEncoded
export type ProjectsGetProjectBilling404 = NotFoundErrorEncoded
export const ProjectsGetProjectBilling404 = NotFoundErrorEncoded
export type ProjectsGetProjectBilling409 = ProjectConflictErrorEncoded
export const ProjectsGetProjectBilling409 = ProjectConflictErrorEncoded
export type ProjectsGetProjectBilling500 = InternalServerErrorEncoded
export const ProjectsGetProjectBilling500 = InternalServerErrorEncoded
export type ProjectsRequestDataExportRequestJson = { readonly "password": string, readonly "datasets": ReadonlyArray<"web_events" | "mods_events" | "error_tracking" | "web_vitals" | "downloads" | "llm_traces">, readonly "fromMonth"?: string | null, readonly "toMonth"?: string | null }
export const ProjectsRequestDataExportRequestJson = Schema.Struct({ "password": Schema.String, "datasets": Schema.Array(Schema.Literals(["web_events", "mods_events", "error_tracking", "web_vitals", "downloads", "llm_traces"])).check(Schema.isMinLength(1).annotate({ "expected": "a value with a length of at least 1" })).check(Schema.isMaxLength(6).annotate({ "expected": "a value with a length of at most 6" })), "fromMonth": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "toMonth": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type ProjectsRequestDataExport200 = { readonly "id": string | null }
export const ProjectsRequestDataExport200 = Schema.Struct({ "id": Schema.Union([Schema.String, Schema.Null]) })
export type ProjectsRequestDataExport400 = ProjectValidationErrorEncoded
export const ProjectsRequestDataExport400 = ProjectValidationErrorEncoded
export type ProjectsRequestDataExport401 = UnauthorizedErrorEncoded
export const ProjectsRequestDataExport401 = UnauthorizedErrorEncoded
export type ProjectsRequestDataExport403 = ForbiddenErrorEncoded
export const ProjectsRequestDataExport403 = ForbiddenErrorEncoded
export type ProjectsRequestDataExport404 = NotFoundErrorEncoded
export const ProjectsRequestDataExport404 = NotFoundErrorEncoded
export type ProjectsRequestDataExport409 = ProjectConflictErrorEncoded
export const ProjectsRequestDataExport409 = ProjectConflictErrorEncoded
export type ProjectsRequestDataExport500 = InternalServerErrorEncoded
export const ProjectsRequestDataExport500 = InternalServerErrorEncoded
export type ProjectsListProjectsParams = { readonly "ownerId"?: string | null, readonly "projectId"?: string | null, readonly "slug"?: string | null, readonly "search"?: string | null, readonly "limit"?: string | null, readonly "offset"?: string | null }
export const ProjectsListProjectsParams = Schema.Struct({ "ownerId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "projectId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "slug": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "search": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "limit": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "offset": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type ProjectsListProjects200 = { readonly "items": ReadonlyArray<{ readonly "id": string, readonly "name": string, readonly "errorTrackingEnabled": boolean, readonly "webVitalsEnabled": boolean, readonly "sessionReplaysEnabled": boolean, readonly "slug": string, readonly "private": boolean, readonly "templateId": string | null, readonly "createdAt": string, readonly "firstEventAt": string | null, readonly "ownerId": string, readonly "preferredChartColors": ReadonlyArray<string> | null, readonly "icon": { readonly "type": "icon" | "emoji" | "image" | "provider" | "favicon", readonly "value": string, readonly "color"?: string | null | null } | null }>, readonly "total": number | "Infinity" | "-Infinity" | "NaN", readonly "limit": number | "Infinity" | "-Infinity" | "NaN", readonly "offset": number | "Infinity" | "-Infinity" | "NaN", readonly "hasMore": boolean }
export const ProjectsListProjects200 = Schema.Struct({ "items": Schema.Array(Schema.Struct({ "id": Schema.String, "name": Schema.String, "errorTrackingEnabled": Schema.Boolean, "webVitalsEnabled": Schema.Boolean, "sessionReplaysEnabled": Schema.Boolean, "slug": Schema.String, "private": Schema.Boolean, "templateId": Schema.Union([Schema.String, Schema.Null]), "createdAt": Schema.String, "firstEventAt": Schema.Union([Schema.String, Schema.Null]), "ownerId": Schema.String, "preferredChartColors": Schema.Union([Schema.Array(Schema.String), Schema.Null]), "icon": Schema.Union([Schema.Struct({ "type": Schema.Literals(["icon", "emoji", "image", "provider", "favicon"]), "value": Schema.String, "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])) }), Schema.Null]) })), "total": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "limit": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "offset": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "hasMore": Schema.Boolean })
export type ProjectsListProjects400 = ProjectValidationErrorEncoded
export const ProjectsListProjects400 = ProjectValidationErrorEncoded
export type ProjectsListProjects401 = UnauthorizedErrorEncoded
export const ProjectsListProjects401 = UnauthorizedErrorEncoded
export type ProjectsListProjects403 = ForbiddenErrorEncoded
export const ProjectsListProjects403 = ForbiddenErrorEncoded
export type ProjectsListProjects404 = NotFoundErrorEncoded
export const ProjectsListProjects404 = NotFoundErrorEncoded
export type ProjectsListProjects409 = ProjectConflictErrorEncoded
export const ProjectsListProjects409 = ProjectConflictErrorEncoded
export type ProjectsListProjects500 = InternalServerErrorEncoded
export const ProjectsListProjects500 = InternalServerErrorEncoded
export type ProjectsCreateProjectRequestJson = { readonly "name": string, readonly "private": boolean, readonly "errorTrackingEnabled"?: boolean | null, readonly "webVitalsEnabled"?: boolean | null, readonly "sessionReplaysEnabled"?: boolean | null, readonly "templateId"?: string | null | null, readonly "allowedHostnames"?: ReadonlyArray<string> | null | null, readonly "icon"?: { readonly "type": "icon" | "emoji" | "image" | "provider" | "favicon", readonly "value": string, readonly "color"?: string | null | null } | null | null }
export const ProjectsCreateProjectRequestJson = Schema.Struct({ "name": Schema.String, "private": Schema.Boolean, "errorTrackingEnabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "webVitalsEnabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "sessionReplaysEnabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "templateId": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "allowedHostnames": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Array(Schema.String), Schema.Null]), Schema.Null])), "icon": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Struct({ "type": Schema.Literals(["icon", "emoji", "image", "provider", "favicon"]), "value": Schema.String, "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])) }), Schema.Null]), Schema.Null])) })
export type ProjectsCreateProject200 = { readonly "id": string, readonly "name": string, readonly "allowedHostnames": ReadonlyArray<string> | null, readonly "errorTrackingEnabled": boolean, readonly "webVitalsEnabled": boolean, readonly "sessionReplaysEnabled": boolean, readonly "replayRetentionDays": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "cookielessMode": boolean | null, readonly "searchConsoleSiteUrl": string | null, readonly "token": string | null, readonly "slug": string, readonly "private": boolean, readonly "templateId": string | null, readonly "preferredChartColors": ReadonlyArray<string> | null, readonly "codeContextConfig": { readonly "enabled": boolean, readonly "codebergApiUrl"?: string | null | null, readonly "repository": string | null, readonly "ref": string | null, readonly "mappings": ReadonlyArray<{ readonly "id": string, readonly "provider": "github" | "codeberg" | "gitlab" | "bitbucket" | "origin" | null, readonly "javaPrefix": string, readonly "repository": string | null, readonly "ref": string | null, readonly "pathPattern": string, readonly "automatic"?: boolean | null, readonly "contextKey"?: string | null, readonly "fixedRef"?: string | null, readonly "versionRefs"?: { readonly [x: string]: string } | null }> } | null, readonly "icon": { readonly "type": "icon" | "emoji" | "image" | "provider" | "favicon", readonly "value": string, readonly "color"?: string | null | null } | null, readonly "createdAt": string, readonly "firstEventAt": string | null, readonly "ownerId": string, readonly "owner"?: { readonly "id": string, readonly "name": string, readonly "slug": string, readonly "image": string | null, readonly "type": "user" | "organization", readonly "createdAt": string } | null | null }
export const ProjectsCreateProject200 = Schema.Struct({ "id": Schema.String, "name": Schema.String, "allowedHostnames": Schema.Union([Schema.Array(Schema.String), Schema.Null]), "errorTrackingEnabled": Schema.Boolean, "webVitalsEnabled": Schema.Boolean, "sessionReplaysEnabled": Schema.Boolean, "replayRetentionDays": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "cookielessMode": Schema.Union([Schema.Boolean, Schema.Null]), "searchConsoleSiteUrl": Schema.Union([Schema.String, Schema.Null]), "token": Schema.Union([Schema.String, Schema.Null]), "slug": Schema.String, "private": Schema.Boolean, "templateId": Schema.Union([Schema.String, Schema.Null]), "preferredChartColors": Schema.Union([Schema.Array(Schema.String), Schema.Null]), "codeContextConfig": Schema.Union([Schema.Struct({ "enabled": Schema.Boolean, "codebergApiUrl": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "repository": Schema.Union([Schema.String, Schema.Null]), "ref": Schema.Union([Schema.String, Schema.Null]), "mappings": Schema.Array(Schema.Struct({ "id": Schema.String, "provider": Schema.Union([Schema.Literals(["github", "codeberg", "gitlab", "bitbucket", "origin"]), Schema.Null]), "javaPrefix": Schema.String, "repository": Schema.Union([Schema.String, Schema.Null]), "ref": Schema.Union([Schema.String, Schema.Null]), "pathPattern": Schema.String, "automatic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "contextKey": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "fixedRef": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "versionRefs": Schema.optionalKey(Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null])) })) }), Schema.Null]), "icon": Schema.Union([Schema.Struct({ "type": Schema.Literals(["icon", "emoji", "image", "provider", "favicon"]), "value": Schema.String, "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])) }), Schema.Null]), "createdAt": Schema.String, "firstEventAt": Schema.Union([Schema.String, Schema.Null]), "ownerId": Schema.String, "owner": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Struct({ "id": Schema.String, "name": Schema.String, "slug": Schema.String, "image": Schema.Union([Schema.String, Schema.Null]), "type": Schema.Literals(["user", "organization"]), "createdAt": Schema.String }), Schema.Null]), Schema.Null])) })
export type ProjectsCreateProject400 = ProjectValidationErrorEncoded
export const ProjectsCreateProject400 = ProjectValidationErrorEncoded
export type ProjectsCreateProject401 = UnauthorizedErrorEncoded
export const ProjectsCreateProject401 = UnauthorizedErrorEncoded
export type ProjectsCreateProject403 = ForbiddenErrorEncoded
export const ProjectsCreateProject403 = ForbiddenErrorEncoded
export type ProjectsCreateProject404 = NotFoundErrorEncoded
export const ProjectsCreateProject404 = NotFoundErrorEncoded
export type ProjectsCreateProject409 = ProjectConflictErrorEncoded
export const ProjectsCreateProject409 = ProjectConflictErrorEncoded
export type ProjectsCreateProject500 = InternalServerErrorEncoded
export const ProjectsCreateProject500 = InternalServerErrorEncoded
export type ProjectsListPublicProjectsParams = { readonly "ownerId"?: string | null, readonly "ownerSlug"?: string | null, readonly "slug"?: string | null, readonly "search"?: string | null, readonly "limit"?: string | null, readonly "offset"?: string | null, readonly "sort"?: "createdAt" | "name" | "creator" | "online" | "total" | null, readonly "direction"?: "asc" | "desc" | null }
export const ProjectsListPublicProjectsParams = Schema.Struct({ "ownerId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "ownerSlug": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "slug": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "search": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "limit": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "offset": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "sort": Schema.optionalKey(Schema.Union([Schema.Literals(["createdAt", "name", "creator", "online", "total"]), Schema.Null])), "direction": Schema.optionalKey(Schema.Union([Schema.Literals(["asc", "desc"]), Schema.Null])) })
export type ProjectsListPublicProjects200 = { readonly "items": ReadonlyArray<{ readonly "id": string, readonly "name": string, readonly "slug": string, readonly "createdAt": string, readonly "ownerId": string, readonly "owner": { readonly "id": string, readonly "name": string, readonly "slug": string, readonly "image": string | null, readonly "type": "user" | "organization", readonly "createdAt": string } | null, readonly "templateId": string | null, readonly "icon": { readonly "type": "icon" | "emoji" | "image" | "provider" | "favicon", readonly "value": string, readonly "color"?: string | null | null } | null, readonly "online": number | "Infinity" | "-Infinity" | "NaN", readonly "total": number | "Infinity" | "-Infinity" | "NaN" }>, readonly "total": number | "Infinity" | "-Infinity" | "NaN", readonly "limit": number | "Infinity" | "-Infinity" | "NaN", readonly "offset": number | "Infinity" | "-Infinity" | "NaN", readonly "hasMore": boolean, readonly "stats": { readonly "projectCount": number | "Infinity" | "-Infinity" | "NaN", readonly "onlineServers": number | "Infinity" | "-Infinity" | "NaN", readonly "totalServers": number | "Infinity" | "-Infinity" | "NaN" } }
export const ProjectsListPublicProjects200 = Schema.Struct({ "items": Schema.Array(Schema.Struct({ "id": Schema.String, "name": Schema.String, "slug": Schema.String, "createdAt": Schema.String, "ownerId": Schema.String, "owner": Schema.Union([Schema.Struct({ "id": Schema.String, "name": Schema.String, "slug": Schema.String, "image": Schema.Union([Schema.String, Schema.Null]), "type": Schema.Literals(["user", "organization"]), "createdAt": Schema.String }), Schema.Null]), "templateId": Schema.Union([Schema.String, Schema.Null]), "icon": Schema.Union([Schema.Struct({ "type": Schema.Literals(["icon", "emoji", "image", "provider", "favicon"]), "value": Schema.String, "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])) }), Schema.Null]), "online": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "total": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })), "total": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "limit": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "offset": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "hasMore": Schema.Boolean, "stats": Schema.Struct({ "projectCount": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "onlineServers": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "totalServers": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }) })
export type ProjectsListPublicProjects500 = InternalServerErrorEncoded
export const ProjectsListPublicProjects500 = InternalServerErrorEncoded
export type ProjectsGetPublicProjectStats200 = PublicProjectStatsRecord
export const ProjectsGetPublicProjectStats200 = PublicProjectStatsRecord
export type ProjectsGetPublicProjectStats404 = NotFoundErrorEncoded
export const ProjectsGetPublicProjectStats404 = NotFoundErrorEncoded
export type ProjectsGetPublicProjectStats500 = InternalServerErrorEncoded
export const ProjectsGetPublicProjectStats500 = InternalServerErrorEncoded
export type ProjectsGetProject200 = { readonly "id": string, readonly "name": string, readonly "allowedHostnames": ReadonlyArray<string> | null, readonly "errorTrackingEnabled": boolean, readonly "webVitalsEnabled": boolean, readonly "sessionReplaysEnabled": boolean, readonly "replayRetentionDays": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "cookielessMode": boolean | null, readonly "searchConsoleSiteUrl": string | null, readonly "token": string | null, readonly "slug": string, readonly "private": boolean, readonly "templateId": string | null, readonly "preferredChartColors": ReadonlyArray<string> | null, readonly "codeContextConfig": { readonly "enabled": boolean, readonly "codebergApiUrl"?: string | null | null, readonly "repository": string | null, readonly "ref": string | null, readonly "mappings": ReadonlyArray<{ readonly "id": string, readonly "provider": "github" | "codeberg" | "gitlab" | "bitbucket" | "origin" | null, readonly "javaPrefix": string, readonly "repository": string | null, readonly "ref": string | null, readonly "pathPattern": string, readonly "automatic"?: boolean | null, readonly "contextKey"?: string | null, readonly "fixedRef"?: string | null, readonly "versionRefs"?: { readonly [x: string]: string } | null }> } | null, readonly "icon": { readonly "type": "icon" | "emoji" | "image" | "provider" | "favicon", readonly "value": string, readonly "color"?: string | null | null } | null, readonly "createdAt": string, readonly "firstEventAt": string | null, readonly "ownerId": string, readonly "owner"?: { readonly "id": string, readonly "name": string, readonly "slug": string, readonly "image": string | null, readonly "type": "user" | "organization", readonly "createdAt": string } | null | null } | { readonly "id": string, readonly "name": string, readonly "errorTrackingEnabled"?: boolean | null, readonly "webVitalsEnabled"?: boolean | null, readonly "sessionReplaysEnabled"?: boolean | null, readonly "slug": string, readonly "private": boolean, readonly "templateId": string | null, readonly "createdAt": string, readonly "firstEventAt": string | null, readonly "ownerId": string, readonly "owner": { readonly "id": string, readonly "name": string, readonly "slug": string, readonly "image": string | null, readonly "type": "user" | "organization", readonly "createdAt": string } | null, readonly "preferredChartColors": ReadonlyArray<string> | null, readonly "icon": { readonly "type": "icon" | "emoji" | "image" | "provider" | "favicon", readonly "value": string, readonly "color"?: string | null | null } | null }
export const ProjectsGetProject200 = Schema.Union([Schema.Struct({ "id": Schema.String, "name": Schema.String, "allowedHostnames": Schema.Union([Schema.Array(Schema.String), Schema.Null]), "errorTrackingEnabled": Schema.Boolean, "webVitalsEnabled": Schema.Boolean, "sessionReplaysEnabled": Schema.Boolean, "replayRetentionDays": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "cookielessMode": Schema.Union([Schema.Boolean, Schema.Null]), "searchConsoleSiteUrl": Schema.Union([Schema.String, Schema.Null]), "token": Schema.Union([Schema.String, Schema.Null]), "slug": Schema.String, "private": Schema.Boolean, "templateId": Schema.Union([Schema.String, Schema.Null]), "preferredChartColors": Schema.Union([Schema.Array(Schema.String), Schema.Null]), "codeContextConfig": Schema.Union([Schema.Struct({ "enabled": Schema.Boolean, "codebergApiUrl": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "repository": Schema.Union([Schema.String, Schema.Null]), "ref": Schema.Union([Schema.String, Schema.Null]), "mappings": Schema.Array(Schema.Struct({ "id": Schema.String, "provider": Schema.Union([Schema.Literals(["github", "codeberg", "gitlab", "bitbucket", "origin"]), Schema.Null]), "javaPrefix": Schema.String, "repository": Schema.Union([Schema.String, Schema.Null]), "ref": Schema.Union([Schema.String, Schema.Null]), "pathPattern": Schema.String, "automatic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "contextKey": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "fixedRef": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "versionRefs": Schema.optionalKey(Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null])) })) }), Schema.Null]), "icon": Schema.Union([Schema.Struct({ "type": Schema.Literals(["icon", "emoji", "image", "provider", "favicon"]), "value": Schema.String, "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])) }), Schema.Null]), "createdAt": Schema.String, "firstEventAt": Schema.Union([Schema.String, Schema.Null]), "ownerId": Schema.String, "owner": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Struct({ "id": Schema.String, "name": Schema.String, "slug": Schema.String, "image": Schema.Union([Schema.String, Schema.Null]), "type": Schema.Literals(["user", "organization"]), "createdAt": Schema.String }), Schema.Null]), Schema.Null])) }), Schema.Struct({ "id": Schema.String, "name": Schema.String, "errorTrackingEnabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "webVitalsEnabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "sessionReplaysEnabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "slug": Schema.String, "private": Schema.Boolean, "templateId": Schema.Union([Schema.String, Schema.Null]), "createdAt": Schema.String, "firstEventAt": Schema.Union([Schema.String, Schema.Null]), "ownerId": Schema.String, "owner": Schema.Union([Schema.Struct({ "id": Schema.String, "name": Schema.String, "slug": Schema.String, "image": Schema.Union([Schema.String, Schema.Null]), "type": Schema.Literals(["user", "organization"]), "createdAt": Schema.String }), Schema.Null]), "preferredChartColors": Schema.Union([Schema.Array(Schema.String), Schema.Null]), "icon": Schema.Union([Schema.Struct({ "type": Schema.Literals(["icon", "emoji", "image", "provider", "favicon"]), "value": Schema.String, "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])) }), Schema.Null]) })])
export type ProjectsGetProject400 = ProjectValidationErrorEncoded
export const ProjectsGetProject400 = ProjectValidationErrorEncoded
export type ProjectsGetProject401 = UnauthorizedErrorEncoded
export const ProjectsGetProject401 = UnauthorizedErrorEncoded
export type ProjectsGetProject403 = ForbiddenErrorEncoded
export const ProjectsGetProject403 = ForbiddenErrorEncoded
export type ProjectsGetProject404 = NotFoundErrorEncoded
export const ProjectsGetProject404 = NotFoundErrorEncoded
export type ProjectsGetProject409 = ProjectConflictErrorEncoded
export const ProjectsGetProject409 = ProjectConflictErrorEncoded
export type ProjectsGetProject500 = InternalServerErrorEncoded
export const ProjectsGetProject500 = InternalServerErrorEncoded
export type ProjectsDeleteProjectRequestJson = { readonly "password": string }
export const ProjectsDeleteProjectRequestJson = Schema.Struct({ "password": Schema.String })
export type ProjectsDeleteProject400 = ProjectValidationErrorEncoded
export const ProjectsDeleteProject400 = ProjectValidationErrorEncoded
export type ProjectsDeleteProject401 = UnauthorizedErrorEncoded
export const ProjectsDeleteProject401 = UnauthorizedErrorEncoded
export type ProjectsDeleteProject403 = ForbiddenErrorEncoded
export const ProjectsDeleteProject403 = ForbiddenErrorEncoded
export type ProjectsDeleteProject404 = NotFoundErrorEncoded
export const ProjectsDeleteProject404 = NotFoundErrorEncoded
export type ProjectsDeleteProject409 = ProjectConflictErrorEncoded
export const ProjectsDeleteProject409 = ProjectConflictErrorEncoded
export type ProjectsDeleteProject500 = InternalServerErrorEncoded
export const ProjectsDeleteProject500 = InternalServerErrorEncoded
export type ProjectsUpdateProjectRequestJson = { readonly "name"?: string | null, readonly "slug"?: string | null, readonly "private"?: boolean | null, readonly "allowedHostnames"?: ReadonlyArray<string> | null | null, readonly "errorTrackingEnabled"?: boolean | null, readonly "webVitalsEnabled"?: boolean | null, readonly "sessionReplaysEnabled"?: boolean | null, readonly "replayRetentionDays"?: number | "Infinity" | "-Infinity" | "NaN" | null | null, readonly "cookielessMode"?: boolean | null | null, readonly "searchConsoleSiteUrl"?: string | null | null, readonly "preferredChartColors"?: ReadonlyArray<string> | null | null, readonly "codeContextConfig"?: { readonly "enabled": boolean, readonly "codebergApiUrl"?: string | null | null, readonly "repository": string | null, readonly "ref": string | null, readonly "mappings": ReadonlyArray<{ readonly "id": string, readonly "provider": "github" | "codeberg" | "gitlab" | "bitbucket" | "origin" | null, readonly "javaPrefix": string, readonly "repository": string | null, readonly "ref": string | null, readonly "pathPattern": string, readonly "automatic"?: boolean | null, readonly "contextKey"?: string | null, readonly "fixedRef"?: string | null, readonly "versionRefs"?: { readonly [x: string]: string } | null }> } | null | null, readonly "icon"?: { readonly "type": "icon" | "emoji" | "image" | "provider" | "favicon", readonly "value": string, readonly "color"?: string | null | null } | null | null }
export const ProjectsUpdateProjectRequestJson = Schema.Struct({ "name": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "slug": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "private": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "allowedHostnames": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Array(Schema.String), Schema.Null]), Schema.Null])), "errorTrackingEnabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "webVitalsEnabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "sessionReplaysEnabled": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "replayRetentionDays": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])), "cookielessMode": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Boolean, Schema.Null]), Schema.Null])), "searchConsoleSiteUrl": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "preferredChartColors": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Array(Schema.String), Schema.Null]), Schema.Null])), "codeContextConfig": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Struct({ "enabled": Schema.Boolean, "codebergApiUrl": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "repository": Schema.Union([Schema.String, Schema.Null]), "ref": Schema.Union([Schema.String, Schema.Null]), "mappings": Schema.Array(Schema.Struct({ "id": Schema.String, "provider": Schema.Union([Schema.Literals(["github", "codeberg", "gitlab", "bitbucket", "origin"]), Schema.Null]), "javaPrefix": Schema.String, "repository": Schema.Union([Schema.String, Schema.Null]), "ref": Schema.Union([Schema.String, Schema.Null]), "pathPattern": Schema.String, "automatic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "contextKey": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "fixedRef": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "versionRefs": Schema.optionalKey(Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null])) })) }), Schema.Null]), Schema.Null])), "icon": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Struct({ "type": Schema.Literals(["icon", "emoji", "image", "provider", "favicon"]), "value": Schema.String, "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])) }), Schema.Null]), Schema.Null])) })
export type ProjectsUpdateProject200 = { readonly "id": string, readonly "name": string, readonly "allowedHostnames": ReadonlyArray<string> | null, readonly "errorTrackingEnabled": boolean, readonly "webVitalsEnabled": boolean, readonly "sessionReplaysEnabled": boolean, readonly "replayRetentionDays": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "cookielessMode": boolean | null, readonly "searchConsoleSiteUrl": string | null, readonly "token": string | null, readonly "slug": string, readonly "private": boolean, readonly "templateId": string | null, readonly "preferredChartColors": ReadonlyArray<string> | null, readonly "codeContextConfig": { readonly "enabled": boolean, readonly "codebergApiUrl"?: string | null | null, readonly "repository": string | null, readonly "ref": string | null, readonly "mappings": ReadonlyArray<{ readonly "id": string, readonly "provider": "github" | "codeberg" | "gitlab" | "bitbucket" | "origin" | null, readonly "javaPrefix": string, readonly "repository": string | null, readonly "ref": string | null, readonly "pathPattern": string, readonly "automatic"?: boolean | null, readonly "contextKey"?: string | null, readonly "fixedRef"?: string | null, readonly "versionRefs"?: { readonly [x: string]: string } | null }> } | null, readonly "icon": { readonly "type": "icon" | "emoji" | "image" | "provider" | "favicon", readonly "value": string, readonly "color"?: string | null | null } | null, readonly "createdAt": string, readonly "firstEventAt": string | null, readonly "ownerId": string, readonly "owner"?: { readonly "id": string, readonly "name": string, readonly "slug": string, readonly "image": string | null, readonly "type": "user" | "organization", readonly "createdAt": string } | null | null }
export const ProjectsUpdateProject200 = Schema.Struct({ "id": Schema.String, "name": Schema.String, "allowedHostnames": Schema.Union([Schema.Array(Schema.String), Schema.Null]), "errorTrackingEnabled": Schema.Boolean, "webVitalsEnabled": Schema.Boolean, "sessionReplaysEnabled": Schema.Boolean, "replayRetentionDays": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "cookielessMode": Schema.Union([Schema.Boolean, Schema.Null]), "searchConsoleSiteUrl": Schema.Union([Schema.String, Schema.Null]), "token": Schema.Union([Schema.String, Schema.Null]), "slug": Schema.String, "private": Schema.Boolean, "templateId": Schema.Union([Schema.String, Schema.Null]), "preferredChartColors": Schema.Union([Schema.Array(Schema.String), Schema.Null]), "codeContextConfig": Schema.Union([Schema.Struct({ "enabled": Schema.Boolean, "codebergApiUrl": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])), "repository": Schema.Union([Schema.String, Schema.Null]), "ref": Schema.Union([Schema.String, Schema.Null]), "mappings": Schema.Array(Schema.Struct({ "id": Schema.String, "provider": Schema.Union([Schema.Literals(["github", "codeberg", "gitlab", "bitbucket", "origin"]), Schema.Null]), "javaPrefix": Schema.String, "repository": Schema.Union([Schema.String, Schema.Null]), "ref": Schema.Union([Schema.String, Schema.Null]), "pathPattern": Schema.String, "automatic": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "contextKey": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "fixedRef": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "versionRefs": Schema.optionalKey(Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null])) })) }), Schema.Null]), "icon": Schema.Union([Schema.Struct({ "type": Schema.Literals(["icon", "emoji", "image", "provider", "favicon"]), "value": Schema.String, "color": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])) }), Schema.Null]), "createdAt": Schema.String, "firstEventAt": Schema.Union([Schema.String, Schema.Null]), "ownerId": Schema.String, "owner": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Struct({ "id": Schema.String, "name": Schema.String, "slug": Schema.String, "image": Schema.Union([Schema.String, Schema.Null]), "type": Schema.Literals(["user", "organization"]), "createdAt": Schema.String }), Schema.Null]), Schema.Null])) })
export type ProjectsUpdateProject400 = ProjectValidationErrorEncoded
export const ProjectsUpdateProject400 = ProjectValidationErrorEncoded
export type ProjectsUpdateProject401 = UnauthorizedErrorEncoded
export const ProjectsUpdateProject401 = UnauthorizedErrorEncoded
export type ProjectsUpdateProject403 = ForbiddenErrorEncoded
export const ProjectsUpdateProject403 = ForbiddenErrorEncoded
export type ProjectsUpdateProject404 = NotFoundErrorEncoded
export const ProjectsUpdateProject404 = NotFoundErrorEncoded
export type ProjectsUpdateProject409 = ProjectConflictErrorEncoded
export const ProjectsUpdateProject409 = ProjectConflictErrorEncoded
export type ProjectsUpdateProject500 = InternalServerErrorEncoded
export const ProjectsUpdateProject500 = InternalServerErrorEncoded
export type ProjectsCheckProjectData200 = boolean
export const ProjectsCheckProjectData200 = Schema.Boolean
export type ProjectsCheckProjectData400 = ProjectValidationErrorEncoded
export const ProjectsCheckProjectData400 = ProjectValidationErrorEncoded
export type ProjectsCheckProjectData401 = UnauthorizedErrorEncoded
export const ProjectsCheckProjectData401 = UnauthorizedErrorEncoded
export type ProjectsCheckProjectData403 = ForbiddenErrorEncoded
export const ProjectsCheckProjectData403 = ForbiddenErrorEncoded
export type ProjectsCheckProjectData404 = NotFoundErrorEncoded
export const ProjectsCheckProjectData404 = NotFoundErrorEncoded
export type ProjectsCheckProjectData409 = ProjectConflictErrorEncoded
export const ProjectsCheckProjectData409 = ProjectConflictErrorEncoded
export type ProjectsCheckProjectData500 = InternalServerErrorEncoded
export const ProjectsCheckProjectData500 = InternalServerErrorEncoded
export type ProjectsCheckSlugAvailabilityParams = { readonly "excludeProjectId"?: string | null }
export const ProjectsCheckSlugAvailabilityParams = Schema.Struct({ "excludeProjectId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type ProjectsCheckSlugAvailability200 = { readonly "available": boolean, readonly "reason"?: string | null }
export const ProjectsCheckSlugAvailability200 = Schema.Struct({ "available": Schema.Boolean, "reason": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type ProjectsCheckSlugAvailability400 = ProjectValidationErrorEncoded
export const ProjectsCheckSlugAvailability400 = ProjectValidationErrorEncoded
export type ProjectsCheckSlugAvailability401 = UnauthorizedErrorEncoded
export const ProjectsCheckSlugAvailability401 = UnauthorizedErrorEncoded
export type ProjectsCheckSlugAvailability403 = ForbiddenErrorEncoded
export const ProjectsCheckSlugAvailability403 = ForbiddenErrorEncoded
export type ProjectsCheckSlugAvailability404 = NotFoundErrorEncoded
export const ProjectsCheckSlugAvailability404 = NotFoundErrorEncoded
export type ProjectsCheckSlugAvailability409 = ProjectConflictErrorEncoded
export const ProjectsCheckSlugAvailability409 = ProjectConflictErrorEncoded
export type ProjectsCheckSlugAvailability500 = InternalServerErrorEncoded
export const ProjectsCheckSlugAvailability500 = InternalServerErrorEncoded
export type ProjectsMoveProjectRequestJson = { readonly "targetOwnerId": string | null }
export const ProjectsMoveProjectRequestJson = Schema.Struct({ "targetOwnerId": Schema.Union([Schema.String, Schema.Null]) })
export type ProjectsMoveProject400 = ProjectValidationErrorEncoded
export const ProjectsMoveProject400 = ProjectValidationErrorEncoded
export type ProjectsMoveProject401 = UnauthorizedErrorEncoded
export const ProjectsMoveProject401 = UnauthorizedErrorEncoded
export type ProjectsMoveProject403 = ForbiddenErrorEncoded
export const ProjectsMoveProject403 = ForbiddenErrorEncoded
export type ProjectsMoveProject404 = NotFoundErrorEncoded
export const ProjectsMoveProject404 = NotFoundErrorEncoded
export type ProjectsMoveProject409 = ProjectConflictErrorEncoded
export const ProjectsMoveProject409 = ProjectConflictErrorEncoded
export type ProjectsMoveProject500 = InternalServerErrorEncoded
export const ProjectsMoveProject500 = InternalServerErrorEncoded
export type ProjectsWipeProjectDataRequestJson = { readonly "password": string }
export const ProjectsWipeProjectDataRequestJson = Schema.Struct({ "password": Schema.String })
export type ProjectsWipeProjectData400 = ProjectValidationErrorEncoded
export const ProjectsWipeProjectData400 = ProjectValidationErrorEncoded
export type ProjectsWipeProjectData401 = UnauthorizedErrorEncoded
export const ProjectsWipeProjectData401 = UnauthorizedErrorEncoded
export type ProjectsWipeProjectData403 = ForbiddenErrorEncoded
export const ProjectsWipeProjectData403 = ForbiddenErrorEncoded
export type ProjectsWipeProjectData404 = NotFoundErrorEncoded
export const ProjectsWipeProjectData404 = NotFoundErrorEncoded
export type ProjectsWipeProjectData409 = ProjectConflictErrorEncoded
export const ProjectsWipeProjectData409 = ProjectConflictErrorEncoded
export type ProjectsWipeProjectData500 = InternalServerErrorEncoded
export const ProjectsWipeProjectData500 = InternalServerErrorEncoded
export type ProjectsResetProjectErrorTrackingRequestJson = { readonly "password": string }
export const ProjectsResetProjectErrorTrackingRequestJson = Schema.Struct({ "password": Schema.String })
export type ProjectsResetProjectErrorTracking400 = ProjectValidationErrorEncoded
export const ProjectsResetProjectErrorTracking400 = ProjectValidationErrorEncoded
export type ProjectsResetProjectErrorTracking401 = UnauthorizedErrorEncoded
export const ProjectsResetProjectErrorTracking401 = UnauthorizedErrorEncoded
export type ProjectsResetProjectErrorTracking403 = ForbiddenErrorEncoded
export const ProjectsResetProjectErrorTracking403 = ForbiddenErrorEncoded
export type ProjectsResetProjectErrorTracking404 = NotFoundErrorEncoded
export const ProjectsResetProjectErrorTracking404 = NotFoundErrorEncoded
export type ProjectsResetProjectErrorTracking409 = ProjectConflictErrorEncoded
export const ProjectsResetProjectErrorTracking409 = ProjectConflictErrorEncoded
export type ProjectsResetProjectErrorTracking500 = InternalServerErrorEncoded
export const ProjectsResetProjectErrorTracking500 = InternalServerErrorEncoded
export type RetentionGetRetentionForProjectParams = { readonly "granularity"?: "day" | "week" | "month" | null, readonly "cohortFrom": string, readonly "cohortTo": string, readonly "periodCount"?: string | null, readonly "includeHasMore"?: string | null, readonly "source": "web" | "mods", readonly "timezone"?: string | null, readonly "filterFields"?: string | ReadonlyArray<string> | null, readonly "filterOperators"?: "is" | "is_not" | "gt" | "lt" | "gte" | "lte" | ReadonlyArray<"is" | "is_not" | "gt" | "lt" | "gte" | "lte"> | null, readonly "filterValues"?: string | ReadonlyArray<string> | null }
export const RetentionGetRetentionForProjectParams = Schema.Struct({ "granularity": Schema.optionalKey(Schema.Union([Schema.Literals(["day", "week", "month"]), Schema.Null])), "cohortFrom": Schema.String, "cohortTo": Schema.String, "periodCount": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "includeHasMore": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "source": Schema.Literals(["web", "mods"]), "timezone": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "filterFields": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Array(Schema.String)]), Schema.Null])), "filterOperators": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Literals(["is", "is_not", "gt", "lt", "gte", "lte"]), Schema.Array(Schema.Literals(["is", "is_not", "gt", "lt", "gte", "lte"]))]), Schema.Null])), "filterValues": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Array(Schema.String)]), Schema.Null])) })
export type RetentionGetRetentionForProject200 = RetentionCohortPageEncoded
export const RetentionGetRetentionForProject200 = RetentionCohortPageEncoded
export type RetentionGetRetentionForProject401 = UnauthorizedErrorEncoded
export const RetentionGetRetentionForProject401 = UnauthorizedErrorEncoded
export type RetentionGetRetentionForProject403 = ForbiddenErrorEncoded
export const RetentionGetRetentionForProject403 = ForbiddenErrorEncoded
export type RetentionGetRetentionForProject404 = NotFoundErrorEncoded
export const RetentionGetRetentionForProject404 = NotFoundErrorEncoded
export type RetentionGetRetentionForProject500 = InternalServerErrorEncoded
export const RetentionGetRetentionForProject500 = InternalServerErrorEncoded
export type RetentionGetRetentionDriversForProjectParams = { readonly "granularity"?: "day" | "week" | "month" | null, readonly "cohortFrom": string, readonly "cohortTo": string, readonly "targetPeriod"?: string | null, readonly "source": "web" | "mods", readonly "minSegmentUsers"?: string | null, readonly "timezone"?: string | null, readonly "filterFields"?: string | ReadonlyArray<string> | null, readonly "filterOperators"?: "is" | "is_not" | "gt" | "lt" | "gte" | "lte" | ReadonlyArray<"is" | "is_not" | "gt" | "lt" | "gte" | "lte"> | null, readonly "filterValues"?: string | ReadonlyArray<string> | null }
export const RetentionGetRetentionDriversForProjectParams = Schema.Struct({ "granularity": Schema.optionalKey(Schema.Union([Schema.Literals(["day", "week", "month"]), Schema.Null])), "cohortFrom": Schema.String, "cohortTo": Schema.String, "targetPeriod": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "source": Schema.Literals(["web", "mods"]), "minSegmentUsers": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "timezone": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "filterFields": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Array(Schema.String)]), Schema.Null])), "filterOperators": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Literals(["is", "is_not", "gt", "lt", "gte", "lte"]), Schema.Array(Schema.Literals(["is", "is_not", "gt", "lt", "gte", "lte"]))]), Schema.Null])), "filterValues": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Array(Schema.String)]), Schema.Null])) })
export type RetentionGetRetentionDriversForProject200 = ReadonlyArray<RetentionDriverDataEncoded>
export const RetentionGetRetentionDriversForProject200 = Schema.Array(RetentionDriverDataEncoded)
export type RetentionGetRetentionDriversForProject401 = UnauthorizedErrorEncoded
export const RetentionGetRetentionDriversForProject401 = UnauthorizedErrorEncoded
export type RetentionGetRetentionDriversForProject403 = ForbiddenErrorEncoded
export const RetentionGetRetentionDriversForProject403 = ForbiddenErrorEncoded
export type RetentionGetRetentionDriversForProject404 = NotFoundErrorEncoded
export const RetentionGetRetentionDriversForProject404 = NotFoundErrorEncoded
export type RetentionGetRetentionDriversForProject500 = InternalServerErrorEncoded
export const RetentionGetRetentionDriversForProject500 = InternalServerErrorEncoded
export type ReplayInsightsListInsightsParams = { readonly "from"?: string | null, readonly "to"?: string | null, readonly "status"?: "open" | "resolved" | "ignored" | "merged" | null, readonly "sort"?: "title" | "affected-sessions" | "trend" | "first-seen" | "last-seen" | null, readonly "direction"?: "asc" | "desc" | null, readonly "limit"?: string | null, readonly "offset"?: string | null }
export const ReplayInsightsListInsightsParams = Schema.Struct({ "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "status": Schema.optionalKey(Schema.Union([Schema.Literals(["open", "resolved", "ignored", "merged"]), Schema.Null])), "sort": Schema.optionalKey(Schema.Union([Schema.Literals(["title", "affected-sessions", "trend", "first-seen", "last-seen"]), Schema.Null])), "direction": Schema.optionalKey(Schema.Union([Schema.Literals(["asc", "desc"]), Schema.Null])), "limit": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "offset": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type ReplayInsightsListInsights200 = { readonly "items": ReadonlyArray<{ readonly "viewed": boolean, readonly "id": string, readonly "title": string, readonly "description": string, readonly "status": "open" | "resolved" | "ignored" | "merged", readonly "mergedInto": string | null, readonly "affectedSessions": number | "Infinity" | "-Infinity" | "NaN", readonly "identifiedUsers": number | "Infinity" | "-Infinity" | "NaN", readonly "occurrences": number | "Infinity" | "-Infinity" | "NaN", readonly "previousAffectedSessions": number | "Infinity" | "-Infinity" | "NaN", readonly "trendPercent": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "firstSeen": string, readonly "lastSeen": string, readonly "excerpt": string | null }>, readonly "totalItems": number | "Infinity" | "-Infinity" | "NaN", readonly "analyzedSessions": number | "Infinity" | "-Infinity" | "NaN", readonly "eligibleRecordedSessions": number | "Infinity" | "-Infinity" | "NaN" }
export const ReplayInsightsListInsights200 = Schema.Struct({ "items": Schema.Array(Schema.Struct({ "viewed": Schema.Boolean, "id": Schema.String, "title": Schema.String, "description": Schema.String, "status": Schema.Literals(["open", "resolved", "ignored", "merged"]), "mergedInto": Schema.Union([Schema.String, Schema.Null]), "affectedSessions": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "identifiedUsers": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "occurrences": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "previousAffectedSessions": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "trendPercent": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "firstSeen": Schema.String, "lastSeen": Schema.String, "excerpt": Schema.Union([Schema.String, Schema.Null]) })), "totalItems": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "analyzedSessions": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "eligibleRecordedSessions": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })
export type ReplayInsightsListInsights400 = ReplayInsightBadRequestErrorEncoded
export const ReplayInsightsListInsights400 = ReplayInsightBadRequestErrorEncoded
export type ReplayInsightsListInsights401 = UnauthorizedErrorEncoded
export const ReplayInsightsListInsights401 = UnauthorizedErrorEncoded
export type ReplayInsightsListInsights403 = ForbiddenErrorEncoded
export const ReplayInsightsListInsights403 = ForbiddenErrorEncoded
export type ReplayInsightsListInsights404 = NotFoundErrorEncoded
export const ReplayInsightsListInsights404 = NotFoundErrorEncoded
export type ReplayInsightsListInsights500 = InternalServerErrorEncoded
export const ReplayInsightsListInsights500 = InternalServerErrorEncoded
export type ReplayInsightsGetInsightParams = { readonly "from"?: string | null, readonly "to"?: string | null, readonly "limit"?: string | null, readonly "offset"?: string | null }
export const ReplayInsightsGetInsightParams = Schema.Struct({ "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "limit": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "offset": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type ReplayInsightsGetInsight200 = { readonly "insight": { readonly "viewed": boolean, readonly "id": string, readonly "title": string, readonly "description": string, readonly "status": "open" | "resolved" | "ignored" | "merged", readonly "mergedInto": string | null, readonly "affectedSessions": number | "Infinity" | "-Infinity" | "NaN", readonly "identifiedUsers": number | "Infinity" | "-Infinity" | "NaN", readonly "occurrences": number | "Infinity" | "-Infinity" | "NaN", readonly "previousAffectedSessions": number | "Infinity" | "-Infinity" | "NaN", readonly "trendPercent": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "firstSeen": string, readonly "lastSeen": string, readonly "excerpt": string | null }, readonly "evidence": ReadonlyArray<{ readonly "painPointId": string, readonly "sessionId": string, readonly "windowId": string, readonly "identifier": string | null, readonly "name": string | null, readonly "email": string | null, readonly "externalId": string | null, readonly "startedAt": string, readonly "replayStartMs": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "timestampMs": number | "Infinity" | "-Infinity" | "NaN", readonly "route": string | null, readonly "browser": string | null, readonly "os": string | null, readonly "description": string, readonly "evidence": string | null }>, readonly "totalEvidence": number | "Infinity" | "-Infinity" | "NaN", readonly "daily": ReadonlyArray<{ readonly "date": string, readonly "sessions": number | "Infinity" | "-Infinity" | "NaN" }>, readonly "routes": ReadonlyArray<{ readonly "value": string, readonly "sessions": number | "Infinity" | "-Infinity" | "NaN" }>, readonly "devices": ReadonlyArray<{ readonly "value": string, readonly "sessions": number | "Infinity" | "-Infinity" | "NaN" }> }
export const ReplayInsightsGetInsight200 = Schema.Struct({ "insight": Schema.Struct({ "viewed": Schema.Boolean, "id": Schema.String, "title": Schema.String, "description": Schema.String, "status": Schema.Literals(["open", "resolved", "ignored", "merged"]), "mergedInto": Schema.Union([Schema.String, Schema.Null]), "affectedSessions": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "identifiedUsers": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "occurrences": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "previousAffectedSessions": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "trendPercent": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "firstSeen": Schema.String, "lastSeen": Schema.String, "excerpt": Schema.Union([Schema.String, Schema.Null]) }), "evidence": Schema.Array(Schema.Struct({ "painPointId": Schema.String, "sessionId": Schema.String, "windowId": Schema.String, "identifier": Schema.Union([Schema.String, Schema.Null]), "name": Schema.Union([Schema.String, Schema.Null]), "email": Schema.Union([Schema.String, Schema.Null]), "externalId": Schema.Union([Schema.String, Schema.Null]), "startedAt": Schema.String, "replayStartMs": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "timestampMs": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "route": Schema.Union([Schema.String, Schema.Null]), "browser": Schema.Union([Schema.String, Schema.Null]), "os": Schema.Union([Schema.String, Schema.Null]), "description": Schema.String, "evidence": Schema.Union([Schema.String, Schema.Null]) })), "totalEvidence": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "daily": Schema.Array(Schema.Struct({ "date": Schema.String, "sessions": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })), "routes": Schema.Array(Schema.Struct({ "value": Schema.String, "sessions": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })), "devices": Schema.Array(Schema.Struct({ "value": Schema.String, "sessions": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })) })
export type ReplayInsightsGetInsight400 = ReplayInsightBadRequestErrorEncoded
export const ReplayInsightsGetInsight400 = ReplayInsightBadRequestErrorEncoded
export type ReplayInsightsGetInsight401 = UnauthorizedErrorEncoded
export const ReplayInsightsGetInsight401 = UnauthorizedErrorEncoded
export type ReplayInsightsGetInsight403 = ForbiddenErrorEncoded
export const ReplayInsightsGetInsight403 = ForbiddenErrorEncoded
export type ReplayInsightsGetInsight404 = NotFoundErrorEncoded
export const ReplayInsightsGetInsight404 = NotFoundErrorEncoded
export type ReplayInsightsGetInsight500 = InternalServerErrorEncoded
export const ReplayInsightsGetInsight500 = InternalServerErrorEncoded
export type ReplayInsightsMarkInsightViewed400 = ReplayInsightBadRequestErrorEncoded
export const ReplayInsightsMarkInsightViewed400 = ReplayInsightBadRequestErrorEncoded
export type ReplayInsightsMarkInsightViewed401 = UnauthorizedErrorEncoded
export const ReplayInsightsMarkInsightViewed401 = UnauthorizedErrorEncoded
export type ReplayInsightsMarkInsightViewed403 = ForbiddenErrorEncoded
export const ReplayInsightsMarkInsightViewed403 = ForbiddenErrorEncoded
export type ReplayInsightsMarkInsightViewed404 = NotFoundErrorEncoded
export const ReplayInsightsMarkInsightViewed404 = NotFoundErrorEncoded
export type ReplayInsightsMarkInsightViewed500 = InternalServerErrorEncoded
export const ReplayInsightsMarkInsightViewed500 = InternalServerErrorEncoded
export type ReplayInsightsUpdateInsightStatusRequestJson = { readonly "status": "open" | "resolved" | "ignored" }
export const ReplayInsightsUpdateInsightStatusRequestJson = Schema.Struct({ "status": Schema.Literals(["open", "resolved", "ignored"]) })
export type ReplayInsightsUpdateInsightStatus200 = { readonly "viewed": boolean, readonly "id": string, readonly "title": string, readonly "description": string, readonly "status": "open" | "resolved" | "ignored" | "merged", readonly "mergedInto": string | null, readonly "affectedSessions": number | "Infinity" | "-Infinity" | "NaN", readonly "identifiedUsers": number | "Infinity" | "-Infinity" | "NaN", readonly "occurrences": number | "Infinity" | "-Infinity" | "NaN", readonly "previousAffectedSessions": number | "Infinity" | "-Infinity" | "NaN", readonly "trendPercent": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "firstSeen": string, readonly "lastSeen": string, readonly "excerpt": string | null }
export const ReplayInsightsUpdateInsightStatus200 = Schema.Struct({ "viewed": Schema.Boolean, "id": Schema.String, "title": Schema.String, "description": Schema.String, "status": Schema.Literals(["open", "resolved", "ignored", "merged"]), "mergedInto": Schema.Union([Schema.String, Schema.Null]), "affectedSessions": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "identifiedUsers": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "occurrences": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "previousAffectedSessions": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "trendPercent": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "firstSeen": Schema.String, "lastSeen": Schema.String, "excerpt": Schema.Union([Schema.String, Schema.Null]) })
export type ReplayInsightsUpdateInsightStatus400 = ReplayInsightBadRequestErrorEncoded
export const ReplayInsightsUpdateInsightStatus400 = ReplayInsightBadRequestErrorEncoded
export type ReplayInsightsUpdateInsightStatus401 = UnauthorizedErrorEncoded
export const ReplayInsightsUpdateInsightStatus401 = UnauthorizedErrorEncoded
export type ReplayInsightsUpdateInsightStatus403 = ForbiddenErrorEncoded
export const ReplayInsightsUpdateInsightStatus403 = ForbiddenErrorEncoded
export type ReplayInsightsUpdateInsightStatus404 = NotFoundErrorEncoded
export const ReplayInsightsUpdateInsightStatus404 = NotFoundErrorEncoded
export type ReplayInsightsUpdateInsightStatus500 = InternalServerErrorEncoded
export const ReplayInsightsUpdateInsightStatus500 = InternalServerErrorEncoded
export type ReplayInsightsMergeInsightsRequestJson = { readonly "sourceInsightIds": ReadonlyArray<string> }
export const ReplayInsightsMergeInsightsRequestJson = Schema.Struct({ "sourceInsightIds": Schema.Array(Schema.String.annotate({ "format": "uuid" }).check(Schema.isPattern(new RegExp("^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$", "u")).annotate({ "expected": "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$" }))).check(Schema.isMinLength(1).annotate({ "expected": "a value with a length of at least 1" })).check(Schema.isMaxLength(100).annotate({ "expected": "a value with a length of at most 100" })) })
export type ReplayInsightsMergeInsights200 = { readonly "viewed": boolean, readonly "id": string, readonly "title": string, readonly "description": string, readonly "status": "open" | "resolved" | "ignored" | "merged", readonly "mergedInto": string | null, readonly "affectedSessions": number | "Infinity" | "-Infinity" | "NaN", readonly "identifiedUsers": number | "Infinity" | "-Infinity" | "NaN", readonly "occurrences": number | "Infinity" | "-Infinity" | "NaN", readonly "previousAffectedSessions": number | "Infinity" | "-Infinity" | "NaN", readonly "trendPercent": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "firstSeen": string, readonly "lastSeen": string, readonly "excerpt": string | null }
export const ReplayInsightsMergeInsights200 = Schema.Struct({ "viewed": Schema.Boolean, "id": Schema.String, "title": Schema.String, "description": Schema.String, "status": Schema.Literals(["open", "resolved", "ignored", "merged"]), "mergedInto": Schema.Union([Schema.String, Schema.Null]), "affectedSessions": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "identifiedUsers": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "occurrences": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "previousAffectedSessions": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "trendPercent": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "firstSeen": Schema.String, "lastSeen": Schema.String, "excerpt": Schema.Union([Schema.String, Schema.Null]) })
export type ReplayInsightsMergeInsights400 = ReplayInsightBadRequestErrorEncoded
export const ReplayInsightsMergeInsights400 = ReplayInsightBadRequestErrorEncoded
export type ReplayInsightsMergeInsights401 = UnauthorizedErrorEncoded
export const ReplayInsightsMergeInsights401 = UnauthorizedErrorEncoded
export type ReplayInsightsMergeInsights403 = ForbiddenErrorEncoded
export const ReplayInsightsMergeInsights403 = ForbiddenErrorEncoded
export type ReplayInsightsMergeInsights404 = NotFoundErrorEncoded
export const ReplayInsightsMergeInsights404 = NotFoundErrorEncoded
export type ReplayInsightsMergeInsights500 = InternalServerErrorEncoded
export const ReplayInsightsMergeInsights500 = InternalServerErrorEncoded
export type ReplayInsightsSplitInsightRequestJson = { readonly "painPointIds": ReadonlyArray<string>, readonly "title": string, readonly "description": string }
export const ReplayInsightsSplitInsightRequestJson = Schema.Struct({ "painPointIds": Schema.Array(Schema.String.annotate({ "format": "uuid" }).check(Schema.isPattern(new RegExp("^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$", "u")).annotate({ "expected": "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$" }))).check(Schema.isMinLength(1).annotate({ "expected": "a value with a length of at least 1" })).check(Schema.isMaxLength(100).annotate({ "expected": "a value with a length of at most 100" })), "title": Schema.String, "description": Schema.String })
export type ReplayInsightsSplitInsight200 = { readonly "viewed": boolean, readonly "id": string, readonly "title": string, readonly "description": string, readonly "status": "open" | "resolved" | "ignored" | "merged", readonly "mergedInto": string | null, readonly "affectedSessions": number | "Infinity" | "-Infinity" | "NaN", readonly "identifiedUsers": number | "Infinity" | "-Infinity" | "NaN", readonly "occurrences": number | "Infinity" | "-Infinity" | "NaN", readonly "previousAffectedSessions": number | "Infinity" | "-Infinity" | "NaN", readonly "trendPercent": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "firstSeen": string, readonly "lastSeen": string, readonly "excerpt": string | null }
export const ReplayInsightsSplitInsight200 = Schema.Struct({ "viewed": Schema.Boolean, "id": Schema.String, "title": Schema.String, "description": Schema.String, "status": Schema.Literals(["open", "resolved", "ignored", "merged"]), "mergedInto": Schema.Union([Schema.String, Schema.Null]), "affectedSessions": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "identifiedUsers": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "occurrences": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "previousAffectedSessions": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "trendPercent": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "firstSeen": Schema.String, "lastSeen": Schema.String, "excerpt": Schema.Union([Schema.String, Schema.Null]) })
export type ReplayInsightsSplitInsight400 = ReplayInsightBadRequestErrorEncoded
export const ReplayInsightsSplitInsight400 = ReplayInsightBadRequestErrorEncoded
export type ReplayInsightsSplitInsight401 = UnauthorizedErrorEncoded
export const ReplayInsightsSplitInsight401 = UnauthorizedErrorEncoded
export type ReplayInsightsSplitInsight403 = ForbiddenErrorEncoded
export const ReplayInsightsSplitInsight403 = ForbiddenErrorEncoded
export type ReplayInsightsSplitInsight404 = NotFoundErrorEncoded
export const ReplayInsightsSplitInsight404 = NotFoundErrorEncoded
export type ReplayInsightsSplitInsight500 = InternalServerErrorEncoded
export const ReplayInsightsSplitInsight500 = InternalServerErrorEncoded
export type SessionReplaysGetReplaySummary200 = { readonly "summary": { readonly "summary": string, readonly "confidence"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "painPoints": ReadonlyArray<{ readonly "timestampMs": number | "Infinity" | "-Infinity" | "NaN", readonly "description": string, readonly "evidence"?: string | null, readonly "confidence"?: number | "Infinity" | "-Infinity" | "NaN" | null }> } | null, readonly "metadata": { readonly "model": string, readonly "responseId": string | null, readonly "promptVersion": string, readonly "schemaVersion": number | "Infinity" | "-Infinity" | "NaN", readonly "costUsd": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "promptTokens": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "completionTokens": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "latencyMs": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "renderFps": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "renderSpeed": number | "Infinity" | "-Infinity" | "NaN" | null } | null, readonly "replayStartMs": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "status": string | null, readonly "priority": number | "Infinity" | "-Infinity" | "NaN", readonly "analysisEligible": boolean, readonly "finalizationState": "open" | "complete" | "timed_out_incomplete", readonly "coverage": { readonly "ranges": ReadonlyArray<ReadonlyArray<number | "Infinity" | "-Infinity" | "NaN">>, readonly "terminal": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "unknown": "legacy_contract" | "range_limit" | null } }
export const SessionReplaysGetReplaySummary200 = Schema.Struct({ "summary": Schema.Union([Schema.Struct({ "summary": Schema.String, "confidence": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "painPoints": Schema.Array(Schema.Struct({ "timestampMs": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "description": Schema.String, "evidence": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "confidence": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])) })) }), Schema.Null]), "metadata": Schema.Union([Schema.Struct({ "model": Schema.String, "responseId": Schema.Union([Schema.String, Schema.Null]), "promptVersion": Schema.String, "schemaVersion": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "costUsd": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "promptTokens": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "completionTokens": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "latencyMs": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "renderFps": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "renderSpeed": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]) }), Schema.Null]), "replayStartMs": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "status": Schema.Union([Schema.String, Schema.Null]), "priority": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "analysisEligible": Schema.Boolean, "finalizationState": Schema.Literals(["open", "complete", "timed_out_incomplete"]), "coverage": Schema.Struct({ "ranges": Schema.Array(Schema.Array(Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]))), "terminal": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "unknown": Schema.Union([Schema.Literals(["legacy_contract", "range_limit"]), Schema.Null]) }) })
export type SessionReplaysGetReplaySummary400 = SessionReplaysValidationErrorEncoded
export const SessionReplaysGetReplaySummary400 = SessionReplaysValidationErrorEncoded
export type SessionReplaysGetReplaySummary401 = UnauthorizedErrorEncoded
export const SessionReplaysGetReplaySummary401 = UnauthorizedErrorEncoded
export type SessionReplaysGetReplaySummary403 = ForbiddenErrorEncoded
export const SessionReplaysGetReplaySummary403 = ForbiddenErrorEncoded
export type SessionReplaysGetReplaySummary404 = NotFoundErrorEncoded
export const SessionReplaysGetReplaySummary404 = NotFoundErrorEncoded
export type SessionReplaysGetReplaySummary500 = InternalServerErrorEncoded
export const SessionReplaysGetReplaySummary500 = InternalServerErrorEncoded
export type SessionReplaysSummarizeReplay400 = SessionReplaysValidationErrorEncoded
export const SessionReplaysSummarizeReplay400 = SessionReplaysValidationErrorEncoded
export type SessionReplaysSummarizeReplay401 = UnauthorizedErrorEncoded
export const SessionReplaysSummarizeReplay401 = UnauthorizedErrorEncoded
export type SessionReplaysSummarizeReplay403 = ForbiddenErrorEncoded
export const SessionReplaysSummarizeReplay403 = ForbiddenErrorEncoded
export type SessionReplaysSummarizeReplay404 = NotFoundErrorEncoded
export const SessionReplaysSummarizeReplay404 = NotFoundErrorEncoded
export type SessionReplaysSummarizeReplay500 = InternalServerErrorEncoded
export const SessionReplaysSummarizeReplay500 = InternalServerErrorEncoded
export type SessionReplaysGetReplaySummaryRules200 = ReplaySummaryRulesResponseEncoded
export const SessionReplaysGetReplaySummaryRules200 = ReplaySummaryRulesResponseEncoded
export type SessionReplaysGetReplaySummaryRules400 = SessionReplaysValidationErrorEncoded
export const SessionReplaysGetReplaySummaryRules400 = SessionReplaysValidationErrorEncoded
export type SessionReplaysGetReplaySummaryRules401 = UnauthorizedErrorEncoded
export const SessionReplaysGetReplaySummaryRules401 = UnauthorizedErrorEncoded
export type SessionReplaysGetReplaySummaryRules403 = ForbiddenErrorEncoded
export const SessionReplaysGetReplaySummaryRules403 = ForbiddenErrorEncoded
export type SessionReplaysGetReplaySummaryRules404 = NotFoundErrorEncoded
export const SessionReplaysGetReplaySummaryRules404 = NotFoundErrorEncoded
export type SessionReplaysGetReplaySummaryRules500 = InternalServerErrorEncoded
export const SessionReplaysGetReplaySummaryRules500 = InternalServerErrorEncoded
export type SessionReplaysSaveReplaySummaryRulesRequestJson = { readonly "mode": "off" | "all" | "filtered", readonly "sampleRate": number | "Infinity" | "-Infinity" | "NaN", readonly "dailyLimit": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "conditionSets": ReadonlyArray<{ readonly "conditions": ReadonlyArray<{ readonly "field": "country" | "browser" | "os" | "identifier" | "route" | "entry_route" | "exit_route" | "user_email" | "user_name" | "user_external_id" | "user_trait", readonly "operator": "is" | "is_not" | "contains" | "not_contains" | "starts_with" | "ends_with" | "is_set" | "is_not_set", readonly "values": ReadonlyArray<string>, readonly "traitKey": string | null } | { readonly "field": "duration_seconds" | "click_count" | "rage_click_count" | "event_count" | "route_count", readonly "operator": "eq" | "neq" | "gt" | "gte" | "lt" | "lte", readonly "value": number | "Infinity" | "-Infinity" | "NaN" } | { readonly "field": "has_errors" | "has_poor_vitals" | "is_identified", readonly "operator": "is_true" | "is_false" }> }>, readonly "people": ReadonlyArray<{ readonly "personId": string, readonly "effect": "include" | "exclude" }> }
export const SessionReplaysSaveReplaySummaryRulesRequestJson = Schema.Struct({ "mode": Schema.Literals(["off", "all", "filtered"]), "sampleRate": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "dailyLimit": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "conditionSets": Schema.Array(Schema.Struct({ "conditions": Schema.Array(Schema.Union([Schema.Struct({ "field": Schema.Literals(["country", "browser", "os", "identifier", "route", "entry_route", "exit_route", "user_email", "user_name", "user_external_id", "user_trait"]), "operator": Schema.Literals(["is", "is_not", "contains", "not_contains", "starts_with", "ends_with", "is_set", "is_not_set"]), "values": Schema.Array(Schema.String), "traitKey": Schema.Union([Schema.String, Schema.Null]) }), Schema.Struct({ "field": Schema.Literals(["duration_seconds", "click_count", "rage_click_count", "event_count", "route_count"]), "operator": Schema.Literals(["eq", "neq", "gt", "gte", "lt", "lte"]), "value": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }), Schema.Struct({ "field": Schema.Literals(["has_errors", "has_poor_vitals", "is_identified"]), "operator": Schema.Literals(["is_true", "is_false"]) })])) })), "people": Schema.Array(Schema.Struct({ "personId": Schema.String, "effect": Schema.Literals(["include", "exclude"]) })) })
export type SessionReplaysSaveReplaySummaryRules200 = ReplaySummaryRulesResponseEncoded
export const SessionReplaysSaveReplaySummaryRules200 = ReplaySummaryRulesResponseEncoded
export type SessionReplaysSaveReplaySummaryRules400 = SessionReplaysValidationErrorEncoded
export const SessionReplaysSaveReplaySummaryRules400 = SessionReplaysValidationErrorEncoded
export type SessionReplaysSaveReplaySummaryRules401 = UnauthorizedErrorEncoded
export const SessionReplaysSaveReplaySummaryRules401 = UnauthorizedErrorEncoded
export type SessionReplaysSaveReplaySummaryRules403 = ForbiddenErrorEncoded
export const SessionReplaysSaveReplaySummaryRules403 = ForbiddenErrorEncoded
export type SessionReplaysSaveReplaySummaryRules404 = NotFoundErrorEncoded
export const SessionReplaysSaveReplaySummaryRules404 = NotFoundErrorEncoded
export type SessionReplaysSaveReplaySummaryRules500 = InternalServerErrorEncoded
export const SessionReplaysSaveReplaySummaryRules500 = InternalServerErrorEncoded
export type SessionReplaysPreviewReplaySummaryRulesRequestJson = { readonly "mode": "off" | "all" | "filtered", readonly "sampleRate": number | "Infinity" | "-Infinity" | "NaN", readonly "dailyLimit": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "conditionSets": ReadonlyArray<{ readonly "conditions": ReadonlyArray<{ readonly "field": "country" | "browser" | "os" | "identifier" | "route" | "entry_route" | "exit_route" | "user_email" | "user_name" | "user_external_id" | "user_trait", readonly "operator": "is" | "is_not" | "contains" | "not_contains" | "starts_with" | "ends_with" | "is_set" | "is_not_set", readonly "values": ReadonlyArray<string>, readonly "traitKey": string | null } | { readonly "field": "duration_seconds" | "click_count" | "rage_click_count" | "event_count" | "route_count", readonly "operator": "eq" | "neq" | "gt" | "gte" | "lt" | "lte", readonly "value": number | "Infinity" | "-Infinity" | "NaN" } | { readonly "field": "has_errors" | "has_poor_vitals" | "is_identified", readonly "operator": "is_true" | "is_false" }> }>, readonly "people": ReadonlyArray<{ readonly "personId": string, readonly "effect": "include" | "exclude" }> }
export const SessionReplaysPreviewReplaySummaryRulesRequestJson = Schema.Struct({ "mode": Schema.Literals(["off", "all", "filtered"]), "sampleRate": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "dailyLimit": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "conditionSets": Schema.Array(Schema.Struct({ "conditions": Schema.Array(Schema.Union([Schema.Struct({ "field": Schema.Literals(["country", "browser", "os", "identifier", "route", "entry_route", "exit_route", "user_email", "user_name", "user_external_id", "user_trait"]), "operator": Schema.Literals(["is", "is_not", "contains", "not_contains", "starts_with", "ends_with", "is_set", "is_not_set"]), "values": Schema.Array(Schema.String), "traitKey": Schema.Union([Schema.String, Schema.Null]) }), Schema.Struct({ "field": Schema.Literals(["duration_seconds", "click_count", "rage_click_count", "event_count", "route_count"]), "operator": Schema.Literals(["eq", "neq", "gt", "gte", "lt", "lte"]), "value": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }), Schema.Struct({ "field": Schema.Literals(["has_errors", "has_poor_vitals", "is_identified"]), "operator": Schema.Literals(["is_true", "is_false"]) })])) })), "people": Schema.Array(Schema.Struct({ "personId": Schema.String, "effect": Schema.Literals(["include", "exclude"]) })) })
export type SessionReplaysPreviewReplaySummaryRules200 = ReplaySummaryPreviewEncoded
export const SessionReplaysPreviewReplaySummaryRules200 = ReplaySummaryPreviewEncoded
export type SessionReplaysPreviewReplaySummaryRules400 = SessionReplaysValidationErrorEncoded
export const SessionReplaysPreviewReplaySummaryRules400 = SessionReplaysValidationErrorEncoded
export type SessionReplaysPreviewReplaySummaryRules401 = UnauthorizedErrorEncoded
export const SessionReplaysPreviewReplaySummaryRules401 = UnauthorizedErrorEncoded
export type SessionReplaysPreviewReplaySummaryRules403 = ForbiddenErrorEncoded
export const SessionReplaysPreviewReplaySummaryRules403 = ForbiddenErrorEncoded
export type SessionReplaysPreviewReplaySummaryRules404 = NotFoundErrorEncoded
export const SessionReplaysPreviewReplaySummaryRules404 = NotFoundErrorEncoded
export type SessionReplaysPreviewReplaySummaryRules500 = InternalServerErrorEncoded
export const SessionReplaysPreviewReplaySummaryRules500 = InternalServerErrorEncoded
export type SessionReplaysListReplaysParams = { readonly "sessionId"?: string | null, readonly "sortBy"?: "date-desc" | "date-asc" | "duration-desc" | "duration-asc" | "events-desc" | "events-asc" | "id-asc" | "id-desc" | null, readonly "cursorSortValue"?: string | null, readonly "from"?: string | null, readonly "to"?: string | null, readonly "pageSize"?: string | null, readonly "cursorStartedAt"?: string | null, readonly "cursorSessionId"?: string | null, readonly "cursorWindowId"?: string | null, readonly "collectionId"?: string | null, readonly "collectionFilterConfig"?: string | null, readonly "listFilterConfig"?: string | null, readonly "userIds"?: string | ReadonlyArray<string> | null }
export const SessionReplaysListReplaysParams = Schema.Struct({ "sessionId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "sortBy": Schema.optionalKey(Schema.Union([Schema.Literals(["date-desc", "date-asc", "duration-desc", "duration-asc", "events-desc", "events-asc", "id-asc", "id-desc"]), Schema.Null])), "cursorSortValue": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "pageSize": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "cursorStartedAt": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "cursorSessionId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "cursorWindowId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "collectionId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "collectionFilterConfig": Schema.optionalKey(Schema.Union([Schema.String.annotate({ "contentMediaType": "application/json" }), Schema.Null])), "listFilterConfig": Schema.optionalKey(Schema.Union([Schema.String.annotate({ "contentMediaType": "application/json" }), Schema.Null])), "userIds": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Array(Schema.String)]), Schema.Null])) })
export type SessionReplaysListReplays200 = { readonly "items": ReadonlyArray<SessionReplayListItemEncoded>, readonly "nextCursor": { readonly "sortValue"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "startedAt": number | "Infinity" | "-Infinity" | "NaN", readonly "sessionId": string, readonly "windowId": string } | null }
export const SessionReplaysListReplays200 = Schema.Struct({ "items": Schema.Array(SessionReplayListItemEncoded), "nextCursor": Schema.Union([Schema.Struct({ "sortValue": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "startedAt": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "sessionId": Schema.String, "windowId": Schema.String }), Schema.Null]) })
export type SessionReplaysListReplays400 = SessionReplaysValidationErrorEncoded
export const SessionReplaysListReplays400 = SessionReplaysValidationErrorEncoded
export type SessionReplaysListReplays401 = UnauthorizedErrorEncoded
export const SessionReplaysListReplays401 = UnauthorizedErrorEncoded
export type SessionReplaysListReplays403 = ForbiddenErrorEncoded
export const SessionReplaysListReplays403 = ForbiddenErrorEncoded
export type SessionReplaysListReplays404 = NotFoundErrorEncoded
export const SessionReplaysListReplays404 = NotFoundErrorEncoded
export type SessionReplaysListReplays500 = InternalServerErrorEncoded
export const SessionReplaysListReplays500 = InternalServerErrorEncoded
export type SessionReplaysGetReplayCountParams = { readonly "from"?: string | null, readonly "to"?: string | null, readonly "collectionId"?: string | null, readonly "collectionFilterConfig"?: string | null, readonly "listFilterConfig"?: string | null, readonly "userIds"?: string | ReadonlyArray<string> | null }
export const SessionReplaysGetReplayCountParams = Schema.Struct({ "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "collectionId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "collectionFilterConfig": Schema.optionalKey(Schema.Union([Schema.String.annotate({ "contentMediaType": "application/json" }), Schema.Null])), "listFilterConfig": Schema.optionalKey(Schema.Union([Schema.String.annotate({ "contentMediaType": "application/json" }), Schema.Null])), "userIds": Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Array(Schema.String)]), Schema.Null])) })
export type SessionReplaysGetReplayCount200 = number | "Infinity" | "-Infinity" | "NaN"
export const SessionReplaysGetReplayCount200 = Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])])
export type SessionReplaysGetReplayCount400 = SessionReplaysValidationErrorEncoded
export const SessionReplaysGetReplayCount400 = SessionReplaysValidationErrorEncoded
export type SessionReplaysGetReplayCount401 = UnauthorizedErrorEncoded
export const SessionReplaysGetReplayCount401 = UnauthorizedErrorEncoded
export type SessionReplaysGetReplayCount403 = ForbiddenErrorEncoded
export const SessionReplaysGetReplayCount403 = ForbiddenErrorEncoded
export type SessionReplaysGetReplayCount404 = NotFoundErrorEncoded
export const SessionReplaysGetReplayCount404 = NotFoundErrorEncoded
export type SessionReplaysGetReplayCount500 = InternalServerErrorEncoded
export const SessionReplaysGetReplayCount500 = InternalServerErrorEncoded
export type SessionReplaysListReplayCollectionsParams = { readonly "includeCounts"?: "true" | "false" | null }
export const SessionReplaysListReplayCollectionsParams = Schema.Struct({ "includeCounts": Schema.optionalKey(Schema.Union([Schema.Literals(["true", "false"]), Schema.Null])) })
export type SessionReplaysListReplayCollections200 = ReadonlyArray<ReplayCollectionRecordEncoded>
export const SessionReplaysListReplayCollections200 = Schema.Array(ReplayCollectionRecordEncoded)
export type SessionReplaysListReplayCollections400 = SessionReplaysValidationErrorEncoded
export const SessionReplaysListReplayCollections400 = SessionReplaysValidationErrorEncoded
export type SessionReplaysListReplayCollections401 = UnauthorizedErrorEncoded
export const SessionReplaysListReplayCollections401 = UnauthorizedErrorEncoded
export type SessionReplaysListReplayCollections403 = ForbiddenErrorEncoded
export const SessionReplaysListReplayCollections403 = ForbiddenErrorEncoded
export type SessionReplaysListReplayCollections404 = NotFoundErrorEncoded
export const SessionReplaysListReplayCollections404 = NotFoundErrorEncoded
export type SessionReplaysListReplayCollections500 = InternalServerErrorEncoded
export const SessionReplaysListReplayCollections500 = InternalServerErrorEncoded
export type SessionReplaysCreateReplayCollectionRequestJson = { readonly "name": string, readonly "mode": "manual" | "automatic", readonly "filterConfig"?: { readonly "viewed"?: boolean | null, readonly "identifiedState"?: "identified" | "anonymous" | null, readonly "browserIn"?: ReadonlyArray<string> | null, readonly "osIn"?: ReadonlyArray<string> | null, readonly "countryIn"?: ReadonlyArray<string> | null, readonly "routeVisitedAny"?: ReadonlyArray<string> | null, readonly "minClickCount"?: number | null, readonly "maxClickCount"?: number | null, readonly "minRageClickCount"?: number | null, readonly "maxRageClickCount"?: number | null, readonly "minEventCount"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "maxEventCount"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "minDurationMs"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "maxDurationMs"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "hasErrors"?: boolean | null, readonly "hasSummary"?: boolean | null, readonly "hasPainPoints"?: boolean | null, readonly "hasPoorVitals"?: boolean | null, readonly "poorVitalMetric"?: string | null, readonly "playbackStart"?: "session_start" | "matched_event" | null, readonly "datasourceFilters"?: ReadonlyArray<{ readonly "referenceId": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "greater_than" | "less_than", readonly "value": string, readonly "dataType"?: "string" | "number" | "boolean" | null }> | null } | null | null }
export const SessionReplaysCreateReplayCollectionRequestJson = Schema.Struct({ "name": Schema.String, "mode": Schema.Literals(["manual", "automatic"]), "filterConfig": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Struct({ "viewed": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "identifiedState": Schema.optionalKey(Schema.Union([Schema.Literals(["identified", "anonymous"]), Schema.Null])), "browserIn": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "osIn": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "countryIn": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "routeVisitedAny": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "minClickCount": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isInt().annotate({ "expected": "an integer" })).check(Schema.isGreaterThanOrEqualTo(0).annotate({ "expected": "a value greater than or equal to 0" })).check(Schema.isLessThanOrEqualTo(2147483647).annotate({ "expected": "a value less than or equal to 2147483647" })), Schema.Null])), "maxClickCount": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isInt().annotate({ "expected": "an integer" })).check(Schema.isGreaterThanOrEqualTo(0).annotate({ "expected": "a value greater than or equal to 0" })).check(Schema.isLessThanOrEqualTo(2147483647).annotate({ "expected": "a value less than or equal to 2147483647" })), Schema.Null])), "minRageClickCount": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isInt().annotate({ "expected": "an integer" })).check(Schema.isGreaterThanOrEqualTo(0).annotate({ "expected": "a value greater than or equal to 0" })).check(Schema.isLessThanOrEqualTo(2147483647).annotate({ "expected": "a value less than or equal to 2147483647" })), Schema.Null])), "maxRageClickCount": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isInt().annotate({ "expected": "an integer" })).check(Schema.isGreaterThanOrEqualTo(0).annotate({ "expected": "a value greater than or equal to 0" })).check(Schema.isLessThanOrEqualTo(2147483647).annotate({ "expected": "a value less than or equal to 2147483647" })), Schema.Null])), "minEventCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "maxEventCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "minDurationMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "maxDurationMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "hasErrors": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "hasSummary": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "hasPainPoints": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "hasPoorVitals": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "poorVitalMetric": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "playbackStart": Schema.optionalKey(Schema.Union([Schema.Literals(["session_start", "matched_event"]), Schema.Null])), "datasourceFilters": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "referenceId": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "greater_than", "less_than"]), "value": Schema.String, "dataType": Schema.optionalKey(Schema.Union([Schema.Literals(["string", "number", "boolean"]), Schema.Null])) })), Schema.Null])) }), Schema.Null]), Schema.Null])) })
export type SessionReplaysCreateReplayCollection200 = ReplayCollectionRecordEncoded
export const SessionReplaysCreateReplayCollection200 = ReplayCollectionRecordEncoded
export type SessionReplaysCreateReplayCollection400 = SessionReplaysValidationErrorEncoded
export const SessionReplaysCreateReplayCollection400 = SessionReplaysValidationErrorEncoded
export type SessionReplaysCreateReplayCollection401 = UnauthorizedErrorEncoded
export const SessionReplaysCreateReplayCollection401 = UnauthorizedErrorEncoded
export type SessionReplaysCreateReplayCollection403 = ForbiddenErrorEncoded
export const SessionReplaysCreateReplayCollection403 = ForbiddenErrorEncoded
export type SessionReplaysCreateReplayCollection404 = NotFoundErrorEncoded
export const SessionReplaysCreateReplayCollection404 = NotFoundErrorEncoded
export type SessionReplaysCreateReplayCollection500 = InternalServerErrorEncoded
export const SessionReplaysCreateReplayCollection500 = InternalServerErrorEncoded
export type SessionReplaysDeleteReplayCollection400 = SessionReplaysValidationErrorEncoded
export const SessionReplaysDeleteReplayCollection400 = SessionReplaysValidationErrorEncoded
export type SessionReplaysDeleteReplayCollection401 = UnauthorizedErrorEncoded
export const SessionReplaysDeleteReplayCollection401 = UnauthorizedErrorEncoded
export type SessionReplaysDeleteReplayCollection403 = ForbiddenErrorEncoded
export const SessionReplaysDeleteReplayCollection403 = ForbiddenErrorEncoded
export type SessionReplaysDeleteReplayCollection404 = NotFoundErrorEncoded
export const SessionReplaysDeleteReplayCollection404 = NotFoundErrorEncoded
export type SessionReplaysDeleteReplayCollection500 = InternalServerErrorEncoded
export const SessionReplaysDeleteReplayCollection500 = InternalServerErrorEncoded
export type SessionReplaysUpdateReplayCollectionRequestJson = { readonly "name"?: string | null, readonly "mode"?: "manual" | "automatic" | null, readonly "filterConfig"?: { readonly "viewed"?: boolean | null, readonly "identifiedState"?: "identified" | "anonymous" | null, readonly "browserIn"?: ReadonlyArray<string> | null, readonly "osIn"?: ReadonlyArray<string> | null, readonly "countryIn"?: ReadonlyArray<string> | null, readonly "routeVisitedAny"?: ReadonlyArray<string> | null, readonly "minClickCount"?: number | null, readonly "maxClickCount"?: number | null, readonly "minRageClickCount"?: number | null, readonly "maxRageClickCount"?: number | null, readonly "minEventCount"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "maxEventCount"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "minDurationMs"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "maxDurationMs"?: number | "Infinity" | "-Infinity" | "NaN" | null, readonly "hasErrors"?: boolean | null, readonly "hasSummary"?: boolean | null, readonly "hasPainPoints"?: boolean | null, readonly "hasPoorVitals"?: boolean | null, readonly "poorVitalMetric"?: string | null, readonly "playbackStart"?: "session_start" | "matched_event" | null, readonly "datasourceFilters"?: ReadonlyArray<{ readonly "referenceId": string, readonly "operator": "equals" | "not_equals" | "contains" | "not_contains" | "greater_than" | "less_than", readonly "value": string, readonly "dataType"?: "string" | "number" | "boolean" | null }> | null } | null | null }
export const SessionReplaysUpdateReplayCollectionRequestJson = Schema.Struct({ "name": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "mode": Schema.optionalKey(Schema.Union([Schema.Literals(["manual", "automatic"]), Schema.Null])), "filterConfig": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Struct({ "viewed": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "identifiedState": Schema.optionalKey(Schema.Union([Schema.Literals(["identified", "anonymous"]), Schema.Null])), "browserIn": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "osIn": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "countryIn": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "routeVisitedAny": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "minClickCount": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isInt().annotate({ "expected": "an integer" })).check(Schema.isGreaterThanOrEqualTo(0).annotate({ "expected": "a value greater than or equal to 0" })).check(Schema.isLessThanOrEqualTo(2147483647).annotate({ "expected": "a value less than or equal to 2147483647" })), Schema.Null])), "maxClickCount": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isInt().annotate({ "expected": "an integer" })).check(Schema.isGreaterThanOrEqualTo(0).annotate({ "expected": "a value greater than or equal to 0" })).check(Schema.isLessThanOrEqualTo(2147483647).annotate({ "expected": "a value less than or equal to 2147483647" })), Schema.Null])), "minRageClickCount": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isInt().annotate({ "expected": "an integer" })).check(Schema.isGreaterThanOrEqualTo(0).annotate({ "expected": "a value greater than or equal to 0" })).check(Schema.isLessThanOrEqualTo(2147483647).annotate({ "expected": "a value less than or equal to 2147483647" })), Schema.Null])), "maxRageClickCount": Schema.optionalKey(Schema.Union([Schema.Number.check(Schema.isInt().annotate({ "expected": "an integer" })).check(Schema.isGreaterThanOrEqualTo(0).annotate({ "expected": "a value greater than or equal to 0" })).check(Schema.isLessThanOrEqualTo(2147483647).annotate({ "expected": "a value less than or equal to 2147483647" })), Schema.Null])), "minEventCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "maxEventCount": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "minDurationMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "maxDurationMs": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null])), "hasErrors": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "hasSummary": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "hasPainPoints": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "hasPoorVitals": Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])), "poorVitalMetric": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "playbackStart": Schema.optionalKey(Schema.Union([Schema.Literals(["session_start", "matched_event"]), Schema.Null])), "datasourceFilters": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Struct({ "referenceId": Schema.String, "operator": Schema.Literals(["equals", "not_equals", "contains", "not_contains", "greater_than", "less_than"]), "value": Schema.String, "dataType": Schema.optionalKey(Schema.Union([Schema.Literals(["string", "number", "boolean"]), Schema.Null])) })), Schema.Null])) }), Schema.Null]), Schema.Null])) })
export type SessionReplaysUpdateReplayCollection200 = ReplayCollectionRecordEncoded
export const SessionReplaysUpdateReplayCollection200 = ReplayCollectionRecordEncoded
export type SessionReplaysUpdateReplayCollection400 = SessionReplaysValidationErrorEncoded
export const SessionReplaysUpdateReplayCollection400 = SessionReplaysValidationErrorEncoded
export type SessionReplaysUpdateReplayCollection401 = UnauthorizedErrorEncoded
export const SessionReplaysUpdateReplayCollection401 = UnauthorizedErrorEncoded
export type SessionReplaysUpdateReplayCollection403 = ForbiddenErrorEncoded
export const SessionReplaysUpdateReplayCollection403 = ForbiddenErrorEncoded
export type SessionReplaysUpdateReplayCollection404 = NotFoundErrorEncoded
export const SessionReplaysUpdateReplayCollection404 = NotFoundErrorEncoded
export type SessionReplaysUpdateReplayCollection500 = InternalServerErrorEncoded
export const SessionReplaysUpdateReplayCollection500 = InternalServerErrorEncoded
export type SessionReplaysListReplayCollectionAssignments200 = ReplayCollectionAssignmentsResponseEncoded
export const SessionReplaysListReplayCollectionAssignments200 = ReplayCollectionAssignmentsResponseEncoded
export type SessionReplaysListReplayCollectionAssignments400 = SessionReplaysValidationErrorEncoded
export const SessionReplaysListReplayCollectionAssignments400 = SessionReplaysValidationErrorEncoded
export type SessionReplaysListReplayCollectionAssignments401 = UnauthorizedErrorEncoded
export const SessionReplaysListReplayCollectionAssignments401 = UnauthorizedErrorEncoded
export type SessionReplaysListReplayCollectionAssignments403 = ForbiddenErrorEncoded
export const SessionReplaysListReplayCollectionAssignments403 = ForbiddenErrorEncoded
export type SessionReplaysListReplayCollectionAssignments404 = NotFoundErrorEncoded
export const SessionReplaysListReplayCollectionAssignments404 = NotFoundErrorEncoded
export type SessionReplaysListReplayCollectionAssignments500 = InternalServerErrorEncoded
export const SessionReplaysListReplayCollectionAssignments500 = InternalServerErrorEncoded
export type SessionReplaysSetReplayCollectionAssignmentsRequestJson = { readonly "collectionIds": ReadonlyArray<string> }
export const SessionReplaysSetReplayCollectionAssignmentsRequestJson = Schema.Struct({ "collectionIds": Schema.Array(Schema.String) })
export type SessionReplaysSetReplayCollectionAssignments200 = ReplayCollectionAssignmentsResponseEncoded
export const SessionReplaysSetReplayCollectionAssignments200 = ReplayCollectionAssignmentsResponseEncoded
export type SessionReplaysSetReplayCollectionAssignments400 = SessionReplaysValidationErrorEncoded
export const SessionReplaysSetReplayCollectionAssignments400 = SessionReplaysValidationErrorEncoded
export type SessionReplaysSetReplayCollectionAssignments401 = UnauthorizedErrorEncoded
export const SessionReplaysSetReplayCollectionAssignments401 = UnauthorizedErrorEncoded
export type SessionReplaysSetReplayCollectionAssignments403 = ForbiddenErrorEncoded
export const SessionReplaysSetReplayCollectionAssignments403 = ForbiddenErrorEncoded
export type SessionReplaysSetReplayCollectionAssignments404 = NotFoundErrorEncoded
export const SessionReplaysSetReplayCollectionAssignments404 = NotFoundErrorEncoded
export type SessionReplaysSetReplayCollectionAssignments500 = InternalServerErrorEncoded
export const SessionReplaysSetReplayCollectionAssignments500 = InternalServerErrorEncoded
export type SessionReplaysGetReplayEventsPageParams = { readonly "cursorId"?: string | null, readonly "cursorSequence"?: string | null, readonly "cursorFirstEventTimestampMs"?: string | null, readonly "cursorCreatedAt"?: string | null, readonly "limitChunks"?: string | null, readonly "pageBytes"?: string | null, readonly "seekCoverageRelativeMs"?: string | null, readonly "seekRelativeMs"?: string | null, readonly "seekAtMs"?: string | null, readonly "includeRouteSpans"?: "true" | "false" | null }
export const SessionReplaysGetReplayEventsPageParams = Schema.Struct({ "cursorId": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "cursorSequence": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "cursorFirstEventTimestampMs": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "cursorCreatedAt": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "limitChunks": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "pageBytes": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "seekCoverageRelativeMs": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "seekRelativeMs": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "seekAtMs": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "includeRouteSpans": Schema.optionalKey(Schema.Union([Schema.Literals(["true", "false"]), Schema.Null])) })
export type SessionReplaysGetReplayEventsPage200 = ReplayEventsPageResponseEncoded
export const SessionReplaysGetReplayEventsPage200 = ReplayEventsPageResponseEncoded
export type SessionReplaysGetReplayEventsPage400 = SessionReplaysValidationErrorEncoded
export const SessionReplaysGetReplayEventsPage400 = SessionReplaysValidationErrorEncoded
export type SessionReplaysGetReplayEventsPage401 = UnauthorizedErrorEncoded
export const SessionReplaysGetReplayEventsPage401 = UnauthorizedErrorEncoded
export type SessionReplaysGetReplayEventsPage403 = ForbiddenErrorEncoded
export const SessionReplaysGetReplayEventsPage403 = ForbiddenErrorEncoded
export type SessionReplaysGetReplayEventsPage404 = NotFoundErrorEncoded
export const SessionReplaysGetReplayEventsPage404 = NotFoundErrorEncoded
export type SessionReplaysGetReplayEventsPage500 = InternalServerErrorEncoded
export const SessionReplaysGetReplayEventsPage500 = InternalServerErrorEncoded
export type SessionReplaysGetSessionErrors200 = ReadonlyArray<SessionErrorEncoded>
export const SessionReplaysGetSessionErrors200 = Schema.Array(SessionErrorEncoded)
export type SessionReplaysGetSessionErrors400 = SessionReplaysValidationErrorEncoded
export const SessionReplaysGetSessionErrors400 = SessionReplaysValidationErrorEncoded
export type SessionReplaysGetSessionErrors401 = UnauthorizedErrorEncoded
export const SessionReplaysGetSessionErrors401 = UnauthorizedErrorEncoded
export type SessionReplaysGetSessionErrors403 = ForbiddenErrorEncoded
export const SessionReplaysGetSessionErrors403 = ForbiddenErrorEncoded
export type SessionReplaysGetSessionErrors404 = NotFoundErrorEncoded
export const SessionReplaysGetSessionErrors404 = NotFoundErrorEncoded
export type SessionReplaysGetSessionErrors500 = InternalServerErrorEncoded
export const SessionReplaysGetSessionErrors500 = InternalServerErrorEncoded
export type SessionReplaysGetSessionVitals200 = ReadonlyArray<{ readonly "id": string, readonly "metric": string, readonly "value": number | "Infinity" | "-Infinity" | "NaN", readonly "label": string, readonly "url": string, readonly "attributes": { readonly [x: string]: Schema.Json } | null, readonly "createdAt": string }>
export const SessionReplaysGetSessionVitals200 = Schema.Array(Schema.Struct({ "id": Schema.String, "metric": Schema.String, "value": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "label": Schema.String, "url": Schema.String, "attributes": Schema.Union([Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })), Schema.Null]), "createdAt": Schema.String }))
export type SessionReplaysGetSessionVitals400 = SessionReplaysValidationErrorEncoded
export const SessionReplaysGetSessionVitals400 = SessionReplaysValidationErrorEncoded
export type SessionReplaysGetSessionVitals401 = UnauthorizedErrorEncoded
export const SessionReplaysGetSessionVitals401 = UnauthorizedErrorEncoded
export type SessionReplaysGetSessionVitals403 = ForbiddenErrorEncoded
export const SessionReplaysGetSessionVitals403 = ForbiddenErrorEncoded
export type SessionReplaysGetSessionVitals404 = NotFoundErrorEncoded
export const SessionReplaysGetSessionVitals404 = NotFoundErrorEncoded
export type SessionReplaysGetSessionVitals500 = InternalServerErrorEncoded
export const SessionReplaysGetSessionVitals500 = InternalServerErrorEncoded
export type SessionReplaysGetSessionCustomEvents200 = { readonly "events": ReadonlyArray<{ readonly "name": string, readonly "time": string, readonly "route": string | null }>, readonly "truncated": boolean, readonly "limit": number | "Infinity" | "-Infinity" | "NaN" }
export const SessionReplaysGetSessionCustomEvents200 = Schema.Struct({ "events": Schema.Array(Schema.Struct({ "name": Schema.String, "time": Schema.String, "route": Schema.Union([Schema.String, Schema.Null]) })), "truncated": Schema.Boolean, "limit": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })
export type SessionReplaysGetSessionCustomEvents400 = SessionReplaysValidationErrorEncoded
export const SessionReplaysGetSessionCustomEvents400 = SessionReplaysValidationErrorEncoded
export type SessionReplaysGetSessionCustomEvents401 = UnauthorizedErrorEncoded
export const SessionReplaysGetSessionCustomEvents401 = UnauthorizedErrorEncoded
export type SessionReplaysGetSessionCustomEvents403 = ForbiddenErrorEncoded
export const SessionReplaysGetSessionCustomEvents403 = ForbiddenErrorEncoded
export type SessionReplaysGetSessionCustomEvents404 = NotFoundErrorEncoded
export const SessionReplaysGetSessionCustomEvents404 = NotFoundErrorEncoded
export type SessionReplaysGetSessionCustomEvents500 = InternalServerErrorEncoded
export const SessionReplaysGetSessionCustomEvents500 = InternalServerErrorEncoded
export type SessionReplaysDeleteReplay400 = SessionReplaysValidationErrorEncoded
export const SessionReplaysDeleteReplay400 = SessionReplaysValidationErrorEncoded
export type SessionReplaysDeleteReplay401 = UnauthorizedErrorEncoded
export const SessionReplaysDeleteReplay401 = UnauthorizedErrorEncoded
export type SessionReplaysDeleteReplay403 = ForbiddenErrorEncoded
export const SessionReplaysDeleteReplay403 = ForbiddenErrorEncoded
export type SessionReplaysDeleteReplay404 = NotFoundErrorEncoded
export const SessionReplaysDeleteReplay404 = NotFoundErrorEncoded
export type SessionReplaysDeleteReplay500 = InternalServerErrorEncoded
export const SessionReplaysDeleteReplay500 = InternalServerErrorEncoded
export type SessionReplaysDeleteAllReplays400 = SessionReplaysValidationErrorEncoded
export const SessionReplaysDeleteAllReplays400 = SessionReplaysValidationErrorEncoded
export type SessionReplaysDeleteAllReplays401 = UnauthorizedErrorEncoded
export const SessionReplaysDeleteAllReplays401 = UnauthorizedErrorEncoded
export type SessionReplaysDeleteAllReplays403 = ForbiddenErrorEncoded
export const SessionReplaysDeleteAllReplays403 = ForbiddenErrorEncoded
export type SessionReplaysDeleteAllReplays404 = NotFoundErrorEncoded
export const SessionReplaysDeleteAllReplays404 = NotFoundErrorEncoded
export type SessionReplaysDeleteAllReplays500 = InternalServerErrorEncoded
export const SessionReplaysDeleteAllReplays500 = InternalServerErrorEncoded
export type SessionReplaysMarkReplayViewed400 = SessionReplaysValidationErrorEncoded
export const SessionReplaysMarkReplayViewed400 = SessionReplaysValidationErrorEncoded
export type SessionReplaysMarkReplayViewed401 = UnauthorizedErrorEncoded
export const SessionReplaysMarkReplayViewed401 = UnauthorizedErrorEncoded
export type SessionReplaysMarkReplayViewed403 = ForbiddenErrorEncoded
export const SessionReplaysMarkReplayViewed403 = ForbiddenErrorEncoded
export type SessionReplaysMarkReplayViewed404 = NotFoundErrorEncoded
export const SessionReplaysMarkReplayViewed404 = NotFoundErrorEncoded
export type SessionReplaysMarkReplayViewed500 = InternalServerErrorEncoded
export const SessionReplaysMarkReplayViewed500 = InternalServerErrorEncoded
export type SourceMapsGetUploadedSourceMaps200 = ReadonlyArray<UploadedSourceMapEncoded>
export const SourceMapsGetUploadedSourceMaps200 = Schema.Array(UploadedSourceMapEncoded)
export type SourceMapsGetUploadedSourceMaps401 = UnauthorizedErrorEncoded
export const SourceMapsGetUploadedSourceMaps401 = UnauthorizedErrorEncoded
export type SourceMapsGetUploadedSourceMaps403 = ForbiddenErrorEncoded
export const SourceMapsGetUploadedSourceMaps403 = ForbiddenErrorEncoded
export type SourceMapsGetUploadedSourceMaps404 = NotFoundErrorEncoded
export const SourceMapsGetUploadedSourceMaps404 = NotFoundErrorEncoded
export type SourceMapsGetUploadedSourceMaps500 = InternalServerErrorEncoded
export const SourceMapsGetUploadedSourceMaps500 = InternalServerErrorEncoded
export type SourceMapsDeleteUploadedSourceMap401 = UnauthorizedErrorEncoded
export const SourceMapsDeleteUploadedSourceMap401 = UnauthorizedErrorEncoded
export type SourceMapsDeleteUploadedSourceMap403 = ForbiddenErrorEncoded
export const SourceMapsDeleteUploadedSourceMap403 = ForbiddenErrorEncoded
export type SourceMapsDeleteUploadedSourceMap404 = NotFoundErrorEncoded
export const SourceMapsDeleteUploadedSourceMap404 = NotFoundErrorEncoded
export type SourceMapsDeleteUploadedSourceMap500 = InternalServerErrorEncoded
export const SourceMapsDeleteUploadedSourceMap500 = InternalServerErrorEncoded
export type SourceMapsWipeUploadedSourceMaps401 = UnauthorizedErrorEncoded
export const SourceMapsWipeUploadedSourceMaps401 = UnauthorizedErrorEncoded
export type SourceMapsWipeUploadedSourceMaps403 = ForbiddenErrorEncoded
export const SourceMapsWipeUploadedSourceMaps403 = ForbiddenErrorEncoded
export type SourceMapsWipeUploadedSourceMaps404 = NotFoundErrorEncoded
export const SourceMapsWipeUploadedSourceMaps404 = NotFoundErrorEncoded
export type SourceMapsWipeUploadedSourceMaps500 = InternalServerErrorEncoded
export const SourceMapsWipeUploadedSourceMaps500 = InternalServerErrorEncoded
export type SourceMapsCleanupUploadedSourceMaps200 = CleanupUploadedSourceMapsResponseEncoded
export const SourceMapsCleanupUploadedSourceMaps200 = CleanupUploadedSourceMapsResponseEncoded
export type SourceMapsCleanupUploadedSourceMaps401 = UnauthorizedErrorEncoded
export const SourceMapsCleanupUploadedSourceMaps401 = UnauthorizedErrorEncoded
export type SourceMapsCleanupUploadedSourceMaps403 = ForbiddenErrorEncoded
export const SourceMapsCleanupUploadedSourceMaps403 = ForbiddenErrorEncoded
export type SourceMapsCleanupUploadedSourceMaps404 = NotFoundErrorEncoded
export const SourceMapsCleanupUploadedSourceMaps404 = NotFoundErrorEncoded
export type SourceMapsCleanupUploadedSourceMaps500 = InternalServerErrorEncoded
export const SourceMapsCleanupUploadedSourceMaps500 = InternalServerErrorEncoded
export type SourceMapsGetSourceMapApiKey200 = SourceMapApiKeyEncoded | null
export const SourceMapsGetSourceMapApiKey200 = Schema.Union([SourceMapApiKeyEncoded, Schema.Null])
export type SourceMapsGetSourceMapApiKey401 = UnauthorizedErrorEncoded
export const SourceMapsGetSourceMapApiKey401 = UnauthorizedErrorEncoded
export type SourceMapsGetSourceMapApiKey403 = ForbiddenErrorEncoded
export const SourceMapsGetSourceMapApiKey403 = ForbiddenErrorEncoded
export type SourceMapsGetSourceMapApiKey404 = NotFoundErrorEncoded
export const SourceMapsGetSourceMapApiKey404 = NotFoundErrorEncoded
export type SourceMapsGetSourceMapApiKey500 = InternalServerErrorEncoded
export const SourceMapsGetSourceMapApiKey500 = InternalServerErrorEncoded
export type SourceMapsCreateSourceMapApiKey200 = CreateSourceMapApiKeyResponseEncoded
export const SourceMapsCreateSourceMapApiKey200 = CreateSourceMapApiKeyResponseEncoded
export type SourceMapsCreateSourceMapApiKey401 = UnauthorizedErrorEncoded
export const SourceMapsCreateSourceMapApiKey401 = UnauthorizedErrorEncoded
export type SourceMapsCreateSourceMapApiKey403 = ForbiddenErrorEncoded
export const SourceMapsCreateSourceMapApiKey403 = ForbiddenErrorEncoded
export type SourceMapsCreateSourceMapApiKey404 = NotFoundErrorEncoded
export const SourceMapsCreateSourceMapApiKey404 = NotFoundErrorEncoded
export type SourceMapsCreateSourceMapApiKey500 = InternalServerErrorEncoded
export const SourceMapsCreateSourceMapApiKey500 = InternalServerErrorEncoded
export type SourceMapsDeleteSourceMapApiKey200 = { readonly "deleted": ReadonlyArray<SourceMapApiKeyEncoded> }
export const SourceMapsDeleteSourceMapApiKey200 = Schema.Struct({ "deleted": Schema.Array(SourceMapApiKeyEncoded) })
export type SourceMapsDeleteSourceMapApiKey401 = UnauthorizedErrorEncoded
export const SourceMapsDeleteSourceMapApiKey401 = UnauthorizedErrorEncoded
export type SourceMapsDeleteSourceMapApiKey403 = ForbiddenErrorEncoded
export const SourceMapsDeleteSourceMapApiKey403 = ForbiddenErrorEncoded
export type SourceMapsDeleteSourceMapApiKey404 = NotFoundErrorEncoded
export const SourceMapsDeleteSourceMapApiKey404 = NotFoundErrorEncoded
export type SourceMapsDeleteSourceMapApiKey500 = InternalServerErrorEncoded
export const SourceMapsDeleteSourceMapApiKey500 = InternalServerErrorEncoded
export type UsersGetUserVitalsParams = { readonly "from"?: string | null, readonly "to"?: string | null }
export const UsersGetUserVitalsParams = Schema.Struct({ "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type UsersGetUserVitals200 = UserVitalsEncoded
export const UsersGetUserVitals200 = UserVitalsEncoded
export type UsersGetUserVitals400 = UsersInputErrorEncoded
export const UsersGetUserVitals400 = UsersInputErrorEncoded
export type UsersGetUserVitals401 = UnauthorizedErrorEncoded
export const UsersGetUserVitals401 = UnauthorizedErrorEncoded
export type UsersGetUserVitals403 = ForbiddenErrorEncoded
export const UsersGetUserVitals403 = ForbiddenErrorEncoded
export type UsersGetUserVitals404 = NotFoundErrorEncoded
export const UsersGetUserVitals404 = NotFoundErrorEncoded
export type UsersGetUserVitals500 = InternalServerErrorEncoded
export const UsersGetUserVitals500 = InternalServerErrorEncoded
export type UsersGetUserVitals503 = UsersUnavailableErrorEncoded
export const UsersGetUserVitals503 = UsersUnavailableErrorEncoded
export type UsersGetUserSessionsPageParams = { readonly "limit"?: string | null, readonly "cursor"?: string | null }
export const UsersGetUserSessionsPageParams = Schema.Struct({ "limit": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "cursor": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type UsersGetUserSessionsPage200 = UserSessionsPageEncoded
export const UsersGetUserSessionsPage200 = UserSessionsPageEncoded
export type UsersGetUserSessionsPage400 = UsersInputErrorEncoded
export const UsersGetUserSessionsPage400 = UsersInputErrorEncoded
export type UsersGetUserSessionsPage401 = UnauthorizedErrorEncoded
export const UsersGetUserSessionsPage401 = UnauthorizedErrorEncoded
export type UsersGetUserSessionsPage403 = ForbiddenErrorEncoded
export const UsersGetUserSessionsPage403 = ForbiddenErrorEncoded
export type UsersGetUserSessionsPage404 = NotFoundErrorEncoded
export const UsersGetUserSessionsPage404 = NotFoundErrorEncoded
export type UsersGetUserSessionsPage500 = InternalServerErrorEncoded
export const UsersGetUserSessionsPage500 = InternalServerErrorEncoded
export type UsersGetUserSessionsPage503 = UsersUnavailableErrorEncoded
export const UsersGetUserSessionsPage503 = UsersUnavailableErrorEncoded
export type UsersGetUserErrorsPageParams = { readonly "limit"?: string | null, readonly "cursor"?: string | null }
export const UsersGetUserErrorsPageParams = Schema.Struct({ "limit": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "cursor": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type UsersGetUserErrorsPage200 = UserErrorsPageEncoded
export const UsersGetUserErrorsPage200 = UserErrorsPageEncoded
export type UsersGetUserErrorsPage400 = UsersInputErrorEncoded
export const UsersGetUserErrorsPage400 = UsersInputErrorEncoded
export type UsersGetUserErrorsPage401 = UnauthorizedErrorEncoded
export const UsersGetUserErrorsPage401 = UnauthorizedErrorEncoded
export type UsersGetUserErrorsPage403 = ForbiddenErrorEncoded
export const UsersGetUserErrorsPage403 = ForbiddenErrorEncoded
export type UsersGetUserErrorsPage404 = NotFoundErrorEncoded
export const UsersGetUserErrorsPage404 = NotFoundErrorEncoded
export type UsersGetUserErrorsPage500 = InternalServerErrorEncoded
export const UsersGetUserErrorsPage500 = InternalServerErrorEncoded
export type UsersGetUserErrorsPage503 = UsersUnavailableErrorEncoded
export const UsersGetUserErrorsPage503 = UsersUnavailableErrorEncoded
export type UsersGetUserTimelinePageParams = { readonly "limit"?: string | null, readonly "cursor"?: string | null, readonly "signals"?: "event" | "error" | "flag" | "llm" | ReadonlyArray<"event" | "error" | "flag" | "llm"> | null }
export const UsersGetUserTimelinePageParams = Schema.Struct({ "limit": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "cursor": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "signals": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Literals(["event", "error", "flag", "llm"]), Schema.Array(Schema.Literals(["event", "error", "flag", "llm"]))]), Schema.Null])) })
export type UsersGetUserTimelinePage200 = UserTimelinePageEncoded
export const UsersGetUserTimelinePage200 = UserTimelinePageEncoded
export type UsersGetUserTimelinePage400 = UsersInputErrorEncoded
export const UsersGetUserTimelinePage400 = UsersInputErrorEncoded
export type UsersGetUserTimelinePage401 = UnauthorizedErrorEncoded
export const UsersGetUserTimelinePage401 = UnauthorizedErrorEncoded
export type UsersGetUserTimelinePage403 = ForbiddenErrorEncoded
export const UsersGetUserTimelinePage403 = ForbiddenErrorEncoded
export type UsersGetUserTimelinePage404 = NotFoundErrorEncoded
export const UsersGetUserTimelinePage404 = NotFoundErrorEncoded
export type UsersGetUserTimelinePage500 = InternalServerErrorEncoded
export const UsersGetUserTimelinePage500 = InternalServerErrorEncoded
export type UsersGetUserTimelinePage503 = UsersUnavailableErrorEncoded
export const UsersGetUserTimelinePage503 = UsersUnavailableErrorEncoded
export type UsersGetUserActivityByKey200 = ReadonlyArray<UserActivityDayEncoded>
export const UsersGetUserActivityByKey200 = Schema.Array(UserActivityDayEncoded)
export type UsersGetUserActivityByKey400 = UsersInputErrorEncoded
export const UsersGetUserActivityByKey400 = UsersInputErrorEncoded
export type UsersGetUserActivityByKey401 = UnauthorizedErrorEncoded
export const UsersGetUserActivityByKey401 = UnauthorizedErrorEncoded
export type UsersGetUserActivityByKey403 = ForbiddenErrorEncoded
export const UsersGetUserActivityByKey403 = ForbiddenErrorEncoded
export type UsersGetUserActivityByKey404 = NotFoundErrorEncoded
export const UsersGetUserActivityByKey404 = NotFoundErrorEncoded
export type UsersGetUserActivityByKey500 = InternalServerErrorEncoded
export const UsersGetUserActivityByKey500 = InternalServerErrorEncoded
export type UsersGetUserActivityByKey503 = UsersUnavailableErrorEncoded
export const UsersGetUserActivityByKey503 = UsersUnavailableErrorEncoded
export type UsersGetUserDataOperation200 = UserDataOperationEncoded | null
export const UsersGetUserDataOperation200 = Schema.Union([UserDataOperationEncoded, Schema.Null])
export type UsersGetUserDataOperation400 = UsersInputErrorEncoded
export const UsersGetUserDataOperation400 = UsersInputErrorEncoded
export type UsersGetUserDataOperation401 = UnauthorizedErrorEncoded
export const UsersGetUserDataOperation401 = UnauthorizedErrorEncoded
export type UsersGetUserDataOperation403 = ForbiddenErrorEncoded
export const UsersGetUserDataOperation403 = ForbiddenErrorEncoded
export type UsersGetUserDataOperation404 = NotFoundErrorEncoded
export const UsersGetUserDataOperation404 = NotFoundErrorEncoded
export type UsersGetUserDataOperation500 = InternalServerErrorEncoded
export const UsersGetUserDataOperation500 = InternalServerErrorEncoded
export type UsersGetUserDataOperation503 = UsersUnavailableErrorEncoded
export const UsersGetUserDataOperation503 = UsersUnavailableErrorEncoded
export type UsersGetUsersDailyActiveParams = { readonly "cohort"?: "identified" | "anonymous" | null }
export const UsersGetUsersDailyActiveParams = Schema.Struct({ "cohort": Schema.optionalKey(Schema.Union([Schema.Literals(["identified", "anonymous"]), Schema.Null])) })
export type UsersGetUsersDailyActive200 = UsersDailyActiveEncoded
export const UsersGetUsersDailyActive200 = UsersDailyActiveEncoded
export type UsersGetUsersDailyActive400 = UsersInputErrorEncoded
export const UsersGetUsersDailyActive400 = UsersInputErrorEncoded
export type UsersGetUsersDailyActive401 = UnauthorizedErrorEncoded
export const UsersGetUsersDailyActive401 = UnauthorizedErrorEncoded
export type UsersGetUsersDailyActive403 = ForbiddenErrorEncoded
export const UsersGetUsersDailyActive403 = ForbiddenErrorEncoded
export type UsersGetUsersDailyActive404 = NotFoundErrorEncoded
export const UsersGetUsersDailyActive404 = NotFoundErrorEncoded
export type UsersGetUsersDailyActive500 = InternalServerErrorEncoded
export const UsersGetUsersDailyActive500 = InternalServerErrorEncoded
export type UsersGetUsersDailyActive503 = UsersUnavailableErrorEncoded
export const UsersGetUsersDailyActive503 = UsersUnavailableErrorEncoded
export type UsersSearchUsersForProjectParams = { readonly "from"?: string | null, readonly "to"?: string | null, readonly "query"?: string | null, readonly "limit"?: string | null, readonly "cursor"?: string | null, readonly "cohort"?: "all" | "identified" | "anonymous" | null, readonly "sort"?: "user" | "eventCount" | "activeDays" | "avgSessionDurationMs" | "firstSeen" | "lastSeen" | null, readonly "direction"?: "asc" | "desc" | null }
export const UsersSearchUsersForProjectParams = Schema.Struct({ "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "query": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "limit": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "cursor": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "cohort": Schema.optionalKey(Schema.Union([Schema.Literals(["all", "identified", "anonymous"]), Schema.Null])), "sort": Schema.optionalKey(Schema.Union([Schema.Literals(["user", "eventCount", "activeDays", "avgSessionDurationMs", "firstSeen", "lastSeen"]), Schema.Null])), "direction": Schema.optionalKey(Schema.Union([Schema.Literals(["asc", "desc"]), Schema.Null])) })
export type UsersSearchUsersForProject200 = UsersPageEncoded
export const UsersSearchUsersForProject200 = UsersPageEncoded
export type UsersSearchUsersForProject400 = UsersInputErrorEncoded
export const UsersSearchUsersForProject400 = UsersInputErrorEncoded
export type UsersSearchUsersForProject401 = UnauthorizedErrorEncoded
export const UsersSearchUsersForProject401 = UnauthorizedErrorEncoded
export type UsersSearchUsersForProject403 = ForbiddenErrorEncoded
export const UsersSearchUsersForProject403 = ForbiddenErrorEncoded
export type UsersSearchUsersForProject404 = NotFoundErrorEncoded
export const UsersSearchUsersForProject404 = NotFoundErrorEncoded
export type UsersSearchUsersForProject500 = InternalServerErrorEncoded
export const UsersSearchUsersForProject500 = InternalServerErrorEncoded
export type UsersSearchUsersForProject503 = UsersUnavailableErrorEncoded
export const UsersSearchUsersForProject503 = UsersUnavailableErrorEncoded
export type UsersGetUsersActiveTimeseriesParams = { readonly "from"?: string | null, readonly "to"?: string | null, readonly "cohort"?: "identified" | "anonymous" | null }
export const UsersGetUsersActiveTimeseriesParams = Schema.Struct({ "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "cohort": Schema.optionalKey(Schema.Union([Schema.Literals(["identified", "anonymous"]), Schema.Null])) })
export type UsersGetUsersActiveTimeseries200 = ReadonlyArray<UsersActiveTimeseriesRowEncoded>
export const UsersGetUsersActiveTimeseries200 = Schema.Array(UsersActiveTimeseriesRowEncoded)
export type UsersGetUsersActiveTimeseries400 = UsersInputErrorEncoded
export const UsersGetUsersActiveTimeseries400 = UsersInputErrorEncoded
export type UsersGetUsersActiveTimeseries401 = UnauthorizedErrorEncoded
export const UsersGetUsersActiveTimeseries401 = UnauthorizedErrorEncoded
export type UsersGetUsersActiveTimeseries403 = ForbiddenErrorEncoded
export const UsersGetUsersActiveTimeseries403 = ForbiddenErrorEncoded
export type UsersGetUsersActiveTimeseries404 = NotFoundErrorEncoded
export const UsersGetUsersActiveTimeseries404 = NotFoundErrorEncoded
export type UsersGetUsersActiveTimeseries500 = InternalServerErrorEncoded
export const UsersGetUsersActiveTimeseries500 = InternalServerErrorEncoded
export type UsersGetUsersActiveTimeseries503 = UsersUnavailableErrorEncoded
export const UsersGetUsersActiveTimeseries503 = UsersUnavailableErrorEncoded
export type UsersGetUsersBreakdown200 = UsersBreakdownEncoded
export const UsersGetUsersBreakdown200 = UsersBreakdownEncoded
export type UsersGetUsersBreakdown400 = UsersInputErrorEncoded
export const UsersGetUsersBreakdown400 = UsersInputErrorEncoded
export type UsersGetUsersBreakdown401 = UnauthorizedErrorEncoded
export const UsersGetUsersBreakdown401 = UnauthorizedErrorEncoded
export type UsersGetUsersBreakdown403 = ForbiddenErrorEncoded
export const UsersGetUsersBreakdown403 = ForbiddenErrorEncoded
export type UsersGetUsersBreakdown404 = NotFoundErrorEncoded
export const UsersGetUsersBreakdown404 = NotFoundErrorEncoded
export type UsersGetUsersBreakdown500 = InternalServerErrorEncoded
export const UsersGetUsersBreakdown500 = InternalServerErrorEncoded
export type UsersGetUsersBreakdown503 = UsersUnavailableErrorEncoded
export const UsersGetUsersBreakdown503 = UsersUnavailableErrorEncoded
export type UsersGetUserByKey200 = UserListItemEncoded | null
export const UsersGetUserByKey200 = Schema.Union([UserListItemEncoded, Schema.Null])
export type UsersGetUserByKey400 = UsersInputErrorEncoded
export const UsersGetUserByKey400 = UsersInputErrorEncoded
export type UsersGetUserByKey401 = UnauthorizedErrorEncoded
export const UsersGetUserByKey401 = UnauthorizedErrorEncoded
export type UsersGetUserByKey403 = ForbiddenErrorEncoded
export const UsersGetUserByKey403 = ForbiddenErrorEncoded
export type UsersGetUserByKey404 = NotFoundErrorEncoded
export const UsersGetUserByKey404 = NotFoundErrorEncoded
export type UsersGetUserByKey500 = InternalServerErrorEncoded
export const UsersGetUserByKey500 = InternalServerErrorEncoded
export type UsersGetUserByKey503 = UsersUnavailableErrorEncoded
export const UsersGetUserByKey503 = UsersUnavailableErrorEncoded
export type UsersDeleteUserData200 = UserDataOperationEncoded
export const UsersDeleteUserData200 = UserDataOperationEncoded
export type UsersDeleteUserData400 = UsersInputErrorEncoded
export const UsersDeleteUserData400 = UsersInputErrorEncoded
export type UsersDeleteUserData401 = UnauthorizedErrorEncoded
export const UsersDeleteUserData401 = UnauthorizedErrorEncoded
export type UsersDeleteUserData403 = ForbiddenErrorEncoded
export const UsersDeleteUserData403 = ForbiddenErrorEncoded
export type UsersDeleteUserData404 = NotFoundErrorEncoded
export const UsersDeleteUserData404 = NotFoundErrorEncoded
export type UsersDeleteUserData500 = InternalServerErrorEncoded
export const UsersDeleteUserData500 = InternalServerErrorEncoded
export type UsersDeleteUserData503 = UsersUnavailableErrorEncoded
export const UsersDeleteUserData503 = UsersUnavailableErrorEncoded
export type UsersRemoveUserIdentification200 = UserDataOperationEncoded
export const UsersRemoveUserIdentification200 = UserDataOperationEncoded
export type UsersRemoveUserIdentification400 = UsersInputErrorEncoded
export const UsersRemoveUserIdentification400 = UsersInputErrorEncoded
export type UsersRemoveUserIdentification401 = UnauthorizedErrorEncoded
export const UsersRemoveUserIdentification401 = UnauthorizedErrorEncoded
export type UsersRemoveUserIdentification403 = ForbiddenErrorEncoded
export const UsersRemoveUserIdentification403 = ForbiddenErrorEncoded
export type UsersRemoveUserIdentification404 = NotFoundErrorEncoded
export const UsersRemoveUserIdentification404 = NotFoundErrorEncoded
export type UsersRemoveUserIdentification500 = InternalServerErrorEncoded
export const UsersRemoveUserIdentification500 = InternalServerErrorEncoded
export type UsersRemoveUserIdentification503 = UsersUnavailableErrorEncoded
export const UsersRemoveUserIdentification503 = UsersUnavailableErrorEncoded
export type WebVitalsInterpretVitalsFilterRequestJson = { readonly "query": string, readonly "categories": ReadonlyArray<{ readonly "id": string, readonly "label": string, readonly "values": ReadonlyArray<string>, readonly "isNumeric": boolean, readonly "isBoolean": boolean, readonly "isArray": boolean }>, readonly "currentFilters": ReadonlyArray<{ readonly "categoryId": string, readonly "operator": "is" | "is_not" | "gt" | "gte" | "lt" | "lte", readonly "value": string }> }
export const WebVitalsInterpretVitalsFilterRequestJson = Schema.Struct({ "query": Schema.String, "categories": Schema.Array(Schema.Struct({ "id": Schema.String, "label": Schema.String, "values": Schema.Array(Schema.String), "isNumeric": Schema.Boolean, "isBoolean": Schema.Boolean, "isArray": Schema.Boolean })), "currentFilters": Schema.Array(Schema.Struct({ "categoryId": Schema.String, "operator": Schema.Literals(["is", "is_not", "gt", "gte", "lt", "lte"]), "value": Schema.String })) })
export type WebVitalsInterpretVitalsFilter200 = { readonly "filters": ReadonlyArray<{ readonly "categoryId": string, readonly "operator": "is" | "is_not" | "gt" | "gte" | "lt" | "lte", readonly "value": string }>, readonly "unresolved": ReadonlyArray<string>, readonly "categoriesSearched": number | "Infinity" | "-Infinity" | "NaN", readonly "categoriesTotal": number | "Infinity" | "-Infinity" | "NaN" }
export const WebVitalsInterpretVitalsFilter200 = Schema.Struct({ "filters": Schema.Array(Schema.Struct({ "categoryId": Schema.String, "operator": Schema.Literals(["is", "is_not", "gt", "gte", "lt", "lte"]), "value": Schema.String })), "unresolved": Schema.Array(Schema.String), "categoriesSearched": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "categoriesTotal": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) })
export type WebVitalsInterpretVitalsFilter401 = UnauthorizedErrorEncoded
export const WebVitalsInterpretVitalsFilter401 = UnauthorizedErrorEncoded
export type WebVitalsInterpretVitalsFilter403 = ForbiddenErrorEncoded
export const WebVitalsInterpretVitalsFilter403 = ForbiddenErrorEncoded
export type WebVitalsInterpretVitalsFilter404 = NotFoundErrorEncoded
export const WebVitalsInterpretVitalsFilter404 = NotFoundErrorEncoded
export type WebVitalsInterpretVitalsFilter500 = InternalServerErrorEncoded
export const WebVitalsInterpretVitalsFilter500 = InternalServerErrorEncoded
export type WebVitalsGetExperienceDiagnosticsParams = { readonly "metric": "FCP" | "LCP" | "INP", readonly "positiveOnly"?: "true" | null, readonly "from"?: string | null, readonly "to"?: string | null, readonly "device"?: string | null, readonly "browser"?: string | null, readonly "os"?: string | null, readonly "country"?: string | null, readonly "route"?: string | null }
export const WebVitalsGetExperienceDiagnosticsParams = Schema.Struct({ "metric": Schema.Literals(["FCP", "LCP", "INP"]), "positiveOnly": Schema.optionalKey(Schema.Union([Schema.Literal("true"), Schema.Null])), "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "device": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "browser": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "os": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "country": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "route": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type WebVitalsGetExperienceDiagnostics200 = ReadonlyArray<{ readonly "dimension": string, readonly "name": string, readonly "samples": number | "Infinity" | "-Infinity" | "NaN", readonly "poor": number | "Infinity" | "-Infinity" | "NaN", readonly "p75": number | "Infinity" | "-Infinity" | "NaN", readonly "p95": number | "Infinity" | "-Infinity" | "NaN", readonly "phaseSamples": number | "Infinity" | "-Infinity" | "NaN", readonly "phaseP75": number | "Infinity" | "-Infinity" | "NaN", readonly "correlation": number | "Infinity" | "-Infinity" | "NaN" | null }>
export const WebVitalsGetExperienceDiagnostics200 = Schema.Array(Schema.Struct({ "dimension": Schema.String, "name": Schema.String, "samples": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "poor": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "p75": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "p95": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "phaseSamples": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "phaseP75": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "correlation": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]) }))
export type WebVitalsGetExperienceDiagnostics401 = UnauthorizedErrorEncoded
export const WebVitalsGetExperienceDiagnostics401 = UnauthorizedErrorEncoded
export type WebVitalsGetExperienceDiagnostics403 = ForbiddenErrorEncoded
export const WebVitalsGetExperienceDiagnostics403 = ForbiddenErrorEncoded
export type WebVitalsGetExperienceDiagnostics404 = NotFoundErrorEncoded
export const WebVitalsGetExperienceDiagnostics404 = NotFoundErrorEncoded
export type WebVitalsGetExperienceDiagnostics500 = InternalServerErrorEncoded
export const WebVitalsGetExperienceDiagnostics500 = InternalServerErrorEncoded
export type WebVitalsGetTtfbDiagnosticsParams = { readonly "metric"?: "CLS" | "LCP" | "INP" | "FCP" | "TTFB" | "FID" | null, readonly "positiveOnly"?: "true" | null, readonly "from"?: string | null, readonly "to"?: string | null, readonly "device"?: string | null, readonly "browser"?: string | null, readonly "os"?: string | null, readonly "country"?: string | null, readonly "route"?: string | null }
export const WebVitalsGetTtfbDiagnosticsParams = Schema.Struct({ "metric": Schema.optionalKey(Schema.Union([Schema.Literals(["CLS", "LCP", "INP", "FCP", "TTFB", "FID"]), Schema.Null])), "positiveOnly": Schema.optionalKey(Schema.Union([Schema.Literal("true"), Schema.Null])), "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "device": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "browser": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "os": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "country": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "route": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type WebVitalsGetTtfbDiagnostics200 = ReadonlyArray<{ readonly "dimension": string, readonly "name": string, readonly "samples": number | "Infinity" | "-Infinity" | "NaN", readonly "poor": number | "Infinity" | "-Infinity" | "NaN", readonly "p75": number | "Infinity" | "-Infinity" | "NaN", readonly "p95": number | "Infinity" | "-Infinity" | "NaN", readonly "phaseSamples": number | "Infinity" | "-Infinity" | "NaN", readonly "phaseP75": number | "Infinity" | "-Infinity" | "NaN", readonly "correlation": number | "Infinity" | "-Infinity" | "NaN" | null }>
export const WebVitalsGetTtfbDiagnostics200 = Schema.Array(Schema.Struct({ "dimension": Schema.String, "name": Schema.String, "samples": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "poor": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "p75": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "p95": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "phaseSamples": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "phaseP75": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "correlation": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]) }))
export type WebVitalsGetTtfbDiagnostics401 = UnauthorizedErrorEncoded
export const WebVitalsGetTtfbDiagnostics401 = UnauthorizedErrorEncoded
export type WebVitalsGetTtfbDiagnostics403 = ForbiddenErrorEncoded
export const WebVitalsGetTtfbDiagnostics403 = ForbiddenErrorEncoded
export type WebVitalsGetTtfbDiagnostics404 = NotFoundErrorEncoded
export const WebVitalsGetTtfbDiagnostics404 = NotFoundErrorEncoded
export type WebVitalsGetTtfbDiagnostics500 = InternalServerErrorEncoded
export const WebVitalsGetTtfbDiagnostics500 = InternalServerErrorEncoded
export type WebVitalsGetWebVitalsForProjectParams = { readonly "metric"?: "CLS" | "LCP" | "INP" | "FCP" | "TTFB" | "FID" | null, readonly "positiveOnly"?: "true" | null, readonly "from"?: string | null, readonly "to"?: string | null, readonly "device"?: string | null, readonly "browser"?: string | null, readonly "os"?: string | null, readonly "country"?: string | null, readonly "route"?: string | null }
export const WebVitalsGetWebVitalsForProjectParams = Schema.Struct({ "metric": Schema.optionalKey(Schema.Union([Schema.Literals(["CLS", "LCP", "INP", "FCP", "TTFB", "FID"]), Schema.Null])), "positiveOnly": Schema.optionalKey(Schema.Union([Schema.Literal("true"), Schema.Null])), "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "device": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "browser": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "os": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "country": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "route": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type WebVitalsGetWebVitalsForProject200 = ReadonlyArray<{ readonly "id": string, readonly "projectId": string, readonly "sessionId": string | null, readonly "metric": string, readonly "value": number | "Infinity" | "-Infinity" | "NaN", readonly "label": string, readonly "device": string | null, readonly "country": string | null, readonly "os": string | null, readonly "browser": string | null, readonly "url": string | null, readonly "attributes": { readonly [x: string]: Schema.Json } | null, readonly "createdAt": string }>
export const WebVitalsGetWebVitalsForProject200 = Schema.Array(Schema.Struct({ "id": Schema.String, "projectId": Schema.String, "sessionId": Schema.Union([Schema.String, Schema.Null]), "metric": Schema.String, "value": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "label": Schema.String, "device": Schema.Union([Schema.String, Schema.Null]), "country": Schema.Union([Schema.String, Schema.Null]), "os": Schema.Union([Schema.String, Schema.Null]), "browser": Schema.Union([Schema.String, Schema.Null]), "url": Schema.Union([Schema.String, Schema.Null]), "attributes": Schema.Union([Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })), Schema.Null]), "createdAt": Schema.String }))
export type WebVitalsGetWebVitalsForProject401 = UnauthorizedErrorEncoded
export const WebVitalsGetWebVitalsForProject401 = UnauthorizedErrorEncoded
export type WebVitalsGetWebVitalsForProject403 = ForbiddenErrorEncoded
export const WebVitalsGetWebVitalsForProject403 = ForbiddenErrorEncoded
export type WebVitalsGetWebVitalsForProject404 = NotFoundErrorEncoded
export const WebVitalsGetWebVitalsForProject404 = NotFoundErrorEncoded
export type WebVitalsGetWebVitalsForProject500 = InternalServerErrorEncoded
export const WebVitalsGetWebVitalsForProject500 = InternalServerErrorEncoded
export type WebVitalsGetBuildDeploymentsForProjectParams = { readonly "metric"?: "CLS" | "LCP" | "INP" | "FCP" | "TTFB" | "FID" | null, readonly "positiveOnly"?: "true" | null, readonly "from"?: string | null, readonly "to"?: string | null, readonly "device"?: string | null, readonly "browser"?: string | null, readonly "os"?: string | null, readonly "country"?: string | null, readonly "route"?: string | null }
export const WebVitalsGetBuildDeploymentsForProjectParams = Schema.Struct({ "metric": Schema.optionalKey(Schema.Union([Schema.Literals(["CLS", "LCP", "INP", "FCP", "TTFB", "FID"]), Schema.Null])), "positiveOnly": Schema.optionalKey(Schema.Union([Schema.Literal("true"), Schema.Null])), "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "device": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "browser": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "os": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "country": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "route": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type WebVitalsGetBuildDeploymentsForProject200 = ReadonlyArray<BuildDeploymentDataEncoded>
export const WebVitalsGetBuildDeploymentsForProject200 = Schema.Array(BuildDeploymentDataEncoded)
export type WebVitalsGetBuildDeploymentsForProject401 = UnauthorizedErrorEncoded
export const WebVitalsGetBuildDeploymentsForProject401 = UnauthorizedErrorEncoded
export type WebVitalsGetBuildDeploymentsForProject403 = ForbiddenErrorEncoded
export const WebVitalsGetBuildDeploymentsForProject403 = ForbiddenErrorEncoded
export type WebVitalsGetBuildDeploymentsForProject404 = NotFoundErrorEncoded
export const WebVitalsGetBuildDeploymentsForProject404 = NotFoundErrorEncoded
export type WebVitalsGetBuildDeploymentsForProject500 = InternalServerErrorEncoded
export const WebVitalsGetBuildDeploymentsForProject500 = InternalServerErrorEncoded
export type WebVitalsGetLayoutShiftActivityParams = { readonly "metric"?: "CLS" | "LCP" | "INP" | "FCP" | "TTFB" | "FID" | null, readonly "positiveOnly"?: "true" | null, readonly "from"?: string | null, readonly "to"?: string | null, readonly "device"?: string | null, readonly "browser"?: string | null, readonly "os"?: string | null, readonly "country"?: string | null, readonly "route"?: string | null, readonly "bucketMs"?: string | null }
export const WebVitalsGetLayoutShiftActivityParams = Schema.Struct({ "metric": Schema.optionalKey(Schema.Union([Schema.Literals(["CLS", "LCP", "INP", "FCP", "TTFB", "FID"]), Schema.Null])), "positiveOnly": Schema.optionalKey(Schema.Union([Schema.Literal("true"), Schema.Null])), "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "device": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "browser": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "os": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "country": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "route": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "bucketMs": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type WebVitalsGetLayoutShiftActivity200 = ReadonlyArray<{ readonly "period": "current" | "previous", readonly "bucketStart": number | "Infinity" | "-Infinity" | "NaN" | null, readonly "samples": number | "Infinity" | "-Infinity" | "NaN", readonly "sessions": number | "Infinity" | "-Infinity" | "NaN", readonly "good": number | "Infinity" | "-Infinity" | "NaN", readonly "needsImprovement": number | "Infinity" | "-Infinity" | "NaN", readonly "poor": number | "Infinity" | "-Infinity" | "NaN" }>
export const WebVitalsGetLayoutShiftActivity200 = Schema.Array(Schema.Struct({ "period": Schema.Literals(["current", "previous"]), "bucketStart": Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), "samples": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "sessions": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "good": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "needsImprovement": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "poor": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }))
export type WebVitalsGetLayoutShiftActivity401 = UnauthorizedErrorEncoded
export const WebVitalsGetLayoutShiftActivity401 = UnauthorizedErrorEncoded
export type WebVitalsGetLayoutShiftActivity403 = ForbiddenErrorEncoded
export const WebVitalsGetLayoutShiftActivity403 = ForbiddenErrorEncoded
export type WebVitalsGetLayoutShiftActivity404 = NotFoundErrorEncoded
export const WebVitalsGetLayoutShiftActivity404 = NotFoundErrorEncoded
export type WebVitalsGetLayoutShiftActivity500 = InternalServerErrorEncoded
export const WebVitalsGetLayoutShiftActivity500 = InternalServerErrorEncoded
export type WebVitalsGetWebVitalsTrendsParams = { readonly "metric"?: "CLS" | "LCP" | "INP" | "FCP" | "TTFB" | "FID" | null, readonly "positiveOnly"?: "true" | null, readonly "from"?: string | null, readonly "to"?: string | null, readonly "device"?: string | null, readonly "browser"?: string | null, readonly "os"?: string | null, readonly "country"?: string | null, readonly "route"?: string | null, readonly "bucketMs"?: string | null }
export const WebVitalsGetWebVitalsTrendsParams = Schema.Struct({ "metric": Schema.optionalKey(Schema.Union([Schema.Literals(["CLS", "LCP", "INP", "FCP", "TTFB", "FID"]), Schema.Null])), "positiveOnly": Schema.optionalKey(Schema.Union([Schema.Literal("true"), Schema.Null])), "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "device": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "browser": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "os": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "country": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "route": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "bucketMs": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type WebVitalsGetWebVitalsTrends200 = ReadonlyArray<{ readonly "bucketStart": string, readonly "metric": string, readonly "samples": number | "Infinity" | "-Infinity" | "NaN", readonly "p75": number | "Infinity" | "-Infinity" | "NaN", readonly "p90": number | "Infinity" | "-Infinity" | "NaN", readonly "p95": number | "Infinity" | "-Infinity" | "NaN", readonly "p99": number | "Infinity" | "-Infinity" | "NaN" }>
export const WebVitalsGetWebVitalsTrends200 = Schema.Array(Schema.Struct({ "bucketStart": Schema.String, "metric": Schema.String, "samples": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "p75": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "p90": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "p95": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "p99": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }))
export type WebVitalsGetWebVitalsTrends401 = UnauthorizedErrorEncoded
export const WebVitalsGetWebVitalsTrends401 = UnauthorizedErrorEncoded
export type WebVitalsGetWebVitalsTrends403 = ForbiddenErrorEncoded
export const WebVitalsGetWebVitalsTrends403 = ForbiddenErrorEncoded
export type WebVitalsGetWebVitalsTrends404 = NotFoundErrorEncoded
export const WebVitalsGetWebVitalsTrends404 = NotFoundErrorEncoded
export type WebVitalsGetWebVitalsTrends500 = InternalServerErrorEncoded
export const WebVitalsGetWebVitalsTrends500 = InternalServerErrorEncoded
export type WebVitalsGetWebVitalsSummaryParams = { readonly "metric"?: "CLS" | "LCP" | "INP" | "FCP" | "TTFB" | "FID" | null, readonly "positiveOnly"?: "true" | null, readonly "from"?: string | null, readonly "to"?: string | null, readonly "device"?: string | null, readonly "browser"?: string | null, readonly "os"?: string | null, readonly "country"?: string | null, readonly "route"?: string | null, readonly "includeBreakdowns"?: "true" | null }
export const WebVitalsGetWebVitalsSummaryParams = Schema.Struct({ "metric": Schema.optionalKey(Schema.Union([Schema.Literals(["CLS", "LCP", "INP", "FCP", "TTFB", "FID"]), Schema.Null])), "positiveOnly": Schema.optionalKey(Schema.Union([Schema.Literal("true"), Schema.Null])), "from": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "to": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "device": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "browser": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "os": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "country": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "route": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "includeBreakdowns": Schema.optionalKey(Schema.Union([Schema.Literal("true"), Schema.Null])) })
export type WebVitalsGetWebVitalsSummary200 = ReadonlyArray<{ readonly "dimension": string, readonly "name": string, readonly "segmentSamples": number | "Infinity" | "-Infinity" | "NaN", readonly "sessions": number | "Infinity" | "-Infinity" | "NaN", readonly "segmentSessions": number | "Infinity" | "-Infinity" | "NaN", readonly "coreGoodPct": number | "Infinity" | "-Infinity" | "NaN", readonly "metric": string, readonly "samples": number | "Infinity" | "-Infinity" | "NaN", readonly "good": number | "Infinity" | "-Infinity" | "NaN", readonly "needsImprovement": number | "Infinity" | "-Infinity" | "NaN", readonly "poor": number | "Infinity" | "-Infinity" | "NaN", readonly "goodPct": number | "Infinity" | "-Infinity" | "NaN", readonly "needsImprovementPct": number | "Infinity" | "-Infinity" | "NaN", readonly "poorPct": number | "Infinity" | "-Infinity" | "NaN", readonly "p75": number | "Infinity" | "-Infinity" | "NaN", readonly "p90": number | "Infinity" | "-Infinity" | "NaN", readonly "p95": number | "Infinity" | "-Infinity" | "NaN", readonly "p99": number | "Infinity" | "-Infinity" | "NaN" }>
export const WebVitalsGetWebVitalsSummary200 = Schema.Array(Schema.Struct({ "dimension": Schema.String, "name": Schema.String, "segmentSamples": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "sessions": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "segmentSessions": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "coreGoodPct": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "metric": Schema.String, "samples": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "good": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "needsImprovement": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "poor": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "goodPct": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "needsImprovementPct": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "poorPct": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "p75": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "p90": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "p95": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), "p99": Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]) }))
export type WebVitalsGetWebVitalsSummary401 = UnauthorizedErrorEncoded
export const WebVitalsGetWebVitalsSummary401 = UnauthorizedErrorEncoded
export type WebVitalsGetWebVitalsSummary403 = ForbiddenErrorEncoded
export const WebVitalsGetWebVitalsSummary403 = ForbiddenErrorEncoded
export type WebVitalsGetWebVitalsSummary404 = NotFoundErrorEncoded
export const WebVitalsGetWebVitalsSummary404 = NotFoundErrorEncoded
export type WebVitalsGetWebVitalsSummary500 = InternalServerErrorEncoded
export const WebVitalsGetWebVitalsSummary500 = InternalServerErrorEncoded
export type IntegrationsListIntegrationConnections200 = ReadonlyArray<IntegrationConnectionRecordEncoded>
export const IntegrationsListIntegrationConnections200 = Schema.Array(IntegrationConnectionRecordEncoded)
export type IntegrationsListIntegrationConnections400 = IntegrationValidationErrorEncoded
export const IntegrationsListIntegrationConnections400 = IntegrationValidationErrorEncoded
export type IntegrationsListIntegrationConnections401 = UnauthorizedErrorEncoded
export const IntegrationsListIntegrationConnections401 = UnauthorizedErrorEncoded
export type IntegrationsListIntegrationConnections403 = ForbiddenErrorEncoded_1
export const IntegrationsListIntegrationConnections403 = ForbiddenErrorEncoded_1
export type IntegrationsListIntegrationConnections404 = NotFoundErrorEncoded
export const IntegrationsListIntegrationConnections404 = NotFoundErrorEncoded
export type IntegrationsListIntegrationConnections500 = IntegrationErrorEncoded | InternalServerErrorEncoded
export const IntegrationsListIntegrationConnections500 = Schema.Union([IntegrationErrorEncoded, InternalServerErrorEncoded])
export type IntegrationsSaveIntegrationCredentialsRequestJson = { readonly "integrationId": string, readonly "authType": "oauth" | "api_key" | "webhook_secret" | "app_install", readonly "fields": { readonly [x: string]: string } }
export const IntegrationsSaveIntegrationCredentialsRequestJson = Schema.Struct({ "integrationId": Schema.String, "authType": Schema.Literals(["oauth", "api_key", "webhook_secret", "app_install"]), "fields": Schema.Record(Schema.String, Schema.String) })
export type IntegrationsSaveIntegrationCredentials200 = IntegrationConnectionRecordEncoded
export const IntegrationsSaveIntegrationCredentials200 = IntegrationConnectionRecordEncoded
export type IntegrationsSaveIntegrationCredentials400 = IntegrationValidationErrorEncoded
export const IntegrationsSaveIntegrationCredentials400 = IntegrationValidationErrorEncoded
export type IntegrationsSaveIntegrationCredentials401 = UnauthorizedErrorEncoded
export const IntegrationsSaveIntegrationCredentials401 = UnauthorizedErrorEncoded
export type IntegrationsSaveIntegrationCredentials403 = ForbiddenErrorEncoded_1
export const IntegrationsSaveIntegrationCredentials403 = ForbiddenErrorEncoded_1
export type IntegrationsSaveIntegrationCredentials404 = NotFoundErrorEncoded
export const IntegrationsSaveIntegrationCredentials404 = NotFoundErrorEncoded
export type IntegrationsSaveIntegrationCredentials500 = IntegrationErrorEncoded | InternalServerErrorEncoded
export const IntegrationsSaveIntegrationCredentials500 = Schema.Union([IntegrationErrorEncoded, InternalServerErrorEncoded])
export type IntegrationsDisconnectIntegration400 = IntegrationValidationErrorEncoded
export const IntegrationsDisconnectIntegration400 = IntegrationValidationErrorEncoded
export type IntegrationsDisconnectIntegration401 = UnauthorizedErrorEncoded
export const IntegrationsDisconnectIntegration401 = UnauthorizedErrorEncoded
export type IntegrationsDisconnectIntegration403 = ForbiddenErrorEncoded_1
export const IntegrationsDisconnectIntegration403 = ForbiddenErrorEncoded_1
export type IntegrationsDisconnectIntegration404 = NotFoundErrorEncoded
export const IntegrationsDisconnectIntegration404 = NotFoundErrorEncoded
export type IntegrationsDisconnectIntegration500 = IntegrationErrorEncoded | InternalServerErrorEncoded
export const IntegrationsDisconnectIntegration500 = Schema.Union([IntegrationErrorEncoded, InternalServerErrorEncoded])
export type CodeContextSuggestCodeContextRequestJson = { readonly "provider": "github" | "codeberg" | "gitlab" | "bitbucket" | "origin", readonly "repository": string, readonly "ref"?: string | null, readonly "codebergApiUrl"?: string | null }
export const CodeContextSuggestCodeContextRequestJson = Schema.Struct({ "provider": Schema.Literals(["github", "codeberg", "gitlab", "bitbucket", "origin"]), "repository": Schema.String.check(Schema.isMinLength(1).annotate({ "expected": "a value with a length of at least 1" })), "ref": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "codebergApiUrl": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type CodeContextSuggestCodeContext200 = { readonly "provider": "github" | "codeberg" | "gitlab" | "bitbucket" | "origin", readonly "repository": string, readonly "ref": string | null, readonly "framePrefixes": ReadonlyArray<string> }
export const CodeContextSuggestCodeContext200 = Schema.Struct({ "provider": Schema.Literals(["github", "codeberg", "gitlab", "bitbucket", "origin"]), "repository": Schema.String, "ref": Schema.Union([Schema.String, Schema.Null]), "framePrefixes": Schema.Array(Schema.String.check(Schema.isMinLength(1).annotate({ "expected": "a value with a length of at least 1" }))) })
export type CodeContextSuggestCodeContext401 = UnauthorizedErrorEncoded
export const CodeContextSuggestCodeContext401 = UnauthorizedErrorEncoded
export type CodeContextSuggestCodeContext403 = ForbiddenErrorEncoded
export const CodeContextSuggestCodeContext403 = ForbiddenErrorEncoded
export type CodeContextSuggestCodeContext404 = NotFoundErrorEncoded
export const CodeContextSuggestCodeContext404 = NotFoundErrorEncoded
export type CodeContextSuggestCodeContext422 = CodeContextErrorEncoded
export const CodeContextSuggestCodeContext422 = CodeContextErrorEncoded
export type CodeContextSuggestCodeContext500 = InternalServerErrorEncoded
export const CodeContextSuggestCodeContext500 = InternalServerErrorEncoded
export type CodeContextGetCodeContextFileRequestJson = { readonly "mappingId": string, readonly "refCandidates"?: ReadonlyArray<string | null> | null, readonly "path": string, readonly "lineNumber"?: number | "Infinity" | "-Infinity" | "NaN" | null | null }
export const CodeContextGetCodeContextFileRequestJson = Schema.Struct({ "mappingId": Schema.String, "refCandidates": Schema.optionalKey(Schema.Union([Schema.Array(Schema.Union([Schema.String, Schema.Null])), Schema.Null])), "path": Schema.String, "lineNumber": Schema.optionalKey(Schema.Union([Schema.Union([Schema.Union([Schema.Number.check(Schema.isFinite().annotate({ "expected": "a finite number" })), Schema.Literals(["Infinity", "-Infinity", "NaN"])]), Schema.Null]), Schema.Null])) })
export type CodeContextGetCodeContextFile200 = CodeContextFileRecordEncoded
export const CodeContextGetCodeContextFile200 = CodeContextFileRecordEncoded
export type CodeContextGetCodeContextFile401 = UnauthorizedErrorEncoded
export const CodeContextGetCodeContextFile401 = UnauthorizedErrorEncoded
export type CodeContextGetCodeContextFile403 = ForbiddenErrorEncoded
export const CodeContextGetCodeContextFile403 = ForbiddenErrorEncoded
export type CodeContextGetCodeContextFile404 = NotFoundErrorEncoded
export const CodeContextGetCodeContextFile404 = NotFoundErrorEncoded
export type CodeContextGetCodeContextFile422 = CodeContextErrorEncoded
export const CodeContextGetCodeContextFile422 = CodeContextErrorEncoded
export type CodeContextGetCodeContextFile500 = InternalServerErrorEncoded
export const CodeContextGetCodeContextFile500 = InternalServerErrorEncoded
export type CodeContextSearchCodeContextRepositoriesParams = { readonly "mode"?: "connected" | null, readonly "provider"?: "github" | "codeberg" | "gitlab" | "bitbucket" | "origin" | null, readonly "codebergApiUrl"?: string | null, readonly "query": string }
export const CodeContextSearchCodeContextRepositoriesParams = Schema.Struct({ "mode": Schema.optionalKey(Schema.Union([Schema.Literal("connected"), Schema.Null])), "provider": Schema.optionalKey(Schema.Union([Schema.Literals(["github", "codeberg", "gitlab", "bitbucket", "origin"]), Schema.Null])), "codebergApiUrl": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])), "query": Schema.String })
export type CodeContextSearchCodeContextRepositories200 = ReadonlyArray<CodeContextRepositoryRecordEncoded>
export const CodeContextSearchCodeContextRepositories200 = Schema.Array(CodeContextRepositoryRecordEncoded)
export type CodeContextSearchCodeContextRepositories401 = UnauthorizedErrorEncoded
export const CodeContextSearchCodeContextRepositories401 = UnauthorizedErrorEncoded
export type CodeContextSearchCodeContextRepositories403 = ForbiddenErrorEncoded
export const CodeContextSearchCodeContextRepositories403 = ForbiddenErrorEncoded
export type CodeContextSearchCodeContextRepositories404 = NotFoundErrorEncoded
export const CodeContextSearchCodeContextRepositories404 = NotFoundErrorEncoded
export type CodeContextSearchCodeContextRepositories422 = CodeContextErrorEncoded
export const CodeContextSearchCodeContextRepositories422 = CodeContextErrorEncoded
export type CodeContextSearchCodeContextRepositories500 = InternalServerErrorEncoded
export const CodeContextSearchCodeContextRepositories500 = InternalServerErrorEncoded
export type NotificationsListNotificationsParams = { readonly "limit"?: string | null }
export const NotificationsListNotificationsParams = Schema.Struct({ "limit": Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])) })
export type NotificationsListNotifications200 = ReadonlyArray<NotificationRecordEncoded>
export const NotificationsListNotifications200 = Schema.Array(NotificationRecordEncoded)
export type NotificationsListNotifications401 = UnauthorizedErrorEncoded
export const NotificationsListNotifications401 = UnauthorizedErrorEncoded
export type NotificationsListNotifications403 = ForbiddenErrorEncoded
export const NotificationsListNotifications403 = ForbiddenErrorEncoded
export type NotificationsListNotifications404 = NotFoundErrorEncoded
export const NotificationsListNotifications404 = NotFoundErrorEncoded
export type NotificationsListNotifications500 = InternalServerErrorEncoded | NotificationErrorEncoded | EffectDrizzleQueryErrorEncoded
export const NotificationsListNotifications500 = Schema.Union([InternalServerErrorEncoded, NotificationErrorEncoded, EffectDrizzleQueryErrorEncoded])
export type NotificationsGetUnreadNotificationCount200 = NotificationUnreadCountEncoded
export const NotificationsGetUnreadNotificationCount200 = NotificationUnreadCountEncoded
export type NotificationsGetUnreadNotificationCount401 = UnauthorizedErrorEncoded
export const NotificationsGetUnreadNotificationCount401 = UnauthorizedErrorEncoded
export type NotificationsGetUnreadNotificationCount403 = ForbiddenErrorEncoded
export const NotificationsGetUnreadNotificationCount403 = ForbiddenErrorEncoded
export type NotificationsGetUnreadNotificationCount404 = NotFoundErrorEncoded
export const NotificationsGetUnreadNotificationCount404 = NotFoundErrorEncoded
export type NotificationsGetUnreadNotificationCount500 = InternalServerErrorEncoded | NotificationErrorEncoded | EffectDrizzleQueryErrorEncoded
export const NotificationsGetUnreadNotificationCount500 = Schema.Union([InternalServerErrorEncoded, NotificationErrorEncoded, EffectDrizzleQueryErrorEncoded])
export type NotificationsMarkNotificationRead401 = UnauthorizedErrorEncoded
export const NotificationsMarkNotificationRead401 = UnauthorizedErrorEncoded
export type NotificationsMarkNotificationRead403 = ForbiddenErrorEncoded
export const NotificationsMarkNotificationRead403 = ForbiddenErrorEncoded
export type NotificationsMarkNotificationRead404 = NotFoundErrorEncoded
export const NotificationsMarkNotificationRead404 = NotFoundErrorEncoded
export type NotificationsMarkNotificationRead500 = InternalServerErrorEncoded | NotificationErrorEncoded | EffectDrizzleQueryErrorEncoded
export const NotificationsMarkNotificationRead500 = Schema.Union([InternalServerErrorEncoded, NotificationErrorEncoded, EffectDrizzleQueryErrorEncoded])
export type NotificationsMarkNotificationUnread401 = UnauthorizedErrorEncoded
export const NotificationsMarkNotificationUnread401 = UnauthorizedErrorEncoded
export type NotificationsMarkNotificationUnread403 = ForbiddenErrorEncoded
export const NotificationsMarkNotificationUnread403 = ForbiddenErrorEncoded
export type NotificationsMarkNotificationUnread404 = NotFoundErrorEncoded
export const NotificationsMarkNotificationUnread404 = NotFoundErrorEncoded
export type NotificationsMarkNotificationUnread500 = InternalServerErrorEncoded | NotificationErrorEncoded | EffectDrizzleQueryErrorEncoded
export const NotificationsMarkNotificationUnread500 = Schema.Union([InternalServerErrorEncoded, NotificationErrorEncoded, EffectDrizzleQueryErrorEncoded])
export type NotificationsMarkAllNotificationsRead401 = UnauthorizedErrorEncoded
export const NotificationsMarkAllNotificationsRead401 = UnauthorizedErrorEncoded
export type NotificationsMarkAllNotificationsRead403 = ForbiddenErrorEncoded
export const NotificationsMarkAllNotificationsRead403 = ForbiddenErrorEncoded
export type NotificationsMarkAllNotificationsRead404 = NotFoundErrorEncoded
export const NotificationsMarkAllNotificationsRead404 = NotFoundErrorEncoded
export type NotificationsMarkAllNotificationsRead500 = InternalServerErrorEncoded | NotificationErrorEncoded | EffectDrizzleQueryErrorEncoded
export const NotificationsMarkAllNotificationsRead500 = Schema.Union([InternalServerErrorEncoded, NotificationErrorEncoded, EffectDrizzleQueryErrorEncoded])
export type NotificationsGetNotificationEmailPreferences200 = ReadonlyArray<NotificationEmailPreferenceEncoded>
export const NotificationsGetNotificationEmailPreferences200 = Schema.Array(NotificationEmailPreferenceEncoded)
export type NotificationsGetNotificationEmailPreferences401 = UnauthorizedErrorEncoded
export const NotificationsGetNotificationEmailPreferences401 = UnauthorizedErrorEncoded
export type NotificationsGetNotificationEmailPreferences403 = ForbiddenErrorEncoded
export const NotificationsGetNotificationEmailPreferences403 = ForbiddenErrorEncoded
export type NotificationsGetNotificationEmailPreferences404 = NotFoundErrorEncoded
export const NotificationsGetNotificationEmailPreferences404 = NotFoundErrorEncoded
export type NotificationsGetNotificationEmailPreferences500 = InternalServerErrorEncoded | NotificationErrorEncoded | EffectDrizzleQueryErrorEncoded
export const NotificationsGetNotificationEmailPreferences500 = Schema.Union([InternalServerErrorEncoded, NotificationErrorEncoded, EffectDrizzleQueryErrorEncoded])
export type NotificationsUpdateNotificationEmailPreferencesRequestJson = { readonly "preferences": ReadonlyArray<NotificationEmailPreferenceEncoded> }
export const NotificationsUpdateNotificationEmailPreferencesRequestJson = Schema.Struct({ "preferences": Schema.Array(NotificationEmailPreferenceEncoded) })
export type NotificationsUpdateNotificationEmailPreferences200 = ReadonlyArray<NotificationEmailPreferenceEncoded>
export const NotificationsUpdateNotificationEmailPreferences200 = Schema.Array(NotificationEmailPreferenceEncoded)
export type NotificationsUpdateNotificationEmailPreferences401 = UnauthorizedErrorEncoded
export const NotificationsUpdateNotificationEmailPreferences401 = UnauthorizedErrorEncoded
export type NotificationsUpdateNotificationEmailPreferences403 = ForbiddenErrorEncoded
export const NotificationsUpdateNotificationEmailPreferences403 = ForbiddenErrorEncoded
export type NotificationsUpdateNotificationEmailPreferences404 = NotFoundErrorEncoded
export const NotificationsUpdateNotificationEmailPreferences404 = NotFoundErrorEncoded
export type NotificationsUpdateNotificationEmailPreferences500 = InternalServerErrorEncoded | NotificationErrorEncoded | EffectDrizzleQueryErrorEncoded
export const NotificationsUpdateNotificationEmailPreferences500 = Schema.Union([InternalServerErrorEncoded, NotificationErrorEncoded, EffectDrizzleQueryErrorEncoded])

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
  const __encodePathParam = encodeURIComponent
  const __makePathRequest = (
    method: (url: string) => HttpClientRequest.HttpClientRequest,
    parameters: ReadonlyArray<string>,
    getPath: () => string,
  ) => Effect.suspend(() => {
    const fail = (description: string, cause?: unknown) => Effect.fail(
      new HttpClientError.HttpClientError({
        reason: new HttpClientError.InvalidUrlError({
          request: method(""),
          cause,
          description,
        }),
      }),
    )
    if (parameters.some((value) => value === "" || /^(?:\.|%2e){1,2}$/i.test(value))) {
      return fail("Path parameters must be non-empty and cannot be dot segments")
    }
    let path: string
    try {
      path = getPath()
    } catch (cause) {
      return fail("Failed to encode path parameter", cause)
    }
    if (path.split("/").some((segment) => /^(?:\.|%2e){1,2}$/i.test(segment))) {
      return fail("Request paths cannot contain dot segments")
    }
    return Effect.succeed(method(path))
  })
  const decodeSuccess =
    <Schema extends Schema.Constraint>(schema: Schema) =>
    (response: HttpClientResponse.HttpClientResponse) =>
      HttpClientResponse.schemaBodyJson(schema)(response)
  const decodeError =
    <const Tag extends string, Schema extends Schema.Constraint>(tag: Tag, schema: Schema) =>
    (response: HttpClientResponse.HttpClientResponse) =>
      Effect.flatMap(
        HttpClientResponse.schemaBodyJson(schema)(response),
        (cause) => Effect.fail(ApiError(tag, cause, response)),
      )
  return {
    httpClient,
    "AnomaliesGetAnomaliesForProject": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/anomalies").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "grain": options?.params?.["grain"] as any, "at": options?.params?.["at"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(AnomaliesGetAnomaliesForProject200),
      "401": decodeError("AnomaliesGetAnomaliesForProject401", AnomaliesGetAnomaliesForProject401),
      "403": decodeError("AnomaliesGetAnomaliesForProject403", AnomaliesGetAnomaliesForProject403),
      "404": decodeError("AnomaliesGetAnomaliesForProject404", AnomaliesGetAnomaliesForProject404),
      "500": decodeError("AnomaliesGetAnomaliesForProject500", AnomaliesGetAnomaliesForProject500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ChartsListCharts": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/charts").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "dashboardId": options?.params?.["dashboardId"] as any, "chartId": options?.params?.["chartId"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ChartsListCharts200),
      "400": decodeError("ChartsListCharts400", ChartsListCharts400),
      "401": decodeError("ChartsListCharts401", ChartsListCharts401),
      "403": decodeError("ChartsListCharts403", ChartsListCharts403),
      "404": decodeError("ChartsListCharts404", ChartsListCharts404),
      "409": decodeError("ChartsListCharts409", ChartsListCharts409),
      "500": decodeError("ChartsListCharts500", ChartsListCharts500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ChartsCreateChart": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/charts").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ChartsCreateChart200),
      "400": decodeError("ChartsCreateChart400", ChartsCreateChart400),
      "401": decodeError("ChartsCreateChart401", ChartsCreateChart401),
      "403": decodeError("ChartsCreateChart403", ChartsCreateChart403),
      "404": decodeError("ChartsCreateChart404", ChartsCreateChart404),
      "409": decodeError("ChartsCreateChart409", ChartsCreateChart409),
      "500": decodeError("ChartsCreateChart500", ChartsCreateChart500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ChartsDeleteChart": (idOrSlug, chartId, options) => __makePathRequest(HttpClientRequest.delete, [idOrSlug, chartId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/charts/" + __encodePathParam(chartId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("ChartsDeleteChart400", ChartsDeleteChart400),
      "401": decodeError("ChartsDeleteChart401", ChartsDeleteChart401),
      "403": decodeError("ChartsDeleteChart403", ChartsDeleteChart403),
      "404": decodeError("ChartsDeleteChart404", ChartsDeleteChart404),
      "409": decodeError("ChartsDeleteChart409", ChartsDeleteChart409),
      "500": decodeError("ChartsDeleteChart500", ChartsDeleteChart500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ChartsUpdateChart": (idOrSlug, chartId, options) => __makePathRequest(HttpClientRequest.patch, [idOrSlug, chartId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/charts/" + __encodePathParam(chartId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("ChartsUpdateChart400", ChartsUpdateChart400),
      "401": decodeError("ChartsUpdateChart401", ChartsUpdateChart401),
      "403": decodeError("ChartsUpdateChart403", ChartsUpdateChart403),
      "404": decodeError("ChartsUpdateChart404", ChartsUpdateChart404),
      "409": decodeError("ChartsUpdateChart409", ChartsUpdateChart409),
      "500": decodeError("ChartsUpdateChart500", ChartsUpdateChart500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "CommentsListComments": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/comments").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "targetType": options.params["targetType"] as any, "targetId": options.params["targetId"] as any }),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CommentsListComments200),
      "400": decodeError("CommentsListComments400", CommentsListComments400),
      "401": decodeError("CommentsListComments401", CommentsListComments401),
      "403": decodeError("CommentsListComments403", CommentsListComments403),
      "404": decodeError("CommentsListComments404", CommentsListComments404),
      "500": decodeError("CommentsListComments500", CommentsListComments500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "CommentsAddComment": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/comments").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CommentsAddComment200),
      "400": decodeError("CommentsAddComment400", CommentsAddComment400),
      "401": decodeError("CommentsAddComment401", CommentsAddComment401),
      "403": decodeError("CommentsAddComment403", CommentsAddComment403),
      "404": decodeError("CommentsAddComment404", CommentsAddComment404),
      "500": decodeError("CommentsAddComment500", CommentsAddComment500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "CommentsDeleteComment": (idOrSlug, commentId, options) => __makePathRequest(HttpClientRequest.delete, [idOrSlug, commentId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/comments/" + __encodePathParam(commentId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("CommentsDeleteComment400", CommentsDeleteComment400),
      "401": decodeError("CommentsDeleteComment401", CommentsDeleteComment401),
      "403": decodeError("CommentsDeleteComment403", CommentsDeleteComment403),
      "404": decodeError("CommentsDeleteComment404", CommentsDeleteComment404),
      "500": decodeError("CommentsDeleteComment500", CommentsDeleteComment500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "CommentsEditComment": (idOrSlug, commentId, options) => __makePathRequest(HttpClientRequest.patch, [idOrSlug, commentId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/comments/" + __encodePathParam(commentId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CommentsEditComment200),
      "400": decodeError("CommentsEditComment400", CommentsEditComment400),
      "401": decodeError("CommentsEditComment401", CommentsEditComment401),
      "403": decodeError("CommentsEditComment403", CommentsEditComment403),
      "404": decodeError("CommentsEditComment404", CommentsEditComment404),
      "500": decodeError("CommentsEditComment500", CommentsEditComment500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "CommentsListCommentRevisions": (idOrSlug, commentId, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, commentId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/comments/" + __encodePathParam(commentId) + "/revisions").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CommentsListCommentRevisions200),
      "400": decodeError("CommentsListCommentRevisions400", CommentsListCommentRevisions400),
      "401": decodeError("CommentsListCommentRevisions401", CommentsListCommentRevisions401),
      "403": decodeError("CommentsListCommentRevisions403", CommentsListCommentRevisions403),
      "404": decodeError("CommentsListCommentRevisions404", CommentsListCommentRevisions404),
      "500": decodeError("CommentsListCommentRevisions500", CommentsListCommentRevisions500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "CommentsToggleCommentPin": (idOrSlug, commentId, options) => __makePathRequest(HttpClientRequest.put, [idOrSlug, commentId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/comments/" + __encodePathParam(commentId) + "/pin").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CommentsToggleCommentPin200),
      "400": decodeError("CommentsToggleCommentPin400", CommentsToggleCommentPin400),
      "401": decodeError("CommentsToggleCommentPin401", CommentsToggleCommentPin401),
      "403": decodeError("CommentsToggleCommentPin403", CommentsToggleCommentPin403),
      "404": decodeError("CommentsToggleCommentPin404", CommentsToggleCommentPin404),
      "500": decodeError("CommentsToggleCommentPin500", CommentsToggleCommentPin500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "CommentsListCommentMentionCandidates": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/comment-mention-candidates").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CommentsListCommentMentionCandidates200),
      "400": decodeError("CommentsListCommentMentionCandidates400", CommentsListCommentMentionCandidates400),
      "401": decodeError("CommentsListCommentMentionCandidates401", CommentsListCommentMentionCandidates401),
      "403": decodeError("CommentsListCommentMentionCandidates403", CommentsListCommentMentionCandidates403),
      "404": decodeError("CommentsListCommentMentionCandidates404", CommentsListCommentMentionCandidates404),
      "500": decodeError("CommentsListCommentMentionCandidates500", CommentsListCommentMentionCandidates500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "CommentsSearchCommentReferences": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/comment-references").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "query": options.params["query"] as any }),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CommentsSearchCommentReferences200),
      "400": decodeError("CommentsSearchCommentReferences400", CommentsSearchCommentReferences400),
      "401": decodeError("CommentsSearchCommentReferences401", CommentsSearchCommentReferences401),
      "403": decodeError("CommentsSearchCommentReferences403", CommentsSearchCommentReferences403),
      "404": decodeError("CommentsSearchCommentReferences404", CommentsSearchCommentReferences404),
      "500": decodeError("CommentsSearchCommentReferences500", CommentsSearchCommentReferences500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "DashboardsListDashboards": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/dashboards").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DashboardsListDashboards200),
      "400": decodeError("DashboardsListDashboards400", DashboardsListDashboards400),
      "401": decodeError("DashboardsListDashboards401", DashboardsListDashboards401),
      "403": decodeError("DashboardsListDashboards403", DashboardsListDashboards403),
      "404": decodeError("DashboardsListDashboards404", DashboardsListDashboards404),
      "500": decodeError("DashboardsListDashboards500", DashboardsListDashboards500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "DashboardsCreateDashboard": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/dashboards").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DashboardsCreateDashboard200),
      "400": decodeError("DashboardsCreateDashboard400", DashboardsCreateDashboard400),
      "401": decodeError("DashboardsCreateDashboard401", DashboardsCreateDashboard401),
      "403": decodeError("DashboardsCreateDashboard403", DashboardsCreateDashboard403),
      "404": decodeError("DashboardsCreateDashboard404", DashboardsCreateDashboard404),
      "500": decodeError("DashboardsCreateDashboard500", DashboardsCreateDashboard500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "DashboardsReorderDashboards": (idOrSlug, options) => __makePathRequest(HttpClientRequest.put, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/dashboards/order").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("DashboardsReorderDashboards400", DashboardsReorderDashboards400),
      "401": decodeError("DashboardsReorderDashboards401", DashboardsReorderDashboards401),
      "403": decodeError("DashboardsReorderDashboards403", DashboardsReorderDashboards403),
      "404": decodeError("DashboardsReorderDashboards404", DashboardsReorderDashboards404),
      "500": decodeError("DashboardsReorderDashboards500", DashboardsReorderDashboards500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "DashboardsDuplicateDashboard": (idOrSlug, dashboardId, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug, dashboardId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/dashboards/" + __encodePathParam(dashboardId) + "/duplicate").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DashboardsDuplicateDashboard200),
      "400": decodeError("DashboardsDuplicateDashboard400", DashboardsDuplicateDashboard400),
      "401": decodeError("DashboardsDuplicateDashboard401", DashboardsDuplicateDashboard401),
      "403": decodeError("DashboardsDuplicateDashboard403", DashboardsDuplicateDashboard403),
      "404": decodeError("DashboardsDuplicateDashboard404", DashboardsDuplicateDashboard404),
      "500": decodeError("DashboardsDuplicateDashboard500", DashboardsDuplicateDashboard500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "DashboardsCopyDashboard": (idOrSlug, dashboardId, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug, dashboardId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/dashboards/" + __encodePathParam(dashboardId) + "/copy").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DashboardsCopyDashboard200),
      "400": decodeError("DashboardsCopyDashboard400", DashboardsCopyDashboard400),
      "401": decodeError("DashboardsCopyDashboard401", DashboardsCopyDashboard401),
      "403": decodeError("DashboardsCopyDashboard403", DashboardsCopyDashboard403),
      "404": decodeError("DashboardsCopyDashboard404", DashboardsCopyDashboard404),
      "500": decodeError("DashboardsCopyDashboard500", DashboardsCopyDashboard500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "DashboardsDeleteDashboard": (idOrSlug, dashboardId, options) => __makePathRequest(HttpClientRequest.delete, [idOrSlug, dashboardId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/dashboards/" + __encodePathParam(dashboardId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("DashboardsDeleteDashboard400", DashboardsDeleteDashboard400),
      "401": decodeError("DashboardsDeleteDashboard401", DashboardsDeleteDashboard401),
      "403": decodeError("DashboardsDeleteDashboard403", DashboardsDeleteDashboard403),
      "404": decodeError("DashboardsDeleteDashboard404", DashboardsDeleteDashboard404),
      "500": decodeError("DashboardsDeleteDashboard500", DashboardsDeleteDashboard500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "DashboardsUpdateDashboard": (idOrSlug, dashboardId, options) => __makePathRequest(HttpClientRequest.patch, [idOrSlug, dashboardId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/dashboards/" + __encodePathParam(dashboardId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DashboardsUpdateDashboard200),
      "400": decodeError("DashboardsUpdateDashboard400", DashboardsUpdateDashboard400),
      "401": decodeError("DashboardsUpdateDashboard401", DashboardsUpdateDashboard401),
      "403": decodeError("DashboardsUpdateDashboard403", DashboardsUpdateDashboard403),
      "404": decodeError("DashboardsUpdateDashboard404", DashboardsUpdateDashboard404),
      "500": decodeError("DashboardsUpdateDashboard500", DashboardsUpdateDashboard500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "DataSourcesGetDataSourceCoverage": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/data-sources/coverage").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DataSourcesGetDataSourceCoverage200),
      "400": decodeError("DataSourcesGetDataSourceCoverage400", DataSourcesGetDataSourceCoverage400),
      "401": decodeError("DataSourcesGetDataSourceCoverage401", DataSourcesGetDataSourceCoverage401),
      "403": decodeError("DataSourcesGetDataSourceCoverage403", DataSourcesGetDataSourceCoverage403),
      "404": decodeError("DataSourcesGetDataSourceCoverage404", DataSourcesGetDataSourceCoverage404),
      "500": decodeError("DataSourcesGetDataSourceCoverage500", DataSourcesGetDataSourceCoverage500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "DataSourcesGetStructuredFieldCatalog": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/data-sources/structured-fields").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DataSourcesGetStructuredFieldCatalog200),
      "400": decodeError("DataSourcesGetStructuredFieldCatalog400", DataSourcesGetStructuredFieldCatalog400),
      "401": decodeError("DataSourcesGetStructuredFieldCatalog401", DataSourcesGetStructuredFieldCatalog401),
      "403": decodeError("DataSourcesGetStructuredFieldCatalog403", DataSourcesGetStructuredFieldCatalog403),
      "404": decodeError("DataSourcesGetStructuredFieldCatalog404", DataSourcesGetStructuredFieldCatalog404),
      "500": decodeError("DataSourcesGetStructuredFieldCatalog500", DataSourcesGetStructuredFieldCatalog500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "DataSourcesListDataSources": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/data-sources").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DataSourcesListDataSources200),
      "400": decodeError("DataSourcesListDataSources400", DataSourcesListDataSources400),
      "401": decodeError("DataSourcesListDataSources401", DataSourcesListDataSources401),
      "403": decodeError("DataSourcesListDataSources403", DataSourcesListDataSources403),
      "404": decodeError("DataSourcesListDataSources404", DataSourcesListDataSources404),
      "500": decodeError("DataSourcesListDataSources500", DataSourcesListDataSources500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "DataSourcesCreateDataSource": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/data-sources").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DataSourcesCreateDataSource200),
      "400": decodeError("DataSourcesCreateDataSource400", DataSourcesCreateDataSource400),
      "401": decodeError("DataSourcesCreateDataSource401", DataSourcesCreateDataSource401),
      "403": decodeError("DataSourcesCreateDataSource403", DataSourcesCreateDataSource403),
      "404": decodeError("DataSourcesCreateDataSource404", DataSourcesCreateDataSource404),
      "500": decodeError("DataSourcesCreateDataSource500", DataSourcesCreateDataSource500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "DataSourcesDeleteDataSource": (idOrSlug, dataSourceId, options) => __makePathRequest(HttpClientRequest.delete, [idOrSlug, dataSourceId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/data-sources/" + __encodePathParam(dataSourceId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("DataSourcesDeleteDataSource400", DataSourcesDeleteDataSource400),
      "401": decodeError("DataSourcesDeleteDataSource401", DataSourcesDeleteDataSource401),
      "403": decodeError("DataSourcesDeleteDataSource403", DataSourcesDeleteDataSource403),
      "404": decodeError("DataSourcesDeleteDataSource404", DataSourcesDeleteDataSource404),
      "500": decodeError("DataSourcesDeleteDataSource500", DataSourcesDeleteDataSource500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "DataSourcesUpdateDataSource": (idOrSlug, dataSourceId, options) => __makePathRequest(HttpClientRequest.patch, [idOrSlug, dataSourceId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/data-sources/" + __encodePathParam(dataSourceId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DataSourcesUpdateDataSource200),
      "400": decodeError("DataSourcesUpdateDataSource400", DataSourcesUpdateDataSource400),
      "401": decodeError("DataSourcesUpdateDataSource401", DataSourcesUpdateDataSource401),
      "403": decodeError("DataSourcesUpdateDataSource403", DataSourcesUpdateDataSource403),
      "404": decodeError("DataSourcesUpdateDataSource404", DataSourcesUpdateDataSource404),
      "500": decodeError("DataSourcesUpdateDataSource500", DataSourcesUpdateDataSource500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "DownloadsGetDownloadAnalytics": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/downloads").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "dateFrom": options?.params?.["dateFrom"] as any, "dateTo": options?.params?.["dateTo"] as any, "provider": options?.params?.["provider"] as any, "versionNumber": options?.params?.["versionNumber"] as any, "granularity": options?.params?.["granularity"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DownloadsGetDownloadAnalytics200),
      "401": decodeError("DownloadsGetDownloadAnalytics401", DownloadsGetDownloadAnalytics401),
      "403": decodeError("DownloadsGetDownloadAnalytics403", DownloadsGetDownloadAnalytics403),
      "404": decodeError("DownloadsGetDownloadAnalytics404", DownloadsGetDownloadAnalytics404),
      "500": decodeError("DownloadsGetDownloadAnalytics500", DownloadsGetDownloadAnalytics500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "DownloadsListDownloadProviders": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/download-providers").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DownloadsListDownloadProviders200),
      "400": decodeError("DownloadsListDownloadProviders400", DownloadsListDownloadProviders400),
      "401": decodeError("DownloadsListDownloadProviders401", DownloadsListDownloadProviders401),
      "403": decodeError("DownloadsListDownloadProviders403", DownloadsListDownloadProviders403),
      "404": decodeError("DownloadsListDownloadProviders404", DownloadsListDownloadProviders404),
      "500": decodeError("DownloadsListDownloadProviders500", DownloadsListDownloadProviders500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "DownloadsCreateDownloadProvider": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/download-providers").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DownloadsCreateDownloadProvider200),
      "400": decodeError("DownloadsCreateDownloadProvider400", DownloadsCreateDownloadProvider400),
      "401": decodeError("DownloadsCreateDownloadProvider401", DownloadsCreateDownloadProvider401),
      "403": decodeError("DownloadsCreateDownloadProvider403", DownloadsCreateDownloadProvider403),
      "404": decodeError("DownloadsCreateDownloadProvider404", DownloadsCreateDownloadProvider404),
      "500": decodeError("DownloadsCreateDownloadProvider500", DownloadsCreateDownloadProvider500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "DownloadsSearchDownloadProviderProjects": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/download-providers/search").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "provider": options.params["provider"] as any, "query": options.params["query"] as any }),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DownloadsSearchDownloadProviderProjects200),
      "400": decodeError("DownloadsSearchDownloadProviderProjects400", DownloadsSearchDownloadProviderProjects400),
      "401": decodeError("DownloadsSearchDownloadProviderProjects401", DownloadsSearchDownloadProviderProjects401),
      "403": decodeError("DownloadsSearchDownloadProviderProjects403", DownloadsSearchDownloadProviderProjects403),
      "404": decodeError("DownloadsSearchDownloadProviderProjects404", DownloadsSearchDownloadProviderProjects404),
      "500": decodeError("DownloadsSearchDownloadProviderProjects500", DownloadsSearchDownloadProviderProjects500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "DownloadsDeleteDownloadProvider": (idOrSlug, providerId, options) => __makePathRequest(HttpClientRequest.delete, [idOrSlug, providerId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/download-providers/" + __encodePathParam(providerId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("DownloadsDeleteDownloadProvider400", DownloadsDeleteDownloadProvider400),
      "401": decodeError("DownloadsDeleteDownloadProvider401", DownloadsDeleteDownloadProvider401),
      "403": decodeError("DownloadsDeleteDownloadProvider403", DownloadsDeleteDownloadProvider403),
      "404": decodeError("DownloadsDeleteDownloadProvider404", DownloadsDeleteDownloadProvider404),
      "500": decodeError("DownloadsDeleteDownloadProvider500", DownloadsDeleteDownloadProvider500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "DownloadsUpdateDownloadProvider": (idOrSlug, providerId, options) => __makePathRequest(HttpClientRequest.patch, [idOrSlug, providerId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/download-providers/" + __encodePathParam(providerId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("DownloadsUpdateDownloadProvider400", DownloadsUpdateDownloadProvider400),
      "401": decodeError("DownloadsUpdateDownloadProvider401", DownloadsUpdateDownloadProvider401),
      "403": decodeError("DownloadsUpdateDownloadProvider403", DownloadsUpdateDownloadProvider403),
      "404": decodeError("DownloadsUpdateDownloadProvider404", DownloadsUpdateDownloadProvider404),
      "500": decodeError("DownloadsUpdateDownloadProvider500", DownloadsUpdateDownloadProvider500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ErrorTrackingGetErrorEmbeddings": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/errors/embeddings/query").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ErrorTrackingGetErrorEmbeddings200),
      "401": decodeError("ErrorTrackingGetErrorEmbeddings401", ErrorTrackingGetErrorEmbeddings401),
      "403": decodeError("ErrorTrackingGetErrorEmbeddings403", ErrorTrackingGetErrorEmbeddings403),
      "404": decodeError("ErrorTrackingGetErrorEmbeddings404", ErrorTrackingGetErrorEmbeddings404),
      "500": decodeError("ErrorTrackingGetErrorEmbeddings500", ErrorTrackingGetErrorEmbeddings500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ErrorTrackingGetErrorIssuesForProject": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/errors/issues/query").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ErrorTrackingGetErrorIssuesForProject200),
      "401": decodeError("ErrorTrackingGetErrorIssuesForProject401", ErrorTrackingGetErrorIssuesForProject401),
      "403": decodeError("ErrorTrackingGetErrorIssuesForProject403", ErrorTrackingGetErrorIssuesForProject403),
      "404": decodeError("ErrorTrackingGetErrorIssuesForProject404", ErrorTrackingGetErrorIssuesForProject404),
      "500": decodeError("ErrorTrackingGetErrorIssuesForProject500", ErrorTrackingGetErrorIssuesForProject500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ErrorTrackingGetErrorIssuesForProjects": (options) => HttpClientRequest.post("/v0/errors/issues/query").pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ErrorTrackingGetErrorIssuesForProjects200),
      "401": decodeError("ErrorTrackingGetErrorIssuesForProjects401", ErrorTrackingGetErrorIssuesForProjects401),
      "403": decodeError("ErrorTrackingGetErrorIssuesForProjects403", ErrorTrackingGetErrorIssuesForProjects403),
      "404": decodeError("ErrorTrackingGetErrorIssuesForProjects404", ErrorTrackingGetErrorIssuesForProjects404),
      "500": decodeError("ErrorTrackingGetErrorIssuesForProjects500", ErrorTrackingGetErrorIssuesForProjects500),
      orElse: unexpectedStatus
    }))
    ),
    "ErrorTrackingGetErrorIssueDetail": (idOrSlug, errorId, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, errorId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/errors/issues/" + __encodePathParam(errorId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ErrorTrackingGetErrorIssueDetail200),
      "401": decodeError("ErrorTrackingGetErrorIssueDetail401", ErrorTrackingGetErrorIssueDetail401),
      "403": decodeError("ErrorTrackingGetErrorIssueDetail403", ErrorTrackingGetErrorIssueDetail403),
      "404": decodeError("ErrorTrackingGetErrorIssueDetail404", ErrorTrackingGetErrorIssueDetail404),
      "500": decodeError("ErrorTrackingGetErrorIssueDetail500", ErrorTrackingGetErrorIssueDetail500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ErrorTrackingUpdateErrorIssueMetadata": (idOrSlug, errorId, options) => __makePathRequest(HttpClientRequest.patch, [idOrSlug, errorId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/errors/issues/" + __encodePathParam(errorId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "401": decodeError("ErrorTrackingUpdateErrorIssueMetadata401", ErrorTrackingUpdateErrorIssueMetadata401),
      "403": decodeError("ErrorTrackingUpdateErrorIssueMetadata403", ErrorTrackingUpdateErrorIssueMetadata403),
      "404": decodeError("ErrorTrackingUpdateErrorIssueMetadata404", ErrorTrackingUpdateErrorIssueMetadata404),
      "500": decodeError("ErrorTrackingUpdateErrorIssueMetadata500", ErrorTrackingUpdateErrorIssueMetadata500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ErrorTrackingGetErrorStacktraceVariants": (idOrSlug, errorId, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, errorId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/errors/issues/" + __encodePathParam(errorId) + "/stacktrace-variants").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "limit": options.params["limit"] as any }),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ErrorTrackingGetErrorStacktraceVariants200),
      "401": decodeError("ErrorTrackingGetErrorStacktraceVariants401", ErrorTrackingGetErrorStacktraceVariants401),
      "403": decodeError("ErrorTrackingGetErrorStacktraceVariants403", ErrorTrackingGetErrorStacktraceVariants403),
      "404": decodeError("ErrorTrackingGetErrorStacktraceVariants404", ErrorTrackingGetErrorStacktraceVariants404),
      "500": decodeError("ErrorTrackingGetErrorStacktraceVariants500", ErrorTrackingGetErrorStacktraceVariants500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ErrorTrackingGetErrorOccurrencesForIssue": (idOrSlug, errorId, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, errorId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/errors/issues/" + __encodePathParam(errorId) + "/occurrences").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "occurrenceId": options?.params?.["occurrenceId"] as any, "limit": options?.params?.["limit"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ErrorTrackingGetErrorOccurrencesForIssue200),
      "401": decodeError("ErrorTrackingGetErrorOccurrencesForIssue401", ErrorTrackingGetErrorOccurrencesForIssue401),
      "403": decodeError("ErrorTrackingGetErrorOccurrencesForIssue403", ErrorTrackingGetErrorOccurrencesForIssue403),
      "404": decodeError("ErrorTrackingGetErrorOccurrencesForIssue404", ErrorTrackingGetErrorOccurrencesForIssue404),
      "500": decodeError("ErrorTrackingGetErrorOccurrencesForIssue500", ErrorTrackingGetErrorOccurrencesForIssue500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ErrorTrackingGetErrorOverviewTimeseries": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/errors/timeseries/query").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ErrorTrackingGetErrorOverviewTimeseries200),
      "401": decodeError("ErrorTrackingGetErrorOverviewTimeseries401", ErrorTrackingGetErrorOverviewTimeseries401),
      "403": decodeError("ErrorTrackingGetErrorOverviewTimeseries403", ErrorTrackingGetErrorOverviewTimeseries403),
      "404": decodeError("ErrorTrackingGetErrorOverviewTimeseries404", ErrorTrackingGetErrorOverviewTimeseries404),
      "500": decodeError("ErrorTrackingGetErrorOverviewTimeseries500", ErrorTrackingGetErrorOverviewTimeseries500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ErrorTrackingGetErrorOverviewTimeseriesForProjects": (options) => HttpClientRequest.post("/v0/errors/timeseries/query").pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ErrorTrackingGetErrorOverviewTimeseriesForProjects200),
      "401": decodeError("ErrorTrackingGetErrorOverviewTimeseriesForProjects401", ErrorTrackingGetErrorOverviewTimeseriesForProjects401),
      "403": decodeError("ErrorTrackingGetErrorOverviewTimeseriesForProjects403", ErrorTrackingGetErrorOverviewTimeseriesForProjects403),
      "404": decodeError("ErrorTrackingGetErrorOverviewTimeseriesForProjects404", ErrorTrackingGetErrorOverviewTimeseriesForProjects404),
      "500": decodeError("ErrorTrackingGetErrorOverviewTimeseriesForProjects500", ErrorTrackingGetErrorOverviewTimeseriesForProjects500),
      orElse: unexpectedStatus
    }))
    ),
    "ErrorTrackingDeleteErrors": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/errors/issues/delete").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ErrorTrackingDeleteErrors200),
      "401": decodeError("ErrorTrackingDeleteErrors401", ErrorTrackingDeleteErrors401),
      "403": decodeError("ErrorTrackingDeleteErrors403", ErrorTrackingDeleteErrors403),
      "404": decodeError("ErrorTrackingDeleteErrors404", ErrorTrackingDeleteErrors404),
      "500": decodeError("ErrorTrackingDeleteErrors500", ErrorTrackingDeleteErrors500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ErrorTrackingMarkErrorsViewed": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/errors/issues/viewed").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "401": decodeError("ErrorTrackingMarkErrorsViewed401", ErrorTrackingMarkErrorsViewed401),
      "403": decodeError("ErrorTrackingMarkErrorsViewed403", ErrorTrackingMarkErrorsViewed403),
      "404": decodeError("ErrorTrackingMarkErrorsViewed404", ErrorTrackingMarkErrorsViewed404),
      "500": decodeError("ErrorTrackingMarkErrorsViewed500", ErrorTrackingMarkErrorsViewed500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ErrorTrackingResolveErrorIssues": (options) => HttpClientRequest.post("/v0/errors/resolve").pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "401": decodeError("ErrorTrackingResolveErrorIssues401", ErrorTrackingResolveErrorIssues401),
      "403": decodeError("ErrorTrackingResolveErrorIssues403", ErrorTrackingResolveErrorIssues403),
      "404": decodeError("ErrorTrackingResolveErrorIssues404", ErrorTrackingResolveErrorIssues404),
      "500": decodeError("ErrorTrackingResolveErrorIssues500", ErrorTrackingResolveErrorIssues500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ),
    "ErrorTrackingClearErrorResolutions": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/errors/resolutions/clear").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "401": decodeError("ErrorTrackingClearErrorResolutions401", ErrorTrackingClearErrorResolutions401),
      "403": decodeError("ErrorTrackingClearErrorResolutions403", ErrorTrackingClearErrorResolutions403),
      "404": decodeError("ErrorTrackingClearErrorResolutions404", ErrorTrackingClearErrorResolutions404),
      "500": decodeError("ErrorTrackingClearErrorResolutions500", ErrorTrackingClearErrorResolutions500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ErrorTrackingMergeErrorIssues": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/errors/issues/merge").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ErrorTrackingMergeErrorIssues200),
      "401": decodeError("ErrorTrackingMergeErrorIssues401", ErrorTrackingMergeErrorIssues401),
      "403": decodeError("ErrorTrackingMergeErrorIssues403", ErrorTrackingMergeErrorIssues403),
      "404": decodeError("ErrorTrackingMergeErrorIssues404", ErrorTrackingMergeErrorIssues404),
      "500": decodeError("ErrorTrackingMergeErrorIssues500", ErrorTrackingMergeErrorIssues500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ErrorTrackingUnmergeErrorIssueHashes": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/errors/issues/unmerge").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "401": decodeError("ErrorTrackingUnmergeErrorIssueHashes401", ErrorTrackingUnmergeErrorIssueHashes401),
      "403": decodeError("ErrorTrackingUnmergeErrorIssueHashes403", ErrorTrackingUnmergeErrorIssueHashes403),
      "404": decodeError("ErrorTrackingUnmergeErrorIssueHashes404", ErrorTrackingUnmergeErrorIssueHashes404),
      "500": decodeError("ErrorTrackingUnmergeErrorIssueHashes500", ErrorTrackingUnmergeErrorIssueHashes500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ErrorTrackingGetErrorFilterMeta": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/errors/filters").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ErrorTrackingGetErrorFilterMeta200),
      "401": decodeError("ErrorTrackingGetErrorFilterMeta401", ErrorTrackingGetErrorFilterMeta401),
      "403": decodeError("ErrorTrackingGetErrorFilterMeta403", ErrorTrackingGetErrorFilterMeta403),
      "404": decodeError("ErrorTrackingGetErrorFilterMeta404", ErrorTrackingGetErrorFilterMeta404),
      "500": decodeError("ErrorTrackingGetErrorFilterMeta500", ErrorTrackingGetErrorFilterMeta500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ErrorTrackingInterpretErrorFilters": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/errors/filters/interpret").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ErrorTrackingInterpretErrorFilters200),
      "401": decodeError("ErrorTrackingInterpretErrorFilters401", ErrorTrackingInterpretErrorFilters401),
      "403": decodeError("ErrorTrackingInterpretErrorFilters403", ErrorTrackingInterpretErrorFilters403),
      "404": decodeError("ErrorTrackingInterpretErrorFilters404", ErrorTrackingInterpretErrorFilters404),
      "500": decodeError("ErrorTrackingInterpretErrorFilters500", ErrorTrackingInterpretErrorFilters500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ErrorTrackingListErrorLabels": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/errors/labels").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "includeCounts": options?.params?.["includeCounts"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ErrorTrackingListErrorLabels200),
      "401": decodeError("ErrorTrackingListErrorLabels401", ErrorTrackingListErrorLabels401),
      "403": decodeError("ErrorTrackingListErrorLabels403", ErrorTrackingListErrorLabels403),
      "404": decodeError("ErrorTrackingListErrorLabels404", ErrorTrackingListErrorLabels404),
      "500": decodeError("ErrorTrackingListErrorLabels500", ErrorTrackingListErrorLabels500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ErrorTrackingCreateErrorLabel": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/errors/labels").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ErrorTrackingCreateErrorLabel200),
      "401": decodeError("ErrorTrackingCreateErrorLabel401", ErrorTrackingCreateErrorLabel401),
      "403": decodeError("ErrorTrackingCreateErrorLabel403", ErrorTrackingCreateErrorLabel403),
      "404": decodeError("ErrorTrackingCreateErrorLabel404", ErrorTrackingCreateErrorLabel404),
      "500": decodeError("ErrorTrackingCreateErrorLabel500", ErrorTrackingCreateErrorLabel500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ErrorTrackingDeleteErrorLabel": (idOrSlug, labelId, options) => __makePathRequest(HttpClientRequest.delete, [idOrSlug, labelId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/errors/labels/" + __encodePathParam(labelId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("ErrorTrackingDeleteErrorLabel401", ErrorTrackingDeleteErrorLabel401),
      "403": decodeError("ErrorTrackingDeleteErrorLabel403", ErrorTrackingDeleteErrorLabel403),
      "404": decodeError("ErrorTrackingDeleteErrorLabel404", ErrorTrackingDeleteErrorLabel404),
      "500": decodeError("ErrorTrackingDeleteErrorLabel500", ErrorTrackingDeleteErrorLabel500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ErrorTrackingUpdateErrorLabel": (idOrSlug, labelId, options) => __makePathRequest(HttpClientRequest.patch, [idOrSlug, labelId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/errors/labels/" + __encodePathParam(labelId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ErrorTrackingUpdateErrorLabel200),
      "401": decodeError("ErrorTrackingUpdateErrorLabel401", ErrorTrackingUpdateErrorLabel401),
      "403": decodeError("ErrorTrackingUpdateErrorLabel403", ErrorTrackingUpdateErrorLabel403),
      "404": decodeError("ErrorTrackingUpdateErrorLabel404", ErrorTrackingUpdateErrorLabel404),
      "500": decodeError("ErrorTrackingUpdateErrorLabel500", ErrorTrackingUpdateErrorLabel500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ErrorTrackingSetErrorLabelAssignments": (idOrSlug, errorId, options) => __makePathRequest(HttpClientRequest.put, [idOrSlug, errorId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/errors/issues/" + __encodePathParam(errorId) + "/labels").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "401": decodeError("ErrorTrackingSetErrorLabelAssignments401", ErrorTrackingSetErrorLabelAssignments401),
      "403": decodeError("ErrorTrackingSetErrorLabelAssignments403", ErrorTrackingSetErrorLabelAssignments403),
      "404": decodeError("ErrorTrackingSetErrorLabelAssignments404", ErrorTrackingSetErrorLabelAssignments404),
      "500": decodeError("ErrorTrackingSetErrorLabelAssignments500", ErrorTrackingSetErrorLabelAssignments500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "EventExplorerGetEventExplorerRows": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/events").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "templateId": options?.params?.["templateId"] as any, "mode": options?.params?.["mode"] as any, "columns": options?.params?.["columns"] as any, "page": options?.params?.["page"] as any, "pageSize": options?.params?.["pageSize"] as any, "fromTime": options?.params?.["fromTime"] as any, "toTime": options?.params?.["toTime"] as any, "snapshotTime": options?.params?.["snapshotTime"] as any, "beforeId": options?.params?.["beforeId"] as any, "beforeTime": options?.params?.["beforeTime"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(EventExplorerGetEventExplorerRows200),
      "401": decodeError("EventExplorerGetEventExplorerRows401", EventExplorerGetEventExplorerRows401),
      "403": decodeError("EventExplorerGetEventExplorerRows403", EventExplorerGetEventExplorerRows403),
      "404": decodeError("EventExplorerGetEventExplorerRows404", EventExplorerGetEventExplorerRows404),
      "500": decodeError("EventExplorerGetEventExplorerRows500", EventExplorerGetEventExplorerRows500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "EventExplorerGetEventExplorerDetail": (idOrSlug, eventId, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, eventId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/events/" + __encodePathParam(eventId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "templateId": options.params["templateId"] as any, "mode": options.params["mode"] as any, "columns": options.params["columns"] as any, "timestamp": options.params["timestamp"] as any }),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(EventExplorerGetEventExplorerDetail200),
      "401": decodeError("EventExplorerGetEventExplorerDetail401", EventExplorerGetEventExplorerDetail401),
      "403": decodeError("EventExplorerGetEventExplorerDetail403", EventExplorerGetEventExplorerDetail403),
      "404": decodeError("EventExplorerGetEventExplorerDetail404", EventExplorerGetEventExplorerDetail404),
      "500": decodeError("EventExplorerGetEventExplorerDetail500", EventExplorerGetEventExplorerDetail500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "EventMarkersListEventMarkerCollections": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/event-marker-collections").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(EventMarkersListEventMarkerCollections200),
      "400": decodeError("EventMarkersListEventMarkerCollections400", EventMarkersListEventMarkerCollections400),
      "401": decodeError("EventMarkersListEventMarkerCollections401", EventMarkersListEventMarkerCollections401),
      "403": decodeError("EventMarkersListEventMarkerCollections403", EventMarkersListEventMarkerCollections403),
      "404": decodeError("EventMarkersListEventMarkerCollections404", EventMarkersListEventMarkerCollections404),
      "500": decodeError("EventMarkersListEventMarkerCollections500", EventMarkersListEventMarkerCollections500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "EventMarkersCreateEventMarkerCollection": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/event-marker-collections").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(EventMarkersCreateEventMarkerCollection200),
      "400": decodeError("EventMarkersCreateEventMarkerCollection400", EventMarkersCreateEventMarkerCollection400),
      "401": decodeError("EventMarkersCreateEventMarkerCollection401", EventMarkersCreateEventMarkerCollection401),
      "403": decodeError("EventMarkersCreateEventMarkerCollection403", EventMarkersCreateEventMarkerCollection403),
      "404": decodeError("EventMarkersCreateEventMarkerCollection404", EventMarkersCreateEventMarkerCollection404),
      "500": decodeError("EventMarkersCreateEventMarkerCollection500", EventMarkersCreateEventMarkerCollection500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "EventMarkersDeleteEventMarkerCollection": (idOrSlug, collectionId, options) => __makePathRequest(HttpClientRequest.delete, [idOrSlug, collectionId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/event-marker-collections/" + __encodePathParam(collectionId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("EventMarkersDeleteEventMarkerCollection400", EventMarkersDeleteEventMarkerCollection400),
      "401": decodeError("EventMarkersDeleteEventMarkerCollection401", EventMarkersDeleteEventMarkerCollection401),
      "403": decodeError("EventMarkersDeleteEventMarkerCollection403", EventMarkersDeleteEventMarkerCollection403),
      "404": decodeError("EventMarkersDeleteEventMarkerCollection404", EventMarkersDeleteEventMarkerCollection404),
      "500": decodeError("EventMarkersDeleteEventMarkerCollection500", EventMarkersDeleteEventMarkerCollection500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "EventMarkersUpdateEventMarkerCollection": (idOrSlug, collectionId, options) => __makePathRequest(HttpClientRequest.patch, [idOrSlug, collectionId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/event-marker-collections/" + __encodePathParam(collectionId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(EventMarkersUpdateEventMarkerCollection200),
      "400": decodeError("EventMarkersUpdateEventMarkerCollection400", EventMarkersUpdateEventMarkerCollection400),
      "401": decodeError("EventMarkersUpdateEventMarkerCollection401", EventMarkersUpdateEventMarkerCollection401),
      "403": decodeError("EventMarkersUpdateEventMarkerCollection403", EventMarkersUpdateEventMarkerCollection403),
      "404": decodeError("EventMarkersUpdateEventMarkerCollection404", EventMarkersUpdateEventMarkerCollection404),
      "500": decodeError("EventMarkersUpdateEventMarkerCollection500", EventMarkersUpdateEventMarkerCollection500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "EventMarkersListEventMarkers": (idOrSlug, collectionId, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, collectionId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/event-marker-collections/" + __encodePathParam(collectionId) + "/events").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any, "limit": options?.params?.["limit"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(EventMarkersListEventMarkers200),
      "400": decodeError("EventMarkersListEventMarkers400", EventMarkersListEventMarkers400),
      "401": decodeError("EventMarkersListEventMarkers401", EventMarkersListEventMarkers401),
      "403": decodeError("EventMarkersListEventMarkers403", EventMarkersListEventMarkers403),
      "404": decodeError("EventMarkersListEventMarkers404", EventMarkersListEventMarkers404),
      "500": decodeError("EventMarkersListEventMarkers500", EventMarkersListEventMarkers500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "EventMarkersCreateEventMarker": (idOrSlug, collectionId, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug, collectionId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/event-marker-collections/" + __encodePathParam(collectionId) + "/events").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(EventMarkersCreateEventMarker200),
      "400": decodeError("EventMarkersCreateEventMarker400", EventMarkersCreateEventMarker400),
      "401": decodeError("EventMarkersCreateEventMarker401", EventMarkersCreateEventMarker401),
      "403": decodeError("EventMarkersCreateEventMarker403", EventMarkersCreateEventMarker403),
      "404": decodeError("EventMarkersCreateEventMarker404", EventMarkersCreateEventMarker404),
      "500": decodeError("EventMarkersCreateEventMarker500", EventMarkersCreateEventMarker500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "EventMarkersBulkCreateEventMarkers": (idOrSlug, collectionId, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug, collectionId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/event-marker-collections/" + __encodePathParam(collectionId) + "/events/bulk").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(EventMarkersBulkCreateEventMarkers200),
      "400": decodeError("EventMarkersBulkCreateEventMarkers400", EventMarkersBulkCreateEventMarkers400),
      "401": decodeError("EventMarkersBulkCreateEventMarkers401", EventMarkersBulkCreateEventMarkers401),
      "403": decodeError("EventMarkersBulkCreateEventMarkers403", EventMarkersBulkCreateEventMarkers403),
      "404": decodeError("EventMarkersBulkCreateEventMarkers404", EventMarkersBulkCreateEventMarkers404),
      "500": decodeError("EventMarkersBulkCreateEventMarkers500", EventMarkersBulkCreateEventMarkers500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "EventMarkersDeleteEventMarker": (idOrSlug, collectionId, eventId, options) => __makePathRequest(HttpClientRequest.delete, [idOrSlug, collectionId, eventId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/event-marker-collections/" + __encodePathParam(collectionId) + "/events/" + __encodePathParam(eventId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("EventMarkersDeleteEventMarker400", EventMarkersDeleteEventMarker400),
      "401": decodeError("EventMarkersDeleteEventMarker401", EventMarkersDeleteEventMarker401),
      "403": decodeError("EventMarkersDeleteEventMarker403", EventMarkersDeleteEventMarker403),
      "404": decodeError("EventMarkersDeleteEventMarker404", EventMarkersDeleteEventMarker404),
      "500": decodeError("EventMarkersDeleteEventMarker500", EventMarkersDeleteEventMarker500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "EventMarkersUpdateEventMarker": (idOrSlug, collectionId, eventId, options) => __makePathRequest(HttpClientRequest.patch, [idOrSlug, collectionId, eventId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/event-marker-collections/" + __encodePathParam(collectionId) + "/events/" + __encodePathParam(eventId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(EventMarkersUpdateEventMarker200),
      "400": decodeError("EventMarkersUpdateEventMarker400", EventMarkersUpdateEventMarker400),
      "401": decodeError("EventMarkersUpdateEventMarker401", EventMarkersUpdateEventMarker401),
      "403": decodeError("EventMarkersUpdateEventMarker403", EventMarkersUpdateEventMarker403),
      "404": decodeError("EventMarkersUpdateEventMarker404", EventMarkersUpdateEventMarker404),
      "500": decodeError("EventMarkersUpdateEventMarker500", EventMarkersUpdateEventMarker500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "FeatureFlagsListFeatureFlags": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/feature-flags").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FeatureFlagsListFeatureFlags200),
      "400": decodeError("FeatureFlagsListFeatureFlags400", FeatureFlagsListFeatureFlags400),
      "401": decodeError("FeatureFlagsListFeatureFlags401", FeatureFlagsListFeatureFlags401),
      "403": decodeError("FeatureFlagsListFeatureFlags403", FeatureFlagsListFeatureFlags403),
      "404": decodeError("FeatureFlagsListFeatureFlags404", FeatureFlagsListFeatureFlags404),
      "500": decodeError("FeatureFlagsListFeatureFlags500", FeatureFlagsListFeatureFlags500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "FeatureFlagsCreateFeatureFlag": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/feature-flags").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FeatureFlagsCreateFeatureFlag200),
      "400": decodeError("FeatureFlagsCreateFeatureFlag400", FeatureFlagsCreateFeatureFlag400),
      "401": decodeError("FeatureFlagsCreateFeatureFlag401", FeatureFlagsCreateFeatureFlag401),
      "403": decodeError("FeatureFlagsCreateFeatureFlag403", FeatureFlagsCreateFeatureFlag403),
      "404": decodeError("FeatureFlagsCreateFeatureFlag404", FeatureFlagsCreateFeatureFlag404),
      "500": decodeError("FeatureFlagsCreateFeatureFlag500", FeatureFlagsCreateFeatureFlag500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "FeatureFlagsDeleteFeatureFlag": (idOrSlug, flagId, options) => __makePathRequest(HttpClientRequest.delete, [idOrSlug, flagId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/feature-flags/" + __encodePathParam(flagId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("FeatureFlagsDeleteFeatureFlag400", FeatureFlagsDeleteFeatureFlag400),
      "401": decodeError("FeatureFlagsDeleteFeatureFlag401", FeatureFlagsDeleteFeatureFlag401),
      "403": decodeError("FeatureFlagsDeleteFeatureFlag403", FeatureFlagsDeleteFeatureFlag403),
      "404": decodeError("FeatureFlagsDeleteFeatureFlag404", FeatureFlagsDeleteFeatureFlag404),
      "500": decodeError("FeatureFlagsDeleteFeatureFlag500", FeatureFlagsDeleteFeatureFlag500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "FeatureFlagsUpdateFeatureFlag": (idOrSlug, flagId, options) => __makePathRequest(HttpClientRequest.patch, [idOrSlug, flagId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/feature-flags/" + __encodePathParam(flagId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FeatureFlagsUpdateFeatureFlag200),
      "400": decodeError("FeatureFlagsUpdateFeatureFlag400", FeatureFlagsUpdateFeatureFlag400),
      "401": decodeError("FeatureFlagsUpdateFeatureFlag401", FeatureFlagsUpdateFeatureFlag401),
      "403": decodeError("FeatureFlagsUpdateFeatureFlag403", FeatureFlagsUpdateFeatureFlag403),
      "404": decodeError("FeatureFlagsUpdateFeatureFlag404", FeatureFlagsUpdateFeatureFlag404),
      "500": decodeError("FeatureFlagsUpdateFeatureFlag500", FeatureFlagsUpdateFeatureFlag500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "FeatureFlagsReshuffleFeatureFlagRollout": (idOrSlug, flagId, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug, flagId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/feature-flags/" + __encodePathParam(flagId) + "/reshuffle").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FeatureFlagsReshuffleFeatureFlagRollout200),
      "400": decodeError("FeatureFlagsReshuffleFeatureFlagRollout400", FeatureFlagsReshuffleFeatureFlagRollout400),
      "401": decodeError("FeatureFlagsReshuffleFeatureFlagRollout401", FeatureFlagsReshuffleFeatureFlagRollout401),
      "403": decodeError("FeatureFlagsReshuffleFeatureFlagRollout403", FeatureFlagsReshuffleFeatureFlagRollout403),
      "404": decodeError("FeatureFlagsReshuffleFeatureFlagRollout404", FeatureFlagsReshuffleFeatureFlagRollout404),
      "500": decodeError("FeatureFlagsReshuffleFeatureFlagRollout500", FeatureFlagsReshuffleFeatureFlagRollout500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "FeatureFlagsGetFeatureFlagActivity": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/feature-flag-activity").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FeatureFlagsGetFeatureFlagActivity200),
      "400": decodeError("FeatureFlagsGetFeatureFlagActivity400", FeatureFlagsGetFeatureFlagActivity400),
      "401": decodeError("FeatureFlagsGetFeatureFlagActivity401", FeatureFlagsGetFeatureFlagActivity401),
      "403": decodeError("FeatureFlagsGetFeatureFlagActivity403", FeatureFlagsGetFeatureFlagActivity403),
      "404": decodeError("FeatureFlagsGetFeatureFlagActivity404", FeatureFlagsGetFeatureFlagActivity404),
      "500": decodeError("FeatureFlagsGetFeatureFlagActivity500", FeatureFlagsGetFeatureFlagActivity500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "FeatureFlagsGetFeatureFlagExposure": (idOrSlug, flagId, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, flagId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/feature-flags/" + __encodePathParam(flagId) + "/exposure").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "fromTime": options?.params?.["fromTime"] as any, "toTime": options?.params?.["toTime"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FeatureFlagsGetFeatureFlagExposure200),
      "400": decodeError("FeatureFlagsGetFeatureFlagExposure400", FeatureFlagsGetFeatureFlagExposure400),
      "401": decodeError("FeatureFlagsGetFeatureFlagExposure401", FeatureFlagsGetFeatureFlagExposure401),
      "403": decodeError("FeatureFlagsGetFeatureFlagExposure403", FeatureFlagsGetFeatureFlagExposure403),
      "404": decodeError("FeatureFlagsGetFeatureFlagExposure404", FeatureFlagsGetFeatureFlagExposure404),
      "500": decodeError("FeatureFlagsGetFeatureFlagExposure500", FeatureFlagsGetFeatureFlagExposure500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "FeatureFlagsGetFeatureFlagSeries": (idOrSlug, flagId, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, flagId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/feature-flags/" + __encodePathParam(flagId) + "/series").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "fromTime": options?.params?.["fromTime"] as any, "toTime": options?.params?.["toTime"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FeatureFlagsGetFeatureFlagSeries200),
      "400": decodeError("FeatureFlagsGetFeatureFlagSeries400", FeatureFlagsGetFeatureFlagSeries400),
      "401": decodeError("FeatureFlagsGetFeatureFlagSeries401", FeatureFlagsGetFeatureFlagSeries401),
      "403": decodeError("FeatureFlagsGetFeatureFlagSeries403", FeatureFlagsGetFeatureFlagSeries403),
      "404": decodeError("FeatureFlagsGetFeatureFlagSeries404", FeatureFlagsGetFeatureFlagSeries404),
      "500": decodeError("FeatureFlagsGetFeatureFlagSeries500", FeatureFlagsGetFeatureFlagSeries500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "FeatureFlagsListFeatureFlagEvaluations": (idOrSlug, flagId, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, flagId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/feature-flags/" + __encodePathParam(flagId) + "/evaluations").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "fromTime": options?.params?.["fromTime"] as any, "toTime": options?.params?.["toTime"] as any, "limit": options?.params?.["limit"] as any, "offset": options?.params?.["offset"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FeatureFlagsListFeatureFlagEvaluations200),
      "400": decodeError("FeatureFlagsListFeatureFlagEvaluations400", FeatureFlagsListFeatureFlagEvaluations400),
      "401": decodeError("FeatureFlagsListFeatureFlagEvaluations401", FeatureFlagsListFeatureFlagEvaluations401),
      "403": decodeError("FeatureFlagsListFeatureFlagEvaluations403", FeatureFlagsListFeatureFlagEvaluations403),
      "404": decodeError("FeatureFlagsListFeatureFlagEvaluations404", FeatureFlagsListFeatureFlagEvaluations404),
      "500": decodeError("FeatureFlagsListFeatureFlagEvaluations500", FeatureFlagsListFeatureFlagEvaluations500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "FeatureFlagsTestFeatureFlag": (idOrSlug, flagId, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug, flagId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/feature-flags/" + __encodePathParam(flagId) + "/test").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FeatureFlagsTestFeatureFlag200),
      "400": decodeError("FeatureFlagsTestFeatureFlag400", FeatureFlagsTestFeatureFlag400),
      "401": decodeError("FeatureFlagsTestFeatureFlag401", FeatureFlagsTestFeatureFlag401),
      "403": decodeError("FeatureFlagsTestFeatureFlag403", FeatureFlagsTestFeatureFlag403),
      "404": decodeError("FeatureFlagsTestFeatureFlag404", FeatureFlagsTestFeatureFlag404),
      "500": decodeError("FeatureFlagsTestFeatureFlag500", FeatureFlagsTestFeatureFlag500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "FeatureFlagsListFeatureFlagSegments": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/feature-flag-segments").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FeatureFlagsListFeatureFlagSegments200),
      "400": decodeError("FeatureFlagsListFeatureFlagSegments400", FeatureFlagsListFeatureFlagSegments400),
      "401": decodeError("FeatureFlagsListFeatureFlagSegments401", FeatureFlagsListFeatureFlagSegments401),
      "403": decodeError("FeatureFlagsListFeatureFlagSegments403", FeatureFlagsListFeatureFlagSegments403),
      "404": decodeError("FeatureFlagsListFeatureFlagSegments404", FeatureFlagsListFeatureFlagSegments404),
      "500": decodeError("FeatureFlagsListFeatureFlagSegments500", FeatureFlagsListFeatureFlagSegments500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "FeatureFlagsCreateFeatureFlagSegment": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/feature-flag-segments").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FeatureFlagsCreateFeatureFlagSegment200),
      "400": decodeError("FeatureFlagsCreateFeatureFlagSegment400", FeatureFlagsCreateFeatureFlagSegment400),
      "401": decodeError("FeatureFlagsCreateFeatureFlagSegment401", FeatureFlagsCreateFeatureFlagSegment401),
      "403": decodeError("FeatureFlagsCreateFeatureFlagSegment403", FeatureFlagsCreateFeatureFlagSegment403),
      "404": decodeError("FeatureFlagsCreateFeatureFlagSegment404", FeatureFlagsCreateFeatureFlagSegment404),
      "500": decodeError("FeatureFlagsCreateFeatureFlagSegment500", FeatureFlagsCreateFeatureFlagSegment500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "FeatureFlagsUpdateFeatureFlagSegment": (idOrSlug, segmentId, options) => __makePathRequest(HttpClientRequest.put, [idOrSlug, segmentId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/feature-flag-segments/" + __encodePathParam(segmentId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FeatureFlagsUpdateFeatureFlagSegment200),
      "400": decodeError("FeatureFlagsUpdateFeatureFlagSegment400", FeatureFlagsUpdateFeatureFlagSegment400),
      "401": decodeError("FeatureFlagsUpdateFeatureFlagSegment401", FeatureFlagsUpdateFeatureFlagSegment401),
      "403": decodeError("FeatureFlagsUpdateFeatureFlagSegment403", FeatureFlagsUpdateFeatureFlagSegment403),
      "404": decodeError("FeatureFlagsUpdateFeatureFlagSegment404", FeatureFlagsUpdateFeatureFlagSegment404),
      "500": decodeError("FeatureFlagsUpdateFeatureFlagSegment500", FeatureFlagsUpdateFeatureFlagSegment500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "FeatureFlagsDeleteFeatureFlagSegment": (idOrSlug, segmentId, options) => __makePathRequest(HttpClientRequest.delete, [idOrSlug, segmentId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/feature-flag-segments/" + __encodePathParam(segmentId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("FeatureFlagsDeleteFeatureFlagSegment400", FeatureFlagsDeleteFeatureFlagSegment400),
      "401": decodeError("FeatureFlagsDeleteFeatureFlagSegment401", FeatureFlagsDeleteFeatureFlagSegment401),
      "403": decodeError("FeatureFlagsDeleteFeatureFlagSegment403", FeatureFlagsDeleteFeatureFlagSegment403),
      "404": decodeError("FeatureFlagsDeleteFeatureFlagSegment404", FeatureFlagsDeleteFeatureFlagSegment404),
      "500": decodeError("FeatureFlagsDeleteFeatureFlagSegment500", FeatureFlagsDeleteFeatureFlagSegment500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "FeatureFlagsListFeatureFlagUserStates": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/feature-flag-user-states").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "userIds": options.params["userIds"] as any }),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FeatureFlagsListFeatureFlagUserStates200),
      "400": decodeError("FeatureFlagsListFeatureFlagUserStates400", FeatureFlagsListFeatureFlagUserStates400),
      "401": decodeError("FeatureFlagsListFeatureFlagUserStates401", FeatureFlagsListFeatureFlagUserStates401),
      "403": decodeError("FeatureFlagsListFeatureFlagUserStates403", FeatureFlagsListFeatureFlagUserStates403),
      "404": decodeError("FeatureFlagsListFeatureFlagUserStates404", FeatureFlagsListFeatureFlagUserStates404),
      "500": decodeError("FeatureFlagsListFeatureFlagUserStates500", FeatureFlagsListFeatureFlagUserStates500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "FunnelsListFunnels": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/funnels").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FunnelsListFunnels200),
      "400": decodeError("FunnelsListFunnels400", FunnelsListFunnels400),
      "401": decodeError("FunnelsListFunnels401", FunnelsListFunnels401),
      "403": decodeError("FunnelsListFunnels403", FunnelsListFunnels403),
      "404": decodeError("FunnelsListFunnels404", FunnelsListFunnels404),
      "500": decodeError("FunnelsListFunnels500", FunnelsListFunnels500),
      "503": decodeError("FunnelsListFunnels503", FunnelsListFunnels503),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "FunnelsCreateFunnel": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/funnels").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FunnelsCreateFunnel200),
      "400": decodeError("FunnelsCreateFunnel400", FunnelsCreateFunnel400),
      "401": decodeError("FunnelsCreateFunnel401", FunnelsCreateFunnel401),
      "403": decodeError("FunnelsCreateFunnel403", FunnelsCreateFunnel403),
      "404": decodeError("FunnelsCreateFunnel404", FunnelsCreateFunnel404),
      "500": decodeError("FunnelsCreateFunnel500", FunnelsCreateFunnel500),
      "503": decodeError("FunnelsCreateFunnel503", FunnelsCreateFunnel503),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "FunnelsGetFunnel": (idOrSlug, funnelId, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, funnelId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/funnels/" + __encodePathParam(funnelId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FunnelsGetFunnel200),
      "400": decodeError("FunnelsGetFunnel400", FunnelsGetFunnel400),
      "401": decodeError("FunnelsGetFunnel401", FunnelsGetFunnel401),
      "403": decodeError("FunnelsGetFunnel403", FunnelsGetFunnel403),
      "404": decodeError("FunnelsGetFunnel404", FunnelsGetFunnel404),
      "500": decodeError("FunnelsGetFunnel500", FunnelsGetFunnel500),
      "503": decodeError("FunnelsGetFunnel503", FunnelsGetFunnel503),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "FunnelsDeleteFunnel": (idOrSlug, funnelId, options) => __makePathRequest(HttpClientRequest.delete, [idOrSlug, funnelId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/funnels/" + __encodePathParam(funnelId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("FunnelsDeleteFunnel400", FunnelsDeleteFunnel400),
      "401": decodeError("FunnelsDeleteFunnel401", FunnelsDeleteFunnel401),
      "403": decodeError("FunnelsDeleteFunnel403", FunnelsDeleteFunnel403),
      "404": decodeError("FunnelsDeleteFunnel404", FunnelsDeleteFunnel404),
      "500": decodeError("FunnelsDeleteFunnel500", FunnelsDeleteFunnel500),
      "503": decodeError("FunnelsDeleteFunnel503", FunnelsDeleteFunnel503),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "FunnelsUpdateFunnel": (idOrSlug, funnelId, options) => __makePathRequest(HttpClientRequest.patch, [idOrSlug, funnelId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/funnels/" + __encodePathParam(funnelId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FunnelsUpdateFunnel200),
      "400": decodeError("FunnelsUpdateFunnel400", FunnelsUpdateFunnel400),
      "401": decodeError("FunnelsUpdateFunnel401", FunnelsUpdateFunnel401),
      "403": decodeError("FunnelsUpdateFunnel403", FunnelsUpdateFunnel403),
      "404": decodeError("FunnelsUpdateFunnel404", FunnelsUpdateFunnel404),
      "500": decodeError("FunnelsUpdateFunnel500", FunnelsUpdateFunnel500),
      "503": decodeError("FunnelsUpdateFunnel503", FunnelsUpdateFunnel503),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "FunnelsDuplicateFunnel": (idOrSlug, funnelId, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug, funnelId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/funnels/" + __encodePathParam(funnelId) + "/duplicate").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(FunnelsDuplicateFunnel200),
      "400": decodeError("FunnelsDuplicateFunnel400", FunnelsDuplicateFunnel400),
      "401": decodeError("FunnelsDuplicateFunnel401", FunnelsDuplicateFunnel401),
      "403": decodeError("FunnelsDuplicateFunnel403", FunnelsDuplicateFunnel403),
      "404": decodeError("FunnelsDuplicateFunnel404", FunnelsDuplicateFunnel404),
      "500": decodeError("FunnelsDuplicateFunnel500", FunnelsDuplicateFunnel500),
      "503": decodeError("FunnelsDuplicateFunnel503", FunnelsDuplicateFunnel503),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ImagesCreateImageUploadUrl": (options) => HttpClientRequest.post("/v0/images/upload-url").pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ImagesCreateImageUploadUrl200),
      "401": decodeError("ImagesCreateImageUploadUrl401", ImagesCreateImageUploadUrl401),
      "403": decodeError("ImagesCreateImageUploadUrl403", ImagesCreateImageUploadUrl403),
      "404": decodeError("ImagesCreateImageUploadUrl404", ImagesCreateImageUploadUrl404),
      "500": decodeError("ImagesCreateImageUploadUrl500", ImagesCreateImageUploadUrl500),
      "502": decodeError("ImagesCreateImageUploadUrl502", ImagesCreateImageUploadUrl502),
      orElse: unexpectedStatus
    }))
    ),
    "ImagesDeleteImage": (imageId, options) => __makePathRequest(HttpClientRequest.delete, [imageId], () => "/v0/images/" + __encodePathParam(imageId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "type": options.params["type"] as any, "organizationId": options.params["organizationId"] as any, "projectId": options.params["projectId"] as any }),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "401": decodeError("ImagesDeleteImage401", ImagesDeleteImage401),
      "403": decodeError("ImagesDeleteImage403", ImagesDeleteImage403),
      "404": decodeError("ImagesDeleteImage404", ImagesDeleteImage404),
      "500": decodeError("ImagesDeleteImage500", ImagesDeleteImage500),
      "502": decodeError("ImagesDeleteImage502", ImagesDeleteImage502),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "MetricsQueryChartAst": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/metrics/query").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(MetricsQueryChartAst200),
      "400": decodeError("MetricsQueryChartAst400", MetricsQueryChartAst400),
      "401": decodeError("MetricsQueryChartAst401", MetricsQueryChartAst401),
      "403": decodeError("MetricsQueryChartAst403", MetricsQueryChartAst403),
      "404": decodeError("MetricsQueryChartAst404", MetricsQueryChartAst404),
      "500": decodeError("MetricsQueryChartAst500", MetricsQueryChartAst500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "MetricsGetPreviewData": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/metrics/preview").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(MetricsGetPreviewData200),
      "400": decodeError("MetricsGetPreviewData400", MetricsGetPreviewData400),
      "401": decodeError("MetricsGetPreviewData401", MetricsGetPreviewData401),
      "403": decodeError("MetricsGetPreviewData403", MetricsGetPreviewData403),
      "404": decodeError("MetricsGetPreviewData404", MetricsGetPreviewData404),
      "500": decodeError("MetricsGetPreviewData500", MetricsGetPreviewData500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "MetricsLoadDashboardData": (options) => HttpClientRequest.post("/v0/metrics/dashboard-data").pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(MetricsLoadDashboardData200),
      "400": decodeError("MetricsLoadDashboardData400", MetricsLoadDashboardData400),
      "401": decodeError("MetricsLoadDashboardData401", MetricsLoadDashboardData401),
      "403": decodeError("MetricsLoadDashboardData403", MetricsLoadDashboardData403),
      "404": decodeError("MetricsLoadDashboardData404", MetricsLoadDashboardData404),
      "500": decodeError("MetricsLoadDashboardData500", MetricsLoadDashboardData500),
      orElse: unexpectedStatus
    }))
    ),
    "MetricsGetDashboardFilterSuggestions": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/metrics/filter-suggestions").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(MetricsGetDashboardFilterSuggestions200),
      "400": decodeError("MetricsGetDashboardFilterSuggestions400", MetricsGetDashboardFilterSuggestions400),
      "401": decodeError("MetricsGetDashboardFilterSuggestions401", MetricsGetDashboardFilterSuggestions401),
      "403": decodeError("MetricsGetDashboardFilterSuggestions403", MetricsGetDashboardFilterSuggestions403),
      "404": decodeError("MetricsGetDashboardFilterSuggestions404", MetricsGetDashboardFilterSuggestions404),
      "500": decodeError("MetricsGetDashboardFilterSuggestions500", MetricsGetDashboardFilterSuggestions500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "MetricsInterpretDashboardFilter": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/metrics/interpret-filter").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(MetricsInterpretDashboardFilter200),
      "400": decodeError("MetricsInterpretDashboardFilter400", MetricsInterpretDashboardFilter400),
      "401": decodeError("MetricsInterpretDashboardFilter401", MetricsInterpretDashboardFilter401),
      "403": decodeError("MetricsInterpretDashboardFilter403", MetricsInterpretDashboardFilter403),
      "404": decodeError("MetricsInterpretDashboardFilter404", MetricsInterpretDashboardFilter404),
      "500": decodeError("MetricsInterpretDashboardFilter500", MetricsInterpretDashboardFilter500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "MetricsGetProjectsDashboardData": (options) => HttpClientRequest.post("/v0/metrics/projects-dashboard").pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(MetricsGetProjectsDashboardData200),
      "400": decodeError("MetricsGetProjectsDashboardData400", MetricsGetProjectsDashboardData400),
      "401": decodeError("MetricsGetProjectsDashboardData401", MetricsGetProjectsDashboardData401),
      "403": decodeError("MetricsGetProjectsDashboardData403", MetricsGetProjectsDashboardData403),
      "404": decodeError("MetricsGetProjectsDashboardData404", MetricsGetProjectsDashboardData404),
      "500": decodeError("MetricsGetProjectsDashboardData500", MetricsGetProjectsDashboardData500),
      orElse: unexpectedStatus
    }))
    ),
    "MetricsGetPublicChartData": (chartId, options) => __makePathRequest(HttpClientRequest.get, [chartId], () => "/v0/metrics/embed/" + __encodePathParam(chartId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(MetricsGetPublicChartData200),
      "404": decodeError("MetricsGetPublicChartData404", MetricsGetPublicChartData404),
      "500": decodeError("MetricsGetPublicChartData500", MetricsGetPublicChartData500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "NetworkRulesListNetworkRules": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/network-rules").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(NetworkRulesListNetworkRules200),
      "400": decodeError("NetworkRulesListNetworkRules400", NetworkRulesListNetworkRules400),
      "401": decodeError("NetworkRulesListNetworkRules401", NetworkRulesListNetworkRules401),
      "403": decodeError("NetworkRulesListNetworkRules403", NetworkRulesListNetworkRules403),
      "404": decodeError("NetworkRulesListNetworkRules404", NetworkRulesListNetworkRules404),
      "500": decodeError("NetworkRulesListNetworkRules500", NetworkRulesListNetworkRules500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "NetworkRulesCreateNetworkRule": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/network-rules").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(NetworkRulesCreateNetworkRule200),
      "400": decodeError("NetworkRulesCreateNetworkRule400", NetworkRulesCreateNetworkRule400),
      "401": decodeError("NetworkRulesCreateNetworkRule401", NetworkRulesCreateNetworkRule401),
      "403": decodeError("NetworkRulesCreateNetworkRule403", NetworkRulesCreateNetworkRule403),
      "404": decodeError("NetworkRulesCreateNetworkRule404", NetworkRulesCreateNetworkRule404),
      "500": decodeError("NetworkRulesCreateNetworkRule500", NetworkRulesCreateNetworkRule500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "NetworkRulesDeleteNetworkRule": (idOrSlug, ruleId, options) => __makePathRequest(HttpClientRequest.delete, [idOrSlug, ruleId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/network-rules/" + __encodePathParam(ruleId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("NetworkRulesDeleteNetworkRule400", NetworkRulesDeleteNetworkRule400),
      "401": decodeError("NetworkRulesDeleteNetworkRule401", NetworkRulesDeleteNetworkRule401),
      "403": decodeError("NetworkRulesDeleteNetworkRule403", NetworkRulesDeleteNetworkRule403),
      "404": decodeError("NetworkRulesDeleteNetworkRule404", NetworkRulesDeleteNetworkRule404),
      "500": decodeError("NetworkRulesDeleteNetworkRule500", NetworkRulesDeleteNetworkRule500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ProjectsGetProjectBilling": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/billing").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ProjectsGetProjectBilling200),
      "400": decodeError("ProjectsGetProjectBilling400", ProjectsGetProjectBilling400),
      "401": decodeError("ProjectsGetProjectBilling401", ProjectsGetProjectBilling401),
      "403": decodeError("ProjectsGetProjectBilling403", ProjectsGetProjectBilling403),
      "404": decodeError("ProjectsGetProjectBilling404", ProjectsGetProjectBilling404),
      "409": decodeError("ProjectsGetProjectBilling409", ProjectsGetProjectBilling409),
      "500": decodeError("ProjectsGetProjectBilling500", ProjectsGetProjectBilling500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ProjectsRequestDataExport": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/data-exports").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ProjectsRequestDataExport200),
      "400": decodeError("ProjectsRequestDataExport400", ProjectsRequestDataExport400),
      "401": decodeError("ProjectsRequestDataExport401", ProjectsRequestDataExport401),
      "403": decodeError("ProjectsRequestDataExport403", ProjectsRequestDataExport403),
      "404": decodeError("ProjectsRequestDataExport404", ProjectsRequestDataExport404),
      "409": decodeError("ProjectsRequestDataExport409", ProjectsRequestDataExport409),
      "500": decodeError("ProjectsRequestDataExport500", ProjectsRequestDataExport500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ProjectsListProjects": (options) => HttpClientRequest.get("/v0/projects").pipe(
      HttpClientRequest.setUrlParams({ "ownerId": options?.params?.["ownerId"] as any, "projectId": options?.params?.["projectId"] as any, "slug": options?.params?.["slug"] as any, "search": options?.params?.["search"] as any, "limit": options?.params?.["limit"] as any, "offset": options?.params?.["offset"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ProjectsListProjects200),
      "400": decodeError("ProjectsListProjects400", ProjectsListProjects400),
      "401": decodeError("ProjectsListProjects401", ProjectsListProjects401),
      "403": decodeError("ProjectsListProjects403", ProjectsListProjects403),
      "404": decodeError("ProjectsListProjects404", ProjectsListProjects404),
      "409": decodeError("ProjectsListProjects409", ProjectsListProjects409),
      "500": decodeError("ProjectsListProjects500", ProjectsListProjects500),
      orElse: unexpectedStatus
    }))
    ),
    "ProjectsCreateProject": (options) => HttpClientRequest.post("/v0/projects").pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ProjectsCreateProject200),
      "400": decodeError("ProjectsCreateProject400", ProjectsCreateProject400),
      "401": decodeError("ProjectsCreateProject401", ProjectsCreateProject401),
      "403": decodeError("ProjectsCreateProject403", ProjectsCreateProject403),
      "404": decodeError("ProjectsCreateProject404", ProjectsCreateProject404),
      "409": decodeError("ProjectsCreateProject409", ProjectsCreateProject409),
      "500": decodeError("ProjectsCreateProject500", ProjectsCreateProject500),
      orElse: unexpectedStatus
    }))
    ),
    "ProjectsListPublicProjects": (options) => HttpClientRequest.get("/v0/public-projects").pipe(
      HttpClientRequest.setUrlParams({ "ownerId": options?.params?.["ownerId"] as any, "ownerSlug": options?.params?.["ownerSlug"] as any, "slug": options?.params?.["slug"] as any, "search": options?.params?.["search"] as any, "limit": options?.params?.["limit"] as any, "offset": options?.params?.["offset"] as any, "sort": options?.params?.["sort"] as any, "direction": options?.params?.["direction"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ProjectsListPublicProjects200),
      "500": decodeError("ProjectsListPublicProjects500", ProjectsListPublicProjects500),
      orElse: unexpectedStatus
    }))
    ),
    "ProjectsGetPublicProjectStats": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/projects/" + __encodePathParam(idOrSlug) + "/stats").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ProjectsGetPublicProjectStats200),
      "404": decodeError("ProjectsGetPublicProjectStats404", ProjectsGetPublicProjectStats404),
      "500": decodeError("ProjectsGetPublicProjectStats500", ProjectsGetPublicProjectStats500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ProjectsGetProject": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ProjectsGetProject200),
      "400": decodeError("ProjectsGetProject400", ProjectsGetProject400),
      "401": decodeError("ProjectsGetProject401", ProjectsGetProject401),
      "403": decodeError("ProjectsGetProject403", ProjectsGetProject403),
      "404": decodeError("ProjectsGetProject404", ProjectsGetProject404),
      "409": decodeError("ProjectsGetProject409", ProjectsGetProject409),
      "500": decodeError("ProjectsGetProject500", ProjectsGetProject500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ProjectsDeleteProject": (idOrSlug, options) => __makePathRequest(HttpClientRequest.delete, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("ProjectsDeleteProject400", ProjectsDeleteProject400),
      "401": decodeError("ProjectsDeleteProject401", ProjectsDeleteProject401),
      "403": decodeError("ProjectsDeleteProject403", ProjectsDeleteProject403),
      "404": decodeError("ProjectsDeleteProject404", ProjectsDeleteProject404),
      "409": decodeError("ProjectsDeleteProject409", ProjectsDeleteProject409),
      "500": decodeError("ProjectsDeleteProject500", ProjectsDeleteProject500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ProjectsUpdateProject": (idOrSlug, options) => __makePathRequest(HttpClientRequest.patch, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ProjectsUpdateProject200),
      "400": decodeError("ProjectsUpdateProject400", ProjectsUpdateProject400),
      "401": decodeError("ProjectsUpdateProject401", ProjectsUpdateProject401),
      "403": decodeError("ProjectsUpdateProject403", ProjectsUpdateProject403),
      "404": decodeError("ProjectsUpdateProject404", ProjectsUpdateProject404),
      "409": decodeError("ProjectsUpdateProject409", ProjectsUpdateProject409),
      "500": decodeError("ProjectsUpdateProject500", ProjectsUpdateProject500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ProjectsCheckProjectData": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/check-data").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ProjectsCheckProjectData200),
      "400": decodeError("ProjectsCheckProjectData400", ProjectsCheckProjectData400),
      "401": decodeError("ProjectsCheckProjectData401", ProjectsCheckProjectData401),
      "403": decodeError("ProjectsCheckProjectData403", ProjectsCheckProjectData403),
      "404": decodeError("ProjectsCheckProjectData404", ProjectsCheckProjectData404),
      "409": decodeError("ProjectsCheckProjectData409", ProjectsCheckProjectData409),
      "500": decodeError("ProjectsCheckProjectData500", ProjectsCheckProjectData500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ProjectsCheckSlugAvailability": (slug, options) => __makePathRequest(HttpClientRequest.get, [slug], () => "/v0/project-slugs/" + __encodePathParam(slug) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "excludeProjectId": options?.params?.["excludeProjectId"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ProjectsCheckSlugAvailability200),
      "400": decodeError("ProjectsCheckSlugAvailability400", ProjectsCheckSlugAvailability400),
      "401": decodeError("ProjectsCheckSlugAvailability401", ProjectsCheckSlugAvailability401),
      "403": decodeError("ProjectsCheckSlugAvailability403", ProjectsCheckSlugAvailability403),
      "404": decodeError("ProjectsCheckSlugAvailability404", ProjectsCheckSlugAvailability404),
      "409": decodeError("ProjectsCheckSlugAvailability409", ProjectsCheckSlugAvailability409),
      "500": decodeError("ProjectsCheckSlugAvailability500", ProjectsCheckSlugAvailability500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ProjectsMoveProject": (idOrSlug, options) => __makePathRequest(HttpClientRequest.patch, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/owner").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("ProjectsMoveProject400", ProjectsMoveProject400),
      "401": decodeError("ProjectsMoveProject401", ProjectsMoveProject401),
      "403": decodeError("ProjectsMoveProject403", ProjectsMoveProject403),
      "404": decodeError("ProjectsMoveProject404", ProjectsMoveProject404),
      "409": decodeError("ProjectsMoveProject409", ProjectsMoveProject409),
      "500": decodeError("ProjectsMoveProject500", ProjectsMoveProject500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ProjectsWipeProjectData": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/wipe").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("ProjectsWipeProjectData400", ProjectsWipeProjectData400),
      "401": decodeError("ProjectsWipeProjectData401", ProjectsWipeProjectData401),
      "403": decodeError("ProjectsWipeProjectData403", ProjectsWipeProjectData403),
      "404": decodeError("ProjectsWipeProjectData404", ProjectsWipeProjectData404),
      "409": decodeError("ProjectsWipeProjectData409", ProjectsWipeProjectData409),
      "500": decodeError("ProjectsWipeProjectData500", ProjectsWipeProjectData500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ProjectsResetProjectErrorTracking": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/error-tracking/reset").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "400": decodeError("ProjectsResetProjectErrorTracking400", ProjectsResetProjectErrorTracking400),
      "401": decodeError("ProjectsResetProjectErrorTracking401", ProjectsResetProjectErrorTracking401),
      "403": decodeError("ProjectsResetProjectErrorTracking403", ProjectsResetProjectErrorTracking403),
      "404": decodeError("ProjectsResetProjectErrorTracking404", ProjectsResetProjectErrorTracking404),
      "409": decodeError("ProjectsResetProjectErrorTracking409", ProjectsResetProjectErrorTracking409),
      "500": decodeError("ProjectsResetProjectErrorTracking500", ProjectsResetProjectErrorTracking500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "RetentionGetRetentionForProject": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/retention").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "granularity": options.params["granularity"] as any, "cohortFrom": options.params["cohortFrom"] as any, "cohortTo": options.params["cohortTo"] as any, "periodCount": options.params["periodCount"] as any, "includeHasMore": options.params["includeHasMore"] as any, "source": options.params["source"] as any, "timezone": options.params["timezone"] as any, "filterFields": options.params["filterFields"] as any, "filterOperators": options.params["filterOperators"] as any, "filterValues": options.params["filterValues"] as any }),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RetentionGetRetentionForProject200),
      "401": decodeError("RetentionGetRetentionForProject401", RetentionGetRetentionForProject401),
      "403": decodeError("RetentionGetRetentionForProject403", RetentionGetRetentionForProject403),
      "404": decodeError("RetentionGetRetentionForProject404", RetentionGetRetentionForProject404),
      "500": decodeError("RetentionGetRetentionForProject500", RetentionGetRetentionForProject500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "RetentionGetRetentionDriversForProject": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/retention/drivers").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "granularity": options.params["granularity"] as any, "cohortFrom": options.params["cohortFrom"] as any, "cohortTo": options.params["cohortTo"] as any, "targetPeriod": options.params["targetPeriod"] as any, "source": options.params["source"] as any, "minSegmentUsers": options.params["minSegmentUsers"] as any, "timezone": options.params["timezone"] as any, "filterFields": options.params["filterFields"] as any, "filterOperators": options.params["filterOperators"] as any, "filterValues": options.params["filterValues"] as any }),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RetentionGetRetentionDriversForProject200),
      "401": decodeError("RetentionGetRetentionDriversForProject401", RetentionGetRetentionDriversForProject401),
      "403": decodeError("RetentionGetRetentionDriversForProject403", RetentionGetRetentionDriversForProject403),
      "404": decodeError("RetentionGetRetentionDriversForProject404", RetentionGetRetentionDriversForProject404),
      "500": decodeError("RetentionGetRetentionDriversForProject500", RetentionGetRetentionDriversForProject500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ReplayInsightsListInsights": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replay-insights").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any, "status": options?.params?.["status"] as any, "sort": options?.params?.["sort"] as any, "direction": options?.params?.["direction"] as any, "limit": options?.params?.["limit"] as any, "offset": options?.params?.["offset"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ReplayInsightsListInsights200),
      "400": decodeError("ReplayInsightsListInsights400", ReplayInsightsListInsights400),
      "401": decodeError("ReplayInsightsListInsights401", ReplayInsightsListInsights401),
      "403": decodeError("ReplayInsightsListInsights403", ReplayInsightsListInsights403),
      "404": decodeError("ReplayInsightsListInsights404", ReplayInsightsListInsights404),
      "500": decodeError("ReplayInsightsListInsights500", ReplayInsightsListInsights500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ReplayInsightsGetInsight": (idOrSlug, insightId, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, insightId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replay-insights/" + __encodePathParam(insightId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any, "limit": options?.params?.["limit"] as any, "offset": options?.params?.["offset"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ReplayInsightsGetInsight200),
      "400": decodeError("ReplayInsightsGetInsight400", ReplayInsightsGetInsight400),
      "401": decodeError("ReplayInsightsGetInsight401", ReplayInsightsGetInsight401),
      "403": decodeError("ReplayInsightsGetInsight403", ReplayInsightsGetInsight403),
      "404": decodeError("ReplayInsightsGetInsight404", ReplayInsightsGetInsight404),
      "500": decodeError("ReplayInsightsGetInsight500", ReplayInsightsGetInsight500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ReplayInsightsMarkInsightViewed": (idOrSlug, insightId, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug, insightId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replay-insights/" + __encodePathParam(insightId) + "/viewed").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("ReplayInsightsMarkInsightViewed400", ReplayInsightsMarkInsightViewed400),
      "401": decodeError("ReplayInsightsMarkInsightViewed401", ReplayInsightsMarkInsightViewed401),
      "403": decodeError("ReplayInsightsMarkInsightViewed403", ReplayInsightsMarkInsightViewed403),
      "404": decodeError("ReplayInsightsMarkInsightViewed404", ReplayInsightsMarkInsightViewed404),
      "500": decodeError("ReplayInsightsMarkInsightViewed500", ReplayInsightsMarkInsightViewed500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ReplayInsightsUpdateInsightStatus": (idOrSlug, insightId, options) => __makePathRequest(HttpClientRequest.patch, [idOrSlug, insightId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replay-insights/" + __encodePathParam(insightId) + "/status").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ReplayInsightsUpdateInsightStatus200),
      "400": decodeError("ReplayInsightsUpdateInsightStatus400", ReplayInsightsUpdateInsightStatus400),
      "401": decodeError("ReplayInsightsUpdateInsightStatus401", ReplayInsightsUpdateInsightStatus401),
      "403": decodeError("ReplayInsightsUpdateInsightStatus403", ReplayInsightsUpdateInsightStatus403),
      "404": decodeError("ReplayInsightsUpdateInsightStatus404", ReplayInsightsUpdateInsightStatus404),
      "500": decodeError("ReplayInsightsUpdateInsightStatus500", ReplayInsightsUpdateInsightStatus500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ReplayInsightsMergeInsights": (idOrSlug, insightId, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug, insightId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replay-insights/" + __encodePathParam(insightId) + "/merge").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ReplayInsightsMergeInsights200),
      "400": decodeError("ReplayInsightsMergeInsights400", ReplayInsightsMergeInsights400),
      "401": decodeError("ReplayInsightsMergeInsights401", ReplayInsightsMergeInsights401),
      "403": decodeError("ReplayInsightsMergeInsights403", ReplayInsightsMergeInsights403),
      "404": decodeError("ReplayInsightsMergeInsights404", ReplayInsightsMergeInsights404),
      "500": decodeError("ReplayInsightsMergeInsights500", ReplayInsightsMergeInsights500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "ReplayInsightsSplitInsight": (idOrSlug, insightId, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug, insightId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replay-insights/" + __encodePathParam(insightId) + "/split").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ReplayInsightsSplitInsight200),
      "400": decodeError("ReplayInsightsSplitInsight400", ReplayInsightsSplitInsight400),
      "401": decodeError("ReplayInsightsSplitInsight401", ReplayInsightsSplitInsight401),
      "403": decodeError("ReplayInsightsSplitInsight403", ReplayInsightsSplitInsight403),
      "404": decodeError("ReplayInsightsSplitInsight404", ReplayInsightsSplitInsight404),
      "500": decodeError("ReplayInsightsSplitInsight500", ReplayInsightsSplitInsight500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SessionReplaysGetReplaySummary": (idOrSlug, sessionId, windowId, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, sessionId, windowId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replays/" + __encodePathParam(sessionId) + "/" + __encodePathParam(windowId) + "/summary").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysGetReplaySummary200),
      "400": decodeError("SessionReplaysGetReplaySummary400", SessionReplaysGetReplaySummary400),
      "401": decodeError("SessionReplaysGetReplaySummary401", SessionReplaysGetReplaySummary401),
      "403": decodeError("SessionReplaysGetReplaySummary403", SessionReplaysGetReplaySummary403),
      "404": decodeError("SessionReplaysGetReplaySummary404", SessionReplaysGetReplaySummary404),
      "500": decodeError("SessionReplaysGetReplaySummary500", SessionReplaysGetReplaySummary500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SessionReplaysSummarizeReplay": (idOrSlug, sessionId, windowId, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug, sessionId, windowId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replays/" + __encodePathParam(sessionId) + "/" + __encodePathParam(windowId) + "/summary").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("SessionReplaysSummarizeReplay400", SessionReplaysSummarizeReplay400),
      "401": decodeError("SessionReplaysSummarizeReplay401", SessionReplaysSummarizeReplay401),
      "403": decodeError("SessionReplaysSummarizeReplay403", SessionReplaysSummarizeReplay403),
      "404": decodeError("SessionReplaysSummarizeReplay404", SessionReplaysSummarizeReplay404),
      "500": decodeError("SessionReplaysSummarizeReplay500", SessionReplaysSummarizeReplay500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SessionReplaysGetReplaySummaryRules": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replays/summary-rules").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysGetReplaySummaryRules200),
      "400": decodeError("SessionReplaysGetReplaySummaryRules400", SessionReplaysGetReplaySummaryRules400),
      "401": decodeError("SessionReplaysGetReplaySummaryRules401", SessionReplaysGetReplaySummaryRules401),
      "403": decodeError("SessionReplaysGetReplaySummaryRules403", SessionReplaysGetReplaySummaryRules403),
      "404": decodeError("SessionReplaysGetReplaySummaryRules404", SessionReplaysGetReplaySummaryRules404),
      "500": decodeError("SessionReplaysGetReplaySummaryRules500", SessionReplaysGetReplaySummaryRules500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SessionReplaysSaveReplaySummaryRules": (idOrSlug, options) => __makePathRequest(HttpClientRequest.put, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replays/summary-rules").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysSaveReplaySummaryRules200),
      "400": decodeError("SessionReplaysSaveReplaySummaryRules400", SessionReplaysSaveReplaySummaryRules400),
      "401": decodeError("SessionReplaysSaveReplaySummaryRules401", SessionReplaysSaveReplaySummaryRules401),
      "403": decodeError("SessionReplaysSaveReplaySummaryRules403", SessionReplaysSaveReplaySummaryRules403),
      "404": decodeError("SessionReplaysSaveReplaySummaryRules404", SessionReplaysSaveReplaySummaryRules404),
      "500": decodeError("SessionReplaysSaveReplaySummaryRules500", SessionReplaysSaveReplaySummaryRules500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SessionReplaysPreviewReplaySummaryRules": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replays/summary-rules/preview").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysPreviewReplaySummaryRules200),
      "400": decodeError("SessionReplaysPreviewReplaySummaryRules400", SessionReplaysPreviewReplaySummaryRules400),
      "401": decodeError("SessionReplaysPreviewReplaySummaryRules401", SessionReplaysPreviewReplaySummaryRules401),
      "403": decodeError("SessionReplaysPreviewReplaySummaryRules403", SessionReplaysPreviewReplaySummaryRules403),
      "404": decodeError("SessionReplaysPreviewReplaySummaryRules404", SessionReplaysPreviewReplaySummaryRules404),
      "500": decodeError("SessionReplaysPreviewReplaySummaryRules500", SessionReplaysPreviewReplaySummaryRules500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SessionReplaysListReplays": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replays").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "sessionId": options?.params?.["sessionId"] as any, "sortBy": options?.params?.["sortBy"] as any, "cursorSortValue": options?.params?.["cursorSortValue"] as any, "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any, "pageSize": options?.params?.["pageSize"] as any, "cursorStartedAt": options?.params?.["cursorStartedAt"] as any, "cursorSessionId": options?.params?.["cursorSessionId"] as any, "cursorWindowId": options?.params?.["cursorWindowId"] as any, "collectionId": options?.params?.["collectionId"] as any, "collectionFilterConfig": options?.params?.["collectionFilterConfig"] as any, "listFilterConfig": options?.params?.["listFilterConfig"] as any, "userIds": options?.params?.["userIds"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysListReplays200),
      "400": decodeError("SessionReplaysListReplays400", SessionReplaysListReplays400),
      "401": decodeError("SessionReplaysListReplays401", SessionReplaysListReplays401),
      "403": decodeError("SessionReplaysListReplays403", SessionReplaysListReplays403),
      "404": decodeError("SessionReplaysListReplays404", SessionReplaysListReplays404),
      "500": decodeError("SessionReplaysListReplays500", SessionReplaysListReplays500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SessionReplaysGetReplayCount": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replays/count").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any, "collectionId": options?.params?.["collectionId"] as any, "collectionFilterConfig": options?.params?.["collectionFilterConfig"] as any, "listFilterConfig": options?.params?.["listFilterConfig"] as any, "userIds": options?.params?.["userIds"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysGetReplayCount200),
      "400": decodeError("SessionReplaysGetReplayCount400", SessionReplaysGetReplayCount400),
      "401": decodeError("SessionReplaysGetReplayCount401", SessionReplaysGetReplayCount401),
      "403": decodeError("SessionReplaysGetReplayCount403", SessionReplaysGetReplayCount403),
      "404": decodeError("SessionReplaysGetReplayCount404", SessionReplaysGetReplayCount404),
      "500": decodeError("SessionReplaysGetReplayCount500", SessionReplaysGetReplayCount500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SessionReplaysListReplayCollections": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replay-collections").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "includeCounts": options?.params?.["includeCounts"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysListReplayCollections200),
      "400": decodeError("SessionReplaysListReplayCollections400", SessionReplaysListReplayCollections400),
      "401": decodeError("SessionReplaysListReplayCollections401", SessionReplaysListReplayCollections401),
      "403": decodeError("SessionReplaysListReplayCollections403", SessionReplaysListReplayCollections403),
      "404": decodeError("SessionReplaysListReplayCollections404", SessionReplaysListReplayCollections404),
      "500": decodeError("SessionReplaysListReplayCollections500", SessionReplaysListReplayCollections500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SessionReplaysCreateReplayCollection": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replay-collections").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysCreateReplayCollection200),
      "400": decodeError("SessionReplaysCreateReplayCollection400", SessionReplaysCreateReplayCollection400),
      "401": decodeError("SessionReplaysCreateReplayCollection401", SessionReplaysCreateReplayCollection401),
      "403": decodeError("SessionReplaysCreateReplayCollection403", SessionReplaysCreateReplayCollection403),
      "404": decodeError("SessionReplaysCreateReplayCollection404", SessionReplaysCreateReplayCollection404),
      "500": decodeError("SessionReplaysCreateReplayCollection500", SessionReplaysCreateReplayCollection500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SessionReplaysDeleteReplayCollection": (idOrSlug, collectionId, options) => __makePathRequest(HttpClientRequest.delete, [idOrSlug, collectionId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replay-collections/" + __encodePathParam(collectionId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("SessionReplaysDeleteReplayCollection400", SessionReplaysDeleteReplayCollection400),
      "401": decodeError("SessionReplaysDeleteReplayCollection401", SessionReplaysDeleteReplayCollection401),
      "403": decodeError("SessionReplaysDeleteReplayCollection403", SessionReplaysDeleteReplayCollection403),
      "404": decodeError("SessionReplaysDeleteReplayCollection404", SessionReplaysDeleteReplayCollection404),
      "500": decodeError("SessionReplaysDeleteReplayCollection500", SessionReplaysDeleteReplayCollection500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SessionReplaysUpdateReplayCollection": (idOrSlug, collectionId, options) => __makePathRequest(HttpClientRequest.patch, [idOrSlug, collectionId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replay-collections/" + __encodePathParam(collectionId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysUpdateReplayCollection200),
      "400": decodeError("SessionReplaysUpdateReplayCollection400", SessionReplaysUpdateReplayCollection400),
      "401": decodeError("SessionReplaysUpdateReplayCollection401", SessionReplaysUpdateReplayCollection401),
      "403": decodeError("SessionReplaysUpdateReplayCollection403", SessionReplaysUpdateReplayCollection403),
      "404": decodeError("SessionReplaysUpdateReplayCollection404", SessionReplaysUpdateReplayCollection404),
      "500": decodeError("SessionReplaysUpdateReplayCollection500", SessionReplaysUpdateReplayCollection500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SessionReplaysListReplayCollectionAssignments": (idOrSlug, sessionId, windowId, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, sessionId, windowId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replays/" + __encodePathParam(sessionId) + "/" + __encodePathParam(windowId) + "/collection-assignments").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysListReplayCollectionAssignments200),
      "400": decodeError("SessionReplaysListReplayCollectionAssignments400", SessionReplaysListReplayCollectionAssignments400),
      "401": decodeError("SessionReplaysListReplayCollectionAssignments401", SessionReplaysListReplayCollectionAssignments401),
      "403": decodeError("SessionReplaysListReplayCollectionAssignments403", SessionReplaysListReplayCollectionAssignments403),
      "404": decodeError("SessionReplaysListReplayCollectionAssignments404", SessionReplaysListReplayCollectionAssignments404),
      "500": decodeError("SessionReplaysListReplayCollectionAssignments500", SessionReplaysListReplayCollectionAssignments500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SessionReplaysSetReplayCollectionAssignments": (idOrSlug, sessionId, windowId, options) => __makePathRequest(HttpClientRequest.put, [idOrSlug, sessionId, windowId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replays/" + __encodePathParam(sessionId) + "/" + __encodePathParam(windowId) + "/collection-assignments").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysSetReplayCollectionAssignments200),
      "400": decodeError("SessionReplaysSetReplayCollectionAssignments400", SessionReplaysSetReplayCollectionAssignments400),
      "401": decodeError("SessionReplaysSetReplayCollectionAssignments401", SessionReplaysSetReplayCollectionAssignments401),
      "403": decodeError("SessionReplaysSetReplayCollectionAssignments403", SessionReplaysSetReplayCollectionAssignments403),
      "404": decodeError("SessionReplaysSetReplayCollectionAssignments404", SessionReplaysSetReplayCollectionAssignments404),
      "500": decodeError("SessionReplaysSetReplayCollectionAssignments500", SessionReplaysSetReplayCollectionAssignments500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SessionReplaysGetReplayEventsPage": (idOrSlug, sessionId, windowId, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, sessionId, windowId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replays/" + __encodePathParam(sessionId) + "/" + __encodePathParam(windowId) + "/events").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "cursorId": options?.params?.["cursorId"] as any, "cursorSequence": options?.params?.["cursorSequence"] as any, "cursorFirstEventTimestampMs": options?.params?.["cursorFirstEventTimestampMs"] as any, "cursorCreatedAt": options?.params?.["cursorCreatedAt"] as any, "limitChunks": options?.params?.["limitChunks"] as any, "pageBytes": options?.params?.["pageBytes"] as any, "seekCoverageRelativeMs": options?.params?.["seekCoverageRelativeMs"] as any, "seekRelativeMs": options?.params?.["seekRelativeMs"] as any, "seekAtMs": options?.params?.["seekAtMs"] as any, "includeRouteSpans": options?.params?.["includeRouteSpans"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysGetReplayEventsPage200),
      "400": decodeError("SessionReplaysGetReplayEventsPage400", SessionReplaysGetReplayEventsPage400),
      "401": decodeError("SessionReplaysGetReplayEventsPage401", SessionReplaysGetReplayEventsPage401),
      "403": decodeError("SessionReplaysGetReplayEventsPage403", SessionReplaysGetReplayEventsPage403),
      "404": decodeError("SessionReplaysGetReplayEventsPage404", SessionReplaysGetReplayEventsPage404),
      "500": decodeError("SessionReplaysGetReplayEventsPage500", SessionReplaysGetReplayEventsPage500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SessionReplaysGetSessionErrors": (idOrSlug, sessionId, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, sessionId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replays/" + __encodePathParam(sessionId) + "/errors").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysGetSessionErrors200),
      "400": decodeError("SessionReplaysGetSessionErrors400", SessionReplaysGetSessionErrors400),
      "401": decodeError("SessionReplaysGetSessionErrors401", SessionReplaysGetSessionErrors401),
      "403": decodeError("SessionReplaysGetSessionErrors403", SessionReplaysGetSessionErrors403),
      "404": decodeError("SessionReplaysGetSessionErrors404", SessionReplaysGetSessionErrors404),
      "500": decodeError("SessionReplaysGetSessionErrors500", SessionReplaysGetSessionErrors500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SessionReplaysGetSessionVitals": (idOrSlug, sessionId, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, sessionId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replays/" + __encodePathParam(sessionId) + "/vitals").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysGetSessionVitals200),
      "400": decodeError("SessionReplaysGetSessionVitals400", SessionReplaysGetSessionVitals400),
      "401": decodeError("SessionReplaysGetSessionVitals401", SessionReplaysGetSessionVitals401),
      "403": decodeError("SessionReplaysGetSessionVitals403", SessionReplaysGetSessionVitals403),
      "404": decodeError("SessionReplaysGetSessionVitals404", SessionReplaysGetSessionVitals404),
      "500": decodeError("SessionReplaysGetSessionVitals500", SessionReplaysGetSessionVitals500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SessionReplaysGetSessionCustomEvents": (idOrSlug, sessionId, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, sessionId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replays/" + __encodePathParam(sessionId) + "/custom-events").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SessionReplaysGetSessionCustomEvents200),
      "400": decodeError("SessionReplaysGetSessionCustomEvents400", SessionReplaysGetSessionCustomEvents400),
      "401": decodeError("SessionReplaysGetSessionCustomEvents401", SessionReplaysGetSessionCustomEvents401),
      "403": decodeError("SessionReplaysGetSessionCustomEvents403", SessionReplaysGetSessionCustomEvents403),
      "404": decodeError("SessionReplaysGetSessionCustomEvents404", SessionReplaysGetSessionCustomEvents404),
      "500": decodeError("SessionReplaysGetSessionCustomEvents500", SessionReplaysGetSessionCustomEvents500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SessionReplaysDeleteReplay": (idOrSlug, sessionId, windowId, options) => __makePathRequest(HttpClientRequest.delete, [idOrSlug, sessionId, windowId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replays/" + __encodePathParam(sessionId) + "/" + __encodePathParam(windowId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("SessionReplaysDeleteReplay400", SessionReplaysDeleteReplay400),
      "401": decodeError("SessionReplaysDeleteReplay401", SessionReplaysDeleteReplay401),
      "403": decodeError("SessionReplaysDeleteReplay403", SessionReplaysDeleteReplay403),
      "404": decodeError("SessionReplaysDeleteReplay404", SessionReplaysDeleteReplay404),
      "500": decodeError("SessionReplaysDeleteReplay500", SessionReplaysDeleteReplay500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SessionReplaysDeleteAllReplays": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replays/wipe").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("SessionReplaysDeleteAllReplays400", SessionReplaysDeleteAllReplays400),
      "401": decodeError("SessionReplaysDeleteAllReplays401", SessionReplaysDeleteAllReplays401),
      "403": decodeError("SessionReplaysDeleteAllReplays403", SessionReplaysDeleteAllReplays403),
      "404": decodeError("SessionReplaysDeleteAllReplays404", SessionReplaysDeleteAllReplays404),
      "500": decodeError("SessionReplaysDeleteAllReplays500", SessionReplaysDeleteAllReplays500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SessionReplaysMarkReplayViewed": (idOrSlug, sessionId, windowId, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug, sessionId, windowId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/replays/" + __encodePathParam(sessionId) + "/" + __encodePathParam(windowId) + "/viewed").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("SessionReplaysMarkReplayViewed400", SessionReplaysMarkReplayViewed400),
      "401": decodeError("SessionReplaysMarkReplayViewed401", SessionReplaysMarkReplayViewed401),
      "403": decodeError("SessionReplaysMarkReplayViewed403", SessionReplaysMarkReplayViewed403),
      "404": decodeError("SessionReplaysMarkReplayViewed404", SessionReplaysMarkReplayViewed404),
      "500": decodeError("SessionReplaysMarkReplayViewed500", SessionReplaysMarkReplayViewed500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SourceMapsGetUploadedSourceMaps": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/source-maps").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SourceMapsGetUploadedSourceMaps200),
      "401": decodeError("SourceMapsGetUploadedSourceMaps401", SourceMapsGetUploadedSourceMaps401),
      "403": decodeError("SourceMapsGetUploadedSourceMaps403", SourceMapsGetUploadedSourceMaps403),
      "404": decodeError("SourceMapsGetUploadedSourceMaps404", SourceMapsGetUploadedSourceMaps404),
      "500": decodeError("SourceMapsGetUploadedSourceMaps500", SourceMapsGetUploadedSourceMaps500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SourceMapsDeleteUploadedSourceMap": (idOrSlug, s3Key, options) => __makePathRequest(HttpClientRequest.delete, [idOrSlug, s3Key], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/source-maps/" + __encodePathParam(s3Key) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("SourceMapsDeleteUploadedSourceMap401", SourceMapsDeleteUploadedSourceMap401),
      "403": decodeError("SourceMapsDeleteUploadedSourceMap403", SourceMapsDeleteUploadedSourceMap403),
      "404": decodeError("SourceMapsDeleteUploadedSourceMap404", SourceMapsDeleteUploadedSourceMap404),
      "500": decodeError("SourceMapsDeleteUploadedSourceMap500", SourceMapsDeleteUploadedSourceMap500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SourceMapsWipeUploadedSourceMaps": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/source-maps/wipe").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("SourceMapsWipeUploadedSourceMaps401", SourceMapsWipeUploadedSourceMaps401),
      "403": decodeError("SourceMapsWipeUploadedSourceMaps403", SourceMapsWipeUploadedSourceMaps403),
      "404": decodeError("SourceMapsWipeUploadedSourceMaps404", SourceMapsWipeUploadedSourceMaps404),
      "500": decodeError("SourceMapsWipeUploadedSourceMaps500", SourceMapsWipeUploadedSourceMaps500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SourceMapsCleanupUploadedSourceMaps": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/source-maps/cleanup").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SourceMapsCleanupUploadedSourceMaps200),
      "401": decodeError("SourceMapsCleanupUploadedSourceMaps401", SourceMapsCleanupUploadedSourceMaps401),
      "403": decodeError("SourceMapsCleanupUploadedSourceMaps403", SourceMapsCleanupUploadedSourceMaps403),
      "404": decodeError("SourceMapsCleanupUploadedSourceMaps404", SourceMapsCleanupUploadedSourceMaps404),
      "500": decodeError("SourceMapsCleanupUploadedSourceMaps500", SourceMapsCleanupUploadedSourceMaps500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SourceMapsGetSourceMapApiKey": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/source-map-api-key").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SourceMapsGetSourceMapApiKey200),
      "401": decodeError("SourceMapsGetSourceMapApiKey401", SourceMapsGetSourceMapApiKey401),
      "403": decodeError("SourceMapsGetSourceMapApiKey403", SourceMapsGetSourceMapApiKey403),
      "404": decodeError("SourceMapsGetSourceMapApiKey404", SourceMapsGetSourceMapApiKey404),
      "500": decodeError("SourceMapsGetSourceMapApiKey500", SourceMapsGetSourceMapApiKey500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SourceMapsCreateSourceMapApiKey": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/source-map-api-key").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SourceMapsCreateSourceMapApiKey200),
      "401": decodeError("SourceMapsCreateSourceMapApiKey401", SourceMapsCreateSourceMapApiKey401),
      "403": decodeError("SourceMapsCreateSourceMapApiKey403", SourceMapsCreateSourceMapApiKey403),
      "404": decodeError("SourceMapsCreateSourceMapApiKey404", SourceMapsCreateSourceMapApiKey404),
      "500": decodeError("SourceMapsCreateSourceMapApiKey500", SourceMapsCreateSourceMapApiKey500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "SourceMapsDeleteSourceMapApiKey": (idOrSlug, options) => __makePathRequest(HttpClientRequest.delete, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/source-map-api-key").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SourceMapsDeleteSourceMapApiKey200),
      "401": decodeError("SourceMapsDeleteSourceMapApiKey401", SourceMapsDeleteSourceMapApiKey401),
      "403": decodeError("SourceMapsDeleteSourceMapApiKey403", SourceMapsDeleteSourceMapApiKey403),
      "404": decodeError("SourceMapsDeleteSourceMapApiKey404", SourceMapsDeleteSourceMapApiKey404),
      "500": decodeError("SourceMapsDeleteSourceMapApiKey500", SourceMapsDeleteSourceMapApiKey500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "UsersGetUserVitals": (idOrSlug, userKey, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, userKey], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/users/key/" + __encodePathParam(userKey) + "/vitals").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UsersGetUserVitals200),
      "400": decodeError("UsersGetUserVitals400", UsersGetUserVitals400),
      "401": decodeError("UsersGetUserVitals401", UsersGetUserVitals401),
      "403": decodeError("UsersGetUserVitals403", UsersGetUserVitals403),
      "404": decodeError("UsersGetUserVitals404", UsersGetUserVitals404),
      "500": decodeError("UsersGetUserVitals500", UsersGetUserVitals500),
      "503": decodeError("UsersGetUserVitals503", UsersGetUserVitals503),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "UsersGetUserSessionsPage": (idOrSlug, userKey, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, userKey], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/users/key/" + __encodePathParam(userKey) + "/sessions").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "limit": options?.params?.["limit"] as any, "cursor": options?.params?.["cursor"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UsersGetUserSessionsPage200),
      "400": decodeError("UsersGetUserSessionsPage400", UsersGetUserSessionsPage400),
      "401": decodeError("UsersGetUserSessionsPage401", UsersGetUserSessionsPage401),
      "403": decodeError("UsersGetUserSessionsPage403", UsersGetUserSessionsPage403),
      "404": decodeError("UsersGetUserSessionsPage404", UsersGetUserSessionsPage404),
      "500": decodeError("UsersGetUserSessionsPage500", UsersGetUserSessionsPage500),
      "503": decodeError("UsersGetUserSessionsPage503", UsersGetUserSessionsPage503),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "UsersGetUserErrorsPage": (idOrSlug, userKey, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, userKey], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/users/key/" + __encodePathParam(userKey) + "/errors").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "limit": options?.params?.["limit"] as any, "cursor": options?.params?.["cursor"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UsersGetUserErrorsPage200),
      "400": decodeError("UsersGetUserErrorsPage400", UsersGetUserErrorsPage400),
      "401": decodeError("UsersGetUserErrorsPage401", UsersGetUserErrorsPage401),
      "403": decodeError("UsersGetUserErrorsPage403", UsersGetUserErrorsPage403),
      "404": decodeError("UsersGetUserErrorsPage404", UsersGetUserErrorsPage404),
      "500": decodeError("UsersGetUserErrorsPage500", UsersGetUserErrorsPage500),
      "503": decodeError("UsersGetUserErrorsPage503", UsersGetUserErrorsPage503),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "UsersGetUserTimelinePage": (idOrSlug, userKey, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, userKey], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/users/key/" + __encodePathParam(userKey) + "/timeline").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "limit": options?.params?.["limit"] as any, "cursor": options?.params?.["cursor"] as any, "signals": options?.params?.["signals"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UsersGetUserTimelinePage200),
      "400": decodeError("UsersGetUserTimelinePage400", UsersGetUserTimelinePage400),
      "401": decodeError("UsersGetUserTimelinePage401", UsersGetUserTimelinePage401),
      "403": decodeError("UsersGetUserTimelinePage403", UsersGetUserTimelinePage403),
      "404": decodeError("UsersGetUserTimelinePage404", UsersGetUserTimelinePage404),
      "500": decodeError("UsersGetUserTimelinePage500", UsersGetUserTimelinePage500),
      "503": decodeError("UsersGetUserTimelinePage503", UsersGetUserTimelinePage503),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "UsersGetUserActivityByKey": (idOrSlug, userKey, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, userKey], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/users/key/" + __encodePathParam(userKey) + "/activity").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UsersGetUserActivityByKey200),
      "400": decodeError("UsersGetUserActivityByKey400", UsersGetUserActivityByKey400),
      "401": decodeError("UsersGetUserActivityByKey401", UsersGetUserActivityByKey401),
      "403": decodeError("UsersGetUserActivityByKey403", UsersGetUserActivityByKey403),
      "404": decodeError("UsersGetUserActivityByKey404", UsersGetUserActivityByKey404),
      "500": decodeError("UsersGetUserActivityByKey500", UsersGetUserActivityByKey500),
      "503": decodeError("UsersGetUserActivityByKey503", UsersGetUserActivityByKey503),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "UsersGetUserDataOperation": (idOrSlug, operationId, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, operationId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/users/operations/" + __encodePathParam(operationId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UsersGetUserDataOperation200),
      "400": decodeError("UsersGetUserDataOperation400", UsersGetUserDataOperation400),
      "401": decodeError("UsersGetUserDataOperation401", UsersGetUserDataOperation401),
      "403": decodeError("UsersGetUserDataOperation403", UsersGetUserDataOperation403),
      "404": decodeError("UsersGetUserDataOperation404", UsersGetUserDataOperation404),
      "500": decodeError("UsersGetUserDataOperation500", UsersGetUserDataOperation500),
      "503": decodeError("UsersGetUserDataOperation503", UsersGetUserDataOperation503),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "UsersGetUsersDailyActive": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/users/daily-active").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "cohort": options?.params?.["cohort"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UsersGetUsersDailyActive200),
      "400": decodeError("UsersGetUsersDailyActive400", UsersGetUsersDailyActive400),
      "401": decodeError("UsersGetUsersDailyActive401", UsersGetUsersDailyActive401),
      "403": decodeError("UsersGetUsersDailyActive403", UsersGetUsersDailyActive403),
      "404": decodeError("UsersGetUsersDailyActive404", UsersGetUsersDailyActive404),
      "500": decodeError("UsersGetUsersDailyActive500", UsersGetUsersDailyActive500),
      "503": decodeError("UsersGetUsersDailyActive503", UsersGetUsersDailyActive503),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "UsersSearchUsersForProject": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/users").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any, "query": options?.params?.["query"] as any, "limit": options?.params?.["limit"] as any, "cursor": options?.params?.["cursor"] as any, "cohort": options?.params?.["cohort"] as any, "sort": options?.params?.["sort"] as any, "direction": options?.params?.["direction"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UsersSearchUsersForProject200),
      "400": decodeError("UsersSearchUsersForProject400", UsersSearchUsersForProject400),
      "401": decodeError("UsersSearchUsersForProject401", UsersSearchUsersForProject401),
      "403": decodeError("UsersSearchUsersForProject403", UsersSearchUsersForProject403),
      "404": decodeError("UsersSearchUsersForProject404", UsersSearchUsersForProject404),
      "500": decodeError("UsersSearchUsersForProject500", UsersSearchUsersForProject500),
      "503": decodeError("UsersSearchUsersForProject503", UsersSearchUsersForProject503),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "UsersGetUsersActiveTimeseries": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/users/active").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any, "cohort": options?.params?.["cohort"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UsersGetUsersActiveTimeseries200),
      "400": decodeError("UsersGetUsersActiveTimeseries400", UsersGetUsersActiveTimeseries400),
      "401": decodeError("UsersGetUsersActiveTimeseries401", UsersGetUsersActiveTimeseries401),
      "403": decodeError("UsersGetUsersActiveTimeseries403", UsersGetUsersActiveTimeseries403),
      "404": decodeError("UsersGetUsersActiveTimeseries404", UsersGetUsersActiveTimeseries404),
      "500": decodeError("UsersGetUsersActiveTimeseries500", UsersGetUsersActiveTimeseries500),
      "503": decodeError("UsersGetUsersActiveTimeseries503", UsersGetUsersActiveTimeseries503),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "UsersGetUsersBreakdown": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/users/breakdown").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UsersGetUsersBreakdown200),
      "400": decodeError("UsersGetUsersBreakdown400", UsersGetUsersBreakdown400),
      "401": decodeError("UsersGetUsersBreakdown401", UsersGetUsersBreakdown401),
      "403": decodeError("UsersGetUsersBreakdown403", UsersGetUsersBreakdown403),
      "404": decodeError("UsersGetUsersBreakdown404", UsersGetUsersBreakdown404),
      "500": decodeError("UsersGetUsersBreakdown500", UsersGetUsersBreakdown500),
      "503": decodeError("UsersGetUsersBreakdown503", UsersGetUsersBreakdown503),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "UsersGetUserByKey": (idOrSlug, userKey, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug, userKey], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/users/key/" + __encodePathParam(userKey) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UsersGetUserByKey200),
      "400": decodeError("UsersGetUserByKey400", UsersGetUserByKey400),
      "401": decodeError("UsersGetUserByKey401", UsersGetUserByKey401),
      "403": decodeError("UsersGetUserByKey403", UsersGetUserByKey403),
      "404": decodeError("UsersGetUserByKey404", UsersGetUserByKey404),
      "500": decodeError("UsersGetUserByKey500", UsersGetUserByKey500),
      "503": decodeError("UsersGetUserByKey503", UsersGetUserByKey503),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "UsersDeleteUserData": (idOrSlug, userKey, options) => __makePathRequest(HttpClientRequest.delete, [idOrSlug, userKey], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/users/key/" + __encodePathParam(userKey) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UsersDeleteUserData200),
      "400": decodeError("UsersDeleteUserData400", UsersDeleteUserData400),
      "401": decodeError("UsersDeleteUserData401", UsersDeleteUserData401),
      "403": decodeError("UsersDeleteUserData403", UsersDeleteUserData403),
      "404": decodeError("UsersDeleteUserData404", UsersDeleteUserData404),
      "500": decodeError("UsersDeleteUserData500", UsersDeleteUserData500),
      "503": decodeError("UsersDeleteUserData503", UsersDeleteUserData503),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "UsersRemoveUserIdentification": (idOrSlug, userKey, options) => __makePathRequest(HttpClientRequest.delete, [idOrSlug, userKey], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/users/key/" + __encodePathParam(userKey) + "/identification").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(UsersRemoveUserIdentification200),
      "400": decodeError("UsersRemoveUserIdentification400", UsersRemoveUserIdentification400),
      "401": decodeError("UsersRemoveUserIdentification401", UsersRemoveUserIdentification401),
      "403": decodeError("UsersRemoveUserIdentification403", UsersRemoveUserIdentification403),
      "404": decodeError("UsersRemoveUserIdentification404", UsersRemoveUserIdentification404),
      "500": decodeError("UsersRemoveUserIdentification500", UsersRemoveUserIdentification500),
      "503": decodeError("UsersRemoveUserIdentification503", UsersRemoveUserIdentification503),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "WebVitalsInterpretVitalsFilter": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/vitals/interpret-filter").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(WebVitalsInterpretVitalsFilter200),
      "401": decodeError("WebVitalsInterpretVitalsFilter401", WebVitalsInterpretVitalsFilter401),
      "403": decodeError("WebVitalsInterpretVitalsFilter403", WebVitalsInterpretVitalsFilter403),
      "404": decodeError("WebVitalsInterpretVitalsFilter404", WebVitalsInterpretVitalsFilter404),
      "500": decodeError("WebVitalsInterpretVitalsFilter500", WebVitalsInterpretVitalsFilter500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "WebVitalsGetExperienceDiagnostics": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/vitals/experience-diagnostics").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "metric": options.params["metric"] as any, "positiveOnly": options.params["positiveOnly"] as any, "from": options.params["from"] as any, "to": options.params["to"] as any, "device": options.params["device"] as any, "browser": options.params["browser"] as any, "os": options.params["os"] as any, "country": options.params["country"] as any, "route": options.params["route"] as any }),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(WebVitalsGetExperienceDiagnostics200),
      "401": decodeError("WebVitalsGetExperienceDiagnostics401", WebVitalsGetExperienceDiagnostics401),
      "403": decodeError("WebVitalsGetExperienceDiagnostics403", WebVitalsGetExperienceDiagnostics403),
      "404": decodeError("WebVitalsGetExperienceDiagnostics404", WebVitalsGetExperienceDiagnostics404),
      "500": decodeError("WebVitalsGetExperienceDiagnostics500", WebVitalsGetExperienceDiagnostics500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "WebVitalsGetTtfbDiagnostics": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/vitals/ttfb-diagnostics").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "metric": options?.params?.["metric"] as any, "positiveOnly": options?.params?.["positiveOnly"] as any, "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any, "device": options?.params?.["device"] as any, "browser": options?.params?.["browser"] as any, "os": options?.params?.["os"] as any, "country": options?.params?.["country"] as any, "route": options?.params?.["route"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(WebVitalsGetTtfbDiagnostics200),
      "401": decodeError("WebVitalsGetTtfbDiagnostics401", WebVitalsGetTtfbDiagnostics401),
      "403": decodeError("WebVitalsGetTtfbDiagnostics403", WebVitalsGetTtfbDiagnostics403),
      "404": decodeError("WebVitalsGetTtfbDiagnostics404", WebVitalsGetTtfbDiagnostics404),
      "500": decodeError("WebVitalsGetTtfbDiagnostics500", WebVitalsGetTtfbDiagnostics500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "WebVitalsGetWebVitalsForProject": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/vitals").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "metric": options?.params?.["metric"] as any, "positiveOnly": options?.params?.["positiveOnly"] as any, "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any, "device": options?.params?.["device"] as any, "browser": options?.params?.["browser"] as any, "os": options?.params?.["os"] as any, "country": options?.params?.["country"] as any, "route": options?.params?.["route"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(WebVitalsGetWebVitalsForProject200),
      "401": decodeError("WebVitalsGetWebVitalsForProject401", WebVitalsGetWebVitalsForProject401),
      "403": decodeError("WebVitalsGetWebVitalsForProject403", WebVitalsGetWebVitalsForProject403),
      "404": decodeError("WebVitalsGetWebVitalsForProject404", WebVitalsGetWebVitalsForProject404),
      "500": decodeError("WebVitalsGetWebVitalsForProject500", WebVitalsGetWebVitalsForProject500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "WebVitalsGetBuildDeploymentsForProject": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/vitals/build-deployments").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "metric": options?.params?.["metric"] as any, "positiveOnly": options?.params?.["positiveOnly"] as any, "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any, "device": options?.params?.["device"] as any, "browser": options?.params?.["browser"] as any, "os": options?.params?.["os"] as any, "country": options?.params?.["country"] as any, "route": options?.params?.["route"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(WebVitalsGetBuildDeploymentsForProject200),
      "401": decodeError("WebVitalsGetBuildDeploymentsForProject401", WebVitalsGetBuildDeploymentsForProject401),
      "403": decodeError("WebVitalsGetBuildDeploymentsForProject403", WebVitalsGetBuildDeploymentsForProject403),
      "404": decodeError("WebVitalsGetBuildDeploymentsForProject404", WebVitalsGetBuildDeploymentsForProject404),
      "500": decodeError("WebVitalsGetBuildDeploymentsForProject500", WebVitalsGetBuildDeploymentsForProject500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "WebVitalsGetLayoutShiftActivity": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/vitals/cls-activity").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "metric": options?.params?.["metric"] as any, "positiveOnly": options?.params?.["positiveOnly"] as any, "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any, "device": options?.params?.["device"] as any, "browser": options?.params?.["browser"] as any, "os": options?.params?.["os"] as any, "country": options?.params?.["country"] as any, "route": options?.params?.["route"] as any, "bucketMs": options?.params?.["bucketMs"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(WebVitalsGetLayoutShiftActivity200),
      "401": decodeError("WebVitalsGetLayoutShiftActivity401", WebVitalsGetLayoutShiftActivity401),
      "403": decodeError("WebVitalsGetLayoutShiftActivity403", WebVitalsGetLayoutShiftActivity403),
      "404": decodeError("WebVitalsGetLayoutShiftActivity404", WebVitalsGetLayoutShiftActivity404),
      "500": decodeError("WebVitalsGetLayoutShiftActivity500", WebVitalsGetLayoutShiftActivity500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "WebVitalsGetWebVitalsTrends": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/vitals/trends").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "metric": options?.params?.["metric"] as any, "positiveOnly": options?.params?.["positiveOnly"] as any, "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any, "device": options?.params?.["device"] as any, "browser": options?.params?.["browser"] as any, "os": options?.params?.["os"] as any, "country": options?.params?.["country"] as any, "route": options?.params?.["route"] as any, "bucketMs": options?.params?.["bucketMs"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(WebVitalsGetWebVitalsTrends200),
      "401": decodeError("WebVitalsGetWebVitalsTrends401", WebVitalsGetWebVitalsTrends401),
      "403": decodeError("WebVitalsGetWebVitalsTrends403", WebVitalsGetWebVitalsTrends403),
      "404": decodeError("WebVitalsGetWebVitalsTrends404", WebVitalsGetWebVitalsTrends404),
      "500": decodeError("WebVitalsGetWebVitalsTrends500", WebVitalsGetWebVitalsTrends500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "WebVitalsGetWebVitalsSummary": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/vitals/summary").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "metric": options?.params?.["metric"] as any, "positiveOnly": options?.params?.["positiveOnly"] as any, "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any, "device": options?.params?.["device"] as any, "browser": options?.params?.["browser"] as any, "os": options?.params?.["os"] as any, "country": options?.params?.["country"] as any, "route": options?.params?.["route"] as any, "includeBreakdowns": options?.params?.["includeBreakdowns"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(WebVitalsGetWebVitalsSummary200),
      "401": decodeError("WebVitalsGetWebVitalsSummary401", WebVitalsGetWebVitalsSummary401),
      "403": decodeError("WebVitalsGetWebVitalsSummary403", WebVitalsGetWebVitalsSummary403),
      "404": decodeError("WebVitalsGetWebVitalsSummary404", WebVitalsGetWebVitalsSummary404),
      "500": decodeError("WebVitalsGetWebVitalsSummary500", WebVitalsGetWebVitalsSummary500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "IntegrationsListIntegrationConnections": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/integrations").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(IntegrationsListIntegrationConnections200),
      "400": decodeError("IntegrationsListIntegrationConnections400", IntegrationsListIntegrationConnections400),
      "401": decodeError("IntegrationsListIntegrationConnections401", IntegrationsListIntegrationConnections401),
      "403": decodeError("IntegrationsListIntegrationConnections403", IntegrationsListIntegrationConnections403),
      "404": decodeError("IntegrationsListIntegrationConnections404", IntegrationsListIntegrationConnections404),
      "500": decodeError("IntegrationsListIntegrationConnections500", IntegrationsListIntegrationConnections500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "IntegrationsSaveIntegrationCredentials": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/integrations").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(IntegrationsSaveIntegrationCredentials200),
      "400": decodeError("IntegrationsSaveIntegrationCredentials400", IntegrationsSaveIntegrationCredentials400),
      "401": decodeError("IntegrationsSaveIntegrationCredentials401", IntegrationsSaveIntegrationCredentials401),
      "403": decodeError("IntegrationsSaveIntegrationCredentials403", IntegrationsSaveIntegrationCredentials403),
      "404": decodeError("IntegrationsSaveIntegrationCredentials404", IntegrationsSaveIntegrationCredentials404),
      "500": decodeError("IntegrationsSaveIntegrationCredentials500", IntegrationsSaveIntegrationCredentials500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "IntegrationsDisconnectIntegration": (idOrSlug, integrationId, options) => __makePathRequest(HttpClientRequest.delete, [idOrSlug, integrationId], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/integrations/" + __encodePathParam(integrationId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("IntegrationsDisconnectIntegration400", IntegrationsDisconnectIntegration400),
      "401": decodeError("IntegrationsDisconnectIntegration401", IntegrationsDisconnectIntegration401),
      "403": decodeError("IntegrationsDisconnectIntegration403", IntegrationsDisconnectIntegration403),
      "404": decodeError("IntegrationsDisconnectIntegration404", IntegrationsDisconnectIntegration404),
      "500": decodeError("IntegrationsDisconnectIntegration500", IntegrationsDisconnectIntegration500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "CodeContextSuggestCodeContext": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/code-context/suggestions").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CodeContextSuggestCodeContext200),
      "401": decodeError("CodeContextSuggestCodeContext401", CodeContextSuggestCodeContext401),
      "403": decodeError("CodeContextSuggestCodeContext403", CodeContextSuggestCodeContext403),
      "404": decodeError("CodeContextSuggestCodeContext404", CodeContextSuggestCodeContext404),
      "422": decodeError("CodeContextSuggestCodeContext422", CodeContextSuggestCodeContext422),
      "500": decodeError("CodeContextSuggestCodeContext500", CodeContextSuggestCodeContext500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "CodeContextGetCodeContextFile": (idOrSlug, options) => __makePathRequest(HttpClientRequest.post, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/code-context/file").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CodeContextGetCodeContextFile200),
      "401": decodeError("CodeContextGetCodeContextFile401", CodeContextGetCodeContextFile401),
      "403": decodeError("CodeContextGetCodeContextFile403", CodeContextGetCodeContextFile403),
      "404": decodeError("CodeContextGetCodeContextFile404", CodeContextGetCodeContextFile404),
      "422": decodeError("CodeContextGetCodeContextFile422", CodeContextGetCodeContextFile422),
      "500": decodeError("CodeContextGetCodeContextFile500", CodeContextGetCodeContextFile500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "CodeContextSearchCodeContextRepositories": (idOrSlug, options) => __makePathRequest(HttpClientRequest.get, [idOrSlug], () => "/v0/projects/" + __encodePathParam(idOrSlug) + "/code-context/repositories").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "mode": options.params["mode"] as any, "provider": options.params["provider"] as any, "codebergApiUrl": options.params["codebergApiUrl"] as any, "query": options.params["query"] as any }),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CodeContextSearchCodeContextRepositories200),
      "401": decodeError("CodeContextSearchCodeContextRepositories401", CodeContextSearchCodeContextRepositories401),
      "403": decodeError("CodeContextSearchCodeContextRepositories403", CodeContextSearchCodeContextRepositories403),
      "404": decodeError("CodeContextSearchCodeContextRepositories404", CodeContextSearchCodeContextRepositories404),
      "422": decodeError("CodeContextSearchCodeContextRepositories422", CodeContextSearchCodeContextRepositories422),
      "500": decodeError("CodeContextSearchCodeContextRepositories500", CodeContextSearchCodeContextRepositories500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "NotificationsListNotifications": (options) => HttpClientRequest.get("/v0/notifications").pipe(
      HttpClientRequest.setUrlParams({ "limit": options?.params?.["limit"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(NotificationsListNotifications200),
      "401": decodeError("NotificationsListNotifications401", NotificationsListNotifications401),
      "403": decodeError("NotificationsListNotifications403", NotificationsListNotifications403),
      "404": decodeError("NotificationsListNotifications404", NotificationsListNotifications404),
      "500": decodeError("NotificationsListNotifications500", NotificationsListNotifications500),
      orElse: unexpectedStatus
    }))
    ),
    "NotificationsGetUnreadNotificationCount": (options) => HttpClientRequest.get("/v0/notifications/unread-count").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(NotificationsGetUnreadNotificationCount200),
      "401": decodeError("NotificationsGetUnreadNotificationCount401", NotificationsGetUnreadNotificationCount401),
      "403": decodeError("NotificationsGetUnreadNotificationCount403", NotificationsGetUnreadNotificationCount403),
      "404": decodeError("NotificationsGetUnreadNotificationCount404", NotificationsGetUnreadNotificationCount404),
      "500": decodeError("NotificationsGetUnreadNotificationCount500", NotificationsGetUnreadNotificationCount500),
      orElse: unexpectedStatus
    }))
    ),
    "NotificationsMarkNotificationRead": (notificationId, options) => __makePathRequest(HttpClientRequest.post, [notificationId], () => "/v0/notifications/" + __encodePathParam(notificationId) + "/read").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("NotificationsMarkNotificationRead401", NotificationsMarkNotificationRead401),
      "403": decodeError("NotificationsMarkNotificationRead403", NotificationsMarkNotificationRead403),
      "404": decodeError("NotificationsMarkNotificationRead404", NotificationsMarkNotificationRead404),
      "500": decodeError("NotificationsMarkNotificationRead500", NotificationsMarkNotificationRead500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "NotificationsMarkNotificationUnread": (notificationId, options) => __makePathRequest(HttpClientRequest.post, [notificationId], () => "/v0/notifications/" + __encodePathParam(notificationId) + "/unread").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("NotificationsMarkNotificationUnread401", NotificationsMarkNotificationUnread401),
      "403": decodeError("NotificationsMarkNotificationUnread403", NotificationsMarkNotificationUnread403),
      "404": decodeError("NotificationsMarkNotificationUnread404", NotificationsMarkNotificationUnread404),
      "500": decodeError("NotificationsMarkNotificationUnread500", NotificationsMarkNotificationUnread500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "NotificationsMarkAllNotificationsRead": (options) => HttpClientRequest.post("/v0/notifications/read-all").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "401": decodeError("NotificationsMarkAllNotificationsRead401", NotificationsMarkAllNotificationsRead401),
      "403": decodeError("NotificationsMarkAllNotificationsRead403", NotificationsMarkAllNotificationsRead403),
      "404": decodeError("NotificationsMarkAllNotificationsRead404", NotificationsMarkAllNotificationsRead404),
      "500": decodeError("NotificationsMarkAllNotificationsRead500", NotificationsMarkAllNotificationsRead500),
      "204": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ),
    "NotificationsGetNotificationEmailPreferences": (options) => HttpClientRequest.get("/v0/notifications/email-preferences").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(NotificationsGetNotificationEmailPreferences200),
      "401": decodeError("NotificationsGetNotificationEmailPreferences401", NotificationsGetNotificationEmailPreferences401),
      "403": decodeError("NotificationsGetNotificationEmailPreferences403", NotificationsGetNotificationEmailPreferences403),
      "404": decodeError("NotificationsGetNotificationEmailPreferences404", NotificationsGetNotificationEmailPreferences404),
      "500": decodeError("NotificationsGetNotificationEmailPreferences500", NotificationsGetNotificationEmailPreferences500),
      orElse: unexpectedStatus
    }))
    ),
    "NotificationsUpdateNotificationEmailPreferences": (options) => HttpClientRequest.put("/v0/notifications/email-preferences").pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(NotificationsUpdateNotificationEmailPreferences200),
      "401": decodeError("NotificationsUpdateNotificationEmailPreferences401", NotificationsUpdateNotificationEmailPreferences401),
      "403": decodeError("NotificationsUpdateNotificationEmailPreferences403", NotificationsUpdateNotificationEmailPreferences403),
      "404": decodeError("NotificationsUpdateNotificationEmailPreferences404", NotificationsUpdateNotificationEmailPreferences404),
      "500": decodeError("NotificationsUpdateNotificationEmailPreferences500", NotificationsUpdateNotificationEmailPreferences500),
      orElse: unexpectedStatus
    }))
    )
  }
}

export interface Api {
  readonly httpClient: HttpClient.HttpClient
  readonly "AnomaliesGetAnomaliesForProject": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof AnomaliesGetAnomaliesForProjectParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof AnomaliesGetAnomaliesForProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"AnomaliesGetAnomaliesForProject401", typeof AnomaliesGetAnomaliesForProject401.Type> | ApiError<"AnomaliesGetAnomaliesForProject403", typeof AnomaliesGetAnomaliesForProject403.Type> | ApiError<"AnomaliesGetAnomaliesForProject404", typeof AnomaliesGetAnomaliesForProject404.Type> | ApiError<"AnomaliesGetAnomaliesForProject500", typeof AnomaliesGetAnomaliesForProject500.Type>>
  readonly "ChartsListCharts": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof ChartsListChartsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ChartsListCharts200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ChartsListCharts400", typeof ChartsListCharts400.Type> | ApiError<"ChartsListCharts401", typeof ChartsListCharts401.Type> | ApiError<"ChartsListCharts403", typeof ChartsListCharts403.Type> | ApiError<"ChartsListCharts404", typeof ChartsListCharts404.Type> | ApiError<"ChartsListCharts409", typeof ChartsListCharts409.Type> | ApiError<"ChartsListCharts500", typeof ChartsListCharts500.Type>>
  readonly "ChartsCreateChart": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof ChartsCreateChartRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ChartsCreateChart200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ChartsCreateChart400", typeof ChartsCreateChart400.Type> | ApiError<"ChartsCreateChart401", typeof ChartsCreateChart401.Type> | ApiError<"ChartsCreateChart403", typeof ChartsCreateChart403.Type> | ApiError<"ChartsCreateChart404", typeof ChartsCreateChart404.Type> | ApiError<"ChartsCreateChart409", typeof ChartsCreateChart409.Type> | ApiError<"ChartsCreateChart500", typeof ChartsCreateChart500.Type>>
  readonly "ChartsDeleteChart": <Config extends OperationConfig>(idOrSlug: string, chartId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ChartsDeleteChart400", typeof ChartsDeleteChart400.Type> | ApiError<"ChartsDeleteChart401", typeof ChartsDeleteChart401.Type> | ApiError<"ChartsDeleteChart403", typeof ChartsDeleteChart403.Type> | ApiError<"ChartsDeleteChart404", typeof ChartsDeleteChart404.Type> | ApiError<"ChartsDeleteChart409", typeof ChartsDeleteChart409.Type> | ApiError<"ChartsDeleteChart500", typeof ChartsDeleteChart500.Type>>
  readonly "ChartsUpdateChart": <Config extends OperationConfig>(idOrSlug: string, chartId: string, options: { readonly payload: typeof ChartsUpdateChartRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ChartsUpdateChart400", typeof ChartsUpdateChart400.Type> | ApiError<"ChartsUpdateChart401", typeof ChartsUpdateChart401.Type> | ApiError<"ChartsUpdateChart403", typeof ChartsUpdateChart403.Type> | ApiError<"ChartsUpdateChart404", typeof ChartsUpdateChart404.Type> | ApiError<"ChartsUpdateChart409", typeof ChartsUpdateChart409.Type> | ApiError<"ChartsUpdateChart500", typeof ChartsUpdateChart500.Type>>
  readonly "CommentsListComments": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params: typeof CommentsListCommentsParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CommentsListComments200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"CommentsListComments400", typeof CommentsListComments400.Type> | ApiError<"CommentsListComments401", typeof CommentsListComments401.Type> | ApiError<"CommentsListComments403", typeof CommentsListComments403.Type> | ApiError<"CommentsListComments404", typeof CommentsListComments404.Type> | ApiError<"CommentsListComments500", typeof CommentsListComments500.Type>>
  readonly "CommentsAddComment": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof CommentsAddCommentRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CommentsAddComment200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"CommentsAddComment400", typeof CommentsAddComment400.Type> | ApiError<"CommentsAddComment401", typeof CommentsAddComment401.Type> | ApiError<"CommentsAddComment403", typeof CommentsAddComment403.Type> | ApiError<"CommentsAddComment404", typeof CommentsAddComment404.Type> | ApiError<"CommentsAddComment500", typeof CommentsAddComment500.Type>>
  readonly "CommentsDeleteComment": <Config extends OperationConfig>(idOrSlug: string, commentId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"CommentsDeleteComment400", typeof CommentsDeleteComment400.Type> | ApiError<"CommentsDeleteComment401", typeof CommentsDeleteComment401.Type> | ApiError<"CommentsDeleteComment403", typeof CommentsDeleteComment403.Type> | ApiError<"CommentsDeleteComment404", typeof CommentsDeleteComment404.Type> | ApiError<"CommentsDeleteComment500", typeof CommentsDeleteComment500.Type>>
  readonly "CommentsEditComment": <Config extends OperationConfig>(idOrSlug: string, commentId: string, options: { readonly payload: typeof CommentsEditCommentRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CommentsEditComment200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"CommentsEditComment400", typeof CommentsEditComment400.Type> | ApiError<"CommentsEditComment401", typeof CommentsEditComment401.Type> | ApiError<"CommentsEditComment403", typeof CommentsEditComment403.Type> | ApiError<"CommentsEditComment404", typeof CommentsEditComment404.Type> | ApiError<"CommentsEditComment500", typeof CommentsEditComment500.Type>>
  readonly "CommentsListCommentRevisions": <Config extends OperationConfig>(idOrSlug: string, commentId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof CommentsListCommentRevisions200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"CommentsListCommentRevisions400", typeof CommentsListCommentRevisions400.Type> | ApiError<"CommentsListCommentRevisions401", typeof CommentsListCommentRevisions401.Type> | ApiError<"CommentsListCommentRevisions403", typeof CommentsListCommentRevisions403.Type> | ApiError<"CommentsListCommentRevisions404", typeof CommentsListCommentRevisions404.Type> | ApiError<"CommentsListCommentRevisions500", typeof CommentsListCommentRevisions500.Type>>
  readonly "CommentsToggleCommentPin": <Config extends OperationConfig>(idOrSlug: string, commentId: string, options: { readonly payload: typeof CommentsToggleCommentPinRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CommentsToggleCommentPin200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"CommentsToggleCommentPin400", typeof CommentsToggleCommentPin400.Type> | ApiError<"CommentsToggleCommentPin401", typeof CommentsToggleCommentPin401.Type> | ApiError<"CommentsToggleCommentPin403", typeof CommentsToggleCommentPin403.Type> | ApiError<"CommentsToggleCommentPin404", typeof CommentsToggleCommentPin404.Type> | ApiError<"CommentsToggleCommentPin500", typeof CommentsToggleCommentPin500.Type>>
  readonly "CommentsListCommentMentionCandidates": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof CommentsListCommentMentionCandidates200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"CommentsListCommentMentionCandidates400", typeof CommentsListCommentMentionCandidates400.Type> | ApiError<"CommentsListCommentMentionCandidates401", typeof CommentsListCommentMentionCandidates401.Type> | ApiError<"CommentsListCommentMentionCandidates403", typeof CommentsListCommentMentionCandidates403.Type> | ApiError<"CommentsListCommentMentionCandidates404", typeof CommentsListCommentMentionCandidates404.Type> | ApiError<"CommentsListCommentMentionCandidates500", typeof CommentsListCommentMentionCandidates500.Type>>
  readonly "CommentsSearchCommentReferences": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params: typeof CommentsSearchCommentReferencesParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CommentsSearchCommentReferences200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"CommentsSearchCommentReferences400", typeof CommentsSearchCommentReferences400.Type> | ApiError<"CommentsSearchCommentReferences401", typeof CommentsSearchCommentReferences401.Type> | ApiError<"CommentsSearchCommentReferences403", typeof CommentsSearchCommentReferences403.Type> | ApiError<"CommentsSearchCommentReferences404", typeof CommentsSearchCommentReferences404.Type> | ApiError<"CommentsSearchCommentReferences500", typeof CommentsSearchCommentReferences500.Type>>
  readonly "DashboardsListDashboards": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof DashboardsListDashboards200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DashboardsListDashboards400", typeof DashboardsListDashboards400.Type> | ApiError<"DashboardsListDashboards401", typeof DashboardsListDashboards401.Type> | ApiError<"DashboardsListDashboards403", typeof DashboardsListDashboards403.Type> | ApiError<"DashboardsListDashboards404", typeof DashboardsListDashboards404.Type> | ApiError<"DashboardsListDashboards500", typeof DashboardsListDashboards500.Type>>
  readonly "DashboardsCreateDashboard": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof DashboardsCreateDashboardRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof DashboardsCreateDashboard200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DashboardsCreateDashboard400", typeof DashboardsCreateDashboard400.Type> | ApiError<"DashboardsCreateDashboard401", typeof DashboardsCreateDashboard401.Type> | ApiError<"DashboardsCreateDashboard403", typeof DashboardsCreateDashboard403.Type> | ApiError<"DashboardsCreateDashboard404", typeof DashboardsCreateDashboard404.Type> | ApiError<"DashboardsCreateDashboard500", typeof DashboardsCreateDashboard500.Type>>
  readonly "DashboardsReorderDashboards": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof DashboardsReorderDashboardsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DashboardsReorderDashboards400", typeof DashboardsReorderDashboards400.Type> | ApiError<"DashboardsReorderDashboards401", typeof DashboardsReorderDashboards401.Type> | ApiError<"DashboardsReorderDashboards403", typeof DashboardsReorderDashboards403.Type> | ApiError<"DashboardsReorderDashboards404", typeof DashboardsReorderDashboards404.Type> | ApiError<"DashboardsReorderDashboards500", typeof DashboardsReorderDashboards500.Type>>
  readonly "DashboardsDuplicateDashboard": <Config extends OperationConfig>(idOrSlug: string, dashboardId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof DashboardsDuplicateDashboard200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DashboardsDuplicateDashboard400", typeof DashboardsDuplicateDashboard400.Type> | ApiError<"DashboardsDuplicateDashboard401", typeof DashboardsDuplicateDashboard401.Type> | ApiError<"DashboardsDuplicateDashboard403", typeof DashboardsDuplicateDashboard403.Type> | ApiError<"DashboardsDuplicateDashboard404", typeof DashboardsDuplicateDashboard404.Type> | ApiError<"DashboardsDuplicateDashboard500", typeof DashboardsDuplicateDashboard500.Type>>
  readonly "DashboardsCopyDashboard": <Config extends OperationConfig>(idOrSlug: string, dashboardId: string, options: { readonly payload: typeof DashboardsCopyDashboardRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof DashboardsCopyDashboard200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DashboardsCopyDashboard400", typeof DashboardsCopyDashboard400.Type> | ApiError<"DashboardsCopyDashboard401", typeof DashboardsCopyDashboard401.Type> | ApiError<"DashboardsCopyDashboard403", typeof DashboardsCopyDashboard403.Type> | ApiError<"DashboardsCopyDashboard404", typeof DashboardsCopyDashboard404.Type> | ApiError<"DashboardsCopyDashboard500", typeof DashboardsCopyDashboard500.Type>>
  readonly "DashboardsDeleteDashboard": <Config extends OperationConfig>(idOrSlug: string, dashboardId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DashboardsDeleteDashboard400", typeof DashboardsDeleteDashboard400.Type> | ApiError<"DashboardsDeleteDashboard401", typeof DashboardsDeleteDashboard401.Type> | ApiError<"DashboardsDeleteDashboard403", typeof DashboardsDeleteDashboard403.Type> | ApiError<"DashboardsDeleteDashboard404", typeof DashboardsDeleteDashboard404.Type> | ApiError<"DashboardsDeleteDashboard500", typeof DashboardsDeleteDashboard500.Type>>
  readonly "DashboardsUpdateDashboard": <Config extends OperationConfig>(idOrSlug: string, dashboardId: string, options: { readonly payload: typeof DashboardsUpdateDashboardRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof DashboardsUpdateDashboard200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DashboardsUpdateDashboard400", typeof DashboardsUpdateDashboard400.Type> | ApiError<"DashboardsUpdateDashboard401", typeof DashboardsUpdateDashboard401.Type> | ApiError<"DashboardsUpdateDashboard403", typeof DashboardsUpdateDashboard403.Type> | ApiError<"DashboardsUpdateDashboard404", typeof DashboardsUpdateDashboard404.Type> | ApiError<"DashboardsUpdateDashboard500", typeof DashboardsUpdateDashboard500.Type>>
  readonly "DataSourcesGetDataSourceCoverage": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof DataSourcesGetDataSourceCoverage200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DataSourcesGetDataSourceCoverage400", typeof DataSourcesGetDataSourceCoverage400.Type> | ApiError<"DataSourcesGetDataSourceCoverage401", typeof DataSourcesGetDataSourceCoverage401.Type> | ApiError<"DataSourcesGetDataSourceCoverage403", typeof DataSourcesGetDataSourceCoverage403.Type> | ApiError<"DataSourcesGetDataSourceCoverage404", typeof DataSourcesGetDataSourceCoverage404.Type> | ApiError<"DataSourcesGetDataSourceCoverage500", typeof DataSourcesGetDataSourceCoverage500.Type>>
  readonly "DataSourcesGetStructuredFieldCatalog": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof DataSourcesGetStructuredFieldCatalog200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DataSourcesGetStructuredFieldCatalog400", typeof DataSourcesGetStructuredFieldCatalog400.Type> | ApiError<"DataSourcesGetStructuredFieldCatalog401", typeof DataSourcesGetStructuredFieldCatalog401.Type> | ApiError<"DataSourcesGetStructuredFieldCatalog403", typeof DataSourcesGetStructuredFieldCatalog403.Type> | ApiError<"DataSourcesGetStructuredFieldCatalog404", typeof DataSourcesGetStructuredFieldCatalog404.Type> | ApiError<"DataSourcesGetStructuredFieldCatalog500", typeof DataSourcesGetStructuredFieldCatalog500.Type>>
  readonly "DataSourcesListDataSources": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof DataSourcesListDataSources200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DataSourcesListDataSources400", typeof DataSourcesListDataSources400.Type> | ApiError<"DataSourcesListDataSources401", typeof DataSourcesListDataSources401.Type> | ApiError<"DataSourcesListDataSources403", typeof DataSourcesListDataSources403.Type> | ApiError<"DataSourcesListDataSources404", typeof DataSourcesListDataSources404.Type> | ApiError<"DataSourcesListDataSources500", typeof DataSourcesListDataSources500.Type>>
  readonly "DataSourcesCreateDataSource": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof DataSourcesCreateDataSourceRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof DataSourcesCreateDataSource200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DataSourcesCreateDataSource400", typeof DataSourcesCreateDataSource400.Type> | ApiError<"DataSourcesCreateDataSource401", typeof DataSourcesCreateDataSource401.Type> | ApiError<"DataSourcesCreateDataSource403", typeof DataSourcesCreateDataSource403.Type> | ApiError<"DataSourcesCreateDataSource404", typeof DataSourcesCreateDataSource404.Type> | ApiError<"DataSourcesCreateDataSource500", typeof DataSourcesCreateDataSource500.Type>>
  readonly "DataSourcesDeleteDataSource": <Config extends OperationConfig>(idOrSlug: string, dataSourceId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DataSourcesDeleteDataSource400", typeof DataSourcesDeleteDataSource400.Type> | ApiError<"DataSourcesDeleteDataSource401", typeof DataSourcesDeleteDataSource401.Type> | ApiError<"DataSourcesDeleteDataSource403", typeof DataSourcesDeleteDataSource403.Type> | ApiError<"DataSourcesDeleteDataSource404", typeof DataSourcesDeleteDataSource404.Type> | ApiError<"DataSourcesDeleteDataSource500", typeof DataSourcesDeleteDataSource500.Type>>
  readonly "DataSourcesUpdateDataSource": <Config extends OperationConfig>(idOrSlug: string, dataSourceId: string, options: { readonly payload: typeof DataSourcesUpdateDataSourceRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof DataSourcesUpdateDataSource200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DataSourcesUpdateDataSource400", typeof DataSourcesUpdateDataSource400.Type> | ApiError<"DataSourcesUpdateDataSource401", typeof DataSourcesUpdateDataSource401.Type> | ApiError<"DataSourcesUpdateDataSource403", typeof DataSourcesUpdateDataSource403.Type> | ApiError<"DataSourcesUpdateDataSource404", typeof DataSourcesUpdateDataSource404.Type> | ApiError<"DataSourcesUpdateDataSource500", typeof DataSourcesUpdateDataSource500.Type>>
  readonly "DownloadsGetDownloadAnalytics": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof DownloadsGetDownloadAnalyticsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof DownloadsGetDownloadAnalytics200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DownloadsGetDownloadAnalytics401", typeof DownloadsGetDownloadAnalytics401.Type> | ApiError<"DownloadsGetDownloadAnalytics403", typeof DownloadsGetDownloadAnalytics403.Type> | ApiError<"DownloadsGetDownloadAnalytics404", typeof DownloadsGetDownloadAnalytics404.Type> | ApiError<"DownloadsGetDownloadAnalytics500", typeof DownloadsGetDownloadAnalytics500.Type>>
  readonly "DownloadsListDownloadProviders": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof DownloadsListDownloadProviders200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DownloadsListDownloadProviders400", typeof DownloadsListDownloadProviders400.Type> | ApiError<"DownloadsListDownloadProviders401", typeof DownloadsListDownloadProviders401.Type> | ApiError<"DownloadsListDownloadProviders403", typeof DownloadsListDownloadProviders403.Type> | ApiError<"DownloadsListDownloadProviders404", typeof DownloadsListDownloadProviders404.Type> | ApiError<"DownloadsListDownloadProviders500", typeof DownloadsListDownloadProviders500.Type>>
  readonly "DownloadsCreateDownloadProvider": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof DownloadsCreateDownloadProviderRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof DownloadsCreateDownloadProvider200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DownloadsCreateDownloadProvider400", typeof DownloadsCreateDownloadProvider400.Type> | ApiError<"DownloadsCreateDownloadProvider401", typeof DownloadsCreateDownloadProvider401.Type> | ApiError<"DownloadsCreateDownloadProvider403", typeof DownloadsCreateDownloadProvider403.Type> | ApiError<"DownloadsCreateDownloadProvider404", typeof DownloadsCreateDownloadProvider404.Type> | ApiError<"DownloadsCreateDownloadProvider500", typeof DownloadsCreateDownloadProvider500.Type>>
  readonly "DownloadsSearchDownloadProviderProjects": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params: typeof DownloadsSearchDownloadProviderProjectsParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof DownloadsSearchDownloadProviderProjects200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DownloadsSearchDownloadProviderProjects400", typeof DownloadsSearchDownloadProviderProjects400.Type> | ApiError<"DownloadsSearchDownloadProviderProjects401", typeof DownloadsSearchDownloadProviderProjects401.Type> | ApiError<"DownloadsSearchDownloadProviderProjects403", typeof DownloadsSearchDownloadProviderProjects403.Type> | ApiError<"DownloadsSearchDownloadProviderProjects404", typeof DownloadsSearchDownloadProviderProjects404.Type> | ApiError<"DownloadsSearchDownloadProviderProjects500", typeof DownloadsSearchDownloadProviderProjects500.Type>>
  readonly "DownloadsDeleteDownloadProvider": <Config extends OperationConfig>(idOrSlug: string, providerId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DownloadsDeleteDownloadProvider400", typeof DownloadsDeleteDownloadProvider400.Type> | ApiError<"DownloadsDeleteDownloadProvider401", typeof DownloadsDeleteDownloadProvider401.Type> | ApiError<"DownloadsDeleteDownloadProvider403", typeof DownloadsDeleteDownloadProvider403.Type> | ApiError<"DownloadsDeleteDownloadProvider404", typeof DownloadsDeleteDownloadProvider404.Type> | ApiError<"DownloadsDeleteDownloadProvider500", typeof DownloadsDeleteDownloadProvider500.Type>>
  readonly "DownloadsUpdateDownloadProvider": <Config extends OperationConfig>(idOrSlug: string, providerId: string, options: { readonly payload: typeof DownloadsUpdateDownloadProviderRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"DownloadsUpdateDownloadProvider400", typeof DownloadsUpdateDownloadProvider400.Type> | ApiError<"DownloadsUpdateDownloadProvider401", typeof DownloadsUpdateDownloadProvider401.Type> | ApiError<"DownloadsUpdateDownloadProvider403", typeof DownloadsUpdateDownloadProvider403.Type> | ApiError<"DownloadsUpdateDownloadProvider404", typeof DownloadsUpdateDownloadProvider404.Type> | ApiError<"DownloadsUpdateDownloadProvider500", typeof DownloadsUpdateDownloadProvider500.Type>>
  readonly "ErrorTrackingGetErrorEmbeddings": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof ErrorTrackingGetErrorEmbeddingsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ErrorTrackingGetErrorEmbeddings200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ErrorTrackingGetErrorEmbeddings401", typeof ErrorTrackingGetErrorEmbeddings401.Type> | ApiError<"ErrorTrackingGetErrorEmbeddings403", typeof ErrorTrackingGetErrorEmbeddings403.Type> | ApiError<"ErrorTrackingGetErrorEmbeddings404", typeof ErrorTrackingGetErrorEmbeddings404.Type> | ApiError<"ErrorTrackingGetErrorEmbeddings500", typeof ErrorTrackingGetErrorEmbeddings500.Type>>
  readonly "ErrorTrackingGetErrorIssuesForProject": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof ErrorTrackingGetErrorIssuesForProjectRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ErrorTrackingGetErrorIssuesForProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ErrorTrackingGetErrorIssuesForProject401", typeof ErrorTrackingGetErrorIssuesForProject401.Type> | ApiError<"ErrorTrackingGetErrorIssuesForProject403", typeof ErrorTrackingGetErrorIssuesForProject403.Type> | ApiError<"ErrorTrackingGetErrorIssuesForProject404", typeof ErrorTrackingGetErrorIssuesForProject404.Type> | ApiError<"ErrorTrackingGetErrorIssuesForProject500", typeof ErrorTrackingGetErrorIssuesForProject500.Type>>
  readonly "ErrorTrackingGetErrorIssuesForProjects": <Config extends OperationConfig>(options: { readonly payload: typeof ErrorTrackingGetErrorIssuesForProjectsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ErrorTrackingGetErrorIssuesForProjects200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ErrorTrackingGetErrorIssuesForProjects401", typeof ErrorTrackingGetErrorIssuesForProjects401.Type> | ApiError<"ErrorTrackingGetErrorIssuesForProjects403", typeof ErrorTrackingGetErrorIssuesForProjects403.Type> | ApiError<"ErrorTrackingGetErrorIssuesForProjects404", typeof ErrorTrackingGetErrorIssuesForProjects404.Type> | ApiError<"ErrorTrackingGetErrorIssuesForProjects500", typeof ErrorTrackingGetErrorIssuesForProjects500.Type>>
  readonly "ErrorTrackingGetErrorIssueDetail": <Config extends OperationConfig>(idOrSlug: string, errorId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ErrorTrackingGetErrorIssueDetail200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ErrorTrackingGetErrorIssueDetail401", typeof ErrorTrackingGetErrorIssueDetail401.Type> | ApiError<"ErrorTrackingGetErrorIssueDetail403", typeof ErrorTrackingGetErrorIssueDetail403.Type> | ApiError<"ErrorTrackingGetErrorIssueDetail404", typeof ErrorTrackingGetErrorIssueDetail404.Type> | ApiError<"ErrorTrackingGetErrorIssueDetail500", typeof ErrorTrackingGetErrorIssueDetail500.Type>>
  readonly "ErrorTrackingUpdateErrorIssueMetadata": <Config extends OperationConfig>(idOrSlug: string, errorId: string, options: { readonly payload: typeof ErrorTrackingUpdateErrorIssueMetadataRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ErrorTrackingUpdateErrorIssueMetadata401", typeof ErrorTrackingUpdateErrorIssueMetadata401.Type> | ApiError<"ErrorTrackingUpdateErrorIssueMetadata403", typeof ErrorTrackingUpdateErrorIssueMetadata403.Type> | ApiError<"ErrorTrackingUpdateErrorIssueMetadata404", typeof ErrorTrackingUpdateErrorIssueMetadata404.Type> | ApiError<"ErrorTrackingUpdateErrorIssueMetadata500", typeof ErrorTrackingUpdateErrorIssueMetadata500.Type>>
  readonly "ErrorTrackingGetErrorStacktraceVariants": <Config extends OperationConfig>(idOrSlug: string, errorId: string, options: { readonly params: typeof ErrorTrackingGetErrorStacktraceVariantsParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ErrorTrackingGetErrorStacktraceVariants200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ErrorTrackingGetErrorStacktraceVariants401", typeof ErrorTrackingGetErrorStacktraceVariants401.Type> | ApiError<"ErrorTrackingGetErrorStacktraceVariants403", typeof ErrorTrackingGetErrorStacktraceVariants403.Type> | ApiError<"ErrorTrackingGetErrorStacktraceVariants404", typeof ErrorTrackingGetErrorStacktraceVariants404.Type> | ApiError<"ErrorTrackingGetErrorStacktraceVariants500", typeof ErrorTrackingGetErrorStacktraceVariants500.Type>>
  readonly "ErrorTrackingGetErrorOccurrencesForIssue": <Config extends OperationConfig>(idOrSlug: string, errorId: string, options: { readonly params?: typeof ErrorTrackingGetErrorOccurrencesForIssueParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ErrorTrackingGetErrorOccurrencesForIssue200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ErrorTrackingGetErrorOccurrencesForIssue401", typeof ErrorTrackingGetErrorOccurrencesForIssue401.Type> | ApiError<"ErrorTrackingGetErrorOccurrencesForIssue403", typeof ErrorTrackingGetErrorOccurrencesForIssue403.Type> | ApiError<"ErrorTrackingGetErrorOccurrencesForIssue404", typeof ErrorTrackingGetErrorOccurrencesForIssue404.Type> | ApiError<"ErrorTrackingGetErrorOccurrencesForIssue500", typeof ErrorTrackingGetErrorOccurrencesForIssue500.Type>>
  readonly "ErrorTrackingGetErrorOverviewTimeseries": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof ErrorTrackingGetErrorOverviewTimeseriesRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ErrorTrackingGetErrorOverviewTimeseries200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ErrorTrackingGetErrorOverviewTimeseries401", typeof ErrorTrackingGetErrorOverviewTimeseries401.Type> | ApiError<"ErrorTrackingGetErrorOverviewTimeseries403", typeof ErrorTrackingGetErrorOverviewTimeseries403.Type> | ApiError<"ErrorTrackingGetErrorOverviewTimeseries404", typeof ErrorTrackingGetErrorOverviewTimeseries404.Type> | ApiError<"ErrorTrackingGetErrorOverviewTimeseries500", typeof ErrorTrackingGetErrorOverviewTimeseries500.Type>>
  readonly "ErrorTrackingGetErrorOverviewTimeseriesForProjects": <Config extends OperationConfig>(options: { readonly payload: typeof ErrorTrackingGetErrorOverviewTimeseriesForProjectsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ErrorTrackingGetErrorOverviewTimeseriesForProjects200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ErrorTrackingGetErrorOverviewTimeseriesForProjects401", typeof ErrorTrackingGetErrorOverviewTimeseriesForProjects401.Type> | ApiError<"ErrorTrackingGetErrorOverviewTimeseriesForProjects403", typeof ErrorTrackingGetErrorOverviewTimeseriesForProjects403.Type> | ApiError<"ErrorTrackingGetErrorOverviewTimeseriesForProjects404", typeof ErrorTrackingGetErrorOverviewTimeseriesForProjects404.Type> | ApiError<"ErrorTrackingGetErrorOverviewTimeseriesForProjects500", typeof ErrorTrackingGetErrorOverviewTimeseriesForProjects500.Type>>
  readonly "ErrorTrackingDeleteErrors": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof ErrorTrackingDeleteErrorsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ErrorTrackingDeleteErrors200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ErrorTrackingDeleteErrors401", typeof ErrorTrackingDeleteErrors401.Type> | ApiError<"ErrorTrackingDeleteErrors403", typeof ErrorTrackingDeleteErrors403.Type> | ApiError<"ErrorTrackingDeleteErrors404", typeof ErrorTrackingDeleteErrors404.Type> | ApiError<"ErrorTrackingDeleteErrors500", typeof ErrorTrackingDeleteErrors500.Type>>
  readonly "ErrorTrackingMarkErrorsViewed": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof ErrorTrackingMarkErrorsViewedRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ErrorTrackingMarkErrorsViewed401", typeof ErrorTrackingMarkErrorsViewed401.Type> | ApiError<"ErrorTrackingMarkErrorsViewed403", typeof ErrorTrackingMarkErrorsViewed403.Type> | ApiError<"ErrorTrackingMarkErrorsViewed404", typeof ErrorTrackingMarkErrorsViewed404.Type> | ApiError<"ErrorTrackingMarkErrorsViewed500", typeof ErrorTrackingMarkErrorsViewed500.Type>>
  readonly "ErrorTrackingResolveErrorIssues": <Config extends OperationConfig>(options: { readonly payload: typeof ErrorTrackingResolveErrorIssuesRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ErrorTrackingResolveErrorIssues401", typeof ErrorTrackingResolveErrorIssues401.Type> | ApiError<"ErrorTrackingResolveErrorIssues403", typeof ErrorTrackingResolveErrorIssues403.Type> | ApiError<"ErrorTrackingResolveErrorIssues404", typeof ErrorTrackingResolveErrorIssues404.Type> | ApiError<"ErrorTrackingResolveErrorIssues500", typeof ErrorTrackingResolveErrorIssues500.Type>>
  readonly "ErrorTrackingClearErrorResolutions": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof ErrorTrackingClearErrorResolutionsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ErrorTrackingClearErrorResolutions401", typeof ErrorTrackingClearErrorResolutions401.Type> | ApiError<"ErrorTrackingClearErrorResolutions403", typeof ErrorTrackingClearErrorResolutions403.Type> | ApiError<"ErrorTrackingClearErrorResolutions404", typeof ErrorTrackingClearErrorResolutions404.Type> | ApiError<"ErrorTrackingClearErrorResolutions500", typeof ErrorTrackingClearErrorResolutions500.Type>>
  readonly "ErrorTrackingMergeErrorIssues": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof ErrorTrackingMergeErrorIssuesRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ErrorTrackingMergeErrorIssues200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ErrorTrackingMergeErrorIssues401", typeof ErrorTrackingMergeErrorIssues401.Type> | ApiError<"ErrorTrackingMergeErrorIssues403", typeof ErrorTrackingMergeErrorIssues403.Type> | ApiError<"ErrorTrackingMergeErrorIssues404", typeof ErrorTrackingMergeErrorIssues404.Type> | ApiError<"ErrorTrackingMergeErrorIssues500", typeof ErrorTrackingMergeErrorIssues500.Type>>
  readonly "ErrorTrackingUnmergeErrorIssueHashes": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof ErrorTrackingUnmergeErrorIssueHashesRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ErrorTrackingUnmergeErrorIssueHashes401", typeof ErrorTrackingUnmergeErrorIssueHashes401.Type> | ApiError<"ErrorTrackingUnmergeErrorIssueHashes403", typeof ErrorTrackingUnmergeErrorIssueHashes403.Type> | ApiError<"ErrorTrackingUnmergeErrorIssueHashes404", typeof ErrorTrackingUnmergeErrorIssueHashes404.Type> | ApiError<"ErrorTrackingUnmergeErrorIssueHashes500", typeof ErrorTrackingUnmergeErrorIssueHashes500.Type>>
  readonly "ErrorTrackingGetErrorFilterMeta": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ErrorTrackingGetErrorFilterMeta200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ErrorTrackingGetErrorFilterMeta401", typeof ErrorTrackingGetErrorFilterMeta401.Type> | ApiError<"ErrorTrackingGetErrorFilterMeta403", typeof ErrorTrackingGetErrorFilterMeta403.Type> | ApiError<"ErrorTrackingGetErrorFilterMeta404", typeof ErrorTrackingGetErrorFilterMeta404.Type> | ApiError<"ErrorTrackingGetErrorFilterMeta500", typeof ErrorTrackingGetErrorFilterMeta500.Type>>
  readonly "ErrorTrackingInterpretErrorFilters": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof ErrorTrackingInterpretErrorFiltersRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ErrorTrackingInterpretErrorFilters200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ErrorTrackingInterpretErrorFilters401", typeof ErrorTrackingInterpretErrorFilters401.Type> | ApiError<"ErrorTrackingInterpretErrorFilters403", typeof ErrorTrackingInterpretErrorFilters403.Type> | ApiError<"ErrorTrackingInterpretErrorFilters404", typeof ErrorTrackingInterpretErrorFilters404.Type> | ApiError<"ErrorTrackingInterpretErrorFilters500", typeof ErrorTrackingInterpretErrorFilters500.Type>>
  readonly "ErrorTrackingListErrorLabels": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof ErrorTrackingListErrorLabelsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ErrorTrackingListErrorLabels200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ErrorTrackingListErrorLabels401", typeof ErrorTrackingListErrorLabels401.Type> | ApiError<"ErrorTrackingListErrorLabels403", typeof ErrorTrackingListErrorLabels403.Type> | ApiError<"ErrorTrackingListErrorLabels404", typeof ErrorTrackingListErrorLabels404.Type> | ApiError<"ErrorTrackingListErrorLabels500", typeof ErrorTrackingListErrorLabels500.Type>>
  readonly "ErrorTrackingCreateErrorLabel": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof ErrorTrackingCreateErrorLabelRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ErrorTrackingCreateErrorLabel200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ErrorTrackingCreateErrorLabel401", typeof ErrorTrackingCreateErrorLabel401.Type> | ApiError<"ErrorTrackingCreateErrorLabel403", typeof ErrorTrackingCreateErrorLabel403.Type> | ApiError<"ErrorTrackingCreateErrorLabel404", typeof ErrorTrackingCreateErrorLabel404.Type> | ApiError<"ErrorTrackingCreateErrorLabel500", typeof ErrorTrackingCreateErrorLabel500.Type>>
  readonly "ErrorTrackingDeleteErrorLabel": <Config extends OperationConfig>(idOrSlug: string, labelId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ErrorTrackingDeleteErrorLabel401", typeof ErrorTrackingDeleteErrorLabel401.Type> | ApiError<"ErrorTrackingDeleteErrorLabel403", typeof ErrorTrackingDeleteErrorLabel403.Type> | ApiError<"ErrorTrackingDeleteErrorLabel404", typeof ErrorTrackingDeleteErrorLabel404.Type> | ApiError<"ErrorTrackingDeleteErrorLabel500", typeof ErrorTrackingDeleteErrorLabel500.Type>>
  readonly "ErrorTrackingUpdateErrorLabel": <Config extends OperationConfig>(idOrSlug: string, labelId: string, options: { readonly payload: typeof ErrorTrackingUpdateErrorLabelRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ErrorTrackingUpdateErrorLabel200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ErrorTrackingUpdateErrorLabel401", typeof ErrorTrackingUpdateErrorLabel401.Type> | ApiError<"ErrorTrackingUpdateErrorLabel403", typeof ErrorTrackingUpdateErrorLabel403.Type> | ApiError<"ErrorTrackingUpdateErrorLabel404", typeof ErrorTrackingUpdateErrorLabel404.Type> | ApiError<"ErrorTrackingUpdateErrorLabel500", typeof ErrorTrackingUpdateErrorLabel500.Type>>
  readonly "ErrorTrackingSetErrorLabelAssignments": <Config extends OperationConfig>(idOrSlug: string, errorId: string, options: { readonly payload: typeof ErrorTrackingSetErrorLabelAssignmentsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ErrorTrackingSetErrorLabelAssignments401", typeof ErrorTrackingSetErrorLabelAssignments401.Type> | ApiError<"ErrorTrackingSetErrorLabelAssignments403", typeof ErrorTrackingSetErrorLabelAssignments403.Type> | ApiError<"ErrorTrackingSetErrorLabelAssignments404", typeof ErrorTrackingSetErrorLabelAssignments404.Type> | ApiError<"ErrorTrackingSetErrorLabelAssignments500", typeof ErrorTrackingSetErrorLabelAssignments500.Type>>
  readonly "EventExplorerGetEventExplorerRows": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof EventExplorerGetEventExplorerRowsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof EventExplorerGetEventExplorerRows200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"EventExplorerGetEventExplorerRows401", typeof EventExplorerGetEventExplorerRows401.Type> | ApiError<"EventExplorerGetEventExplorerRows403", typeof EventExplorerGetEventExplorerRows403.Type> | ApiError<"EventExplorerGetEventExplorerRows404", typeof EventExplorerGetEventExplorerRows404.Type> | ApiError<"EventExplorerGetEventExplorerRows500", typeof EventExplorerGetEventExplorerRows500.Type>>
  readonly "EventExplorerGetEventExplorerDetail": <Config extends OperationConfig>(idOrSlug: string, eventId: string, options: { readonly params: typeof EventExplorerGetEventExplorerDetailParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof EventExplorerGetEventExplorerDetail200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"EventExplorerGetEventExplorerDetail401", typeof EventExplorerGetEventExplorerDetail401.Type> | ApiError<"EventExplorerGetEventExplorerDetail403", typeof EventExplorerGetEventExplorerDetail403.Type> | ApiError<"EventExplorerGetEventExplorerDetail404", typeof EventExplorerGetEventExplorerDetail404.Type> | ApiError<"EventExplorerGetEventExplorerDetail500", typeof EventExplorerGetEventExplorerDetail500.Type>>
  /**
* Returns all marker collections configured for a project.
*/
readonly "EventMarkersListEventMarkerCollections": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof EventMarkersListEventMarkerCollections200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"EventMarkersListEventMarkerCollections400", typeof EventMarkersListEventMarkerCollections400.Type> | ApiError<"EventMarkersListEventMarkerCollections401", typeof EventMarkersListEventMarkerCollections401.Type> | ApiError<"EventMarkersListEventMarkerCollections403", typeof EventMarkersListEventMarkerCollections403.Type> | ApiError<"EventMarkersListEventMarkerCollections404", typeof EventMarkersListEventMarkerCollections404.Type> | ApiError<"EventMarkersListEventMarkerCollections500", typeof EventMarkersListEventMarkerCollections500.Type>>
  /**
* Creates a manual or generated marker collection for a project.
*/
readonly "EventMarkersCreateEventMarkerCollection": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof EventMarkersCreateEventMarkerCollectionRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof EventMarkersCreateEventMarkerCollection200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"EventMarkersCreateEventMarkerCollection400", typeof EventMarkersCreateEventMarkerCollection400.Type> | ApiError<"EventMarkersCreateEventMarkerCollection401", typeof EventMarkersCreateEventMarkerCollection401.Type> | ApiError<"EventMarkersCreateEventMarkerCollection403", typeof EventMarkersCreateEventMarkerCollection403.Type> | ApiError<"EventMarkersCreateEventMarkerCollection404", typeof EventMarkersCreateEventMarkerCollection404.Type> | ApiError<"EventMarkersCreateEventMarkerCollection500", typeof EventMarkersCreateEventMarkerCollection500.Type>>
  /**
* Deletes a marker collection and all of its events.
*/
readonly "EventMarkersDeleteEventMarkerCollection": <Config extends OperationConfig>(idOrSlug: string, collectionId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"EventMarkersDeleteEventMarkerCollection400", typeof EventMarkersDeleteEventMarkerCollection400.Type> | ApiError<"EventMarkersDeleteEventMarkerCollection401", typeof EventMarkersDeleteEventMarkerCollection401.Type> | ApiError<"EventMarkersDeleteEventMarkerCollection403", typeof EventMarkersDeleteEventMarkerCollection403.Type> | ApiError<"EventMarkersDeleteEventMarkerCollection404", typeof EventMarkersDeleteEventMarkerCollection404.Type> | ApiError<"EventMarkersDeleteEventMarkerCollection500", typeof EventMarkersDeleteEventMarkerCollection500.Type>>
  /**
* Updates collection metadata and default display settings.
*/
readonly "EventMarkersUpdateEventMarkerCollection": <Config extends OperationConfig>(idOrSlug: string, collectionId: string, options: { readonly payload: typeof EventMarkersUpdateEventMarkerCollectionRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof EventMarkersUpdateEventMarkerCollection200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"EventMarkersUpdateEventMarkerCollection400", typeof EventMarkersUpdateEventMarkerCollection400.Type> | ApiError<"EventMarkersUpdateEventMarkerCollection401", typeof EventMarkersUpdateEventMarkerCollection401.Type> | ApiError<"EventMarkersUpdateEventMarkerCollection403", typeof EventMarkersUpdateEventMarkerCollection403.Type> | ApiError<"EventMarkersUpdateEventMarkerCollection404", typeof EventMarkersUpdateEventMarkerCollection404.Type> | ApiError<"EventMarkersUpdateEventMarkerCollection500", typeof EventMarkersUpdateEventMarkerCollection500.Type>>
  /**
* Returns marker events in a collection, optionally filtered by an inclusive time range.
*/
readonly "EventMarkersListEventMarkers": <Config extends OperationConfig>(idOrSlug: string, collectionId: string, options: { readonly params?: typeof EventMarkersListEventMarkersParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof EventMarkersListEventMarkers200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"EventMarkersListEventMarkers400", typeof EventMarkersListEventMarkers400.Type> | ApiError<"EventMarkersListEventMarkers401", typeof EventMarkersListEventMarkers401.Type> | ApiError<"EventMarkersListEventMarkers403", typeof EventMarkersListEventMarkers403.Type> | ApiError<"EventMarkersListEventMarkers404", typeof EventMarkersListEventMarkers404.Type> | ApiError<"EventMarkersListEventMarkers500", typeof EventMarkersListEventMarkers500.Type>>
  /**
* Creates a marker event in a manual collection. Reuses an existing event when externalId matches.
*/
readonly "EventMarkersCreateEventMarker": <Config extends OperationConfig>(idOrSlug: string, collectionId: string, options: { readonly payload: typeof EventMarkersCreateEventMarkerRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof EventMarkersCreateEventMarker200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"EventMarkersCreateEventMarker400", typeof EventMarkersCreateEventMarker400.Type> | ApiError<"EventMarkersCreateEventMarker401", typeof EventMarkersCreateEventMarker401.Type> | ApiError<"EventMarkersCreateEventMarker403", typeof EventMarkersCreateEventMarker403.Type> | ApiError<"EventMarkersCreateEventMarker404", typeof EventMarkersCreateEventMarker404.Type> | ApiError<"EventMarkersCreateEventMarker500", typeof EventMarkersCreateEventMarker500.Type>>
  /**
* Creates up to 500 marker events in a manual collection in a single request.
*/
readonly "EventMarkersBulkCreateEventMarkers": <Config extends OperationConfig>(idOrSlug: string, collectionId: string, options: { readonly payload: typeof EventMarkersBulkCreateEventMarkersRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof EventMarkersBulkCreateEventMarkers200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"EventMarkersBulkCreateEventMarkers400", typeof EventMarkersBulkCreateEventMarkers400.Type> | ApiError<"EventMarkersBulkCreateEventMarkers401", typeof EventMarkersBulkCreateEventMarkers401.Type> | ApiError<"EventMarkersBulkCreateEventMarkers403", typeof EventMarkersBulkCreateEventMarkers403.Type> | ApiError<"EventMarkersBulkCreateEventMarkers404", typeof EventMarkersBulkCreateEventMarkers404.Type> | ApiError<"EventMarkersBulkCreateEventMarkers500", typeof EventMarkersBulkCreateEventMarkers500.Type>>
  /**
* Deletes a marker event from a manual collection.
*/
readonly "EventMarkersDeleteEventMarker": <Config extends OperationConfig>(idOrSlug: string, collectionId: string, eventId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"EventMarkersDeleteEventMarker400", typeof EventMarkersDeleteEventMarker400.Type> | ApiError<"EventMarkersDeleteEventMarker401", typeof EventMarkersDeleteEventMarker401.Type> | ApiError<"EventMarkersDeleteEventMarker403", typeof EventMarkersDeleteEventMarker403.Type> | ApiError<"EventMarkersDeleteEventMarker404", typeof EventMarkersDeleteEventMarker404.Type> | ApiError<"EventMarkersDeleteEventMarker500", typeof EventMarkersDeleteEventMarker500.Type>>
  /**
* Updates a marker event in a manual collection.
*/
readonly "EventMarkersUpdateEventMarker": <Config extends OperationConfig>(idOrSlug: string, collectionId: string, eventId: string, options: { readonly payload: typeof EventMarkersUpdateEventMarkerRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof EventMarkersUpdateEventMarker200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"EventMarkersUpdateEventMarker400", typeof EventMarkersUpdateEventMarker400.Type> | ApiError<"EventMarkersUpdateEventMarker401", typeof EventMarkersUpdateEventMarker401.Type> | ApiError<"EventMarkersUpdateEventMarker403", typeof EventMarkersUpdateEventMarker403.Type> | ApiError<"EventMarkersUpdateEventMarker404", typeof EventMarkersUpdateEventMarker404.Type> | ApiError<"EventMarkersUpdateEventMarker500", typeof EventMarkersUpdateEventMarker500.Type>>
  readonly "FeatureFlagsListFeatureFlags": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof FeatureFlagsListFeatureFlags200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FeatureFlagsListFeatureFlags400", typeof FeatureFlagsListFeatureFlags400.Type> | ApiError<"FeatureFlagsListFeatureFlags401", typeof FeatureFlagsListFeatureFlags401.Type> | ApiError<"FeatureFlagsListFeatureFlags403", typeof FeatureFlagsListFeatureFlags403.Type> | ApiError<"FeatureFlagsListFeatureFlags404", typeof FeatureFlagsListFeatureFlags404.Type> | ApiError<"FeatureFlagsListFeatureFlags500", typeof FeatureFlagsListFeatureFlags500.Type>>
  readonly "FeatureFlagsCreateFeatureFlag": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof FeatureFlagsCreateFeatureFlagRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof FeatureFlagsCreateFeatureFlag200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FeatureFlagsCreateFeatureFlag400", typeof FeatureFlagsCreateFeatureFlag400.Type> | ApiError<"FeatureFlagsCreateFeatureFlag401", typeof FeatureFlagsCreateFeatureFlag401.Type> | ApiError<"FeatureFlagsCreateFeatureFlag403", typeof FeatureFlagsCreateFeatureFlag403.Type> | ApiError<"FeatureFlagsCreateFeatureFlag404", typeof FeatureFlagsCreateFeatureFlag404.Type> | ApiError<"FeatureFlagsCreateFeatureFlag500", typeof FeatureFlagsCreateFeatureFlag500.Type>>
  readonly "FeatureFlagsDeleteFeatureFlag": <Config extends OperationConfig>(idOrSlug: string, flagId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FeatureFlagsDeleteFeatureFlag400", typeof FeatureFlagsDeleteFeatureFlag400.Type> | ApiError<"FeatureFlagsDeleteFeatureFlag401", typeof FeatureFlagsDeleteFeatureFlag401.Type> | ApiError<"FeatureFlagsDeleteFeatureFlag403", typeof FeatureFlagsDeleteFeatureFlag403.Type> | ApiError<"FeatureFlagsDeleteFeatureFlag404", typeof FeatureFlagsDeleteFeatureFlag404.Type> | ApiError<"FeatureFlagsDeleteFeatureFlag500", typeof FeatureFlagsDeleteFeatureFlag500.Type>>
  readonly "FeatureFlagsUpdateFeatureFlag": <Config extends OperationConfig>(idOrSlug: string, flagId: string, options: { readonly payload: typeof FeatureFlagsUpdateFeatureFlagRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof FeatureFlagsUpdateFeatureFlag200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FeatureFlagsUpdateFeatureFlag400", typeof FeatureFlagsUpdateFeatureFlag400.Type> | ApiError<"FeatureFlagsUpdateFeatureFlag401", typeof FeatureFlagsUpdateFeatureFlag401.Type> | ApiError<"FeatureFlagsUpdateFeatureFlag403", typeof FeatureFlagsUpdateFeatureFlag403.Type> | ApiError<"FeatureFlagsUpdateFeatureFlag404", typeof FeatureFlagsUpdateFeatureFlag404.Type> | ApiError<"FeatureFlagsUpdateFeatureFlag500", typeof FeatureFlagsUpdateFeatureFlag500.Type>>
  readonly "FeatureFlagsReshuffleFeatureFlagRollout": <Config extends OperationConfig>(idOrSlug: string, flagId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof FeatureFlagsReshuffleFeatureFlagRollout200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FeatureFlagsReshuffleFeatureFlagRollout400", typeof FeatureFlagsReshuffleFeatureFlagRollout400.Type> | ApiError<"FeatureFlagsReshuffleFeatureFlagRollout401", typeof FeatureFlagsReshuffleFeatureFlagRollout401.Type> | ApiError<"FeatureFlagsReshuffleFeatureFlagRollout403", typeof FeatureFlagsReshuffleFeatureFlagRollout403.Type> | ApiError<"FeatureFlagsReshuffleFeatureFlagRollout404", typeof FeatureFlagsReshuffleFeatureFlagRollout404.Type> | ApiError<"FeatureFlagsReshuffleFeatureFlagRollout500", typeof FeatureFlagsReshuffleFeatureFlagRollout500.Type>>
  readonly "FeatureFlagsGetFeatureFlagActivity": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof FeatureFlagsGetFeatureFlagActivity200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FeatureFlagsGetFeatureFlagActivity400", typeof FeatureFlagsGetFeatureFlagActivity400.Type> | ApiError<"FeatureFlagsGetFeatureFlagActivity401", typeof FeatureFlagsGetFeatureFlagActivity401.Type> | ApiError<"FeatureFlagsGetFeatureFlagActivity403", typeof FeatureFlagsGetFeatureFlagActivity403.Type> | ApiError<"FeatureFlagsGetFeatureFlagActivity404", typeof FeatureFlagsGetFeatureFlagActivity404.Type> | ApiError<"FeatureFlagsGetFeatureFlagActivity500", typeof FeatureFlagsGetFeatureFlagActivity500.Type>>
  readonly "FeatureFlagsGetFeatureFlagExposure": <Config extends OperationConfig>(idOrSlug: string, flagId: string, options: { readonly params?: typeof FeatureFlagsGetFeatureFlagExposureParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof FeatureFlagsGetFeatureFlagExposure200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FeatureFlagsGetFeatureFlagExposure400", typeof FeatureFlagsGetFeatureFlagExposure400.Type> | ApiError<"FeatureFlagsGetFeatureFlagExposure401", typeof FeatureFlagsGetFeatureFlagExposure401.Type> | ApiError<"FeatureFlagsGetFeatureFlagExposure403", typeof FeatureFlagsGetFeatureFlagExposure403.Type> | ApiError<"FeatureFlagsGetFeatureFlagExposure404", typeof FeatureFlagsGetFeatureFlagExposure404.Type> | ApiError<"FeatureFlagsGetFeatureFlagExposure500", typeof FeatureFlagsGetFeatureFlagExposure500.Type>>
  readonly "FeatureFlagsGetFeatureFlagSeries": <Config extends OperationConfig>(idOrSlug: string, flagId: string, options: { readonly params?: typeof FeatureFlagsGetFeatureFlagSeriesParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof FeatureFlagsGetFeatureFlagSeries200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FeatureFlagsGetFeatureFlagSeries400", typeof FeatureFlagsGetFeatureFlagSeries400.Type> | ApiError<"FeatureFlagsGetFeatureFlagSeries401", typeof FeatureFlagsGetFeatureFlagSeries401.Type> | ApiError<"FeatureFlagsGetFeatureFlagSeries403", typeof FeatureFlagsGetFeatureFlagSeries403.Type> | ApiError<"FeatureFlagsGetFeatureFlagSeries404", typeof FeatureFlagsGetFeatureFlagSeries404.Type> | ApiError<"FeatureFlagsGetFeatureFlagSeries500", typeof FeatureFlagsGetFeatureFlagSeries500.Type>>
  readonly "FeatureFlagsListFeatureFlagEvaluations": <Config extends OperationConfig>(idOrSlug: string, flagId: string, options: { readonly params?: typeof FeatureFlagsListFeatureFlagEvaluationsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof FeatureFlagsListFeatureFlagEvaluations200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FeatureFlagsListFeatureFlagEvaluations400", typeof FeatureFlagsListFeatureFlagEvaluations400.Type> | ApiError<"FeatureFlagsListFeatureFlagEvaluations401", typeof FeatureFlagsListFeatureFlagEvaluations401.Type> | ApiError<"FeatureFlagsListFeatureFlagEvaluations403", typeof FeatureFlagsListFeatureFlagEvaluations403.Type> | ApiError<"FeatureFlagsListFeatureFlagEvaluations404", typeof FeatureFlagsListFeatureFlagEvaluations404.Type> | ApiError<"FeatureFlagsListFeatureFlagEvaluations500", typeof FeatureFlagsListFeatureFlagEvaluations500.Type>>
  readonly "FeatureFlagsTestFeatureFlag": <Config extends OperationConfig>(idOrSlug: string, flagId: string, options: { readonly payload: typeof FeatureFlagsTestFeatureFlagRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof FeatureFlagsTestFeatureFlag200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FeatureFlagsTestFeatureFlag400", typeof FeatureFlagsTestFeatureFlag400.Type> | ApiError<"FeatureFlagsTestFeatureFlag401", typeof FeatureFlagsTestFeatureFlag401.Type> | ApiError<"FeatureFlagsTestFeatureFlag403", typeof FeatureFlagsTestFeatureFlag403.Type> | ApiError<"FeatureFlagsTestFeatureFlag404", typeof FeatureFlagsTestFeatureFlag404.Type> | ApiError<"FeatureFlagsTestFeatureFlag500", typeof FeatureFlagsTestFeatureFlag500.Type>>
  readonly "FeatureFlagsListFeatureFlagSegments": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof FeatureFlagsListFeatureFlagSegments200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FeatureFlagsListFeatureFlagSegments400", typeof FeatureFlagsListFeatureFlagSegments400.Type> | ApiError<"FeatureFlagsListFeatureFlagSegments401", typeof FeatureFlagsListFeatureFlagSegments401.Type> | ApiError<"FeatureFlagsListFeatureFlagSegments403", typeof FeatureFlagsListFeatureFlagSegments403.Type> | ApiError<"FeatureFlagsListFeatureFlagSegments404", typeof FeatureFlagsListFeatureFlagSegments404.Type> | ApiError<"FeatureFlagsListFeatureFlagSegments500", typeof FeatureFlagsListFeatureFlagSegments500.Type>>
  readonly "FeatureFlagsCreateFeatureFlagSegment": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof FeatureFlagsCreateFeatureFlagSegmentRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof FeatureFlagsCreateFeatureFlagSegment200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FeatureFlagsCreateFeatureFlagSegment400", typeof FeatureFlagsCreateFeatureFlagSegment400.Type> | ApiError<"FeatureFlagsCreateFeatureFlagSegment401", typeof FeatureFlagsCreateFeatureFlagSegment401.Type> | ApiError<"FeatureFlagsCreateFeatureFlagSegment403", typeof FeatureFlagsCreateFeatureFlagSegment403.Type> | ApiError<"FeatureFlagsCreateFeatureFlagSegment404", typeof FeatureFlagsCreateFeatureFlagSegment404.Type> | ApiError<"FeatureFlagsCreateFeatureFlagSegment500", typeof FeatureFlagsCreateFeatureFlagSegment500.Type>>
  readonly "FeatureFlagsUpdateFeatureFlagSegment": <Config extends OperationConfig>(idOrSlug: string, segmentId: string, options: { readonly payload: typeof FeatureFlagsUpdateFeatureFlagSegmentRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof FeatureFlagsUpdateFeatureFlagSegment200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FeatureFlagsUpdateFeatureFlagSegment400", typeof FeatureFlagsUpdateFeatureFlagSegment400.Type> | ApiError<"FeatureFlagsUpdateFeatureFlagSegment401", typeof FeatureFlagsUpdateFeatureFlagSegment401.Type> | ApiError<"FeatureFlagsUpdateFeatureFlagSegment403", typeof FeatureFlagsUpdateFeatureFlagSegment403.Type> | ApiError<"FeatureFlagsUpdateFeatureFlagSegment404", typeof FeatureFlagsUpdateFeatureFlagSegment404.Type> | ApiError<"FeatureFlagsUpdateFeatureFlagSegment500", typeof FeatureFlagsUpdateFeatureFlagSegment500.Type>>
  readonly "FeatureFlagsDeleteFeatureFlagSegment": <Config extends OperationConfig>(idOrSlug: string, segmentId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FeatureFlagsDeleteFeatureFlagSegment400", typeof FeatureFlagsDeleteFeatureFlagSegment400.Type> | ApiError<"FeatureFlagsDeleteFeatureFlagSegment401", typeof FeatureFlagsDeleteFeatureFlagSegment401.Type> | ApiError<"FeatureFlagsDeleteFeatureFlagSegment403", typeof FeatureFlagsDeleteFeatureFlagSegment403.Type> | ApiError<"FeatureFlagsDeleteFeatureFlagSegment404", typeof FeatureFlagsDeleteFeatureFlagSegment404.Type> | ApiError<"FeatureFlagsDeleteFeatureFlagSegment500", typeof FeatureFlagsDeleteFeatureFlagSegment500.Type>>
  readonly "FeatureFlagsListFeatureFlagUserStates": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params: typeof FeatureFlagsListFeatureFlagUserStatesParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof FeatureFlagsListFeatureFlagUserStates200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FeatureFlagsListFeatureFlagUserStates400", typeof FeatureFlagsListFeatureFlagUserStates400.Type> | ApiError<"FeatureFlagsListFeatureFlagUserStates401", typeof FeatureFlagsListFeatureFlagUserStates401.Type> | ApiError<"FeatureFlagsListFeatureFlagUserStates403", typeof FeatureFlagsListFeatureFlagUserStates403.Type> | ApiError<"FeatureFlagsListFeatureFlagUserStates404", typeof FeatureFlagsListFeatureFlagUserStates404.Type> | ApiError<"FeatureFlagsListFeatureFlagUserStates500", typeof FeatureFlagsListFeatureFlagUserStates500.Type>>
  readonly "FunnelsListFunnels": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof FunnelsListFunnels200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FunnelsListFunnels400", typeof FunnelsListFunnels400.Type> | ApiError<"FunnelsListFunnels401", typeof FunnelsListFunnels401.Type> | ApiError<"FunnelsListFunnels403", typeof FunnelsListFunnels403.Type> | ApiError<"FunnelsListFunnels404", typeof FunnelsListFunnels404.Type> | ApiError<"FunnelsListFunnels500", typeof FunnelsListFunnels500.Type> | ApiError<"FunnelsListFunnels503", typeof FunnelsListFunnels503.Type>>
  readonly "FunnelsCreateFunnel": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof FunnelsCreateFunnelRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof FunnelsCreateFunnel200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FunnelsCreateFunnel400", typeof FunnelsCreateFunnel400.Type> | ApiError<"FunnelsCreateFunnel401", typeof FunnelsCreateFunnel401.Type> | ApiError<"FunnelsCreateFunnel403", typeof FunnelsCreateFunnel403.Type> | ApiError<"FunnelsCreateFunnel404", typeof FunnelsCreateFunnel404.Type> | ApiError<"FunnelsCreateFunnel500", typeof FunnelsCreateFunnel500.Type> | ApiError<"FunnelsCreateFunnel503", typeof FunnelsCreateFunnel503.Type>>
  readonly "FunnelsGetFunnel": <Config extends OperationConfig>(idOrSlug: string, funnelId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof FunnelsGetFunnel200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FunnelsGetFunnel400", typeof FunnelsGetFunnel400.Type> | ApiError<"FunnelsGetFunnel401", typeof FunnelsGetFunnel401.Type> | ApiError<"FunnelsGetFunnel403", typeof FunnelsGetFunnel403.Type> | ApiError<"FunnelsGetFunnel404", typeof FunnelsGetFunnel404.Type> | ApiError<"FunnelsGetFunnel500", typeof FunnelsGetFunnel500.Type> | ApiError<"FunnelsGetFunnel503", typeof FunnelsGetFunnel503.Type>>
  readonly "FunnelsDeleteFunnel": <Config extends OperationConfig>(idOrSlug: string, funnelId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FunnelsDeleteFunnel400", typeof FunnelsDeleteFunnel400.Type> | ApiError<"FunnelsDeleteFunnel401", typeof FunnelsDeleteFunnel401.Type> | ApiError<"FunnelsDeleteFunnel403", typeof FunnelsDeleteFunnel403.Type> | ApiError<"FunnelsDeleteFunnel404", typeof FunnelsDeleteFunnel404.Type> | ApiError<"FunnelsDeleteFunnel500", typeof FunnelsDeleteFunnel500.Type> | ApiError<"FunnelsDeleteFunnel503", typeof FunnelsDeleteFunnel503.Type>>
  readonly "FunnelsUpdateFunnel": <Config extends OperationConfig>(idOrSlug: string, funnelId: string, options: { readonly payload: typeof FunnelsUpdateFunnelRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof FunnelsUpdateFunnel200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FunnelsUpdateFunnel400", typeof FunnelsUpdateFunnel400.Type> | ApiError<"FunnelsUpdateFunnel401", typeof FunnelsUpdateFunnel401.Type> | ApiError<"FunnelsUpdateFunnel403", typeof FunnelsUpdateFunnel403.Type> | ApiError<"FunnelsUpdateFunnel404", typeof FunnelsUpdateFunnel404.Type> | ApiError<"FunnelsUpdateFunnel500", typeof FunnelsUpdateFunnel500.Type> | ApiError<"FunnelsUpdateFunnel503", typeof FunnelsUpdateFunnel503.Type>>
  readonly "FunnelsDuplicateFunnel": <Config extends OperationConfig>(idOrSlug: string, funnelId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof FunnelsDuplicateFunnel200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"FunnelsDuplicateFunnel400", typeof FunnelsDuplicateFunnel400.Type> | ApiError<"FunnelsDuplicateFunnel401", typeof FunnelsDuplicateFunnel401.Type> | ApiError<"FunnelsDuplicateFunnel403", typeof FunnelsDuplicateFunnel403.Type> | ApiError<"FunnelsDuplicateFunnel404", typeof FunnelsDuplicateFunnel404.Type> | ApiError<"FunnelsDuplicateFunnel500", typeof FunnelsDuplicateFunnel500.Type> | ApiError<"FunnelsDuplicateFunnel503", typeof FunnelsDuplicateFunnel503.Type>>
  readonly "ImagesCreateImageUploadUrl": <Config extends OperationConfig>(options: { readonly payload: typeof ImagesCreateImageUploadUrlRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ImagesCreateImageUploadUrl200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ImagesCreateImageUploadUrl401", typeof ImagesCreateImageUploadUrl401.Type> | ApiError<"ImagesCreateImageUploadUrl403", typeof ImagesCreateImageUploadUrl403.Type> | ApiError<"ImagesCreateImageUploadUrl404", typeof ImagesCreateImageUploadUrl404.Type> | ApiError<"ImagesCreateImageUploadUrl500", typeof ImagesCreateImageUploadUrl500.Type> | ApiError<"ImagesCreateImageUploadUrl502", typeof ImagesCreateImageUploadUrl502.Type>>
  readonly "ImagesDeleteImage": <Config extends OperationConfig>(imageId: string, options: { readonly params: typeof ImagesDeleteImageParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ImagesDeleteImage401", typeof ImagesDeleteImage401.Type> | ApiError<"ImagesDeleteImage403", typeof ImagesDeleteImage403.Type> | ApiError<"ImagesDeleteImage404", typeof ImagesDeleteImage404.Type> | ApiError<"ImagesDeleteImage500", typeof ImagesDeleteImage500.Type> | ApiError<"ImagesDeleteImage502", typeof ImagesDeleteImage502.Type>>
  readonly "MetricsQueryChartAst": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof MetricsQueryChartAstRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof MetricsQueryChartAst200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"MetricsQueryChartAst400", typeof MetricsQueryChartAst400.Type> | ApiError<"MetricsQueryChartAst401", typeof MetricsQueryChartAst401.Type> | ApiError<"MetricsQueryChartAst403", typeof MetricsQueryChartAst403.Type> | ApiError<"MetricsQueryChartAst404", typeof MetricsQueryChartAst404.Type> | ApiError<"MetricsQueryChartAst500", typeof MetricsQueryChartAst500.Type>>
  readonly "MetricsGetPreviewData": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof MetricsGetPreviewDataRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof MetricsGetPreviewData200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"MetricsGetPreviewData400", typeof MetricsGetPreviewData400.Type> | ApiError<"MetricsGetPreviewData401", typeof MetricsGetPreviewData401.Type> | ApiError<"MetricsGetPreviewData403", typeof MetricsGetPreviewData403.Type> | ApiError<"MetricsGetPreviewData404", typeof MetricsGetPreviewData404.Type> | ApiError<"MetricsGetPreviewData500", typeof MetricsGetPreviewData500.Type>>
  readonly "MetricsLoadDashboardData": <Config extends OperationConfig>(options: { readonly payload: typeof MetricsLoadDashboardDataRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof MetricsLoadDashboardData200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"MetricsLoadDashboardData400", typeof MetricsLoadDashboardData400.Type> | ApiError<"MetricsLoadDashboardData401", typeof MetricsLoadDashboardData401.Type> | ApiError<"MetricsLoadDashboardData403", typeof MetricsLoadDashboardData403.Type> | ApiError<"MetricsLoadDashboardData404", typeof MetricsLoadDashboardData404.Type> | ApiError<"MetricsLoadDashboardData500", typeof MetricsLoadDashboardData500.Type>>
  readonly "MetricsGetDashboardFilterSuggestions": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof MetricsGetDashboardFilterSuggestionsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof MetricsGetDashboardFilterSuggestions200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"MetricsGetDashboardFilterSuggestions400", typeof MetricsGetDashboardFilterSuggestions400.Type> | ApiError<"MetricsGetDashboardFilterSuggestions401", typeof MetricsGetDashboardFilterSuggestions401.Type> | ApiError<"MetricsGetDashboardFilterSuggestions403", typeof MetricsGetDashboardFilterSuggestions403.Type> | ApiError<"MetricsGetDashboardFilterSuggestions404", typeof MetricsGetDashboardFilterSuggestions404.Type> | ApiError<"MetricsGetDashboardFilterSuggestions500", typeof MetricsGetDashboardFilterSuggestions500.Type>>
  readonly "MetricsInterpretDashboardFilter": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof MetricsInterpretDashboardFilterRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof MetricsInterpretDashboardFilter200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"MetricsInterpretDashboardFilter400", typeof MetricsInterpretDashboardFilter400.Type> | ApiError<"MetricsInterpretDashboardFilter401", typeof MetricsInterpretDashboardFilter401.Type> | ApiError<"MetricsInterpretDashboardFilter403", typeof MetricsInterpretDashboardFilter403.Type> | ApiError<"MetricsInterpretDashboardFilter404", typeof MetricsInterpretDashboardFilter404.Type> | ApiError<"MetricsInterpretDashboardFilter500", typeof MetricsInterpretDashboardFilter500.Type>>
  readonly "MetricsGetProjectsDashboardData": <Config extends OperationConfig>(options: { readonly payload: typeof MetricsGetProjectsDashboardDataRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof MetricsGetProjectsDashboardData200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"MetricsGetProjectsDashboardData400", typeof MetricsGetProjectsDashboardData400.Type> | ApiError<"MetricsGetProjectsDashboardData401", typeof MetricsGetProjectsDashboardData401.Type> | ApiError<"MetricsGetProjectsDashboardData403", typeof MetricsGetProjectsDashboardData403.Type> | ApiError<"MetricsGetProjectsDashboardData404", typeof MetricsGetProjectsDashboardData404.Type> | ApiError<"MetricsGetProjectsDashboardData500", typeof MetricsGetProjectsDashboardData500.Type>>
  readonly "MetricsGetPublicChartData": <Config extends OperationConfig>(chartId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof MetricsGetPublicChartData200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"MetricsGetPublicChartData404", typeof MetricsGetPublicChartData404.Type> | ApiError<"MetricsGetPublicChartData500", typeof MetricsGetPublicChartData500.Type>>
  readonly "NetworkRulesListNetworkRules": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof NetworkRulesListNetworkRules200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"NetworkRulesListNetworkRules400", typeof NetworkRulesListNetworkRules400.Type> | ApiError<"NetworkRulesListNetworkRules401", typeof NetworkRulesListNetworkRules401.Type> | ApiError<"NetworkRulesListNetworkRules403", typeof NetworkRulesListNetworkRules403.Type> | ApiError<"NetworkRulesListNetworkRules404", typeof NetworkRulesListNetworkRules404.Type> | ApiError<"NetworkRulesListNetworkRules500", typeof NetworkRulesListNetworkRules500.Type>>
  readonly "NetworkRulesCreateNetworkRule": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof NetworkRulesCreateNetworkRuleRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof NetworkRulesCreateNetworkRule200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"NetworkRulesCreateNetworkRule400", typeof NetworkRulesCreateNetworkRule400.Type> | ApiError<"NetworkRulesCreateNetworkRule401", typeof NetworkRulesCreateNetworkRule401.Type> | ApiError<"NetworkRulesCreateNetworkRule403", typeof NetworkRulesCreateNetworkRule403.Type> | ApiError<"NetworkRulesCreateNetworkRule404", typeof NetworkRulesCreateNetworkRule404.Type> | ApiError<"NetworkRulesCreateNetworkRule500", typeof NetworkRulesCreateNetworkRule500.Type>>
  readonly "NetworkRulesDeleteNetworkRule": <Config extends OperationConfig>(idOrSlug: string, ruleId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"NetworkRulesDeleteNetworkRule400", typeof NetworkRulesDeleteNetworkRule400.Type> | ApiError<"NetworkRulesDeleteNetworkRule401", typeof NetworkRulesDeleteNetworkRule401.Type> | ApiError<"NetworkRulesDeleteNetworkRule403", typeof NetworkRulesDeleteNetworkRule403.Type> | ApiError<"NetworkRulesDeleteNetworkRule404", typeof NetworkRulesDeleteNetworkRule404.Type> | ApiError<"NetworkRulesDeleteNetworkRule500", typeof NetworkRulesDeleteNetworkRule500.Type>>
  readonly "ProjectsGetProjectBilling": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ProjectsGetProjectBilling200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsGetProjectBilling400", typeof ProjectsGetProjectBilling400.Type> | ApiError<"ProjectsGetProjectBilling401", typeof ProjectsGetProjectBilling401.Type> | ApiError<"ProjectsGetProjectBilling403", typeof ProjectsGetProjectBilling403.Type> | ApiError<"ProjectsGetProjectBilling404", typeof ProjectsGetProjectBilling404.Type> | ApiError<"ProjectsGetProjectBilling409", typeof ProjectsGetProjectBilling409.Type> | ApiError<"ProjectsGetProjectBilling500", typeof ProjectsGetProjectBilling500.Type>>
  readonly "ProjectsRequestDataExport": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof ProjectsRequestDataExportRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ProjectsRequestDataExport200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsRequestDataExport400", typeof ProjectsRequestDataExport400.Type> | ApiError<"ProjectsRequestDataExport401", typeof ProjectsRequestDataExport401.Type> | ApiError<"ProjectsRequestDataExport403", typeof ProjectsRequestDataExport403.Type> | ApiError<"ProjectsRequestDataExport404", typeof ProjectsRequestDataExport404.Type> | ApiError<"ProjectsRequestDataExport409", typeof ProjectsRequestDataExport409.Type> | ApiError<"ProjectsRequestDataExport500", typeof ProjectsRequestDataExport500.Type>>
  readonly "ProjectsListProjects": <Config extends OperationConfig>(options: { readonly params?: typeof ProjectsListProjectsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ProjectsListProjects200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsListProjects400", typeof ProjectsListProjects400.Type> | ApiError<"ProjectsListProjects401", typeof ProjectsListProjects401.Type> | ApiError<"ProjectsListProjects403", typeof ProjectsListProjects403.Type> | ApiError<"ProjectsListProjects404", typeof ProjectsListProjects404.Type> | ApiError<"ProjectsListProjects409", typeof ProjectsListProjects409.Type> | ApiError<"ProjectsListProjects500", typeof ProjectsListProjects500.Type>>
  readonly "ProjectsCreateProject": <Config extends OperationConfig>(options: { readonly payload: typeof ProjectsCreateProjectRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ProjectsCreateProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsCreateProject400", typeof ProjectsCreateProject400.Type> | ApiError<"ProjectsCreateProject401", typeof ProjectsCreateProject401.Type> | ApiError<"ProjectsCreateProject403", typeof ProjectsCreateProject403.Type> | ApiError<"ProjectsCreateProject404", typeof ProjectsCreateProject404.Type> | ApiError<"ProjectsCreateProject409", typeof ProjectsCreateProject409.Type> | ApiError<"ProjectsCreateProject500", typeof ProjectsCreateProject500.Type>>
  readonly "ProjectsListPublicProjects": <Config extends OperationConfig>(options: { readonly params?: typeof ProjectsListPublicProjectsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ProjectsListPublicProjects200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsListPublicProjects500", typeof ProjectsListPublicProjects500.Type>>
  readonly "ProjectsGetPublicProjectStats": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ProjectsGetPublicProjectStats200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsGetPublicProjectStats404", typeof ProjectsGetPublicProjectStats404.Type> | ApiError<"ProjectsGetPublicProjectStats500", typeof ProjectsGetPublicProjectStats500.Type>>
  readonly "ProjectsGetProject": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ProjectsGetProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsGetProject400", typeof ProjectsGetProject400.Type> | ApiError<"ProjectsGetProject401", typeof ProjectsGetProject401.Type> | ApiError<"ProjectsGetProject403", typeof ProjectsGetProject403.Type> | ApiError<"ProjectsGetProject404", typeof ProjectsGetProject404.Type> | ApiError<"ProjectsGetProject409", typeof ProjectsGetProject409.Type> | ApiError<"ProjectsGetProject500", typeof ProjectsGetProject500.Type>>
  readonly "ProjectsDeleteProject": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof ProjectsDeleteProjectRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsDeleteProject400", typeof ProjectsDeleteProject400.Type> | ApiError<"ProjectsDeleteProject401", typeof ProjectsDeleteProject401.Type> | ApiError<"ProjectsDeleteProject403", typeof ProjectsDeleteProject403.Type> | ApiError<"ProjectsDeleteProject404", typeof ProjectsDeleteProject404.Type> | ApiError<"ProjectsDeleteProject409", typeof ProjectsDeleteProject409.Type> | ApiError<"ProjectsDeleteProject500", typeof ProjectsDeleteProject500.Type>>
  readonly "ProjectsUpdateProject": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof ProjectsUpdateProjectRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ProjectsUpdateProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsUpdateProject400", typeof ProjectsUpdateProject400.Type> | ApiError<"ProjectsUpdateProject401", typeof ProjectsUpdateProject401.Type> | ApiError<"ProjectsUpdateProject403", typeof ProjectsUpdateProject403.Type> | ApiError<"ProjectsUpdateProject404", typeof ProjectsUpdateProject404.Type> | ApiError<"ProjectsUpdateProject409", typeof ProjectsUpdateProject409.Type> | ApiError<"ProjectsUpdateProject500", typeof ProjectsUpdateProject500.Type>>
  readonly "ProjectsCheckProjectData": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ProjectsCheckProjectData200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsCheckProjectData400", typeof ProjectsCheckProjectData400.Type> | ApiError<"ProjectsCheckProjectData401", typeof ProjectsCheckProjectData401.Type> | ApiError<"ProjectsCheckProjectData403", typeof ProjectsCheckProjectData403.Type> | ApiError<"ProjectsCheckProjectData404", typeof ProjectsCheckProjectData404.Type> | ApiError<"ProjectsCheckProjectData409", typeof ProjectsCheckProjectData409.Type> | ApiError<"ProjectsCheckProjectData500", typeof ProjectsCheckProjectData500.Type>>
  readonly "ProjectsCheckSlugAvailability": <Config extends OperationConfig>(slug: string, options: { readonly params?: typeof ProjectsCheckSlugAvailabilityParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ProjectsCheckSlugAvailability200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsCheckSlugAvailability400", typeof ProjectsCheckSlugAvailability400.Type> | ApiError<"ProjectsCheckSlugAvailability401", typeof ProjectsCheckSlugAvailability401.Type> | ApiError<"ProjectsCheckSlugAvailability403", typeof ProjectsCheckSlugAvailability403.Type> | ApiError<"ProjectsCheckSlugAvailability404", typeof ProjectsCheckSlugAvailability404.Type> | ApiError<"ProjectsCheckSlugAvailability409", typeof ProjectsCheckSlugAvailability409.Type> | ApiError<"ProjectsCheckSlugAvailability500", typeof ProjectsCheckSlugAvailability500.Type>>
  readonly "ProjectsMoveProject": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof ProjectsMoveProjectRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsMoveProject400", typeof ProjectsMoveProject400.Type> | ApiError<"ProjectsMoveProject401", typeof ProjectsMoveProject401.Type> | ApiError<"ProjectsMoveProject403", typeof ProjectsMoveProject403.Type> | ApiError<"ProjectsMoveProject404", typeof ProjectsMoveProject404.Type> | ApiError<"ProjectsMoveProject409", typeof ProjectsMoveProject409.Type> | ApiError<"ProjectsMoveProject500", typeof ProjectsMoveProject500.Type>>
  readonly "ProjectsWipeProjectData": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof ProjectsWipeProjectDataRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsWipeProjectData400", typeof ProjectsWipeProjectData400.Type> | ApiError<"ProjectsWipeProjectData401", typeof ProjectsWipeProjectData401.Type> | ApiError<"ProjectsWipeProjectData403", typeof ProjectsWipeProjectData403.Type> | ApiError<"ProjectsWipeProjectData404", typeof ProjectsWipeProjectData404.Type> | ApiError<"ProjectsWipeProjectData409", typeof ProjectsWipeProjectData409.Type> | ApiError<"ProjectsWipeProjectData500", typeof ProjectsWipeProjectData500.Type>>
  readonly "ProjectsResetProjectErrorTracking": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof ProjectsResetProjectErrorTrackingRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ProjectsResetProjectErrorTracking400", typeof ProjectsResetProjectErrorTracking400.Type> | ApiError<"ProjectsResetProjectErrorTracking401", typeof ProjectsResetProjectErrorTracking401.Type> | ApiError<"ProjectsResetProjectErrorTracking403", typeof ProjectsResetProjectErrorTracking403.Type> | ApiError<"ProjectsResetProjectErrorTracking404", typeof ProjectsResetProjectErrorTracking404.Type> | ApiError<"ProjectsResetProjectErrorTracking409", typeof ProjectsResetProjectErrorTracking409.Type> | ApiError<"ProjectsResetProjectErrorTracking500", typeof ProjectsResetProjectErrorTracking500.Type>>
  readonly "RetentionGetRetentionForProject": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params: typeof RetentionGetRetentionForProjectParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof RetentionGetRetentionForProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"RetentionGetRetentionForProject401", typeof RetentionGetRetentionForProject401.Type> | ApiError<"RetentionGetRetentionForProject403", typeof RetentionGetRetentionForProject403.Type> | ApiError<"RetentionGetRetentionForProject404", typeof RetentionGetRetentionForProject404.Type> | ApiError<"RetentionGetRetentionForProject500", typeof RetentionGetRetentionForProject500.Type>>
  readonly "RetentionGetRetentionDriversForProject": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params: typeof RetentionGetRetentionDriversForProjectParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof RetentionGetRetentionDriversForProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"RetentionGetRetentionDriversForProject401", typeof RetentionGetRetentionDriversForProject401.Type> | ApiError<"RetentionGetRetentionDriversForProject403", typeof RetentionGetRetentionDriversForProject403.Type> | ApiError<"RetentionGetRetentionDriversForProject404", typeof RetentionGetRetentionDriversForProject404.Type> | ApiError<"RetentionGetRetentionDriversForProject500", typeof RetentionGetRetentionDriversForProject500.Type>>
  readonly "ReplayInsightsListInsights": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof ReplayInsightsListInsightsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ReplayInsightsListInsights200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ReplayInsightsListInsights400", typeof ReplayInsightsListInsights400.Type> | ApiError<"ReplayInsightsListInsights401", typeof ReplayInsightsListInsights401.Type> | ApiError<"ReplayInsightsListInsights403", typeof ReplayInsightsListInsights403.Type> | ApiError<"ReplayInsightsListInsights404", typeof ReplayInsightsListInsights404.Type> | ApiError<"ReplayInsightsListInsights500", typeof ReplayInsightsListInsights500.Type>>
  readonly "ReplayInsightsGetInsight": <Config extends OperationConfig>(idOrSlug: string, insightId: string, options: { readonly params?: typeof ReplayInsightsGetInsightParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ReplayInsightsGetInsight200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ReplayInsightsGetInsight400", typeof ReplayInsightsGetInsight400.Type> | ApiError<"ReplayInsightsGetInsight401", typeof ReplayInsightsGetInsight401.Type> | ApiError<"ReplayInsightsGetInsight403", typeof ReplayInsightsGetInsight403.Type> | ApiError<"ReplayInsightsGetInsight404", typeof ReplayInsightsGetInsight404.Type> | ApiError<"ReplayInsightsGetInsight500", typeof ReplayInsightsGetInsight500.Type>>
  readonly "ReplayInsightsMarkInsightViewed": <Config extends OperationConfig>(idOrSlug: string, insightId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ReplayInsightsMarkInsightViewed400", typeof ReplayInsightsMarkInsightViewed400.Type> | ApiError<"ReplayInsightsMarkInsightViewed401", typeof ReplayInsightsMarkInsightViewed401.Type> | ApiError<"ReplayInsightsMarkInsightViewed403", typeof ReplayInsightsMarkInsightViewed403.Type> | ApiError<"ReplayInsightsMarkInsightViewed404", typeof ReplayInsightsMarkInsightViewed404.Type> | ApiError<"ReplayInsightsMarkInsightViewed500", typeof ReplayInsightsMarkInsightViewed500.Type>>
  readonly "ReplayInsightsUpdateInsightStatus": <Config extends OperationConfig>(idOrSlug: string, insightId: string, options: { readonly payload: typeof ReplayInsightsUpdateInsightStatusRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ReplayInsightsUpdateInsightStatus200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ReplayInsightsUpdateInsightStatus400", typeof ReplayInsightsUpdateInsightStatus400.Type> | ApiError<"ReplayInsightsUpdateInsightStatus401", typeof ReplayInsightsUpdateInsightStatus401.Type> | ApiError<"ReplayInsightsUpdateInsightStatus403", typeof ReplayInsightsUpdateInsightStatus403.Type> | ApiError<"ReplayInsightsUpdateInsightStatus404", typeof ReplayInsightsUpdateInsightStatus404.Type> | ApiError<"ReplayInsightsUpdateInsightStatus500", typeof ReplayInsightsUpdateInsightStatus500.Type>>
  readonly "ReplayInsightsMergeInsights": <Config extends OperationConfig>(idOrSlug: string, insightId: string, options: { readonly payload: typeof ReplayInsightsMergeInsightsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ReplayInsightsMergeInsights200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ReplayInsightsMergeInsights400", typeof ReplayInsightsMergeInsights400.Type> | ApiError<"ReplayInsightsMergeInsights401", typeof ReplayInsightsMergeInsights401.Type> | ApiError<"ReplayInsightsMergeInsights403", typeof ReplayInsightsMergeInsights403.Type> | ApiError<"ReplayInsightsMergeInsights404", typeof ReplayInsightsMergeInsights404.Type> | ApiError<"ReplayInsightsMergeInsights500", typeof ReplayInsightsMergeInsights500.Type>>
  readonly "ReplayInsightsSplitInsight": <Config extends OperationConfig>(idOrSlug: string, insightId: string, options: { readonly payload: typeof ReplayInsightsSplitInsightRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof ReplayInsightsSplitInsight200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"ReplayInsightsSplitInsight400", typeof ReplayInsightsSplitInsight400.Type> | ApiError<"ReplayInsightsSplitInsight401", typeof ReplayInsightsSplitInsight401.Type> | ApiError<"ReplayInsightsSplitInsight403", typeof ReplayInsightsSplitInsight403.Type> | ApiError<"ReplayInsightsSplitInsight404", typeof ReplayInsightsSplitInsight404.Type> | ApiError<"ReplayInsightsSplitInsight500", typeof ReplayInsightsSplitInsight500.Type>>
  readonly "SessionReplaysGetReplaySummary": <Config extends OperationConfig>(idOrSlug: string, sessionId: string, windowId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysGetReplaySummary200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysGetReplaySummary400", typeof SessionReplaysGetReplaySummary400.Type> | ApiError<"SessionReplaysGetReplaySummary401", typeof SessionReplaysGetReplaySummary401.Type> | ApiError<"SessionReplaysGetReplaySummary403", typeof SessionReplaysGetReplaySummary403.Type> | ApiError<"SessionReplaysGetReplaySummary404", typeof SessionReplaysGetReplaySummary404.Type> | ApiError<"SessionReplaysGetReplaySummary500", typeof SessionReplaysGetReplaySummary500.Type>>
  readonly "SessionReplaysSummarizeReplay": <Config extends OperationConfig>(idOrSlug: string, sessionId: string, windowId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysSummarizeReplay400", typeof SessionReplaysSummarizeReplay400.Type> | ApiError<"SessionReplaysSummarizeReplay401", typeof SessionReplaysSummarizeReplay401.Type> | ApiError<"SessionReplaysSummarizeReplay403", typeof SessionReplaysSummarizeReplay403.Type> | ApiError<"SessionReplaysSummarizeReplay404", typeof SessionReplaysSummarizeReplay404.Type> | ApiError<"SessionReplaysSummarizeReplay500", typeof SessionReplaysSummarizeReplay500.Type>>
  readonly "SessionReplaysGetReplaySummaryRules": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysGetReplaySummaryRules200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysGetReplaySummaryRules400", typeof SessionReplaysGetReplaySummaryRules400.Type> | ApiError<"SessionReplaysGetReplaySummaryRules401", typeof SessionReplaysGetReplaySummaryRules401.Type> | ApiError<"SessionReplaysGetReplaySummaryRules403", typeof SessionReplaysGetReplaySummaryRules403.Type> | ApiError<"SessionReplaysGetReplaySummaryRules404", typeof SessionReplaysGetReplaySummaryRules404.Type> | ApiError<"SessionReplaysGetReplaySummaryRules500", typeof SessionReplaysGetReplaySummaryRules500.Type>>
  readonly "SessionReplaysSaveReplaySummaryRules": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof SessionReplaysSaveReplaySummaryRulesRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysSaveReplaySummaryRules200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysSaveReplaySummaryRules400", typeof SessionReplaysSaveReplaySummaryRules400.Type> | ApiError<"SessionReplaysSaveReplaySummaryRules401", typeof SessionReplaysSaveReplaySummaryRules401.Type> | ApiError<"SessionReplaysSaveReplaySummaryRules403", typeof SessionReplaysSaveReplaySummaryRules403.Type> | ApiError<"SessionReplaysSaveReplaySummaryRules404", typeof SessionReplaysSaveReplaySummaryRules404.Type> | ApiError<"SessionReplaysSaveReplaySummaryRules500", typeof SessionReplaysSaveReplaySummaryRules500.Type>>
  readonly "SessionReplaysPreviewReplaySummaryRules": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof SessionReplaysPreviewReplaySummaryRulesRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysPreviewReplaySummaryRules200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysPreviewReplaySummaryRules400", typeof SessionReplaysPreviewReplaySummaryRules400.Type> | ApiError<"SessionReplaysPreviewReplaySummaryRules401", typeof SessionReplaysPreviewReplaySummaryRules401.Type> | ApiError<"SessionReplaysPreviewReplaySummaryRules403", typeof SessionReplaysPreviewReplaySummaryRules403.Type> | ApiError<"SessionReplaysPreviewReplaySummaryRules404", typeof SessionReplaysPreviewReplaySummaryRules404.Type> | ApiError<"SessionReplaysPreviewReplaySummaryRules500", typeof SessionReplaysPreviewReplaySummaryRules500.Type>>
  readonly "SessionReplaysListReplays": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof SessionReplaysListReplaysParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysListReplays200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysListReplays400", typeof SessionReplaysListReplays400.Type> | ApiError<"SessionReplaysListReplays401", typeof SessionReplaysListReplays401.Type> | ApiError<"SessionReplaysListReplays403", typeof SessionReplaysListReplays403.Type> | ApiError<"SessionReplaysListReplays404", typeof SessionReplaysListReplays404.Type> | ApiError<"SessionReplaysListReplays500", typeof SessionReplaysListReplays500.Type>>
  readonly "SessionReplaysGetReplayCount": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof SessionReplaysGetReplayCountParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysGetReplayCount200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysGetReplayCount400", typeof SessionReplaysGetReplayCount400.Type> | ApiError<"SessionReplaysGetReplayCount401", typeof SessionReplaysGetReplayCount401.Type> | ApiError<"SessionReplaysGetReplayCount403", typeof SessionReplaysGetReplayCount403.Type> | ApiError<"SessionReplaysGetReplayCount404", typeof SessionReplaysGetReplayCount404.Type> | ApiError<"SessionReplaysGetReplayCount500", typeof SessionReplaysGetReplayCount500.Type>>
  readonly "SessionReplaysListReplayCollections": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof SessionReplaysListReplayCollectionsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysListReplayCollections200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysListReplayCollections400", typeof SessionReplaysListReplayCollections400.Type> | ApiError<"SessionReplaysListReplayCollections401", typeof SessionReplaysListReplayCollections401.Type> | ApiError<"SessionReplaysListReplayCollections403", typeof SessionReplaysListReplayCollections403.Type> | ApiError<"SessionReplaysListReplayCollections404", typeof SessionReplaysListReplayCollections404.Type> | ApiError<"SessionReplaysListReplayCollections500", typeof SessionReplaysListReplayCollections500.Type>>
  readonly "SessionReplaysCreateReplayCollection": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof SessionReplaysCreateReplayCollectionRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysCreateReplayCollection200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysCreateReplayCollection400", typeof SessionReplaysCreateReplayCollection400.Type> | ApiError<"SessionReplaysCreateReplayCollection401", typeof SessionReplaysCreateReplayCollection401.Type> | ApiError<"SessionReplaysCreateReplayCollection403", typeof SessionReplaysCreateReplayCollection403.Type> | ApiError<"SessionReplaysCreateReplayCollection404", typeof SessionReplaysCreateReplayCollection404.Type> | ApiError<"SessionReplaysCreateReplayCollection500", typeof SessionReplaysCreateReplayCollection500.Type>>
  readonly "SessionReplaysDeleteReplayCollection": <Config extends OperationConfig>(idOrSlug: string, collectionId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysDeleteReplayCollection400", typeof SessionReplaysDeleteReplayCollection400.Type> | ApiError<"SessionReplaysDeleteReplayCollection401", typeof SessionReplaysDeleteReplayCollection401.Type> | ApiError<"SessionReplaysDeleteReplayCollection403", typeof SessionReplaysDeleteReplayCollection403.Type> | ApiError<"SessionReplaysDeleteReplayCollection404", typeof SessionReplaysDeleteReplayCollection404.Type> | ApiError<"SessionReplaysDeleteReplayCollection500", typeof SessionReplaysDeleteReplayCollection500.Type>>
  readonly "SessionReplaysUpdateReplayCollection": <Config extends OperationConfig>(idOrSlug: string, collectionId: string, options: { readonly payload: typeof SessionReplaysUpdateReplayCollectionRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysUpdateReplayCollection200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysUpdateReplayCollection400", typeof SessionReplaysUpdateReplayCollection400.Type> | ApiError<"SessionReplaysUpdateReplayCollection401", typeof SessionReplaysUpdateReplayCollection401.Type> | ApiError<"SessionReplaysUpdateReplayCollection403", typeof SessionReplaysUpdateReplayCollection403.Type> | ApiError<"SessionReplaysUpdateReplayCollection404", typeof SessionReplaysUpdateReplayCollection404.Type> | ApiError<"SessionReplaysUpdateReplayCollection500", typeof SessionReplaysUpdateReplayCollection500.Type>>
  readonly "SessionReplaysListReplayCollectionAssignments": <Config extends OperationConfig>(idOrSlug: string, sessionId: string, windowId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysListReplayCollectionAssignments200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysListReplayCollectionAssignments400", typeof SessionReplaysListReplayCollectionAssignments400.Type> | ApiError<"SessionReplaysListReplayCollectionAssignments401", typeof SessionReplaysListReplayCollectionAssignments401.Type> | ApiError<"SessionReplaysListReplayCollectionAssignments403", typeof SessionReplaysListReplayCollectionAssignments403.Type> | ApiError<"SessionReplaysListReplayCollectionAssignments404", typeof SessionReplaysListReplayCollectionAssignments404.Type> | ApiError<"SessionReplaysListReplayCollectionAssignments500", typeof SessionReplaysListReplayCollectionAssignments500.Type>>
  readonly "SessionReplaysSetReplayCollectionAssignments": <Config extends OperationConfig>(idOrSlug: string, sessionId: string, windowId: string, options: { readonly payload: typeof SessionReplaysSetReplayCollectionAssignmentsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysSetReplayCollectionAssignments200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysSetReplayCollectionAssignments400", typeof SessionReplaysSetReplayCollectionAssignments400.Type> | ApiError<"SessionReplaysSetReplayCollectionAssignments401", typeof SessionReplaysSetReplayCollectionAssignments401.Type> | ApiError<"SessionReplaysSetReplayCollectionAssignments403", typeof SessionReplaysSetReplayCollectionAssignments403.Type> | ApiError<"SessionReplaysSetReplayCollectionAssignments404", typeof SessionReplaysSetReplayCollectionAssignments404.Type> | ApiError<"SessionReplaysSetReplayCollectionAssignments500", typeof SessionReplaysSetReplayCollectionAssignments500.Type>>
  readonly "SessionReplaysGetReplayEventsPage": <Config extends OperationConfig>(idOrSlug: string, sessionId: string, windowId: string, options: { readonly params?: typeof SessionReplaysGetReplayEventsPageParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysGetReplayEventsPage200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysGetReplayEventsPage400", typeof SessionReplaysGetReplayEventsPage400.Type> | ApiError<"SessionReplaysGetReplayEventsPage401", typeof SessionReplaysGetReplayEventsPage401.Type> | ApiError<"SessionReplaysGetReplayEventsPage403", typeof SessionReplaysGetReplayEventsPage403.Type> | ApiError<"SessionReplaysGetReplayEventsPage404", typeof SessionReplaysGetReplayEventsPage404.Type> | ApiError<"SessionReplaysGetReplayEventsPage500", typeof SessionReplaysGetReplayEventsPage500.Type>>
  readonly "SessionReplaysGetSessionErrors": <Config extends OperationConfig>(idOrSlug: string, sessionId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysGetSessionErrors200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysGetSessionErrors400", typeof SessionReplaysGetSessionErrors400.Type> | ApiError<"SessionReplaysGetSessionErrors401", typeof SessionReplaysGetSessionErrors401.Type> | ApiError<"SessionReplaysGetSessionErrors403", typeof SessionReplaysGetSessionErrors403.Type> | ApiError<"SessionReplaysGetSessionErrors404", typeof SessionReplaysGetSessionErrors404.Type> | ApiError<"SessionReplaysGetSessionErrors500", typeof SessionReplaysGetSessionErrors500.Type>>
  readonly "SessionReplaysGetSessionVitals": <Config extends OperationConfig>(idOrSlug: string, sessionId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysGetSessionVitals200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysGetSessionVitals400", typeof SessionReplaysGetSessionVitals400.Type> | ApiError<"SessionReplaysGetSessionVitals401", typeof SessionReplaysGetSessionVitals401.Type> | ApiError<"SessionReplaysGetSessionVitals403", typeof SessionReplaysGetSessionVitals403.Type> | ApiError<"SessionReplaysGetSessionVitals404", typeof SessionReplaysGetSessionVitals404.Type> | ApiError<"SessionReplaysGetSessionVitals500", typeof SessionReplaysGetSessionVitals500.Type>>
  readonly "SessionReplaysGetSessionCustomEvents": <Config extends OperationConfig>(idOrSlug: string, sessionId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SessionReplaysGetSessionCustomEvents200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysGetSessionCustomEvents400", typeof SessionReplaysGetSessionCustomEvents400.Type> | ApiError<"SessionReplaysGetSessionCustomEvents401", typeof SessionReplaysGetSessionCustomEvents401.Type> | ApiError<"SessionReplaysGetSessionCustomEvents403", typeof SessionReplaysGetSessionCustomEvents403.Type> | ApiError<"SessionReplaysGetSessionCustomEvents404", typeof SessionReplaysGetSessionCustomEvents404.Type> | ApiError<"SessionReplaysGetSessionCustomEvents500", typeof SessionReplaysGetSessionCustomEvents500.Type>>
  readonly "SessionReplaysDeleteReplay": <Config extends OperationConfig>(idOrSlug: string, sessionId: string, windowId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysDeleteReplay400", typeof SessionReplaysDeleteReplay400.Type> | ApiError<"SessionReplaysDeleteReplay401", typeof SessionReplaysDeleteReplay401.Type> | ApiError<"SessionReplaysDeleteReplay403", typeof SessionReplaysDeleteReplay403.Type> | ApiError<"SessionReplaysDeleteReplay404", typeof SessionReplaysDeleteReplay404.Type> | ApiError<"SessionReplaysDeleteReplay500", typeof SessionReplaysDeleteReplay500.Type>>
  readonly "SessionReplaysDeleteAllReplays": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysDeleteAllReplays400", typeof SessionReplaysDeleteAllReplays400.Type> | ApiError<"SessionReplaysDeleteAllReplays401", typeof SessionReplaysDeleteAllReplays401.Type> | ApiError<"SessionReplaysDeleteAllReplays403", typeof SessionReplaysDeleteAllReplays403.Type> | ApiError<"SessionReplaysDeleteAllReplays404", typeof SessionReplaysDeleteAllReplays404.Type> | ApiError<"SessionReplaysDeleteAllReplays500", typeof SessionReplaysDeleteAllReplays500.Type>>
  readonly "SessionReplaysMarkReplayViewed": <Config extends OperationConfig>(idOrSlug: string, sessionId: string, windowId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SessionReplaysMarkReplayViewed400", typeof SessionReplaysMarkReplayViewed400.Type> | ApiError<"SessionReplaysMarkReplayViewed401", typeof SessionReplaysMarkReplayViewed401.Type> | ApiError<"SessionReplaysMarkReplayViewed403", typeof SessionReplaysMarkReplayViewed403.Type> | ApiError<"SessionReplaysMarkReplayViewed404", typeof SessionReplaysMarkReplayViewed404.Type> | ApiError<"SessionReplaysMarkReplayViewed500", typeof SessionReplaysMarkReplayViewed500.Type>>
  readonly "SourceMapsGetUploadedSourceMaps": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SourceMapsGetUploadedSourceMaps200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SourceMapsGetUploadedSourceMaps401", typeof SourceMapsGetUploadedSourceMaps401.Type> | ApiError<"SourceMapsGetUploadedSourceMaps403", typeof SourceMapsGetUploadedSourceMaps403.Type> | ApiError<"SourceMapsGetUploadedSourceMaps404", typeof SourceMapsGetUploadedSourceMaps404.Type> | ApiError<"SourceMapsGetUploadedSourceMaps500", typeof SourceMapsGetUploadedSourceMaps500.Type>>
  readonly "SourceMapsDeleteUploadedSourceMap": <Config extends OperationConfig>(idOrSlug: string, s3Key: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SourceMapsDeleteUploadedSourceMap401", typeof SourceMapsDeleteUploadedSourceMap401.Type> | ApiError<"SourceMapsDeleteUploadedSourceMap403", typeof SourceMapsDeleteUploadedSourceMap403.Type> | ApiError<"SourceMapsDeleteUploadedSourceMap404", typeof SourceMapsDeleteUploadedSourceMap404.Type> | ApiError<"SourceMapsDeleteUploadedSourceMap500", typeof SourceMapsDeleteUploadedSourceMap500.Type>>
  readonly "SourceMapsWipeUploadedSourceMaps": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SourceMapsWipeUploadedSourceMaps401", typeof SourceMapsWipeUploadedSourceMaps401.Type> | ApiError<"SourceMapsWipeUploadedSourceMaps403", typeof SourceMapsWipeUploadedSourceMaps403.Type> | ApiError<"SourceMapsWipeUploadedSourceMaps404", typeof SourceMapsWipeUploadedSourceMaps404.Type> | ApiError<"SourceMapsWipeUploadedSourceMaps500", typeof SourceMapsWipeUploadedSourceMaps500.Type>>
  readonly "SourceMapsCleanupUploadedSourceMaps": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SourceMapsCleanupUploadedSourceMaps200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SourceMapsCleanupUploadedSourceMaps401", typeof SourceMapsCleanupUploadedSourceMaps401.Type> | ApiError<"SourceMapsCleanupUploadedSourceMaps403", typeof SourceMapsCleanupUploadedSourceMaps403.Type> | ApiError<"SourceMapsCleanupUploadedSourceMaps404", typeof SourceMapsCleanupUploadedSourceMaps404.Type> | ApiError<"SourceMapsCleanupUploadedSourceMaps500", typeof SourceMapsCleanupUploadedSourceMaps500.Type>>
  readonly "SourceMapsGetSourceMapApiKey": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SourceMapsGetSourceMapApiKey200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SourceMapsGetSourceMapApiKey401", typeof SourceMapsGetSourceMapApiKey401.Type> | ApiError<"SourceMapsGetSourceMapApiKey403", typeof SourceMapsGetSourceMapApiKey403.Type> | ApiError<"SourceMapsGetSourceMapApiKey404", typeof SourceMapsGetSourceMapApiKey404.Type> | ApiError<"SourceMapsGetSourceMapApiKey500", typeof SourceMapsGetSourceMapApiKey500.Type>>
  readonly "SourceMapsCreateSourceMapApiKey": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SourceMapsCreateSourceMapApiKey200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SourceMapsCreateSourceMapApiKey401", typeof SourceMapsCreateSourceMapApiKey401.Type> | ApiError<"SourceMapsCreateSourceMapApiKey403", typeof SourceMapsCreateSourceMapApiKey403.Type> | ApiError<"SourceMapsCreateSourceMapApiKey404", typeof SourceMapsCreateSourceMapApiKey404.Type> | ApiError<"SourceMapsCreateSourceMapApiKey500", typeof SourceMapsCreateSourceMapApiKey500.Type>>
  readonly "SourceMapsDeleteSourceMapApiKey": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SourceMapsDeleteSourceMapApiKey200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"SourceMapsDeleteSourceMapApiKey401", typeof SourceMapsDeleteSourceMapApiKey401.Type> | ApiError<"SourceMapsDeleteSourceMapApiKey403", typeof SourceMapsDeleteSourceMapApiKey403.Type> | ApiError<"SourceMapsDeleteSourceMapApiKey404", typeof SourceMapsDeleteSourceMapApiKey404.Type> | ApiError<"SourceMapsDeleteSourceMapApiKey500", typeof SourceMapsDeleteSourceMapApiKey500.Type>>
  readonly "UsersGetUserVitals": <Config extends OperationConfig>(idOrSlug: string, userKey: string, options: { readonly params?: typeof UsersGetUserVitalsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof UsersGetUserVitals200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"UsersGetUserVitals400", typeof UsersGetUserVitals400.Type> | ApiError<"UsersGetUserVitals401", typeof UsersGetUserVitals401.Type> | ApiError<"UsersGetUserVitals403", typeof UsersGetUserVitals403.Type> | ApiError<"UsersGetUserVitals404", typeof UsersGetUserVitals404.Type> | ApiError<"UsersGetUserVitals500", typeof UsersGetUserVitals500.Type> | ApiError<"UsersGetUserVitals503", typeof UsersGetUserVitals503.Type>>
  readonly "UsersGetUserSessionsPage": <Config extends OperationConfig>(idOrSlug: string, userKey: string, options: { readonly params?: typeof UsersGetUserSessionsPageParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof UsersGetUserSessionsPage200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"UsersGetUserSessionsPage400", typeof UsersGetUserSessionsPage400.Type> | ApiError<"UsersGetUserSessionsPage401", typeof UsersGetUserSessionsPage401.Type> | ApiError<"UsersGetUserSessionsPage403", typeof UsersGetUserSessionsPage403.Type> | ApiError<"UsersGetUserSessionsPage404", typeof UsersGetUserSessionsPage404.Type> | ApiError<"UsersGetUserSessionsPage500", typeof UsersGetUserSessionsPage500.Type> | ApiError<"UsersGetUserSessionsPage503", typeof UsersGetUserSessionsPage503.Type>>
  readonly "UsersGetUserErrorsPage": <Config extends OperationConfig>(idOrSlug: string, userKey: string, options: { readonly params?: typeof UsersGetUserErrorsPageParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof UsersGetUserErrorsPage200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"UsersGetUserErrorsPage400", typeof UsersGetUserErrorsPage400.Type> | ApiError<"UsersGetUserErrorsPage401", typeof UsersGetUserErrorsPage401.Type> | ApiError<"UsersGetUserErrorsPage403", typeof UsersGetUserErrorsPage403.Type> | ApiError<"UsersGetUserErrorsPage404", typeof UsersGetUserErrorsPage404.Type> | ApiError<"UsersGetUserErrorsPage500", typeof UsersGetUserErrorsPage500.Type> | ApiError<"UsersGetUserErrorsPage503", typeof UsersGetUserErrorsPage503.Type>>
  readonly "UsersGetUserTimelinePage": <Config extends OperationConfig>(idOrSlug: string, userKey: string, options: { readonly params?: typeof UsersGetUserTimelinePageParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof UsersGetUserTimelinePage200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"UsersGetUserTimelinePage400", typeof UsersGetUserTimelinePage400.Type> | ApiError<"UsersGetUserTimelinePage401", typeof UsersGetUserTimelinePage401.Type> | ApiError<"UsersGetUserTimelinePage403", typeof UsersGetUserTimelinePage403.Type> | ApiError<"UsersGetUserTimelinePage404", typeof UsersGetUserTimelinePage404.Type> | ApiError<"UsersGetUserTimelinePage500", typeof UsersGetUserTimelinePage500.Type> | ApiError<"UsersGetUserTimelinePage503", typeof UsersGetUserTimelinePage503.Type>>
  readonly "UsersGetUserActivityByKey": <Config extends OperationConfig>(idOrSlug: string, userKey: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof UsersGetUserActivityByKey200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"UsersGetUserActivityByKey400", typeof UsersGetUserActivityByKey400.Type> | ApiError<"UsersGetUserActivityByKey401", typeof UsersGetUserActivityByKey401.Type> | ApiError<"UsersGetUserActivityByKey403", typeof UsersGetUserActivityByKey403.Type> | ApiError<"UsersGetUserActivityByKey404", typeof UsersGetUserActivityByKey404.Type> | ApiError<"UsersGetUserActivityByKey500", typeof UsersGetUserActivityByKey500.Type> | ApiError<"UsersGetUserActivityByKey503", typeof UsersGetUserActivityByKey503.Type>>
  readonly "UsersGetUserDataOperation": <Config extends OperationConfig>(idOrSlug: string, operationId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof UsersGetUserDataOperation200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"UsersGetUserDataOperation400", typeof UsersGetUserDataOperation400.Type> | ApiError<"UsersGetUserDataOperation401", typeof UsersGetUserDataOperation401.Type> | ApiError<"UsersGetUserDataOperation403", typeof UsersGetUserDataOperation403.Type> | ApiError<"UsersGetUserDataOperation404", typeof UsersGetUserDataOperation404.Type> | ApiError<"UsersGetUserDataOperation500", typeof UsersGetUserDataOperation500.Type> | ApiError<"UsersGetUserDataOperation503", typeof UsersGetUserDataOperation503.Type>>
  readonly "UsersGetUsersDailyActive": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof UsersGetUsersDailyActiveParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof UsersGetUsersDailyActive200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"UsersGetUsersDailyActive400", typeof UsersGetUsersDailyActive400.Type> | ApiError<"UsersGetUsersDailyActive401", typeof UsersGetUsersDailyActive401.Type> | ApiError<"UsersGetUsersDailyActive403", typeof UsersGetUsersDailyActive403.Type> | ApiError<"UsersGetUsersDailyActive404", typeof UsersGetUsersDailyActive404.Type> | ApiError<"UsersGetUsersDailyActive500", typeof UsersGetUsersDailyActive500.Type> | ApiError<"UsersGetUsersDailyActive503", typeof UsersGetUsersDailyActive503.Type>>
  readonly "UsersSearchUsersForProject": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof UsersSearchUsersForProjectParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof UsersSearchUsersForProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"UsersSearchUsersForProject400", typeof UsersSearchUsersForProject400.Type> | ApiError<"UsersSearchUsersForProject401", typeof UsersSearchUsersForProject401.Type> | ApiError<"UsersSearchUsersForProject403", typeof UsersSearchUsersForProject403.Type> | ApiError<"UsersSearchUsersForProject404", typeof UsersSearchUsersForProject404.Type> | ApiError<"UsersSearchUsersForProject500", typeof UsersSearchUsersForProject500.Type> | ApiError<"UsersSearchUsersForProject503", typeof UsersSearchUsersForProject503.Type>>
  readonly "UsersGetUsersActiveTimeseries": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof UsersGetUsersActiveTimeseriesParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof UsersGetUsersActiveTimeseries200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"UsersGetUsersActiveTimeseries400", typeof UsersGetUsersActiveTimeseries400.Type> | ApiError<"UsersGetUsersActiveTimeseries401", typeof UsersGetUsersActiveTimeseries401.Type> | ApiError<"UsersGetUsersActiveTimeseries403", typeof UsersGetUsersActiveTimeseries403.Type> | ApiError<"UsersGetUsersActiveTimeseries404", typeof UsersGetUsersActiveTimeseries404.Type> | ApiError<"UsersGetUsersActiveTimeseries500", typeof UsersGetUsersActiveTimeseries500.Type> | ApiError<"UsersGetUsersActiveTimeseries503", typeof UsersGetUsersActiveTimeseries503.Type>>
  readonly "UsersGetUsersBreakdown": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof UsersGetUsersBreakdown200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"UsersGetUsersBreakdown400", typeof UsersGetUsersBreakdown400.Type> | ApiError<"UsersGetUsersBreakdown401", typeof UsersGetUsersBreakdown401.Type> | ApiError<"UsersGetUsersBreakdown403", typeof UsersGetUsersBreakdown403.Type> | ApiError<"UsersGetUsersBreakdown404", typeof UsersGetUsersBreakdown404.Type> | ApiError<"UsersGetUsersBreakdown500", typeof UsersGetUsersBreakdown500.Type> | ApiError<"UsersGetUsersBreakdown503", typeof UsersGetUsersBreakdown503.Type>>
  readonly "UsersGetUserByKey": <Config extends OperationConfig>(idOrSlug: string, userKey: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof UsersGetUserByKey200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"UsersGetUserByKey400", typeof UsersGetUserByKey400.Type> | ApiError<"UsersGetUserByKey401", typeof UsersGetUserByKey401.Type> | ApiError<"UsersGetUserByKey403", typeof UsersGetUserByKey403.Type> | ApiError<"UsersGetUserByKey404", typeof UsersGetUserByKey404.Type> | ApiError<"UsersGetUserByKey500", typeof UsersGetUserByKey500.Type> | ApiError<"UsersGetUserByKey503", typeof UsersGetUserByKey503.Type>>
  readonly "UsersDeleteUserData": <Config extends OperationConfig>(idOrSlug: string, userKey: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof UsersDeleteUserData200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"UsersDeleteUserData400", typeof UsersDeleteUserData400.Type> | ApiError<"UsersDeleteUserData401", typeof UsersDeleteUserData401.Type> | ApiError<"UsersDeleteUserData403", typeof UsersDeleteUserData403.Type> | ApiError<"UsersDeleteUserData404", typeof UsersDeleteUserData404.Type> | ApiError<"UsersDeleteUserData500", typeof UsersDeleteUserData500.Type> | ApiError<"UsersDeleteUserData503", typeof UsersDeleteUserData503.Type>>
  readonly "UsersRemoveUserIdentification": <Config extends OperationConfig>(idOrSlug: string, userKey: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof UsersRemoveUserIdentification200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"UsersRemoveUserIdentification400", typeof UsersRemoveUserIdentification400.Type> | ApiError<"UsersRemoveUserIdentification401", typeof UsersRemoveUserIdentification401.Type> | ApiError<"UsersRemoveUserIdentification403", typeof UsersRemoveUserIdentification403.Type> | ApiError<"UsersRemoveUserIdentification404", typeof UsersRemoveUserIdentification404.Type> | ApiError<"UsersRemoveUserIdentification500", typeof UsersRemoveUserIdentification500.Type> | ApiError<"UsersRemoveUserIdentification503", typeof UsersRemoveUserIdentification503.Type>>
  readonly "WebVitalsInterpretVitalsFilter": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof WebVitalsInterpretVitalsFilterRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof WebVitalsInterpretVitalsFilter200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"WebVitalsInterpretVitalsFilter401", typeof WebVitalsInterpretVitalsFilter401.Type> | ApiError<"WebVitalsInterpretVitalsFilter403", typeof WebVitalsInterpretVitalsFilter403.Type> | ApiError<"WebVitalsInterpretVitalsFilter404", typeof WebVitalsInterpretVitalsFilter404.Type> | ApiError<"WebVitalsInterpretVitalsFilter500", typeof WebVitalsInterpretVitalsFilter500.Type>>
  readonly "WebVitalsGetExperienceDiagnostics": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params: typeof WebVitalsGetExperienceDiagnosticsParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof WebVitalsGetExperienceDiagnostics200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"WebVitalsGetExperienceDiagnostics401", typeof WebVitalsGetExperienceDiagnostics401.Type> | ApiError<"WebVitalsGetExperienceDiagnostics403", typeof WebVitalsGetExperienceDiagnostics403.Type> | ApiError<"WebVitalsGetExperienceDiagnostics404", typeof WebVitalsGetExperienceDiagnostics404.Type> | ApiError<"WebVitalsGetExperienceDiagnostics500", typeof WebVitalsGetExperienceDiagnostics500.Type>>
  readonly "WebVitalsGetTtfbDiagnostics": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof WebVitalsGetTtfbDiagnosticsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof WebVitalsGetTtfbDiagnostics200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"WebVitalsGetTtfbDiagnostics401", typeof WebVitalsGetTtfbDiagnostics401.Type> | ApiError<"WebVitalsGetTtfbDiagnostics403", typeof WebVitalsGetTtfbDiagnostics403.Type> | ApiError<"WebVitalsGetTtfbDiagnostics404", typeof WebVitalsGetTtfbDiagnostics404.Type> | ApiError<"WebVitalsGetTtfbDiagnostics500", typeof WebVitalsGetTtfbDiagnostics500.Type>>
  readonly "WebVitalsGetWebVitalsForProject": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof WebVitalsGetWebVitalsForProjectParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof WebVitalsGetWebVitalsForProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"WebVitalsGetWebVitalsForProject401", typeof WebVitalsGetWebVitalsForProject401.Type> | ApiError<"WebVitalsGetWebVitalsForProject403", typeof WebVitalsGetWebVitalsForProject403.Type> | ApiError<"WebVitalsGetWebVitalsForProject404", typeof WebVitalsGetWebVitalsForProject404.Type> | ApiError<"WebVitalsGetWebVitalsForProject500", typeof WebVitalsGetWebVitalsForProject500.Type>>
  readonly "WebVitalsGetBuildDeploymentsForProject": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof WebVitalsGetBuildDeploymentsForProjectParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof WebVitalsGetBuildDeploymentsForProject200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"WebVitalsGetBuildDeploymentsForProject401", typeof WebVitalsGetBuildDeploymentsForProject401.Type> | ApiError<"WebVitalsGetBuildDeploymentsForProject403", typeof WebVitalsGetBuildDeploymentsForProject403.Type> | ApiError<"WebVitalsGetBuildDeploymentsForProject404", typeof WebVitalsGetBuildDeploymentsForProject404.Type> | ApiError<"WebVitalsGetBuildDeploymentsForProject500", typeof WebVitalsGetBuildDeploymentsForProject500.Type>>
  readonly "WebVitalsGetLayoutShiftActivity": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof WebVitalsGetLayoutShiftActivityParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof WebVitalsGetLayoutShiftActivity200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"WebVitalsGetLayoutShiftActivity401", typeof WebVitalsGetLayoutShiftActivity401.Type> | ApiError<"WebVitalsGetLayoutShiftActivity403", typeof WebVitalsGetLayoutShiftActivity403.Type> | ApiError<"WebVitalsGetLayoutShiftActivity404", typeof WebVitalsGetLayoutShiftActivity404.Type> | ApiError<"WebVitalsGetLayoutShiftActivity500", typeof WebVitalsGetLayoutShiftActivity500.Type>>
  readonly "WebVitalsGetWebVitalsTrends": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof WebVitalsGetWebVitalsTrendsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof WebVitalsGetWebVitalsTrends200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"WebVitalsGetWebVitalsTrends401", typeof WebVitalsGetWebVitalsTrends401.Type> | ApiError<"WebVitalsGetWebVitalsTrends403", typeof WebVitalsGetWebVitalsTrends403.Type> | ApiError<"WebVitalsGetWebVitalsTrends404", typeof WebVitalsGetWebVitalsTrends404.Type> | ApiError<"WebVitalsGetWebVitalsTrends500", typeof WebVitalsGetWebVitalsTrends500.Type>>
  readonly "WebVitalsGetWebVitalsSummary": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params?: typeof WebVitalsGetWebVitalsSummaryParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof WebVitalsGetWebVitalsSummary200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"WebVitalsGetWebVitalsSummary401", typeof WebVitalsGetWebVitalsSummary401.Type> | ApiError<"WebVitalsGetWebVitalsSummary403", typeof WebVitalsGetWebVitalsSummary403.Type> | ApiError<"WebVitalsGetWebVitalsSummary404", typeof WebVitalsGetWebVitalsSummary404.Type> | ApiError<"WebVitalsGetWebVitalsSummary500", typeof WebVitalsGetWebVitalsSummary500.Type>>
  readonly "IntegrationsListIntegrationConnections": <Config extends OperationConfig>(idOrSlug: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof IntegrationsListIntegrationConnections200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"IntegrationsListIntegrationConnections400", typeof IntegrationsListIntegrationConnections400.Type> | ApiError<"IntegrationsListIntegrationConnections401", typeof IntegrationsListIntegrationConnections401.Type> | ApiError<"IntegrationsListIntegrationConnections403", typeof IntegrationsListIntegrationConnections403.Type> | ApiError<"IntegrationsListIntegrationConnections404", typeof IntegrationsListIntegrationConnections404.Type> | ApiError<"IntegrationsListIntegrationConnections500", typeof IntegrationsListIntegrationConnections500.Type>>
  readonly "IntegrationsSaveIntegrationCredentials": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof IntegrationsSaveIntegrationCredentialsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof IntegrationsSaveIntegrationCredentials200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"IntegrationsSaveIntegrationCredentials400", typeof IntegrationsSaveIntegrationCredentials400.Type> | ApiError<"IntegrationsSaveIntegrationCredentials401", typeof IntegrationsSaveIntegrationCredentials401.Type> | ApiError<"IntegrationsSaveIntegrationCredentials403", typeof IntegrationsSaveIntegrationCredentials403.Type> | ApiError<"IntegrationsSaveIntegrationCredentials404", typeof IntegrationsSaveIntegrationCredentials404.Type> | ApiError<"IntegrationsSaveIntegrationCredentials500", typeof IntegrationsSaveIntegrationCredentials500.Type>>
  readonly "IntegrationsDisconnectIntegration": <Config extends OperationConfig>(idOrSlug: string, integrationId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"IntegrationsDisconnectIntegration400", typeof IntegrationsDisconnectIntegration400.Type> | ApiError<"IntegrationsDisconnectIntegration401", typeof IntegrationsDisconnectIntegration401.Type> | ApiError<"IntegrationsDisconnectIntegration403", typeof IntegrationsDisconnectIntegration403.Type> | ApiError<"IntegrationsDisconnectIntegration404", typeof IntegrationsDisconnectIntegration404.Type> | ApiError<"IntegrationsDisconnectIntegration500", typeof IntegrationsDisconnectIntegration500.Type>>
  readonly "CodeContextSuggestCodeContext": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof CodeContextSuggestCodeContextRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CodeContextSuggestCodeContext200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"CodeContextSuggestCodeContext401", typeof CodeContextSuggestCodeContext401.Type> | ApiError<"CodeContextSuggestCodeContext403", typeof CodeContextSuggestCodeContext403.Type> | ApiError<"CodeContextSuggestCodeContext404", typeof CodeContextSuggestCodeContext404.Type> | ApiError<"CodeContextSuggestCodeContext422", typeof CodeContextSuggestCodeContext422.Type> | ApiError<"CodeContextSuggestCodeContext500", typeof CodeContextSuggestCodeContext500.Type>>
  readonly "CodeContextGetCodeContextFile": <Config extends OperationConfig>(idOrSlug: string, options: { readonly payload: typeof CodeContextGetCodeContextFileRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CodeContextGetCodeContextFile200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"CodeContextGetCodeContextFile401", typeof CodeContextGetCodeContextFile401.Type> | ApiError<"CodeContextGetCodeContextFile403", typeof CodeContextGetCodeContextFile403.Type> | ApiError<"CodeContextGetCodeContextFile404", typeof CodeContextGetCodeContextFile404.Type> | ApiError<"CodeContextGetCodeContextFile422", typeof CodeContextGetCodeContextFile422.Type> | ApiError<"CodeContextGetCodeContextFile500", typeof CodeContextGetCodeContextFile500.Type>>
  readonly "CodeContextSearchCodeContextRepositories": <Config extends OperationConfig>(idOrSlug: string, options: { readonly params: typeof CodeContextSearchCodeContextRepositoriesParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof CodeContextSearchCodeContextRepositories200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"CodeContextSearchCodeContextRepositories401", typeof CodeContextSearchCodeContextRepositories401.Type> | ApiError<"CodeContextSearchCodeContextRepositories403", typeof CodeContextSearchCodeContextRepositories403.Type> | ApiError<"CodeContextSearchCodeContextRepositories404", typeof CodeContextSearchCodeContextRepositories404.Type> | ApiError<"CodeContextSearchCodeContextRepositories422", typeof CodeContextSearchCodeContextRepositories422.Type> | ApiError<"CodeContextSearchCodeContextRepositories500", typeof CodeContextSearchCodeContextRepositories500.Type>>
  readonly "NotificationsListNotifications": <Config extends OperationConfig>(options: { readonly params?: typeof NotificationsListNotificationsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof NotificationsListNotifications200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"NotificationsListNotifications401", typeof NotificationsListNotifications401.Type> | ApiError<"NotificationsListNotifications403", typeof NotificationsListNotifications403.Type> | ApiError<"NotificationsListNotifications404", typeof NotificationsListNotifications404.Type> | ApiError<"NotificationsListNotifications500", typeof NotificationsListNotifications500.Type>>
  readonly "NotificationsGetUnreadNotificationCount": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof NotificationsGetUnreadNotificationCount200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"NotificationsGetUnreadNotificationCount401", typeof NotificationsGetUnreadNotificationCount401.Type> | ApiError<"NotificationsGetUnreadNotificationCount403", typeof NotificationsGetUnreadNotificationCount403.Type> | ApiError<"NotificationsGetUnreadNotificationCount404", typeof NotificationsGetUnreadNotificationCount404.Type> | ApiError<"NotificationsGetUnreadNotificationCount500", typeof NotificationsGetUnreadNotificationCount500.Type>>
  readonly "NotificationsMarkNotificationRead": <Config extends OperationConfig>(notificationId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"NotificationsMarkNotificationRead401", typeof NotificationsMarkNotificationRead401.Type> | ApiError<"NotificationsMarkNotificationRead403", typeof NotificationsMarkNotificationRead403.Type> | ApiError<"NotificationsMarkNotificationRead404", typeof NotificationsMarkNotificationRead404.Type> | ApiError<"NotificationsMarkNotificationRead500", typeof NotificationsMarkNotificationRead500.Type>>
  readonly "NotificationsMarkNotificationUnread": <Config extends OperationConfig>(notificationId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"NotificationsMarkNotificationUnread401", typeof NotificationsMarkNotificationUnread401.Type> | ApiError<"NotificationsMarkNotificationUnread403", typeof NotificationsMarkNotificationUnread403.Type> | ApiError<"NotificationsMarkNotificationUnread404", typeof NotificationsMarkNotificationUnread404.Type> | ApiError<"NotificationsMarkNotificationUnread500", typeof NotificationsMarkNotificationUnread500.Type>>
  readonly "NotificationsMarkAllNotificationsRead": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"NotificationsMarkAllNotificationsRead401", typeof NotificationsMarkAllNotificationsRead401.Type> | ApiError<"NotificationsMarkAllNotificationsRead403", typeof NotificationsMarkAllNotificationsRead403.Type> | ApiError<"NotificationsMarkAllNotificationsRead404", typeof NotificationsMarkAllNotificationsRead404.Type> | ApiError<"NotificationsMarkAllNotificationsRead500", typeof NotificationsMarkAllNotificationsRead500.Type>>
  readonly "NotificationsGetNotificationEmailPreferences": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof NotificationsGetNotificationEmailPreferences200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"NotificationsGetNotificationEmailPreferences401", typeof NotificationsGetNotificationEmailPreferences401.Type> | ApiError<"NotificationsGetNotificationEmailPreferences403", typeof NotificationsGetNotificationEmailPreferences403.Type> | ApiError<"NotificationsGetNotificationEmailPreferences404", typeof NotificationsGetNotificationEmailPreferences404.Type> | ApiError<"NotificationsGetNotificationEmailPreferences500", typeof NotificationsGetNotificationEmailPreferences500.Type>>
  readonly "NotificationsUpdateNotificationEmailPreferences": <Config extends OperationConfig>(options: { readonly payload: typeof NotificationsUpdateNotificationEmailPreferencesRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof NotificationsUpdateNotificationEmailPreferences200.Type, Config>, HttpClientError.HttpClientError | SchemaError | ApiError<"NotificationsUpdateNotificationEmailPreferences401", typeof NotificationsUpdateNotificationEmailPreferences401.Type> | ApiError<"NotificationsUpdateNotificationEmailPreferences403", typeof NotificationsUpdateNotificationEmailPreferences403.Type> | ApiError<"NotificationsUpdateNotificationEmailPreferences404", typeof NotificationsUpdateNotificationEmailPreferences404.Type> | ApiError<"NotificationsUpdateNotificationEmailPreferences500", typeof NotificationsUpdateNotificationEmailPreferences500.Type>>
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
