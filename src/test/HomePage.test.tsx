import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from '../app/page';

vi.mock('next/navigation', () => ({
  permanentRedirect: vi.fn(),
}));

describe('Home', () => {
  it('should render the welcome message', () => {
    render(<Home />);
    const heading = screen.getByText('Welcome to My Next.js App!');
    expect(heading.textContent).toBe('Welcome to My Next.js App!');
  });
});
