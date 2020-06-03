var express = require('express');
var app = express();
app.use(express.static('public')); 
var http = require('http').Server(app);
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/default.html');
});

//Se configura el socket server
var io = require('socket.io')(http); 
io.on('connection', function(socket) {
    console.log('new connection');
    socket.on('message', function(msg) {
        console.log('Got message from client: ' + msg);     
    });
});

http.listen(port, function() {
    console.log('listening on *: ' + port);
});

io.on('connection', function(socket) {
    console.log('new connection');

    //Llamado cuando el cliente llama socket.emit('move')
    socket.on('move', function(msg) {
       socket.broadcast.emit('move', msg); 
    });
});
