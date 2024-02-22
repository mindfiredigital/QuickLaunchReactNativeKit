import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {UnknownAction, combineSlices} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const RESET_STATE = 'RESET_STATE';

/**
 * persistence config for auth reducer
 */
const persistAuthConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['isAuthenticated'],
};

/**
 * Combine all the reducers
 */
const appReducer = combineSlices({
  auth: persistReducer(persistAuthConfig, authReducer),
});

/**
 * Return root reduces
 * Provides method to reset redux state
 * @param state
 * @param action
 */
export const rootReducer = (state: any, action: UnknownAction) => {
  // Reset redux state
  if (action.type === RESET_STATE) {
    AsyncStorage.removeItem('persist:root');
    AsyncStorage.removeItem('persist:auth');
    state = undefined;
  }

  return appReducer(state, action);
};
