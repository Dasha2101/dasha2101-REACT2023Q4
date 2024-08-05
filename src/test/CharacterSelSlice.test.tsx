import { describe, it, expect } from 'vitest';
import characterSelReducer, {
  addCharacter,
  removeCharacter,
  clearAllCharacters,
} from '../redux/characterSelSlice';
import { CharacterSelectionState } from '../redux/types';

const initialCharacter: CharacterSelectionState = {
  characters: [],
};

const testCharacterId = 1;
const testCharacters = [1, 2, 3];

describe('characterSelSlice', () => {
  it('handle addCharacter', () => {
    const newState = characterSelReducer(
      initialCharacter,
      addCharacter(testCharacterId)
    );
    expect(newState.characters).toContain(testCharacterId);
  });

  it('handle removeCharacter', () => {
    const initialStateChar = { characters: testCharacters };
    const newState = characterSelReducer(initialStateChar, removeCharacter(2));
    expect(newState.characters).not.toContain(2);
    expect(newState.characters).toEqual([1, 3]);
  });

  it('handle clearAllCharacters', () => {
    const initialStateChar = { characters: testCharacters };
    const newState = characterSelReducer(
      initialStateChar,
      clearAllCharacters()
    );
    expect(newState.characters).toEqual([]);
  });
});
