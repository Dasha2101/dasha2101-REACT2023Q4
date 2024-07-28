import { render, screen } from '@testing-library/react';
import SearchPage from '../pages/Search';
import { vi, describe, it, expect } from 'vitest';

vi.mock('../hooks/useStateApp', () => ({
  __esModule: true,
  default: () => ({
    isLoading: false,
    error: null,
    searchResults: [{ id: '1', name: 'Rick Sanchez' }],
    showResults: true,
    lastSearchQuery: '',
    fetchAllResults: vi.fn(),
    handleSearch: vi.fn(),
    handleResetSearch: vi.fn(),
  }),
}));

vi.mock('../hooks/useRouteParams', () => ({
  __esModule: true,
  default: () => ({
    currentPage: '1',
    selectedId: null,
  }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('SearchPage', () => {
  it('display error message', () => {
    vi.mock('../hooks/useStateApp', () => ({
      __esModule: true,
      default: () => ({
        isLoading: false,
        error: 'An error occurred',
        searchResults: [],
        showResults: false,
        lastSearchQuery: '',
        fetchAllResults: vi.fn(),
        handleSearch: vi.fn(),
        handleResetSearch: vi.fn(),
      }),
    }));

    render(<SearchPage />);
    expect(screen.getByText('An error occurred')).toBeInTheDocument();
  });
});
