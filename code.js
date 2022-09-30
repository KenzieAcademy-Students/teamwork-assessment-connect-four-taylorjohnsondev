//Players
let player1 = 1;
let player2 = 2;
let currentPlayer = 0;
let board = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

function renderBoard() {
  for (let i = 0; i < 42; i++) {
    let gameTile = document.createElement("div");
    gameTile.classList.add("column");

    gameTile.addEventListener("click", function () {
      currentPlayer += 1;
      if (currentPlayer == player1) {
        gameTile.classList.add("red-piece");
      } else if (currentPlayer == player2) {
        gameTile.classList.add("black-piece");
        currentPlayer = 0;
      }
    });
    document.getElementById("board").append(gameTile);
  }
};
renderBoard();
