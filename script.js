// Função para gerar o Sudoku quando o botão "Sudoku" é clicado
document.getElementById('start-button').addEventListener('click', function () {
    createSudokuBoard();
    document.getElementById('sudoku-section').style.display = 'block'; // Exibe a seção do Sudoku
    document.getElementById('start-section').style.display = 'none'; // Oculta a seção de instruções
});



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
    // Implemente a lógica para verificar a resolução do Sudoku aqui
    // Retorne true se estiver resolvido corretamente, caso contrário, retorne false
}

// Event listener para as células do tabuleiro Sudoku
document.getElementById('sudoku-board').addEventListener('input', function () {
    if (isSudokuSolved()) {
        // Sudoku resolvido corretamente, mostre o enigma
        const enigma = "Ola, encontre o e\npara encontrar\net"; // Seu enigma personalizado
        document.getElementById('enigma-text').textContent = enigma;
        document.getElementById('enigma-section').style.display = 'block'; // Exibe a seção do enigma
    }
});

createSudokuBoard();
