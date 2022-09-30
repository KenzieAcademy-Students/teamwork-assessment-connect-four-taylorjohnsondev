//Players
let player1 = "Red";
let player2 = "Black";
let currentPlayer = player1;
let board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
]

function renderBoard(){
    for (let i = 0; i < 42; i++){
       let gameTile = document.createElement("div")
        gameTile.classList.add("column")

        gameTile.addEventListener("click", function(){
           if (currentPlayer == player1){
            gameTile.classList.add("red-piece");
         }
        else if (currentPlayer == player2){
            gameTile.classList.add("black-piece")
        }
        })
        document.getElementById("board").append(gameTile)
    }
}
renderBoard()