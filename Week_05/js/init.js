const map = L.map('map').setView([34.0709, -118.444], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let url = "https://spreadsheets.google.com/feeds/list/1AE7uU0IH0to8jfQZ4EPcAfj3-bneWmNn9PivaOr9-SM/ofhetw2/public/values?alt=json"

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
        //console.log(data)
        formatData(data)
    })

function addMarker(data){
    L.marker([data.lat,data.long]).addTo(map).bindPopup(`<h2>${data.location}</h2>${data.story}`,'<img src = https://www.at-languagesolutions.com/wp-content/uploads/2016/06/http-1.jpg')
    return data.timestamp    
}

function formatData(theData){
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
}

