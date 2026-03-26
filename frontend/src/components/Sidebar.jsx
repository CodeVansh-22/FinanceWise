import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';
import { FaMoneyBillWave, FaRobot } from 'react-icons/fa';
import { FiPieChart, FiTarget, FiTrendingUp, FiBookOpen, FiLogOut, FiX } from 'react-icons/fi';
import { BsBank } from 'react-icons/bs';
import '../styles/sidebar.css';

const navItems = [
  { path: '/dashboard', icon: <FiPieChart />, label: 'Dashboard' },
  { path: '/budget', icon: <FaMoneyBillWave />, label: 'Budget' },
  { path: '/goals', icon: <FiTarget />, label: 'Goals' },
  { path: '/loans', icon: <BsBank />, label: 'Loans & EMI' },
  { path: '/sip', icon: <FiTrendingUp />, label: 'SIP Calculator' },
  { path: '/learn', icon: <FiBookOpen />, label: 'Learn' },
  { path: '/chatbot', icon: <FaRobot />, label: 'AI Advisor' },
];

function Sidebar({ isOpen, closeSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    closeSidebar();
    navigate('/login');
  };

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-brand">
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <img src="/favicon.ico" alt="FinanceWise" style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
          <div>
            <p className="sidebar-brand-name">FinanceWise</p>
            <p className="sidebar-brand-sub">Smart Karo, Save Karo</p>
          </div>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <FiX />
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="sidebar-logout">
          <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><FiLogOut /> Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
