"use strict";

// Player factory function
function Player(sign) {
  // Method to get the player's sign (X or O)
  function getSign() {
    return sign;
  }
  // Return the method as a public function
  return { getSign };
}

// Module for managing the game board
const gameBoard = (function () {
  // Initialize the board as an array of 9 empty strings
  const board = ["", "", "", "", "", "", "", "", ""];

  // Function to set a sign (X or O) at a specific index on the board
  function setField(index, sign) {
    if (index > board.length) return;
    board[index] = sign;
  }

  // Function to get the value at a specific index on the board
  function getField(index) {
    if (index > board.length) return;
    return board[index];
  }

  // Function to reset the board by setting all fields to empty
  function reset() {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  }

  // Return public methods for interacting with the board
  return { setField, getField, reset };
})();

// Module for controlling the display and user interactions
const displayController = (function () {
  // Select all fields (HTML elements) on the board and the message element
  const fieldElements = document.querySelectorAll(".field");
  const messageElement = document.getElementById("message");
  const restartButton = document.getElementById("restart-button");

  // Add click event listeners to each field on the board
  fieldElements.forEach(function (field) {
    field.addEventListener("click", function (e) {
      // If the game is over or the field is already filled, do nothing
      if (gameController.getIsOver() || e.target.textContent !== "") return;
      // Play a round when a field is clicked
      gameController.playRound(parseInt(e.target.dataset.index));
      // Update the visual display of the game board
      updateGameboard();
    });
  });

  // Add click event listener to the restart button
  restartButton.addEventListener("click", function () {
    gameBoard.reset();        // Reset the game board
    gameController.reset();   // Reset the game controller
    updateGameboard();        // Update the display
    setMessageElement("Player X's turn"); // Set the message to indicate X's turn
  });

  // Function to update the visual display of the game board
  function updateGameboard() {
    for (let i = 0; i < fieldElements.length; i++) {
      fieldElements[i].textContent = gameBoard.getField(i);
    }
  }

  // Function to set the result message when the game is over
  function setResultMessage(winner) {
    if (winner === "Draw") {
      setMessageElement("It's a draw!");   // Display draw message
    } else {
      setMessageElement(`Player ${winner} has won!`);  // Display winner message
    }
  }

  // Function to update the message displayed to the players
  function setMessageElement(message) {
    messageElement.textContent = message;
  }

  // Return public methods to update the display and message
  return { setResultMessage, setMessageElement, updateGameboard };
})();

// Module for controlling the game logic
const gameController = (function () {
  const playerX = Player("X");  // Create player X
  const playerO = Player("O");  // Create player O
  let round = 1;                // Track the current round
  let isOver = false;           // Track if the game is over

  // Function to handle a player's turn
  function playRound(fieldIndex) {
    // Set the field with the current player's sign
    gameBoard.setField(fieldIndex, getCurrentPlayerSign());
    
    // Check if the current player has won
    if (checkWinner(fieldIndex)) {
      displayController.setResultMessage(getCurrentPlayerSign());
      isOver = true;  // End the game if there's a winner
      return;
    }

    // If all 9 rounds are played and no winner, it's a draw
    if (round === 9) {
      displayController.setResultMessage("Draw");
      isOver = true;  // End the game
      return;
    }

    // Move to the next round and display the current player's turn
    round++;
    displayController.setMessageElement(
      `Player ${getCurrentPlayerSign()}'s turn`
    );
  }

  // Function to get the sign of the current player (X or O)
  function getCurrentPlayerSign() {
    return round % 2 === 1 ? playerX.getSign() : playerO.getSign();  // Odd rounds = X, even rounds = O
  }

  // Function to check if a player has won the game
  function checkWinner(fieldIndex) {
    // Possible winning combinations of indices on the board
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Check if the current player has a winning combination
    return winConditions
      .filter(function (combination) {
        return combination.includes(fieldIndex);  // Filter combinations that include the current field index
      })
      .some(function (possibleCombination) {
        return possibleCombination.every(function (index) {
          return gameBoard.getField(index) === getCurrentPlayerSign();  // Check if all fields in a combination match the player's sign
        });
      });
  }

  // Function to check if the game is over
  function getIsOver() {
    return isOver;
  }

  // Function to reset the game state
  function reset() {
    round = 1;
    isOver = false;
  }

  // Return public methods to control the game flow
  return { playRound, getIsOver, reset };
})();

// Initialize the game display and set the starting message
displayController.updateGameboard();
displayController.setMessageElement("Player X's turn");
