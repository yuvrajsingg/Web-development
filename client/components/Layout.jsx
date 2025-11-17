import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../src/AuthContext.jsx';

export default function Layout() {
  const { user, signout } = useAuth();

  return (
    <>
      {/* Professional Header */}
      <header style={{
        background: 'linear-gradient(135deg, rgba(30, 33, 57, 0.95) 0%, rgba(26, 31, 58, 1) 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '2px solid rgba(102, 126, 234, 0.35)',
        padding: '1.5rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Top Section: Logo and Title */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <img src="./images/img4.png" alt="logo" height="80" width="110" />
            <h1 style={{
              margin: 0,
              fontSize: '2.5rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #8b9ff3 0%, #9966cc 50%, #f093fb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.02em'
            }}>My Portfolio</h1>
          </div>

          {/* Navigation Bar */}
          <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1.5px solid rgba(102, 126, 234, 0.25)',
            paddingTop: '1rem',
            gap: '2rem'
          }}>
            {/* Left Navigation Links */}
            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
              <Link to="/" style={{
                color: '#e2e8f0',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                paddingBottom: '0.5rem',
                position: 'relative'
              }} onMouseOver={(e) => {
                e.target.style.color = '#8b9ff3';
                e.target.style.textShadow = '0 0 10px rgba(102, 126, 234, 0.3)';
              }} onMouseOut={(e) => {
                e.target.style.color = '#e2e8f0';
                e.target.style.textShadow = 'none';
              }}>Home</Link>

              <Link to="/about" style={{
                color: '#e2e8f0',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                paddingBottom: '0.5rem'
              }} onMouseOver={(e) => {
                e.target.style.color = '#8b9ff3';
                e.target.style.textShadow = '0 0 10px rgba(102, 126, 234, 0.3)';
              }} onMouseOut={(e) => {
                e.target.style.color = '#e2e8f0';
                e.target.style.textShadow = 'none';
              }}>About</Link>

              <Link to="/project" style={{
                color: '#e2e8f0',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                paddingBottom: '0.5rem'
              }} onMouseOver={(e) => {
                e.target.style.color = '#8b9ff3';
                e.target.style.textShadow = '0 0 10px rgba(102, 126, 234, 0.3)';
              }} onMouseOut={(e) => {
                e.target.style.color = '#e2e8f0';
                e.target.style.textShadow = 'none';
              }}>Project</Link>

              <Link to="/services" style={{
                color: '#e2e8f0',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                paddingBottom: '0.5rem'
              }} onMouseOver={(e) => {
                e.target.style.color = '#8b9ff3';
                e.target.style.textShadow = '0 0 10px rgba(102, 126, 234, 0.3)';
              }} onMouseOut={(e) => {
                e.target.style.color = '#e2e8f0';
                e.target.style.textShadow = 'none';
              }}>Services</Link>

              <Link to="/contact" style={{
                color: '#e2e8f0',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                paddingBottom: '0.5rem'
              }} onMouseOver={(e) => {
                e.target.style.color = '#8b9ff3';
                e.target.style.textShadow = '0 0 10px rgba(102, 126, 234, 0.3)';
              }} onMouseOut={(e) => {
                e.target.style.color = '#e2e8f0';
                e.target.style.textShadow = 'none';
              }}>Contact</Link>
            </div>

            {/* Right Auth Section */}
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginLeft: 'auto' }}>
              {user ? (
                <>
                  <span style={{ color: '#94a3b8', fontSize: '0.95rem', fontWeight: 500 }}>👤 {user.name}</span>
                  {user.role === 'admin' && <span style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '0.4rem 1rem', borderRadius: '1.5rem', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Admin</span>}
                  <button
                    onClick={signout}
                    style={{
                      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                      border: 'none',
                      color: 'white',
                      padding: '0.65rem 1.75rem',
                      cursor: 'pointer',
                      borderRadius: '0.7rem',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(239, 68, 68, 0.35)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.5)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.35)';
                    }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/signin" style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '0.65rem 1.75rem',
                  borderRadius: '0.7rem',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  display: 'inline-block',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }} onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6)';
                }} onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                }}>Sign In</Link>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}