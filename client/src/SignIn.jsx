import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [selectedRole, setSelectedRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signin(formData.email, formData.password, selectedRole);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{
      maxWidth: '500px',
      margin: '4rem auto',
      padding: '3rem 2rem',
      borderRadius: '1.2rem',
      background: 'linear-gradient(135deg, rgba(30, 33, 57, 0.8) 0%, rgba(26, 31, 58, 0.9) 100%)',
      border: '1px solid rgba(102, 126, 234, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)'
    }}>
      <h2 style={{
        marginBottom: '2rem',
        color: '#8b9ff3',
        textAlign: 'center',
        fontSize: '2rem',
        fontWeight: 700
      }}>Welcome Back</h2>

      {/* Role Selection */}
      <div style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        background: 'rgba(102, 126, 234, 0.1)',
        borderRadius: '0.8rem',
        border: '1px solid rgba(102, 126, 234, 0.3)'
      }}>
        <p style={{
          marginBottom: '1rem',
          color: '#e2e8f0',
          fontWeight: 600,
          fontSize: '0.95rem'
        }}>Sign in as:</p>
        
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {/* User Role */}
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.7rem',
            cursor: 'pointer',
            flex: 1,
            padding: '0.8rem',
            borderRadius: '0.6rem',
            background: selectedRole === 'user' ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
            transition: 'all 0.3s ease',
            border: selectedRole === 'user' ? '1px solid #667eea' : '1px solid transparent'
          }}>
            <input
              type="radio"
              name="role"
              value="user"
              checked={selectedRole === 'user'}
              onChange={(e) => setSelectedRole(e.target.value)}
              style={{
                width: '18px',
                height: '18px',
                cursor: 'pointer',
                accentColor: '#667eea'
              }}
            />
            <span style={{ color: '#e2e8f0', fontWeight: 500 }}>User</span>
          </label>

          {/* Admin Role */}
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.7rem',
            cursor: 'pointer',
            flex: 1,
            padding: '0.8rem',
            borderRadius: '0.6rem',
            background: selectedRole === 'admin' ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
            transition: 'all 0.3s ease',
            border: selectedRole === 'admin' ? '1px solid #667eea' : '1px solid transparent'
          }}>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={selectedRole === 'admin'}
              onChange={(e) => setSelectedRole(e.target.value)}
              style={{
                width: '18px',
                height: '18px',
                cursor: 'pointer',
                accentColor: '#667eea'
              }}
            />
            <span style={{ color: '#e2e8f0', fontWeight: 500 }}>Admin</span>
          </label>
        </div>
      </div>
      
      {error && (
        <div style={{
          color: '#fca5a5',
          padding: '1rem',
          marginBottom: '1.5rem',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderRadius: '0.6rem',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderLeft: '4px solid #ef4444'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label htmlFor="email" style={{
            display: 'block',
            marginBottom: '0.7rem',
            fontWeight: 600,
            color: '#e2e8f0',
            fontSize: '0.95rem'
          }}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            required
            style={{
              width: '100%',
              padding: '0.9rem',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              borderRadius: '0.6rem',
              fontSize: '1rem',
              background: 'rgba(26, 31, 58, 0.8)',
              color: '#e2e8f0',
              transition: 'all 0.3s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.boxShadow = '0 0 10px rgba(102, 126, 234, 0.3)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div>
          <label htmlFor="password" style={{
            display: 'block',
            marginBottom: '0.7rem',
            fontWeight: 600,
            color: '#e2e8f0',
            fontSize: '0.95rem'
          }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            style={{
              width: '100%',
              padding: '0.9rem',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              borderRadius: '0.6rem',
              fontSize: '1rem',
              background: 'rgba(26, 31, 58, 0.8)',
              color: '#e2e8f0',
              transition: 'all 0.3s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.boxShadow = '0 0 10px rgba(102, 126, 234, 0.3)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '1rem',
            background: loading ? 'rgba(102, 126, 234, 0.5)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '0.7rem',
            fontSize: '1.05rem',
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '1rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
          onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)')}
          onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)')}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#94a3b8' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#8b9ff3', fontWeight: 700, textDecoration: 'none' }}>
            Sign Up
          </Link>
        </p>
      </form>
    </section>
  );
}
