$(window).load(function() {
	mapdefined = false;
	var map;
	initiated = false;
	$("#mapButton").click(function(){
		$("#body").append("#map");
		control_map();
		initiated = true;
	});
});



var defineMap = function(lat, lon, initiated){
	// create a map in the "map" div, set the view to a given place and zoom
	if(initiated){
		map.remove();
	}

	map = L.map('map').setView([lat, lon], 17);
	// add an OpenStreetMap tile layer
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
	}).addTo(map);
    // var body = document.getElementById(i).children[2].innerHTML;

	//var marker = L.marker([lat, lon]).addTo(map)bindPopup(body)
	var marker = L.marker([lat, lon]).addTo(map)
};

var control_map = function(){
	$("#map").fadeIn(300);
	defineMap(40.807536, -73.962573, initiated);
	
	$(document).mouseup(function (e){
		var container = $("#map");
		if (!container.is(e.target) && container.has(e.target).length === 0){ // ... nor a descendant of the container
        	container.fadeOut(300);
	    }
	}).keyup(function(e){
		if(e.keyCode == 27){
			$("#map").fadeOut(300);
		}
	});
}

