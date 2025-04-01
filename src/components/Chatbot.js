import React, { useState, useRef, useEffect } from 'react';
import { personalInfo, skillsData, projectsData, experienceData } from '../data/personalData';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: `Hi there! I'm Santi's AI assistant. Ask me anything about Santiago or any other topic!`, 
      sender: 'bot'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
  
  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    const newMessages = [
      ...messages,
      { text: inputText, sender: 'user' }
    ];
    
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);
    
    // Check for local responses first
    const localResponse = generateLocalResponse(inputText);
    
    if (localResponse) {
      // Use local response
      setTimeout(() => {
        setMessages([...newMessages, { text: localResponse, sender: 'bot' }]);
        setIsLoading(false);
      }, 600);
    } else {
      try {
        // Call external AI API for response
        const aiResponse = await fetchAIResponse(inputText, newMessages);
        setMessages([...newMessages, { text: aiResponse, sender: 'bot' }]);
      } catch (error) {
        console.error('Error fetching AI response:', error);
        setMessages([
          ...newMessages, 
          { 
            text: "I'm having trouble connecting to my knowledge base. Let me answer with what I know: " + generateFallbackResponse(inputText), 
            sender: 'bot' 
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  // Function to fetch AI response from an API
  const fetchAIResponse = async (userInput, messageHistory) => {
    // This function would typically make an API call to OpenAI or similar service
    // For now, we'll simulate a response based on the input
    
    // In a real implementation, you would:
    // 1. Format the message history and current question
    // 2. Send to OpenAI API
    // 3. Return the AI-generated response
    
    // Simulating API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const simulatedResponses = {
          'future': "I see great potential in your future projects. Based on your skills in React, Node.js and other technologies, you could excel in building more complex applications or exploring AI-powered applications.",
          'advice': "My advice for advancing your career would be to continue building projects that showcase your skills, contribute to open source, and stay updated with the latest in web development and cloud technologies.",
          'learn': "If you're looking to expand your skill set, I'd recommend exploring more about cloud architecture, serverless applications, or diving deeper into AI and machine learning integrations for web applications.",
          'opinion': "In my opinion, your portfolio demonstrates strong frontend and backend capabilities. Your projects show good understanding of modern web development practices.",
          'tools': "Some tools that could enhance your workflow include: GitHub Copilot for AI-assisted coding, Vercel for simplified deployments, and Cypress for end-to-end testing of your applications."
        };
        
        // Check if input contains any keywords from simulated responses
        const input = userInput.toLowerCase();
        for (const [keyword, response] of Object.entries(simulatedResponses)) {
          if (input.includes(keyword)) {
            return resolve(response);
          }
        }
        
        // Default simulated AI response
        resolve(`Based on my analysis of your skills and projects, I would suggest focusing on ${getRandomSkillToImprove()}. This could complement your existing expertise and open up new opportunities in software development.`);
      }, 1500); // Simulating API delay
    });
  };
  
  // Helper function to get a random skill to improve (for simulated AI responses)
  const getRandomSkillToImprove = () => {
    const skillsToImprove = [
      "cloud architecture with AWS or Azure",
      "mobile development with React Native",
      "modern state management with Redux Toolkit or Zustand",
      "GraphQL for API development",
      "TypeScript to enhance code quality",
      "CI/CD pipelines for automated testing and deployment",
      "containerization with Docker and Kubernetes"
    ];
    return skillsToImprove[Math.floor(Math.random() * skillsToImprove.length)];
  };
  
  // Generate local response for common or personal questions
  const generateLocalResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Check for greetings
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return `Hello! I'm here to tell you about ${personalInfo.name} or answer any other questions you might have. What would you like to know?`;
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
    if ((input.includes('project') || input.includes('portfolio')) && !input.includes('future')) {
      const completedProjects = projectsData
        .filter(project => project.completion === 100)
        .map(project => project.name);
      
      return `${personalInfo.name} has completed these projects: ${completedProjects.join(', ')}. Ask about a specific project for more details!`;
    }
    
    // Check for questions about experience
    if ((input.includes('experience') || input.includes('job')) && !input.includes('advice')) {
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
    
    // Return null if no local response is found
    return null;
  };
  
  // Fallback response if AI call fails
  const generateFallbackResponse = (userInput) => {
    return "I can tell you about Santiago's skills, projects, experience, education, or provide contact information. For more complex questions, try again later when my AI capabilities are fully operational.";
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
            <div className="chatbot-title">Chat with Santi AI</div>
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
            {isLoading && (
              <div className="chatbot-message bot">
                <div className="bot-avatar">S</div>
                <div className="message-text typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-input">
            <input 
              type="text" 
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              disabled={isLoading}
            />
            <button onClick={handleSendMessage} disabled={isLoading || inputText.trim() === ''}>
              <span className="send-icon">→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot; 