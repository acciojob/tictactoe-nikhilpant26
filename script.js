const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const form = document.getElementById("form-container");
const gameContainer = document.getElementById("game-container");
const playerTurnInfo = document.getElementById("player-turn-info");
const boxes = document.querySelectorAll(".box");

let player1 = "", player2 = "";
let isPlayerOneTurn = true;
let moves = 0;

const playerOneMoves = [];
const playerTwoMoves = [];

const winningCombos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();
  form.style.display = "none";
  gameContainer.style.display = "block";
  playerTurnInfo.textContent = `${player1}, you're up!`;
});

boxes.forEach(box => {
  box.addEventListener("click", handleBoxClick);
});

function handleBoxClick(event) {
  const box = event.target;
  const boxId = parseInt(box.id);

  if (box.textContent !== "") return;

  if (isPlayerOneTurn) {
    box.textContent = "X";
    playerOneMoves.push(boxId);
    if (checkWinner(playerOneMoves)) {
      playerTurnInfo.textContent = `${player1} congratulations you won!`;
      highlightBoxes(playerOneMoves);
      disableBoard();
      return;
    }
    isPlayerOneTurn = false;
    playerTurnInfo.textContent = `${player2}, you're up!`;
  } else {
    box.textContent = "O";
    playerTwoMoves.push(boxId);
    if (checkWinner(playerTwoMoves)) {
      playerTurnInfo.textContent = `${player2} congratulations you won!`;
      highlightBoxes(playerTwoMoves);
      disableBoard();
      return;
    }
    isPlayerOneTurn = true;
    playerTurnInfo.textContent = `${player1}, you're up!`;
  }

  moves++;
  if (moves === 9) {
    playerTurnInfo.textContent = "It's a draw! 🤝";
  }
}

function checkWinner(playerMoves) {
  return winningCombos.some(combo =>
    combo.every(num => playerMoves.includes(num))
  );
}

function highlightBoxes(moves) {
  // Find the winning combo to highlight
  for (let combo of winningCombos) {
    if (combo.every(num => moves.includes(num))) {
      combo.forEach(id => {
        document.getElementById(id.toString()).classList.add("win-box");
      });
      break;
    }
  }
}

function disableBoard() {
  boxes.forEach(box => {
    box.removeEventListener("click", handleBoxClick);
  });
}
