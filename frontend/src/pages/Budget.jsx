import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, cardVariants } from '../animations/variants';
import api from '../utils/api';
import TransactionList from '../components/TransactionList';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { FiArrowDownLeft, FiArrowUpRight } from 'react-icons/fi';
import '../styles/budget.css';

const CATEGORIES = ['Food', 'Transport', 'Health', 'Shopping', 'Entertainment', 'Bills', 'Salary', 'Other'];

function Budget() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [form, setForm] = useState({ type: 'expense', amount: '', category: 'Food', description: '' });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [txns, sum] = await Promise.all([
        api.get('/transactions'),
        api.get('/transactions/summary'),
      ]);
      setTransactions(txns.data);
      setSummary(sum.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/transactions', form);
      setForm({ type: 'expense', amount: '', category: 'Food', description: '' });
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const chartData = summary
    ? Object.entries(summary.category_breakdown || {}).map(([name, value]) => ({ name, value }))
    : [];

  const fmt = (n) => `₹${(n || 0).toLocaleString('en-IN')}`;

  return (
    <motion.div className="budget-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="budget-summary-row">
        {[
          { label: 'Total Income', value: fmt(summary?.total_income), color: 'var(--accent-green)' },
          { label: 'Total Expense', value: fmt(summary?.total_expense), color: 'var(--danger)' },
          { label: 'Net Savings', value: fmt(summary?.savings), color: 'var(--accent-blue)' },
        ].map((item, i) => (
          <motion.div key={item.label} className="budget-sum-card" variants={cardVariants} initial="hidden" animate="visible" custom={i}>
            <p className="budget-sum-label">{item.label}</p>
            <p className="budget-sum-value" style={{ color: item.color }}>{item.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="budget-body">
        <div className="budget-left">
          <motion.div className="budget-form-card" variants={cardVariants} initial="hidden" animate="visible" custom={3}>
            <h3 className="section-title">Add Transaction</h3>
            <form onSubmit={handleSubmit} className="budget-form">
              <div className="budget-type-toggle">
                <button type="button" className={form.type === 'income' ? 'type-btn type-active-income' : 'type-btn'} onClick={() => setForm({ ...form, type: 'income' })}><FiArrowDownLeft /> Income</button>
                <button type="button" className={form.type === 'expense' ? 'type-btn type-active-expense' : 'type-btn'} onClick={() => setForm({ ...form, type: 'expense' })}><FiArrowUpRight /> Expense</button>
              </div>
              <div className="form-group">
                <label className="form-label">Amount (₹)</label>
                <input className="form-input" type="number" placeholder="5000" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <input className="form-input" placeholder="Groceries, dinner..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <button type="submit" className="btn btn-success" disabled={submitting}>{submitting ? 'Adding...' : 'Add +'}</button>
            </form>
          </motion.div>

          {chartData.length > 0 && (
            <motion.div className="budget-chart-card" variants={cardVariants} initial="hidden" animate="visible" custom={4}>
              <h3 className="section-title">Category Breakdown</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v) => `₹${v.toLocaleString('en-IN')}`} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="value" fill="var(--accent-blue)" radius={[4, 4, 0, 0]} barSize={window.innerWidth < 640 ? 20 : 35} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </div>

        <div className="budget-right">
          <h3 className="section-title">All Transactions <span className="txn-hint">(hover to delete)</span></h3>
          {loading ? <p style={{ color: 'var(--text-muted)' }}>Loading...</p> : <TransactionList transactions={transactions} onDelete={handleDelete} />}
        </div>
      </div>
    </motion.div>
  );
}

export default Budget;
