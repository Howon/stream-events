var socket = io();

$(window).load(function() {
	var person = prompt("Please enter your name");
	
	if(person != null){
		var time = new Date();

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
		});
	}
});
