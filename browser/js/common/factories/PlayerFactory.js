app.factory('PlayerFactory', function($http){
    return {
        addUser: function(username, socketId){
            return $http.post('/api/players', { username: username, socketId: socketId } )
            .then(createdUser => createdUser.data);
        },
        getAll: function(){
            return $http.get('/api/players')
            .then(allPlayersObj => allPlayersObj.data);
        },
        getOne: function(socketId) {
            return $http.get('/api/players/' + socketId)
                .then(function(playerObj){ return playerObj.data } );
        }
    }
});