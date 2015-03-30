module.exports = {
  setServer: function(server){
      var mongo = require('mongodb').MongoClient;
      var io = require('socket.io')(server);
      
      io.on('connection', function(socket){
  
        var CUSTOMCONNSTR_MONGOLAB_URI = 'mongodb://pioneer1625:95023680a@ds035617.mongolab.com:35617/stream-events';

        socket.on('user joined', function(data){
          mongo.connect(CUSTOMCONNSTR_MONGOLAB_URI, function (err, db) {
              var collection = db.collection('current_names');
              var not_in = false;

                collection.insert(data, function (err, o) {
                    if (err) { console.warn(err.message); }
                    else { console.log(data.name + " joined chat");}
                });   
            });
  
            io.emit('user joined', data.name);
        });

        var sendStatus = function(data){
            socket.emit('status', data)
        }

        socket.on('send chat message', function(data){
            var whiteSpaceChecker = /^\s*&/;

            if(data.name === '\n'||data.name === ''){
              sendStatus({
                 status: "need username"
              });
              }else{
                mongo.connect(CUSTOMCONNSTR_MONGOLAB_URI, function (err, db) {
                  var collection = db.collection('chat_messages_tester');
                  collection.insert(data, function (err, o) {
                      if (err) { console.warn(err.message); }
                      sendStatus({
                        status: "valid input"
                      });
                  });
              });
            io.emit('send chat message', data.message, data.name);
          }
        });

        socket.on('disconnect', function(name){
          mongo.connect(CUSTOMCONNSTR_MONGOLAB_URI, function (err, db) {
              var collection = db.collection('chat_messages_tester');
                  collection.remove({name: name}, function(err, result){
                    if(err){
                      console.log(err);
                    }
                    console.log(result.name);
                    db.close()
                  })
          });
          io.emit('disconnect', name)
          console.log(name + " disconnected");
          io.emit('disconnect', name)
        });

        socket.on("bring previous messages",function(){
          mongo.connect(CUSTOMCONNSTR_MONGOLAB_URI, function (err, db) {
              var collection = db.collection('chat_messages_tester');
                  collection.find().limit(10).sort({_id:1}).toArray(function(err, result){
                    if(err){
                      console.log(err);
                    }
                    socket.emit('bring previous messages', result);
                  })
          });
        });
    });
  }
}

