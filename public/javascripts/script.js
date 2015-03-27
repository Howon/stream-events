var socket = io();


$(window).load(function() {
	var person = prompt("Please enter your name");
	if(person != null){
		$('form').submit(function(){
			input = [person, $('#m').val()];
			socket.emit('chat message', input);
			$('#m').val('');
			return false;
		});

		socket.on('chat message', function(msg){
			$('#messages').append($('<li>').text(person + ": " +msg));
		});
	}
});