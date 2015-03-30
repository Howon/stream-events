var socket = io();

$(window).load(function() {
	startChat();

	socket.on('disconnect', function(name){
			$("#users").remove(("li:contains('"+name+"')"));
			console.log(name+ "disconnected");
		})
});

var startChat = function(){

	var time = new Date();
	var name = document.querySelector("textarea#name")

	person = ""
	var textarea = document.querySelector("textarea#text")

	$('#bring').click(function(){
		console.log('clicked');
		socket.emit("bring previous messages");
		socket.on("bring previous messages", function(data){
		if(data.length){
			for(var i=0; i< data.length; i++){
				var message = document.createElement('li');
				message.setAttribute('class', 'chat-message');
				message.textContent = data[i].name+ ": " + data[i].message;
				var messages = document.querySelector("#messages");
				messages.appendChild(message);
				messages.insertBefore(message, messages.firstChild);
			}
		}
	  });
	});

	textarea.addEventListener('keydown',function(event){
		var self = this;
			person = name.value
		

		socket.on('status', function(data){
			if(data.status === 'need username'){
				alert("Input a valid username")
			}
		});

		if(event.which === 13 && event.shiftKey === false){
			socket.emit('send chat message',{
				name : person,
				time : time,
				message: self.value
			});
			socket.emit('namejoined', {
				name: person,
				time : time
			});
			event.preventDefault();
		}
	});

	socket.on('user joined', function(usr, status){
		// if(status){
			if (person == usr){
				$('#users').append($('<li class="user">').text(usr));	
			}
			else {
				$('#users').append($('<li class="user">').text(usr));	
			}
		// }
	});

	socket.on('send chat message', function(msg, usr){
		if (person == usr){
			$('#messages').append($('<li class="user">').text(usr + ": " +msg));
		}
		else {
			$('#messages').append($('<li class="other">').text(usr + ": " +msg));
		}
		var myDiv = $("#messages");
		myDiv.animate({ 
			scrollTop: myDiv.prop("scrollHeight") + myDiv.height() 
		}, 10);

		textarea.value = '';
	});
}


