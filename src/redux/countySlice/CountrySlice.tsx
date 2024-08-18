import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Country } from './types';

interface CountryState {
  countries: Country[];
}

const initialState: CountryState = {
  countries: [
    { code: 'RUS', name: 'Russia' },
    { code: 'BEL', name: 'Belarus' },
    { code: 'UK', name: 'Ukraine' },
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'FR', name: 'France' },
  ],
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountries(state, action: PayloadAction<Country[]>) {
      state.countries = action.payload;
    },
  },
});

export const { setCountries } = countrySlice.actions;
export default countrySlice.reducer;
