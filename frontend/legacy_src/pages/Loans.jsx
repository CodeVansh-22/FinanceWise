import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, cardVariants } from '../animations/variants';
import api from '../utils/api';
import ProgressBar from '../components/ProgressBar';
import { BsBank } from 'react-icons/bs';
import { FaFaceSmile } from 'react-icons/fa6';
import '../styles/loans.css';

const LOAN_TYPES = ['Home Loan', 'Car Loan', 'Personal Loan', 'Education Loan', 'Credit Card'];

function Loans() {
  const [loans, setLoans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'Home Loan', principal: '', emi: '', remaining_months: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchLoans = async () => {
    try {
      const res = await api.get('/loans');
      setLoans(res.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchLoans(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/loans', form);
      setForm({ type: 'Home Loan', principal: '', emi: '', remaining_months: '' });
      setShowForm(false);
      fetchLoans();
    } catch (err) { console.error(err); }
    finally { setSubmitting(false); }
  };

  const totalDebt = loans.reduce((sum, l) => sum + (l.emi * l.remaining_months || 0), 0);
  const totalEMI = loans.reduce((sum, l) => sum + (l.emi || 0), 0);

  return (
    <motion.div className="loans-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="loans-header">
        <div>
          <h2 className="loans-title" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>Loans & EMI <BsBank /></h2>
          <p className="loans-sub">Track your debt effectively</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Add Loan'}
        </button>
      </div>

      <div className="loans-summary">
        <div className="loans-sum-card">
          <p className="loans-sum-label">Total Remaining Debt</p>
          <p className="loans-sum-value danger">₹{totalDebt.toLocaleString('en-IN')}</p>
        </div>
        <div className="loans-sum-card">
          <p className="loans-sum-label">Monthly EMI Outflow</p>
          <p className="loans-sum-value warning">₹{totalEMI.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {showForm && (
        <motion.div
          className="loans-form-card"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <h3 className="section-title">Add Loan</h3>
          <form onSubmit={handleSubmit} className="loans-form">
            <div className="loans-form-grid">
              <div className="form-group">
                <label className="form-label">Loan Type</label>
                <select className="form-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  {LOAN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Principal Amount (₹)</label>
                <input className="form-input" type="number" placeholder="1000000" value={form.principal} onChange={e => setForm({ ...form, principal: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Monthly EMI (₹)</label>
                <input className="form-input" type="number" placeholder="15000" value={form.emi} onChange={e => setForm({ ...form, emi: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Remaining Months</label>
                <input className="form-input" type="number" placeholder="120" value={form.remaining_months} onChange={e => setForm({ ...form, remaining_months: e.target.value })} required />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? 'Adding...' : 'Save Loan'}</button>
          </form>
        </motion.div>
      )}

      {loans.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"><BsBank /></div>
          <p style={{display: 'flex', alignItems: 'center', gap: '8px'}}>Koi loan nahi. Debt-free rahein! <FaFaceSmile /></p>
        </div>
      ) : (
        <div className="loans-grid">
          {loans.map((loan, i) => {
            const totalRepaid = loan.principal - (loan.emi * loan.remaining_months);
            return (
              <motion.div key={loan._id || i} className="loan-card" variants={cardVariants} initial="hidden" animate="visible" custom={i}>
                <div className="loan-card-top">
                  <span className="loan-type-badge">{loan.type}</span>
                  <span className="loan-months">{loan.remaining_months} months left</span>
                </div>
                <div className="loan-amounts">
                  <div>
                    <p className="loan-amount-label">Principal</p>
                    <p className="loan-amount">₹{loan.principal?.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="loan-amount-label">Monthly EMI</p>
                    <p className="loan-emi">₹{loan.emi?.toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <ProgressBar label="Repaid" current={Math.max(0, totalRepaid)} target={loan.principal} color="var(--accent-green)" />
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

export default Loans;
