document.addEventListener("DOMContentLoaded", function () {
  const sudokuBoard = [
    [5, 0, 0, 0, 0],
    [0, 3, 0, 0, 5],
    [0, 1, 0, 0, 0],
    [0, 4, 0, 0, 0],
    [0, 0, 3, 0, 0],
  ];

  const sudokuContainer = document.getElementById("sudoku-container");
  const startButton = document.getElementById("start-button");
  const verifyButton = document.getElementById("verify-button");
  const enigmaSection = document.getElementById("enigma-section");
  const enigmaText = document.getElementById("enigma-text");

  let sudokuInput = [];

  // Função para criar a grade Sudoku
  function createSudoku() {
    let sudokuHtml = "<table>";

    for (let i = 0; i < sudokuBoard.length; i++) {
      sudokuHtml += "<tr>";

      for (let j = 0; j < sudokuBoard[i].length; j++) {
        if (sudokuBoard[i][j] === 0) {
          sudokuHtml += `<td><input type="text" class="sudoku-input" id="cell-${i}-${j}" maxlength="1"></td>`;
        } else {
          sudokuHtml += `<td>${sudokuBoard[i][j]}</td>`;
        }
      }

      sudokuHtml += "</tr>";
    }

    sudokuHtml += "</table>";
    sudokuContainer.innerHTML = sudokuHtml;
  }

  // Função para verificar se o Sudoku está correto
  function checkSudoku() {
    for (let i = 0; i < sudokuBoard.length; i++) {
      for (let j = 0; j < sudokuBoard[i].length; j++) {
        const inputElement = document.getElementById(`cell-${i}-${j}`);
        if (inputElement) {
          const userInput = parseInt(inputElement.value);

          if (isNaN(userInput) || userInput === 0) {
            alert("Por favor, preencha todos os espaços com números válidos.");
            return;
          }

          sudokuInput[i][j] = userInput;
        }
      }
    }

    // Lógica para verificar se o Sudoku está correto
    const isSolved = checkSudokuSolution();

    if (isSolved) {
      enigmaText.textContent = "Parabéns! Você encontrou o 'E'. Vá em frente!";
      enigmaSection.style.display = "block";
    } else {
      enigmaText.textContent = "Tente novamente.";
      enigmaSection.style.display = "block";
    }
  }

  // Event listener para o botão "Iniciar Sudoku"
  startButton.addEventListener("click", function () {
    createSudoku();
    sudokuInput = Array.from({ length: 5 }, () => Array(5).fill(0));
    sudokuSection.style.display = "block";
    startSection.style.display = "none";
  });

  // Event listener para o botão "Verificar"
  verifyButton.addEventListener("click", function () {
    checkSudoku();
  });

  // Função para verificar a solução do Sudoku
  function checkSudokuSolution() {
    // Implemente sua lógica de verificação aqui
    // Compare sudokuInput com a solução correta (sudokuBoard)
    const rows = sudokuInput;
    const columns = transpose(sudokuInput);
    const subgrids = getSubgrids(sudokuInput);

    return isSolved(rows) && isSolved(columns) && isSolved(subgrids);
  }

  // Função para verificar se um array de Sudoku está correto
  function isSolved(array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].sort().join("") !== "12345") {
        return false;
      }
    }
    return true;
  }

  // Função para transpor a matriz
  function transpose(matrix) {
    return matrix[0].map((_, i) => matrix.map((row) => row[i]));
  }

  // Função para obter subgrids 3x3
  function getSubgrids(matrix) {
    const subgrids = [];
    for (let i = 0; i < 5; i += 3) {
      for (let j = 0; j < 5; j += 3) {
        const subgrid = [];
        for (let x = 0; x < 3; x++) {
          for (let y = 0; y < 3; y++) {
            subgrid.push(matrix[i + x][j + y]);
          }
        }
        subgrids.push(subgrid);
      }
    }
    return subgrids;
  }
});
