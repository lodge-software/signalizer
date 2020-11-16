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
<<<<<<< HEAD
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
            }
        } else {
            socket.join(payload.room);
            socket.to(payload.room).emit('offer', payload);
        }
        console.log(`offer: ${JSON.stringify(payload)}`);
    });

    socket.on('answer', (payload) => {
        // Should have a room already
        if (payload.target != '') {
            console.log(`Sending answer to socket id: ${payload.target}`);
            socket.to(payload.target).emit('answer', payload);
        } else {
            console.log(`Sending answer to room: ${payload.room}`);
            socket.to(payload.room).emit('answer', payload);
        }
        console.log(`answer: ${JSON.stringify(payload)}`);
    });
=======
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
>>>>>>> c619c117278eeb475e4b12971dfb09ebd92deab6

    socket.on('new-ice-candidate', (payload) => {
        socket.broadcast.emit('new-ice-candidate', payload);
        console.log(`new-ice-candidate: ${JSON.stringify(payload)}`);
<<<<<<< HEAD
    });

    socket.on('join room', (payload) => {
        socket.join(payload.room);
        console.log(`${socket.id} joined ${payload.room}`);
        socket.emit('joined room', { room: payload.room });
        // locked room
        // if (locked) emit cannot join room
    });
=======
    })
>>>>>>> c619c117278eeb475e4b12971dfb09ebd92deab6

    socket.broadcast.emit('createoffer', {});

    socket.on('disconnect', () => {
        console.log(`The socket id: ${socket.id} has disconnected`);
      });
})
