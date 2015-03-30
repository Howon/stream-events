module.exports = {
  setServer: function(server){
      var mongo = require('mongodb').MongoClient;
      var io = require('socket.io')(server);
      
      io.on('connection', function(socket){
  
        var CUSTOMCONNSTR_MONGOLAB_URI = 'mongodb://pioneer1625:95023680a@ds035617.mongolab.com:35617/stream-events';

        socket.on('user joined', function(data){
          mongo.connect(CUSTOMCONNSTR_MONGOLAB_URI, function (err, db) {
                  var collection = db.collection('current_user_base');

                  collection.find({name : data.name}).toArray(function(err, result){
                    if(result.length > 0){
                      sendStatus({
                        status : "duplicate current user"
                      })
                    }else{
                      collection.insert(data, function(err, o){
                        if(err){console.log(err)}
                        else{console.log(data.name + " joined chat")}
                      })
                      io.emit('user joined', data.name);
                  }  
                  });
              });
        });

        socket.on('get online users', function(){
          mongo.connect(CUSTOMCONNSTR_MONGOLAB_URI, function (err, db) {
                  var collection = db.collection('current_user_base');
                  collection.find().toArray(function(err, result){
                      if(err){console.log(err);}
                      else{io.emit('get online users', result);}
                    })
                  });
              });
        var sendStatus = function(data){
            socket.emit('status', data)
        }

        socket.on('send chat message', function(data){
            if(data.name === '\n'||data.name === ''){
              sendStatus({
                 status: "need username"
              });
              }else{
                mongo.connect(CUSTOMCONNSTR_MONGOLAB_URI, function (err, db) {
                  var collection = db.collection('chat_messages');
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
          // mongo.connect(CUSTOMCONNSTR_MONGOLAB_URI, function (err, db) {
          //     var collection = db.collection('chat_messages');
          //         collection.remove({name: name}, function(err, result){
          //           if(err){
          //             console.log(err);
          //           }else{
          //             console.log(name + " left the chat")
          //           }
          //           db.close()
          //         })
          // });
          io.emit('disconnect', name)
        });

        socket.on("bring previous messages",function(){
          mongo.connect(CUSTOMCONNSTR_MONGOLAB_URI, function (err, db) {
              var collection = db.collection('chat_messages');
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

