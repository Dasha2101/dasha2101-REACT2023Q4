import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageState } from './types';

const initialState: ImageState = {
  base64: null,
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImageBase64(state, action: PayloadAction<string | null>) {
      state.base64 = action.payload;
    },
  },
});

export const { setImageBase64 } = imageSlice.actions;
export default imageSlice.reducer;
