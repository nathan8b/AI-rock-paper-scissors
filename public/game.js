// make array for player history
let playerHistory = [];
let aiHistory = [];

// grab play button
const playBtn = document.querySelector(".play-btn");
// buttons div
const buttonsBox = document.getElementById("buttons-box"); // grab parent div for buttons
buttonsBox.style.visibility = "hidden";
const buttons = buttonsBox.querySelectorAll("button"); // grab all buttons to a NodeList
// get player moves display
const moves = document.querySelector(".moves");
moves.style.visibility = "hidden";
// get result display
const result = document.querySelector(".result");
// get score counter
const score = document.querySelector(".score");
score.style.visibility = "hidden";
// get ai text output box
const textBox = document.querySelector(".text-box");
textBox.style.visibility = "hidden";

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
        body: JSON.stringify({ playerHistory, aiHistory }),  // send player and ai history to the backend
    });

    const data = await response.json();  // parse the response
    return data.aiMove;  // return the AI move
}

// fetch the getAIReason from backend
async function getAIReason(playerHistory, aiHistory) {
    // POST request to backend to get AI reason
    const response = await fetch('/get-ai-reason', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playerHistory, aiHistory }), // send player and ai history to backend
    });

    const data = await response.json(); // parse the response
    return data.aiReason; // return ai reason
}

async function playRound(humanChoice) {
    // get AI move
    let computerChoice = await getAIMove(playerHistory, aiHistory);
    // print out players moves
    printMoves(humanChoice, computerChoice);
    // if round is a tie
    if(humanChoice === computerChoice){
        result.textContent = "Tie! Replay this round!"
        score.textContent = "Score: " + humanScore + " - " + computerScore;
        // add ai and player move to history arrays, checking if they're too long first
        if(playerHistory.length > 5){
            playerHistory.shift(); // remove oldest move
            aiHistory.shift(); // remove oldest move
        }
        playerHistory.push(humanChoice);
        aiHistory.push(computerChoice);
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
    // add ai and player move to history arrays, checking if they're too long first
    if(playerHistory.length > 5){
        playerHistory.shift(); // remove oldest move
        aiHistory.shift(); // remove oldest move
    }
    playerHistory.push(humanChoice);
    aiHistory.push(computerChoice);

    // call getAIReason function to get AI's reasoning, then put into text box
    const aiAnswer = await getAIReason(playerHistory, aiHistory); // get ai response

    let text = document.createElement("p"); // create p element
    text.textContent = `AI: ${aiAnswer}`; // change text
    text.style.display = "block"; // display as block
    
    textBox.appendChild(text); // append text node inside text box

    // change previous messages to darker color
    const previousText = text.previousElementSibling;
    if(previousText) {
        previousText.style.color = "rgb(165, 165, 165)";
    }

    textBox.scrollTop = textBox.scrollHeight; // auto scrolls to bottom of box when element is added
}

//plays game until player or computer reaches 5 points
function playGame(){
    // reset visibility
    buttonsBox.style.visibility = "visible";
    textBox.style.visibility = "visible";
    // reset score 
    humanScore = 0;
    computerScore = 0;
    isPlaying = true;
    // reset text for new round
    moves.textContent = "";
    result.textContent = "Pick your option!";
    score.textContent = "Score: 0 - 0";
    // make text visible
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
    buttonsBox.style.visibility = "hidden";
    // stop game
    isPlaying = false;
    // determine winner, and change results text
    if (humanScore > computerScore) {
        result.textContent = "🎉 You win! 🎉";
    } else {
        result.textContent = "🤖 AI Wins! 💻" ;
    }
    playBtn.textContent = "Play Again!";
    playBtn.style.visibility = "visible";
    playBtn.style.top = "82%";
}