import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';
import ProtectedRoute from './components/ProtectedRoute';
import api from './utils/api';
import { useEffect } from 'react';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Budget = lazy(() => import('./pages/Budget'));
const Goals = lazy(() => import('./pages/Goals'));
const Loans = lazy(() => import('./pages/Loans'));
const SIP = lazy(() => import('./pages/SIP'));
const Learn = lazy(() => import('./pages/Learn'));
const Chatbot = lazy(() => import('./pages/Chatbot'));

function App() {
  useEffect(() => {
    // Preemptively wake up the backend (Render Free Tier)
    const wakeServer = async () => {
      try {
        await api.get('/health');
        console.log("Backend wakeup ping successful");
      } catch (err) {
        console.warn("Backend wakeup ping failed (expected if server is down)", err);
      }
    };
    wakeServer();
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="app-loader">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/budget" element={<ProtectedRoute><Budget /></ProtectedRoute>} />
          <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
          <Route path="/loans" element={<ProtectedRoute><Loans /></ProtectedRoute>} />
          <Route path="/sip" element={<ProtectedRoute><SIP /></ProtectedRoute>} />
          <Route path="/learn" element={<ProtectedRoute><Learn /></ProtectedRoute>} />
          <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
