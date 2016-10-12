var app = require('./app');
var http = require('http');
var mongoose = require('mongoose');

var config = require('./config');

var port = process.env.PORT || 5000;
app.set('port', port);

var server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);
server.on('error', onError);

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Node app is running on port', bind);
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

mongoose.Promise = global.Promise;
mongoose.connect(config.database, config.databaseOptions);
mongoose.connection.on('error', function () {
  console.error.bind(console, 'Connection error: could not connect to MongoDB');
});
mongoose.connection.once('open', function () {
  console.log('Connection to database open!');
});