import React from 'react';
import { useLocation } from 'react-router-dom';
import { getUser } from '../utils/auth';
import { FaHand } from 'react-icons/fa6';
import { FiMenu } from 'react-icons/fi';
import '../styles/navbar.css';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/budget': 'Budget & Transactions',
  '/goals': 'Financial Goals',
  '/loans': 'Loans & EMI',
  '/sip': 'SIP Calculator',
  '/learn': 'Learn Finance',
  '/chatbot': 'AI Advisor — Arth',
};

function Navbar({ toggleSidebar }) {
  const location = useLocation();
  const user = getUser();
  const title = pageTitles[location.pathname] || 'FinanceWise';

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          <FiMenu />
        </button>
        <div className="navbar-title">{title}</div>
      </div>
      <div className="navbar-right">
        <div className="navbar-greeting" style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
          Namaste, <strong>{user?.name || 'User'}</strong> <FaHand />
        </div>
        <div className="navbar-avatar">{initial}</div>
      </div>
    </header>
  );
}

export default Navbar;
