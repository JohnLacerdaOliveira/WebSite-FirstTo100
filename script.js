"use strict";

let activePlayer, isPlaying, currentScore, scores;
let winner = 0;
//DOM elements selection...
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const totalScore0EL = document.querySelector("#score--0");
const totalScore1EL = document.getElementById("score--1");
// IS NECESSARY ??
const currentScore0EL = document.querySelector("#current--0");
const currentScore1EL = document.querySelector("#current--1");
const diceEL = document.querySelector(".dice");

//BUTTONS selection...
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

function startGame() {
  activePlayer = 0;
  isPlaying = true;
  currentScore = 0;
  scores = [0, 0];
  totalScore0EL.textContent = 0;
  totalScore1EL.textContent = 0;
  currentScore0EL.textContent = 0;
  currentScore1EL.textContent = 0;
  diceEL.classList.add("hidden");
  document
    .querySelector(`.player--${winner}`)
    .classList.remove("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
}
// Initialize and re-start game...
startGame();

// Switch to next player function...
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
}

// NEW GAME FUNCTIONALITY...
btnNew.addEventListener("click", startGame);

// ROLLING DICE FUNCTIONALITY...
btnRoll.addEventListener("click", function () {
  if (isPlaying) {
    //1. generating roll
    const diceRoll = Math.trunc(Math.random() * 6 + 1);

    //2. display dice
    diceEL.classList.remove("hidden");
    diceEL.src = `resources/dice-${diceRoll}.png`;

    //3. check for  rolled 1: If true switch to next player
    if (diceRoll !== 1) {
      // Add dice to current score...
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player...
      switchPlayer();
    }
  }
});

// HOLD BUTTON FUNCTIONALITY
btnHold.addEventListener("click", function () {
  if (isPlaying) {
    //1. add currentScore to totalScore Array...
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if score > 100...
    if (scores[activePlayer] >= 10) {
      winner = activePlayer;
      console.log(winner);
      //3. finish game...
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      diceEL.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});
