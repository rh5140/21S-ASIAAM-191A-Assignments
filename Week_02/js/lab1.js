
/*
// Fetch method
fetch("js/lab1.geojson")
    .then(response => {
        return response.json()
    })
    .then(data =>{
        // Basic Leaflet method to add GeoJSON data
        L.geoJSON(data, myLayerOptions)
        .bindPopup(function (layer) {
            return layer.feature.properties.place;
        }).addTo(map);
    })

// the leaflet method for adding a geojson
L.geoJSON(data, {
    style: function (feature) {
        return {color: 'red'};
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.name;
}).addTo(map);

function customMarker (feature, latlng) {
    return L.circleMarker(latlng, { color: feature.properties.color })
  }
  
  // create an options object
  let myLayerOptions = {
    pointToLayer: customMarker
  }
*/