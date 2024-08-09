import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ErrorBoundary from '../components/bundler/Bundler';

const ErrorThrowingComponent: React.FC = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('render error message', () => {
    const onReset = vi.fn();

    render(
      <ErrorBoundary
        errorMessage="An error has occurred"
        onReset={onReset}
        hasError={true}
      >
        <div>Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeTruthy();
    expect(screen.getByText('An error has occurred')).toBeTruthy();
    expect(screen.getByText('Try again')).toBeTruthy();

    fireEvent.click(screen.getByText('Try again'));

    expect(onReset).toHaveBeenCalled();
  });
  it('render when an error thrown child component', () => {
    const onReset = vi.fn();

    render(
      <ErrorBoundary
        errorMessage="An error has occurred"
        onReset={onReset}
        hasError={false}
      >
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeTruthy();
    expect(screen.getByText('An error has occurred')).toBeTruthy();
    expect(screen.getByText('Try again')).toBeTruthy();
  });

  it('reset error state', () => {
    const onReset = vi.fn();
    const { rerender } = render(
      <ErrorBoundary
        errorMessage="An error has occurred"
        onReset={onReset}
        hasError={true}
      >
        <div>Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeTruthy();
    rerender(
      <ErrorBoundary
        errorMessage="An error has occurred"
        onReset={onReset}
        hasError={false}
      >
        <div>Component</div>
      </ErrorBoundary>
    );
    expect(screen.queryByText('Something went wrong')).toBeNull();
  });
});
