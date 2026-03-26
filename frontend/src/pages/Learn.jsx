import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants, cardVariants } from '../animations/variants';
import api from '../utils/api';
import { FaBookOpen, FaLightbulb, FaCheckCircle, FaTrophy, FaThumbsUp, FaRocket } from 'react-icons/fa';
import { FiRefreshCw, FiBook, FiLayers } from 'react-icons/fi';
import '../styles/learn.css';

function Learn() {
  const [cards, setCards] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);

  const fetchCards = useCallback(() => {
    setFlipped({});
    api.get(`/learn/cards?count=5&r=${Date.now()}`).then(r => setCards(r.data)).catch(console.error);
  }, []);

  const fetchQuiz = useCallback(() => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    api.get(`/learn/quiz?count=4&r=${Date.now()}`).then(r => setQuiz(r.data)).catch(console.error);
  }, []);

  useEffect(() => {
    fetchCards();
    fetchQuiz();
  }, [fetchCards, fetchQuiz]);

  const toggleFlip = (id) => setFlipped(prev => ({ ...prev, [id]: !prev[id] }));

  const handleAnswer = (qIdx, option) => {
    if (!submitted) setAnswers(prev => ({ ...prev, [qIdx]: option }));
  };

  const handleSubmit = () => {
    let correct = 0;
    quiz.forEach((q, i) => { if (answers[i] === q.answer) correct++; });
    setScore(correct);
    setSubmitted(true);
  };

  const handleNextRound = () => {
    setRound(r => r + 1);
    fetchCards();
    fetchQuiz();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div className="learn-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="learn-hero">
        <h2 className="learn-title" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>Finance Sikho <FaBookOpen /></h2>
        <p className="learn-sub">Flip karo cards, quiz do, aur smarter bano! — Round {round}</p>
      </div>

      <section>
        <div className="learn-section-header">
          <h3 className="section-title">Flash Cards</h3>
          <button className="btn btn-outline learn-refresh-btn" onClick={fetchCards} style={{display: 'flex', alignItems: 'center', gap: '6px'}}><FiRefreshCw /> Naye Cards</button>
        </div>
        <div className="learn-cards-grid">
          {cards.map((card, i) => (
            <motion.div
              key={`${round}-${card.id}`}
              className={`flip-card ${flipped[card.id] ? 'flipped' : ''}`}
              onClick={() => toggleFlip(card.id)}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              <div className="flip-inner">
                <div className="flip-front">
                  <span className="flip-emoji"><FiLayers size={32} /></span>
                  <h4 className="flip-title">{card.title}</h4>
                  <p className="flip-hint">Tap to flip</p>
                </div>
                <div className="flip-back">
                  <p className="flip-explanation">{card.explanation}</p>
                  <div className="flip-tip" style={{display: 'flex', alignItems: 'flex-start', gap: '8px'}}><FaLightbulb color="var(--accent-orange)" style={{flexShrink: 0, marginTop: '4px'}} /> <span>{card.tip}</span></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <div className="learn-section-header">
          <h3 className="section-title">Quick Quiz</h3>
          {submitted && <button className="btn btn-outline learn-refresh-btn" onClick={fetchQuiz} style={{display: 'flex', alignItems: 'center', gap: '6px'}}><FiRefreshCw /> Naye Questions</button>}
        </div>
        <div className="quiz-list">
          {quiz.map((q, i) => (
            <motion.div key={`${round}-q${i}`} className="quiz-card" variants={cardVariants} initial="hidden" animate="visible" custom={i}>
              <p className="quiz-question">Q{i + 1}. {q.question}</p>
              <div className="quiz-options">
                {q.options.map((opt) => {
                  let cls = 'quiz-option';
                  if (answers[i] === opt) cls += ' selected';
                  if (submitted && opt === q.answer) cls += ' correct';
                  if (submitted && answers[i] === opt && opt !== q.answer) cls += ' wrong';
                  return (
                    <button key={opt} className={cls} onClick={() => handleAnswer(i, opt)}>{opt}</button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {quiz.length > 0 && !submitted && (
          <button className="btn btn-primary quiz-submit" onClick={handleSubmit} disabled={Object.keys(answers).length < quiz.length} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
            Submit Quiz <FaCheckCircle />
          </button>
        )}

        <AnimatePresence>
          {submitted && (
            <motion.div
              className="quiz-result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="quiz-result-content">
                <span className="quiz-result-icon">{score === quiz.length ? <FaTrophy color="var(--accent-orange)" /> : score >= quiz.length / 2 ? <FaThumbsUp color="var(--accent-blue)" /> : <FiBook color="var(--text-muted)" />}</span>
                <span>Score: {score}/{quiz.length} — {score === quiz.length ? 'Perfect! Bahut badhiya!' : 'Thoda aur practice karo!'}</span>
              </div>
              <button className="btn btn-success quiz-next-btn" onClick={handleNextRound} style={{display: 'inline-flex', alignItems: 'center', gap: '8px'}}>
                Next Round <FaRocket />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.div>
  );
}

export default Learn;
