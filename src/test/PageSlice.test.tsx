import { describe, it, expect } from 'vitest';
import { PageState } from '../redux/types';
import pageReducer, { setPage } from '../redux/pageSlice';

const initialPageState: PageState = {
  currentPage: 1,
};

describe('pageSlice', () => {
  it('handle initial state', () => {
    const action = { type: 'string' };
    expect(pageReducer(initialPageState, action)).toEqual(initialPageState);
  });

  it('handle setPage', () => {
    const newState = pageReducer(initialPageState, setPage(2));
    expect(newState.currentPage).toBe(2);
  });
});
