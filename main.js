let currentPlayer = "X" // X is the starting player.
let playerXSelections = []
let playerOSelections = []

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
const currentPlayerElement = document.querySelector("#currentPlayer")
currentPlayerElement.innerHTML = currentPlayer
// Get all .grid-cell elements from the DOM and store in cellElementArray (see Resources links below):
const cellElementArray = document.querySelectorAll(".grid-cell")
// Loop over each element in our cellElementArray:
for (
    let elementIndex = 0;
    elementIndex < cellElementArray.length;
    elementIndex += 1
) {
    // Set the cell element at cellElementArray[cellIndex] to the currentCell variable:
    const currentCellElement = cellElementArray[elementIndex]
    // Add an event listener to the currentCellElement:
    currentCellElement.addEventListener("click", function (event) {
        // event.target tells us which element the user clicked (see Resources links below):
        const clickedCellElement = event.target
        // Log the ID of the cell which was just clicked:
        // console.log("You clicked on cell number: " + clickedCellElement.id)
        if (clickedCellElement.innerHTML === "") {
            if (currentPlayer === "X") {
                clickedCellElement.innerHTML = "X"
                clickedCellElement.classList.add('animate')
                playerXSelections.push(Number(clickedCellElement.id))
                // console.log(playerXSelections)
                currentPlayer = "O"
                if(checkForWin(winningCombinations, playerXSelections)){
                    alert("Player 'X' Wins!")
                    resetBoard()
                }
            } else {
                clickedCellElement.innerHTML = "O"
                clickedCellElement.classList.add('animate')
                playerOSelections.push(Number(clickedCellElement.id))
                // console.log(playerOSelections)
                currentPlayer = "X"
                if(checkForWin(winningCombinations, playerOSelections)){
                    alert("Player 'O' Wins!")
                    resetBoard()
                }
            }
        }if (checkForDraw(playerXSelections,playerOSelections)){
            alert("It's a Draw.")
            resetBoard()
        }
        currentPlayerElement.innerHTML = currentPlayer
    })
}

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

function checkForDraw(playerOneSelection, playerTwoSelection){
    return ((playerOneSelection.length + playerTwoSelection.length) === 9)
}

function resetBoard() {
    currentPlayer = "X"
    playerXSelections = []
    playerOSelections = []
    for (element of cellElementArray){
        element.innerHTML = ''
        element.classList.remove('animate')
    }
}
