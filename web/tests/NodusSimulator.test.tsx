import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NodusSimulator from '../app/components/NodusSimulator';

describe('NodusSimulator', () => {
  it('renders the title', () => {
    render(<NodusSimulator />);
    expect(screen.getByText('Nodus')).toBeInTheDocument();
  });

  it('renders mood buttons for all states', () => {
    render(<NodusSimulator />);
    expect(screen.getAllByText(/happy/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/sleepy/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/thinking/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/sad/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/alert/i).length).toBeGreaterThan(0);
  });

  it('shows starting log', () => {
    render(<NodusSimulator />);
    expect(screen.getByText(/Nodus starting/)).toBeInTheDocument();
  });
});
