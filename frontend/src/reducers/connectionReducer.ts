import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    connectionState: false,
    socketId: '',
    groupName: 0,
}

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setConnectionState(state, action: PayloadAction<boolean>) {
      const connectionState = action.payload;
      const updatedState = {
        ...state,
        connectionState,
      };
      return updatedState;
    },
    setSocketId(state, action: PayloadAction<string>) {
      const socketId = action.payload;
      const updatedState = {
        ...state,
        socketId,
      };
      return updatedState; 
    },
    setGroupname(state, action: PayloadAction<number>) {
      const groupName = action.payload;
      const updatedState = {
        ...state,
        groupName,
      };
      return updatedState; 
    },
    reset(_state, _action) {
      return initialState;
    },
  },
})

export const { setConnectionState, setSocketId, setGroupname, reset } = connectionSlice.actions;
export default connectionSlice.reducer;