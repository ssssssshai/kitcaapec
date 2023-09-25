/ Matriz para armazenar o tabuleiro de Sudoku
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

// Função para criar o tabuleiro de Sudoku em HTML
function createSudokuBoard() {
    const sudokuTable = document.getElementById('sudoku-board');

    for (let i = 0; i < 9; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.addEventListener('input', function () {
                // Atualize o sudokuBoard com a entrada do usuário
                sudokuBoard[i][j] = Number(input.value);
            });

            if (sudokuBoard[i][j] !== 0) {
                input.value = sudokuBoard[i][j];
                input.classList.add('given');
                input.setAttribute('disabled', true);
            }

            cell.appendChild(input);
            row.appendChild(cell);
        }
        sudokuTable.appendChild(row);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Event listener for the "Sudoku" button
    document.getElementById('start-button').addEventListener('click', function () {
        createSudokuBoard();
        document.getElementById('sudoku-section').style.display = 'block';
        document.getElementById('start-section').style.display = 'none';

        // Remove any enigma previously displayed
        document.getElementById('enigma-section').style.display = 'none';
    });

    // Event listener for checking if Sudoku is solved
    document.getElementById('sudoku-board').addEventListener('input', function () {
        if (isSudokuSolved()) {
            displayEnigma();
        }
    });

    // Function to check if Sudoku is solved correctly
    function isSudokuSolved() {
        // Check rows, columns, and 3x3 boxes for duplicates
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const currentVal = sudokuBoard[i][j];

                if (currentVal === 0) {
                    return false; // If any cell is empty, it's not solved.
                }

                // Check the current row for duplicates
                for (let k = 0; k < 9; k++) {
                    if (k !== j && sudokuBoard[i][k] === currentVal) {
                        return false; // Duplicate in the row
                    }
                }

                // Check the current column for duplicates
                for (let k = 0; k < 9; k++) {
                    if (k !== i && sudokuBoard[k][j] === currentVal) {
                        return false; // Duplicate in the column
                    }
                }

                // Check the 3x3 box for duplicates
                const boxStartRow = Math.floor(i / 3) * 3;
                const boxStartCol = Math.floor(j / 3) * 3;
                for (let x = boxStartRow; x < boxStartRow + 3; x++) {
                    for (let y = boxStartCol; y < boxStartCol + 3; y++) {
                        if ((x !== i || y !== j) && sudokuBoard[x][y] === currentVal) {
                            return false; // Duplicate in the 3x3 box
                        }
                    }
                }
            }
        }
        return true; // Sudoku is solved correctly
    }
});
