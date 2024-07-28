import { configureStore } from '@reduxjs/toolkit';
import pageSlice from './pageSlice';
import characterSelSlice from './characterSelSlice';
import { rickAndMortyApi } from '../services/rtkApi';

const store = configureStore({
  reducer: {
    page: pageSlice,
    characterSelection: characterSelSlice,
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
