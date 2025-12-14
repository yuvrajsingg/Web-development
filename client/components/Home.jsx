export default function Home() {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '3rem 2rem',
      minHeight: '100vh'
    }}>
      {/* Intro Section */}
      <section style={{
        marginBottom: '3rem',
        padding: '3rem',
        borderRadius: '1.2rem',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        border: '1px solid rgba(102, 126, 234, 0.2)',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 800,
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #8b9ff3 0%, #9966cc 50%, #f093fb 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>Hi, I'm Yuvraj Singh </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#e2e8f0',
          lineHeight: '1.8',
          margin: 0
        }}>
          Welcome to my personal portfolio! I'm a tech enthusiast and aspiring{' '}
          <span style={{ color: '#8b9ff3', fontWeight: 700 }}>Software Developer</span> currently pursuing a{' '}
          <span style={{ color: '#8b9ff3', fontWeight: 700 }}>Diploma in Computer Programming</span> at{' '}
          Centennial College. I enjoy transforming ideas into practical applications, solving real-world problems,
          and constantly learning new tools and technologies.
        </p>
      </section>

      {/* About Me Section */}
      <section style={{
        marginBottom: '3rem',
        padding: '3rem',
        borderRadius: '1.2rem',
        background: 'rgba(30, 33, 57, 0.5)',
        border: '1px solid rgba(102, 126, 234, 0.15)',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          color: '#8b9ff3'
        }}>Who I Am</h2>
        <p style={{
          fontSize: '1.05rem',
          color: '#e2e8f0',
          lineHeight: '1.8',
          margin: 0
        }}>
          I'm a curious learner with a strong interest in{' '}
          <span style={{ color: '#9966cc', fontWeight: 700 }}>web development, software engineering, and AI</span>.
          Over time, I've gained experience working on academic projects, group collaborations, and personal
          experiments in coding. These experiences have helped me build technical skills while also strengthening
          communication, teamwork, and adaptability.
        </p>
      </section>

      {/* Skills Section */}
      <section style={{
        marginBottom: '3rem',
        padding: '3rem',
        borderRadius: '1.2rem',
        background: 'rgba(30, 33, 57, 0.5)',
        border: '1px solid rgba(102, 126, 234, 0.15)'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          marginBottom: '2rem',
          color: '#8b9ff3',
          textAlign: 'center'
        }}>What I Do</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {[
            { icon: '', title: 'Web Development', desc: 'HTML, CSS, JavaScript, React, Flask' },
            { icon: '', title: 'Backend Programming', desc: 'Python, Java, C#' },
            { icon: '', title: 'Databases', desc: 'MySQL, SQL Server, MongoDB' },
            { icon: '', title: 'AI & Machine Learning', desc: 'Exploring ML technologies' },
            { icon: '', title: 'Cybersecurity', desc: 'Security fundamentals' },
            { icon: '', title: 'UI/UX Design', desc: 'User-friendly interfaces' }
          ].map((skill, idx) => (
            <div key={idx} style={{
              padding: '2rem',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.4)';
            }} onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.2)';
            }}>
              <span style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'block' }}>{skill.icon}</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#8b9ff3', marginBottom: '0.5rem' }}>
                {skill.title}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>{skill.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section style={{
        marginBottom: '3rem',
        padding: '3rem',
        borderRadius: '1.2rem',
        background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1) 0%, rgba(102, 126, 234, 0.1) 100%)',
        border: '1px solid rgba(102, 126, 234, 0.15)',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          color: '#8b9ff3'
        }}>Mission Statement</h2>
        <p style={{
          fontSize: '1.05rem',
          color: '#e2e8f0',
          lineHeight: '1.8',
          margin: 0
        }}>
          My mission is to grow as a versatile software professional who combines{' '}
          <span style={{ color: '#f093fb', fontWeight: 700 }}>technical expertise, creativity, and problem-solving</span>{' '}
          to deliver impactful solutions. I believe in teamwork, continuous learning, and innovation  qualities that
          drive me to contribute positively to every project I take on.
        </p>
      </section>

      {/* Vision Section */}
      <section style={{
        padding: '3rem',
        borderRadius: '1.2rem',
        background: 'rgba(30, 33, 57, 0.5)',
        border: '1px solid rgba(102, 126, 234, 0.15)',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          color: '#8b9ff3'
        }}>Looking Ahead</h2>
        <p style={{
          fontSize: '1.05rem',
          color: '#e2e8f0',
          lineHeight: '1.8',
          margin: 0
        }}>
          I aspire to build a career in <span style={{ color: '#9966cc', fontWeight: 700 }}>software development and AI</span>,
          where I can contribute to meaningful projects that improve lives through technology. My goal is to keep growing,
          experimenting, and developing solutions that are not only functional but also impactful.
        </p>
      </section>

      {/* CI/CD Update Section - Added for Assignment 4 */}
      <section style={{
        marginBottom: '3rem',
        padding: '3rem',
        borderRadius: '1.2rem',
        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
        border: '2px solid rgba(34, 197, 94, 0.3)',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          color: '#22c55e'
        }}>🚀 CI/CD Update</h2>
        <p style={{
          fontSize: '1.05rem',
          color: '#e2e8f0',
          lineHeight: '1.8',
          margin: 0
        }}>
          This section was added to demonstrate <span style={{ color: '#22c55e', fontWeight: 700 }}>Continuous Integration and Continuous Deployment (CI/CD)</span>.
          When code is pushed to GitHub, it automatically triggers a new deployment on Netlify and Render.
          This workflow ensures that updates are delivered quickly and reliably to production!
        </p>
      </section>
    </div>
  );
}
