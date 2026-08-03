import React from 'react';
import { motion } from 'framer-motion';
import { cardVariants } from '../animations/variants';
import '../styles/statcard.css';

function StatCard({ label, value, icon, accent, index }) {
  return (
    <motion.div
      className="stat-card"
      style={{ '--accent': accent || 'var(--accent-blue)' }}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index || 0}
    >
      <div className="stat-card-icon">{icon}</div>
      <div className="stat-card-body">
        <p className="stat-card-label">{label}</p>
        <p className="stat-card-value">{value}</p>
      </div>
      <div className="stat-card-glow" />
    </motion.div>
  );
}

export default StatCard;
