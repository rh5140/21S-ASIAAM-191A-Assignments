let latitude = 34.0709;
let longitude = -118.444;
let zoom = 5;

const map = L.map('map').setView([latitude, longitude], zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// adding markers
// let work = L.marker([34.0709, -118.444]).addTo(map)
// 		.bindPopup('Where I work on campus')

// let home = L.marker([37.7409, -122.484]).addTo(map)
// 		.bindPopup('Where I currently am')

// let random = L.marker([39.7409, -122.484]).addTo(map)
// 		.bindPopup('Third Point')



function addMarker(lat, long, msg) {
    console.log(msg)
    L.marker([lat, long]).addTo(map).bindPopup(msg)
    createButtons(lat,long,msg); // new line!!!
    return msg
}

// Step 2 adding our new function
function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng], 7); //this is the flyTo from Leaflet
    })
    document.body.appendChild(newButton); //this adds the button to our page.
}


function addCustomMarker(lat, long, msg, name) {
    console.log(name);
    let message = msg + ' -' + name
    L.marker([lat, long]).addTo(map).bindPopup(message, "<h1><img src = 'images/banner.png'></h1>")
    createFunction(lat, long, msg)
    return message
}




addMarker(-30, 152,'Tawny frogmouth')
addMarker(-4, -80, 'Silky anteater')
addMarker(-36, -64, 'Pink fairy armadillo')
addMarker(5, 102, 'Malayan tapir')

// addCustomMarker(36, -120, 'test', 'ray')
// addCustomMarker(40, -121, 'i don\'t know where anythign is', 'ray')
// addCustomMarker(50, -120, 'these are just random numbers', 'ray')

