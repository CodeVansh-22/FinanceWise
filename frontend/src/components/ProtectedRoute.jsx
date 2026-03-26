import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/auth';
import Layout from './Layout';

function ProtectedRoute({ children }) {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
}

export default ProtectedRoute;
