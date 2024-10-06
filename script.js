const game = function() {
    const grid = [];
    let currentPlayer = "X";
    let gameActive = true;

    const getGameActive = function() {
        return gameActive;
    }

    const setGameActive = function(newGameActive) {
        gameActive = newGameActive;
    }

    const getCurrentPlayer = function() {
        return currentPlayer;
    }

    const setCurrentPlayer = function(newPlayer) {
        currentPlayer = newPlayer;
    }

    //Create our empty grid 
    const newGrid = function(size) {
        for (let i = 0; i < size; i++) {
            grid.push([]);
            for (let j = 0; j < size; j++) {
                grid[i].push("");
            }
        }
    }

    //Grab our grid
    const getGrid = function() {
        return grid;
    }

    //Set our grid
    const setGrid = function(newSetGrid) {
        grid = newSetGrid;
    }
    
    //Check if a line has the same value
    function checkLine(a, b, c) {
        return a !== "" && a === b && b === c;
    }

    //Check victory conditions
    const checkGrid = function() {
        //Check rows and columns
        for (let i = 0; i < grid.length; i++) {
            if (checkLine(grid[i][0], grid[i][1], grid[i][2])) return grid[i][0];
            if (checkLine(grid[0][i], grid[1][i], grid[2][i])) return grid[0][i];
        }

        //Check diagonals
        if (checkLine(grid[0][0], grid[1][1], grid[2][2])) return grid[0][0];
        if (checkLine(grid[0][2], grid[1][1], grid[2][0])) return grid[0][2];

        //Check for draw
        if (grid.every(row => row.every(cell => cell !== ""))) return "draw";

        return null;
    }

    return { newGrid, getGrid, setGrid, checkGrid, getCurrentPlayer, setCurrentPlayer, getGameActive, setGameActive };
}();

document.addEventListener('DOMContentLoaded', function () {
    let cells = document.querySelectorAll('.cell');
    game.newGrid(3);

    cells.forEach(function (cell, index) {
        cell.addEventListener("click", function () {
            if (game.getGameActive() && cell.textContent === "") {
                click(cell, index);
            }
        });
    });
});

function click(cell, index) {
    const gridSize = 3;
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    
    game.getGrid()[row][col] = game.getCurrentPlayer();
    cell.textContent =  game.getCurrentPlayer();
    
    const result = game.checkGrid();
    if (result) {
        game.setGameActive(false);
        if (result === "draw") {
            const message = document.querySelector(".message");
            message.textContent = `It's a draw!`;
            changeCellColor("lightgray");
        } else {
            document.querySelector('.message').textContent = `Player ${result} wins!`;
            changeCellColor(result === "X" ? "lightcoral" : "lightblue");
        }
    } else {
        game.setCurrentPlayer(game.getCurrentPlayer() == "X" ? "O" : "X");
        const message = document.querySelector(".message");
        message.textContent = `Player ${game.getCurrentPlayer()}'s turn`;
    }
}


function changeCellColor(color) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.style.backgroundColor = color;
    });
  }




/* let gridSize = 3;
let grid = [];
let currentPlayer = "X";
let gameActive = true;

function start() {
    grid = Array(gridSize).fill().map(() => Array(gridSize).fill(""));
    gameActive = true;
}

function check() {
    // Check rows and columns
    for (let i = 0; i < gridSize; i++) {
        if (checkLine(grid[i][0], grid[i][1], grid[i][2])) return grid[i][0];
        if (checkLine(grid[0][i], grid[1][i], grid[2][i])) return grid[0][i];
    }
    
    // Check diagonals
    if (checkLine(grid[0][0], grid[1][1], grid[2][2])) return grid[0][0];
    if (checkLine(grid[0][2], grid[1][1], grid[2][0])) return grid[0][2];
    
    // Check for draw
    if (grid.every(row => row.every(cell => cell !== ""))) return "draw";
    
    return null;
}

function checkLine(a, b, c) {
    return a !== "" && a === b && b === c;
}

document.addEventListener('DOMContentLoaded', function () {
    let cells = document.querySelectorAll('.cell');
    start();

    cells.forEach(function (cell, index) {
        cell.addEventListener("click", function () {
            if (gameActive && cell.textContent === "") {
                click(cell, index);
            }
        });
    });
});

function click(cell, index) {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    
    grid[row][col] = currentPlayer;
    cell.textContent = currentPlayer;
    
    const result = check();
    if (result) {
        gameActive = false;
        if (result === "draw") {
            console.log("It's a draw!");
            changeCellColor("lightgray");
        } else {
            document.querySelector('.message').textContent = `Player ${result} wins!`;
            changeCellColor(result === "X" ? "lightcoral" : "lightblue");
        }
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        const message = document.querySelector(".message");
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function changeCellColor(color) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.style.backgroundColor = color;
    });
  }

*/