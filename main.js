const cellElementArray = document.querySelectorAll(".grid-cell")
const currentPlayerElement = document.querySelector("#currentPlayer")
const outcomeElement = document.querySelector("#outcome")
const resetButton = document.querySelector("#reset")

// initialize the game:
let currentPlayer = "X" // X is the starting player.
let playerXSelections = []
let playerOSelections = []
let gameWasWon = false

const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]

currentPlayerElement.innerHTML = currentPlayer

for (
    let elementIndex = 0;
    elementIndex < cellElementArray.length;
    elementIndex += 1
) {
    const currentCellElement = cellElementArray[elementIndex]

    currentCellElement.addEventListener("click", function (event) {
        const clickedCellElement = event.target
        if (clickedCellElement.innerHTML === "" && !gameWasWon) {
            if (currentPlayer === "X") {
                clickedCellElement.innerHTML = "X"
                clickedCellElement.classList.add("animate")
                playerXSelections.push(Number(clickedCellElement.id))
                currentPlayer = "O"
                if (checkForWin(winningCombinations, playerXSelections)) {
                    outcomeElement.innerHTML = 'Player "X" wins!'
                    gameWasWon = true
                }
            } else {
                clickedCellElement.innerHTML = "O"
                clickedCellElement.classList.add("animate")
                playerOSelections.push(Number(clickedCellElement.id))
                currentPlayer = "X"
                if (checkForWin(winningCombinations, playerOSelections)) {
                    outcomeElement.innerHTML = 'Player "O" wins!'
                    gameWasWon = true
                }
            }
            if (checkForDraw(playerXSelections, playerOSelections)) {
                outcomeElement.innerHTML = "It's a Draw."
            }
        }
        currentPlayerElement.innerHTML = currentPlayer
    })
}

resetButton.addEventListener("click", function () {
    resetBoard()
})

function checkForWin(winningCombination, playerSelections) {
    let playerHasWon = false
    winningCombination.forEach((combination) => {
        let matches = 0
        for (let winNumber of combination) {
            if (playerSelections.includes(winNumber)) {
                matches++
                if (matches === 3) {
                    playerHasWon = true
                }
            }
        }
    })
    return playerHasWon
}

function checkForDraw(playerOneSelection, playerTwoSelection) {
    // no winner declared
    let outcomeIsEmpty = outcomeElement.innerHTML === ""
    // players have selected all cells
    let allCellsAreSelected =
        playerOneSelection.length + playerTwoSelection.length === 9
    return outcomeIsEmpty && allCellsAreSelected
}

function resetBoard() {
    currentPlayer = "X"
    currentPlayerElement.innerHTML = currentPlayer
    playerXSelections = []
    playerOSelections = []
    gameWasWon = false
    for (element of cellElementArray) {
        element.innerHTML = ""
        element.classList.remove("animate")
    }
    outcomeElement.innerHTML = ""
}
