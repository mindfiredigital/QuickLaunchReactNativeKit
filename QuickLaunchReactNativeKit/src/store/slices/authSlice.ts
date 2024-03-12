import {createSlice} from '@reduxjs/toolkit';
import {UserObj} from '../../api';
import {
  forgotPassword,
  login,
  otpVerification,
  passwordReset,
  signUp,
} from '../actions';

export interface AuthState {
  isAuthenticated: boolean;
  user: UserObj;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  user: {
    email: '',
    full_name: '',
    phone_number: '',
    profileSignedUrl: '',
    token: '',
    access_token: '',
    refresh_token: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setISAuthenticated: (state, {payload}: {payload: boolean}) => {
      state.isAuthenticated = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, {payload}) => {
      state.loading = false;
      if (payload?.data) {
        state.isAuthenticated = true;
        state.user = payload.data;
      }
    });
    builder.addCase(login.rejected, state => {
      state.isAuthenticated = false;
      state.loading = false;
    });
    builder.addCase(signUp.pending, state => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(signUp.rejected, state => {
      state.loading = false;
    });
    builder.addCase(forgotPassword.pending, state => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, {payload}) => {
      state.loading = false;
    });
    builder.addCase(forgotPassword.rejected, state => {
      state.loading = false;
    });
    builder.addCase(otpVerification.pending, state => {
      state.loading = true;
    });
    builder.addCase(otpVerification.fulfilled, (state, {payload}) => {
      state.loading = false;
    });
    builder.addCase(otpVerification.rejected, state => {
      state.loading = false;
    });
    builder.addCase(passwordReset.pending, state => {
      state.loading = true;
    });
    builder.addCase(passwordReset.fulfilled, (state, {payload}) => {
      state.loading = false;
    });
    builder.addCase(passwordReset.rejected, state => {
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {setISAuthenticated} = authSlice.actions;
