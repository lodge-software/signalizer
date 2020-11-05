var http = require('http').createServer();
var io = require('socket.io')(http);

// Super simple 1 room 2 people server
http.listen(7000);

console.log(`server running`);

io.on('connection', (socket) => {
    console.log(`new connection: ${socket.id}`);

    socket.on('offer', (details) => {
        socket.broadcast.emit('offer', details);

        console.log(`offer: ${JSON.stringify(details.desc)}`);
        console.log(`socket: ${JSON.stringify(details.socket)}`);
    })

    socket.on('answer', (details) => {
        socket.broadcast.emit('answer', details);
        console.log(`answer: ${JSON.stringify(details)}`);
    })

    socket.on('candidate', (details) => {
        socket.broadcast.emit('candidate', details);
        console.log(`candidate: ${JSON.stringify(details)}`);
    })

    socket.broadcast.emit('createoffer', {});

    socket.on('disconnect', () => {
        console.log(`The socket id: ${socket.id} has disconnected`);
      });
})
