const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const clickSound = document.getElementById("click-sound");
const winSound = document.getElementById("win-sound");
const drawSound = document.getElementById("draw-sound");
const toggle = document.getElementById("AcceptConditions");
const body = document.body;

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const WIN_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] || !isGameActive) return;

  clickSound.play();
  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("marked");

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    winSound.play();
    isGameActive = false;
    highlightWin();
    return;
  }

  if (board.every((cell) => cell)) {
    statusText.textContent = "It's a draw!";
    drawSound.play();
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  return WIN_COMBINATIONS.some((combination) => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function highlightWin() {
  WIN_COMBINATIONS.forEach((combination) => {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
    }
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("marked", "winner");
  });
}

function toggleTheme() {
  body.classList.toggle("dark");
}

toggle.addEventListener("change", toggleTheme);
cells.forEach((cell) => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);
