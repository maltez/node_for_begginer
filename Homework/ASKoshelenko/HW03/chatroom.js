const { createServer } = require('net');
const { createWriteStream } = require('fs');

const server = createServer();
const sockets = {}; 
let counter = 0;
let massage = [];
let history = [];

server.on('connection', (socket) => {  
  socket.id = counter++; 
  sockets[socket.id] = socket;
  const writeData = createWriteStream(`his.txt`);  

  console.log(`Connection established from client id: ${socket.id}`);
  socket.write(`Welcome to chat Client${socket.id + 1} \r\n`);

  socket.on('data', (data) => {
    if(data.toString().charCodeAt() === 13) {
      Object.entries(sockets).forEach(([key,cs]) => {
        if (socket.id % 2 == 0) {
          if(key == socket.id + 1) {
            cs.write(`Massage from Client${socket.id + 1}: ${massage.join('')} \r\n`);
            history.push(`cl${socket.id + 1}:${massage.join('')}`);
          }
        } 
        else if(key == socket.id - 1) {
          cs.write(`Massage from Client${socket.id + 1}: ${massage.join('')} \r\n`);
          history.push(`cl${socket.id + 1}:${massage.join('')}`);
        }
      });
      massage = [];
    }
    else massage.push(data);       
  });

  socket.on('end', () => {
    writeData.write(history.join(''));
    let clienHistory = createWriteStream(`client${socket.id}.his.txt`);
    clienHistory.write(history.join(''));
    delete sockets[socket.id];
    console.log(`Socket ${socket.id} - disconnected`);
  });
});

server.listen(8000, () => {
  console.log('Listening...');
});