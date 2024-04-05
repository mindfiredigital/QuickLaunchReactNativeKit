import {createSlice} from '@reduxjs/toolkit';
import {changePassword, uploadProfileImage} from 'store/actions';

export interface AppState {
  loading: boolean;
  theme: 'auto' | 'light' | 'dark';
}

const initialState: AppState = {
  loading: false,
  theme: 'auto',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateTheme: (state, {payload}: {payload: AppState['theme']}) => {
      state.theme = payload;
    },
  },
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
    builder.addCase(changePassword.pending, state => {
      state.loading = true;
    });
    builder.addCase(changePassword.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(changePassword.rejected, state => {
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {updateTheme} = appSlice.actions;
