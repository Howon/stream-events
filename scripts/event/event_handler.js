module.exports = {
	handle_events: function(io, mongoose){	
		var eventSchema = mongoose.Schema({
							  title : String,
							  location : String,
							  time : String,
							  description : String
							  // latlng: [],
							  // img: { data: Buffer, contentType: String }
						  });

		var eventModel = mongoose.model('eventModel', eventSchema, 'events');

        var printDb = function(){
            eventModel.find(function(err, ms) {
                if (err) return console.error(err);
                console.dir(ms);
            })
        };

		io.on('connection', function(socket){
	        socket.on('post event', function(data){
	          console.log(data.title + ", " + data.time + ", " + data.location + ", " + data.description);
	          var event = new eventModel({
	          	title : data.title,
	          	location : data.location,
	          	time : data.time,
	          	description : data.description
	          	// latlng : data.latlng,
	          	// img :
	          });

	          event.save(function(err, user){
					if(err){ 
                    	return console.error(err)
                    }
                    console.log(event);
	          })
	          io.emit('new event', data);
	        })
	    })
	}
}