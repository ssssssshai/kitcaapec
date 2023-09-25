// Função para criar um tabuleiro Sudoku inicial
function createSudokuBoard() {
    const sudokuBoard = document.getElementById('sudoku-board');
    sudokuBoard.innerHTML = ''; // Limpa qualquer conteúdo existente

    // Você pode definir seu próprio tabuleiro Sudoku inicial aqui
    // Certifique-se de usar "0" para células vazias
    const initialBoard = [
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

    for (let i = 0; i < 9; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('td');
            if (initialBoard[i][j] !== 0) {
                cell.textContent = initialBoard[i][j];
                cell.classList.add('given'); // Adicione uma classe para as células iniciais
            }
            row.appendChild(cell);
        }
        sudokuBoard.appendChild(row);
    }
}

// Função para verificar se o Sudoku foi resolvido corretamente
function isSudokuSolved() {
    const cells = document.querySelectorAll('#sudoku-board td');
    for (const cell of cells) {
        if (!cell.classList.contains('given')) {
            if (cell.textContent === '') {
                return false; // Célula em branco
            }
        }
    }
    return true;
}

// Event listener para o botão "Sudoku"
document.getElementById('start-button').addEventListener('click', function () {
    createSudokuBoard(); // Chama a função para criar o tabuleiro Sudoku
    document.getElementById('start-section').style.display = 'block'; // Exibe a seção inicial
    document.getElementById('start-button').style.display = 'none'; // Esconde o botão "Sudoku"
});

// Event listener para as células do tabuleiro Sudoku
document.getElementById('sudoku-board').addEventListener('input', function () {
    if (isSudokuSolved()) {
        // Sudoku resolvido corretamente, mostre o enigma
        const enigma = "Ola, encontre o e\npara encontrar\net"; // Seu enigma personalizado
        document.getElementById('enigma-text').textContent = enigma;
        document.getElementById('enigma-section').style.display = 'block'; // Exibe a seção do enigma
    }
});
