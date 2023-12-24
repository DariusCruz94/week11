// Execute code when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // DOM elements
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const turnDisplay = document.getElementById("turn");
    const resetButton = document.getElementById("reset");
    const resultAlert = document.getElementById("result");
    const resultMessage = document.getElementById("result-message");

    // Game state variables
    let currentPlayer = "X";
    let moves = 0;
    let boardState = ["", "", "", "", "", "", "", "", ""];

    // Function to check if there is a winner
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }

        return null;
    }

    // Function to announce the winner or a draw
    function announceWinner(winner) {
        resultMessage.textContent = winner ? `${winner} wins!` : "It's a draw!";
        resultAlert.classList.add(winner ? "alert-success" : "alert-warning");
        resultAlert.style.display = "block";
        resetButton.disabled = true;
    }

    // Function to handle cell click
    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.dataset.index;

        if (!cell.classList.contains("clicked")) {
            cell.textContent = currentPlayer;
            cell.classList.add("clicked");
            boardState[index] = currentPlayer;

            moves++;
            const winner = checkWinner();

            if (winner || moves === 9) {
                announceWinner(winner);
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                turnDisplay.textContent = `${currentPlayer}'s Turn`;
            }
        }
    }

    // Function to reset the game
    function resetGame() {
        currentPlayer = "X";
        moves = 0;
        boardState = ["", "", "", "", "", "", "", "", ""];
        turnDisplay.textContent = `${currentPlayer}'s Turn`;
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove("clicked");
        });

        resultAlert.style.display = "none";
        resultAlert.classList.remove("alert-success", "alert-warning");
        resetButton.disabled = false;
    }

    // Add click event listeners to cells
    cells.forEach((cell) => {
        cell.addEventListener("click", handleCellClick);
    });

    // Add click event listener to the reset button
    resetButton.addEventListener("click", resetGame);
});
