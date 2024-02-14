import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  value: number;
}

const initialState: AuthState = {
  value: 1,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment } = authSlice.actions;

export default authSlice.reducer;
