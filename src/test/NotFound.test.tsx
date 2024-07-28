import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFound from '../components/nofFoundPage/NotFoundPage';

describe('NotFound Component', () => {
  it('display not found', () => {
    render(<NotFound />);

    expect(screen.getByText('404 - Not Found')).toBeTruthy();
    expect(
      screen.getByText('The page you are looking for does not exist.')
    ).toBeTruthy();
  });
});
