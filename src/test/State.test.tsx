import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useSearchAndFetch from '../hooks/useStateApp';
import { RickAndMortyAPI } from '../services/api';

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

  it('reset search correct', async () => {
    const { result } = renderHook(() => useSearchAndFetch());

    act(() => {
      result.current.handleResetSearch();
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.searchResults).toEqual([]);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(result.current.isLoading).toBe(false);
  });
});
