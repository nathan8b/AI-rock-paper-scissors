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
    results.appendChild(moves);
    console.log("Your choice: " + humanChoice + "   Computer choice: " + computerChoice);
    // if round is a tie
    if(humanChoice === computerChoice){
        console.log("Tie! Replay this round!");
        return;
    }
    // if human wins
    else if((humanChoice === "rock" && computerChoice === "scissors") || 
        (humanChoice === "paper" && computerChoice === "rock") || 
        (humanChoice === "scissors" && computerChoice === "paper")) {
        console.log("You won this round!");
        humanScore++;
        console.log("Score: " + humanScore + " - " + computerScore); 
    }
    // if computer wins
    else {
        console.log("Computer won this round!");
        computerScore++;
        console.log("Score: " + humanScore + " - " + computerScore);
    }
    // print out score
    score.textContent = "Score: " + humanScore + " - " + computerScore;
    results.appendChild(score);
}

//plays game until player or computer reaches 5 points
function playGame(){
    humanScore = 0;
    computerScore = 0;
    
    // start next round by clicking an option
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            if(humanScore < 5 && computerScore < 5) {
                playRound(button.className, getComputerChoice());
            }
            else {
                if (humanScore > computerScore) {
                    console.log("🎉 You Win the Game!");
                } else {
                    console.log("💻 Computer Wins the Game!");
                }
            }
        })
    })
}

// grab play button
const playBtn = document.querySelector(".play-btn");

// buttons div
const buttonsBox = document.getElementById("buttons-box"); // grab parent div for buttons
const buttons = buttonsBox.querySelectorAll("button"); // grab all buttons to a NodeList

//results div
const results = document.querySelector("#result"); // grab result box

// create score counter
const score = document.createElement("p");
score.classList.add("score-counter");

// create player move display
const moves = document.createElement("p");
moves.classList.add("moves-display");

let humanScore = 0;
let computerScore = 0;

playBtn.addEventListener("click", () => {
    playBtn.remove();
    playGame();
});
