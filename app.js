var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var path = require('path');
var routes = require('./routes/index');
var port = process.env.PORT || 3000;
var session = require('express-session');

var everyauth = require('everyauth');
var auth_config = require('./scripts/auth/auth_config');
var authentication = require('./scripts/auth/authentication_handler');

// var chatservice = require('./config/chat/chat');
var chatservice = require('./scripts/chat/chat_tester');

server.listen(port);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

authentication.verify_user(everyauth, auth_config);
everyauth.debug = true;


app.use(session({secret: "123456",
			     name: "test",
			     proxy: true,
			     resave: true,
			     saveUninitialized: true
				}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(everyauth.middleware());

app.use('/', routes);
chatservice.setServer(server);
console.log("*****************************");
console.log("* App running at port: " + port + " *");
console.log("*****************************");
