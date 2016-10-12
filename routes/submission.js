var express = require('express');

var Submission = require('../models/submission');
var router = express.Router();

router.get('/', function (request, response) {
    response.render('pages/form');
});

router.post('/', function (request, response) {
    console.log('Form post', request.body);
    var submission = new Submission({
        artist: request.body.artist,
        message: request.body.message,
        website: request.body.website,
        contact: {
            name: request.body.name,
            email: request.body.email
        }
    });

    request.body['links[]'].forEach(function (link) {
        submission.links.push(link);
    });
    submission.save(function (error) {
        if (error)
            console.log(error);
        else
            console.log('Saved', submission);
    });
    response.send('You posted something!');
});

module.exports = router;