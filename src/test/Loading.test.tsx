import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loading from '../components/loading/Loading';

describe('Loading Component', () => {
  it('renders correctly', () => {
    render(<Loading />);

    const loadingIndicator = screen.getByTestId('loading-indicator');
    expect(loadingIndicator).not.toBeNull();

    const loader = screen.getByTestId('loading-indicator');
    expect(loader).not.toBeNull();
  });
});
