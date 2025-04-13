# ChatBot Web Application

A modern, responsive chatbot web application built with React.js, Node.js, and OpenAI's GPT API.

## Features

- Clean and modern chat UI with Tailwind CSS
- Real-time messaging
- Dark/Light theme toggle
- Local storage for chat history
- Responsive design for mobile and desktop
- OpenAI GPT integration

## Project Structure

```
chatboat/
├── client/          # React frontend
├── server/          # Node.js backend
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenAI API key

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. Create a `.env` file in the server directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server (in a new terminal)
   cd client
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

### Frontend (client)
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run linter

### Backend (server)
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `OPENAI_API_KEY` - Your OpenAI API key
- `NODE_ENV` - Environment (development/production)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 