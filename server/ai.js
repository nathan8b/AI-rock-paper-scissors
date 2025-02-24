const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });

// give context of game to ai
async function contextAI() {
    let initialPrompt = `You are an AI playing the game rock paper scissors. You will be playing 
                     against a person, and given the previous moves. Based on the previous
                     moves, you are to do whatever you can to pick the winning move for the next
                     round. Trick the player, recognize patterns, assume the player is also
                     trying to trick you.`;
    try {
        const result = await model.generateContent(initialPrompt);
        console.log('Initial prompt sent.')
    } catch (error) {
        console.error("Error sending initial prompt:", error);
    }
}
 
async function getAIMove(playerHistory, aiHistory) {
    let playerMoves = '';
    let aiMoves = '';
    // convert arrays to strings, checking if empty
    if(playerHistory.length === 0){
        playerMoves = 'no previous moves, you are to pick random move.'
    }
    else {
        playerMoves = playerHistory.join(', ');
        aiMoves = aiHistory.join(', ');
    }
    // prompt AI with players previous moves
    const prompt = `In the last rounds:
                    Player played: ${playerMoves}
                    You played: ${aiMoves}
                    Try to predict the players next move.
                    Pick your move, remember, rock beats scissors, paper beats rock, scissors beats paper.
                    Only respond with "rock", "paper", or "scissors", never ever try to explain your reasoning`;
    // get AI response
    try {
        const result = await model.generateContent(prompt);
        // make sure AI response is in correct format
        const aiMove = result.response.text().trim().toLowerCase();

        // make sure AI move is "rock", "paper", or "scissors"
        if (["rock", "paper", "scissors"].includes(aiMove)) {
            return aiMove;
        } else {
            console.error("AI response is invalid:", aiMove);
            return "rock"; // default response is rock
        }
    } catch (error) {
        console.error("Error generating AI response:", error);
        return "rock"; // default response is rock
    }
}

async function getAIReason(playerHistory, aiHistory) {
    const playerMove = playerHistory[playerHistory.length - 1];
    const aiMove = aiHistory[aiHistory.length - 1];
    console.log('player:', playerMove);
    console.log('ai:', aiMove);
    // prompt for AI's reason
    const prompt = `You are playing rock paper scissors. You picked ${aiMove}, and your
                    opponent picked ${playerMove}. Based on the rules, determine
                    who won, and give a short exclamation based on who won the round.
                    If you lost, be disappointed. If you won, be excited. Trash talk either way.
                    Refer to the other player as 'you'.
                    Do not give your reasoning, just your exclamation.`;
    // get AI response
    try {
        const result = await model.generateContent(prompt);
        // get text from AI
        const aiReason = result.response.text();
        return aiReason;
    } catch (error) {
        console.error("Error generating AI response:", error);
    }
}

contextAI();

module.exports = { getAIMove, getAIReason };