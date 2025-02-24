require("dotenv").config(); // load environment variables
const cors = require("cors"); // import cors
const path = require('path');
const { getAIMove, getAIReason } = require("./ai.js"); // import AI functions

const express = require("express");
const app = express();
const port = process.env.PORT || 3000; // set port from .env or default to 3000

app.use(cors()); // enable CORS for frontend access
app.use(express.json()); // middleware to parse JSON

// serve frontend files in public directory
app.use(express.static(path.join(__dirname, '../public')));

// API endpoint to get AI move
app.post('/get-ai-move', async (req, res) => {
    const playerHistory = req.body.playerHistory;
    const aiHistory = req.body.aiHistory;
    console.log("Received player history:", playerHistory);  // debugging
    console.log('Received AI history:', aiHistory); //debugging

    const aiMove = await getAIMove(playerHistory, aiHistory);  // call the function
    console.log("AI move:", aiMove);  // debugging
    res.json({ aiMove });  // send the AI's move as a response
});

// API endpoint to get AI reason
app.post('/get-ai-reason', async (req, res) => {
    const playerHistory = req.body.playerHistory;
    const aiHistory = req.body.aiHistory;

    const aiReason = await getAIReason(playerHistory, aiHistory); // call the function
    console.log("AI response:", aiReason); // debugging
    res.json({ aiReason }); // send AI reason as response
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});