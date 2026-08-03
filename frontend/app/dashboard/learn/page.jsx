'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { GraduationCap, BookOpen, CheckCircle2, HelpCircle, RefreshCw } from 'lucide-react';

export default function LearnPage() {
  const [cards, setCards] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  const fetchLearnData = async () => {
    try {
      setLoading(true);
      const [resCards, resQuiz] = await Promise.all([
        api.get('/learn/cards?count=6').catch(() => null),
        api.get('/learn/quiz?count=5').catch(() => null)
      ]);

      if (resCards?.data) setCards(resCards.data);
      if (resQuiz?.data) setQuiz(resQuiz.data);
    } catch (e) {
      console.error('Learn fetch error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLearnData();
  }, []);

  const handleOptionSelect = (qIndex, option) => {
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: option }));
  };

  const handleCheckQuiz = () => {
    let correct = 0;
    quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) {
        correct += 1;
      }
    });
    setScore({ correct, total: quiz.length });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-indigo-500" /> Financial Literacy & Quiz Academy
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Master SIPs, tax planning, Section 80C deductions, and emergency reserve funds.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={fetchLearnData}>
          <RefreshCw className="w-3.5 h-3.5 mr-1" /> Refresh Cards & Quiz
        </Button>
      </div>

      {/* Literacy Flashcards */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-500" /> Knowledge Flashcards
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, idx) => (
            <Card key={c.id || idx} className="p-6 border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <Badge variant="emerald">Concept #{c.id || idx + 1}</Badge>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">{c.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">{c.explanation}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/70 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                💡 <strong>Pro Tip:</strong> {c.tip}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Interactive Quiz Section */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-500" /> Test Your Knowledge
        </h3>

        <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-6">
          {quiz.map((q, qIdx) => (
            <div key={qIdx} className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0">
              <p className="font-bold text-slate-900 dark:text-white text-sm">
                Q{qIdx + 1}: {q.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {q.options.map((opt, oIdx) => {
                  const isSelected = selectedAnswers[qIdx] === opt;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleOptionSelect(qIdx, opt)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                        isSelected
                          ? 'bg-primary-600 border-primary-500 text-white shadow'
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <Button variant="emerald" onClick={handleCheckQuiz}>
              Check Answers & Submit
            </Button>

            {score && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Your Quiz Score: {score.correct} / {score.total} Correct!</span>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
