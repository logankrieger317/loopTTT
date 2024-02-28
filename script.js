// let weather = "sunny";

// if (weather === "rainy") {
//     console.log("Don't forget your umbrella!");
// } else if (weather === "sunny") {
//     console.log("Grab your sunglasses!");
// } else {
//     console.log("Have a great day!");
// }


// Loops

// for loop: Great when you know exactly how many times to repeat something.

// Example: Printing numbers 1-10:

// for (let i = 1; i <= 10; i++) {
//     console.log(i);
// }


// while loop:  Keeps going as long as a condition is true.

// Example: Asking a user to guess a number

// let secretNumber = 5;
// let guess = 0;

// while (guess !== secretNumber) {
//     guess = Number(prompt("Guess a number between 1 and 10:"));
// }

// console.log("You got it!");

//  Basic for loop

// Purpose: Repeat a task a set number of times.
// Example: Print the numbers from 1 to 5.

// for (let i = 1; i <= 5; i++) {
//     console.log(i);
// } 

//  Nested for loop

// Purpose: Iterate through multiple levels or create patterns.
// Example: Create a simple multiplication table.

// for (let i = 1; i <= 5; i++) {
//     for (let j = 1; j <= 5; j++) {
//         console.log(i * j);
//     }
// }


// while loop with Input Validation

// Purpose: Keep repeating until a valid condition is met, often involving user input.
// Example: Ask the user to enter a number between 1 and 10, and only stop when they enter a valid number.

// let userInput = 0; 

// while (userInput < 1 || userInput > 10) {
//     userInput = Number(prompt("Enter a number between 1 and 10:"));
// }

// console.log("Valid input received!"); 


// Tic-Tac-Toe

const tiles = document.querySelectorAll(".tile");
const PLAYER_X = "X";
const PLAYER_O = "O";
let turn = PLAYER_X;

let xWins = 0;
let oWins = 0;

const boardState = Array(tiles.length);
boardState.fill(null);

//Elements
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);

//Sounds
const gameOverSound = new Audio("sounds/game_over.wav");
const clickSound = new Audio("sounds/click.wav");

tiles.forEach((tile) => tile.addEventListener("click", tileClick));

function setHoverText() {
  //remove all hover text
  tiles.forEach((tile) => {
    tile.classList.remove("x-hover");
    tile.classList.remove("o-hover");
  });

  const hoverClass = `${turn.toLowerCase()}-hover`;

  tiles.forEach((tile) => {
    if (tile.innerText == "") {
      tile.classList.add(hoverClass);
    }
  });
}

setHoverText();

function tileClick(event) {
  if (gameOverArea.classList.contains("visible")) {
    return;
  }

  const tile = event.target;
  const tileNumber = tile.dataset.index;
  if (tile.innerText != "") {
    return;
  }

  if (turn === PLAYER_X) {
    tile.innerText = PLAYER_X;
    boardState[tileNumber - 1] = PLAYER_X;
    turn = PLAYER_O;
  } else {
    tile.innerText = PLAYER_O;
    boardState[tileNumber - 1] = PLAYER_O;
    turn = PLAYER_X;
  }

  clickSound.play();
  setHoverText();
  checkWinner();
}

function checkWinner() {
  //Check for a winner
  let winnerText = null;
  for (const winningCombination of winningCombinations) {
    //Object Destructuring
    const { combo, strikeClass } = winningCombination;
    const tileValue1 = boardState[combo[0] - 1];
    const tileValue2 = boardState[combo[1] - 1];
    const tileValue3 = boardState[combo[2] - 1];

    if (winnerText != null) {
    gameOverScreen(winnerText);

    if (winnerText === PLAYER_X) {
        xWins++;
        console.log("xWins-CW:", xWins); 
    } else if (winnerText === PLAYER_O) {
        oWins++;
        console.log("oWins-CW:", oWins);
    }
  }

    if (
      tileValue1 != null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      strike.classList.add(strikeClass);
      gameOverScreen(tileValue1);
      return;
    }
  }

  //Check for a draw
  const allTileFilledIn = boardState.every((tile) => tile !== null);
  if (allTileFilledIn) {
    gameOverScreen(null);
  }
}

function gameOverScreen(winnerText) {
  let text = "Draw!";
  if (winnerText != null) {
    text = `Winner is ${winnerText}!`;
  }
  gameOverArea.className = "visible";
  gameOverText.innerText = text;
  gameOverSound.play();
}

function startNewGame() {
  document.getElementsByClassName("xWins").textContent = xWins;
  document.getElementsByClassName("oWins").textContent = oWins;
  strike.className = "strike";
  gameOverArea.className = "hidden";
  boardState.fill(null);
  tiles.forEach((tile) => (tile.innerText = ""));
  turn = PLAYER_X;
  console.log("Resetting counts");
console.log("xWins-SNG:", xWins); 
console.log("oWins-SNG:", oWins);
  setHoverText();
}

const winningCombinations = [
  //rows
  { combo: [1, 2, 3], strikeClass: "strike-row-1" },
  { combo: [4, 5, 6], strikeClass: "strike-row-2" },
  { combo: [7, 8, 9], strikeClass: "strike-row-3" },
  //columns
  { combo: [1, 4, 7], strikeClass: "strike-column-1" },
  { combo: [2, 5, 8], strikeClass: "strike-column-2" },
  { combo: [3, 6, 9], strikeClass: "strike-column-3" },
  //diagonals
  { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
  { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },
];