// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([37.5, -122.5], 10);

// Loop through the cities array and create one marker for each city.
let cityData = cities;
cityData.forEach(function(city) {
    console.log(city)
    L.circleMarker(city.location,
        {radius: city.population/100000,
            color: 'orange'

    })
        .bindPopup("<h2>"+city.city+","+city.state+"</h2> <hr> <h3>Population "+city.population.toLocaleString()+"</h3>")
        .addTo(map);
});

// Coordinates for each point to be used in the line.
let line = [
    [33.9416, -118.4085],
    [37.6213, -122.3790],
    [40.7899, -111.9791],
    [47.4502, -122.3088]
  ];
// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
    color: "yellow"
  }).addTo(map);

let line2 = [
  [37.7749, -122.4194],   //sfo
  [29.9902, -95.3368],  //iah
  [43.6777, -79.6248],   //toronto
  [40.6413, -73.7781]   //jfk
];

L.polyline(line2, {
  color: "blue",
  weight: 2,
  dashArray:"10 10" 
}).addTo(map);

//  Add a marker to the map for Los Angeles, California.
//let marker = L.marker([34.0522, -118.2437]).addTo(map);
let circle = L.circle([34.0522, -118.2437],
                {radius:1000,
                color: 'black',
                fillColor: 'yellow',
                fillOpacity: 0.25
                }).addTo(map);
let circle2 = L.circleMarker([34.0522, -118.2],
                {radius: 30,
                color: 'black',
                fillColor: '#ffffa1'                
                }).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// Grabbing our GeoJSON data.
//L.geoJSON(sanFranAirport).addTo(map);
// Grabbing our GeoJSON data.
// L.geoJson(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   pointToLayer: function(feature, latlng) {
//     console.log(feature);
//     return L.marker(latlng).bindPopup(`<h3>${feature.properties.name}</h3><hr>${feature.properties.city}, ${feature.properties.country}`);
//   }

// }).addTo(map);

// Using onEachFeature

L.geoJson(sanFranAirport, {
  onEachFeature: function(feature, layer){
    console.log(layer);
    layer.bindPopup(`<h3>${feature.properties.name}</h3><hr>${feature.properties.city}, ${feature.properties.country}`)
  }
}).addTo(map);