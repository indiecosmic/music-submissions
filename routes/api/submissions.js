var config = require('../../config');
var express = require('express');
var postmark = require("postmark")(config.postmarkApiToken);

var Submission = require('../../models/submission');
var router = express.Router();

router.get('/', function (request, response) {
    Submission.find({}, function (error, submissions) {
        if (!error) {
            response.send(submissions);
        }
    });
});

router.get('/:submission_id', function (request, response) {
    Submission.findById(request.params.submission_id, function (error, submission) {
        response.send(submission);
    });
});

router.post('/', function (request, response, next) {
    console.log('Form post', request.body);

    request.checkBody('artist', 'Ange ett artistnamn.').notEmpty();
    request.checkBody('website', 'Ange en webbadress.')
        .notEmpty()
        .isURL().withMessage('Ange en giltig webbadress.');
    request.checkBody('links[]', 'Ange minst en lyssningsl&auml;nk.')
        .notEmpty()
        .notEmptyArray();
    request.checkBody('message', 'Ange ett meddelande.').notEmpty();
    request.checkBody('name', 'Ange ett namn.').notEmpty();
    request.checkBody('email', 'Ange en giltig e-postadress.')
        .notEmpty().withMessage('Ange en e-postadress.')
        .isEmail();

    var validationErrors = request.validationErrors();
    if (validationErrors) {
        response.send({ error: validationErrors });
        return;
    }

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
        else {
            console.log('Saved', submission);
            postmark.send({
                "From": config.senderEmailAddress,
                "To": config.recipientEmailAddress,
                "Subject": "Hello from Postmark",
                "TextBody": "Hello!",
                "ReplyTo": submission.contact.email
            }, function (error, success) {
                if (error) {
                    console.error("Unable to send via postmark: " + error.message);
                    return;
                }
                console.info("Sent to postmark for delivery")
            });
        }

    });
    response.send(submission);
});

module.exports = router;