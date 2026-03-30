let randomNumber = parseInt(Math.random() * 100 + 1);
// console.log(randomNumber)
const form = document.querySelector(".form");
const userInput = document.querySelector("#guessField");
const submit = document.querySelector("#subt");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrhigh = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");
const p = document.createElement("p");
let prevGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        ValidateGuess(guess);
    });
}

function ValidateGuess(guess) {
    if (isNaN(guess)) {
        alert("please enter a valid number.");
    } else if (guess < 1) {
        alert("enter a number more than one.");
    } else if (guess > 100) {
        alert("enter a number less than 100.");
    } else {
        prevGuess.push(guess);
        if (numGuess === 10) {
            displayGuess(guess);
            displayMessage(`Game over!.Random number was ${randomNumber}`);
            endGame();
        } else {
            displayGuess(guess);
            CheckGuess(guess);
        }
    }
}
function CheckGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`You guess it right!.`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage(`Number is low.`);
    } else if (guess > randomNumber) {
        displayMessage(`Number is high`);
    }
}
function displayGuess(guess) {
    userInput.value = "";
    guessSlot.innerHTML += `${guess} `;
    
    remaining.innerHTML = `${10 - numGuess}`;
    numGuess++;
}
function displayMessage(message) {
    lowOrhigh.innerHTML = `${message}`;
}

function endGame() {
    userInput.value = "";
    submit.setAttribute("disabled", "");
    p.classList.add("button");
    p.innerHTML = `<h2 id = 'newGame'> Start a new Game</h2>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}
function newGame() {
    const newGamebutton = document.querySelector(".button");
    newGamebutton.addEventListener("click", (e) => {
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = "";
        let guessesLeft = 10 - (numGuess - 1);
        remaining.innerHTML = guessesLeft >= 0 ? guessesLeft : 0;
        submit.removeAttribute("disabled");
        startOver.removeChild(p);
        lowOrhigh.innerHTML = "";
        playGame = true;
    });
}
