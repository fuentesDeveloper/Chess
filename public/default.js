var board;
var game;

window.onload = function () {
    initGame();
};

var initGame = function() {
   var cfg = {
        draggable: true,
        position: 'start',
        onDrop: handleMove,
   };
    board = new ChessBoard('gameBoard', cfg);
    game = new Chess();
};

//Se configura el socket client
var socket = io();
window.onclick = function(e) {
    socket.emit('message', 'Turno del siguiente jugador');
};

var handleMove = function(source, target ) {
    var move = game.move({from: source, to: target});
    if (move === null)  return 'snapback';
};

var handleMove = function(source, target) {
    var move = game.move({from: source, to: target});
    if (move === null)  return 'snapback';
    else socket.emit('move', move);
    
};

socket.on('move', function (msg) {
    game.move(msg);
    board.position(game.fen()); //fen es el diseño del tablero
});