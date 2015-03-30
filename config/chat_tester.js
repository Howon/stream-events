module.exports = {
  setServer: function(server){
      var mongo = require('mongodb').MongoClient;
      var io = require('socket.io')(server);
      
      io.on('connection', function(socket){
  
        var CUSTOMCONNSTR_MONGOLAB_URI = 'mongodb://pioneer1625:95023680a@ds035617.mongolab.com:35617/stream-events';

        socket.on('user joined', function(input){
          var usr = input[0];
          var time = input[1];
          var data = {
            user: usr,
            time: time,
          }

          mongo.connect(CUSTOMCONNSTR_MONGOLAB_URI, function (err, db) {
              var collection = db.collection('current_users');
              var not_in = false;

              // collection.findOne({user: usr}, function(err, document) {
              //   if(err){
              //     console.log('error');
              //     not_in = true;
              //     console.log(document.user);
              //   }
              // });  

              // if(not_in){
                collection.insert(data, function (err, o) {
                    if (err) { console.warn(err.message); }
                    else { console.log(usr + " joined chat");}
                });
              // }        
            });
  
            io.emit('user joined', usr);
        });

        socket.on('chat message', function(input){
          var usr = input[0];
          var msg = input[1];
          var time = input[2];
          var data = {
            user: usr,
              time: time,
              content: msg
          }
         
          mongo.connect(CUSTOMCONNSTR_MONGOLAB_URI, function (err, db) {
                  var collection = db.collection('chat_messages_tester');
                  collection.insert(data, function (err, o) {
                      if (err) { console.warn(err.message); }
                      else { console.log("chat message inserted into db: " + msg); }
                  });
              });
          io.emit('chat message', msg, usr);
        });

        socket.on('disconnect',function(user){
          mongo.connect(CUSTOMCONNSTR_MONGOLAB_URI, function (err, db) {
              var collection = db.collection('chat_messages_tester');
                  collection.deleteOne
          });
          console.log("User disconnected");
        });
    });
  }
}

