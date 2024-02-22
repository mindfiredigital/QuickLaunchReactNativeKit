import {combineSlices} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './slices/authSlice';
import {persistReducer} from 'redux-persist';

// persistence config for auth reducer
const persistAuthConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['isAuthenticated'],
};

export const rootReducer = combineSlices({
  auth: persistReducer(persistAuthConfig, authReducer),
});
