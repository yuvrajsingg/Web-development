import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home Component', () => {
  test('renders the Home component', () => {
    render(<Home />);
    const element = screen.getByText(/Hi, I'm Yuvraj Singh/i);
    expect(element).toBeInTheDocument();
  });

  test('renders heading with correct styling', () => {
    render(<Home />);
    const heading = screen.getByText(/Hi, I'm Yuvraj Singh/i);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H1');
  });

  test('renders the component without crashing', () => {
    const { container } = render(<Home />);
    expect(container).toBeInTheDocument();
  });
});
