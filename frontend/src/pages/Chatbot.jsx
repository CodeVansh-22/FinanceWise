// Chatbot component for FinanceWise - Production Fix
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from '../animations/variants';
import api from '../utils/api';
import { FaRobot } from 'react-icons/fa';
import { FiLoader, FiSend } from 'react-icons/fi';
import '../styles/chatbot.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am Arth, your AI financial advisor. How can I help you today? \u25c6' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);
    try {
      const res = await api.post('/chatbot/message', { message: userMsg });
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, an error occurred. Please try again later!' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="chatbot-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="chatbot-header">
        <div className="chatbot-avatar"><FaRobot /></div>
        <div>
          <h3 className="chatbot-name">Arth</h3>
          <p className="chatbot-status">● Online — AI Financial Advisor</p>
        </div>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            className={`chat-bubble-wrap ${msg.role === 'user' ? 'user-wrap' : 'bot-wrap'}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {msg.role === 'assistant' && <div className="chat-bot-icon"><FaRobot /></div>}
            <div className={`chat-bubble ${msg.role === 'user' ? 'bubble-user' : 'bubble-bot'}`}>
              {msg.role === 'assistant' && typeof msg.content === 'string' ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.content}
                </ReactMarkdown>
              ) : (
                msg.content
              )}
            </div>
          </motion.div>
        ))}

        {loading && (
          <motion.div className="chat-bubble-wrap bot-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="chat-bot-icon"><FaRobot /></div>
            <div className="chat-bubble bubble-bot typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={sendMessage} className="chatbot-input-row">
        <input
          className="chatbot-input"
          placeholder="Ask something... (e.g. How to start a SIP?)"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className="chatbot-send-btn" disabled={loading || !input.trim()} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {loading ? <motion.div animate={{rotate: 360}} transition={{repeat: Infinity, duration: 1, ease: 'linear'}}><FiLoader /></motion.div> : <FiSend />}
        </button>
      </form>
    </motion.div>
  );
}

export default Chatbot;
