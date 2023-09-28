document.addEventListener("DOMContentLoaded", function () {
    const startSection = document.getElementById("start-section");
    const sudokuSection = document.getElementById("sudoku-section");
    const enigmaSection = document.getElementById("enigma-section");
    const sudokuContainer = document.getElementById("sudoku-container");
    const verifyButton = document.getElementById("verify-button");
    const enigmaText = document.getElementById("enigma-text");
    const startButton = document.getElementById("start-button");

    let sudoku = [
        [null, null, null, 1, 5,
        [1, null, null, null, 4],
        [null, 3, null, null, null],
        [null, null, 5, null, null],
        [3, null, null, null, 1],
    ];

    let solution = [
        [2, 4, 3, 1, 5],
        [1, 5, 2, 3, 4],
        [5, 3, 1, 4, 2],
        [4, 1, 5, 2, 3],
        [3, 2, 4, 5, 1],
    ];

    let currentSudoku = JSON.parse(JSON.stringify(sudoku));

    function renderSudoku() {
        sudokuContainer.innerHTML = "";
        for (let i = 0; i < 5; i++) {
            const row = document.createElement("div");
            row.classList.add("sudoku-row");
            for (let j = 0; j < 5; j++) {
                const cell = document.createElement("input");
                cell.type = "number";
                cell.classList.add("sudoku-cell");
                cell.value = currentSudoku[i][j] || "";
                cell.addEventListener("input", () => {
                    currentSudoku[i][j] = parseInt(cell.value) || null;
                });
                row.appendChild(cell);
            }
            sudokuContainer.appendChild(row);
        }
    }

    function isSudokuValid() {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (currentSudoku[i][j] !== solution[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    startButton.addEventListener("click", () => {
        startSection.style.display = "none";
        sudokuSection.style.display = "block";
        renderSudoku();
    });

    verifyButton.addEventListener("click", () => {
        if (isSudokuValid()) {
            enigmaText.textContent =
                "Você encontrou o enigma, parabéns! Encontre o Ê!";
            enigmaSection.style.display = "block";
        } else {
            alert("Sudoku incorreto. Tente novamente.");
        }
    });
});
