// Function to generate a Sudoku puzzle (simplified)
function generateSudoku() {
    // Sudoku puzzle represented as a 9x9 array
    const puzzle = [
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

    // Convert the puzzle to a 9x9 table
    const table = document.createElement('table');

    for (let i = 0; i < 9; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('td');
            if (puzzle[i][j] !== 0) {
                cell.textContent = puzzle[i][j];
                cell.classList.add('given');
            } else {
                const input = document.createElement('input');
                input.setAttribute('type', 'number');
                input.setAttribute('min', '1');
                input.setAttribute('max', '9');
                input.setAttribute('size', '1');
                cell.appendChild(input);
            }
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    return table;
}

// Function to check if the Sudoku is solved correctly
function isSudokuSolved() {
    const inputs = document.querySelectorAll('#sudoku-board input[type="number"]');
    const puzzle = [];

    // Extract the current state of the puzzle
    let rowIndex = 0;
    for (let i = 0; i < inputs.length; i++) {
        if (i % 9 === 0) {
            puzzle.push([]);
            rowIndex++;
        }
        const inputValue = parseInt(inputs[i].value, 10);
        puzzle[rowIndex - 1].push(isNaN(inputValue) ? 0 : inputValue);
    }

    // Check rows, columns, and 3x3 grids for duplicates
    for (let i = 0; i < 9; i++) {
        const row = puzzle[i];
        const column = puzzle.map(row => row[i]);
        const grid = puzzle.slice(Math.floor(i / 3) * 3, Math.floor(i / 3) * 3 + 3)
            .map(row => row.slice((i % 3) * 3, (i % 3) * 3 + 3))
            .flat();

        if (
            hasDuplicates(row) ||
            hasDuplicates(column) ||
            hasDuplicates(grid)
        ) {
            return false;
        }
    }

    return true;
}

// Function to check for duplicates in an array
function hasDuplicates(array) {
    const values = [];
    for (let value of array) {
        if (value !== 0 && values.includes(value)) {
            return true;
        }
        values.push(value);
    }
    return false;
}

// Function to reveal the enigma
function revealEnigma() {
    const enigmaSection = document.getElementById('enigma-section');
    enigmaSection.style.display = 'block';
    const enigmaText = document.getElementById('enigma-text');
    enigmaText.textContent = 'The Ê is Where it will be?';
}

// Event listener for checking Sudoku solution
document.getElementById('check-button').addEventListener('click', function () {
    if (isSudokuSolved()) {
        revealEnigma();
    }
});

// Event listener for starting the Sudoku game
document.getElementById('start-button').addEventListener('click', function () {
    const startSection = document.getElementById('start-section');
    const sudokuSection = document.getElementById('sudoku-section');
    startSection.style.display = 'none';
    sudokuSection.style.display = 'block';

    // Generate the Sudoku puzzle
    const sudokuContainer = document.getElementById('sudoku-board');
    const sudokuTable = generateSudoku();
    sudokuContainer.innerHTML = '';
    sudokuContainer.appendChild(sudokuTable);
});
