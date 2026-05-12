(function() {
    if (window.mapboxLoaded) return;
    window.mapboxLoaded = true;

    const mapToken = window.mapToken;
    const coordinates = window.coordinates;
    const listingTitle = window.listingTitle;

    if (!mapToken || !Array.isArray(coordinates) || coordinates.length !== 2) {
        console.log('Map skipped - missing data');
        return;
    }

    mapboxgl.accessToken = mapToken;
    
    const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: coordinates,
        zoom: 12,
    });

    map.on('load', () => {
        const marker = new mapboxgl.Marker({ color: "red" })
            .setLngLat(coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<div class="map-click">
                    <h4><b>${listingTitle}</b></h4> 
                    <p>Exact location provided after booking.</p>
                </div>`
            ))
            .addTo(map);

        map.addControl(new mapboxgl.ScaleControl());
        map.addControl(new mapboxgl.NavigationControl());
        console.log('✅ MAP WORKS PERFECTLY');
    });
})();
