console.log("info")

var mapCountainer = document.querySelector('[data-map-container]');
console.log(mapCountainer)
var mapid = mapCountainer.id

var mymap = L.map(mapid).setView([18.220833, -66.590149], 10);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmVuaWVycHIiLCJhIjoiY2trZW9kdDhsMDFlNzJ1cGJmNWx3MHR0aSJ9.uSCpxR81uvourow2XGgpDA'
}).addTo(mymap);

// Change to San Juan information
var sanjuanmap = L.map('sjid').setView([18.466333, -66.105721], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmVuaWVycHIiLCJhIjoiY2trZW9kdDhsMDFlNzJ1cGJmNWx3MHR0aSJ9.uSCpxR81uvourow2XGgpDA'
}).addTo(sanjuanmap);

// Change to rincon information
var rinmap = L.map('rnid').setView([18.340111, -67.249947], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmVuaWVycHIiLCJhIjoiY2trZW9kdDhsMDFlNzJ1cGJmNWx3MHR0aSJ9.uSCpxR81uvourow2XGgpDA'
}).addTo(rinmap);

// Change to Ponce information
var poncemap = L.map('pnid').setView([18.012630, -66.626038], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmVuaWVycHIiLCJhIjoiY2trZW9kdDhsMDFlNzJ1cGJmNWx3MHR0aSJ9.uSCpxR81uvourow2XGgpDA'
}).addTo(poncemap);

// Change to Farjardo info
var farmap = L.map('frid').setView([18.330379, -65.660606], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmVuaWVycHIiLCJhIjoiY2trZW9kdDhsMDFlNzJ1cGJmNWx3MHR0aSJ9.uSCpxR81uvourow2XGgpDA'
}).addTo(farmap);

var arecibomap = L.map('arid').setView([18.470440, -66.722282], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmVuaWVycHIiLCJhIjoiY2trZW9kdDhsMDFlNzJ1cGJmNWx3MHR0aSJ9.uSCpxR81uvourow2XGgpDA'
}).addTo(arecibomap);


d3.json('/api/restaurants').then(data => {
    console.log(data);

    data.forEach(d => {

        var coords = [d['lat'], d['lng']];
        var name = d['name'];
        var address = d['address'];



        marker = L.marker(coords, { 'title': name });
        marker.bindPopup(`<h4>${name}</h4><hr/><b>${address}</b>`)
        marker.addTo(mymap);

    });
});