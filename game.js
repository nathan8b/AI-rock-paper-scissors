function getComputerChoice() {
    let num = Math.floor(Math.random() * 3) + 1;

    if(num === 1){
        return "rock";
    }
    else if(num === 2){
        return "paper";
    }
    else if(num === 3){
        return "scissors"
    }
}

function getHumanChoice() {
    return prompt("Enter 'rock' 'paper' or 'scissors': ");
}

let humanScore = 0;
let computerScore = 0;

