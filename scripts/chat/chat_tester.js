// http://blog.modulus.io/getting-started-with-mongoose
// https://github.com/tamaspiros/advanced-chat/blob/master/server.js
module.exports = {
    setChatService: function(io, mongoose, conn){
        var messageSchema = mongoose.Schema({
                                name: String,
                                message: String,
                            });

        var messageModel = mongoose.model('messageModel', messageSchema, 'messages');

        var printDb = function(){
            messageModel.find(function(err, ms) {
                if (err) return console.error(err);
                console.dir(ms);
            })
        };

        io.on('connection', function(socket){
       
            var sendStatus = function(data){
                socket.emit('status', data)
            }

            socket.on('send chat message', function(data){
                if(!(data.message === '\n'||data.message === '')){
                    var message = new messageModel({
                        name : data.name,
                        message : data.message
                    });

                    // message.save(function(err,user) {
                    //     if(err){ 
                    //       return console.error(err)
                    //     }
                    // });

                io.emit('send chat message', data.message, data.name);
                }
            });

        // mongoose.connection.db.dropDatabase();
          
        // messageModel.find(function(err, ms) {
        //   if (err) return console.error(err);
        //   console.dir(ms);
        // })
        // socket.on('user joined', function(data){
        //   mongo.connect(CUSTOMCONNSTR_MONGOLAB_URI, function (err, db) {
        //           var collection = db.collection('current_user_base');

        //           collection.find({name : data.name}).toArray(function(err, result){
        //             if(data.name === '\n' || data.name === ''){
        //               sendStatus({
        //                 status : "need email"
        //               })
        //             }else{
        //               collection.insert(data, function(err, o){
        //                 if(err){console.log(err)}
        //                 else{console.log(data.name + " joined chat")}
        //               })
        //               io.emit('user joined', data.name);
        //           }  
        //           });
        //       });
        // });

        // socket.on('get online users', function(){
        //   mongo.connect(CUSTOMCONNSTR_MONGOLAB_URI, function (err, db) {
        //     var collection = db.collection('current_user_base');
        //     collection.find().toArray(function(err, result){
        //         if(err){console.log(err);}
        //         else{socket.emit('get online users', result);}
        //       })
        //   });
        // });

        // socket.on('disconnect', function(name){
        //   io.emit('disconnect');
        // });

        // socket.on("bring previous messages",function(){
        //   mongo.connect(CUSTOMCONNSTR_MONGOLAB_URI, function (err, db) {
        //       var collection = db.collection('chat_messages_tester');
        //           collection.find().limit(10).sort({_id:1}).toArray(function(err, result){
        //             if(err){
        //               console.log(err);
        //             }
        //             socket.emit('bring previous messages', result);
        //           })
        //   });
        // });
        });
    },
}

