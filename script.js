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

    // Verificar subgrids de 5x5 em busca de duplicatas
    for (let i = 0; i < 5; i += 2) {
        for (let j = 0; j < 5; j += 2) {
            const subgrid = [];
            for (let x = i; x < i + 2; x++) {
                for (let y = j; y < j + 2; y++) {
                    subgrid.push(puzzle[x][y]);
                }
            }
            if (hasDuplicates(subgrid)) {
                return false;
            }
        }
    }

    return true;
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

function showSudokuSection() {
    const startSection = document.getElementById('start-section');
    const sudokuSection = document.getElementById('sudoku-section');
    const sudokuTable = generateSudoku();

    startSection.style.display = 'none';
    sudokuSection.style.display = 'block';
    sudokuSection.innerHTML = '';
    sudokuSection.appendChild(sudokuTable); // Adicione a tabela Sudoku à seção

    // Adicione o botão de verificar
    const checkButton = document.createElement('button');
    checkButton.setAttribute('id', 'check-button');
    checkButton.textContent = 'Verificar';
    sudokuSection.appendChild(checkButton);

    checkButton.addEventListener('click', function () {
        if (isSudokuSolved()) {
            revealRiddle(); // Se o Sudoku estiver correto, revele o enigma
        } else {
            alert('Sudoku incorreto. Tente novamente!'); // Se o Sudoku estiver incorreto, exiba um alerta
        }
    });
}


// Event listener para iniciar o Sudoku quando o botão for clicado
document.getElementById('start-button').addEventListener('click', showSudokuSection);
