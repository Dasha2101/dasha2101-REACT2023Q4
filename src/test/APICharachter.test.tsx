import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RickAndMortyAPI } from '../services/api';

const mockFetch = vi.fn();
global.fetch = mockFetch as unknown as typeof fetch;

describe('RickAndMortyAPI', () => {
  const characterMock = {
    id: 1,
    name: 'Rick Sanchez',
    species: 'Human',
    gender: 'Male',
    image: 'http://example.com/image1.jpg',
    status: 'Alive',
    type: '',
  };

  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('character details successful', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => characterMock,
    } as Response);

    const character = await RickAndMortyAPI.fetchCharacter(1);

    expect(character).toEqual(characterMock);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/1'
    );
  });

  it('handle fetch errors', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({}),
    } as Response);

    await expect(RickAndMortyAPI.fetchCharacter(1)).rejects.toThrow(
      'Failed to fetch character details'
    );
  });
});
