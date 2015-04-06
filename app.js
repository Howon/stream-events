var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var path = require('path');
var routes = require('./routes/index');
var port = process.env.PORT || 3000;
var everyauth = require('everyauth');
var auth_config = require('./config/auth/auth_config');
var authentication = require('./config/auth/authentication_handler');

// var chatservice = require('./config/chat');
var chatservice = require('./config/chat_tester');

server.listen(port);

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');

app.use('/', routes);
app.use(everyauth.middleware());

authentication.verify_user(everyauth, auth_config);
chatservice.setServer(server);

console.log("Conneted to: " + port);
