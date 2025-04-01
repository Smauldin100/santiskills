import OpenAI from 'openai';

// Use environment variable for the API key
// Set this in your .env file: REACT_APP_OPENAI_API_KEY=your-api-key-here
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY || 'your-api-key-here';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for demo purposes
});

/**
 * Get a response from OpenAI API
 * @param {string} userInput - The user's message
 * @param {Array} messageHistory - Previous messages in the conversation
 * @returns {Promise<string>} - The AI-generated response
 */
export const getAIResponse = async (userInput, messageHistory) => {
  try {
    // Check if API key is set
    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your-api-key-here') {
      throw new Error('OpenAI API key is not configured');
    }
    
    // Format conversation history for the API
    const formattedMessages = formatConversationHistory(messageHistory);
    
    // Add system message to guide the AI's behavior
    const messages = [
      {
        role: 'system',
        content: 'You are Santiago\'s personal AI assistant. You represent Santiago Mauldin, a skilled software engineer. Answer questions about Santiago\'s skills, projects, experience, and education based on the conversation context. For other questions, provide helpful and informative responses. Keep answers concise and professional.'
      },
      ...formattedMessages,
      { role: 'user', content: userInput }
    ];

    // Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // You can use 'gpt-4' for higher quality responses if you have access
      messages: messages,
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Return the AI's response text
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to get response from AI service');
  }
};

/**
 * Format conversation history for OpenAI API
 * @param {Array} messageHistory - Previous messages in the conversation
 * @returns {Array} - Formatted messages for the API
 */
const formatConversationHistory = (messageHistory) => {
  // Only include the last 10 messages to avoid token limits
  const recentMessages = messageHistory.slice(-10);
  
  return recentMessages.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'assistant',
    content: msg.text
  }));
};

export default {
  getAIResponse
}; 