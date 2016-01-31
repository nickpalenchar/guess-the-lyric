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
            io.emit('newConnection', socket.id);
        });

        socket.on('readyForUsername', function(){
            io.emit('readyForUsername');
        });
        socket.on('newPlayer', function (allPlayers, userCount) {
            console.log("adding player!!!");
            io.emit('newPlayer', allPlayers, userCount)
        });
        socket.on('startGame', function(){
            io.emit('startGame');
        });
        socket.on("getId", function(){
            io.emit("getId", socket.id);
        });
    });

    return io;

};
