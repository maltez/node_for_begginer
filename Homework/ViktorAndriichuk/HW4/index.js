const { createServer } = require('net');
const server = createServer();

const usernames = {};
const room = 'chat';
let chatHistory = [];

server.on('connection', function (socket) {
	socket.on('adduser', (username) => {
		socket.username = username;
		socket.room = room;
		usernames[username] = username;
		socket.emit('updatechat', `You already connected to ${room}`);
	});

	socket.on('sendMessage', (data) => {
		socket.room.emit('updatechat', socket.username, data);
		chatHistory = [...chatHistory, data];
	});

	socket.on('disconnect', () => {
		delete usernames[socket.username];
		sockets.emit('updateusers', usernames);
	});
})

server.listen(8000, function (err) {
  	if (err) throw err
  	console.log('Listening on port 8000')
})
