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
   

  console.log(`Client${socket.id + 1} has logged in`);
  socket.write(`.:: Welcome to chat Client${socket.id + 1} ::. \r\n`);

  socket.on('data', (data) => {
    if(data.toString().charCodeAt() === 13) {
      Object.entries(sockets).forEach(([key,cs]) => {
        if (socket.id % 2 == 0) {
          if(key == socket.id + 1) {
            cs.write(`Massage from Client${socket.id + 1}: > ${massage.join('')} < \r\n`);
            history.push(`cl${socket.id + 1}:${massage.join('')}`);
          }
        } 
        else if(key == socket.id - 1) {
          cs.write(`Massage from Client${socket.id + 1}: > ${massage.join('')} < \r\n`);
          history.push(`cl${socket.id + 1}:${massage.join('')}`);
        }
      });
      massage = [];
    }
    else massage.push(data);       
  });

  socket.on('end', () => {
    const clienHistory = createWriteStream(`client${socket.id + 1}.his.txt`);
    if (socket.id % 2 === 0) {      
      clienHistory.write(history.filter((el) => (el[2] == socket.id + 1) || (el[2] == socket.id + 2)).join(','));
    }
    else if (socket.id % 2 === 1) {
      clienHistory.write(history.filter((el) => (el[2] == socket.id + 1) || (el[2] == socket.id)).join(','));
    }
    delete sockets[socket.id];
        
    if(Object.entries(sockets).length === 0) {
      const allHistory = createWriteStream(`his.txt`);
      allHistory.write(history.join(','));
      history = [];
    } 

    console.log(`Client${socket.id + 1} disconnected`);
  });
});

server.listen(8000, () => {
  console.log('Listening...');
});