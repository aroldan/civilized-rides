# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server at http://localhost:4321
npm run build        # Build static site to dist/
npm run preview      # Preview the built site
npm run fetch-routes # Fetch/update route data from RideWithGPS API
```

There are no tests.

## Architecture

This is an Astro static site (v7) using Tailwind CSS v3 (via PostCSS, not `@astrojs/tailwind`).

### Data flow

Ride content lives in two places that must stay in sync:

1. **`src/content/rides/*.md`** — authored content: frontmatter with `ridewithgps_url`, `short_description`, `stops`, `tags`; markdown body is the ride description. The content collection is defined in `src/content.config.ts` using Astro's glob loader.

2. **`data/routes/*.json`** — cached route data fetched from RideWithGPS (name, distance, elevation, track points for the map). Filename must match the markdown slug (e.g., `civ-classic.md` → `data/routes/civ-classic.json`). This directory is committed to the repo so builds don't need to hit the API.

`npm run fetch-routes` (runs `scripts/fetch-routes.ts`) reads all markdown files, hits `https://ridewithgps.com/routes/{id}.json`, and writes/overwrites the JSON cache. Run this whenever a new ride is added or a route changes.

At build time, `src/lib/routes.ts:getRouteData(slug)` reads from `data/routes/` to hydrate pages — no network calls during build.

### Maps

Leaflet is loaded via CDN in `Layout.astro`. `public/js/map-init.js` initializes all maps on the page by reading `data-map-route` and `data-map-bounds` attributes. Tiles come from OpenStreetMap (no API key needed). The `RouteMap.astro` component renders the map container with those data attributes.

### Adding a ride

1. Create `src/content/rides/my-ride.md` with the required frontmatter (`ridewithgps_url` is mandatory)
2. Run `npm run fetch-routes` to populate `data/routes/my-ride.json`
3. Commit both files

### Stop types

Valid values for `stops[].type`: `coffee`, `beer`, `food`, `sight`, `transportation`, `bike-shop`
