var socket = io();

$(window).load(function() {
	manipulate_elements();
	socket_handling();
	getLocation();
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
		    },300, "swing");
		    $("#bringButton").css({
		    	"padding-bottom":"35px"
		    })
		    $("#bringButton").stop(true, false).animate({
		    	"padding-left":"3%"
		    },300);
		    $("#blank").css({
		    	"display": 'block'
		    });
		    $("#calendarView").stop(true, false).fadeIn(300);
		    $("#bringButton").html("<i class='fa fa-chevron-left'></i>&nbsp; Events ")
		}

	var eventbar_out = function(){
	    $("#body, #menuSelector").stop(true, false).animate({
	    	"opacity":"1"
	    },350);
	    $("#eventBar").stop(true, false).animate({
	    	"left":"-23%"
	    },350, "swing");
	    $("#eventBar").css({
	    	"z-index":"0"
	    });
	    $("#bringButton").css({
	    	"padding-bottom":"0"
	    })
	    $("#bringButton").stop(true, false).animate({
	    	"padding-left":"0"
	    },300);
	    $("#blank").css({
	    	"display": 'none'
	    });
		$("#calendarView").stop(true, false).fadeOut(300);
	    $("#bringButton").html("Events &nbsp;<i class='fa fa-chevron-right'></i>")
	}

	$("#bringButton, #eventBar, #calendarView, #blank").hover(eventbar_on, eventbar_out);

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
	}).keyup(function(e){
		if(e.keyCode == 27){
			$("#eventPostArea").fadeOut(300);
		}
	});;
	$("#cancel").click(function(){
		$("#eventPostArea").fadeOut(300);
	});
}

var control_main_body_load = function(){
    $("#eventThread").click(
		function(){
			$("#eventThread").css({
				"color": "#5ED3D2"
			});
			$("#messageStream").css({
				"color": "#000000"
			});
			$("#thread").css({
				"z-index":"-2"
			});
			$("#chatarea").css({
				"z-index":"-5"
			});
			$("#thread").animate({
				"margin-left": "40%",
				"width": "60%"
			},200);
			$("#chatarea").delay(200).animate({
				"margin-left": "100%",
				"width" : "0"
			},1);
			$("#bringMessages, #inputBar").delay(200).queue( 
			  	function(next){ 
				    $(this).css('display','none'); 
				    next(); 
			});
			threadOn = true;
			chaton = false;
		}
	);

    $("#messageStream").click(
		function(){
			$("#messageStream").css({
				"color": "#E0C2D7"
			});
			$("#eventThread").css({
				"color": "#000000"
			});
			$("#thread").css({
				"z-index":"-5"
			});
			$("#chatarea").css({
				"z-index":"-2"
			});
			$("#bringMessages, #inputBar").delay(50).queue( 
			  	function(next){ 
				    $(this).css('display','block'); 
				    next(); 
			});
			$("#chatarea").animate({
				"margin-left": "40%",
				"width": "60%"
			},200);
			$("#thread").delay(200).animate({
				"margin-left": "100%",
				"width" : "0"
			}, 1);
			threadOn = false;
			chatOn = true;
			infoOn = false;
		}
	);
}

var socket_handling = function(){
	$("#title").click(function(){
		window.location = '/home'
	});
	
	// socket.emit('get online users');

	// socket.on('get online users', function(data){
	// 	for(var i = 0; i < data.length; i++){
	// 		$('#users').append($('<li class="user">').text(" "+data[i].name));
	// 	}
	// });

	var time = new Date();
	var name = document.querySelector("textarea#name")

	person = ""

	var textarea = document.querySelector("input#text")

	// $('#bringMessages').off().click(function(){
	// 	console.log("pressed")	/* Act on the event */
	// 	socket.emit("bring previous messages");

	// 	socket.on("bring previous messages", function(data){
	// 	  if(data.length){
	// 		for(var i=0; i< data.length; i++){
	// 			var message = document.createElement('li');
	// 			message.setAttribute('class', 'chat-message');
	// 			message.textContent = data[i].name+ ": " + data[i].message;
	// 			// console.log(data[i].message)
	// 			var messages = document.querySelector("#messages");
	// 			messages.appendChild(message);
	// 			messages.insertBefore(message, messages.firstChild);
	// 		}
	// 	  }
	//   });
	// });

	textarea.addEventListener('keydown',function(event){
		var self = this;
		// var	person = name.value

		if(event.which === 13 && event.shiftKey === false){
			console.log(self.value);
			socket.emit('send chat message',{
				// name : person,
				time : time,
				message: self.value
			});
			socket.emit('user joined',{
				// name : person,
				time : time
			})
			event.preventDefault();
		}
	});
	
	$("#submit").click(function(){
		var event_name = $(".eventPost#Name").val(),
			event_time = $(".eventPost#Time").val(),
			event_location = $(".eventPost#Location").val(),
			event_description = $(".eventPost#Description").val(),
		 	valid = true;

		if(event_name === null || event_name === ""){
			$("#alert").html("Please enter event name");
			$("#alert").css({
				"display": "block"
			});
			valid = false
		}else if(event_time === null || event_time === ""){
			$("#alert").html("Please enter time of your event");
			$("#alert").css({
				"display": "block"
			});
			valid = false
		}else if(event_location === null || event_location === ""){
			$("#alert").html("Please enter location of your event");
			$("#alert").css({
				"display": "block"
			});
			valid = false
		}else if(event_description === null || event_description === ""){
			$("#alert").html("Please describe your event");
			$("#alert").css({
				"display": "block"
			});
			valid = false
		}

		if(valid){
			socket.emit("post event", {
				event : event_name,
				time : event_time,
				location: event_location,
				description: event_description
			});
			$("#eventPostArea").fadeOut(300);
		}
	});

    $("#closePosting").click(function(){
    	$("#eventPostArea").fadeOut(300);
    })

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
			$('#messages').append($('<li class="user"> ').text(msg));
		}
		else {
			$('#messages').append($('<li class="other"> ').text(msg));
		}
		$("#messages").animate({ 
			scrollTop: $("#messages").prop("scrollHeight") + $("#messages").height() 
		}, 10);
		textarea.value = '';
	});

	socket.on('disconnect',function(){
		console.log("User disconnected")
	})
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    console.log(lat + " " + lon);   
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.")
            break;
    }
}
