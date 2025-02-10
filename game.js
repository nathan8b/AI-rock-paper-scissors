function getComputerChoice() {
    let num = Math.floor(Math.random() * 3) + 1;

    if(num === 1){
        return "rock";
    }
    else if(num === 2){
        return "paper";
    }
    else if(num === 3){
        return "scissors";
    }
}

function getHumanChoice() {
    let choice = "";
    // .forEach iterates through each button
    buttons.forEach((button) => {
        // for each, add an event listener
        button.addEventListener("click", () => {
            console.log(button.className.toString());
            choice = button.className.toString();
        })
    })
    return choice;
}

function playRound(humanChoice, computerChoice) {
    // print out players moves
    moves.textContent = humanChoice + " vs " + computerChoice;
    console.log("Your choice: " + humanChoice + "   Computer choice: " + computerChoice);
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
}

//plays game until player or computer reaches 5 points
function playGame(){
    humanScore = 0;
    computerScore = 0;

    moves.style.visibility = "visible";
    result.style.visibility = "visible";
    score.style.visibility = "visible";
    
    
    // start next round by clicking an option
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            if(humanScore < 5 && computerScore < 5) {
                playRound(button.className, getComputerChoice());
            }
            else {
                endGame();
            }
        })
    })
}

function endGame(){
    if (humanScore > computerScore) {
        console.log("🎉 You Win the Game!");
    } else {
        console.log("💻 Computer Wins the Game!");
    }
}

// grab play button
const playBtn = document.querySelector(".play-btn");

// buttons div
const buttonsBox = document.getElementById("buttons-box"); // grab parent div for buttons
const buttons = buttonsBox.querySelectorAll("button"); // grab all buttons to a NodeList

//results div
const results = document.querySelector("#results"); // grab result box

// get player moves display
const moves = document.querySelector(".moves");
moves.style.visibility = "hidden";

// get result display
const result = document.querySelector(".result");
result.style.visibility = "hidden";

// get score counter
const score = document.querySelector(".score");
score.style.visibility = "hidden";

// initialize scores
let humanScore = 0;
let computerScore = 0;

// start game when play button clicked
playBtn.addEventListener("click", () => {
    playBtn.remove();
    playGame();
});
