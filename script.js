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

// Função para criar o tabuleiro de Sudoku no HTML
function createSudokuBoard() {
    const sudokuTable = document.getElementById('sudoku-board');

    for (let i = 0; i < 9; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;

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

// Função para verificar se o Sudoku foi resolvido corretamente
function isSudokuSolved() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const currentVal = sudokuBoard[i][j];
            if (currentVal === 0) {
                return false; // Existem células em branco, o Sudoku não está resolvido
            }
            // Verificar linhas e colunas
            for (let k = 0; k < 9; k++) {
                if (k !== j && sudokuBoard[i][k] === currentVal) {
                    return false; // Número repetido na linha
                }
                if (k !== i && sudokuBoard[k][j] === currentVal) {
                    return false; // Número repetido na coluna
                }
            }
            // Verificar região 3x3
            const regionStartRow = Math.floor(i / 3) * 3;
            const regionStartCol = Math.floor(j / 3) * 3;
            for (let x = regionStartRow; x < regionStartRow + 3; x++) {
                for (let y = regionStartCol; y < regionStartCol + 3; y++) {
                    if ((x !== i || y !== j) && sudokuBoard[x][y] === currentVal) {
                        return false; // Número repetido na região 3x3
                    }
                }
            }
        }
    }
    return true; // Sudoku resolvido corretamente
}

// Event listener para o botão "Sudoku"
document.getElementById('start-button').addEventListener('click', function () {
    createSudokuBoard();
    document.getElementById('sudoku-section').style.display = 'block'; // Exibe a seção do Sudoku
    document.getElementById('start-section').style.display = 'none'; // Oculta a seção de instruções
});

// Event listener para o botão "Sudoku"
document.getElementById('start-button').addEventListener('click', function () {
    createSudokuBoard();
    document.getElementById('sudoku-section').style.display = 'block'; // Exibe a seção do Sudoku
    document.getElementById('start-section').style.display = 'none'; // Oculta a seção de instruções
});

