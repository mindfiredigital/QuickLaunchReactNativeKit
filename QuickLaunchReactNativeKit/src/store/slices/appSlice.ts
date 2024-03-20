import {createSlice} from '@reduxjs/toolkit';
import {getUser, updateUser} from '../actions';

export interface AppState {
  loading: boolean;
}

const initialState: AppState = {
  loading: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(getUser.rejected, state => {
      state.loading = false;
    });
    builder.addCase(updateUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(updateUser.rejected, state => {
      state.loading = false;
    });
  },
});
