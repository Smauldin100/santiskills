import React, { useState, useRef, useEffect } from 'react';
import { personalInfo, skillsData, projectsData, experienceData } from '../data/personalData';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: `Hi there! I'm Santi's virtual assistant. How can I help you today?`, 
      sender: 'bot'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };
  
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputText.trim() !== '') {
      handleSendMessage();
    }
  };
  
  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    const newMessages = [
      ...messages,
      { text: inputText, sender: 'user' }
    ];
    
    setMessages(newMessages);
    setInputText('');
    
    // Generate bot response after a short delay
    setTimeout(() => {
      const botResponse = generateResponse(inputText);
      setMessages([...newMessages, { text: botResponse, sender: 'bot' }]);
    }, 600);
  };
  
  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Check for greetings
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return `Hello! I'm here to tell you about ${personalInfo.name}. What would you like to know?`;
    }
    
    // Check for questions about skills
    if (input.includes('skill') || input.includes('know') || input.includes('good at')) {
      const topSkills = skillsData
        .sort((a, b) => b.level - a.level)
        .slice(0, 3)
        .map(skill => `${skill.name} (${skill.level}%)`);
      
      return `${personalInfo.name} is skilled in many areas. Top skills include: ${topSkills.join(', ')}. What else would you like to know?`;
    }
    
    // Check for questions about projects
    if (input.includes('project') || input.includes('portfolio') || input.includes('work')) {
      const completedProjects = projectsData
        .filter(project => project.completion === 100)
        .map(project => project.name);
      
      return `${personalInfo.name} has completed these projects: ${completedProjects.join(', ')}. Ask about a specific project for more details!`;
    }
    
    // Check for questions about experience
    if (input.includes('experience') || input.includes('job') || input.includes('work')) {
      const currentJob = experienceData[0];
      return `${personalInfo.name} currently works as a ${currentJob.position} at ${currentJob.company}. Would you like to know more about their experience?`;
    }
    
    // Check for questions about contact info
    if (input.includes('contact') || input.includes('email') || input.includes('phone')) {
      return `You can contact ${personalInfo.name} at ${personalInfo.email} or ${personalInfo.phone}.`;
    }
    
    // Check for questions about education
    if (input.includes('education') || input.includes('degree') || input.includes('study')) {
      return `${personalInfo.name} studied at Georgia Tech and earned a M.S. in Computer Science. They also hold a B.S. in Computer Science from University of Georgia.`;
    }
    
    // Check for thank you
    if (input.includes('thank') || input.includes('thanks')) {
      return "You're welcome! Anything else you'd like to know?";
    }
    
    // Check for bye
    if (input.includes('bye') || input.includes('goodbye')) {
      return "Goodbye! Feel free to chat again if you have more questions.";
    }
    
    // Default response
    return "I'm not sure about that. Would you like to know about Santiago's skills, projects, or experience?";
  };
  
  return (
    <div className="chatbot-container">
      <div className={`chatbot-icon ${isOpen ? 'active' : ''}`} onClick={toggleChatbot}>
        <div className="chatbot-icon-text">
          {isOpen ? 'X' : '?'}
        </div>
      </div>
      
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-title">Chat with Santi Assistant</div>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`chatbot-message ${message.sender === 'bot' ? 'bot' : 'user'}`}
              >
                {message.sender === 'bot' && (
                  <div className="bot-avatar">S</div>
                )}
                <div className="message-text">{message.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-input">
            <input 
              type="text" 
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
            />
            <button onClick={handleSendMessage}>
              <span className="send-icon">→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot; 