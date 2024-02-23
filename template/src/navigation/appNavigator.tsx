/**
 * The app navigator is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import {navigationRef} from './navigationUtilities';
import PrimaryNavigator from './primaryNavigator';
import AuthNavigator from './authNavigator';
import {darkTheme, lightTheme} from '../theme';
import {useAppSelector} from '../store';

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

const AppNavigator = (props: NavigationProps) => {
  const scheme = useColorScheme();
  const {isAuthenticated} = useAppSelector(state => state.auth);
  /**
   * To support only light mode change isDarkMode to false
   * const isDarkMode = false
   */
  const isDarkMode = scheme === 'dark';

  /** Hide boot splash screen once navigation is ready */
  const hideBootSplash = () => {
    BootSplash.hide({fade: true});
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={isDarkMode ? darkTheme : lightTheme}
      onReady={hideBootSplash}
      {...props}>
      {isAuthenticated ? <PrimaryNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
