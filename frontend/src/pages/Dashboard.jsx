import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from '../animations/variants';
import api from '../utils/api';
import { getUser } from '../utils/auth';
import StatCard from '../components/StatCard';
import TransactionList from '../components/TransactionList';
import Skeleton from '../components/Skeleton';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FaTrophy, FaThumbsUp } from 'react-icons/fa6';
import { FaMoneyBillWave } from 'react-icons/fa';
import { FiArrowUpRight, FiTarget, FiPieChart } from 'react-icons/fi';
import { IoWarningOutline } from 'react-icons/io5';
import { BsBank } from 'react-icons/bs';
import '../styles/dashboard.css';

const LEVEL_COLORS = {
  Beginner: 'var(--accent-orange)',
  Intermediate: 'var(--accent-blue)',
  Advanced: 'var(--accent-purple)',
  Expert: 'var(--accent-green)',
};

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#ef4444'];
const CACHE_KEY_DASH = 'fw_dash_data';
const CACHE_KEY_SUMMARY = 'fw_dash_summary';

function Dashboard() {
  const user = getUser();
  
  // Initialize from cache for instant load
  const [data, setData] = useState(() => {
    const cached = localStorage.getItem(CACHE_KEY_DASH);
    return cached ? JSON.parse(cached) : null;
  });
  
  const [categoryBreakdown, setCategoryBreakdown] = useState(() => {
    const cached = localStorage.getItem(CACHE_KEY_SUMMARY);
    return cached ? JSON.parse(cached) : {};
  });

  const [loading, setLoading] = useState(!data); // Only loading if no cached data

  useEffect(() => {
    // Background fetch
    const fetchData = async () => {
      try {
        const [dashRes, summaryRes] = await Promise.all([
          api.get('/analytics/dashboard'),
          api.get('/transactions/summary'),
        ]);
        
        const newData = dashRes.data;
        const newSummary = summaryRes.data.category_breakdown || {};
        
        setData(newData);
        setCategoryBreakdown(newSummary);
        
        // Update cache
        localStorage.setItem(CACHE_KEY_DASH, JSON.stringify(newData));
        localStorage.setItem(CACHE_KEY_SUMMARY, JSON.stringify(newSummary));
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fmt = (n) => `₹${(n || 0).toLocaleString('en-IN')}`;

  const pieData = Object.entries(categoryBreakdown)
    .filter(([, value]) => value > 0)
    .map(([name, value]) => ({ name, value }));

  const healthColor =
    data?.health_score >= 70 ? 'var(--accent-green)' :
    data?.health_score >= 40 ? 'var(--accent-orange)' : 'var(--danger)';

  return (
    <motion.div className="dashboard" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="dash-top">
        <div className="dash-welcome">
          <h2 className="dash-greeting" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>Hello, {user?.name} </h2>
          <p className="dash-date">Your financial snapshot today</p>
        </div>
        {!data && loading ? (
          <Skeleton type="text" style={{ width: '120px', height: '36px', borderRadius: '999px' }} />
        ) : (
          <div className="dash-level-badge" style={{ borderColor: LEVEL_COLORS[data?.level] || 'var(--border)' }}>
            <span style={{display: 'flex', alignItems: 'center'}}><FaTrophy /></span>
            <span style={{ color: LEVEL_COLORS[data?.level] }}>{data?.level || 'Beginner'}</span>
          </div>
        )}
      </div>

      <div className="dash-stats">
        {(!data && loading) ? (
          <>
            <Skeleton type="card" />
            <Skeleton type="card" />
            <Skeleton type="card" />
            <Skeleton type="card" />
          </>
        ) : (
          <>
            <StatCard label="Monthly Income" value={fmt(data?.total_income)} icon={<FaMoneyBillWave />} accent="var(--accent-green)" index={0} />
            <StatCard label="Total Expense" value={fmt(data?.total_expense)} icon={<FiArrowUpRight />} accent="var(--danger)" index={1} />
            <StatCard label="Net Savings" value={fmt((data?.total_income || 0) - (data?.total_expense || 0))} icon={<BsBank />} accent="var(--accent-blue)" index={2} />
            <StatCard label="Active Goals" value={data?.active_goals_count || 0} icon={<FiTarget />} accent="var(--accent-purple)" index={3} />
          </>
        )}
      </div>

      <div className="dash-middle">
        <div className="dash-health">
          <h3 className="section-title">Health Score</h3>
          {(!data && loading) ? (
            <Skeleton type="circle" />
          ) : (
            <>
              <div className="health-ring-wrap">
                <svg className="health-ring" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border)" strokeWidth="10" />
                  <motion.circle
                    cx="60" cy="60" r="50" fill="none"
                    stroke={healthColor}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - (data?.health_score || 0) / 100) }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="health-score-text">
                  <span className="health-number" style={{ color: healthColor }}>{data?.health_score || 0}</span>
                  <span className="health-label">/ 100</span>
                </div>
              </div>
              <p className="health-desc" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'}}>
                {data?.health_score >= 70 ? <><FaThumbsUp /> Great job!</> : data?.health_score >= 40 ? <><IoWarningOutline /> Keep improving</> : <><IoWarningOutline color="var(--danger)" /> Attention needed</>}
              </p>
              <div className="health-savings-rate">
                Savings Rate: <strong style={{ color: 'var(--accent-green)' }}>{Math.round(data?.savings_rate || 0)}%</strong>
              </div>
            </>
          )}
        </div>

        <div className="dash-chart">
          <h3 className="section-title">Expense Breakdown</h3>
          {(!data && loading) ? (
            <Skeleton type="chart" />
          ) : pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `₹${v.toLocaleString('en-IN')}`} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-state"><div className="empty-icon"><FiPieChart /></div><p>No expense data found</p></div>
          )}
        </div>
      </div>

      <div className="dash-transactions">
        <h3 className="section-title">Recent Transactions</h3>
        {(!data && loading) ? (
          <div className="txn-list">
            <Skeleton type="list-item" />
            <Skeleton type="list-item" />
            <Skeleton type="list-item" />
          </div>
        ) : (
          <TransactionList transactions={data?.recent_transactions || []} />
        )}
      </div>
    </motion.div>
  );
}

export default Dashboard;
