var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var path = require('path');
var routes = require('./routes/index');
var port = process.env.PORT || 3000;

// var chatservice = require('./config/chat');
var chatservice = require('./config/chat_tester');

server.listen(port);

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');

app.use('/', routes);

chatservice.setServer(server);

console.log("Conneted to: " + port);
