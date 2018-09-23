const { createServer } = require('net');
const { createWriteStream } = require('fs');
const { Readable } = require('stream');
const path = require('path');

const server = createServer();
let id = 1;
const sockets = {};
let timestamp = Date.now();
let write;

server.on('listening', () => {
    let timestamp = Date.now();
    write = createWriteStream(path.join(__dirname, `log${timestamp}.txt`));
})

server.on('connection', (socket) => {
    socket.id = id++;
    sockets[socket.id] = socket;

    socket.write(`Your id is ${socket.id} \n`);
    console.log(`${socket.id}`);
    socket.on('data', (data) => {
        let read = new Readable({ 
            read(size) {
                if(data) {
                    this.push(`${socket.id} say: ${data}`);
                    this.push(null);
                }
        }});
        read.pipe(write,{end: false});     


        Object.entries(sockets).forEach(([s,cs]) => {
            let smth = Number.parseInt(socket.id%2);
            if (smth == 1) {
                if(s == socket.id + 1 || socket.id == s) {
                    cs.write(`${socket.id} say: ${data} `);
                  }
            } else if (smth == 0){
                if(s == socket.id - 1 || socket.id == s) {
                    cs.write(`${socket.id} say: ${data}`);
                }
            }
        });
        
    });

});
server.on('end', () => {
    console.log('end');
    write.end();
})
server.listen(3000);
console.log("server is listening");