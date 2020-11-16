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
        if (!payload.room) {
            // Not thoroghly tested
            const room = `room-${payload.origin}`;
            socket.join(room);
            socket.emit('joined room', { room: room });
            // io.to(payload.target).emit('joined room', { room: room });
            payload = { ...payload, room: room };
            if (payload.target != '') {
                socket.to(payload.target).emit('offer', payload);
            } else {
                socket.to(room).emit('offer', payload);
                // return error if no one in the room?
            }
        } else {
            socket.join(payload.room);
            socket.to(payload.room).emit('offer', payload);
        }
        console.log(`offer: ${JSON.stringify(payload)}`);
    });

    socket.on('answer', (payload) => {
        // Should have a room already
        if (payload.target) {
            console.log(`Sending answer to socket id: ${payload.target}`);
            socket.to(payload.target).emit('answer', payload);
        } else {
            console.log(`Sending answer to room: ${payload.room}`);
            socket.to(payload.room).emit('answer', payload);
        }
        console.log(`answer: ${JSON.stringify(payload)}`);
    });

    socket.on('new-ice-candidate', (payload) => {
        socket.broadcast.emit('new-ice-candidate', payload);
        console.log(`new-ice-candidate: ${JSON.stringify(payload)}`);
    });

    socket.on('join room', (payload) => {
        socket.join(payload.room);
        console.log(`${socket.id} joined ${payload.room}`);
        socket.emit('joined room', { room: payload.room });
        // locked room
        // if (locked) emit cannot join room
    });

    socket.broadcast.emit('createoffer', {});

    socket.on('disconnect', () => {
        console.log(`The socket id: ${socket.id} has disconnected`);
      });
})
