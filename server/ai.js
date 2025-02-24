const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// give context of game to ai
async function contextAI() {
    let initialPrompt = `You are an AI playing the game rock paper scissors. You will be playing 
                     against a person, and given the moves from the last round.`;
    try {
        const result = await model.generateContent(initialPrompt);
        console.log('Initial prompt sent.')
    } catch (error) {
        console.error("Error sending initial prompt:", error);
    }
}
 
async function getAIMove(playerHistory, aiHistory) {
    // prompt AI with players previous moves
    const prompt = `In the last round:
                    Player played: ${playerHistory}
                    You played: ${aiHistory}
                    You are to play as intelligently as possible, looking for patterns or
                    if they may be trying to trick you after picking only one move.
                    You should try to trick them too, trying to win no matter what.
                    You have to pick something no matter what. Look back at previous rounds
                    to pick your move. Rock beats scissors, paper beats rock, scissors
                    beats paper. You are only to respond with "rock", "paper", or "scissors".`;
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
    // prompt for AI's reason
    const prompt = `Last round, player picked ${playerHistory}, you picked ${aiHistory}. Decide
                    who won based off these moves using these rules: Rock beats scissors, paper beats rock, scissors
                    beats paper.
                    Give a short, sentence long, exclamation based off if you won the round or lost it, explaining why you 
                    won or lost. Vary your response each time, don't just say "I won" or "I lost".
                    If the player move beat yours, never say that you won, say that you lost, and why.`
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