import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

// Mock the api module
jest.mock('./api', () => ({
  authAPI: {
    getCurrentUser: jest.fn(),
    signin: jest.fn(),
    register: jest.fn(),
    logout: jest.fn()
  }
}));

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

const TestComponent = () => {
  const { user, token, loading } = useAuth();
  return (
    <div>
      {loading ? <p>Loading...</p> : <p>Not loading</p>}
      {user ? <p>User: {user.name}</p> : <p>No user</p>}
      {token ? <p>Token exists</p> : <p>No token</p>}
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  test('renders AuthProvider without crashing', () => {
    const { container } = render(
      <AuthProvider>
        <div>Test</div>
      </AuthProvider>
    );
    expect(container).toBeInTheDocument();
  });

  test('provides initial state', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Not loading')).toBeInTheDocument();
      expect(screen.getByText('No user')).toBeInTheDocument();
    });
  });
});
