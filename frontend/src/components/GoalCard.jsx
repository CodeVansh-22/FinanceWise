import React from 'react';
import { motion } from 'framer-motion';
import { cardVariants } from '../animations/variants';
import ProgressBar from './ProgressBar';
import { FaTrophy } from 'react-icons/fa6';
import { FiCalendar } from 'react-icons/fi';
import '../styles/goalcard.css';

function GoalCard({ goal, index }) {
  const pct = goal.target_amount > 0
    ? Math.min((goal.current_amount / goal.target_amount) * 100, 100)
    : 0;

  return (
    <motion.div
      className="goal-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index || 0}
    >
      <div className="goal-card-header">
        <span className="goal-title">{goal.title}</span>
        {pct >= 100 && <span className="badge badge-green" style={{display: 'flex', alignItems: 'center', gap: '4px'}}><FaTrophy /> Complete</span>}
      </div>
      <ProgressBar
        current={goal.current_amount || 0}
        target={goal.target_amount}
        showAmount
      />
      <div className="goal-card-meta">
        <span className="goal-deadline" style={{display: 'flex', alignItems: 'center', gap: '6px'}}><FiCalendar /> {goal.deadline}</span>
        <span className="goal-pct">{Math.round(pct)}% done</span>
      </div>
    </motion.div>
  );
}

export default GoalCard;
