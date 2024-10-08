let board = ["", "", "", "", "", "", "", "", ""];
let player1 = '';
let player2 = '';
let currentPlayer = 'X';
let gameActive = true;

function startGame() {
  player1 = document.getElementById('player1').value || 'Player 1';
  player2 = document.getElementById('player2').value || 'Player 2';

  document.getElementById('initial-screen').style.display = 'none';
  document.getElementById('game-screen').style.display = 'flex';
  currentPlayer = 'X';
  updateStatusDisplay();
}

function updateStatusDisplay() {
  statusDisplay.innerHTML = currentPlayerTurn();
}

document.getElementById('start-button').addEventListener('click', startGame);

const statusDisplay = document.getElementById("game-status");

const winningMessage = () => `${currentPlayer === 'X' ? player1 : player2} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer === 'X' ? player1 : player2}'s turn`;

function handleCellPlayed(clickedCell, i) {
  board[i] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(
    clickedCell
  );

  if (board[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .getElementById("restart-button")
  .addEventListener("click", handleRestartGame);

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = board[winCondition[0]];
    let b = board[winCondition[1]];
    let c = board[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    showAlert(winningMessage(), 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnJ3Nm56NXBkanNkc2kwMDB4ZWtvNHJtbGxtMGxjeWYzaXZoeDJ3MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iz2Hqrmrn0NG0/giphy.webp');
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  let roundDraw = !board.includes("");
  if (roundDraw) {
    showAlert(drawMessage(), 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2hybGFpMTE4YXY2ZzY4NndycTZvNm41N2ZuNWgxemRrMjZ0eHJxeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OOaGa9BrKxeJ1DjaDW/giphy.webp');
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatusDisplay();
}

function handleRestartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

function showAlert(message, imgUrl) {
  Swal.fire({
    title: message.toUpperCase(),
    imageUrl: imgUrl,
    confirmButtonText: 'Play Again',
  }).then(() => {
    handleRestartGame();
  });
}