require("dotenv").config(); // Load environment variables
const cors = require("cors"); 
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Explain how AI works";

// Define an async function to handle the API request
async function generateAIResponse() {
    try {
        // Call the generateContent method with the prompt
        const result = await model.generateContent(prompt);
        
        // Output the result
        console.log(result.response.text());
    } catch (error) {
        console.error("Error generating AI response:", error);
    }
}

const express = require("express");
const app = express();
const port = process.env.PORT || 3000; // Set port from .env or default to 3000

app.use(cors()); // Enable CORS for frontend access
app.use(express.json()); // Middleware to parse JSON

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

generateAIResponse();