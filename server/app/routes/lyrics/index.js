const music = require('musicmatch')({ usertoken: 'e4667302870a71d24952a72c5d0aa55f'});
const router = require('express').Router();
module.exports = router;

router.get('/:songId', function(req, res, next){
    console.log("HITTING THIS");
    music.trackLyrics({ track_id: req.params.songId })
    .then(function(data){
        var song = data.message.body.lyrics.lyrics_body;
        console.log("ONGs", song)
        res.send({ lyrics: song });
    }).catch(function(err){
        console.log(err);
    })
});
