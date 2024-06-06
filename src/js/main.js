$(document).ready(function () {
    $('#myModal').modal('show')
    $('#mailbutton').click(function (event) {
        window.location = "mailto:h.marzouk@uni-muenster.de";
    });
});


var map = L.map('map', {
    zoom: 6,
    center: L.latLng([47, 100]),

    attributionControl: true,
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topleft',
    },
});

map.attributionControl.setPrefix('<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">Leaflet ' + L.version + '</a>');

map.addControl(new L.Control.LinearMeasurement({
    unitSystem: 'metric',
    color: '#FF0080',
    type: 'line'
}));

// var hash = new L.Hash(map);

var notification = L.control
    .notifications({
        className: 'pastel',
        timeout: 5000,
        position: 'topleft',
        closable: true,
        dismissable: true,
    })
    .addTo(map);

L.Control.geocoder({ position: "topleft", showResultIcons: true }).addTo(map);

L.Control.betterFileLayer({
    fileSizeLimit: 60240, // File size limit in kb (10 MB)),
    text: { // If you need translate
        title: "Import a file (Max 60 MB)", // Plugin Button Text
    },
}).addTo(map);


L.control.scale(
    {
        imperial: false,
    }).addTo(map);


// L.easyButton({
//     states: [{
//         stateName: 'openInfo',        // name the state
//         icon: 'fa-question',               // and define its properties
//         title: 'Information',      // like its title
//         onClick: function (btn, map) {       // and its callback
//             $('#myModal').modal('show')
//         }
//     }]
// }).addTo(map)


// var browserControl = L.control.browserPrint({ position: 'topleft', title: 'Print Map' }).addTo(map);



map.on("bfl:layerloaded", function () { notification.success('Success', 'Data loaded successfully'); })
map.on("bfl:layerloaderror", function () { notification.alert('Error', 'Unable to load file'); })
map.on("bfl:filenotsupported", function () { notification.alert('Error', 'File type not supported'); })
map.on("bfl:layerisempty", function () { notification.warning('Error', 'No features in file'); })
map.on("bfl:filesizelimit", function () { notification.alert('Error', 'Maximun file size allowed is 50 MB'); })




L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var layers = [];
for (var providerId in providers) {
    layers.push(providers[providerId]);
}


var ctrl = L.control.iconLayers(layers).addTo(map);


var geojsonMarkerOptions = {
    radius: 4,
    fillColor: "#0096FF",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}


var geojsonMarkerOptions2 = {
    radius: 4,
    fillColor: "#FF5733",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

// var overLayers = [
//     {
//         active: true,
//         name: "Short Periods",
//         layer: L.geoJSON(short_periods, {
//             pointToLayer: function (feature, latlng) {
//                 return L.circleMarker(latlng, geojsonMarkerOptions);
//             },
//             onEachFeature: onEachFeature
//             //     },

//         })
//     },
//     {
//         active: true,
//         name: "Long Periods",
//         layer: L.geoJSON(long_periods, {
//             pointToLayer: function (feature, latlng) {
//                 return L.circleMarker(latlng, geojsonMarkerOptions2);
//             },
//             onEachFeature: onEachFeature

//         })
//     },

// ];

// map.addControl(new L.Control.PanelLayers([], overLayers));

myLayer = L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions2);
    },
    onEachFeature: onEachFeature

}).addTo(map);


// var myLayer = L.geoJSON()

function onEachFeature(feature, layer) {
    const rows = Object.keys(feature.properties)
        .map((key) => {
            return `<span> <b>${key}</b> : ${feature.properties[key]} </span>`;
        });

    layer.bindPopup(
        `
                                  <div style="display:flex;flex-direction:column;gap:5px                      ">
                                      ${rows.join("")}
                                  </div>
                                `,
        {
            minWidth: 400,
            maxHeight: 520,
        },
    );
}





// var long = L.geoJSON(long_periods, {
//     pointToLayer: function (feature, latlng) {
//         return L.circleMarker(latlng, geojsonMarkerOptions2);
//     },
//     onEachFeature: onEachFeature

// })

// var overlayMaps = {
//     " Long periods": long,
//     " Short periods": short,
// };

// var layerControl = L.control.layers([], overlayMaps, { collapsed: false }).addTo(map);
// map.addControl(new L.Control.PanelLayers([], overLayers));
// aurora = L.marker(L.geoJson(short_periods)).bindPopup('This is Aurora, CO').addTo(map);
// var layer = L.dataClassification(long_periods, {
//     style: {
//         radius: 6, fillOpacity: 0.7,       // polygon fill opacity in polygon modes
//     },
//     mode: 'quantile',
//     field: 'Name',

//     // pointMode: 'color',

//     colorRamp: 'RdYlGn',
//     legendTitle: 'Temperature °C',
//     legendFooter: 'updated: April 2024',
//     legendPosition: 'topright',
//     reverseColorRamp: true,
//     classRounding: 1,

//     onEachFeature: (feature, layer) => {
//         if (feature.properties) {
//             const rows = Object.keys(feature.properties)
//                 .map((key) => {
//                     return `<span> <b>${key}</b> : ${feature.properties[key]} </span>`;
//                 });

//             layer.bindPopup(
//                 `
//                           <div style="display:flex;flex-direction:column;gap:5px                      ">
//                               ${rows.join("")}
//                           </div>
//                         `,
//                 {
//                     minWidth: 200,
//                     maxHeight: 520,
//                 },
//             );
//         }
//     },

// },).addTo(map);

