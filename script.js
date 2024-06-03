// Define an array of cards with different symbols
let cards = ["🐶", "🐱", "🐭", "🐹", "🐰", "🐶", "🐱", "🐭", "🐹", "🐰"];

let firstCard = null;
let secondCard = null;

// Shuffle the cards using the Fisher-Yates algorithm
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle
  while (0 !== currentIndex) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Create a grid of cards using HTML and CSS
function createGrid() {
  // Get the container element
  let container = document.getElementById("container");

  // Clear the container
  container.innerHTML = "";

  // Shuffle the cards array
  cards = shuffle(cards);

  // Loop through the shuffled cards array
  for (let i = 0; i < cards.length; i++) {
    // Create a card element
    let card = document.createElement("div");
    // Add a class name to the card element
    card.classList.add("card");
    // Set the data attribute of the card element to the symbol of the card
    card.setAttribute("data-symbol", cards[i]);
    // Add an event listener to the card element
    card.addEventListener("click", flipCard);
    // Append the card element to the container element
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

// Flip a card when clicked and check for matches
function flipCard() {
  // Get the symbol of the clicked card
  let symbol = this.getAttribute("data-symbol");
  // Check if the clicked card is the same as the first card clicked
  if (this === firstCard) {
    return; // Do nothing if the same card is clicked
  }
  // Display the symbol on the card
  this.innerHTML = symbol;
  // Add a class name to indicate that the card is flipped
  this.classList.add("flipped");
  // Check if this is the first or second card flipped in a turn
  if (firstCard === null) {
    // Store the first card
    firstCard = this;
  } else {
    // Store the second card
    secondCard = this;
    // Disable further clicks until the turn is over
    disableClicks();
    // Check if the symbols of the two cards match
    if (firstCard.getAttribute("data-symbol") === secondCard.getAttribute("data-symbol")) {
      // Add a class name to indicate that the cards are matched
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      // Reset the first and second cards
      firstCard = null;
      secondCard = null;
      // Enable clicks again
      enableClicks();
      // Check if all cards are matched and the game is over
      checkGameOver();
    } else {
      // Wait for one second and then flip back the cards
      setTimeout(flipBack, 1000);
    }
  }
}

// Flip back the cards that are not matched
function flipBack() {
  // Remove the symbol from the cards
  firstCard.innerHTML = "";
  secondCard.innerHTML = "";
  // Remove the class name that indicates that the cards are flipped
  firstCard.classList.remove("flipped");
  secondCard.classList.remove("flipped");
  // Reset the first and second cards
  firstCard = null;
  secondCard = null;
  // Enable clicks again
  enableClicks();
}

// Disable clicks on all cards
function disableClicks() {
  // Get all the card elements
  let cards = document.getElementsByClassName("card");
  // Loop through the card elements and remove the event listener
  for (const card of cards) {
    card.removeEventListener("click", flipCard);
  }
}

// Enable clicks on all cards that are not matched
function enableClicks() {
  // Get all the card elements that are not matched
  let cards = document.querySelectorAll(".card:not(.matched)");
  // Loop through the card elements and add the event listener
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", flipCard);
  }
}

// Check if all cards are matched and display a message if so
function checkGameOver() {
  // Get all the card elements that are not matched
  let cards = document.querySelectorAll(".card:not(.matched)");
  // If there are no such elements, then all cards are matched and the game is over
  if (cards.length === 0) {
    // Display a message on the screen using HTML and CSS
    let message = document.getElementById("message");
    message.innerHTML = "You win!";

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
  // Select the container and message elements and clear their content
  let container = document.getElementById("container");
  container.innerHTML = '';

  let message = document.getElementById("message");
  message.innerHTML = '';

  // Remove the reset button if it exists
  let resetButton = document.getElementById("resetButton");
  if (resetButton) {
    resetButton.remove();
  }

  // Recreate the game elements within the container
  cards = shuffle(cards);
  createGrid();
}

// Initialize the game
function init() {
  cards = shuffle(cards);
  createGrid();
  firstCard = null;
  secondCard = null;
}

// Call the init function when the window loads
window.onload = function () {
  createGrid();
  init(); // Call the init function as well
};