$(document).ready(function(){
	var socket = io.connect(); 

	//******************KNOCKOUT******************
	function AppViewModel() {
		var self = this;
		self.username = ko.observable();
	    self.texto = ko.observable();
	    self.messages = ko.observableArray([]);

	    self.sendMessage = function() {
	    	console.log("sending to server: " + self.texto());
	        socket.emit('messageToServer', 
	        	        { 'user': self.username(), 'message': self.texto() });
	    }

	    socket.on('newMessage', function(text){
	    	console.log("received: " + text);
			self.messages.push(text);
		});
	}

	// Activates knockout.js
	ko.applyBindings(new AppViewModel());
});