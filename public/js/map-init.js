// Initialize all maps on the page
function initializeMaps() {
  document.querySelectorAll('[data-map-route]').forEach((mapElement) => {
    const routeCoords = JSON.parse(mapElement.dataset.mapRoute);
    const bounds = JSON.parse(mapElement.dataset.mapBounds);
    const mapId = mapElement.id;

    const map = L.map(mapId, {
      scrollWheelZoom: false,
      dragging: false,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    L.polyline(routeCoords, {
      color: '#dc2626',
      weight: 4,
      opacity: 0.8,
    }).addTo(map);

    map.fitBounds(bounds, { padding: [20, 20] });
  });
}

// Initialize when Leaflet is loaded
if (typeof L !== 'undefined') {
  initializeMaps();
} else {
  // Wait for Leaflet to load
  window.addEventListener('load', initializeMaps);
}
