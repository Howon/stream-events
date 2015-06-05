var Event = require('./event');

module.exports = function(io, mongoose){
        var printDb = function(){
            eventModel.find(function(err, ms) {
                if (err) return console.error(err);
                console.dir(ms);
            })
        };

		io.on('connection', function(socket){
	        socket.on('post event', function(data){
	        	var newEvent = new Event({
		          	title : data.title,
		          	location : data.location,
		          	time : data.time,
		          	description : data.description,
		          	latitude : data.lat,
		          	longitude : data.lon
		        });

		        newEvent.event_id.user = '_' + Math.random().toString(36).substr(2, 9);

	          	newEvent.save(function(err, user){
					if(err){ 
                    	return console.error(err)
                    }
                    console.log(newEvent);
	          	})
	          	io.emit('new event', newEvent);
	        })
    	})
}	