import { describe, it, expect } from 'vitest';
import store, { RootState } from '../redux/store';
import { setPage } from '../redux/pageSlice';
import { setCharacters } from '../redux/characterSlice';
import {
  addCharacter,
  removeCharacter,
  clearAllCharacters,
} from '../redux/characterSelSlice';
import {
  PageState,
  CharactersState,
  CharacterSelectionState,
} from '../redux/types';

const initialPageState: PageState = { currentPage: 1 };
const initialCharactersState: CharactersState = { characters: [] };
const initialCharacterSelectionState: CharacterSelectionState = {
  characters: [],
};

describe('Redux store', () => {
  it('configure reducers correctly', () => {
    const state: RootState = store.getState();
    expect(state).toHaveProperty('page');
    expect(state).toHaveProperty('characters');
    expect(state).toHaveProperty('characterSelection');
  });

  it('initial state', () => {
    const state: RootState = store.getState();

    expect(state.page).toEqual(initialPageState);
    expect(state.characters).toEqual(initialCharactersState);
    expect(state.characterSelection).toEqual(initialCharacterSelectionState);
  });

  it('setPage action', () => {
    store.dispatch(setPage(5));
    const state: RootState = store.getState();
    expect(state.page.currentPage).toBe(5);
  });

  it('setCharacters action', () => {
    const characters = [
      { id: 1, name: 'Rick', series: 'Series A' },
      { id: 2, name: 'Morty', series: 'Series B' },
    ];
    store.dispatch(setCharacters(characters));
    const state: RootState = store.getState();
    expect(state.characters.characters).toEqual(characters);
  });

  it('addCharacter action', () => {
    store.dispatch(addCharacter(1));
    const state: RootState = store.getState();
    expect(state.characterSelection.characters).toContain(1);
  });

  it('removeCharacter action', () => {
    store.dispatch(addCharacter(2));
    store.dispatch(removeCharacter(2));
    const state: RootState = store.getState();
    expect(state.characterSelection.characters).not.toContain(2);
  });

  it('clearAllCharacters action', () => {
    store.dispatch(addCharacter(3));
    store.dispatch(clearAllCharacters());
    const state: RootState = store.getState();
    expect(state.characterSelection.characters).toHaveLength(0);
  });
});
