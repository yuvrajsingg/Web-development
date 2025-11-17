import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { projectAPI } from './api';

export default function Project() {
  const { user, token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    firstname: '',
    lastname: '',
    email: '',
    completion: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show sample projects immediately
    setProjects(sampleProjects);
    // Then fetch from database in the background
    fetchProjects();
  }, []);

  const sampleProjects = [
    {
      _id: 'sample1',
      title: 'AI-Powered Analytics Dashboard',
      firstname: 'Yuvraj',
      lastname: 'Singh',
      email: 'yuvraj@example.com',
      completion: '2024-11-10',
      description: 'Enterprise-grade analytics platform leveraging TypeScript, React 18, and Redux Toolkit. Integrated machine learning predictions with D3.js visualizations, real-time data streaming via WebSockets, and role-based access control. Achieved 99.2% uptime with AWS Lambda backend.'
    },
    {
      _id: 'sample2',
      title: 'Microservices Architecture Platform',
      firstname: 'Yuvraj',
      lastname: 'Singh',
      email: 'yuvraj@example.com',
      completion: '2024-10-28',
      description: 'Scalable microservices ecosystem built with Node.js, Docker, and Kubernetes. Implemented event-driven architecture using RabbitMQ, comprehensive CI/CD pipelines with GitHub Actions, and centralized logging with ELK stack. Supports 10,000+ concurrent users.'
    },
    {
      _id: 'sample3',
      title: 'FinTech Payment Gateway',
      firstname: 'Yuvraj',
      lastname: 'Singh',
      email: 'yuvraj@example.com',
      completion: '2024-10-15',
      description: 'Secure payment processing system with PCI-DSS compliance using Next.js and Express.js. Features include multi-currency support, real-time fraud detection with ML models, webhook integrations, and comprehensive transaction auditing. Processes $2M+ monthly volume.'
    },
    {
      _id: 'sample4',
      title: 'Real-Time Collaboration Suite',
      firstname: 'Yuvraj',
      lastname: 'Singh',
      email: 'yuvraj@example.com',
      completion: '2024-09-20',
      description: 'Sophisticated collaboration platform with React, Socket.io, and Firebase. Implements operational transformation for real-time document editing, video/audio calling via WebRTC, presence awareness, and conflict resolution. Used by 5,000+ teams globally.'
    },
    {
      _id: 'sample5',
      title: 'Cloud Infrastructure Management CLI',
      firstname: 'Yuvraj',
      lastname: 'Singh',
      email: 'yuvraj@example.com',
      completion: '2024-09-05',
      description: 'Comprehensive DevOps tool written in Node.js for AWS/Azure infrastructure management. Features include auto-scaling configuration, cost optimization algorithms, security scanning, and terraform integration. Published on NPM with 50K+ weekly downloads.'
    }
  ];

  const fetchProjects = async () => {
    try {
      const data = await projectAPI.list();
      if (Array.isArray(data) && data.length > 0) {
        setProjects(data);
      } else {
        // Show sample projects if no projects in database
        setProjects(sampleProjects);
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      // Show sample projects on error
      setProjects(sampleProjects);
    }
  };

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

    if (!user) {
      setError('You must be logged in to perform this action');
      setLoading(false);
      return;
    }

    // Users can only create, not edit
    if (user.role !== 'admin' && editingId) {
      setError('Only admins can edit projects');
      setLoading(false);
      return;
    }

    try {
      if (editingId) {
        // Only admins can edit
        if (user.role !== 'admin') {
          setError('Only admins can edit projects');
          setLoading(false);
          return;
        }
        await projectAPI.update(editingId, formData, token);
        setSuccess('Project updated successfully!');
      } else {
        // Both users and admins can create
        await projectAPI.create(formData, token);
        setSuccess('Project added successfully!');
      }
      
      setFormData({
        title: '',
        firstname: '',
        lastname: '',
        email: '',
        completion: '',
        description: ''
      });
      setEditingId(null);
      fetchProjects();
    } catch (err) {
      setError(err.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      firstname: project.firstname || '',
      lastname: project.lastname || '',
      email: project.email || '',
      completion: project.completion ? project.completion.split('T')[0] : '',
      description: project.description || ''
    });
    setEditingId(project._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;

    try {
      await projectAPI.delete(id, token);
      setSuccess('Project deleted successfully!');
      fetchProjects();
    } catch (err) {
      setError(err.message || 'Failed to delete project');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: '',
      firstname: '',
      lastname: '',
      email: '',
      completion: '',
      description: ''
    });
  };

  return (
    <section style={{ maxWidth: '900px', margin: '3rem auto', padding: '0 1rem' }}>
      <h2 style={{ 
        marginBottom: '2rem', 
        color: '#8b9ff3', 
        textAlign: 'center',
        fontSize: '2.5rem',
        fontWeight: 700
      }}>My Projects</h2>

      {error && (
        <div style={{ 
          color: '#d32f2f', 
          padding: '1rem', 
          marginBottom: '1rem', 
          backgroundColor: '#ffebee',
          borderRadius: '6px'
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{ 
          color: '#2e7d32', 
          padding: '1rem', 
          marginBottom: '1rem', 
          backgroundColor: '#e8f5e9',
          borderRadius: '6px'
        }}>
          {success}
        </div>
      )}

      {user && (
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '2rem',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(30, 33, 57, 0.8) 0%, rgba(26, 31, 58, 0.9) 100%)',
            marginBottom: '2rem',
            border: '1px solid rgba(102, 126, 234, 0.2)'
          }}
        >
          <h3 style={{ color: '#8b9ff3', marginBottom: '1rem' }}>
            {user.role === 'admin' && editingId ? 'Edit Project' : 'Add Project'}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label htmlFor="title" style={{ color: '#e2e8f0' }}>Project Title <span style={{ color: '#ef4444' }}>*</span></label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter project title"
                style={{ 
                  width: '100%', 
                  padding: '0.7rem', 
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  borderRadius: '6px',
                  background: 'rgba(26, 31, 58, 0.8)',
                  color: '#e2e8f0',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {user.role === 'admin' && (
              <>
                <div>
                  <label htmlFor="firstname" style={{ color: '#e2e8f0' }}>First Name</label>
                  <input
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="First name"
                    style={{ 
                      width: '100%', 
                      padding: '0.7rem', 
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '6px',
                      background: 'rgba(26, 31, 58, 0.8)',
                      color: '#e2e8f0',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="lastname" style={{ color: '#e2e8f0' }}>Last Name</label>
                  <input
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Last name"
                    style={{ 
                      width: '100%', 
                      padding: '0.7rem', 
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '6px',
                      background: 'rgba(26, 31, 58, 0.8)',
                      color: '#e2e8f0',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="email" style={{ color: '#e2e8f0' }}>Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    style={{ 
                      width: '100%', 
                      padding: '0.7rem', 
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '6px',
                      background: 'rgba(26, 31, 58, 0.8)',
                      color: '#e2e8f0',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="completion" style={{ color: '#e2e8f0' }}>Completion Date</label>
                  <input
                    id="completion"
                    name="completion"
                    type="date"
                    value={formData.completion}
                    onChange={handleChange}
                    style={{ 
                      width: '100%', 
                      padding: '0.7rem', 
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '6px',
                      background: 'rgba(26, 31, 58, 0.8)',
                      color: '#e2e8f0',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </>
            )}
          </div>

          <div>
            <label htmlFor="description" style={{ color: '#e2e8f0' }}>Description <span style={{ color: '#ef4444' }}>*</span></label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Enter project description"
              style={{ 
                width: '100%', 
                padding: '0.7rem', 
                border: '1px solid rgba(102, 126, 234, 0.2)',
                borderRadius: '6px',
                background: 'rgba(26, 31, 58, 0.8)',
                color: '#e2e8f0',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '0.7rem 1.5rem',
                background: loading ? 'rgba(102, 126, 234, 0.5)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: '600'
              }}
            >
              {loading ? 'Saving...' : editingId ? 'Update' : 'Add'}
            </button>
            {user.role === 'admin' && editingId && (
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  padding: '0.7rem 1.5rem',
                  background: 'rgba(102, 126, 234, 0.2)',
                  color: '#667eea',
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {projects.map(project => (
          <div
            key={project._id}
            style={{
              padding: '1.5rem',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(30, 33, 57, 0.8) 0%, rgba(26, 31, 58, 0.9) 100%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#667eea';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.3)';
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.2)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <h4 style={{ marginBottom: '0.5rem', color: '#8b9ff3', fontSize: '1.3rem', fontWeight: 600 }}>{project.title}</h4>
            {project.firstname && (
              <p style={{ fontSize: '0.9rem', color: '#cbd5e0', marginBottom: '0.5rem' }}>
                {project.firstname} {project.lastname}
              </p>
            )}
            {project.email && (
              <p style={{ fontSize: '0.85rem', color: '#a0aec0', marginBottom: '0.5rem' }}>{project.email}</p>
            )}
            {project.completion && (
              <p style={{ fontSize: '0.85rem', color: '#a0aec0', marginBottom: '0.5rem' }}>
                Completed: {new Date(project.completion).toLocaleDateString()}
              </p>
            )}
            {project.description && (
              <p style={{ fontSize: '0.9rem', color: '#e2e8f0', marginBottom: '1rem', lineHeight: '1.5' }}>{project.description}</p>
            )}
            
            {user && user.role === 'admin' && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => handleEdit(project)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    color: '#fca5a5',
                    border: '1px solid rgba(239, 68, 68, 0.5)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(239, 68, 68, 0.3)';
                    e.target.style.borderColor = 'rgba(239, 68, 68, 0.8)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'rgba(239, 68, 68, 0.2)';
                    e.target.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999', marginTop: '2rem' }}>
          No projects yet. {user && user.role === 'admin' ? 'Add one to get started.' : 'Sign in as admin to add.'}
        </p>
      )}
    </section>
  );
}
