// JavaScript const variable declaration
const map = L.map('map').setView([28, 2], 3);

// Optional: changing base map
// Leaflet tile layer, i.e. the base map
// https://leaflet-extras.github.io/leaflet-providers/preview/
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//JavaScript let variable declaration to create a marker
//let marker = L.marker([34.0709, -118.444]).addTo(map)
//		.bindPopup('Math Sciences 4328 aka the Technology Sandbox<br> is the lab where I work in ')
//		.openPopup();

        
// Fetch method
fetch("js/map.geojson")
.then(response => {
	console.log(response)
    return response.json()
})
.then(data =>{
    // Basic Leaflet method to add GeoJSON data
    L.geoJSON(data, myLayerOptions)
    .bindPopup(function (layer) {
        return layer.feature.properties.place;
    }).addTo(map);
})

// // the leaflet method for adding a geojson
// L.geoJSON(data, {
// style: function (feature) {
//     return {color: 'red'};
// }
// }).bindPopup(function (layer) {
// return layer.feature.properties.name;
// }).addTo(map);

function customMarker (feature, latlng) {
return L.circleMarker(latlng, { color: feature.properties.color })
}

// create an options object
let myLayerOptions = {
pointToLayer: customMarker
}