import {createSlice} from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setISAuthenticated: (state, {payload}: {payload: boolean}) => {
      state.isAuthenticated = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setISAuthenticated} = authSlice.actions;

export default authSlice.reducer;
