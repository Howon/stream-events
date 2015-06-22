var Event = require('../data_schemas/event'),
    User = require('../data_schemas/user'),
    React = require('react/addons');

module.exports = {
    Event_Handler : function(io, mongoose){
    	io.on('connection', function(socket){
            var printDb = function(){
    	        Event.find(function(err, ms) {
    	            if (err) return console.error(err);
    	            return ms;
    	        })
    	    };

            socket.on('load:events', function(){
            	Event.find(function(err, result) {
    	            if (err) return console.error(err);
    	            socket.emit('load:events', result);
    	        })
        	});

            socket.on('post:event', function(data){
                var image_url = "data:image/jpeg;base64," + new Buffer(data.content.image).toString('base64');
            	var newEvent = new Event({
                    uploader : data.uploader,
                    data : {
                        title : data.content.title,
                        location : data.content.location,
                        time : data.content.time,
                        description : data.content.description,
                        latitude : data.content.lat,
                        longitude : data.content.lon,
                        img : image_url
                    }
    	        });

    	        newEvent._id = '_' + Math.random().toString(36).substr(2, 9);
              	newEvent.save(function(err, user){
    				if(err){ 
                    	return console.error(err)
                    }
              	});
              	socket.emit('new:event', newEvent);
            });
    	})
    },
    Req_Event : function(id, req, res, EventPage){
        var event = {};
        Event.findById(id, function(err, data){
            if(err){
                return console.error(err)
            }
            var props = {
                user : req.user.info,
                event : data
            };
            var reactBody = React.renderToString(EventPage(props));
            res.render('react_event', {title: 'Venter', user : req.user.info, body: reactBody, APP_PROPS: props});
        });
    }
}