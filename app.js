// app.js
var express = require('express');  
var app = express();  
var expressWs = require('express-ws')(app);

app.use(function (req, res, next) {
    console.log('middleware');
    req.testing = 'testing';
    return next();
  });

var aWss = expressWs.getWss('/');
app.use(express.static(__dirname + '/node_modules'));  

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

app.get('/developer', function(req, res,next) {  
    res.sendFile(__dirname + '/developer.html');
});

app.get('/tester', function(req, res,next) {  
    res.sendFile(__dirname + '/tester.html');
});

app.ws('/ws', function(ws, req) {
    console.log('Socket Connected');
    ws.on('message', function(msg) {
        console.log(msg);
        aWss.clients.forEach(function (client) {
          client.send(msg);
        });
    });
  });

app.listen(8080);