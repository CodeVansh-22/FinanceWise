import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cardVariants } from '../animations/variants';
import { FiInbox, FiArrowDownLeft, FiArrowUpRight, FiTrash2, FiLoader, FiTarget } from 'react-icons/fi';
import '../styles/transactionlist.css';

const categoryColors = {
  Food: 'var(--accent-orange)',
  Transport: 'var(--accent-blue)',
  Health: 'var(--accent-pink)',
  Shopping: 'var(--accent-purple)',
  Entertainment: 'var(--accent-green)',
  Bills: 'var(--danger)',
  Salary: 'var(--accent-green)',
  Goal: 'var(--accent-blue)',
  Other: 'var(--text-muted)',
};

function TransactionList({ transactions, onDelete }) {
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (id) => {
    if (!onDelete) return;
    setDeleting(id);
    await onDelete(id);
    setDeleting(null);
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon"><FiInbox /></div>
        <p>No transactions found</p>
      </div>
    );
  }

  return (
    <div className="txn-list">
      <AnimatePresence>
        {transactions.map((txn, i) => (
          <motion.div
            key={txn._id || i}
            className="txn-row"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
            custom={i}
            layout
          >
            <div className="txn-icon" style={{ color: categoryColors[txn.category] || 'var(--text-muted)' }}>
              {txn.category === 'Goal' ? <FiTarget /> : (txn.type === 'income' ? <FiArrowDownLeft /> : <FiArrowUpRight />)}
            </div>
            <div className="txn-info">
              <p className="txn-category">{txn.category}</p>
              <p className="txn-desc">{txn.description || '—'}</p>
            </div>
            <div className={txn.type === 'income' ? 'txn-amount-income' : 'txn-amount-expense'}>
              {txn.type === 'income' ? '+' : '-'}₹{txn.amount?.toLocaleString('en-IN')}
            </div>
            {onDelete && (
              <button
                className="txn-delete-btn"
                onClick={() => handleDelete(txn._id)}
                disabled={deleting === txn._id}
                title="Delete transaction"
              >
                {deleting === txn._id ? <motion.div animate={{rotate: 360}} transition={{repeat: Infinity, duration: 1, ease: 'linear'}}><FiLoader /></motion.div> : <FiTrash2 />}
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default TransactionList;
