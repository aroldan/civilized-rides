import { readFile } from 'fs/promises';
import { join } from 'path';
import type { RouteData } from './ridewithgps.js';

const DATA_DIR = join(process.cwd(), 'data/routes');

export async function getRouteData(slug: string): Promise<RouteData | null> {
  try {
    const content = await readFile(join(DATA_DIR, `${slug}.json`), 'utf-8');
    return JSON.parse(content) as RouteData;
  } catch {
    return null;
  }
}

export function formatDistance(meters: number): string {
  const miles = meters * 0.000621371;
  return `${miles.toFixed(1)} mi`;
}

export function formatElevation(meters: number): string {
  const feet = meters * 3.28084;
  return `${Math.round(feet).toLocaleString()} ft`;
}
