var current_lat,
	current_lon,
	map1;
	// map2;

$(window).load(function() {
	getLocation();

	initiated = false;
	// initiated2 = false;

	$("#mapButton").click(function(){
		control_map(40.807536, -73.962573, 'map');
		initiated = true;
	});

	$("#locationSelectorButton").click(function(){
		drawmap(current_lat, current_lon);
	})
});

var defineMap = function(lat, lon, id){
	if(initiated){
		map.remove();
	}

	map = new L.Map("map").setView(new L.LatLng(lat, lon), 17);

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
	$("#mapPost").fadeIn(200);

	defineMap(lat, lon, map_id);
	
	$(document).mouseup(function (e){
		var container = $("#mapPost");
		if (!container.is(e.target) && container.has(e.target).length === 0){ // ... nor a descendant of the container
 			container.fadeOut(300);
	    }
	}).keyup(function(e){
		if(e.keyCode == 27){
			$("#mapPost").fadeOut(300);
		}
	});
}

function getLocation() {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
   	current_lat = position.coords.latitude;
    current_lon = position.coords.longitude;
    console.log(current_lat + " " + current_lon);
}

function drawmap(current_lat, current_lon){
	control_map(current_lat, current_lon, 'mapPost');
	initiated = true;
    
    map.on('GeoCoder_getLatLonName', function (result) {
    	document.getElementById('display_name').innerHTML = result.result.display_name;
	    document.getElementById('coordinates').innerHTML = result.result.lat + " " + result.result.lon;
	});
}
