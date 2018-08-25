var express = require('express');
var router = express.Router();

router.get('/', function (request, response, next) {
    response.render('pages/index', {
        title: 'Spela på Heaven Up Here'
    });
});

router.get('/tack', function (request, response, next) {
    response.render('pages/thankyou');
});

module.exports = router;