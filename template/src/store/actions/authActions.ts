import {createAsyncThunk} from '@reduxjs/toolkit';
import {LoginReq, LoginRes, api, endPoints} from '../../api';

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
