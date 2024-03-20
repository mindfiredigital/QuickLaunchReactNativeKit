import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  ChangePasswordRes,
  LoginRes,
  UploadProfileImageReq,
  UploadProfileImageRes,
  api,
  endPoints,
} from '../../api';

/**
 * The uploadProfileImage function is responsible for handling the asynchronous update user profile image operation.
 */
export const uploadProfileImage = createAsyncThunk(
  endPoints.app.uploadProfileImage,
  async (data: UploadProfileImageReq, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      formData.append('image', data);
      const res: UploadProfileImageRes = await api.post(
        endPoints.app.uploadProfileImage,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      return res;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

/**
 * The changePassword function is responsible for handling the update of asynchronous user account password.
 */
export const changePassword = createAsyncThunk(
  endPoints.app.changePassword,
  async (data: ChangePasswordRes, {rejectWithValue}) => {
    try {
      const res: LoginRes = await api.post(endPoints.app.changePassword, data);

      return res;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
