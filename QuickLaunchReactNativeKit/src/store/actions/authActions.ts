import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  ForgotPasswordReq,
  OTPVerificationReq,
  PasswordResetReq,
  SignUpReq,
  LoginReq,
  LoginRes,
  SocialLogInReq,
  SocialSignUpReq,
  api,
  endPoints,
  UpdateUserReq,
  GetUserRes,
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
      const res: LoginRes = await api.post(endPoints.auth.signUp, data);
      return res;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

/*
 * The socialSignUp function is responsible for handling the asynchronous social sign-up operation.
 */
export const socialSignUp = createAsyncThunk(
  endPoints.auth.socialSignUp,
  async (data: SocialSignUpReq, {rejectWithValue}) => {
    try {
      const res: LoginRes = await api.post(endPoints.auth.socialSignUp, data);
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
      const res: LoginRes = await api.post(endPoints.auth.forgotPassword, data);
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
      const res: LoginRes = await api.get(endPoints.auth.otpVerification, {
        params: data,
      });
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
      const res: LoginRes = await api.post(endPoints.auth.passwordReset, data);
      return res;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

/*
 * The socialLogIn function is responsible for handling the asynchronous social login operation.
 */
export const socialLogIn = createAsyncThunk(
  endPoints.auth.socialLogIn,
  async (data: SocialLogInReq, {rejectWithValue}) => {
    try {
      const res: LoginRes = await api.post(endPoints.auth.socialLogIn, data);
      return res;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

/**
 * The getUser function is responsible for handling the asynchronous get user details operation.
 */
export const getUser = createAsyncThunk(
  endPoints.auth.getUser,
  async (data, {rejectWithValue}) => {
    try {
      const res: GetUserRes = await api.get(endPoints.auth.getUser);
      return res;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

/**
 * The updateUser function is responsible for handling the asynchronous update user operation.
 */
export const updateUser = createAsyncThunk(
  endPoints.auth.updateUser,
  async (data: UpdateUserReq, {rejectWithValue}) => {
    try {
      const res: LoginRes = await api.post(endPoints.auth.updateUser, data);

      return res;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
