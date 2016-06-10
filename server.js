var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 3000;

var socketIndex = 1;

app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/bower_components'));

// Setup our app routes
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// Listen for any new connections
io.on('connection', function(socket) {
  socketConsoleLog('A new connection has been created');
  socketIndex++;

  socket.on('project:move', function (data) {
    socketConsoleLog('Project moved: ' + JSON.stringify(data));
    socket.broadcast.emit('project:moved', data);
    socketIndex++;
  });

  socket.on('project:toggle-visiblility', function (data) {
    socketConsoleLog('Project toggle visibility: ' + JSON.stringify(data));
    socket.broadcast.emit('project:toggle-visiblility', data);
    socketIndex++;
  });
});

http.listen(port, function () {
  console.log('Dashboard listening on port ' + port);
});

function socketConsoleLog(message) {
  console.log(socketIndex + ' ' + message);
}