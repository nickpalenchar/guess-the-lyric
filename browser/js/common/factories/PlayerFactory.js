app.factory('PlayerFactory', function($http){
    return {
        addUser: function(username){
            console.log("Add user invoked with username ", username);
            return $http.post('/api/players', { username: username} )
            .then(createdUser => createdUser.data);
        },
        getAll: function(){
            return $http.get('/api/players')
            .then(allPlayersObj => allPlayersObj.data);
        }
    }
});