import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  it('renders correctly with providers', () => {
    render(<App />);

    const routerComponentElem = screen.getByTestId('router-component');
    expect(routerComponentElem).toBeInTheDocument();
    const themeContainerElem = screen.getByTestId('themed-container');
    expect(themeContainerElem).toBeInTheDocument();
  });
});
