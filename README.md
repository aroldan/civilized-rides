# Civilized Rides

A static site showcasing great bike routes around the Boston area. A ride is "civilized" if it's a challenging workout, goes along beautiful roads, and includes pleasant stops for coffee or beer.

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com).

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens at http://localhost:4321

## Adding a New Ride

1. Create a markdown file in `src/content/rides/` (e.g., `my-ride.md`):

```markdown
---
ridewithgps_url: https://ridewithgps.com/routes/YOUR_ROUTE_ID
short_description: A brief description for the listing page.
stops:
  - type: coffee
    name: Cafe Name
    location: Neighborhood
    url: https://example.com
  - type: beer
    name: Brewery Name
    location: Town
    url: https://example.com
---

Your detailed ride description goes here.
```

2. Fetch the route data from RideWithGPS:

```bash
npm run fetch-routes
```

This scrapes route info (name, distance, elevation, coordinates) and caches it in `data/routes/`.

3. Preview your changes with `npm run dev`

### Stop Types

- `coffee` ☕
- `beer` 🍺
- `food` 🍴
- `sight` 📍

## Build

```bash
npm run build
```

Static files are output to `dist/`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build static site |
| `npm run preview` | Preview built site |
| `npm run fetch-routes` | Fetch/update RideWithGPS data |
