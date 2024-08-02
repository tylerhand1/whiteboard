import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    connectionState: false,
    socketId: '',
    groupName: 0,
    isLoaded: false,
    error: false
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
    setIsLoaded(state, action: PayloadAction<boolean>) {
      const isLoaded = action.payload;
      const updatedState = {
        ...state,
        isLoaded,
      };
      return updatedState; 
    },
    setError(state, action: PayloadAction<boolean>) {
      const error = action.payload;
      const updatedState = {
        ...state,
        error,
      };
      return updatedState; 
    },
    resetConnection(_state) {
      return initialState;
    },
  },
})

export const { setConnectionState, setSocketId, setGroupname, setIsLoaded, setError, resetConnection } = connectionSlice.actions;
export default connectionSlice.reducer;