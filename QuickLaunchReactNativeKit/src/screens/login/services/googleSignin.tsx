import React, {useEffect} from 'react';
import {ImageStyle, StyleSheet, TouchableOpacityProps} from 'react-native';
import Config from 'react-native-config';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {showErrorToast, showSuccessToast, vs} from '../../../utils';
import {Icon, IconTypes} from '../../../components';
import {Colors, spacing} from '../../../theme';
import {socialSignUp, useAppDispatch} from '../../../store';
import {LoginRes} from '../../../api';

interface GoogleSignInProps extends TouchableOpacityProps {
  /**
   * size - The size of the Google sign-in button.
   * @default 48
   */
  size?: number;
  /**
   * icon - The icon type for the Google sign-in button.
   * @default - 'googleLight'|'googleDark'
   */
  icon?: IconTypes;
}

/**
 * GoogleSignIn component for allowing users to sign in with Google.
 * @param GoogleSignInProps
 */
export const GoogleSignIn = (props: GoogleSignInProps) => {
  const {dark, colors} = useTheme();
  // props
  const {
    size = vs(48),
    icon = dark ? 'googleDark' : 'googleLight',
    ...rest
  } = props;

  // hooks
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  // Styles with theme support
  const styles = makeStyles(colors);

  useEffect(() => {
    /**
     * Configure Google Sign-in with the web client ID.
     */
    GoogleSignin.configure({
      webClientId: Config.WEB_CLIENT_ID,
    });
  }, []);

  /**
   * Handle sign-in with google account
   */
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (!!userInfo && userInfo?.idToken) {
        const socialSignUpReq = {
          token: userInfo?.idToken,
          full_name: `${userInfo?.user?.givenName} ${userInfo?.user?.familyName}`,
          email: userInfo?.user?.email,
        };
        const {meta, payload} = await dispatch(socialSignUp(socialSignUpReq));
        const data = payload as LoginRes;
        if (meta.requestStatus === 'fulfilled' && data?.message) {
          showSuccessToast({message: data?.message});
        }
      }
    } catch (error: any) {
      handleErrors(error);
    }
  };

  /**
   * Handle social sign-in errors
   */
  const handleErrors = (error: any) => {
    switch (error?.code) {
      case statusCodes.SIGN_IN_CANCELLED:
        showErrorToast({message: t('login.signInCancelled')});
        break;
      case statusCodes.IN_PROGRESS:
        showErrorToast({message: t('login.inProgress')});
        break;
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        showErrorToast({message: t('login.playServicesNotAvailable')});
        break;
      default:
        showErrorToast({message: t('login.defaultError')});
        break;
    }
  };

  return (
    // @ts-ignore
    <Icon
      size={size}
      onPress={signIn}
      imageStyle={styles.buttonIcon}
      icon={icon}
      {...rest}
    />
  );
};

/**
 * Function to create styles for the GoogleSignIn component.
 * @param colors
 */
const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    buttonIcon: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: vs(spacing.xs),
    } as ImageStyle,
  });
