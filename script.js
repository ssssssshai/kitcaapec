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
            const input = document.createElement('input'); // Adiciona um elemento input para permitir edição
            input.type = 'text';
            input.maxLength = 1;
            input.addEventListener('input', function () {
                // Garante que o valor inserido seja um número entre 1 e 9
                if (/[^1-9]/.test(this.value)) {
                    this.value = '';
                }
            });
            if (initialBoard[i][j] !== 0) {
                input.value = initialBoard[i][j];
                input.classList.add('given'); // Adicione uma classe para as células iniciais
                input.disabled = true; // Desabilita a edição nas células iniciais
            }
            cell.appendChild(input);
            row.appendChild(cell);
        }
        sudokuBoard.appendChild(row);
    }
}

// ...

// Event listener para as células do tabuleiro Sudoku
document.getElementById('sudoku-board').addEventListener('input', function () {
    if (isSudokuSolved()) {
        // Sudoku resolvido corretamente, mostre o enigma
        const enigma = "Ola, encontre o e\npara encontrar\net"; // Seu enigma personalizado
        document.getElementById('enigma-text').textContent = enigma;
        document.getElementById('enigma-section').style.display = 'block'; // Exibe a seção do enigma
    }
});
