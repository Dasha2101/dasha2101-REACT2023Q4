import { configureStore } from '@reduxjs/toolkit';
import pageSlice from './pageSlice';
import characterSelSlice from './characterSelSlice';
import charactersSlice from './characterSlice';

const store = configureStore({
  reducer: {
    page: pageSlice,
    characterSelection: characterSelSlice,
    characters: charactersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
