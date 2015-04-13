var socket = io();

$(window).load(function() {
	manipulate_elements();
	socket_handling();
});

var manipulate_elements = function(){
	control_sidebar();
	control_main_body_load();
}

var control_sidebar = function(){
	var eventbar_on = function(){
		    $("#body, #menuSelector").stop(true, false).animate({
		    	"opacity":"0.4"
		    },300);
		    $("#eventBar").stop(true, false).animate({
		    	"left":"0"
		    },300);
		    $("#bringEvents").css({
		    	"padding-right":"3%",
		    	"padding-bottom":"4%"
		    })
		    $("#bringEvents").stop(true, false).animate({
		    	"padding-left":"4%"
		    },300);
		    $("#bringEvents").html("<i class='fa fa-chevron-left'></i> Events ")
		}

	var eventbar_out = function(){
	    $("#body, #menuSelector").stop(true, false).animate({
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
	    },300);
	    $("#bringEvents").html("Events <i class='fa fa-chevron-right'></i>")
	}

	$("#bringEvents, #eventBar").hover(eventbar_on, eventbar_out);

	$("#post_event").click(function(){
		$("#eventPostArea").fadeIn(300);
		eventbar_out();
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

var threadOn = true;
var chatOn = false;
var infoOn = true;
var control_main_body_load = function(){
	$("#eventInfo").click(
		function(){
			infoOn = true;
			$("#eventInfo").css({
				"color": "#D347A8"
			});
			$("#messageStream").css({
				"color": "#000000"
			});$("#eventThread").css({
				"color": "#000000"
			});
			if(threadOn){
				$("#thread").animate({
					"margin-left": "60%",
					"width" : "40%"
				},300);
				$("#chatarea").animate({
					"margin-left": "100%",
					"width" : "0%"
				},300);
			}else if(chatOn){
				$("#bringMessages").css({
					"display":"block"
				});
				$("#thread").animate({
					"margin-left": "100%",
					"width" : "0%"
				},500);
				$("#chatarea").animate({
					"margin-left": "60%",
					"width" : "40%"
				},300);
			}
		}
	);

    $("#eventThread").click(
		function(){
			threadOn = true;
			chaton = false;

			$("#eventThread").css({
				"color": "#5ED3D2"
			});
			$("#messageStream").css({
				"color": "#000000"
			});
			$("#eventInfo").css({
				"color": "#000000"
			});
			$("#thread").css({
				"z-index":"10"
			});
			$("#chatarea").css({
				"z-index":"0"
			});
			$("#thread").animate({
				"margin-left": "10%",
				"width": "90%"
			},300);
			$("#bringMessages, textarea.messaging").css({
				"display": "none"
			});
			if(infoOn){
				$("#chatarea").delay(400).animate({
					"margin-left": "100%",
					"width" : "0"
				}, 300);
			}else{
				$("#chatarea").animate({
					"margin-left": "100%",
					"width" : "0"
				}, 300);
			}
			infoOn = false;
		}
	);

    $("#messageStream").click(
		function(){
			threadOn = false;
			chatOn = true;

			$("#messageStream").css({
				"color": "#F5B07F"
			});
			$("#eventThread").css({
				"color": "#000000"
			});
			$("#eventInfo").css({
				"color": "#000000"
			});
			$("#thread").css({
				"z-index":"0"
			});
			$("#chatarea").css({
				"z-index":"10"
			});
			$("#bringMessages, textarea.messaging").css({
				"display": "block"
			});
			$("#chatarea").animate({
				"margin-left": "10%",
				"width": "90%"
			},300);
			if(infoOn){
				$("#thread").delay(400).animate({
					"margin-left": "100%",
					"width" : "0"
				}, 300);
			}else{
				$("#thread").animate({
					"margin-left": "100%",
					"width" : "0"
				}, 300);
			}
			
			infoOn = false;
		}
	);
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

	$('#bringMessages').off().click(function(){
		console.log("pressed")	/* Act on the event */
		socket.emit("bring previous messages");

		socket.on("bring previous messages", function(data){
		  if(data.length){
			for(var i=0; i< data.length; i++){
				var message = document.createElement('li');
				message.setAttribute('class', 'chat-message');
				message.textContent = data[i].name+ ": " + data[i].message;
				// console.log(data[i].message)
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

