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
    return prompt("Enter 'rock' 'paper' or 'scissors': ").toLowerCase();
}

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice) {
    console.log("Your choice: " + humanChoice + "   Computer choice: " + computerChoice);
    if(humanChoice === computerChoice){
        console.log("Tie! Replay this round!");
        humanChoice = getHumanChoice();
        computerChoice = getComputerChoice();
        playRound(humanChoice, computerChoice);
    }
    else if((humanChoice === "rock" && computerChoice === "scissors") || 
        (humanChoice === "paper" && computerChoice === "rock") || 
        (humanChoice === "scissors" && computerChoice === "paper")) {
        console.log("You won this round!");
        humanScore++;
        console.log("Score: " + humanScore + " - " + computerScore);   
    }
    else {
        console.log("Computer won this round!");
        computerScore++;
        console.log("Score: " + humanScore + " - " + computerScore);
    }

}

function playGame() {
    console.log("Welcome to Rock Paper Scissors! You'll be playing 5 rounds against the computer.");
    for(let i = 1; i <= 5; i++){
        console.log("Round " + i + "!");
        let humanSelection = getHumanChoice();
        let computerSelection = getComputerChoice();

        playRound(humanSelection, computerSelection);
    }

    if(humanScore > computerScore){
        console.log("You Win!");
    }
    else {
        console.log("Computer Wins!");
    }
}

playGame();
