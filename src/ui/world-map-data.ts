import type {
	Feature,
	FeatureCollection,
	MultiPolygon,
	Polygon,
} from "geojson";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import {
	ISO_ALPHA2_TO_NUMERIC,
	ISO_ALPHA3_TO_NUMERIC,
} from "../data/iso-alpha2-numeric.ts";
import worldTopology from "world-atlas/countries-110m.json" with {
	type: "json",
};

interface CountryProperties {
	name?: string;
}

const topology = worldTopology as unknown as Topology;
const countriesObject = topology.objects.countries as GeometryCollection;
const featureCollection = feature(
	topology,
	countriesObject,
) as FeatureCollection<Polygon | MultiPolygon, CountryProperties>;

interface CountryFeature {
	readonly id: string;
	readonly name: string;
	readonly geometry: Polygon | MultiPolygon;
}

/** Numeric ISO 3166-1 codes we skip when rasterizing the base map. */
const EXCLUDED_IDS = new Set<string>([
	"010", // Antarctica
]);

/** Latitude window used by the equirectangular projection. */
const PROJECTION_LAT_MAX = 85;
const PROJECTION_LAT_MIN = -58;
const PROJECTION_LAT_RANGE = PROJECTION_LAT_MAX - PROJECTION_LAT_MIN;

const COUNTRIES: ReadonlyArray<CountryFeature> = featureCollection.features
	.map((f, index) => ({
		id: String(f.id ?? index),
		name: f.properties?.name ?? "",
		geometry: f.geometry,
	}))
	.filter((c) => !EXCLUDED_IDS.has(c.id));

const COUNTRY_INDEX_BY_ID = new Map<string, number>();
const COUNTRY_INDEX_BY_NAME = new Map<string, number>();
for (let i = 0; i < COUNTRIES.length; i++) {
	const c = COUNTRIES[i]!;
	COUNTRY_INDEX_BY_ID.set(c.id, i);
	if (c.name) {
		COUNTRY_INDEX_BY_NAME.set(c.name.toLowerCase(), i);
	}
}

function resolveNumericCountryId(idOrName: string): string | null {
	const trimmed = idOrName.trim();
	if (!trimmed) return null;

	const byId = COUNTRY_INDEX_BY_ID.get(trimmed);
	if (byId !== undefined) return trimmed;

	const padded = trimmed.padStart(3, "0");
	if (padded !== trimmed && COUNTRY_INDEX_BY_ID.has(padded)) {
		return padded;
	}

	const upper = trimmed.toUpperCase();
	if (upper.length === 2) {
		return ISO_ALPHA2_TO_NUMERIC[upper] ?? null;
	}
	if (upper.length === 3 && /^[A-Z]{3}$/.test(upper)) {
		return ISO_ALPHA3_TO_NUMERIC[upper] ?? null;
	}
	return null;
}

export function findCountryIndex(
	idOrName: string | undefined | null,
): number | null {
	if (!idOrName) return null;

	const numericId = resolveNumericCountryId(idOrName);
	if (numericId != null) {
		const byId = COUNTRY_INDEX_BY_ID.get(numericId);
		if (byId !== undefined) return byId;
	}

	const byName = COUNTRY_INDEX_BY_NAME.get(idOrName.trim().toLowerCase());
	if (byName !== undefined) return byName;
	return null;
}

export interface RasterizedMap {
	readonly width: number;
	readonly height: number;
	/** 0 = ocean, otherwise (country index + 1) in {@link COUNTRIES}. */
	readonly pixels: Int32Array;
}

const rasterCache = new Map<string, RasterizedMap>();

export function rasterizeWorld(width: number, height: number): RasterizedMap {
	if (width <= 0 || height <= 0) {
		return { width: 0, height: 0, pixels: new Int32Array(0) };
	}
	const key = `${width}x${height}`;
	const cached = rasterCache.get(key);
	if (cached) return cached;

	const pixels = new Int32Array(width * height);

	for (let i = 0; i < COUNTRIES.length; i++) {
		const country = COUNTRIES[i];
		if (!country) continue;
		rasterizeGeometry(country.geometry, width, height, i + 1, pixels);
	}

	const result: RasterizedMap = { width, height, pixels };
	rasterCache.set(key, result);
	return result;
}

function rasterizeGeometry(
	geometry: Polygon | MultiPolygon,
	width: number,
	height: number,
	id: number,
	pixels: Int32Array,
): void {
	if (geometry.type === "Polygon") {
		rasterizePolygon(geometry.coordinates, width, height, id, pixels);
		return;
	}
	for (const polygon of geometry.coordinates) {
		rasterizePolygon(polygon, width, height, id, pixels);
	}
}

interface ProjectedPoint {
	readonly x: number;
	readonly y: number;
}

type LonLat = readonly [number, number];

