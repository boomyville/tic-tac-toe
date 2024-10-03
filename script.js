let gridSize = 3;
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

