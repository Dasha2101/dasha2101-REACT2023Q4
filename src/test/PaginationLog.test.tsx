import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import usePagination from '../hooks/usePagination';
import { SearchDataType } from '../services/types';

const mockData: SearchDataType[] = Array.from({ length: 15 }, (_, index) => ({
  id: index,
  name: `Item ${index + 1}`,
  species: `Species ${index + 1}`,
  gender: `Gender ${index % 2}`,
  image: `http://example.com/image${index}.jpg`,
  status: `Status ${index % 2}`,
  type: `Type ${index % 2}`,
}));

describe('usePagination', () => {
  it('handle pagination correctly', () => {
    const { result } = renderHook(() =>
      usePagination({
        initialData: mockData,
        itemsPerPage: 5,
      })
    );

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(3);

    act(() => {
      result.current.nextPage();
    });
    expect(result.current.currentPage).toBe(2);

    act(() => {
      result.current.nextPage();
    });
    expect(result.current.currentPage).toBe(3);

    act(() => {
      result.current.nextPage();
    });
    expect(result.current.currentPage).toBe(3);

    act(() => {
      result.current.prevPage();
    });
    expect(result.current.currentPage).toBe(2);

    act(() => {
      result.current.prevPage();
    });
    expect(result.current.currentPage).toBe(1);

    act(() => {
      result.current.prevPage();
    });
    expect(result.current.currentPage).toBe(1);
  });
});
