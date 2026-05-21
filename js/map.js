document.addEventListener("DOMContentLoaded", function() {
    // Precise coordinate map vectors pointing to LBEF College, Maitidevi area
    const lbefLatitude = 27.7052;
    const lbefLongitude = 85.3301;

    // Instantiate Leaflet layer map node inside footer context bounds
    const map = L.map('map', {
        scrollWheelZoom: false,
        zoomControl: true,
        dragging: !L.Browser.mobile // Simplifies mobile dragging interfaces inside footer spaces
    }).setView([lbefLatitude, lbefLongitude], 16);

    // Mount structural high-contrast map canvas layout panels
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Apply corporate tracking template context strings
    const popMarkup = `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px; min-width: 140px;">
            <h5 style="margin: 0 0 2px 0; color: #011E41; font-weight: 700; font-size: 13px;">Talim Node Base</h5>
            <p style="margin: 0; color: #5A6A85; font-size: 11px; line-height: 1.3;">LBEF Campus Hub Cluster.</p>
        </div>
    `;

    // Drop geographic pin point marker index overlay vector
    L.marker([lbefLatitude, lbefLongitude])
        .addTo(map)
        .bindPopup(popMarkup)
        .openPopup();

    // Loop intercept execution trace: Ensures absolute bounding calculations take effect
    // even if initialized inside deeply nested footer grids
    setTimeout(function() {
        map.invalidateSize();
    }, 400);
});