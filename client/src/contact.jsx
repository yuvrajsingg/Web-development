import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { contactAPI } from './api';

export default function Contact() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    message: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate form
      if (!formData.firstname || !formData.lastname || !formData.email || !formData.message) {
        setError('All fields are required');
        setLoading(false);
        return;
      }

      // Hardcoded success message
      setSuccess('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ firstname: '', lastname: '', email: '', message: '' });
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ 
      maxWidth: '800px', 
      margin: '3rem auto', 
      padding: '0 2rem',
      textAlign: 'center'
    }}>
      <h2 style={{
        marginBottom: '1rem',
        color: '#8b9ff3',
        fontSize: '2.5rem',
        fontWeight: 700
      }}>Get In Touch</h2>
      
      <p style={{
        marginBottom: '3rem',
        color: '#cbd5e0',
        fontSize: '1.1rem',
        lineHeight: '1.6'
      }}>
        Have a question or want to collaborate? Fill out the form below and I'll get back to you soon.
      </p>

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

      {success && (
        <div style={{ 
          color: '#86efac', 
          padding: '1rem', 
          marginBottom: '1.5rem', 
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          borderRadius: '0.6rem',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderLeft: '4px solid #22c55e'
        }}>
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          padding: '2.5rem',
          borderRadius: '1.2rem',
          background: 'linear-gradient(135deg, rgba(30, 33, 57, 0.8) 0%, rgba(26, 31, 58, 0.9) 100%)',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label htmlFor="firstname" style={{
              display: 'block',
              marginBottom: '0.7rem',
              fontWeight: 600,
              color: '#e2e8f0',
              fontSize: '0.95rem'
            }}>
              First Name
            </label>
            <input
              id="firstname"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
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
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label htmlFor="lastname" style={{
              display: 'block',
              marginBottom: '0.7rem',
              fontWeight: 600,
              color: '#e2e8f0',
              fontSize: '0.95rem'
            }}>
              Last Name
            </label>
            <input
              id="lastname"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
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
            name="email"
            placeholder="your.email@example.com"
            type="email"
            value={formData.email}
            onChange={handleChange}
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
          <label htmlFor="message" style={{
            display: 'block',
            marginBottom: '0.7rem',
            fontWeight: 600,
            color: '#e2e8f0',
            fontSize: '0.95rem'
          }}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell me about your project or inquiry..."
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            style={{ 
              width: '100%', 
              padding: '0.9rem',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              borderRadius: '0.6rem',
              fontSize: '1rem',
              background: 'rgba(26, 31, 58, 0.8)',
              color: '#e2e8f0',
              transition: 'all 0.3s ease',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
              resize: 'vertical'
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

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.5rem' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '1rem 2rem',
              background: loading ? 'rgba(102, 126, 234, 0.5)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              fontWeight: 700,
              border: 'none',
              borderRadius: '0.7rem',
              fontSize: '1.05rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
            onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)')}
            onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)')}
          >
            {loading ? 'Submitting...' : 'Send Message'}
          </button>
          <button
            type="reset"
            style={{
              padding: '1rem 2rem',
              background: 'transparent',
              border: '2px solid rgba(102, 126, 234, 0.4)',
              color: '#8b9ff3',
              borderRadius: '0.7rem',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '1.05rem',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(102, 126, 234, 0.1)';
              e.target.style.borderColor = '#667eea';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.borderColor = 'rgba(102, 126, 234, 0.4)';
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </section>
  );
}
