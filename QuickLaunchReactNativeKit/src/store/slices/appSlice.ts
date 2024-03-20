import {createSlice} from '@reduxjs/toolkit';
import {uploadProfileImage} from '../actions';

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
    builder.addCase(uploadProfileImage.pending, state => {
      state.loading = true;
    });
    builder.addCase(uploadProfileImage.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(uploadProfileImage.rejected, state => {
      state.loading = false;
    });
  },
});
