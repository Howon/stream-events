var socket = io();

$(window).load(function() {
	startChat();
});
//
//have it emit name of the current user at a uniform interval
//
var startChat = function(){
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
		var	person = name.value

		if(event.which === 13 && event.shiftKey === false){
			socket.emit('send chat message',{
				name : person,
				time : time,
				message: self.value
			});

			socket.emit('user joined', {
				name : person,
				time : time
			});

			event.preventDefault();
		}
	});


	socket.on('status', function(data){
		if(data.status === 'need username'){
			alert("Input a valid username")
		}
	});

	socket.on('user joined', function(usr, status){
			// if (person 	== usr){
		$('#users').append($('<li class="user">').text(" "+usr));	
			// }		
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
		console.log(name.value)
		$('#users> li:contains("' +name.value+ '" )').remove();
	})
}


