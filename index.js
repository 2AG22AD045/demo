const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());

// Chat endpoint
app.post('/chat', async(req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                    role: "system",
                    content: "You are a helpful assistant. Keep your responses concise and friendly."
                },
                {
                    role: "user",
                    content: message
                }
            ],
            temperature: 0.7,
            max_tokens: 150
        });

        const botResponse = completion.choices[0].message.content;

        res.json({ response: botResponse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});