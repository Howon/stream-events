$(window).load(function() {
	var map,
		mapPost;
	initiated = false;
	initiated2 = false;
	$("#mapButton").click(function(){
		control_map(40.807536, -73.962573, 'map');
		initiated = true;
	});

	$("#mapPostButton").click(function(){
		getLocation();
		initiated2 = true;
	})
});

var defineMap = function(lat, lon, initiated, id){
	// create a map in the "map" div, set the view to a given place and zoom
	if(initiated || initiated2){
		map.remove();
	}

	map = new L.Map(id).setView(new L.LatLng(lat, lon), 17);
	// add an OpenStreetMap tile layer
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
	}).addTo(map);

	if(id === 'mapPost'){
		L.Control.geocoder().addTo(map);
	}

	var marker = L.marker([lat, lon]).addTo(map);
    marker.setLatLng(map.getCenter());
};

var control_map = function(lat, lon, map_id){
	var id = "#"+map_id;
	$(id).fadeIn(200);

	defineMap(lat, lon, initiated, map_id); //columbia university
	
	$(document).mouseup(function (e){
		var container = $(id);
		if (!container.is(e.target) && container.has(e.target).length === 0){ // ... nor a descendant of the container
 			container.fadeOut(300);
	    }
	}).keyup(function(e){
		if(e.keyCode == 27){
			$(id).fadeOut(300);
		}
	});

}

function getLocation() {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    control_map(lat, lon, 'mapPost');
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.")
            break;
    }
}