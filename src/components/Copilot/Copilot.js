import React, { useEffect, useRef, useState } from 'react';
import './Copilot.css';
import { getAIResponse } from '../../utils/openaiService';

const GREETING_MESSAGE = "Hi there! I'm your AI copilot. Ask me anything about your finances, productivity, or anything else you're working on.";

const makeId = (role) => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${role}-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
};

const createMessage = (role, text) => ({
  id: makeId(role),
  role,
  text,
  ts: Date.now(),
});

function usePersistentState(key, initialValue) {
  const getInitialValue = () => {
    if (typeof window === 'undefined') {
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
    try {
      const stored = window.localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (key === 'copilot:messages' && Array.isArray(parsed)) {
          return parsed
            .filter(item => item && typeof item.text === 'string')
            .map(item => ({
              id: item.id || makeId(item.role || item.sender || 'assistant'),
              role: item.role || (item.sender === 'user' ? 'user' : 'assistant'),
              text: item.text,
              ts: item.ts || Date.now(),
            }));
        }
        return parsed;
      }
    } catch (error) {
      console.warn(`Failed to restore "${key}" from localStorage`, error);
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue;
  };

  const [value, setValue] = useState(getInitialValue);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Failed to persist "${key}" in localStorage`, error);
    }
  }, [key, value]);

  return [value, setValue];
}

const Copilot = () => {
  const [isOpen, setIsOpen] = usePersistentState('copilot:isOpen', true);
  const [isMinimized, setIsMinimized] = usePersistentState('copilot:isMinimized', false);
  const [messages, setMessages] = usePersistentState('copilot:messages', [createMessage('assistant', GREETING_MESSAGE)]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isMinimized) return;
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isMinimized, isLoading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) {
      return;
    }

    const previousMessages = messages;
    const userMessage = createMessage('user', trimmed);
    setMessages(prev => prev.concat(userMessage));
    setInput('');
    setIsLoading(true);

    try {
      const reply = await getAIResponse(trimmed, previousMessages);
      setMessages(prev => prev.concat(createMessage('assistant', reply)));
    } catch (error) {
      console.error('OpenAI chat error', error);
      const fallback = error?.message && error.message.toLowerCase().includes('api key')
        ? 'I need a valid OpenAI API key to help. Set REACT_APP_OPENAI_API_KEY in your .env and reload.'
        : 'I had trouble reaching OpenAI just now. Please try again in a moment.';
      setMessages(prev => prev.concat(createMessage('assistant', fallback)));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const openLauncher = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(prev => !prev);
  };

  const closeCopilot = () => {
    setIsOpen(false);
  };

  return (
    <>
      {!isOpen && (
        <button type="button" className="copilot-launcher" onClick={openLauncher}>
          AI
        </button>
      )}

      {isOpen && (
        <div className={`copilot-container ${isMinimized ? 'min' : ''}`}>
          <div className="copilot-header">
            <div>
              <div className="copilot-title">Santi Copilot</div>
              <div className="copilot-subtitle">Powered by OpenAI</div>
            </div>
            <div className="copilot-actions">
              <button
                type="button"
                className="copilot-btn"
                aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
                onClick={toggleMinimize}
              >
                {isMinimized ? '+' : '-'}
              </button>
              <button
                type="button"
                className="copilot-btn"
                aria-label="Close chat"
                onClick={closeCopilot}
              >
                x
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="copilot-messages" ref={scrollRef}>
                {messages.map(message => (
                  <div key={message.id} className={`msg ${message.role}`}>
                    <div className="bubble">{message.text}</div>
                  </div>
                ))}
                {isLoading && (
                  <div className="msg assistant">
                    <div className="bubble typing">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                )}
              </div>

              <form className="copilot-input" onSubmit={handleSubmit}>
                <textarea
                  value={input}
                  onChange={event => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything - budgets, plans, or open questions..."
                  rows={1}
                />
                <button type="submit" disabled={!input.trim() || isLoading}>
                  Send
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Copilot;
