import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from '../animations/variants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiTrendingUp, FiTarget } from 'react-icons/fi';
import '../styles/sip.css';

function SIP() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const results = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const n = years * 12;
    const totalValue = monthly * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvested = monthly * n;
    const returns = totalValue - totalInvested;

    const chartData = [];
    for (let y = 1; y <= years; y++) {
      const ny = y * 12;
      const val = monthly * ((Math.pow(1 + monthlyRate, ny) - 1) / monthlyRate) * (1 + monthlyRate);
      chartData.push({
        year: `Yr ${y}`,
        invested: monthly * ny,
        total: Math.round(val),
      });
    }
    return { totalValue: Math.round(totalValue), totalInvested, returns: Math.round(returns), chartData };
  }, [monthly, rate, years]);

  const fmt = (n) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <motion.div className="sip-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="sip-hero">
        <h2 className="sip-title" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>SIP Calculator <FiTrendingUp /></h2>
        <p className="sip-sub">Dekhte hain tera paisa kaise badhega compounding se</p>
      </div>

      <div className="sip-body">
        <div className="sip-inputs">
          <h3 className="section-title">Parameters</h3>
          <div className="sip-slider-group">
            <div className="sip-slider-header">
              <label>Monthly SIP</label>
              <span className="sip-slider-value">{fmt(monthly)}</span>
            </div>
            <input type="range" className="sip-slider" min="500" max="100000" step="500" value={monthly} onChange={e => setMonthly(Number(e.target.value))} />
            <div className="sip-slider-minmax"><span>₹500</span><span>₹1L</span></div>
          </div>
          <div className="sip-slider-group">
            <div className="sip-slider-header">
              <label>Expected Return (%)</label>
              <span className="sip-slider-value">{rate}%</span>
            </div>
            <input type="range" className="sip-slider" min="1" max="30" step="0.5" value={rate} onChange={e => setRate(Number(e.target.value))} />
            <div className="sip-slider-minmax"><span>1%</span><span>30%</span></div>
          </div>
          <div className="sip-slider-group">
            <div className="sip-slider-header">
              <label>Tenure (Years)</label>
              <span className="sip-slider-value">{years} yr</span>
            </div>
            <input type="range" className="sip-slider" min="1" max="40" step="1" value={years} onChange={e => setYears(Number(e.target.value))} />
            <div className="sip-slider-minmax"><span>1 yr</span><span>40 yr</span></div>
          </div>

          <div className="sip-results">
            <div className="sip-result-item">
              <p className="sip-result-label">Total Invested</p>
              <p className="sip-result-value blue">{fmt(results.totalInvested)}</p>
            </div>
            <div className="sip-result-item">
              <p className="sip-result-label">Est. Returns</p>
              <p className="sip-result-value green">{fmt(results.returns)}</p>
            </div>
            <div className="sip-result-item sip-result-total">
              <p className="sip-result-label" style={{display: 'flex', alignItems: 'center', gap: '6px'}}>Total Value <FiTarget /></p>
              <p className="sip-result-value purple">{fmt(results.totalValue)}</p>
            </div>
          </div>
        </div>

        <div className="sip-chart-area">
          <h3 className="section-title">Growth Chart</h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={results.chartData} margin={{ top: 10, right: 10, bottom: 0, left: 20 }}>
              <defs>
                <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-purple)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--accent-purple)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="invGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="year" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} tickFormatter={v => `₹${(v/100000).toFixed(0)}L`} />
              <Tooltip formatter={(v) => fmt(v)} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="invested" stroke="var(--accent-blue)" fill="url(#invGrad)" name="Invested" strokeWidth={2} />
              <Area type="monotone" dataKey="total" stroke="var(--accent-purple)" fill="url(#totalGrad)" name="Total Value" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}

export default SIP;
