import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {UnknownAction, combineSlices} from '@reduxjs/toolkit';
import {authSlice, appSlice} from './slices';

export const RESET_STATE = 'RESET_STATE';

/**
 * Action creator to reset Redux state to its initial state.
 * This function should be used when the user logs out from the app,
 * ensuring that sensitive user data is cleared from the state.
 *
 * @returns {Object} Action object with type RESET_STATE to be handled by Redux reducers.
 */
export const resetState = () => {
  return {
    type: RESET_STATE,
  };
};

/**
 * persistence config for auth reducer
 */
const persistAuthConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['isAuthenticated', 'user'],
};

/**
 * persistence config for app reducer
 */
const persistAppConfig = {
  key: 'app',
  storage: AsyncStorage,
  whitelist: ['theme'],
};

/**
 * Combine all the reducers
 */
const appReducer = combineSlices({
  auth: persistReducer(persistAuthConfig, authSlice.reducer),
  app: persistReducer(persistAppConfig, appSlice.reducer),
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
    AsyncStorage.multiRemove(['persist:root', 'persist:auth']);
    // Preserve selected theme preference
    state = {
      app: {
        theme: state.app.theme,
      },
    };
  }

  return appReducer(state, action);
};
