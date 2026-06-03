import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import worldTopology from "world-atlas/countries-110m.json" with {
	type: "json",
};
import {
	ISO_ALPHA2_TO_NUMERIC,
	ISO_ALPHA3_TO_NUMERIC,
} from "../../data/iso-alpha2-numeric.ts";

type Coord = readonly [number, number];

interface CountryFeature {
	readonly id: string;
	readonly name: string;
	readonly geometry: Polygon | MultiPolygon;
}

const topology = worldTopology as unknown as Topology;
const countriesObject = topology.objects.countries as GeometryCollection;
const featureCollection = feature(
	topology,
	countriesObject,
) as FeatureCollection<Polygon | MultiPolygon, { name?: string }>;

const EXCLUDED_IDS = new Set(["010"]);

const PROJECTION_LAT_MAX = 85;
const PROJECTION_LAT_MIN = -58;
const PROJECTION_LAT_RANGE = PROJECTION_LAT_MAX - PROJECTION_LAT_MIN;

const COUNTRY_INDEX_BY_ID = new Map<string, number>();
const COUNTRY_INDEX_BY_NAME = new Map<string, number>();
const COUNTRIES: CountryFeature[] = [];

for (const [index, f] of featureCollection.features.entries()) {
	const id = String(f.id ?? index);
	if (EXCLUDED_IDS.has(id)) continue;
	const name = f.properties?.name ?? "";
	const i = COUNTRIES.length;
	COUNTRIES.push({ id, name, geometry: f.geometry });
	COUNTRY_INDEX_BY_ID.set(id, i);
	if (name) COUNTRY_INDEX_BY_NAME.set(name.toLowerCase(), i);
}

function resolveNumericCountryId(input: string): string | null {
	const trimmed = input.trim();
	if (!trimmed) return null;
	if (COUNTRY_INDEX_BY_ID.has(trimmed)) return trimmed;
	const padded = trimmed.padStart(3, "0");
	if (padded !== trimmed && COUNTRY_INDEX_BY_ID.has(padded)) return padded;
	const upper = trimmed.toUpperCase();
	if (upper.length === 2) return ISO_ALPHA2_TO_NUMERIC[upper] ?? null;
	if (upper.length === 3) return ISO_ALPHA3_TO_NUMERIC[upper] ?? null;
	return null;
}

export function findCountryIndex(
	idOrName: string | undefined | null,
): number | null {
	if (!idOrName) return null;
	const numericId = resolveNumericCountryId(idOrName);
	if (numericId) return COUNTRY_INDEX_BY_ID.get(numericId) ?? null;
	return COUNTRY_INDEX_BY_NAME.get(idOrName.trim().toLowerCase()) ?? null;
}

export interface RasterizedMap {
	readonly width: number;
	readonly height: number;
	readonly pixels: Int32Array;
}

const RASTER_CACHE_LIMIT = 8;
const rasterCache = new Map<string, RasterizedMap>();

export function rasterizeWorld(width: number, height: number): RasterizedMap {
	if (width <= 0 || height <= 0) {
		return { width: 0, height: 0, pixels: new Int32Array(0) };
	}
	const key = `${width}x${height}`;
	const cached = rasterCache.get(key);
	if (cached) {
		rasterCache.delete(key);
		rasterCache.set(key, cached);
		return cached;
	}

	const pixels = new Int32Array(width * height);
	for (let i = 0; i < COUNTRIES.length; i++) {
		const country = COUNTRIES[i];
		if (!country) continue;
		rasterizeGeometry(country.geometry, width, height, i + 1, pixels);
	}

	const result: RasterizedMap = { width, height, pixels };
	if (rasterCache.size >= RASTER_CACHE_LIMIT) {
		const oldest = rasterCache.keys().next().value;
		if (oldest !== undefined) rasterCache.delete(oldest);
	}
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
	const polygons =
		geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
	for (const polygon of polygons) {
		rasterizePolygon(polygon, width, height, id, pixels);
	}
}

function rasterizePolygon(
	rings: ReadonlyArray<ReadonlyArray<ReadonlyArray<number>>>,
	width: number,
	height: number,
	id: number,
	pixels: Int32Array,
): void {
	const projected: Coord[][] = [];
	for (const ring of rings) {
		for (const sub of splitRingAtAntimeridian(ring)) {
			projected.push(sub.map(([lon, lat]) => project(lon, lat, width, height)));
		}
	}

	let minY = Infinity;
	let maxY = -Infinity;
	for (const ring of projected) {
		for (const [, y] of ring) {
			if (y < minY) minY = y;
			if (y > maxY) maxY = y;
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
				const p1 = ring[i];
				const p2 = ring[(i + 1) % len];
				if (!p1 || !p2) continue;
				const [x1, y1] = p1;
				const [x2, y2] = p2;
				if (Math.abs(x2 - x1) > antimeridianThreshold) continue;
				if ((y1 <= yMid && y2 > yMid) || (y2 <= yMid && y1 > yMid)) {
					const t = (yMid - y1) / (y2 - y1);
					intersections.push(x1 + t * (x2 - x1));
				}
			}
		}
		if (intersections.length < 2) continue;
		intersections.sort((a, b) => a - b);

		for (let i = 0; i + 1 < intersections.length; i += 2) {
			const left = intersections[i];
			const right = intersections[i + 1];
			if (left === undefined || right === undefined) continue;
			const xStart = Math.max(0, Math.ceil(left));
			const xEnd = Math.min(width - 1, Math.floor(right));
			const rowBase = y * width;
			for (let x = xStart; x <= xEnd; x++) {
				pixels[rowBase + x] = id;
			}
		}
	}
}

function splitRingAtAntimeridian(
	ring: ReadonlyArray<ReadonlyArray<number>>,
): Coord[][] {
	const len = ring.length;
	if (len === 0) return [];

	type Crossing = {
		readonly edgeIdx: number;
		readonly latAtCrossing: number;
		readonly goingEast: boolean;
	};

	const crossings: Crossing[] = [];
	for (let i = 0; i < len; i++) {
		const p1 = ring[i];
		const p2 = ring[(i + 1) % len];
		if (!p1 || !p2) continue;
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
		crossings.push({
			edgeIdx: i,
			latAtCrossing: lat1 + t * (lat2 - lat1),
			goingEast,
		});
	}

	if (crossings.length === 0) {
		return [ring.map((p) => [p[0] ?? 0, p[1] ?? 0] as Coord)];
	}

	const sorted = [...crossings].sort((a, b) => a.edgeIdx - b.edgeIdx);
	const result: Coord[][] = [];
	let current: Coord[] = [];
	let cIdx = 0;

	for (let i = 0; i < len; i++) {
		const p = ring[i];
		if (!p) continue;
		current.push([p[0] ?? 0, p[1] ?? 0]);
		const c = sorted[cIdx];
		if (c?.edgeIdx === i) {
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
			result[0] = [...current, ...(result[0] ?? [])];
		} else {
			result.push(current);
		}
	}

	return result;
}

function project(
	lon: number,
	lat: number,
	width: number,
	height: number,
): Coord {
	const clampedLat = Math.max(
		PROJECTION_LAT_MIN,
		Math.min(PROJECTION_LAT_MAX, lat),
	);
	const clampedLon = Math.max(-180, Math.min(180, lon));
	return [
		((clampedLon + 180) / 360) * width,
		((PROJECTION_LAT_MAX - clampedLat) / PROJECTION_LAT_RANGE) * height,
	];
}
