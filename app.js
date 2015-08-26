var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var path = require('path');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var config = require('./scripts/config');

var io = require('socket.io')(server);

var mongoose = require('mongoose');
	mongoose.connect(config.mongoose.url);
	// mongoose.connect(config.mongoose.url, function(){
	// 	mongoose.connection.db.dropDatabase();
	// });


require('node-jsx').install({ harmony: true, extension: '.jsx' });

server.listen(config.port);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'cookiezcookiezcookiez',
    name: 'this_cookie',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static(path.join(__dirname, 'public')));

require('./scripts/auth/authenticate')(passport);
require('./scripts/chat/chat')(io, mongoose);
require('./scripts/event/event_handler').Event_Handler(io, mongoose);
require('./scripts/event/thread_handler')(io, mongoose);

require('./scripts/routes/routes')(app, passport, io);
console.log("*****************************");
console.log("* App running at port: " + config.port + " *");
console.log("*****************************");
