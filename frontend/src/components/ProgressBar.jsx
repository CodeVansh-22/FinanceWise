import React from 'react';
import { motion } from 'framer-motion';
import { progressVariants } from '../animations/variants';
import '../styles/progressbar.css';

function ProgressBar({ label, current, target, color, showAmount }) {
  const pct = target > 0 ? Math.min((current / target) * 100, 100) : 0;
  const barColor = color || 'var(--accent-green)';

  return (
    <div className="progress-wrapper">
      {label && (
        <div className="progress-header">
          <span className="progress-label">{label}</span>
          <span className="progress-percent">{Math.round(pct)}%</span>
        </div>
      )}
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          style={{ background: barColor }}
          variants={progressVariants}
          initial="hidden"
          animate="visible"
          custom={pct}
        />
      </div>
      {showAmount && (
        <div className="progress-amounts">
          <span>₹{current?.toLocaleString('en-IN')}</span>
          <span>₹{target?.toLocaleString('en-IN')}</span>
        </div>
      )}
    </div>
  );
}

export default ProgressBar;
