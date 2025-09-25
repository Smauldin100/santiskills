import OpenAI from 'openai';

const OPENAI_API_KEY =
  process.env.REACT_APP_OPENAI_API_KEY ||
  process.env.OPENAI_API_KEY ||
  '';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const getAIResponse = async (userInput, messageHistory) => {
  try {
    if (!OPENAI_API_KEY || OPENAI_API_KEY.trim().length < 20) {
      throw new Error(
        'OpenAI API key is not configured. Add REACT_APP_OPENAI_API_KEY to your .env and restart the dev server.'
      );
    }

    const formattedMessages = formatConversationHistory(messageHistory);

    const messages = [
      {
        role: 'system',
        content:
          "You are Santiago's personal AI assistant. You represent Santiago Mauldin, a skilled software engineer. Answer questions about Santiago's skills, projects, experience, and education based on the conversation context. For other questions, provide helpful and informative responses. Keep answers concise and professional.",
      },
      ...formattedMessages,
      { role: 'user', content: userInput },
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error instanceof Error ? error : new Error('Failed to get response from AI service');
  }
};

const formatConversationHistory = (messageHistory = []) => {
  return (messageHistory || [])
    .slice(-10)
    .map((msg) => {
      if (!msg) return null;
      const text =
        typeof msg.text === 'string'
          ? msg.text
          : typeof msg.content === 'string'
          ? msg.content
          : '';
      if (!text.trim()) return null;
      const rawSender = (msg.sender || msg.role || '').toLowerCase();
      if (rawSender === 'system') return null;
      const sender = rawSender === 'bot' ? 'assistant' : rawSender;
      const role = sender === 'user' ? 'user' : 'assistant';
      return { role, content: text };
    })
    .filter(Boolean);
};

const openaiService = {
  getAIResponse,
};

export default openaiService;
