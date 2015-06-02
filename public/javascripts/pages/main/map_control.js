var current_lat,
	current_lon,
	map1;

window.onload = function() {
	getLocation();

	initiated = false;

	var add_event_map = function(){
		controlMap(40.807536, -73.962573, 'map');
		initiated = true;
	};

	document.getElementById("mapButton").onclick = add_event_map;

	var add_post_map = function(){
		drawmap(current_lat, current_lon);
	};

	document.getElementById("locationSelectorButton").onclick = add_post_map;
};

var createMap = function(lat, lon, id){
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

var controlMap = function(lat, lon, map_id){
	var container = $("#mapPost");
	container.fadeIn(200);

	createMap(lat, lon, map_id);
	
	window.onkeyup = function(e){
		if(e.keyCode == 27){
			container.fadeOut(200);
		}
	};

	window.onmouseup = function (e){
		if (!container.is(e.target) && container.has(e.target).length === 0 ||
			e.target === document.getElementById('close_map')){ // ... nor a descendant of the container
 			container.fadeOut(200);
	    }
	};
}

function getLocation() {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
   	current_lat = position.coords.latitude;
    current_lon = position.coords.longitude;
}

function drawmap(current_lat, current_lon){
	controlMap(current_lat, current_lon, 'mapPost');
	initiated = true;
    
    map.on('GeoCoder_getLatLonName', function (result) {
    	document.getElementById('display_name').innerHTML = result.result.display_name;
	    document.getElementById('coordinates').innerHTML = result.result.lat + " " + result.result.lon;
	});
}
