import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '../animations/variants';
import api from '../utils/api';
import { setToken, setUser } from '../utils/auth';
import { FaTrophy, FaRobot, FaRocket, FaStar, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiPieChart, FiTarget } from 'react-icons/fi';
import '../styles/login.css';
import '../styles/register.css';

const GOALS = ['Emergency Fund', 'Home Purchase', 'Retirement', 'Travel', 'Education', 'Wealth Building'];

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', password: '', monthly_income: '', city: '', financial_goal: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/register', form);
      setToken(res.data.token);
      setUser({ name: form.name, email: form.email, level: 'Beginner' });
      navigate('/dashboard');
    } catch (err) {
      const serverError = err.response?.data?.details || err.response?.data?.error || 'Registration failed. Try again.';
      setError(serverError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="auth-page" variants={fadeIn} initial="initial" animate="animate">
      <div className="auth-left">
        <motion.div className="auth-brand" variants={slideUp} initial="initial" animate="animate">
          <img src="/favicon.ico" alt="FinanceWise Logo" style={{ width: '64px', height: '64px', marginBottom: '16px', objectFit: 'contain' }} />
          <h1 className="auth-brand-title">FinanceWise</h1>
          <p className="auth-brand-tagline">Secure your financial future</p>
          <div className="auth-features">
            <div className="auth-feature-item"><FaTrophy style={{marginRight: '8px'}} /> Gamified Financial Learning</div>
            <div className="auth-feature-item"><FaRobot style={{marginRight: '8px'}} /> AI Advisor — Arth</div>
            <div className="auth-feature-item"><FiPieChart style={{marginRight: '8px'}} /> Real-time Budget Analytics</div>
            <div className="auth-feature-item"><FiTarget style={{marginRight: '8px'}} /> Goal-based Planning</div>
          </div>
        </motion.div>
      </div>

      <div className="auth-right">
        <motion.div className="auth-card register-card" variants={slideUp} initial="initial" animate="animate">
          <h2 className="auth-title">Get Started! <FaRocket style={{marginLeft: '8px'}} /></h2>
          <p className="auth-subtitle">Create your free account</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="register-grid">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input name="name" className="form-input" placeholder="Rahul Sharma" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input name="email" type="email" className="form-input" placeholder="rahul@email.com" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="register-grid">
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="password-input-wrapper">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Monthly Income (₹)</label>
                <input name="monthly_income" type="number" className="form-input" placeholder="50000" value={form.monthly_income} onChange={handleChange} required />
              </div>
            </div>
            <div className="register-grid">
              <div className="form-group">
                <label className="form-label">City</label>
                <input name="city" className="form-input" placeholder="Delhi" value={form.city} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Financial Goal</label>
                <select name="financial_goal" className="form-input" value={form.financial_goal} onChange={handleChange}>
                  <option value="">Select goal</option>
                  {GOALS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? 'Creating account...' : <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}>Create Account <FaStar /></span>}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login" className="auth-link">Login Now</Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Register;
