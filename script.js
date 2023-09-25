// Função para gerar um Sudoku menor (5x5) com mais células em branco
function generateSmallSudokuWithMoreBlanks() {
    // Sudoku 5x5 representado como uma matriz 5x5 com mais células em branco
    const puzzle = [
        [4, 0, 2, 0, 0],
        [0, 0, 0, 0, 0],
        [3, 0, 1, 0, 0],
        [0, 0, 0, 4, 0],
        [2, 0, 0, 3, 0]
    ];

    // Converta o quebra-cabeça em uma tabela 5x5
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
                input.setAttribute('max', '5');
                input.setAttribute('size', '1');
                cell.appendChild(input);
            }
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    return table;
}

// Event listener para verificar a solução do Sudoku
document.getElementById('smallSudokuWithMoreBlanksContainer').addEventListener('input', function () {
    if (isSmallSudokuWithMoreBlanksSolved()) {
        console.log("Sudoku resolvido corretamente!");
    }
});

// Função para verificar se o Sudoku menor com mais células em branco está resolvido corretamente
function isSmallSudokuWithMoreBlanksSolved() {
    const inputs = document.querySelectorAll('#smallSudokuWithMoreBlanksContainer input[type="number"]');
    const puzzle = [];

    // Extrair o estado atual do quebra-cabeça
    let rowIndex = 0;
    for (let i = 0; i < inputs.length; i++) {
        if (i % 5 === 0) {
            puzzle.push([]);
            rowIndex++;
        }
        const inputValue = parseInt(inputs[i].value, 10);
        puzzle[rowIndex - 1].push(isNaN(inputValue) ? 0 : inputValue);
    }

    // Verificar linhas e colunas para duplicatas
    for (let i = 0; i < 5; i++) {
        const row = puzzle[i];
        const column = puzzle.map(row => row[i]);

        if (hasDuplicates(row) || hasDuplicates(column)) {
            return false;
        }
    }

    return true;
}
