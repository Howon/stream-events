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

		socket.on('chat message', function(msg){
			$('#messages').append($('<li>').text(person + ": " +msg));
		});
	}
});
