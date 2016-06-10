var express = require('express');
var app = express();

var port = 3000;

app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/bower_components'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, function () {
  console.log('Dashboard listening on port ' + port);
});