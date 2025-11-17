// API utility for making requests to the backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const authAPI = {
  register: async (name, email, password, passwordConfirm) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password, passwordConfirm })
      });
      
      let data;
      try {
        data = await response.json();
      } catch (parseErr) {
        console.error('Failed to parse response:', parseErr);
        throw new Error('Invalid server response');
      }
      
      if (!response.ok) {
        throw new Error(data?.error || 'Registration failed');
      }
      return data;
    } catch (error) {
      console.error('Register API error:', error);
      throw error;
    }
  },

  signin: async (email, password, role = 'user') => {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password, role })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Sign in failed');
    }
    return data;
  },

  signup: async (name, email, password, passwordConfirm, role = 'user') => {
    try {
      console.log('Sending signup request:', { name, email, password: password ? '***' : undefined, passwordConfirm: passwordConfirm ? '***' : undefined, role });
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password, passwordConfirm, role })
      });
      
      console.log('Signup response status:', response.status);
      
      let data;
      try {
        data = await response.json();
      } catch (parseErr) {
        console.error('Failed to parse response:', parseErr);
        throw new Error('Invalid server response');
      }
      
      console.log('Signup response data:', data);
      
      if (!response.ok) {
        throw new Error(data?.error || 'Sign up failed');
      }
      return data;
    } catch (error) {
      console.error('Signup API error:', error);
      throw error;
    }
  },

  signout: async () => {
    const response = await fetch(`${API_URL}/auth/signout`, {
      method: 'GET',
      credentials: 'include'
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Sign out failed');
    }
    return data;
  },

  getCurrentUser: async (token) => {
    const response = await fetch(`${API_URL}/auth/user`, {
      method: 'GET',
      headers: { Authorization: token },
      credentials: 'include'
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to get current user');
    }
    return data;
  }
};

export const contactAPI = {
  list: async () => {
    const response = await fetch(`${API_URL}/contacts`, {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch contacts');
    return await response.json();
  },

  create: async (data, token) => {
    const response = await fetch(`${API_URL}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create contact');
    return await response.json();
  },

  read: async (id) => {
    const response = await fetch(`${API_URL}/contacts/${id}`, {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch contact');
    return await response.json();
  },

  update: async (id, data, token) => {
    const response = await fetch(`${API_URL}/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update contact');
    return await response.json();
  },

  delete: async (id, token) => {
    const response = await fetch(`${API_URL}/contacts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token },
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to delete contact');
    return await response.json();
  }
};

export const projectAPI = {
  list: async () => {
    const response = await fetch(`${API_URL}/projects`, {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch projects');
    return await response.json();
  },

  create: async (data, token) => {
    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.error('Create project error:', responseData);
      throw new Error(responseData.message || responseData.error || 'Failed to create project');
    }
    return responseData;
  },

  read: async (id) => {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch project');
    return await response.json();
  },

  update: async (id, data, token) => {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update project');
    return await response.json();
  },

  delete: async (id, token) => {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token },
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to delete project');
    return await response.json();
  }
};

export const servicesAPI = {
  list: async () => {
    const response = await fetch(`${API_URL}/services`, {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch services');
    return await response.json();
  },

  create: async (data, token) => {
    const response = await fetch(`${API_URL}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create service');
    return await response.json();
  },

  read: async (id) => {
    const response = await fetch(`${API_URL}/services/${id}`, {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch service');
    return await response.json();
  },

  update: async (id, data, token) => {
    const response = await fetch(`${API_URL}/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update service');
    return await response.json();
  },

  delete: async (id, token) => {
    const response = await fetch(`${API_URL}/services/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token },
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to delete service');
    return await response.json();
  }
};
