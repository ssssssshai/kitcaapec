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

// Função para verificar se o Sudoku está resolvido corretamente
function isSudokuSolved() {
    const inputs = document.querySelectorAll('input[type="number"]');
    const puzzle = [];

    for (let i = 0; i < inputs.length; i++) {
        const inputValue = parseInt(inputs[i].value, 10);
        puzzle.push(inputValue);
    }

    // Verificar linhas e colunas em busca de duplicatas
    for (let i = 0; i < 5; i++) {
        const row = puzzle.slice(i * 5, (i + 1) * 5);
        const column = [];
        for (let j = 0; j < 5; j++) {
            column.push(puzzle[j * 5 + i]);
        }

        if (hasDuplicates(row) || hasDuplicates(column)) {
            alert('Sudoku incorreto. Tente novamente!');
            return;
        }
    }
    }

    // Se chegou até aqui, o Sudoku está resolvido corretamente
    revealEnigma();
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

// Event listener para iniciar o Sudoku quando o botão for clicado
document.getElementById('start-button').addEventListener('click', showSudokuSection);
