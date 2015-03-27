var express = require('express');
var app = express();
// app.set('port', process.env.PORT || 8080);
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
var path = require('path');
var routes = require('./routes/index');
var fs = require('fs');
var port = process.env.PORT || 3000;
server.listen(port);

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');

app.use('/', routes);

// var sio = require('./config/socket.js')();

io.on('connection', function(socket){
	var message = ' ';
	var outputFilename = './data/log.json';

	socket.on('chat message', function(input){
		var usr = input[0];
		var msg = input[1];
		io.emit('chat message', msg);

	  	var myData = {
		  name:'test',
		  version:'1.0',
		  user : usr,
		  content: msg
		}

		fs.appendFile(outputFilename, JSON.stringify(myData, null, 4), function(err) {
		    if(err) {
		      console.log(err);
		    } else {
		      console.log("JSON saved to " + outputFilename + " "+ usr + " " + msg);
		    }
		}); 
	});
}) ;
