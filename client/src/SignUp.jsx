import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function SignUp() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [selectedRole, setSelectedRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
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

    // Validate form
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      console.log('Signing up with role:', selectedRole);
      await signup(formData.name, formData.email, formData.password, formData.confirmPassword, selectedRole);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{
      maxWidth: '500px',
      margin: '2rem auto',
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
      }}>Create Account</h2>

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
        }}>Sign up as:</p>
        
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {/* User Role */}
          <div
            onClick={() => {
              console.log('User role clicked');
              setSelectedRole('user');
            }}
            style={{
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
            }}
          >
            <input
              type="radio"
              name="role"
              value="user"
              checked={selectedRole === 'user'}
              onChange={() => {}}
              style={{
                width: '18px',
                height: '18px',
                cursor: 'pointer',
                accentColor: '#667eea',
                pointerEvents: 'none'
              }}
            />
            <span style={{ color: '#e2e8f0', fontWeight: 500 }}>User</span>
          </div>

          {/* Admin Role */}
          <div
            onClick={() => {
              console.log('Admin role clicked');
              setSelectedRole('admin');
            }}
            style={{
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
            }}
          >
            <input
              type="radio"
              name="role"
              value="admin"
              checked={selectedRole === 'admin'}
              onChange={() => {}}
              style={{
                width: '18px',
                height: '18px',
                cursor: 'pointer',
                accentColor: '#667eea',
                pointerEvents: 'none'
              }}
            />
            <span style={{ color: '#e2e8f0', fontWeight: 500 }}>Admin</span>
          </div>
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

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        <div>
          <label htmlFor="name" style={{
            display: 'block',
            marginBottom: '0.7rem',
            fontWeight: 600,
            color: '#e2e8f0',
            fontSize: '0.95rem'
          }}>
            Full Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
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

        <div>
          <label htmlFor="confirmPassword" style={{
            display: 'block',
            marginBottom: '0.7rem',
            fontWeight: 600,
            color: '#e2e8f0',
            fontSize: '0.95rem'
          }}>
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
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
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#94a3b8' }}>
          Already have an account?{' '}
          <Link to="/signin" style={{ color: '#8b9ff3', fontWeight: 700, textDecoration: 'none' }}>
            Sign In
          </Link>
        </p>
      </form>
    </section>
  );
}
