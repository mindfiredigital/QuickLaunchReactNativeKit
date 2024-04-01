/**
 * The app navigator is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React, {useEffect, useMemo} from 'react';
import {Platform, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import Toast from 'react-native-toast-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import appleAuth from '@invertase/react-native-apple-authentication';
import {AuthNavigator, PrimaryNavigator, navigationRef} from 'navigation';
import {darkTheme, lightTheme, spacing} from 'theme';
import {resetState} from 'store';
import {useAppDispatch, useAppSelector} from 'store';
import {clearKeystorePassword, useToastConfig, vs} from 'utils';
import {useInAppUpdates} from 'service';

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const scheme = useColorScheme();
  const insets = useSafeAreaInsets();

  // Redux hooks
  const dispatch = useAppDispatch();
  // Return boolen to idicate if user is loggedin or not
  const {isAuthenticated} = useAppSelector(state => state.auth);
  const {theme} = useAppSelector(state => state.app);

  // Checks for in app update
  useInAppUpdates();

  /**
   * Return appTheme based on selection
   */
  const appTheme = useMemo(() => {
    if (theme == 'auto') {
      const isDarkMode = scheme === 'dark';
      return isDarkMode ? darkTheme : lightTheme;
    } else if (theme == 'dark') {
      return darkTheme;
    } else {
      return lightTheme;
    }
  }, [theme, darkTheme, lightTheme, scheme]);

  const toastConfig = useToastConfig(appTheme.colors);

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
    clearKeystorePassword();
  }, []);

  /** Hide boot splash screen once navigation is ready */
  const hideBootSplash = () => {
    BootSplash.hide({fade: true});
  };

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        theme={appTheme}
        onReady={hideBootSplash}
        {...props}>
        {isAuthenticated ? <PrimaryNavigator /> : <AuthNavigator />}
      </NavigationContainer>
      <Toast config={toastConfig} topOffset={vs(spacing.xl) + insets.top} />
    </>
  );
};
