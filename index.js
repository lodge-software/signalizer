var http = require('http').createServer();
var io = require('socket.io')(http);

// Super simple 1 room 2 people server
http.listen(7000);

console.log(`server running`);

io.on('connection', (client) => {
    console.log(`new connection: ${client.id}`);

    client.on('offer', (details) => {
        client.broadcast.emit('offer', details);

        console.log(`offer: ${JSON.stringify(details.desc)}`);
        console.log(`socket: ${JSON.stringify(details.socket)}`);
    })

    client.on('answer', (details) => {
        client.broadcast.emit('answer', details);
        console.log(`answer: ${JSON.stringify(details)}`);
    })

    client.on('candidate', (details) => {
        client.broadcast.emit('candidate', details);
        console.log(`candidate: ${JSON.stringify(details)}`);
    })

    client.broadcast.emit('createoffer', {});
})
