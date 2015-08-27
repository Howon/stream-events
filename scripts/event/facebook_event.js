// https://developers.facebook.com/tools/explorer/145634995501895/?method=GET&path=me%2Ffriends&
var graph = require('fbgraph');
	Event = require('../data_schemas/event'),
    User = require('../data_schemas/user'),
	config = require('../config');

module.exports = function(user, io){
	graph.setAccessToken(user.token);

	graph.get("me/events", function(err, res) {
		var data_arr = res.data;
		for(var i = 0; i < data_arr.length ; i++){
			store_event(data_arr[i]);
		}
	});

	function store_event(data){
		function get_desc(data){
			var event_id = data.id;					
			var newEvent = new Event({
	        	_id : event_id,
	        	uploader : user.id,
				data : {
					title : data.name,				          	
		          	time : data.start_time	          	
		         }
			});		

			graph.get(event_id, function(err, res){
				if(res.hasOwnProperty('description')){
					newEvent.data.description = res.description;
				}
				get_image(event_id, newEvent);
			})
		}

		get_desc(data);

		function get_image(event_id, newEvent){
			graph.get(event_id + '/?fields=cover', function(err, res){
				if(res.hasOwnProperty('cover')){
					newEvent.data.img = res.cover.source;
				}
				get_location(event_id, newEvent);
			});
		}

		function get_location(event_id, newEvent){
			graph.get(event_id + '/?fields=place', function(err, res){
				if(res.hasOwnProperty('place')){
					var place = res.place
					newEvent.data.location = {}
					newEvent.data.location.name = place.name				
					
					if(place.hasOwnProperty('location')){	
						newEvent.data.location.latlng = {}			
						newEvent.data.location.address.street = place.location.street		
						newEvent.data.location.address.city = place.location.city
						newEvent.data.location.address.state = place.location.state
						newEvent.data.location.address.country = place.location.country
						newEvent.data.location.latlng.latitude = place.location.latitude
						newEvent.data.location.latlng.longitude = place.location.longitude
					}
					push_to_db(event_id, newEvent)
				}	
			})		
		}

		function push_to_db(event_id, newEvent){
 			Event.findOne({ '_id' : event_id }, function(err, event) {
	            if (err){
	                console.dir(err);
	            }else if(!event){                    
					newEvent.save(function(err, user){
						if(err){ 
		                	return console.error(err)
		                }

		                User.findByIdAndUpdate(data.uploader, {$addToSet: {events: newEvent}},
	                        function(err, user){
	                            if(err){
	                                return console.error(err);
	                            }
	                        }
	                    );
		          	})
		            io.emit('new event', newEvent);
	            }
	        });
 		};	
	} 											
}