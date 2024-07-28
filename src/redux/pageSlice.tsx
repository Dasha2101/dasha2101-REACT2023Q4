import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageState } from './types';

const initialPageState: PageState = {
  currentPage: 1,
};

const pageSlice = createSlice({
  name: 'page',
  initialState: initialPageState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;
