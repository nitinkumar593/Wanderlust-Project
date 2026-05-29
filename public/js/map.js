const listing = window.listing; // backend inject karega

let mapCoordinates = [listing.geometry.coordinates[1] /*Latitude*/, listing.geometry.coordinates[0] /*Longitude*/]; // default coordinates

var map = L.map('map').setView(mapCoordinates, 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

// marker
L.marker(mapCoordinates).addTo(map)
    .bindPopup(`
        <div style="text-align: center;">
            <h4 style="color: #fe424d; margin: 0;">${listing.title}</h4>
            <p style="margin: 5px 0;">Exact location provided after booking.</p>
            <p style="font-weight: bold; font-size: 1.1rem;">₹ ${listing.price.toLocaleString("en-IN")}/night</p>
        </div>
    `)
    .openPopup();