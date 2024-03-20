import {createAsyncThunk} from '@reduxjs/toolkit';
import {
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
      const commonHeader = {
        'Content-Type': 'multipart/form-data',
      };
      const res: UploadProfileImageRes = await api.post(
        endPoints.app.uploadProfileImage,
        data,
      );

      return res;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