function rasterizePolygon(
	rings: ReadonlyArray<ReadonlyArray<ReadonlyArray<number>>>,
	width: number,
	height: number,
	id: number,
	pixels: Int32Array,
): void {
	const splitRings: LonLat[][] = [];
	for (const ring of rings) {
		for (const sub of splitRingAtAntimeridian(ring)) {
			splitRings.push(sub);
		}
	}

	const projected: ProjectedPoint[][] = splitRings.map((ring) =>
		ring.map(([lon, lat]) => projectLonLat(lon, lat, width, height)),
	);

	let minY = Infinity;
	let maxY = -Infinity;
	for (const ring of projected) {
		for (const p of ring) {
			if (p.y < minY) minY = p.y;
			if (p.y > maxY) maxY = p.y;
		}
	}

	const yStart = Math.max(0, Math.floor(minY));
	const yEnd = Math.min(height - 1, Math.ceil(maxY));
	const antimeridianThreshold = width / 2;

	for (let y = yStart; y <= yEnd; y++) {
		const yMid = y + 0.5;
		const intersections: number[] = [];
		for (const ring of projected) {
			const len = ring.length;
			for (let i = 0; i < len; i++) {
				const p1 = ring[i]!;
				const p2 = ring[(i + 1) % len]!;
				if (Math.abs(p2.x - p1.x) > antimeridianThreshold) continue;
				const y1 = p1.y;
				const y2 = p2.y;
				if ((y1 <= yMid && y2 > yMid) || (y2 <= yMid && y1 > yMid)) {
					const t = (yMid - y1) / (y2 - y1);
					intersections.push(p1.x + t * (p2.x - p1.x));
				}
			}
		}
		if (intersections.length < 2) continue;
		intersections.sort((a, b) => a - b);

		for (let i = 0; i + 1 < intersections.length; i += 2) {
			const xStart = Math.max(0, Math.ceil(intersections[i]!));
			const xEnd = Math.min(width - 1, Math.floor(intersections[i + 1]!));
			const rowBase = y * width;
			for (let x = xStart; x <= xEnd; x++) {
				pixels[rowBase + x] = id;
			}
		}
	}
}

/**
 * Split a polygon ring at the antimeridian (lon = ±180). Each resulting
 * sub-ring lies on a single side of the dateline and can be closed via a
 * vertical edge along its boundary, which means a simple scanline fill works
 * without producing spurious horizontal artifacts.
 */
function splitRingAtAntimeridian(
	ring: ReadonlyArray<ReadonlyArray<number>>,
): LonLat[][] {
	const len = ring.length;
	if (len === 0) return [];

	type Crossing = {
		readonly edgeIdx: number;
		readonly latAtCrossing: number;
		readonly goingEast: boolean;
	};
	const crossings: Crossing[] = [];
	for (let i = 0; i < len; i++) {
		const p1 = ring[i]!;
		const p2 = ring[(i + 1) % len]!;
		const lon1 = p1[0] ?? 0;
		const lat1 = p1[1] ?? 0;
		const lon2 = p2[0] ?? 0;
		const lat2 = p2[1] ?? 0;
		const lonDiff = lon2 - lon1;
		if (Math.abs(lonDiff) <= 180) continue;
		const goingEast = lonDiff < 0;
		const effectiveLon2 = goingEast ? lon2 + 360 : lon2 - 360;
		const targetLon = goingEast ? 180 : -180;
		const denom = effectiveLon2 - lon1;
		const t = denom === 0 ? 0 : (targetLon - lon1) / denom;
		const latAtCrossing = lat1 + t * (lat2 - lat1);
		crossings.push({ edgeIdx: i, latAtCrossing, goingEast });
	}

	if (crossings.length === 0) {
		const out: LonLat[] = [];
		for (const p of ring) out.push([p[0] ?? 0, p[1] ?? 0]);
		return [out];
	}

	const sorted = [...crossings].sort((a, b) => a.edgeIdx - b.edgeIdx);
	const result: LonLat[][] = [];
	let current: LonLat[] = [];
	let cIdx = 0;

	for (let i = 0; i < len; i++) {
		const p = ring[i]!;
		current.push([p[0] ?? 0, p[1] ?? 0]);
		if (cIdx < sorted.length && sorted[cIdx]!.edgeIdx === i) {
			const c = sorted[cIdx]!;
			const exitLon = c.goingEast ? 180 : -180;
			const entryLon = c.goingEast ? -180 : 180;
			current.push([exitLon, c.latAtCrossing]);
			result.push(current);
			current = [[entryLon, c.latAtCrossing]];
			cIdx++;
		}
	}
	if (current.length > 0) {
		if (result.length > 0) {
			result[0] = [...current, ...result[0]!];
		} else {
			result.push(current);
		}
	}

	return result;
}

function projectLonLat(
	lon: number,
	lat: number,
	width: number,
	height: number,
): ProjectedPoint {
	const clampedLat = Math.max(
		PROJECTION_LAT_MIN,
		Math.min(PROJECTION_LAT_MAX, lat),
	);
	const clampedLon = Math.max(-180, Math.min(180, lon));
	return {
		x: ((clampedLon + 180) / 360) * width,
		y: ((PROJECTION_LAT_MAX - clampedLat) / PROJECTION_LAT_RANGE) * height,
	};
}
