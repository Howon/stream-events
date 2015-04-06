module.exports = {
  setServer: function(server){
      var mongo = require('mongodb').MongoClient;
      var io = require('socket.io')(server);
      
      io.on('connection', function(socket){
  
        var CUSTOMCONNSTR_MONGOLAB_URI = 'mongodb://master:master@ds059471.mongolab.com:59471/stream-events';

        var userArr = []; 
       
        var sendStatus = function(data){
            socket.emit('status', data)
        }

        socket.on('user joined', function(data){
          mongo.connect(CUSTOMCONNSTR_MONGOLAB_URI, function (err, db) {
                  var collection = db.collection('current_user_base');

                  collection.find({name : data.name}).toArray(function(err, result){
                    if(data.name === '\n' || data.name === ''){
                      sendStatus({
                        status : "need email"
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
                else{socket.emit('get online users', result);}
              })
          });
        });
 
        socket.on('send chat message', function(data){
          if(!(data.message === '\n'||data.message === '')){
             mongo.connect(CUSTOMCONNSTR_MONGOLAB_URI, function (err, db) {
               var collection = db.collection('chat_messages_tester');
               collection.insert(data, function (err, o) {
                   if (err) { console.warn(err.message); }
               });
             });
            io.emit('send chat message', data.message, data.name);
          }
        });

        socket.on('disconnect', function(name){
          io.emit('disconnect');
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

