// const map = L.map('map').setView([34.0709, -118.444], 5);
const map = L.map('map').setView([34.0709, -118.444], 5);

// const url = "https://spreadsheets.google.com/feeds/list/1upD99bKWIO68jL8MKWV67KE-_H_TVn2bCwqyQkqNsBw/oxw5dh3/public/values?alt=json"
const url = "https://spreadsheets.google.com/feeds/list/1AE7uU0IH0to8jfQZ4EPcAfj3-bneWmNn9PivaOr9-SM/ofhetw2/public/values?alt=json"

let Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
});

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)

Stamen_Watercolor.addTo(map)

let shortStory = L.featureGroup();
let longStory = L.featureGroup();
let allLayers = L.featureGroup();

let circleOptions = {
  radius: 8,
  fillColor: "magenta",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
}

function addMarker(data){
  
  if (data.story.length < 50){
    circleOptions.fillColor = "#618700"
    shortStory.addLayer(L.circleMarker([data.lat,data.long], circleOptions).bindPopup(`<h2>${data.location}</h2>${data.story}`))
  }
  else
  {
    circleOptions.fillColor = "#9b0575"
    longStory.addLayer(L.circleMarker([data.lat,data.long], circleOptions).bindPopup(`<h2>${data.location}</h2>${data.story}`))
  }
    createButtons(data.lat,data.long,data.location)
    return data.timestamp;
}

function createButtons(lat,long,title){
    const newButton = document.createElement("button");
    newButton.id = "button"+title;
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",long);
    newButton.addEventListener('click', function(){
        map.flyTo([lat,long], 10);
    })
    const spaceForButtons = document.getElementById('contents')
    spaceForButtons.appendChild(newButton);
}

function formatData(theData){
    // const formattedData = []
    // const rows = theData.feed.entry
    // for(const row of rows) {
    //   const formattedRow = {}
    //   for(const key in row) {
    //     if(key.startsWith("gsx$")) {
    //           formattedRow[key.replace("gsx$", "")] = row[key].$t
    //     }
    //   }
    //   formattedData.push(formattedRow)
    // }
    // console.log(formattedData)
    // formattedData.forEach(addMarker)        
    // speakFluentEnglish.addTo(map)
    // speakOtherLanguage.addTo(map)

    const formattedData = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */
    const rows = theData.feed.entry // this is the weird Google Sheet API format we will be removing
    // we start a for..of.. loop here 
    for(const row of rows) { 
      const formattedRow = {}
      for(const key in row) {
        // time to get rid of the weird gsx$ format...
        if(key.startsWith("gsx$")) {
              formattedRow[key.replace("gsx$", "")] = row[key].$t
        }
      }
      // add the clean data
      formattedData.push(formattedRow)
    }
    // lets see what the data looks like when its clean!
    console.log(formattedData)
    // we can actually add functions here too
    formattedData.forEach(addMarker)
    shortStory.addTo(Map)
    longStory.addTo(Map)
    let allLayers = L.featureGroup([shortStory,longStory]);
    map.fitBounds(allLayers.getBounds());
  }

  let layers = {
    "Shorter stories": shortStory,
    "Longer stories": longStory
 }
 L.control.layers(null,layers).addTo(map)

