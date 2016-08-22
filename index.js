var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Submission = require('./models/submission');

var options = {
  server: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS : 30000
    }
  }
};

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, options);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('connection open!');
});



var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/form', function(request, response) {
	response.render('pages/form');
});

app.post('/form', function(request, response) {
	response.send('You posted something!');
	console.log('Form post', request.body);
  var submission = new Submission({
    name: request.body.name,
    email: request.body.email
  });
  submission.save(function(error) {
    if (error)
      console.log(error);
    else
      console.log('Saved', submission);
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


