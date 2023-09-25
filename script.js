// Variável para armazenar o enigma
let enigma = '';

// Variável para armazenar entradas inválidas
let invalidInputs = [];

// Função para gerar um Sudoku 5x5 aleatório
function generateSudoku() {
    const puzzle = [
        [5, 0, 0, 0, 0],
        [0, 3, 0, 0, 5],
        [0, 1, 0, 0, 0],
        [0, 4, 0, 0, 0],
        [0, 0, 3, 0, 0]
    ];

    // Defina a variável global 'enigma' com um enigma específico
    enigma = 'Você encontrou o E, agora ache o Ê!';

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

// Função para verificar se há duplicatas em um array
function hasDuplicates(array) {
    return new Set(array).size !== array.length;
}

// Função para verificar um subgrid 2x2 em um Sudoku 5x5
function checkSubgrid(puzzle, startX, startY) {
    const subgridValues = [];
    for (let i = startX; i < startX + 2; i++) {
        for (let j = startY; j < startY + 2; j++) {
            subgridValues.push(puzzle[i][j]);
        }
    }
    return subgridValues;
}

// Função para verificar se o Sudoku está resolvido corretamente
function isSudokuSolved() {
    const inputs = document.querySelectorAll('input[type="number"]');
    const puzzle = [];
    let invalidInputs = [];

    // Limpar entradas inválidas
    inputs.forEach(input => input.classList.remove('invalid-input'));

    // Extrair o estado atual do quebra-cabeça e verificar entradas inválidas
    let rowIndex = 0;
    for (let i = 0; i < inputs.length; i++) {
        if (i % 5 === 0) {
            puzzle.push([]);
            rowIndex++;
        }
        const inputValue = parseInt(inputs[i].value, 10);
        if (isNaN(inputValue) || inputValue < 1 || inputValue > 5) {
            invalidInputs.push(inputs[i]);
        }
        puzzle[rowIndex - 1].push(isNaN(inputValue) ? 0 : inputValue);
    }

    // Verificar linhas e colunas em busca de duplicatas
    for (let i = 0; i < 5; i++) {
        const row = puzzle[i];
        const column = puzzle.map(row => row[i]);
        if (hasDuplicates(row) || hasDuplicates(column) || invalidInputs.some(input => row.includes(parseInt(input.value, 10)))) {
            return false;
        }
    }

    // Verificar subgrids de 2x2 em busca de duplicatas e entradas inválidas
    for (let i = 0; i < 5; i += 2) {
        for (let j = 0; j < 5; j += 2) {
            const subgrid = checkSubgrid(puzzle, i, j);
            if (hasDuplicates(subgrid) || invalidInputs.some(input => subgrid.includes(parseInt(input.value, 10)))) {
                return false;
            }
        }
    }

    return true;
}

function showSudokuSection() {
    const startSection = document.getElementById('start-section');
    const sudokuSection = document.getElementById('sudoku-section');
    const sudokuTable = generateSudoku();

    startSection.style.display = 'none';
    sudokuSection.style.display = 'block';
    sudokuSection.innerHTML = '';
    sudokuSection.appendChild(sudokuTable);

    // Adicione o botão de verificar
    const checkButton = document.createElement('button');
    checkButton.setAttribute('id', 'check-button');
    checkButton.textContent = 'Verificar';
    sudokuSection.appendChild(checkButton);

    checkButton.addEventListener('click', function () {
        if (isSudokuSolved()) {
            revealEnigma();
        } else {
            invalidInputs.forEach(input => input.classList.add('invalid-input'));
            alert('Sudoku incorreto. Tente novamente!');
        }
    });
}

// Event listener para iniciar o Sudoku quando o botão for clicado
document.getElementById('start-button').addEventListener('click', showSudokuSection);
