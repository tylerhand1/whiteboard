import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const connectionStateSlice = createSlice({
  name: 'connectionState',
  initialState: false,
  reducers: {
    changeConnection(_state, action: PayloadAction<boolean>) {
      return action.payload;
    }
  },
});

export const { changeConnection } = connectionStateSlice.actions;
export default connectionStateSlice.reducer;