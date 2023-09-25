// Variável para armazenar o enigma
let enigma = '';

// Função para gerar um Sudoku 5x5 aleatório
function generateSudoku() {
    const puzzle = [
        [5, 3, 0, 0, 0],
        [4, 0, 0, 1, 0],
        [0, 2, 0, 0, 4],
        [3, 0, 0, 0, 0],
        [0, 0, 1, 0, 2]
    ];

    // Defina a variável global 'enigma' com um enigma específico
    enigma = 'Este é o enigma 1.';

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

// Função para verificar se o Sudoku está resolvido corretamente
function isSudokuSolved() {
    const inputs = document.querySelectorAll('input[type="number"]');
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

    // Verificar linhas e colunas em busca de duplicatas
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

// Função para verificar duplicatas em um array
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

// Função para revelar o enigma
function revealRiddle() {
    const enigmaSection = document.getElementById('enigma-section');
    const enigmaText = document.getElementById('enigma-text');

    // Exibir a seção de enigma
    enigmaSection.style.display = 'block';

    // Exibir o enigma
    enigmaText.textContent = enigma;
}

// Event listener para verificar a solução do Sudoku
document.getElementById('sudoku-board').addEventListener('input', function () {
    if (isSudokuSolved()) {
        revealRiddle();
    }
});

// Event listener para iniciar o jogo Sudoku
document.getElementById('start-button').addEventListener('click', function () {
    const sudokuSection = document.getElementById('sudoku-section');
    sudokuSection.innerHTML = ''; // Limpa qualquer tabuleiro anterior
    const sudokuTable = generateSudoku();
    sudokuSection.appendChild(sudokuTable);
    sudokuSection.style.display = 'block';
});
