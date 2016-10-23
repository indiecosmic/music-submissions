var express = require('express');
var bodyParser = require('body-parser');
var validator = require('express-validator');

var config = require('./config');
var routes = require('./routes/index');
var submissions = require('./routes/api/submissions');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(validator({
    customValidators: {
        notEmptyArray: function (input) {
            if (input instanceof Array) {
                var isValid = input.every(function (val) {
                    return !!val;
                });
                return isValid;
            }
            return true;
        }
    }
}));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/', routes);
app.use('/api/submissions', submissions);

app.use('/api', function (err, req, res, next) {
    // use the error's status or default to 500
    res.status(err.status || 500);

    // send back json data
    res.send({
        error: err.message
    })
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (config.dev === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('pages/error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('pages/error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;