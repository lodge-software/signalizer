import * as socketio from 'socket.io';
import { Signal } from './types';

let http = require('http').createServer();
let io = require('socket.io')(http);

// Super simple 1 room 2 people server
http.listen(7000);

console.log(`server running`);

io.on('connection', (socket: socketio.Socket) => {
    console.log(`new connection: ${socket.id}`);

    socket.on('offer', (payload: Signal) => {
        // if (!payload.room) {
        //     payload.room = `room-${payload.origin}`;
        //     socket.join(payload.room);
        //     io.to(payload.origin).emit('joined room', payload.room);
        //     socket.to(payload.room).emit('offer', payload);
        // } else {
        //     socket.join(payload.room);
        //     socket.to(payload.room).emit('offer', payload);
        // }
        socket.broadcast.emit('offer', payload);

        console.log(`offer: ${JSON.stringify(payload)}`);
    })

    socket.on('answer', (payload) => {
        socket.broadcast.emit('answer', payload);
        console.log(`answer: ${JSON.stringify(payload)}`);
    })

    socket.on('new-ice-candidate', (payload) => {
        socket.broadcast.emit('new-ice-candidate', payload);
        console.log(`new-ice-candidate: ${JSON.stringify(payload)}`);
    })

    socket.broadcast.emit('createoffer', {});

    socket.on('disconnect', () => {
        console.log(`The socket id: ${socket.id} has disconnected`);
      });
})
