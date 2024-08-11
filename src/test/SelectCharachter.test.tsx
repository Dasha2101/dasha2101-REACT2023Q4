import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import useCharacterSelection from '../hooks/useSelectCharacter';

describe('useCharacterSelection', () => {
  it('correct selectedIds', () => {
    const initialSelectedIds = ['1', '2'];
    const onSelectionChange = vi.fn();

    const { result } = renderHook(() =>
      useCharacterSelection(initialSelectedIds, onSelectionChange)
    );

    expect(result.current.selectedIds).toEqual(initialSelectedIds);
  });

  it('add ID', () => {
    const initialSelectedIds = ['1'];
    const onSelectionChange = vi.fn();

    const { result } = renderHook(() =>
      useCharacterSelection(initialSelectedIds, onSelectionChange)
    );

    act(() => {
      result.current.handleChange('2');
    });

    expect(result.current.selectedIds).toEqual(['1', '2']);
  });

  it('remove ID', () => {
    const initialSelectedIds = ['1', '2'];
    const onSelectionChange = vi.fn();

    const { result } = renderHook(() =>
      useCharacterSelection(initialSelectedIds, onSelectionChange)
    );

    act(() => {
      result.current.handleChange('2');
    });

    expect(result.current.selectedIds).toEqual(['1']);
  });

  it('clear all', () => {
    const initialSelectedIds = ['1', '2'];
    const onSelectionChange = vi.fn();

    const { result } = renderHook(() =>
      useCharacterSelection(initialSelectedIds, onSelectionChange)
    );

    act(() => {
      result.current.handleClearAll();
    });

    expect(result.current.selectedIds).toEqual([]);
  });

  it('call onSelectionChange', () => {
    const initialSelectedIds = ['1'];
    const onSelectionChange = vi.fn();

    const { result } = renderHook(() =>
      useCharacterSelection(initialSelectedIds, onSelectionChange)
    );

    act(() => {
      result.current.handleChange('2');
    });

    expect(onSelectionChange).toHaveBeenCalledWith(['1', '2']);

    act(() => {
      result.current.handleClearAll();
    });

    expect(onSelectionChange).toHaveBeenCalledWith([]);
  });
});
