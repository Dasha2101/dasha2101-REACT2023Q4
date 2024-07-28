import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchPage from '../pages/Search';
import useSearchAndFetch from '../hooks/useStateApp';

vi.mock('../hooks/useStateApp', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    isLoading: false,
    error: null,
    searchResults: [
      {
        id: 1,
        name: 'Test Character',
        species: 'Human',
        gender: 'Male',
        image: 'test.jpg',
        status: 'Alive',
        type: '',
      },
    ],
    showResults: true,
    lastSearchQuery: '',
    fetchAllResults: vi.fn(),
    handleSearch: vi.fn(),
    handleResetSearch: vi.fn(),
  })),
}));

describe('SearchPage useEffect', () => {
  it('call handleSearch if lastSearchQuery', () => {
    localStorage.setItem('lastSearchQuery', 'test query');
    const handleSearchMock = vi.fn();
    const fetchAllResultsMock = vi.fn();
    vi.mocked(useSearchAndFetch).mockReturnValue({
      isLoading: false,
      error: null,
      searchResults: [],
      showResults: false,
      lastSearchQuery: 'test query',
      fetchAllResults: fetchAllResultsMock,
      handleSearch: handleSearchMock,
      handleResetSearch: vi.fn(),
    });

    render(
      <Router>
        <SearchPage />
      </Router>
    );

    expect(handleSearchMock).toHaveBeenCalledWith('test query');
    expect(fetchAllResultsMock).not.toHaveBeenCalled();
  });

  it('call fetchAllResults lastSearchQuery null', () => {
    localStorage.removeItem('lastSearchQuery');
    const handleSearchMock = vi.fn();
    const fetchAllResultsMock = vi.fn();
    vi.mocked(useSearchAndFetch).mockReturnValue({
      isLoading: false,
      error: null,
      searchResults: [],
      showResults: false,
      lastSearchQuery: '',
      fetchAllResults: fetchAllResultsMock,
      handleSearch: handleSearchMock,
      handleResetSearch: vi.fn(),
    });

    render(
      <Router>
        <SearchPage />
      </Router>
    );
    expect(fetchAllResultsMock).toHaveBeenCalled();
    expect(handleSearchMock).not.toHaveBeenCalled();
  });
});
