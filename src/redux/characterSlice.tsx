import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character, CharactersState } from './types';

const initialCharactersState: CharactersState = {
  characters: [],
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState: initialCharactersState,
  reducers: {
    setCharacters(state, action: PayloadAction<Character[]>) {
      state.characters = action.payload;
    },
  },
});

export const { setCharacters } = charactersSlice.actions;
export default charactersSlice.reducer;
