import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RickAndMortyAPI } from '../services/api';
import { SearchDataResponse, SearchDataType } from '../services/types';

const mockFetch = vi.fn();
global.fetch = mockFetch as typeof fetch;

describe('RickAndMortyAPI', () => {
  const searchMockData: SearchDataResponse = {
    info: { count: 1, pages: 1, next: '3', prev: '1' },
    results: [
      {
        id: 1,
        name: 'Rick Sanchez',
        species: 'Human',
        gender: 'Male',
        image: 'http://example.com/image1.jpg',
        status: 'Alive',
        type: '',
      },
    ] as SearchDataType[],
  };

  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('search results successful', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => searchMockData,
    } as Response);

    const results = await RickAndMortyAPI.fetchSearchResults('Rick');

    expect(results).toEqual(searchMockData.results);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?name=Rick&page=1'
    );
  });

  it('handle fetch errors', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({}),
    } as Response);

    await expect(RickAndMortyAPI.fetchSearchResults('Rick')).rejects.toThrow(
      'Failed to fetch data'
    );
  });
});
