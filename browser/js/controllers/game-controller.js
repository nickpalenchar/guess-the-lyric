app.controller('GameCtrl', function ($scope) {
    $scope.songIds = [
        '33569370',
        '2631422',
        '6890984',
        '5468100'
    ];
    $scope.currentLyrics = '';
    $scope.answer = '';
    $scope.question = '';
    //MB:makes the call to the node server that makes the call to MusixMatch and gets a lyric body
    $scope.getLyrics = function(){
        shuffle($scope.songsIds);
        //MB:pops it off so you don't get the same song more than once in the same session
        let songId = $scope.songIds.pop();
        //MB:makes the call obv
        $http.get('/song/' + songId)
        .then(function(lyrics){
            //MB:sets returned lyrics to scope
            $scope.currentLyrics = lyrics;
        })
    }
    //MB:parses lyrics body
    $scope.gamifyLyrics = function(){
        //MB:splits into stanzas
        let stanzas = $scope.currentLyrics.split('\n\n');
        //MB:grabs a random stanza
        let selectedStanza = stanzas[Math.floor(Math.random() * stanzas.length)]
        //MB:splits the stanza into lines
        let lines = selectedStanza.split('\n');
        //MB:the answer is always the last line, as is
        $scope.answer = lines.pop();
        //MB:the hint/question is assembled from the preceding lines
        $scope.question = lines.join('\n');
    }
    $scope.validateGuess = function(guess){
        if (guess === $scope.answer.toLowerCase()) return true;
        return false;
    }
});
