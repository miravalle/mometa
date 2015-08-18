var express = require('express');
var path = require('path');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../refresh');
var Video = require('../schemas/video')
mongoose.createConnection(process.env.MONGO_URL);

/* GET home page. */
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../index.html'))
});

router.get('/get/:videoId', function(req, res, next) {
    db().map(function(item) {
        if (item.videoId === req.params.videoId) {
            res.send(item);
        }
    });
    res.send({});
    next();
});

router.post('/add/:videoId', function(req, res, next) {
    var vid = new Video({
        videoId: req.params.videoId,
        metadata: req.body.metadata,
        genre: req.body.genre
    })
    vid.save();
    res.send({
        videoId: req.params.videoId,
        metadata: req.body.metadata,
        genre: req.body.genre
    });

    next();
});

router.get('/remove/:videoId', function(req, res, next) {
    Video.remove({
        videoId: req.params.videoId
    }, function(err) {
        res.send({
            removed: true
        });
    });
    next();
});


module.exports = router;
