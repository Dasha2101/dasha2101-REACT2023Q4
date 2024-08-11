import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useCharacterDetails from '../hooks/useCharacterDetails';
import { RickAndMortyAPI } from '../services/api';
import { SearchDataType } from '../services/types';

const mockFetchCharacter = vi.fn();
RickAndMortyAPI.fetchCharacter = mockFetchCharacter;

const mockCharacterData: SearchDataType = {
  id: 1,
  name: 'Rick Sanchez',
  species: 'Human',
  gender: 'Male',
  image: 'http://example.com/image1.jpg',
  status: 'Alive',
  type: '',
};

describe('useCharacterDetails', () => {
  beforeEach(() => {
    mockFetchCharacter.mockClear();
  });

  it('character details successful', async () => {
    mockFetchCharacter.mockResolvedValue(mockCharacterData);

    const { result } = renderHook(() =>
      useCharacterDetails({ id: '1', onClose: vi.fn() })
    );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.character).toEqual(mockCharacterData);
  });

  it('handle fetch errors', async () => {
    mockFetchCharacter.mockRejectedValue(
      new Error('Failed to fetch character')
    );

    const { result } = renderHook(() =>
      useCharacterDetails({ id: '1', onClose: vi.fn() })
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.character).toBeNull();
  });

  it('call onClose', async () => {
    const onCloseMock = vi.fn();
    const { result } = renderHook(() =>
      useCharacterDetails({ id: '1', onClose: onCloseMock })
    );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    act(() => {
      result.current.handleClose();
    });

    expect(onCloseMock).toHaveBeenCalled();
  });
});
