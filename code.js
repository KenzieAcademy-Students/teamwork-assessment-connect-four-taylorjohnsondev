const player1 = 1;
const player2 = 2;
let over = false;
let board = [
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
];
let currentPlayer = 1;

let getRowCol = function (colNum) {
	return [Math.floor(colNum / 7), colNum % 7];
};

let displayMessage = function (message) {
	document.getElementById("message").innerHTML = message;
	//TODO: Display the message inside the message div
};

let columnIsFull = function (colNum) {
	// Look at the first row of the board model.=
	// If board[colNum] is not 0, then the column is full, so return true. Otherwise, return false.
	const [r, c] = getRowCol(colNum);
	return board[r][c] != 0;
};

let insertPieceIntoModel = function (colNum, playerNum) {
	// TODO: Implement this for real
	const [r, c] = getRowCol(colNum);
	board[r][c] = playerNum;
};

let renderBoard = function () {
	document.getElementById("board").innerHTML = "";

	// TODO: Erase the current pieces from the DOM
	//       Loop through the board model
	//       generate new pieces that are inserted into the DOM
	for (let i = 0; i < 42; i++) {
		let gameTile = document.createElement("div");
		gameTile.classList.add("column");
		gameTile.setAttribute("id", `${i}`);

		const [r, c] = getRowCol(i);
		if (board[r][c] == player1) {
			gameTile.classList.add("red-piece");
		} else if (board[r][c] == player2) {
			gameTile.classList.add("black-piece");
		}

		gameTile.addEventListener("click", dropPiece);
		document.getElementById("board").append(gameTile);
	}
};

let gameIsTied = function (boardModel) {
	// returns true or false to say if the game is a tie or not
	for (let i = 0; i < 6; i++)
		for (let j = 0; j < 7; j++) if (!boardModel[i][j]) return false;

	tie = true;
	return true;
};

let findHorizontalWinner = function (boardModel) {
	// If it finds a horizontal 4-in-a-row, return the player number of the winner
	// If not, return -1
	// IMPORTANT REFERENCE:
	// https://my.kenzie.academy/courses/276/pages/reading-nested-arrays?module_item_id=58315
	for (let i = 0; i < 6; i++) {
		for (let j = 0; j < 4; j++) {
			const c = boardModel[i][j];
			if (c == 0) continue;

			let count = 1;
			for (let x = 1; x < 4; x++) {
				if (boardModel[i][j + x] == c) {
					count += 1;
				} else break;
			}
			if (count == 4) return c;
		}
	}
	return -1;
};
let findVerticalWinner = function (boardModel) {
	// If it finds a vertical 4-in-a-row, return the player number of the winner
	// If not, return -1
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 7; j++) {
			const c = boardModel[i][j];
			if (c == 0) continue;

			let count = 1;
			for (let x = 1; x < 4; x++) {
				if (boardModel[i + x][j] == c) {
					count += 1;
				} else break;
			}
			if (count == 4) return c;
		}
	}
	return -1;
};

let findDiagonalLeftWinner = function (boardModel) {
	// If it finds a diagonal left 4-in-a-row, return the player number of the winner
	// If not, return -1
	for (let i = 0; i < 3; i++) {
		for (let j = 6; j >= 3; j--) {
			const c = boardModel[i][j];
			if (c == 0) continue;

			let count = 1;
			for (let x = 1; x < 4; x++) {
				if (boardModel[i + x][j - x] == c) {
					count += 1;
				} else break;
			}
			if (count == 4) return c;
		}
	}
	return -1;
};
let findDiagonalRightWinner = function (boardModel) {
	// If it finds a diagonal right 4-in-a-row, return the player number of the winner
	// If not, return -1
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 4; j++) {
			const c = boardModel[i][j];
			if (c == 0) continue;

			let count = 1;
			for (let x = 1; x < 4; x++) {
				if (boardModel[i + x][j + x] == c) {
					count += 1;
				} else break;
			}
			if (count == 4) return c;
		}
	}
	return -1;
};

let gameIsOver = function () {
	// Look at the board model to see if there is either a winner or a tie

	let horizWinner = findHorizontalWinner(board);
	let vertWinner = findVerticalWinner(board);
	let diagLWinner = findDiagonalLeftWinner(board);
	let diagRWinner = findDiagonalRightWinner(board);
	// If any of these is not -1, then the value of that variable is the winner of the game, and the game is over.

	// Returns true if there's a winner or a tie
	// returns false if the game isn't over.

	if (
		horizWinner != -1 ||
		vertWinner != -1 ||
		diagLWinner != -1 ||
		diagRWinner != -1
	)
		return true;

	if (gameIsTied(board)) {
		displayMessage("Tie game!");
		return true;
	}
	return false;
};

let togglePlayer = function () {
	// change currentPlayer to 1 if it's a 2 OR...
	// change currentPlayer to 2 if it's a 1
	if (currentPlayer == 1) currentPlayer = 2;
	else currentPlayer = 1;
	displayMessage("Next turn: Player " + currentPlayer);
};

let removeClickHandlers = function () {
	// TODO: Implement this for real
	for (let i = 0; i < 42; i++) {
		const ele = document.getElementById(`${i}`);
		ele.removeEventListener("click", dropPiece);
	}
};

let dropPiece = function (eventObj) {
	if (over) return true;
	// What column did the piece get dropped into?
	// use eventObj.currentTarget to get the div that was clicked.
	let columnNum = eventObj.currentTarget.id;
	// let columnNum = Number(clickedColumnDiv.id)

	if (columnIsFull(columnNum)) {
		// guard clause
		return;
	}

	insertPieceIntoModel(columnNum, currentPlayer);
	renderBoard();
	if (gameIsOver()) {
		displayMessage(
			"Game over! The winner is player " +
				currentPlayer +
				"<br>Refresh the page to play again"
		);
		removeClickHandlers();
		over = true;
	} else {
		togglePlayer();
	}
};

let initializeGame = function () {
	displayMessage("Next turn: Player " + currentPlayer);
	// TODO: Set up a click handler for each column, use the function dropPiece as the event handler.
	renderBoard();
};

initializeGame();
