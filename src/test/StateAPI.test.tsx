import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useSearchAndFetch from '../hooks/useStateApp';
import { RickAndMortyAPI } from '../services/api';

const mockData = [
  {
    id: 1,
    name: 'Rick Sanchez',
    species: 'Human',
    gender: 'Male',
    image: 'http://example.com/image1.jpg',
    status: 'Alive',
    type: '',
  },
];

const originalFetchAllResults = RickAndMortyAPI.fetchAllResults;

describe('useSearchAndFetch', () => {
  beforeEach(() => {
    RickAndMortyAPI.fetchAllResults = vi
      .fn()
      .mockRejectedValue(new Error('Failed to fetch'));
  });

  afterEach(() => {
    RickAndMortyAPI.fetchAllResults = originalFetchAllResults;
  });

  it('should handle errors correctly', async () => {
    const { result } = renderHook(() => useSearchAndFetch());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Error loading data: Failed to fetch');
    expect(result.current.searchResults).toEqual([]);
  });
  it('handle successful data', async () => {
    RickAndMortyAPI.fetchAllResults = vi.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useSearchAndFetch());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.searchResults).toEqual(mockData);
  });
  it('should handle search functionality', async () => {
    RickAndMortyAPI.fetchSearchResults = vi.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useSearchAndFetch());

    await act(async () => {
      result.current.handleSearch('Rick');
      await new Promise((resolve) => setTimeout(resolve, 1500));
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.searchResults).toEqual(mockData);
  });
  it('handle errors search', async () => {
    RickAndMortyAPI.fetchSearchResults = vi
      .fn()
      .mockRejectedValue(new Error('Search failed'));

    const { result } = renderHook(() => useSearchAndFetch());

    await act(async () => {
      result.current.handleSearch('Rick');
      await new Promise((resolve) => setTimeout(resolve, 1500));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Error loading data: Search failed');
    expect(result.current.searchResults).toEqual([]);
  });
});
