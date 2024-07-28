import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchComponent from '../components/serachContainer/SearhContainer';

describe('SearchComponent', () => {
  it('render input and button', () => {
    const mockOnSearch = vi.fn();
    const mockResetSearch = vi.fn();
    render(
      <SearchComponent onSearch={mockOnSearch} resetSearch={mockResetSearch} />
    );

    expect(
      screen.getByPlaceholderText('Enter your request')
    ).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('call onSearch form submit', () => {
    const mockOnSearch = vi.fn();
    const mockResetSearch = vi.fn();
    render(
      <SearchComponent onSearch={mockOnSearch} resetSearch={mockResetSearch} />
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your request'), {
      target: { value: 'Test Query' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /search/i }));
    expect(mockOnSearch).toHaveBeenCalledWith('Test Query');
  });

  it('update input value', () => {
    const mockOnSearch = vi.fn();
    const mockResetSearch = vi.fn();
    render(
      <SearchComponent onSearch={mockOnSearch} resetSearch={mockResetSearch} />
    );

    const inputElement = screen.getByPlaceholderText(
      'Enter your request'
    ) as HTMLInputElement;
    fireEvent.change(inputElement, {
      target: { value: 'Another Query' },
    });

    expect(inputElement.value).toBe('Another Query');
  });
});
