import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import Home from '../pages/search';

vi.mock('../../components/bundler/Bundler', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('../../components/themedWrapper/ThemedWrapper', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('../../components/serachContainer/SearhContainer', () => ({
  default: () => <div>Search Component</div>,
}));

describe('HomePage', () => {
  it('render ErrorBoundary correct', () => {
    render(<Home />);
    const errorBoundary = screen.getByText('Error on this page');
    expect(errorBoundary).not.toBeNull();
  });
});
