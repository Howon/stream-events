var socket = io(),
	user_lat = 0,
	user_lon = 0,
	map;

$(window).load(function() {
	manipulate_elements();
	map();
	data_control();
});
// elements control
/****************************************************************************************/
function manipulate_elements(){
	(function control_sidebar(){
		var eventBar = document.getElementById('eventBar'),
			bringButton = document.getElementById('bringButton');

		var eventbar_on = function(){
		    $("#body, #menuSelector").velocity('stop').velocity({
		    	"opacity":"0.4"
		    },{duration: 400});

		    $('#eventBar').velocity('stop').velocity({
		    	translateX: "335px"
		    },{duration: 400});

		    bringButton.style.paddingBottom = '30px';

		    $("#bringButton").velocity('stop').velocity({
		    	"padding-left":"3%"
		    }, {duration: 400});

		    $("#blank, #eventBarMenu, #calendarView").css({
		    	"display": 'block'
		    });

		    bringButton.innerHTML = "<i class='fa fa-chevron-left'></i>&nbsp; Events ";
		};

		var eventbar_out = function(){
		    $("#body, #menuSelector").velocity('stop').velocity({
		    	opacity:1
		    }, {duration: 450});

		    $('#eventBar').velocity('stop').velocity({
		    	translateX: "0"
		    }, {duration: 450});

		    bringButton.style.paddingBottom = '0';

		    $("#bringButton").velocity('stop').velocity({
		    	"padding-left":"0"
		    },{duration: 400});

		    $("#blank, #eventBarMenu, #calendarView").css({
		    	"display": 'none'
		    });

		    bringButton.innerHTML = "Events &nbsp;<i class='fa fa-chevron-right'></i>";
		};

		$("#bringButton, #eventBar, #calendarView, #blank").hover(eventbar_on, eventbar_out);

		var control_post_Area = function(){
			if(!$("#eventPostArea").is(":visible")){
				$("#eventPostArea").velocity({ opacity: 1 }, { display: "block" }, {duration: 300});
			}

			eventbar_out();

			var close_event_posting = function(){
				var container = $('#eventPostArea');

				window.onkeydown = function(e){
					if(!$("#map").is(":visible") && e.keyCode == 27){
						container.velocity({ opacity: 0 }, { display: "none" }, {duration: 300});
						$("#panel").velocity({ opacity: 1 });
					}
				};

				document.getElementById("closePosting").onclick = function(){
					container.velocity({ opacity: 0 }, { display: "none" }, {duration: 300});
					$("#panel").velocity({ opacity: 1 }, {duration: 300});
				};

				document.getElementById("submitNewEvent").onclick = function(){
					container.velocity({ opacity: 0 }, { display: "none" }, {duration: 300});
					$("#panel").velocity({ opacity: 1 }, {duration: 300});
				};

				document.getElementById("Name").value = '';
				document.getElementById("Time").value = '';
				document.getElementById("locDescript").value = '';
				document.getElementById("Description").value = '';
			}();
		};

		document.getElementById('post_event').onclick = control_post_Area;
	}());

	(function control_main_body_load (){
		var bringThread = document.getElementById('bringThread'),
		    bringChat = document.getElementById('bringChat'),
			threadArea = document.getElementById('threadArea'),
			chatArea = document.getElementById('chatArea');

	    bringThread.onclick = function(){
			bringChat.style.color = "#000000";
			bringThread.style.color = "#69F75F";

			$("#threadArea").velocity({ 
				opacity : "1", 
				display : 'block' 
			}, {duration : 300, delay : 350});

			$("#chatArea").velocity({ 
				opacity : "0", 
				display : 'none' 
			}, {duration : 300});
		};

	    bringChat.onclick = function(){
			chatArea.style.display = 'block';
			bringChat.style.color = "#E91E63";

			bringThread.style.color = "#000000";

			$("#threadArea").velocity({ 
				opacity : "0", 
				display : 'none' 
			}, {duration : 300});

			$("#chatArea").velocity({ 
				opacity : "1", 
				display : 'block' 
			}, {duration : 300, delay : 350});
		};
	}());


	function post_thread() {
		var button = this;

		function remove_thread_post_area(){
			$("#threadInput, #submit_thread, #cancel_thread_post").velocity({ opacity : "0" }, { display : 'none' }, { duration : 200 });
			document.getElementById('showThreadPost').style.color = '#9E9E9E';
			document.getElementById('threadInput').value = '';
		}
		
		if(!$("#threadInput").is(":visible")){
			$("#threadInput, #submit_thread, #cancel_thread_post").velocity({ opacity : "1" }, { display : 'block' }, { duration : 200 });
			this.style.color = '#000000';
		}

		document.getElementById('submit_thread').onclick = function(){
			remove_thread_post_area();
		};

		document.getElementById('cancel_thread_post').onclick = remove_thread_post_area;
	}
	document.getElementById('showThreadPost').onclick = post_thread;
}
// Map behaviors
/****************************************************************************************/
var map = function(){
	var map_initialized = false;

	(function get_user_location() {
		function showPosition(position) {
		   	user_lat = position.coords.latitude;
		    user_lon = position.coords.longitude;
		}

	    if (navigator.geolocation){
	        navigator.geolocation.getCurrentPosition(showPosition);
	    }
	}());

	var add_event_map = function(){
		var event_lat = document.getElementById('eventHome').dataset.lat;
		var event_lon = document.getElementById('eventHome').dataset.lon;
		controlMap(event_lat, event_lon, 'map');
	};

	document.getElementById("mapButton").onclick = add_event_map;

	var add_post_map = function(){
		controlMap(user_lat, user_lon, 'mapPost');
	};

	document.getElementById("locationSelectorButton").onclick = add_post_map;

	var createMap = function(lat, lon, id){
		if(map_initialized){
			map.remove();
		}

		map = new L.Map("map").setView(new L.LatLng(lat, lon), 16);

		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		    	attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
			}).addTo(map);

		if(id === 'mapPost'){
			L.Control.geocoder().addTo(map);
			document.getElementById('submit_map').style.display = 'block';
			map.on('GeoCoder_getLatLonName', function (result) {		
	    		display_name = result.result.display_name;
			});
		}
		
		var marker = L.marker([lat, lon]).addTo(map);
		    marker.setLatLng(map.getCenter());
	};

	var controlMap = function(lat, lon, map_id){
		var container = $("#mapPost");
		container.fadeIn(200);

		createMap(lat, lon, map_id);
		map_initialized = true;		

		window.onkeyup = function(e){
			if(e.keyCode == 27){
				container.fadeOut(200); //using jquery instead of velocity because map doesnt behave properly
			}
		};

		window.onmouseup = function (e){
			if (!container.is(e.target) && container.has(e.target).length === 0 ||
				e.target === document.getElementById('close_map') || 
				e.target === document.getElementById('submit_map')){
	 			container.fadeOut(200); //using jquery instead of velocity because map doesnt behave properly
		    }
		};
	};
};
/****************************************************************************************/
// Socket behaviors
/****************************************************************************************/
function data_control(){
	/*
	submits a new post:thread
	*/

	//pushes data to backend upon submission of event
	(function event_submit_handler(){
		var imageUpload = document.getElementById("imageUploadButton");

		document.getElementById('imageUploadIcon').onclick = function(){
			imageUpload.click();
		};

		var event_lat = 0,
			event_lon = 0;

		document.getElementById('submit_map').onclick = function(){
			event_lat = map.getCenter().lat;
			event_lon = map.getCenter().lng;
		};
	}());
}