import {
  configureStore,
  createAction,
  createReducer,
  PayloadAction,
} from '@reduxjs/toolkit';

export interface Character {
  id: number;
  name: string;
  series: string;
}

interface State {
  characters: number[];
}

const initialState: State = {
  characters: [],
};

export const addCharacter = createAction<number>('ADD_CHARACTER');
export const removeCharacter = createAction<number>('REMOVE_CHARACTER');
export const clearAllCharacters = createAction('CLEAR_ALL_CHARACTERS');

const characterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addCharacter, (state, action: PayloadAction<number>) => {
      state.characters.push(action.payload);
    })
    .addCase(removeCharacter, (state, action: PayloadAction<number>) => {
      state.characters = state.characters.filter((id) => id !== action.payload);
    })
    .addCase(clearAllCharacters, (state) => {
      state.characters = [];
    });
});

const store = configureStore({
  reducer: {
    character: characterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
