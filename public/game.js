// make array for player history
let playerHistory = 'first round, no previous move';
let aiHistory = 'first round, no previous move';

// grab play button
const playBtn = document.querySelector(".play-btn");
// buttons div
const buttonsBox = document.getElementById("buttons-box"); // grab parent div for buttons
const buttons = buttonsBox.querySelectorAll("button"); // grab all buttons to a NodeList
// get player moves display
const moves = document.querySelector(".moves");
moves.style.visibility = "hidden";
// get result display
const result = document.querySelector(".result");
result.style.visibility = "hidden";
// get score counter
const score = document.querySelector(".score");
score.style.visibility = "hidden";

//event listener for choice buttons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        if(isPlaying && humanScore < 5 && computerScore < 5) {
            playRound(button.className);
        }
    })
})

// start game when play button clicked
playBtn.addEventListener("click", () => {
    playBtn.style.visibility = "hidden";
    playGame();
});

// initialize scores
let humanScore = 0;
let computerScore = 0;
let isPlaying = false;

function getHumanChoice() {
    let choice = "";
    // .forEach iterates through each button
    buttons.forEach((button) => {
        // for each, add an event listener
        button.addEventListener("click", () => {
            choice = button.className.toString();
        })
    })
    return choice;
}

// fetch the getAIMove from backend
async function getAIMove(playerHistory, aiHistory) {
    // POST request to backend to get AI move
    const response = await fetch('/get-ai-move', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // the request body is JSON
        },
        body: JSON.stringify({ playerHistory, aiHistory })  // send player history to the backend
    });

    const data = await response.json();  // parse the response
    return data.aiMove;  // return the AI move
}

async function playRound(humanChoice) {
    // get AI move
    let computerChoice = await getAIMove(playerHistory, aiHistory);
    // add player move to playerHistory after AI picks its move
    playerHistory = humanChoice;
    aiHistory = computerChoice;
    // print out players moves
    printMoves(humanChoice, computerChoice);
    // if round is a tie
    if(humanChoice === computerChoice){
        result.textContent = "Tie! Replay this round!"
        score.textContent = "Score: " + humanScore + " - " + computerScore;
        return;
    }
    // if human wins
    else if((humanChoice === "rock" && computerChoice === "scissors") || 
        (humanChoice === "paper" && computerChoice === "rock") || 
        (humanChoice === "scissors" && computerChoice === "paper")) {
        humanScore++;
        result.textContent = "You won this round!";
    }
    // if computer wins
    else {
        computerScore++;

        result.textContent = "You lost this round!";
    }
    // print out score
    score.textContent = "Score: " + humanScore + " - " + computerScore;
    //check if game over
    if(humanScore === 5 || computerScore === 5){
        endGame();
    }
}

//plays game until player or computer reaches 5 points
function playGame(){
    humanScore = 0;
    computerScore = 0;
    isPlaying = true;
    //reset text for new round
    moves.textContent = "";
    result.textContent = "Pick your option!";
    score.textContent = "Score: 0 - 0";
    //make text visible
    moves.style.visibility = "visible";
    result.style.visibility = "visible";
    score.style.visibility = "visible";
}

function printMoves(humanChoice, computerChoice){
    let human = "";
    let computer = "";
    // find corresponding emoji to humanChoice
    if(humanChoice === "rock") human = "🪨";
    else if(humanChoice === "paper") human = "📃";
    else if(humanChoice === "scissors") human = "✂️";
    // find corresponding emoji to computerChoice
    if(computerChoice === "rock") computer = "🪨";
    else if(computerChoice === "paper") computer = "📃";
    else if(computerChoice === "scissors") computer = "✂️";
    //update moves text
    moves.textContent = human + " - " + computer;
}

function endGame(){
    // stop game
    isPlaying = false;
    // hide moves
    moves.style.visibility = "hidden";
    // determine winner, and change results text
    if (humanScore > computerScore) {
        result.textContent = "🎉 You win! 🎉";
    } else {
        result.textContent = "🤖 AI Wins! 💻" ;
    }
    playBtn.textContent = "Play Again!";
    playBtn.style.visibility = "visible";
}