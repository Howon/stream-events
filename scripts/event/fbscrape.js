// https://developers.facebook.com/tools/explorer/145634995501895/?method=GET&path=me%2Ffriends&
var graph = require('fbgraph');
var Event = require('./event');
var config = require('../config');
var noodle = require('noodlejs');

module.exports = function(user){
	graph.setAccessToken(user.token);


	graph.get("me/events", function(err, res) {
		var data_arr = res.data;
		for(var i = 0; i < data_arr.length ; i++){
			store_event(data_arr[i]);
		}
	});

	var store_event = function(data){
		var event_id = data.id;
		var location_data;
		var event_description = '';

		graph.get(event_id, function(err, res){
			event_description = res.description;
		});

		graph.get(event_id + '/?fields=place', function(err, res){
			location_data = res.place.location;
			var newEvent = new Event({
				title : data.name,
	          	location : location_data.street + ", " + location_data.city + ", " + location_data.state + ", " + location_data.country,
	          	time : data.start_time,
	          	description : event_description,
	          	latitude : location_data.latitude,
	          	longitude : location_data.longitude
			});

			console.log(newEvent);
			// newEvent.save(function(err, user){
			// 	if(err){ 
   //              	return console.error(err)
   //              }
   //        	})
			return res;
		})
	};

	var get_events = function(event_id){
		graph.get(event_id + '/?fields=place', function(err, res){
			return res;
		})
	};
}