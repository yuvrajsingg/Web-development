import React from 'react';

export default function About() {
  return (
    <section style={{ padding: '3rem 2rem' }}>
      <h2 style={{
        fontSize: '2.5rem',
        fontWeight: 700,
        color: '#8b9ff3',
        marginBottom: '3rem'
      }}>About Me</h2>
      
      <div style={{
        display: 'flex',
        gap: '3rem',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
      }}>
        {/* Photo Section */}
        <div style={{
          flex: '0 0 300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <img 
            src="/images/profile-placeholder.jpg" 
            alt="My headshot" 
            style={{
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid #667eea',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
            }}
          />
        </div>

        {/* Text Section */}
        <div style={{
          flex: '1',
          minWidth: '300px'
        }}>
          <p style={{
            fontSize: '1.1rem',
            marginBottom: '1.5rem',
            color: '#e2e8f0',
            lineHeight: '1.8'
          }}>
            <strong style={{ color: '#8b9ff3' }}>Legal Name:</strong> Yuvraj Singh
          </p>
          
          <p style={{
            fontSize: '1rem',
            marginBottom: '1.5rem',
            color: '#cbd5e0',
            lineHeight: '1.8'
          }}>
            My journey into technology started with a deep curiosity for how software powers the world around us. Over time, that curiosity turned into a passion for <strong style={{ color: '#f093fb' }}>programming, problem-solving, and creating tools that make life easier</strong>.
          </p>
          
          <p style={{
            fontSize: '1rem',
            marginBottom: '1.5rem',
            color: '#cbd5e0',
            lineHeight: '1.8'
          }}>
            Beyond coding, I value <strong style={{ color: '#f093fb' }}>teamwork, creativity, and continuous learning</strong>. I believe every project is an opportunity not only to sharpen my technical skills but also to grow as a collaborator and innovator.
          </p>
          
          <p style={{
            fontSize: '1rem',
            marginBottom: '2rem',
            color: '#cbd5e0',
            lineHeight: '1.8'
          }}>
            When I'm not working on projects, I enjoy exploring new technologies, experimenting with ideas, and building small applications that challenge my thinking. I also take inspiration from fields like <em style={{ color: '#94a3b8' }}>cybersecurity, AI, and cloud computing</em>, which I'm eager to explore further in my career.
          </p>
          
          <a 
            href="/images/resume1.pdf" 
            target="_blank" 
            rel="noreferrer"
            style={{
              display: 'inline-block',
              padding: '0.9rem 2rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '0.7rem',
              fontWeight: 700,
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
            }}
          >
            Download Resume (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
