$(window).load(function() {
	mapdefined = false;
	$("#mapButton").click(function(){
		control_map();
		if(!mapdefined){
			defineMap();
			mapdefined = true;
		}
	});
});



var defineMap = function(){
	// create a map in the "map" div, set the view to a given place and zoom
	var map = L.map('map').setView([40.807536, -73.962573], 17);

	// add an OpenStreetMap tile layer
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
	}).addTo(map);

	var lat = 40.807536;
    var lon = -73.962573;
    // var body = document.getElementById(i).children[2].innerHTML;

	//var marker = L.marker([lat, lon]).addTo(map)bindPopup(body)
	var marker = L.marker([lat, lon]).addTo(map)
};

var control_map = function(){
	$("#map").fadeIn(300);
	$(document).mouseup(function (e){
		var container = $("#map");
		if (!container.is(e.target) && container.has(e.target).length === 0){ // ... nor a descendant of the container
        	container.fadeOut(300);
	    }
	});
}

