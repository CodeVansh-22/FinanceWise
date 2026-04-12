import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '../animations/variants';
import api from '../utils/api';
import { setToken, setUser } from '../utils/auth';
import { FaCheckCircle, FaRocket, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaHand } from 'react-icons/fa6';
import '../styles/login.css';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', form);
      setToken(res.data.token);
      setUser(res.data.user);
      navigate('/dashboard');
    } catch (err) {
      const serverError = err.response?.data?.details || err.response?.data?.error || 'Login failed. Try again.';
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
          <p className="auth-brand-tagline">Smart Bano, Save Karo</p>
          <div className="auth-features">
            <div className="auth-feature-item"><FaCheckCircle style={{marginRight: '8px'}} /> Budget Track Karo</div>
            <div className="auth-feature-item"><FaCheckCircle style={{marginRight: '8px'}} /> Goals Set Karo</div>
            <div className="auth-feature-item"><FaCheckCircle style={{marginRight: '8px'}} /> AI Advisor se Pucho</div>
            <div className="auth-feature-item"><FaCheckCircle style={{marginRight: '8px'}} /> SIP Calculator Use Karo</div>
          </div>
        </motion.div>
      </div>

      <div className="auth-right">
        <motion.div className="auth-card" variants={slideUp} initial="initial" animate="animate">
          <h2 className="auth-title">Wapis Aao! <FaHand style={{marginLeft: '8px'}} /></h2>
          <p className="auth-subtitle">Apne account mein login karo</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                name="email"
                type="email"
                className="form-input"
                placeholder="aap@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
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
            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? (
                <span>Logging in...</span>
              ) : (
                <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}>Login Karo <FaRocket /></span>
              )}
            </button>
          </form>

          <p className="auth-switch">
            Naya account chahiye? <Link to="/register" className="auth-link">Register Karo</Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Login;
