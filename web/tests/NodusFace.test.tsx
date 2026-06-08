import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NodusFace from '../app/components/NodusFace';

describe('NodusFace', () => {
  it('renders the happy face', () => {
    render(<NodusFace mood="happy" />);
    expect(screen.getByText('(^^)')).toBeInTheDocument();
  });

  it('renders the sad face', () => {
    render(<NodusFace mood="sad" />);
    expect(screen.getByText('(T_T)')).toBeInTheDocument();
  });

  it('renders the alert face', () => {
    render(<NodusFace mood="alert" />);
    expect(screen.getByText('(><)')).toBeInTheDocument();
  });
});
