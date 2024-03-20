import {createSlice} from '@reduxjs/toolkit';
import {UserObj} from '../../api';
import {
  forgotPassword,
  login,
  otpVerification,
  passwordReset,
  signUp,
  socialSignUp,
  socialLogIn,
  getUser,
  updateUser,
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
    builder.addCase(forgotPassword.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(forgotPassword.rejected, state => {
      state.loading = false;
    });
    builder.addCase(otpVerification.pending, state => {
      state.loading = true;
    });
    builder.addCase(otpVerification.fulfilled, state => {
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
    }),
      builder.addCase(socialSignUp.pending, state => {
        state.loading = true;
      });
    builder.addCase(socialSignUp.fulfilled, (state, {payload}) => {
      state.loading = false;
      if (payload?.data) {
        state.isAuthenticated = true;
        state.user = payload.data;
      }
    });
    builder.addCase(socialSignUp.rejected, state => {
      state.loading = false;
    });
    builder.addCase(socialLogIn.pending, state => {
      state.loading = true;
    });
    builder.addCase(socialLogIn.fulfilled, (state, {payload}) => {
      state.loading = false;
      if (payload?.data) {
        state.isAuthenticated = true;
        state.user = payload.data;
      }
    });
    builder.addCase(socialLogIn.rejected, state => {
      state.loading = false;
    });
    builder.addCase(getUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, {payload}) => {
      state.loading = false;
      if (payload.data) {
        state.user = {...state.user, ...payload.data};
      }
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

// Action creators are generated for each case reducer function
export const {setISAuthenticated} = authSlice.actions;
