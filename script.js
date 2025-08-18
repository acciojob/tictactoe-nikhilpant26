//your JS code here. If required.
const player1Input = document.getElementById("player-1");
    const player2Input = document.getElementById("player-2");
    const form = document.getElementById("form-container");
    const gameContainer = document.getElementById("game-container");
    const playerTurnInfo = document.getElementById("player-turn-info");
    const boxes = document.querySelectorAll(".box");

    let player1 = "", player2 = "";
    let isPlayerOneTurn = true;
    let moves = 0;

    const winningCombos = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
      ["1", "4", "7"],
      ["2", "5", "8"],
      ["3", "6", "9"],
      ["1", "5", "9"],
      ["3", "5", "7"]
    ];

    const playerOneClicks = [];
    const playerTwoClicks = [];

    form.addEventListener("submit", (e) => {
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

    function handleBoxClick(e) {
      const box = e.target;
      const boxId = box.id;

      if (box.textContent !== "") return; // already filled

      if (isPlayerOneTurn) {
        box.textContent = "X";
        playerOneClicks.push(boxId);
        if (checkWinner(playerOneClicks)) {
          playerTurnInfo.textContent = `${player1} congratulations you won! `;
          disableBoard();
          return;
        }
        isPlayerOneTurn = false;
        playerTurnInfo.textContent = `${player2}, you're up!`;
      } else {
        box.textContent = "O";
        playerTwoClicks.push(boxId);
        if (checkWinner(playerTwoClicks)) {
          playerTurnInfo.textContent = `${player2} congratulations you won! `;
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
      for (let combo of winningCombos) {
        if (combo.every(id => playerMoves.includes(id))) {
          highlightWinningBoxes(combo);
          return true;
        }
      }
      return false;
    }

    function highlightWinningBoxes(combo) {
      combo.forEach(id => {
        document.getElementById(id).classList.add("win-box");
      });
    }

    function disableBoard() {
      boxes.forEach(box => {
        box.removeEventListener("click", handleBoxClick);
      });
    }