var socket = io();

$(window).load(function() {
	startChat();
});

var startChat = function(){
	$("#title").click(function(){
		window.location = '/home'
	});

	socket.emit('get online users');

	socket.on('get online users', function(data){
		for(var i = 0; i < data.length; i++){
			$('#users').append($('<li class="user">').text(" "+data[i].name));
		}
	});

	var time = new Date();
	var name = document.querySelector("textarea#name")

	person = ""
	var textarea = document.querySelector("textarea#text")
	var counter = 0;
	$('#bring').stop(true, false).click(function(){
		console.log(counter)
		counter++;
		socket.emit("bring previous messages");

		socket.on("bring previous messages", function(data){
		  if(data.length){
			for(var i=0; i< data.length; i++){
				var message = document.createElement('li');
				message.setAttribute('class', 'chat-message');
				message.textContent = data[i].name+ ": " + data[i].message;
				console.log(data[i].message)
				var messages = document.querySelector("#messages");
				messages.appendChild(message);
				messages.insertBefore(message, messages.firstChild);
			}
		  }
	  });
	});

	$("#eventBar, #bringEvents, #post_event").hover(
		function() {
		    $("#body").stop(true, false).animate({
		    	"opacity":"0.6"
		    },450);
		    $("#eventBar").stop(true, false).animate({
		    	"left":"0"
		    },450);
		    $("#eventBar").css({
		    	"z-index":"1"
		   	})
		    $("#bringEvents").stop(true, false).animate({
		    	"padding-left":"3%",
		    	"padding-right":"2%",
		    	"padding-bottom":"2%"
		    },450);
		    $("#post_event").css({
		    	'display': "block"
		    });
		    $("#bringEvents").html("<i class='fa fa-chevron-left'></i> Events ")
		},
		function(){
			console.log("moust leave")
		    $("#body").stop(true, false).animate({
		    	"opacity":"1"
		    },450);
		    $("#eventBar").stop(true, false).animate({
		    	"left":"-22%"
		    },450);
		    $("#eventBar").css({
		    	"z-index":"0"
		    });
		    $("#bringEvents").stop(true, false).animate({
		    	"padding-left":"0%",
		    	"padding-bottom":"0%"
		    },450);
		    $("#post_event").css({
		    	'display': "none"
		    });
		    $("#bringEvents").html("Events <i class='fa fa-chevron-right'></i>")
		}
	);

	$("#post_event").click(function(){
		alert("Post Event!");	
	})
	textarea.addEventListener('keydown',function(event){
		var self = this;
		var	person = name.value

		if(event.which === 13 && event.shiftKey === false){
			socket.emit('send chat message',{
				name : person,
				time : time,
				message: self.value
			});
			event.preventDefault();
		}
	});
	
	socket.on("user disconnected", function(name){
		$('#users> li:contains("' +name.value+ '" )').remove();
	})

	socket.on('status', function(data){
		if(data.status === 'need username'){
			alert("Input a valid username")
		}
	});
	
	socket.on('user joined', function(usr, status){
		$('#users').append($('<li class="user">').text(" "+usr));
	});
	
	socket.on('send chat message', function(msg, usr){
		if (person == usr){
			$('#messages').append($('<li class="user"> ').text(" "+usr + ": " +msg));
		}
		else {
			$('#messages').append($('<li class="other"> ').text(" "+usr + ": " +msg));
		}
		var myDiv = $("#messages");
		myDiv.animate({ 
			scrollTop: myDiv.prop("scrollHeight") + myDiv.height() 
		}, 10);
		textarea.value = '';
	});

	socket.on('disconnect',function(){
		console.log("User disconnected")
	})
}


