// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map').setView([40.807536, -73.962573], 16);

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

//add a marker in the given location, attach some popup content to it and open the popup


// var select = document.getElementById('alerts'); 
// var number = select.childNodes.length;
// var markers = {};
//     for(var i = 0; i < number; i++){
//         var lat = 40.7127
//         var lon = 74.0059;
//         var body = document.getElementById(i).children[2].innerHTML;

//   		var marker = L.marker([lat, lon]).addTo(map)bindPopup(body)
//    		markers[i] = marker; 
// 	}

// $('.message').click(function(){
//     var id = $(this).attr('id');            
//     map.panTo(markers[id].getLatLng());
//     markers[id].openPopup();
// });