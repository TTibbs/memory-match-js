// define an array of cards with different symbols
let cards = ["🐶", "🐱", "🐭", "🐹", "🐰", "🐶", "🐱", "🐭", "🐹", "🐰"];

let firstCard = null;
let secondCard = null;

// shuffle the cards using the Fisher-Yates algorithm
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // while there remain elements to shuffle
  while (0 !== currentIndex) {

    // pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// create a grid of cards using html and css
function createGrid() {
  // get the container element
  let container = document.getElementById("container");

  // Clear the container
  container.innerHTML = "";

  // Shuffle the cards array
  cards = shuffle(cards);

  // loop through the shuffled cards array
  for (let i = 0; i < cards.length; i++) {
    // create a card element
    let card = document.createElement("div");
    // add a class name to the card element
    card.classList.add("card");
    // set the data attribute of the card element to the symbol of the card
    card.setAttribute("data-symbol", cards[i]);
    // add an event listener to the card element
    card.addEventListener("click", flipCard);
    // append the card element to the container element
    container.appendChild(card);
  }

  // Shuffle the container's children (cards) randomly
  shuffleContainer();
}

// Shuffle the order of container's children (cards) randomly
function shuffleContainer() {
  let container = document.getElementById("container");
  for (let i = container.children.length; i >= 0; i--) {
    container.appendChild(container.children[Math.random() * i | 0]);
  }
}

// flip a card when clicked and check for matches
function flipCard() {
  // get the symbol of the clicked card
  let symbol = this.getAttribute("data-symbol");
  // Check if the clicked card is the same as the first card clicked
  if (this === firstCard) {
    return; // Do nothing if the same card is clicked
  }
  // display the symbol on the card
  this.innerHTML = symbol;
  // add a class name to indicate that the card is flipped
  this.classList.add("flipped");
  // check if this is the first or second card flipped in a turn
  if (firstCard === null) {
    // store the first card
    firstCard = this;
  } else {
    // store the second card
    secondCard = this;
    // disable further clicks until the turn is over
    disableClicks();
    // check if the symbols of the two cards match
    if (firstCard.getAttribute("data-symbol") === secondCard.getAttribute("data-symbol")) {
      // add a class name to indicate that the cards are matched
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      // reset the first and second cards
      firstCard = null;
      secondCard = null;
      // enable clicks again
      enableClicks();
      // check if all cards are matched and the game is over
      checkGameOver();
    } else {
      // wait for one second and then flip back the cards
      setTimeout(flipBack, 1000);
    }
  }
}

// flip back the cards that are not matched
function flipBack() {
  // remove the symbol from the cards
  firstCard.innerHTML = "";
  secondCard.innerHTML = "";
  // remove the class name that indicates that the cards are flipped
  firstCard.classList.remove("flipped");
  secondCard.classList.remove("flipped");
  // reset the first and second cards
  firstCard = null;
  secondCard = null;
  // enable clicks again
  enableClicks();
}

// disable clicks on all cards
function disableClicks() {
  // get all the card elements
  let cards = document.getElementsByClassName("card");
  // loop through the card elements and remove the event listener
  for (const card of cards) {
  card.removeEventListener("click", flipCard);
}
}

// enable clicks on all cards that are not matched
function enableClicks() {
  // get all the card elements that are not matched
  let cards = document.querySelectorAll(".card:not(.matched)");
  // loop through the card elements and add the event listener
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", flipCard);
  }
}

// check if all cards are matched and display a message if so
function checkGameOver() {
  // get all the card elements that are not matched
  let cards = document.querySelectorAll(".card:not(.matched)");
  // if there are no such elements, then all cards are matched and the game is over
  if (cards.length === 0) {
    // display a message on the screen using html and css
    let message = document.createElement("div");
    message.classList.add("message");
    message.innerHTML = "You win!";
    document.body.appendChild(message);

    // Add reset button
    let resetButton = document.createElement("button");
    resetButton.id = "resetButton";
    resetButton.innerHTML = "Play Again";
    document.body.appendChild(resetButton);

    // Event listener for the reset button
    resetButton.addEventListener("click", resetGame);
  }
}

// Function to reset the game
function resetGame() {
  // Clear the entire body
  document.body.innerHTML = '';

  // Recreate the game elements
  let container = document.createElement("div");
  container.id = "container";
  document.body.appendChild(container);

  let message = document.createElement("div");
  message.classList.add("message");
  message.innerHTML = "";
  document.body.appendChild(message);

  cards = shuffle(cards);
  createGrid();
}

// initialize the game
function init() {
  cards = shuffle(cards);
  createGrid();
  firstCard = null;
  secondCard = null;
}

// call the init function when the window loads
window.onload = function () {
  createGrid();
  init(); // Call the init function as well
};