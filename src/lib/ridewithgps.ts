export interface RouteData {
  id: number;
  name: string;
  distance: number; // meters
  elevationGain: number; // meters
  elevationLoss: number; // meters
  terrain: string;
  difficulty: string;
  locality: string;
  region: string;
  trackPoints: Array<{ lat: number; lng: number }>;
  createdAt: number; // Unix timestamp from RideWithGPS
}

export function extractRouteId(url: string): number {
  const match = url.match(/routes\/(\d+)/);
  if (!match) {
    throw new Error(`Invalid RideWithGPS URL: ${url}`);
  }
  return parseInt(match[1], 10);
}

export async function fetchRouteData(routeId: number): Promise<RouteData> {
  const response = await fetch(`https://ridewithgps.com/routes/${routeId}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch route ${routeId}: ${response.statusText}`);
  }

  const data = await response.json();

  // Extract simplified track points for the polyline
  const trackPoints = (data.track_points || [])
    .filter((_: unknown, i: number) => i % 10 === 0) // Sample every 10th point
    .map((pt: { x: number; y: number }) => ({ lat: pt.y, lng: pt.x }));

  return {
    id: data.id,
    name: data.name,
    distance: data.distance,
    elevationGain: data.elevation_gain,
    elevationLoss: data.elevation_loss,
    terrain: data.terrain || 'unknown',
    difficulty: data.difficulty || 'unknown',
    locality: data.locality || '',
    region: data.administrative_area || '',
    trackPoints,
    createdAt: data.created_at,
  };
}

export function metersToMiles(meters: number): number {
  return meters * 0.000621371;
}

export function metersToFeet(meters: number): number {
  return meters * 3.28084;
}
