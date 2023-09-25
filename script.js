// Matriz para armazenar o tabuleiro de Sudoku
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

// Function to create the Sudoku board in HTML
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
                // Update the sudokuBoard with the user's input
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

// Function to check if Sudoku is solved correctly
function isSudokuSolved() {
    // Your Sudoku solving logic here
    // ...

    // For now, consider it solved if all cells are filled
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudokuBoard[i][j] === 0) {
                return false;
            }
        }
    }

    return true;
}

// Function to display the enigma when Sudoku is solved
function displayEnigma() {
    const enigmaSection = document.getElementById('enigma-section');
    const enigmaText = document.getElementById('enigma-text');
    enigmaText.innerText = 'Congratulations! You solved the Sudoku. Here is your enigma: [Your enigma text here]';
    enigmaSection.style.display = 'block';
}

// Event listener for the "Sudoku" button
document.getElementById('start-button').addEventListener('click', function () {
    createSudokuBoard();
    document.getElementById('sudoku-section').style.display = 'block';
    document.getElementById('start-section').style.display = 'none';
});

// Event listener for checking if Sudoku is solved
document.getElementById('sudoku-board').addEventListener('input', function () {
    if (isSudokuSolved()) {
        displayEnigma();
    }
});
