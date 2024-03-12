import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  ForgotPasswordReq,
  ForgotPasswordRes,
  LoginReq,
  LoginRes,
  OTPVerificationReq,
  OTPVerificationRes,
  PasswordResetReq,
  PasswordResetRes,
  SignUpReq,
  SignUpRes,
  api,
  endPoints,
} from '../../api';

/**
 * The login function is responsible for handling the asynchronous login operation.
 */
export const login = createAsyncThunk(
  endPoints.auth.logIn,
  async (data: LoginReq, {rejectWithValue}) => {
    try {
      const res: LoginRes = await api.post(endPoints.auth.logIn, data);
      return res;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

/**
 * The signUp function is responsible for handling the asynchronous sign up operation.
 */
export const signUp = createAsyncThunk(
  endPoints.auth.signUp,
  async (data: SignUpReq, {rejectWithValue}) => {
    try {
      const res: SignUpRes = await api.post(endPoints.auth.signUp, data);
      return res;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

/**
 * The forgotPassword function is responsible for handling the asynchronous forgot password operation.
 */
export const forgotPassword = createAsyncThunk(
  endPoints.auth.forgotPassword,
  async (data: ForgotPasswordReq, {rejectWithValue}) => {
    try {
      const res: ForgotPasswordRes = await api.post(
        endPoints.auth.forgotPassword,
        data,
      );
      return res;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

/**
 * The otpVerification function is responsible for handling the asynchronous otp verification operation.
 */
export const otpVerification = createAsyncThunk(
  endPoints.auth.otpVerification,
  async (data: OTPVerificationReq, {rejectWithValue}) => {
    try {
      const res: OTPVerificationRes = await api.get(
        endPoints.auth.otpVerification,
        {params: data},
      );
      return res;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

/**
 * The passwordReset function is responsible for handling the asynchronous password reset operation.
 */
export const passwordReset = createAsyncThunk(
  endPoints.auth.passwordReset,
  async (data: PasswordResetReq, {rejectWithValue}) => {
    try {
      const res: PasswordResetRes = await api.post(
        endPoints.auth.passwordReset,
        data,
      );
      return res;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
