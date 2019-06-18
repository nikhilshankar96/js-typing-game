//Listening for the game to load
window.addEventListener("load", init);

//Levels of typing
const levels = {
	noob: 50,
	intermediate: 30,
	pro: 10
};

//Level changing
const currentLevel = levels.intermediate;

//Global Variables
let time = currentLevel; //time per word

let score = 0; //current score

let isPlaying; //boolean for state

//Grabbing DOM elements
const wordInput = document.querySelector("#wordInput");

const currentWord = document.querySelector("#currentWord");

const scoreDisplay = document.querySelector("#scoreDisplay");

const timeDisplay = document.querySelector("#timeDisplay");

const message = document.querySelector("#message");

const seconds = document.querySelector("#seconds");

const instructions = document.querySelector("#instructions");

//Array of words, later will probably be replaced or appeneded by some api to fetch more words
const words = [
	"hat",
	"river",
	"lucky",
	"statue",
	"generate",
	"stubborn",
	"cocktail",
	"runaway",
	"joke",
	"developer",
	"establishment",
	"hero",
	"javascript",
	"nutrition",
	"revolver",
	"echo",
	"siblings",
	"investigate",
	"horrendous",
	"symptom",
	"laughter",
	"magic",
	"master",
	"space",
	"definition"
];

//Initialize the game
function init() {
	//Load word from array
	showWord(words);

	//Start matching on input
	wordInput.addEventListener("input", startMatch);

	//Call countdown every sec
	setInterval(countdown, 100);

	//Check game state every 50 millisecs
	setInterval(checkState, 50);

	//logging initialization
	console.log("inintialized");

	timeDisplay.innerHTML = currentLevel;
	seconds.innerHTML = Math.floor(currentLevel / 10);
}

//displays a random word from the word array
function showWord(words) {
	currentWord.innerHTML = words[Math.floor(Math.random() * words.length)];
}

//function to manage countdown and timeDisplay and game over
function countdown() {
	//Check if time is remaining
	if (time > 0) {
		//reduce time every second
		time = time - 1;
	} else if (time == 0) {
		//time 0 means game over
		isPlaying = false; //changing game state to over
	}

	//Show time
	timeDisplay.innerHTML = (time / 10).toFixed(2);
}

//Check game state every 50 msecs
function checkState() {
	if (!isPlaying && time === 0) {
		message.innerHTML = "Game Over :( ";
		score = -1;
		scoreDisplay.innerHTML = 0;
		instructions.style.display = "block";
	}
}

//Start matching every letter to given word
function startMatch() {
	if (matchWord()) {
		console.log("completed: " + currentWord.innerHTML + " !"); //logging a completed word

		//for next word
		isPlaying = true;
		timeDisplay.innerHTML = Math.floor(currentLevel / 10).toFixed(1);
		time = currentLevel;

		showWord(words);
		wordInput.value = "";
		score++;
		instructions.style.display = "none";
	}

	if (score < 0) scoreDisplay.innerHTML = 0;
	else scoreDisplay.innerHTML = score;
}

//matchWord function checks if the user has finished typing the correct input
function matchWord() {
	if (wordInput.value === currentWord.innerHTML) {
		message.innerHTML = "Typed in " + (currentLevel - time) / 10 + " secs!";
		return true;
	} else {
		if (isPlaying) message.innerHTML = "";
		return false;
	}
}
//exp
