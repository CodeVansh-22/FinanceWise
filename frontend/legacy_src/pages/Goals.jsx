import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants } from '../animations/variants';
import api from '../utils/api';
import GoalCard from '../components/GoalCard';
import { FiTarget } from 'react-icons/fi';
import '../styles/goals.css';

function Goals() {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', target_amount: '', deadline: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchGoals = async () => {
    try {
      const res = await api.get('/goals');
      setGoals(res.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchGoals(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/goals', form);
      setForm({ title: '', target_amount: '', deadline: '' });
      setShowForm(false);
      fetchGoals();
    } catch (err) { console.error(err); }
    finally { setSubmitting(false); }
  };

  return (
    <motion.div className="goals-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="goals-header">
        <div>
          <h2 className="goals-title" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>Apne Goals <FiTarget /></h2>
          <p className="goals-sub">Financial goals track karo aur unhe pura karo</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Naya Goal'}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            className="goals-form-card"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="section-title">Add Goal</h3>
            <form onSubmit={handleSubmit} className="goals-form">
              <div className="form-group">
                <label className="form-label">Goal Name</label>
                <input className="form-input" placeholder="e.g. Emergency Fund" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="goals-form-row">
                <div className="form-group">
                  <label className="form-label">Target Amount (₹)</label>
                  <input className="form-input" type="number" placeholder="200000" value={form.target_amount} onChange={e => setForm({ ...form, target_amount: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Deadline</label>
                  <input className="form-input" type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} required />
                </div>
              </div>
              <button type="submit" className="btn btn-success" disabled={submitting}>{submitting ? 'Saving...' : 'Save Goal'}</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {goals.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"><FiTarget /></div>
          <p>Abhi koi goal nahi. Pehla goal banao!</p>
        </div>
      ) : (
        <div className="goals-grid">
          {goals.map((g, i) => <GoalCard key={g._id || i} goal={g} index={i} onRefresh={fetchGoals} />)}
        </div>
      )}
    </motion.div>
  );
}

export default Goals;
