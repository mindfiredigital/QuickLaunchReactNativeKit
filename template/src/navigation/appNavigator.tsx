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
import Toast from 'react-native-toast-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {navigationRef} from './navigationUtilities';
import PrimaryNavigator from './primaryNavigator';
import AuthNavigator from './authNavigator';
import {darkTheme, lightTheme, spacing} from '../theme';
import {useAppSelector} from '../store';
import {useToastConfig, vs} from '../utils';

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

const AppNavigator = (props: NavigationProps) => {
  const scheme = useColorScheme();
  const insets = useSafeAreaInsets();

  /**
   * To support only light mode change isDarkMode to false
   * const isDarkMode = false
   */
  const isDarkMode = scheme === 'dark';
  const theme = isDarkMode ? darkTheme : lightTheme;
  const toastConfig = useToastConfig(theme.colors);

  // Return boolen to idicate if user is loggedin or not
  const {isAuthenticated} = useAppSelector(state => state.auth);

  /** Hide boot splash screen once navigation is ready */
  const hideBootSplash = () => {
    BootSplash.hide({fade: true});
  };

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        theme={theme}
        onReady={hideBootSplash}
        {...props}>
        {isAuthenticated ? <PrimaryNavigator /> : <AuthNavigator />}
      </NavigationContainer>
      <Toast config={toastConfig} topOffset={vs(spacing.xl) + insets.top} />
    </>
  );
};

export default AppNavigator;
