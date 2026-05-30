import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#00d9ff' }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/console-portal" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
