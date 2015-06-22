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

	var store_event = function(data){
		var event_id = data.id;
		var location_data;
		var event_description = '';
		var img_url = '';

		graph.get(event_id, function(err, res){
			event_description = res.description;
		});

		graph.get(event_id + '/?fields=cover', function(err, res){
			img_url = res.cover.source;
		});

		graph.get(event_id + '/?fields=place', function(err, res){
			location_data = res.place.location;

			Event.findOne({ '_id' : event_id }, function(err, event) {
                if (err){
                    console.dir(err);
                }else if(!event){
                    var newEvent = new Event({
                    	_id : event_id,
                    	uploader : user.id,
						data : {
							title : data.name,
				          	location : location_data.street + ", " + location_data.city + ", " + location_data.state + ", " + location_data.country,
				          	time : data.start_time,
				          	description : event_description,
				          	latitude : location_data.latitude,
				          	longitude : location_data.longitude,
				          	img : img_url
				         }
					});
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
			return res;
		})
	};
}