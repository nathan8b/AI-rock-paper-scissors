const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// give context of game to ai
async function contextAI() {
    let initialPrompt = `You are an AI playing the game rock paper scissors. You will be playing 
                     against a person, and you will be given the history of the moves they 
                     have played. You are to take these previous moves, and try to pick the 
                     best option(rock, paper, or scissors) that will give you the greatest 
                     chance of winning. You are only to respond with "rock", "paper", "scissors".
                     Read and understand this context, but don't respond, you will respond with
                     your move after the next prompt.`;
    try {
        const result = await model.generateContent(initialPrompt);
        console.log('Initial prompt sent.')
    } catch (error) {
        console.error("Error sending initial prompt:", error);
    }
}
 
async function getAIMove(playerHistory) {
    // convert history array into string for the prompt
    let playerMoves = playerHistory.join(', ');
    // if array empty (game just started), change playerMoves to let gemini know
    if(playerMoves.length === 0){
        playerMoves = 'No moves yet. Pick any move you want.'
    }
    // prompt AI with players previous moves
    const prompt = `Players previous moves: ${playerMoves}.`;
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

contextAI();

module.exports = { getAIMove };