require("dotenv").config(); // Load environment variables
const cors = require("cors"); // import cors
const path = require('path');
const { getAIMove } = require("./ai.js"); // import AI function

const express = require("express");
const app = express();
const port = process.env.PORT || 3000; // Set port from .env or default to 3000

app.use(cors()); // Enable CORS for frontend access
app.use(express.json()); // Middleware to parse JSON

// Serve static files (HTML, CSS, JS, etc.) from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// API endpoint to get AI move
app.post('/get-ai-move', async (req, res) => {
    const playerHistory = req.body.playerHistory;
    console.log("Received player history:", playerHistory);  // Debugging log

    if (Array.isArray(playerHistory)) {
        const aiMove = await getAIMove(playerHistory);  // Call the AI function
        console.log("AI move:", aiMove);  // Debugging log
        res.json({ aiMove });  // Send the AI's move as a response
    } else {
        console.log("Error: playerHistory is not an array.");
        res.status(400).json({ error: "playerHistory should be an array" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});