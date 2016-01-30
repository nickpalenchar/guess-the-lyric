app.factory('SocketFactory', function($rootScope){
    var socket = io.connect();
    socket.on('emitCall', function(emitArr){
        $rootScope.$broadcast(emitArr[0], emitArr[1])
    });
    return {
        emit: function(emitName, emitData){
            socket.emit(emitName, emitData)
        }

    };
});