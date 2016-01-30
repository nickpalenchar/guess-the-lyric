app.config(function ($stateProvider) {
// Register our *about* 
    $stateProvider.state('gameRoom', {
        url: '/game-room',
        templateUrl: 'js/game-room/game-room.html',
        controller: 'GameRoomController'
    });
});

app.controller('GameRoomController', function($scope, PlayerFactory){

    PlayerFactory.getAll()
        .then(allPlayers => {
            $scope.allPlayers = allPlayers;
            $scope.$digest();
        });

});