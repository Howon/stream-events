var Message = require('../data_schemas//message');

module.exports = function(io, mongoose){
    io.on('connection', function(socket){
        socket.on('send:chat_message', function(data){
            if(!(data.message === '\n'||data.message === '')){
                var message = new Message({
                    user : data.user,
                    text : data.message
                });
            io.emit('new:chat_message', data);
            }
        });
    });
}

