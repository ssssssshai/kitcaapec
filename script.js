// Constants for Sudoku game
const boardSize = 9;
const blockSize = 3;

// Initialize the Sudoku board
let sudokuBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

// Function to create the Sudoku board HTML
function createSudokuBoard() {
  const sudokuTable = document.getElementById("sudoku-board");
  sudokuTable.innerHTML = "";

  for (let i = 0; i < boardSize; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement("td");
      const input = document.createElement("input");
      input.type = "number";
      input.min = 1;
      input.max = 9;
      input.value = sudokuBoard[i][j] === 0 ? "" : sudokuBoard[i][j];

      input.addEventListener("input", () => {
        sudokuBoard[i][j] = parseInt(input.value) || 0;
      });

      if (sudokuBoard[i][j] !== 0) {
        cell.classList.add("given");
        input.disabled = true;
      }

      cell.appendChild(input);
      row.appendChild(cell);
    }

    sudokuTable.appendChild(row);
  }
}

function isSudokuSolved() {
  // Check rows
  for (let i = 0; i < boardSize; i++) {
    const rowSet = new Set();

    for (let j = 0; j < boardSize; j++) {
      const cellValue = sudokuBoard[i][j];

      if (cellValue === 0 || rowSet.has(cellValue)) {
        return false; // Invalid row
      }

      rowSet.add(cellValue);
    }
  }

  // Check columns
  for (let j = 0; j < boardSize; j++) {
    const colSet = new Set();

    for (let i = 0; i < boardSize; i++) {
      const cellValue = sudokuBoard[i][j];

      if (cellValue === 0 || colSet.has(cellValue)) {
        return false; // Invalid column
      }

      colSet.add(cellValue);
    }
  }

  // Check blocks (3x3 subgrids)
  for (let blockRow = 0; blockRow < blockSize; blockRow++) {
    for (let blockCol = 0; blockCol < blockSize; blockCol++) {
      const blockSet = new Set();

      for (let i = 0; i < blockSize; i++) {
        for (let j = 0; j < blockSize; j++) {
          const cellValue = sudokuBoard[blockRow * blockSize + i][blockCol * blockSize + j];

          if (cellValue === 0 || blockSet.has(cellValue)) {
            return false; // Invalid block
          }

          blockSet.add(cellValue);
        }
      }
    }
  }

  return true; // Sudoku is solved
}


// Event listener for the "Check" button
document.getElementById("check-button").addEventListener("click", () => {
  if (isSudokuSolved()) {
    alert("Congratulations! You solved the Sudoku!");
  } else {
    alert("Sorry, the Sudoku is not solved correctly.");
  }
});

// Call the createSudokuBoard function to initialize the board
createSudokuBoard();
