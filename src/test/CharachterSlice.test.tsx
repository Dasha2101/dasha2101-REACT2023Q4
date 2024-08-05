import { describe, it, expect } from 'vitest';
import charactersReducer, { setCharacters } from '../redux/characterSlice';
import { Character, CharactersState } from '../redux/types';

const initialCharactersState: CharactersState = {
  characters: [],
};

describe('charactersSlice', () => {
  it('handle initial state', () => {
    const action = { type: 'string' };
    expect(charactersReducer(undefined, action)).toEqual(
      initialCharactersState
    );
  });

  it('handle setCharacters', () => {
    const characters: Character[] = [
      { id: 1, name: 'Rick', series: 'new' },
      { id: 2, name: 'Morty', series: 'new' },
    ];

    const newState = charactersReducer(
      initialCharactersState,
      setCharacters(characters)
    );
    expect(newState.characters).toEqual(characters);
  });
});
