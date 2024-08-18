import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice/FormSlice';
import imageReducer from './imageSlice/ImageSlice';
import countryReducer from './countySlice/CountrySlice';

const store = configureStore({
  reducer: {
    forms: formReducer,
    image: imageReducer,
    country: countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
