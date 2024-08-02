import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const colorSlice = createSlice({
  name: 'color',
  initialState: 'black',
  reducers: {
    changeColor(_state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { changeColor } = colorSlice.actions;
export default colorSlice.reducer;