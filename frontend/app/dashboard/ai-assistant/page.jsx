'use client';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/api';
import { Bot, Send, User, Sparkles, Trash2, Cpu, RefreshCw, Zap } from 'lucide-react';

const PERSONAS = [
  { id: 'advisor', name: 'Financial Advisor', desc: 'General financial planning & goals' },
  { id: 'budget', name: 'Budget Planner', desc: '50/30/20 & expense budgeting' },
  { id: 'expense', name: 'Expense Audit', desc: 'Spending leaks & category breakdown' },
  { id: 'investment', name: 'Wealth & SIP', desc: 'Mutual funds & asset allocation' },
  { id: 'loan', name: 'Loan & Debt', desc: 'EMI reduction & payoff strategies' },
  { id: 'tax', name: 'Tax & GST', desc: 'Section 80C & GSTR compliance' }
];

export default function AiAssistantPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState('advisor');
  const [analytics, setAnalytics] = useState(null);

  const fetchHistoryAndAnalytics = async () => {
    try {
      const [resHist, resAna] = await Promise.all([
        api.get('/ai/history').catch(() => null),
        api.get('/ai/analytics').catch(() => null)
      ]);

      if (resHist?.data && Array.isArray(resHist.data) && resHist.data.length > 0) {
        setMessages(resHist.data.map(m => ({
          sender: m.role === 'user' ? 'user' : 'bot',
          text: m.content,
          mode: m.mode || 'General'
        })));
      } else {
        setMessages([
          {
            sender: 'bot',
            text: 'Hello! I am **Arth**, your 24/7 FinanceWise AI Assistant. How can I help optimize your finances, tax strategy, or budget today?'
          }
        ]);
      }

      if (resAna?.data) setAnalytics(resAna.data);
    } catch (e) {
      console.warn('AI history fetch error:', e);
    }
  };

  useEffect(() => {
    fetchHistoryAndAnalytics();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userQuery = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userQuery }]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/ai/chat', {
        message: userQuery,
        persona: persona
      });

      const replyText = res.data?.reply || res.data?.response || 'I am processing your financial records.';
      setMessages(prev => [...prev, { sender: 'bot', text: replyText, mode: persona }]);
      
      if (res.data?.tokens_used) {
        setAnalytics(prev => ({
          ...prev,
          total_messages: (prev?.total_messages || 0) + 2,
          estimated_tokens: (prev?.estimated_tokens || 0) + res.data.tokens_used
        }));
      }
    } catch (err) {
      console.error('AI chat error:', err);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: 'I apologize, I am temporarily having trouble contacting the AI service. Please try asking again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    try {
      await api.delete('/ai/history');
      setMessages([
        {
          sender: 'bot',
          text: 'Conversation history cleared. What new topic would you like to explore?'
        }
      ]);
    } catch (e) {
      console.error('Failed to clear history:', e);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Bot className="w-7 h-7 text-primary-500" /> Arth AI Financial & Tax Advisor
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            24/7 intelligent assistant with specialized personas for Tax, Budgeting, Loans, and Wealth.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {analytics && (
            <Badge variant="secondary" className="px-3 py-1 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500" /> {analytics.estimated_tokens || 0} Tokens Used
            </Badge>
          )}
          <Button variant="outline" size="sm" onClick={handleClearHistory}>
            <Trash2 className="w-3.5 h-3.5 mr-1 text-rose-500" /> Clear Chat
          </Button>
        </div>
      </div>

      {/* Persona Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {PERSONAS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPersona(p.id)}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              persona === p.id
                ? 'bg-primary-600 border-primary-500 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
            }`}
          >
            <p className="font-bold text-xs">{p.name}</p>
            <p className="text-[10px] opacity-80 truncate">{p.desc}</p>
          </button>
        ))}
      </div>

      <Card className="p-6 border-slate-200 dark:border-slate-800 flex flex-col h-[520px] justify-between space-y-4">
        {/* Messages Container */}
        <div className="flex-grow overflow-y-auto space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-2xl p-4 rounded-2xl text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-primary-600 text-white font-medium rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700'
                }`}
              >
                {m.sender === 'bot' ? (
                  <div className="prose dark:prose-invert prose-xs max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {m.text}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <span>{m.text}</span>
                )}
              </div>
              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs font-semibold text-primary-500 animate-pulse p-2">
              <Sparkles className="w-4 h-4" /> Arth AI is computing response using {persona.toUpperCase()} persona...
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <Input
            placeholder={`Ask Arth (${PERSONAS.find(p => p.id === persona)?.name}) about tax savings, SIP, or budget...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1"
          />
          <Button type="submit" variant="primary" isLoading={loading}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </Card>
    </div>
  );
}
