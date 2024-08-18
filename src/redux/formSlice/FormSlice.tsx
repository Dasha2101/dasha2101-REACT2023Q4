import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Form1Data } from './types';

const initialState: Form1Data = {
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
  age: 0,
  gender: '',
  image: '',
  terms: false,
  country: '',
};

const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setForm1Data(state, action: PayloadAction<Partial<Form1Data>>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setForm1Data } = formSlice.actions;
export default formSlice.reducer;
