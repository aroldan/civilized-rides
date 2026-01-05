I'm looking to build a static website that lists great routes for bike rides around the Boston area along with descriptions and picture that I author. It's called Civilized Rides, and rides are considered civilized if they are all of a challenging workout, go along beautiful roads, and include some pleasant stops for sightseeing, coffee, or beer. 

The site will consist of a home page with a paginated list of rides (let's start with 8 per page for now), an "about civilized rides" page, and then detail pages for each ride.

## Homepage/listing
The list of rides will include the shape of the route, the distance, and the short description of the ride.

## About page
The about page should be static - it's okay to leave a placeholder file with some generic content for now, and we can fill in the text and images and stuff there later. 

## Detail page 
The detail page will include a larger map, the stats on the ride, the longer description of the ride, and the list of suggested stops.

Each ride will have a link to it from RideWithGPS - something like this https://ridewithgps.com/routes/43098546

## Architecture

I want the source of truth for rides to be a folder in the project that contains .md files. I'll include the ridewithgps link or ID at the top of the file in a standardized format. An example of that format lives in rides/civility-one.md -- once we get this working I'll author additional routes.

At build time, I want to hit the ridewithGPS API (or scrape the web) to pull in the title of the ride, the distance, a map of the route as a static image, and the elevation. Then build the home page listing as well as the detail pages.