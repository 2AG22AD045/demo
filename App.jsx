import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiSend, FiMoon, FiSun } from 'react-icons/fi';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Load chat history from localStorage
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    // Check system preference for dark mode
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Save messages to localStorage
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setIsLoading(true);

    try {
      const response = await axios.post('/api/chat', { message: userMessage });
      setMessages(prev => [...prev, { text: response.data.response, sender: 'bot' }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        text: 'Sorry, I encountered an error. Please try again.', 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="chat-container">
      <div className="sidebar p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Chat History</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </div>
        <div className="space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                msg.sender === 'user' ? 'bg-primary-100 dark:bg-primary-900' : ''
              }`}
            >
              {msg.text.substring(0, 30)}...
            </div>
          ))}
        </div>
      </div>

      <div className="chat-window">
        <div className="message-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="message bot-message">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="input-container">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="input-field"
            />
            <button type="submit" className="send-button">
              <FiSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App; 