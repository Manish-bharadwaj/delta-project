	mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        container: "map", // container ID
        style : "mapbox://styles/mapbox/streets-v12",
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });



    const marker = new mapboxgl.Marker({color: "red"})
        .setLngLat(listing.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({offset: 25 })
        .setHTML(
            `<h4>${listing.title}</h4><p>Exact Location will be provided after booking<p>`
        ))
        .addTo(map);

        map.on('load', () => {
            map.loadImage(
                'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',
                (error, image) => {
                    if (error) throw error;
                    map.addImage('cat', image); map.addSource('point', {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': [
                                {
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': listing.geometry.coordinates,
                                    }
                                }
                            ]
                        }
                    });
                    map.addLayer({
                        'id': 'points',
                        'type': 'symbol',
                        'source': 'point', // reference the data source
                        'layout': {
                            'icon-image': 'cat', // reference the image
                            'icon-size': 0.25
                        }
                    });
                }
            );
        })
