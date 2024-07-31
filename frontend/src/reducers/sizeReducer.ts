import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = 5;

const sizeSlice = createSlice({
  name: 'size',
  initialState,
  reducers: {
    changeSize(_state, action: PayloadAction<number>) {
      return action.payload;
    }
  },
});

export const { changeSize } = sizeSlice.actions;
export default sizeSlice.reducer;