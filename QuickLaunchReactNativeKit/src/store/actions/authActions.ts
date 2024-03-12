import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  LoginReq,
  LoginRes,
  SocialLogInReq,
  SocialSignUpReq,
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
