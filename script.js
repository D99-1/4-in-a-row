const ROWS = 6;
const COLS = 7;
let currentPlayer = 1;
let board = [];

function createBoard() {
  const boardElement = document.getElementById('board');
  for (let row = 0; row < ROWS; row++) {
    board[row] = Array.from(Array(COLS).fill(0)); 
    for (let col = 0; col < COLS; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-row', row);
      cell.setAttribute('data-col', col);
      cell.addEventListener('click', () => handleMove(col));
      boardElement.appendChild(cell);
    }
  }
}
function checkWin() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      if (board[row][col] !== 0 && board[row][col] === board[row][col + 1] && board[row][col] === board[row][col + 2] && board[row][col] === board[row][col + 3]) {
        return true;
      }
    }
  }

  for (let col = 0; col < COLS; col++) {
    for (let row = 0; row < ROWS - 3; row++) {
      if (board[row][col] !== 0 && board[row][col] === board[row + 1][col] && board[row][col] === board[row + 2][col] && board[row][col] === board[row + 3][col]) {
        return true;
      }
    }
  }

  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      if (board[row][col] !== 0 && board[row][col] === board[row + 1][col + 1] && board[row][col] === board[row + 2][col + 2] && board[row][col] === board[row + 3][col + 3]) {
        return true;
      }
    }
    for (let col = 3; col < COLS; col++) {
      if (board[row][col] !== 0 && board[row][col] === board[row + 1][col - 1] && board[row][col] === board[row + 2][col - 2] && board[row][col] === board[row + 3][col - 3]) {
        return true;
      }
    }
  }

  if (board.every(row => row.every(cell => cell !== 0))) {
    alert("It's a draw!");
    return false;
  }

  return false;
}

function handleMove(col) {
  let row = dropPiece(col);
  if (row === -1) return;

  board[row][col] = currentPlayer;
  const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
  cell.classList.add(currentPlayer === 1 ? 'player1' : 'player2');

  if (checkWin()) {
    alert(`Player ${currentPlayer} wins!`);
    // Optionally, reset the game or disable further moves.
  } else {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
  }
}

function dropPiece(col) {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === 0) {
      return row;
    }
  }
  return -1; 
}

window.onload = createBoard;
