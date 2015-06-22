var Thread = require('../data_schemas/thread'),
    Event = require('../data_schemas/event');

module.exports = function(io, mongoose){
	io.on('connection', function(socket){
        socket.on('post:thread', function(data){
            var newThread = new Thread({
                user_id : data.user_id,
                content : data.content,
                time : data.time,
                event_source : data.event_source,
                upvote : 0
            });

            newThread.save(function(err, thread){
                if(err){
                    return console.error(err);
                }
            });
            
            io.emit('new:thread_post', newThread);
    	});

        socket.on('load:thread', function(id){
            Thread.find({event_source : id}, function(err, thread){
                if(err){
                    return console.error(err);
                }
                socket.emit('load:thread', thread);
            });
        });

        socket.on('vote:thread', function(id, action){
            Thread.findByIdAndUpdate(id, {"$inc": { 'upvote' : action }}, function(err, thread){
                if(err){
                    return console.error(err);
                }
            })
        });
	})
}	