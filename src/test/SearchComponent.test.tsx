import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchComponent from '../components/serachContainer/SearhContainer';
import { SearchDataType } from '../services/types';
import React from 'react';

const mockResults: Partial<SearchDataType>[] = [
  { id: 1, name: 'Rick Sanchez', image: 'image1.jpg' },
  { id: 2, name: 'Morty Smith', image: 'image2.jpg' },
];

const handleSearchSubmit = vi.fn();
vi.mock('../../hooks/useStateApp', () => ({
  __esModule: true,
  default: () => ({
    searchResults: mockResults,
    isLoading: false,
    error: null,
    handleSearch: vi.fn(),
  }),
}));

vi.mock('../../hooks/useSeacrhQuery', () => ({
  __esModule: true,
  default: () => ({
    searchQuery: '',
    handleSearchChange: vi.fn(),
    handleSearchSubmit,
  }),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe('SearchComponent', () => {
  it('renders without crashing', () => {
    render(<SearchComponent />);
    const searchInput = screen.getByPlaceholderText('Enter your request');
    const searchButton = screen.getByText('Search');

    expect(searchInput).not.toBeNull();
    expect(searchButton).not.toBeNull();
  });

  it('update input value', () => {
    render(<SearchComponent />);
    const input = screen.getByPlaceholderText(
      'Enter your request'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test query' } });
    expect(input.value).toBe('test query');
  });
  it('displays loading state', () => {
    vi.mock('../../hooks/useStateApp', () => ({
      __esModule: true,
      default: () => ({
        searchResults: [],
        isLoading: true,
        error: null,
        handleSearch: vi.fn(),
      }),
    }));

    render(<SearchComponent />);
    expect(screen.getByTestId('loading-indicator')).not.toBeNull();
  });
});
