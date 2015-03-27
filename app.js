var express = require('express');
var app = express();
// app.set('port', process.env.PORT || 8080);
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
var path = require('path');
var routes = require('./routes/index');

var port = process.env.PORT || 8080;
server.listen(port);

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');

app.use('/', routes);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


