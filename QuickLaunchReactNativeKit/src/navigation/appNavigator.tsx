/**
 * The app navigator is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React, {useEffect} from 'react';
import {Platform, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import Toast from 'react-native-toast-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import appleAuth from '@invertase/react-native-apple-authentication';
import {navigationRef} from './navigationUtilities';
import PrimaryNavigator from './primaryNavigator';
import AuthNavigator from './authNavigator';
import {darkTheme, lightTheme, spacing} from '../theme';
import {resetState} from '../store/reducers';
import {useAppDispatch, useAppSelector} from '../store';
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

  // Redux hooks
  const dispatch = useAppDispatch();
  // Return boolen to idicate if user is loggedin or not
  const {isAuthenticated} = useAppSelector(state => state.auth);

  // Handle crenditional revoke of apple signin in ios app
  useEffect(() => {
    if (Platform.OS == 'ios' && appleAuth.isSupported) {
      let authCredentialListener: any | null = null;
      // initialise revoke listener
      authCredentialListener = appleAuth.onCredentialRevoked(async () => {
        // If this function executes, User Credentials have been Revoked
        dispatch(resetState());
      });

      return () => {
        // remove revoke listener
        if (authCredentialListener?.remove !== undefined) {
          authCredentialListener.remove();
        }
      };
    }
  }, []);

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
