var socket = io(),
	userID;

$(window).load(function() {
	manipulate_elements();
	socket_handling();
});

var manipulate_elements = function(){
	control_sidebar();
	control_main_body_load();
}

var control_sidebar = function(){
	var eventBar = document.getElementById('eventBar'),
		bringButton = document.getElementById('bringButton');

	var eventbar_on = function(){
		    $("#body, #menuSelector").velocity('stop').velocity({
		    	"opacity":"0.4"
		    },{duration: 400});

		    $('#eventBar').velocity('stop').velocity({
		    	translateX: "307px"
		    },{duration: 400});

		    bringButton.style.paddingBottom = '30px';

		    $("#bringButton").velocity('stop').velocity({
		    	"padding-left":"3%"
		    }, {duration: 400});

		    $("#blank, #eventBarMenu, #calendarView").css({
		    	"display": 'block'
		    });

		    bringButton.innerHTML = "<i class='fa fa-chevron-left'></i>&nbsp; Events ";
	}

	var eventbar_out = function(){
		    $("#body, #menuSelector").velocity('stop').velocity({
		    	opacity:1
		    }, {duration: 450});

		    $('#eventBar').velocity('stop').velocity({
		    	translateX: "0"
		    }, {duration: 450});

		    bringButton.style.paddingBottom = '0'

		    $("#bringButton").velocity('stop').velocity({
		    	"padding-left":"0"
		    },{duration: 400});

		    $("#blank, #eventBarMenu, #calendarView").css({
		    	"display": 'none'
		    });

		    bringButton.innerHTML = "Events &nbsp;<i class='fa fa-chevron-right'></i>";
	}

	$("#bringButton, #eventBar, #calendarView, #blank").hover(eventbar_on, eventbar_out);

	var control_post_Area = function(){
		$("#eventPostArea").velocity({ opacity: 1 }, { display: "block" }, {duration: 200});
		eventbar_out();
		close_event_posting();
	};

	document.getElementById('post_event').onclick = control_post_Area;
}

var close_event_posting = function(){
	var container = $('#eventPostArea');

	window.onkeyup = function(e){
		if(!$("#map").is(':visible') && e.keyCode == 27){
			container.velocity({ opacity: 0 }, { display: "none" }, {duration: 200});
		}
	};
	
	document.getElementById("closePosting").onclick = function(){
		container.velocity({ opacity: 0 }, { display: "none" }, {duration: 200});
	};
}

var control_main_body_load = function(){
	var bringThread = document.getElementById('bringThread'),
	    bringChat = document.getElementById('bringChat'),
		threadArea = document.getElementById('threadArea'),
		chatArea = document.getElementById('chatArea');

	var removeChat = function(){	
					$("#bringMessages, #inputBar").css('display','none');   
					chatArea.style.zIndex = "-1";
					threadArea.style.zIndex = "0";
	};

	var removeThread = function(){	
					chatArea.style.zIndex = "0";
					threadArea.style.zIndex = "-1";
	};

    bringThread.onclick = function(){
			bringChat.style.color = "#000000";
			chatArea.style.zIndex = "-2";

			bringThread.style.color = "#00BCD4";
			threadArea.style.zIndex = "-1";

			$("#threadArea").velocity({
				"margin-left": "40%",
				"width": "60%"
			}, {duration: 300});

			$("#chatArea").velocity({
				"margin-left": "100%",
				"width" : "0"
			},{duration: 1, delay: 300});
			setTimeout(removeChat, 300);
	};

    bringChat.onclick = function(){
			chatArea.style.zIndex = "-1";
			bringChat.style.color = "#E91E63";

			threadArea.style.zIndex = "-2";
			bringThread.style.color = "#000000";

			$("#bringMessages, #inputBar").delay(50).queue( 
			  	function(next){ 
				    $(this).css('display','block'); 
				    next(); 
			});

			$("#chatArea").velocity({
				"margin-left": "40%",
				"width": "60%"
			}, {duration: 300});

			$("#threadArea").velocity({
				"margin-left": "100%",
				"width" : "0"
			}, {duration: 1, delay: 300});

			setTimeout(removeThread, 300);
			
	};
};

