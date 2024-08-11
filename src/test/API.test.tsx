import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RickAndMortyAPI } from '../services/api';
import { SearchDataResponse, SearchDataType } from '../services/types';

const mockFetch = vi.fn();
global.fetch = mockFetch as typeof fetch;

describe('RickAndMortyAPI', () => {
  const mockData: SearchDataResponse = {
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

  it('results successful', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const results = await RickAndMortyAPI.fetchAllResults();

    expect(results).toEqual(mockData.results);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character?page=1'
    );
  });

  it('handle fetch errors', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({}),
    } as Response);

    await expect(RickAndMortyAPI.fetchAllResults()).rejects.toThrow(
      'Failed to fetch data'
    );
  });
});
