const boardElement = document.getElementById("board");
const turnInfo = document.getElementById("turnInfo");
const winnerText = document.getElementById("winner");

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let currentPlayer = "X";
let xMoves = [];
let oMoves = [];
let gameOver = false;

// Tahtayı oluştur
function drawBoard() {
  boardElement.innerHTML = "";
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.textContent = board[row][col];
      cell.addEventListener("click", handleMove);
      boardElement.appendChild(cell);
    }
  }
}

// Hamle yapıldığında
function handleMove(e) {
  if (gameOver) return;

  const row = +e.target.dataset.row;
  const col = +e.target.dataset.col;

  if (board[row][col] !== "") return;

  board[row][col] = currentPlayer;

  const move = { row, col };

  if (currentPlayer === "X") {
    xMoves.push(move);
    if (xMoves.length > 3) {
      const old = xMoves.shift();
      board[old.row][old.col] = "";
    }
  } else {
    oMoves.push(move);
    if (oMoves.length > 3) {
      const old = oMoves.shift();
      board[old.row][old.col] = "";
    }
  }

  drawBoard();
  if (checkWin(currentPlayer)) {
    winnerText.textContent = `${currentPlayer} kazandı!`;
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  turnInfo.textContent = `Sıra: ${currentPlayer}`;
}

// Kazanma kontrolü
function checkWin(player) {
  const winLines = [
    // Satırlar
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // Sütunlar
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // Çaprazlar
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  return winLines.some((line) =>
    line.every(([r, c]) => board[r][c] === player)
  );
}

// Oyunu başlat
drawBoard();
