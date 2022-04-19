"use strict";
//Para backend, separar funciones como getElementById para obtener el player para separar el negocio de la vista
//Entonces el getElementById recibe el parametro que le manda el html. Todo eso sirve si esto fuera 
// tal vez una vez que se usa el tablero se pueda separar mejor la dependecia del front
Object.defineProperty(exports, "__esModule", { value: true });
let drawAux = false;
let endAux = false;
let turnCounter = 0;
let turnName = "";
let game;
function start(user1, user2, playButton) {
    let player1 = getPlayer(user1);
    let player2 = getPlayer(user2);
    if (player1 == "" || player2 == "" || player1 == null || player2 == null) {
        setMsg("Debe ingresar un nombre para ambos jugadores");
        return;
    }
    else {
        document.getElementById(user1).disabled = true;
        document.getElementById(user2).disabled = true;
        playButton.disabled = true;
        drawAux = false;
        endAux = false;
        turnName = "X";
        setMsg(player1 + " comienza el juego");
    }
    ;
}
;
function getPlayer(name) {
    return document.getElementById(name).value;
}
function restart(user1, user2) {
    document.getElementById(user1).value = "";
    document.getElementById(user2).value = "";
    location.reload();
}
function setMsg(msg) {
    document.getElementById("msg").innerText = msg;
}
;
function nextMove(cell) {
    console.log(endAux);
    if (endAux == false) {
        if (cell.innerText == "" || cell.innerText == null) { // podria verificar el board
            turnCounter++;
            game.board[cell.cellIndex] = turnName; // OJO ESTO!!
            console.log(game.board[cell.cellIndex]);
            cell.innerText = turnName;
            nextTurn();
        }
        else {
            setMsg("Esta celda ya esta ocupada");
        }
    }
    else {
        return;
    }
    ;
}
;
function nextTurn() {
    verifyVictory();
    if (endAux == false) {
        if (turnName == "X") {
            turnName = "O";
            setMsg("Es el turno de " + getPlayer("user1"));
        }
        else {
            turnName = "X";
            setMsg("Es el turno de " + getPlayer("user2"));
        }
        ;
    }
    else {
        return;
    }
}
;
function verifyVictory() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (game.board[a] && (game.board[a] === game.board[b] && game.board[a] === game.board[c])) {
            console.log(combination);
            endGame();
            // return combination; podria ir en un resumen
        }
    }
    if (turnCounter == 9) {
        gameDraw();
        return;
    }
    return null;
}
function gameDraw() {
    setMsg("Partida terminada");
    alert("Empate! Nadie gana");
    drawAux = true;
    endAux = true;
}
function endGame() {
    setMsg("Partida terminada");
    if (turnName == "X") {
        alert("El GANADOR ES: " + getPlayer("user1"));
    }
    else {
        alert("El GANADOR ES: " + getPlayer("user2"));
    }
    endAux = true;
}
