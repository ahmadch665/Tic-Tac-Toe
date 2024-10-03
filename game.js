let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX (Player 2), playerO (Player 1)
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Resets the game for a new start
const resetGame = () => {
  turnO = true; // Player 1 starts the new game
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Function to handle the player's move
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // Player 1 (O)
      box.innerText = "O";
      turnO = false;
    } else {
      // Player 2 (X)
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true; // Disable the clicked box
    count++;

    let isWinner = checkWinner();

    // If all 9 boxes are filled and no winner, declare a draw
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// Function to declare a draw
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes(); // Disable all boxes once the game is drawn
};

// Disable all boxes
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Enable all boxes for a new game
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = ""; // Reset text in the boxes
  }
};

// Function to display the winner and update message with player names
const showWinner = (winner) => {
  let winnerPlayer = winner === "O" ? "Player 1" : "Player 2"; // Map "O" to Player 1 and "X" to Player 2
  msg.innerText = `Congratulations, ${winnerPlayer} wins!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Function to check if there is a winner based on predefined patterns
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val); // Call showWinner with "O" or "X"
        return true;
      }
    }
  }
  return false;
};

// Event listeners for resetting the game
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
