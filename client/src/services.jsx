import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { servicesAPI } from './api';

export default function Services() {
  const { user, token } = useAuth();
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    features: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show sample services immediately
    setServices(sampleServices);
    // Then fetch from database in the background
    fetchServices();
  }, []);

  const sampleServices = [
    {
      _id: 'sample1',
      title: 'Full-Stack Web Development',
      description: 'Custom web applications built with modern technologies including React, Node.js, TypeScript, and MongoDB. Includes UI/UX design, API development, database architecture, and deployment.',
      price: '$5,000 - $25,000',
      duration: '4-12 weeks',
      features: 'Responsive Design, RESTful APIs, Authentication & Authorization, Database Design, Performance Optimization, Testing & QA'
    },
    {
      _id: 'sample2',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android. Built with React Native or Flutter, featuring offline capabilities, push notifications, and third-party integrations.',
      price: '$8,000 - $30,000',
      duration: '6-16 weeks',
      features: 'Cross-platform Support, Push Notifications, Offline Sync, App Store Deployment, Analytics Integration, Security & Encryption'
    },
    {
      _id: 'sample3',
      title: 'Cloud Architecture & DevOps',
      description: 'Design and implementation of scalable cloud infrastructure on AWS, Azure, or GCP. Includes CI/CD pipelines, containerization, monitoring, and security hardening.',
      price: '$3,000 - $15,000',
      duration: '2-8 weeks',
      features: 'Infrastructure as Code, Docker & Kubernetes, CI/CD Pipelines, Monitoring & Logging, Auto-scaling, Security Compliance'
    },
    {
      _id: 'sample4',
      title: 'AI & Machine Learning Integration',
      description: 'Integration of machine learning models and AI services into applications. Includes data pipeline setup, model training, deployment, and optimization for production use.',
      price: '$6,000 - $20,000',
      duration: '4-10 weeks',
      features: 'Data Pipeline Setup, Model Training, Real-time Predictions, API Integration, Performance Tuning, Model Monitoring'
    },
    {
      _id: 'sample5',
      title: 'System Architecture Consulting',
      description: 'Expert consultation on designing scalable, maintainable system architectures. Includes technology selection, design patterns, performance optimization, and security considerations.',
      price: '$2,000 - $10,000',
      duration: '1-6 weeks',
      features: 'Technology Assessment, Design Patterns, Scalability Planning, Security Architecture, Performance Optimization, Documentation'
    }
  ];

  const fetchServices = async () => {
    try {
      const data = await servicesAPI.list();
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch services:', err);
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
      setError('Only admins can edit services');
      setLoading(false);
      return;
    }

    try {
      if (editingId) {
        // Only admins can edit
        if (user.role !== 'admin') {
          setError('Only admins can edit services');
          setLoading(false);
          return;
        }
        await servicesAPI.update(editingId, formData, token);
        setSuccess('Service updated successfully!');
      } else {
        // Both users and admins can create
        await servicesAPI.create(formData, token);
        setSuccess('Service added successfully!');
      }
      
      setFormData({
        title: '',
        description: '',
        price: '',
        duration: '',
        features: ''
      });
      setEditingId(null);
      fetchServices();
    } catch (err) {
      setError(err.message || 'Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price,
      duration: service.duration,
      features: service.features
    });
    setEditingId(service._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;

    try {
      await servicesAPI.delete(id, token);
      setSuccess('Service deleted successfully!');
      fetchServices();
    } catch (err) {
      setError(err.message || 'Failed to delete service');
    }
  };

  return (
    <section style={{ 
      maxWidth: '1000px', 
      margin: '3rem auto', 
      padding: '0 2rem'
    }}>
      <h2 style={{
        marginBottom: '2rem',
        color: '#8b9ff3',
        fontSize: '2.5rem',
        fontWeight: 700,
        textAlign: 'center'
      }}>
        Services
      </h2>

      {user && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 33, 57, 0.8) 0%, rgba(26, 31, 58, 0.9) 100%)',
          padding: '2rem',
          borderRadius: '1rem',
          marginBottom: '2rem',
          border: '1px solid rgba(102, 126, 234, 0.2)'
        }}>
          <h3 style={{ color: '#8b9ff3', marginBottom: '1.5rem' }}>
            {user.role === 'admin' && editingId ? 'Edit Service' : 'Add Service'}
          </h3>

          {error && (
            <div style={{ 
              color: '#fca5a5', 
              padding: '1rem', 
              marginBottom: '1rem', 
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '0.5rem',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{ 
              color: '#86efac', 
              padding: '1rem', 
              marginBottom: '1rem', 
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              borderRadius: '0.5rem',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ color: '#e2e8f0', display: 'block', marginBottom: '0.5rem' }}>Service Title <span style={{ color: '#ef4444' }}>*</span></label>
              <input
                type="text"
                name="title"
                placeholder="Enter service title"
                value={formData.title}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  borderRadius: '0.5rem',
                  background: 'rgba(26, 31, 58, 0.8)',
                  color: '#e2e8f0',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ color: '#e2e8f0', display: 'block', marginBottom: '0.5rem' }}>Description <span style={{ color: '#ef4444' }}>*</span></label>
              <textarea
                name="description"
                placeholder="Enter service description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  borderRadius: '0.5rem',
                  background: 'rgba(26, 31, 58, 0.8)',
                  color: '#e2e8f0',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {user.role === 'admin' && (
              <>
                <div>
                  <label style={{ color: '#e2e8f0', display: 'block', marginBottom: '0.5rem' }}>Price</label>
                  <input
                    type="text"
                    name="price"
                    placeholder="Price (e.g., $500)"
                    value={formData.price}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '0.5rem',
                      background: 'rgba(26, 31, 58, 0.8)',
                      color: '#e2e8f0',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ color: '#e2e8f0', display: 'block', marginBottom: '0.5rem' }}>Duration</label>
                  <input
                    type="text"
                    name="duration"
                    placeholder="Duration (e.g., 2 weeks)"
                    value={formData.duration}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '0.5rem',
                      background: 'rgba(26, 31, 58, 0.8)',
                      color: '#e2e8f0',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </>
            )}

            {user.role === 'admin' && (
              <div>
                <label style={{ color: '#e2e8f0', display: 'block', marginBottom: '0.5rem' }}>Features</label>
                <textarea
                  name="features"
                  placeholder="Features (comma separated)"
                  value={formData.features}
                  onChange={handleChange}
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: '0.5rem',
                    background: 'rgba(26, 31, 58, 0.8)',
                    color: '#e2e8f0',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '0.8rem 2rem',
                  background: loading ? 'rgba(102, 126, 234, 0.5)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff',
                  fontWeight: 700,
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '1rem'
                }}
              >
                {loading ? 'Saving...' : editingId ? 'Update Service' : 'Add Service'}
              </button>

              {user.role === 'admin' && editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ title: '', description: '', price: '', duration: '', features: '' });
                  }}
                  style={{
                    padding: '0.8rem 2rem',
                    background: 'rgba(102, 126, 234, 0.2)',
                    color: '#667eea',
                    fontWeight: 700,
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gap: '2rem' }}>
        {services.length > 0 ? (
          services.map((service) => (
            <div
              key={service._id}
              style={{
                background: 'linear-gradient(135deg, rgba(30, 33, 57, 0.6) 0%, rgba(26, 31, 58, 0.7) 100%)',
                padding: '2rem',
                borderRadius: '1rem',
                border: '1px solid rgba(102, 126, 234, 0.2)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
              }}
            >
              <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>{service.title}</h3>
              <p style={{ color: '#cbd5e0', marginBottom: '1rem' }}>{service.description}</p>
              
              {service.price && (
                <p style={{ color: '#f093fb', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Price: {service.price}
                </p>
              )}
              
              {service.duration && (
                <p style={{ color: '#8b9ff3', marginBottom: '0.5rem' }}>
                  Duration: {service.duration}
                </p>
              )}
              
              {service.features && (
                <div style={{ marginTop: '1rem' }}>
                  <p style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: '0.5rem' }}>Features:</p>
                  <p style={{ color: '#cbd5e0' }}>{service.features}</p>
                </div>
              )}

              {user && user.role === 'admin' && (
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <button
                    onClick={() => handleEdit(service)}
                    style={{
                      padding: '0.6rem 1.2rem',
                      background: 'rgba(102, 126, 234, 0.3)',
                      color: '#667eea',
                      fontWeight: 600,
                      border: '1px solid rgba(102, 126, 234, 0.5)',
                      borderRadius: '0.4rem',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    style={{
                      padding: '0.6rem 1.2rem',
                      background: 'rgba(239, 68, 68, 0.2)',
                      color: '#fca5a5',
                      fontWeight: 600,
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '0.4rem',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#cbd5e0', padding: '2rem' }}>
            No services yet. {user && user.role === 'admin' && 'Add one above!'}
          </p>
        )}
      </div>
    </section>
  );
}
