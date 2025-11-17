import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, [token]);

  const verifyToken = async () => {
    try {
      const data = await authAPI.getCurrentUser(token);
      setUser(data.user);
    } catch (error) {
      console.error('Token verification failed:', error);
      setToken(null);
      localStorage.removeItem('token');
    }
  };

  const signin = async (email, password, role = 'user') => {
    setLoading(true);
    try {
      const data = await authAPI.signin(email, password, role);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, passwordConfirm) => {
    setLoading(true);
    try {
      const data = await authAPI.register(name, email, password, passwordConfirm);
      return data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password, passwordConfirm, role = 'user') => {
    setLoading(true);
    try {
      console.log('AuthContext signup called with role:', role);
      const data = await authAPI.signup(name, email, password, passwordConfirm, role);
      console.log('Signup successful, user role:', data.user.role);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    try {
      await authAPI.signout();
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Sign out error:', error);
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signin, signup, register, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
