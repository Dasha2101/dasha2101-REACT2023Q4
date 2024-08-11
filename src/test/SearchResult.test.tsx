import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchResult from '../components/searchResult/SearchResult';
import React from 'react';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe('SearchResult', () => {
  it('displays loading state', () => {
    const onCharacterSelect = vi.fn();
    const onPageChange = vi.fn();
    const onSelectionChange = vi.fn();
    const selectedIds: string[] = [];

    render(
      <SearchResult
        results={[]}
        currentPage={1}
        onCharacterSelect={onCharacterSelect}
        onPageChange={onPageChange}
        onSelectionChange={onSelectionChange}
        selectedIds={selectedIds}
      />
    );

    expect(screen.getByTestId('loading-indicator')).not.toBeNull();
  });
});
