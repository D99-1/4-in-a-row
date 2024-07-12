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

function handleMove(col) {
  let row = dropPiece(col);
  if (row === -1) return; 

  board[row][col] = currentPlayer;
  const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
  cell.classList.add(currentPlayer === 1 ? 'player1' : 'player2');
  currentPlayer = currentPlayer === 1 ? 2 : 1; 
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
