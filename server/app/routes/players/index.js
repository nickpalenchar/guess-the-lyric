var router = require('express').Router();
var User = require('mongoose').model('User');
var _ = require('lodash');
module.exports = router;

router.post('/', function(req, res, next){
    console.log("username: ", req.body.userInfo);
    User.create({ username: req.body.username, socketId: req.body.socketId } )
    .then(function(createdUser) { res.status(200).send(createdUser); })
    .then(null, next);
});

router.get('/', function(req, res, next){
    User.find({})
    .then(allUsers => res.status(200).send(allUsers))
    .then(null, next)
});

router.get('/:socketId', function(req, res, next){
    User.findOne({ socketId: req.params.socketId })
        .then(user => res.status(200).send(user));
})