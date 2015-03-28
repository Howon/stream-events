var socket = io();

$(window).load(function() {
	var userRegistered = false;
	while(!userRegistered){
		var person = prompt("Please enter your name");
		if(person != null && person != ""){
			userRegistered = true;
			startChat(person);
		}
	}
});

var startChat = function(person){
	var time = new Date();
		var user_info = [person, time]
		socket.emit('user joined', user_info);
		socket.on('user joined', function(usr){
			if (person == usr){
				$('#users').append($('<li class="user">').text(usr));	
			}
			else {
				$('#users').append($('<li class="user">').text(usr));	
			}
		});

		$('form').submit(function(){
			input = [person, $('#m').val(), time];
			socket.emit('chat message', input);
			$('#m').val('');
			return false;
		});

		socket.on('chat message', function(msg, usr){
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
	});
}