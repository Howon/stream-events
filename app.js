var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var path = require('path');
var port = process.env.PORT || 3000;

var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var config = require('./scripts/config');

require('./scripts/auth/authenticate')(passport);

var io = require('socket.io')(server);

var mongoose = require('mongoose');
	mongoose.connect(config.mongoose.url);

var chat_service = require('./scripts/chat/chat_tester');
require('./scripts/event/event_handler')(io, mongoose);

server.listen(port);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static(path.join(__dirname, 'public')));

chat_service.setChatService(io, mongoose);

require('./scripts/routes/routes')(app, passport);
require('./scripts/event/scrape').scrape();

console.log("*****************************");
console.log("* App running at port: " + port + " *");
console.log("*****************************");
