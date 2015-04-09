var socket = io();

$(window).load(function() {
	socket_handling();
	manipulate_elements();
});

var manipulate_elements = function(){
	control_sidebar();
}

var control_sidebar = function(){
	$("#bringEvents, #eventBar").hover(
		function() {
		    $("#body").stop(true, false).animate({
		    	"opacity":"0.4"
		    },350);
		    $("#eventBar").stop(true, false).animate({
		    	"left":"0"
		    },350);
		    $("#bringEvents").css({
		    	"padding-right":"3%",
		    	"padding-bottom":"4%"
		    })
		    $("#bringEvents").stop(true, false).animate({
		    	"padding-left":"4%"
		    },350);
		    $("#bringEvents").html("<i class='fa fa-chevron-left'></i> Events ")
		},
		function(){
		    $("#body").stop(true, false).animate({
		    	"opacity":"1"
		    },350);
		    $("#eventBar").stop(true, false).animate({
		    	"left":"-23%"
		    },350);
		    $("#eventBar").css({
		    	"z-index":"0"
		    });
		    $("#bringEvents").css({
		    	"padding-right":"0",
		    	"padding-bottom":"0"
		    })
		    $("#bringEvents").stop(true, false).animate({
		    	"padding-left":"0"
		    },350, "linear");
		    $("#bringEvents").html("Events <i class='fa fa-chevron-right'></i>")
		}
	);

	$("#post_event").click(function(){
		$("#eventPostArea").fadeIn(300);
		control_event_posting();
	});
}

var control_event_posting = function(){
	$(document).mouseup(function (e){
		var container = $("#eventPostArea");
		if (!container.is(e.target) && container.has(e.target).length === 0){ // ... nor a descendant of the container
        	container.fadeOut(300);
	    }
	});
}

var socket_handling = function(){
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
	$("#bring").mouseenter(function(event) {
		console.log("pressed")	/* Act on the event */
	});
	$('#bring').off().click(function(){
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

	textarea.addEventListener('keydown',function(event){
		var self = this;
		var	person = name.value

		if(event.which === 13 && event.shiftKey === false){
			socket.emit('send chat message',{
				name : person,
				time : time,
				message: self.value
			});
			socket.emit('user joined',{
				name : person,
				time : time
			})
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

