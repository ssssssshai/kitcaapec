// Variável para armazenar o enigma
let enigma = '';

// Função para gerar um Sudoku 5x5 aleatório
function generateSudoku() {
    const puzzle = [
        [3, 0, 0, 0, 0],
        [1, 4, 0, 2, 0],
        [0, 0, 1, 0, 4],
        [5, 0, 0, 0, 2],
        [0, 0, 1, 0, 3]
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

// Função para verificar se o Sudoku está resolvido corretamente e mostrar a mensagem apropriada
function checkSudoku() {
    const isSolved = isSudokuSolved();
    const messageSection = document.getElementById('message-section');
    const messageText = document.getElementById('message-text');

    if (isSolved) {
        revealRiddle();
    } else {
        messageText.textContent = 'Sudoku incorreto. Tente novamente!';
    }

    // Exibir a seção de mensagem
    messageSection.style.display = 'block';
}

function showSudokuSection() {
    const startSection = document.getElementById('start-section');
    const sudokuSection = document.getElementById('sudoku-section');
    const sudokuTable = generateSudoku();

    startSection.style.display = 'none'; // Oculta a seção inicial
    sudokuSection.style.display = 'block'; // Exibe a seção do Sudoku
    sudokuSection.innerHTML = ''; // Limpa qualquer tabuleiro anterior

    // Adicione a tabela do Sudoku diretamente ao corpo do documento
    document.body.appendChild(sudokuTable);

    const checkButton = document.getElementById('check-button');
    checkButton.addEventListener('click', checkSudoku);
}

// Event listener para verificar a solução do Sudoku
document.getElementById('check-button').addEventListener('click', function () {
    if (isSudokuSolved()) {
        revealRiddle();
    }
});
