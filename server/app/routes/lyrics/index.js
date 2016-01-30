const music = require('musicmatch')({ usertoken: 'e4667302870a71d24952a72c5d0aa55f'})
const router = require('express').Router();
module.exports = router;

router.get('/song/:songId', function(req, res, next){
    music.trackLyrics({ track_id: req.params.songId })
    .then(function(data){
        console.log(data.message.body.lyrics.lyrics_body);
        res.send(data.message.body.lyrics.lyrics_body);
    }).catch(function(err){
        console.log(err);
    })
});
