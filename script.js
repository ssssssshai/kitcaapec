document.addEventListener('DOMContentLoaded', function () {
    // Variável para armazenar o enigma
    let enigma = '';

    // Função para gerar um Sudoku 5x5 aleatório
    function generateSudoku() {
        const puzzle = [
            [5, 0, 0, 0, 0],
            [0, 3, 0, 0, 5],
            [0, 1, 0, 0, 0],
            [0, 4, 0, 0, 0],
            [0, 0, 3, 0, 0]
        ];

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

function isSudokuSolved() {
    const inputs = document.querySelectorAll('input[type="number"]');
    const puzzle = [];
    
    let rowIndex = 0;
    let row = [];

    for (let i = 0; i < inputs.length; i++) {
        const inputValue = parseInt(inputs[i].value, 10);
        row.push(inputValue);

        if (row.length === 5) {
            puzzle.push(row);
            row = [];
            rowIndex++;
        }
    }

    // Verificar linhas, colunas e submatrizes 2x2 em busca de duplicatas
    if (!isValid(puzzle)) {
        alert('Sudoku incorreto. Tente novamente!');
    } else {
        revealEnigma();
    }
}
    
function isValid(puzzle) {
    return isValidRows(puzzle) && isValidColumns(puzzle);
}

function isValidRows(puzzle) {
    for (let i = 0; i < 5; i++) {
        const row = puzzle[i];
        const rowSet = new Set(row);

        // Check if the row contains the numbers 1 to 5 exactly once
        if (rowSet.size !== 5 || !rowSet.has(1) || !rowSet.has(2) || !rowSet.has(3) || !rowSet.has(4) || !rowSet.has(5)) {
            return false;
        }
    }
    return true;
}

function isValidColumns(puzzle) {
    for (let i = 0; i < 5; i++) {
        const column = [];
        for (let j = 0; j < 5; j++) {
            column.push(puzzle[j][i]);
        }
        const columnSet = new Set(column);

        // Check if the column contains the numbers 1 to 5 exactly once
        if (columnSet.size !== 5 || !columnSet.has(1) || !columnSet.has(2) || !columnSet.has(3) || !columnSet.has(4) || !columnSet.has(5)) {
            return false;
        }
    }
    return true;
}


    function revealEnigma() {
        // Esta função deve mostrar o enigma
        // Você pode exibir o enigma na seção de enigma ou de outra forma que preferir
        const enigmaText = document.getElementById('enigma-text');
        enigmaText.textContent = enigma;
        document.getElementById('enigma-section').style.display = 'block';
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
            isSudokuSolved();
        });
    }

    // Função auxiliar para verificar duplicatas em uma matriz
    function hasDuplicates(array) {
        const values = new Set();
        for (const item of array) {
            if (values.has(item) && item !== 0) { // Ignora células vazias
                highlightDuplicates(array);
                return true;
            }
            values.add(item);
        }
        return false;
    }

    // Função para destacar células com duplicatas
    function highlightDuplicates(array) {
        const inputs = document.querySelectorAll('input[type="number"]');
        for (let i = 0; i < array.length; i++) {
            if (array[i] !== 0) {
                inputs[i].classList.add('error');
            }
        }
    }

    // Event listener para iniciar o Sudoku quando o botão for clicado
    document.getElementById('start-button').addEventListener('click', showSudokuSection);
});
