app.config(function ($stateProvider) {
// Register our *about*
    $stateProvider.state('gameRoom', {
        url: '/game-room',
        templateUrl: 'js/game-room/game-room.html',
        controller: 'GameRoomController',
        params: {me: null},
        resolve: {
            me: function ($stateParams) {
                console.log("MEEEEE", $stateParams.me);
                return $stateParams.me;
            }
        }
    });
});

app.controller('GameRoomController', function ($scope, $http, PlayerFactory, Socket, me) {
    $scope.songIds = [
        '33569370',
        '2631422',
        '6890984',
        '5468100'
    ];
    //MB:makes the call to the node server that makes the call to MusixMatch and gets a lyric body
    $scope.getLyrics = function () {
        console.log("scope SONGS", $scope.songIds);
        _.shuffle($scope.songIds);
        //MB:pops it off so you don't get the same song more than once in the same session
        let songId = $scope.songIds.pop();
        //MB:return promise for call
        return $http.get('/api/lyrics/' + songId)
    }
    $scope.gamifyLyrics = function () {
        $scope.getLyrics()
            .then(function (lyrics) {
                $scope.currentLyrics = lyrics;
                //MB:splits into stanzas
                let stanzas = $scope.currentLyrics.split('\n\n');
                $scope.wholeSong = stanzas;
                //MB:grabs a random stanza
                let selectedStanza = stanzas[Math.floor(Math.random() * stanzas.length)]
                //MB:splits the stanza into lines
                let lines = selectedStanza.split('\n');
                let line = lines.pop();
                //MB:the answer is always the last line, as is
                $scope.addWrongAnswers();
                $scope.multipleChoices.push({
                    lyric: line,
                    correct: true
                });
                _.shuffle($scope.multipleChoices);
                //MB:the hint/question is assembled from the preceding lines
                $scope.question = lines.join('\n');
            });
    };
    $scope.addWrongAnswers = function () {
        for (let i = 0; i < 3; i++) {
            let stanza = $scope.wholeSong[Math.floor(Math.random() * $scope.wholeSong.length)];
            let lines = stanza.split('\n');
            let line = lines[Math.floor(Math.random() * lines.length)];
            $scope.multipleChoices.push({
                lyric: line,
                correct: false
            })
        }
    }
    $scope.shuffle = function (array) {
        //shuffles an array. not mine.
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    ////ENDDDD
    $scope.myId = me._id
    PlayerFactory.getAll()
        .then(allPlayers => {
            $scope.allPlayers = allPlayers;
            //$scope.$digest();
        });
    $scope.gamifyLyrics();

    //begining question
    $scope.currentSong = {};

    Socket.emit("getId");
    Socket.on("getId", function (id) {
        id = id.slice(2);
        console.log("THE ID", id);
        //Lookup id
        PlayerFactory.getOne(id)
            .then(function (thePlayer) {
                console.log("the Player is", thePlayer);
                $scope.me = thePlayer;
            })
    });

    $scope.bank = [
        {
            shownLyric: "Oh baby, baby,\n How was I supposed",
            choices: [
                {lyric: "To Know", correct: true},
                {lyric: "To Go", correct: false},
                {lyric: "To Yo", correct: false},
                {lyric: "To Throw", correct: false}
            ]
        }
    ];

    $scope.multipleChoices = [];
    $scope.wholeSong = '';
    $scope.currentLyrics = '';
    $scope.answer = '';
    $scope.question = '';

});
