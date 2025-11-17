import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user, token } = useAuth();

  if (!user || !token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export const PublicRoute = ({ children }) => {
  const { user, token } = useAuth();

  // If user is already logged in, redirect to home
  if (user && token) {
    return <Navigate to="/" replace />;
  }

  return children;
};