var socket_handling = function(){
	var redirect_home = function(){
		window.location = '/home'
	};

	document.getElementById('title').onclick = redirect_home;

	var textarea = document.getElementById("messageInput");
	var person = document.getElementById('userName').innerHTML;
	
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
	var send_message = function(event){
		var self = this;

		if(event.which === 13 && event.shiftKey === false){
			socket.emit('send chat message',{
				name : person,
				message: self.value
			});
			
			event.preventDefault();
		}
	}

	textarea.addEventListener('keydown', send_message);

	var post_submit_handler = function(){
		var event_name = document.getElementById("Name").value,
			event_time = document.getElementById("Time").value,
			event_location = document.getElementById("locDescript").value,
			event_description = document.getElementById("Description").value,
		 	valid = true;

		var alert = document.getElementById('alert');

		if(event_name === null || event_name === ""){
			alert.innerHTML = "Please enter event name";
			alert.style.display = 'block'
			valid = false
		}else if(event_location === null || event_location === ""){
			alert.innerHTML = "Please enter location of your event";
			alert.style.display = 'block'
			valid = false
		}else if(event_time === null || event_time === ""){
			alert.innerHTML = "Please enter time of your event";
			alert.style.display = 'block'
			valid = false
		}else if(event_description === null || event_description === ""){
			alert.innerHTML = "Please describe your event";
			alert.style.display = 'block'
			valid = false
		}

		if(valid){
			socket.emit("post event", {
				title : event_name,
				location: event_location,
				time : event_time,
				description: event_description
			});
			$("#eventPostArea").velocity({ opacity: 0 }, { display: "none" }, {duration: 300});
		}

		document.getElementById("Name").value = '';
		document.getElementById("Time").value = '';
		document.getElementById("locDescript").value = '';
		document.getElementById("Description").value = '';

		event_name = null;
		event_time = null;
		event_location = null;
		event_description = null;
		alert = null;
	};

	document.getElementById("submit").onclick = post_submit_handler;

    var close_post_area = function(){
    	$("#eventPostArea").velocity({ opacity: 0 }, { display: "none" }, {duration: 300});
    };

    document.getElementById("closePosting").onclick = close_post_area;

    var receive_chat_message = function(msg, user){
		var messages = document.getElementById('messages');

	    var message = document.createElement('li');
	    message.innerHTML = msg;

	    if (person == user){
		    message.className = 'user';
		}
		else {
		    message.className = 'other';
		}

		messages.appendChild(message);

		$("#messages").velocity({ 
			scrollTop: $("#messages").prop("scrollHeight") + $("#messages").height() 
		}, 10);

		textarea.value = '';
	};

	socket.on('send chat message', receive_chat_message);

	var handle_new_event = function(event){
		var eventStream = document.getElementById("eventStream");
		var eventPost_node = document.createElement("LI");

		eventPost_node.className = 'event';

		var textNode;

		var eventPost_title = document.createElement("div");
			eventPost_title.className = eventPost_title;
			textNode = document.createTextNode(event.title);
			eventPost_title.appendChild(textNode);

		var eventPost_location = document.createElement("div");
			eventPost_location.className = eventPost_location;
			textNode = document.createTextNode(event.location);
			eventPost_location.appendChild(textNode);

		var eventPost_time = document.createElement("div");
			eventPost_time.className = eventPost_time;
			textNode = document.createTextNode(event.time);
			eventPost_time.appendChild(textNode);
			
		var eventPost_description = document.createElement("div");
			eventPost_description.className = eventPost_description;
			textNode = document.createTextNode(event.description);
			eventPost_description.appendChild(textNode);
		
	    eventPost_node.appendChild(eventPost_title);
	    eventPost_node.appendChild(eventPost_location);
	    eventPost_node.appendChild(eventPost_time);
	    eventPost_node.appendChild(eventPost_description);

	    if(eventStream.childNodes[0].id === 'noEventFiller'){
	    	eventStream.replaceChild(eventPost_node, eventStream.childNodes[0]);
	    }else{
	    	eventStream.appendChild(eventPost_node);
	    }
	};

	socket.on('new event', handle_new_event);

	socket.on('disconnect',function(){
		console.log("User disconnected")
	})
};
