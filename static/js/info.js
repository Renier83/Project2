console.log("info")

var city = d3.select("#city_id").property("value");
city = city.replace(/\s+/g, '');

console.log("city");
console.log(city);

switch (city) {
    case "SanJuan":
        var mymap = L.map(cityInfo).setView([18.466333, -66.105721], 10);
        break;
    case "Ponce":
        var mymap = L.map(cityInfo).setView([18.01108, -66.61406], 10);
        break;
    case "Rincon":
        var mymap = L.map(cityInfo).setView([18.340216, -67.250015], 10);
        break;
    case "Fajardo":
        var mymap = L.map(cityInfo).setView([18.325787, -65.652382], 10);
        break;
    case "Arecibo":
        var mymap = L.map(cityInfo).setView([18.466333, -66.105721], 10);
        break;
    case "Humacao":
        var mymap = L.map(cityInfo).setView([18.148750, -65.819099], 10);
        break;
    case "Mayaguez":
        var mymap = L.map(cityInfo).setView([18.201349, -67.139488], 10);
        break;
    default:
        var mymap = L.map(cityInfo).setView([18.220833, -66.590149], 10);
}

// var mymap = L.map(mapid).setView([18.220833, -66.590149], 10);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(mymap);

SanJuan = [18.466333, -66.105721, '<a href="/city/San Juan">San Juan<a>']
Ponce = [18.01108, -66.61406, '<a href="/city/Ponce">Ponce<a>']
Rincon = [18.340216, -67.250015, '<a href="/city/Rincon">Rincon<a>']
Fajardo = [18.325787, -65.652382, '<a href="/city/Fajardo">Fajardo<a>']
Arecibo = [18.47245, -66.71573, '<a href="/city/Arecibo">Arecibo<a>']
Humacao = [18.148750, -65.819099, '<a href="/city/Humacao">Humacao<a>']
Mayaguez = [18.201349, -67.139488, '<a href="/city/Mayaguez">Mayaguez<a>']

cityfile = [SanJuan, Ponce, Rincon, Fajardo, Arecibo, Humacao, Mayaguez]
console.log("cityfile=" + cityfile);

cityfile.forEach(d => {
    console.log(d);
    var coords = [d[0], d[1]];
    var city = d[2];

    marker = L.marker(d).addTo(mymap);
    marker.bindPopup(`${coords}<hr/>${city}<br>`)
    marker.addTo(mymap);
});

d3.text("../static/data/" + city + ".txt", function (error, data) {
    if (error)
        return console.error(error);
    d3.select("#output")
        .append("p")
        .text(data);
});

