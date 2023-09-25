// Function to generate a Sudoku puzzle (5x5)
function generateSudoku() {
    // Sudoku puzzle represented as a 5x5 array
    const puzzle = [
        [5, 3, 0, 0, 0],
        [4, 0, 0, 1, 0],
        [0, 2, 0, 0, 4],
        [3, 0, 0, 0, 0],
        [0, 0, 1, 0, 2]
    ];

    // Convert the puzzle to a 5x5 table
    const table = document.createElement('table');

    for (let i = 0; i < 5; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('td');
            if (puzzle[i][j] !== 0) {
                cell.textContent = puzzle[i][j];
                cell.classList.add('given');
            } else {
                const input = document.createElement('input');
                input.setAttribute('type', 'number');
                input.setAttribute('min', '1');
                input.setAttribute('max', '5'); // Change max to 5 for a 5x5 Sudoku
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
    const inputs = document.querySelectorAll('input[type="number"]');
    const puzzle = [];

    // Extract the current state of the puzzle
    let rowIndex = 0;
    for (let i = 0; i < inputs.length; i++) {
        if (i % 5 === 0) {
            puzzle.push([]);
            rowIndex++;
        }
        const inputValue = parseInt(inputs[i].value, 10);
        puzzle[rowIndex - 1].push(isNaN(inputValue) ? 0 : inputValue);
    }

    // Check rows and columns for duplicates
    for (let i = 0; i < 5; i++) {
        const row = puzzle[i];
        const column = puzzle.map(row => row[i]);

        if (
            hasDuplicates(row) ||
            hasDuplicates(column)
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

// Event listener for checking Sudoku solution
document.getElementById('sudokuContainer').addEventListener('input', function () {
    if (isSudokuSolved()) {
        revealRiddle();
    }
});
