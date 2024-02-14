/**
 * The app navigator is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './navigationUtilities';
import PrimaryNavigator from './primaryNavigator';
import AuthNavigator from './authNavigator';

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

const AppNavigator = (props: NavigationProps) => {
  const isLogin = false;

  return (
    <NavigationContainer ref={navigationRef} {...props}>
      {isLogin ? <PrimaryNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
