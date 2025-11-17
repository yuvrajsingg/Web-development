import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { educationAPI } from './api';

export default function Education() {
  const { user, token } = useAuth();
  const [educations, setEducations] = useState([]);
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
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const data = await educationAPI.list();
      setEducations(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch educations:', err);
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

    if (!user || user.role !== 'admin') {
      setError('Only admins can add/edit education');
      setLoading(false);
      return;
    }

    try {
      if (editingId) {
        await educationAPI.update(editingId, formData, token);
        setSuccess('Education updated successfully!');
      } else {
        await educationAPI.create(formData, token);
        setSuccess('Education added successfully!');
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
      fetchEducations();
    } catch (err) {
      setError(err.message || 'Failed to save education');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (edu) => {
    setFormData({
      title: edu.title,
      firstname: edu.firstname,
      lastname: edu.lastname,
      email: edu.email,
      completion: edu.completion ? edu.completion.split('T')[0] : '',
      description: edu.description
    });
    setEditingId(edu._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;

    try {
      await educationAPI.delete(id, token);
      setSuccess('Education deleted successfully!');
      fetchEducations();
    } catch (err) {
      setError(err.message || 'Failed to delete education');
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
      <h2 style={{ marginBottom: '2rem', color: '#333', textAlign: 'center' }}>Education & Qualifications</h2>

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

      {user && user.role === 'admin' && (
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '2rem',
            borderRadius: '10px',
            background: '#f9f9f9',
            marginBottom: '2rem',
            border: '1px solid #ddd'
          }}
        >
          <h3>{editingId ? 'Edit Education' : 'Add Education'}</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label htmlFor="firstname">First Name</label>
              <input
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label htmlFor="lastname">Last Name</label>
              <input
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label htmlFor="completion">Completion Date</label>
              <input
                id="completion"
                name="completion"
                type="date"
                value={formData.completion}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              style={{ width: '100%', padding: '0.7rem', border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '0.7rem 1.5rem',
                background: loading ? '#ccc' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: '600'
              }}
            >
              {loading ? 'Saving...' : editingId ? 'Update' : 'Add'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  padding: '0.7rem 1.5rem',
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
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
        {educations.map(edu => (
          <div
            key={edu._id}
            style={{
              padding: '1.5rem',
              border: '1px solid #ddd',
              borderRadius: '10px',
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <h4 style={{ marginBottom: '0.5rem', color: '#333' }}>{edu.title}</h4>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
              {edu.firstname} {edu.lastname}
            </p>
            <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.5rem' }}>{edu.email}</p>
            {edu.completion && (
              <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.5rem' }}>
                Completed: {new Date(edu.completion).toLocaleDateString()}
              </p>
            )}
            <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem' }}>{edu.description}</p>
            
            {user && user.role === 'admin' && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => handleEdit(edu)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(edu._id)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {educations.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999', marginTop: '2rem' }}>
          No education records yet. {user && user.role === 'admin' ? 'Add one to get started.' : 'Sign in as admin to add.'}
        </p>
      )}
    </section>
  );
}
