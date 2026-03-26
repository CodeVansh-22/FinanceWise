import React from 'react';
import { motion } from 'framer-motion';
import { cardVariants } from '../animations/variants';
import ProgressBar from './ProgressBar';
import { FaTrophy } from 'react-icons/fa6';
import { FiCalendar } from 'react-icons/fi';
import '../styles/goalcard.css';
import api from '../utils/api';

function GoalCard({ goal, index, onRefresh }) {
  const [showAdd, setShowAdd] = React.useState(false);
  const [amount, setAmount] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const pct = goal.target_amount > 0
    ? Math.min((goal.current_amount / goal.target_amount) * 100, 100)
    : 0;

  const handleAddFunds = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;
    setLoading(true);
    try {
      await api.put(`/goals/${goal._id}`, { amount: Number(amount) });
      setAmount('');
      setShowAdd(false);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error(err);
      alert('Failed to add funds');
    } finally {
      setLoading(false);
    }
  };

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
      
      {pct < 100 && (
        <div style={{ marginTop: '16px' }}>
          {!showAdd ? (
            <button className="btn btn-secondary" style={{ width: '100%', padding: '8px', fontSize: '0.9rem' }} onClick={() => setShowAdd(true)}>
              + Add Funds
            </button>
          ) : (
            <form onSubmit={handleAddFunds} style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="number" 
                className="form-input" 
                placeholder="Amount (₹)" 
                value={amount} 
                onChange={e => setAmount(e.target.value)} 
                disabled={loading}
                style={{ flex: 1, padding: '8px' }}
                autoFocus
              />
              <button type="submit" className="btn btn-success" disabled={loading} style={{ padding: '8px 16px' }}>
                {loading ? '...' : 'Save'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowAdd(false)} disabled={loading} style={{ padding: '8px 16px' }}>
                Cancel
              </button>
            </form>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default GoalCard;
