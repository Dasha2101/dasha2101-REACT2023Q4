import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterSelectionState } from './types';

const initialCharacterSelectionState: CharacterSelectionState = {
  characters: [],
};

const characterSelSlice = createSlice({
  name: 'characterSelection',
  initialState: initialCharacterSelectionState,
  reducers: {
    addCharacter(state, action: PayloadAction<number>) {
      state.characters.push(action.payload);
    },
    removeCharacter(state, action: PayloadAction<number>) {
      state.characters = state.characters.filter((id) => id !== action.payload);
    },
    clearAllCharacters(state) {
      state.characters = [];
    },
  },
});

export const { addCharacter, removeCharacter, clearAllCharacters } =
  characterSelSlice.actions;
export default characterSelSlice.reducer;
