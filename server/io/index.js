'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {
        console.log("HELLO SOCKETS", socket.id);
        // Now have access to socket, wowzers!
        socket.on('newConnection', function () {
            console.log("CONNECTION IN THE BACKEND");
            io.emit('newConnection');
        });

        socket.on('readyForUsername', function(){
            io.emit('readyForUsername');
        })
    });

    return io;

};
