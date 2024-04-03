import React from 'react';
import {
  ImageStyle,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import {showErrorToast, showSuccessToast, vs} from 'utils';
import {Colors, spacing} from 'theme';
import {socialLogIn, socialSignUp, useAppDispatch} from 'store';
import {LoginRes} from 'api';
import {AppleDark, AppleLight} from 'assets/svgs';

interface AppleSignInProps extends TouchableOpacityProps {
  /**
   * size - The size of the Google sign-in button.
   * @default 48
   */
  size?: number;
}

interface AuthParams {
  identityToken: string | null;
  fullName?: string;
  email?: string;
}

/**
 * AppleSignin component for allowing users to sign in with Apple.
 * @param AppleSignInProps
 */
export const AppleSignin = (props: AppleSignInProps) => {
  const {dark, colors} = useTheme();
  // props
  const {size = vs(48), ...rest} = props;

  // hooks
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  // Styles with theme support
  const styles = makeStyles(colors);

  /**
   * Handle sign-in with google account
   */
  const signIn = async () => {
    if (Platform.OS === 'ios') {
      iosAppleAuth();
    } else if (Platform.OS === 'android') {
      androidAppleAuth();
    }
  };

  const iosAppleAuth = async () => {
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      //Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw Error(t('apiErrors.appleSignInError'));
      }

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        const {identityToken, fullName, email} = appleAuthRequestResponse;
        const authParams: AuthParams = {identityToken};
        if (!!email && !!fullName) {
          authParams['email'] = email;
          authParams[
            'fullName'
          ] = `${fullName?.givenName} ${fullName?.familyName}`;
        }
        handleAuthentication(authParams);
      } else {
        throw Error(t('apiErrors.unexpectedError'));
      }
    } catch (error: any) {
      if (error.code === appleAuth.Error.CANCELED) {
        showErrorToast({
          message: t('apiErrors.appleSignInCancel'),
        });
      } else {
        showErrorToast({
          message: error?.message ?? t('apiErrors.unexpectedError'),
        });
      }
    }
  };

  const androidAppleAuth = async () => {
    // Generate secure, random values for state and nonce
    // const rawNonce = uuid();
    // const state = uuid();

    try {
      // Initialize the module
      appleAuthAndroid.configure({
        // The Service ID you registered with Apple
        clientId: 'com.quicklaunchreactnativekit',

        // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
        // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
        redirectUri: 'http://localhost:3001/auth/callback',

        // [OPTIONAL]
        // Scope.ALL (DEFAULT) = 'email name'
        // Scope.Email = 'email';
        // Scope.Name = 'name';
        scope: appleAuthAndroid.Scope.ALL,

        // [OPTIONAL]
        // ResponseType.ALL (DEFAULT) = 'code id_token';
        // ResponseType.CODE = 'code';
        // ResponseType.ID_TOKEN = 'id_token';
        responseType: appleAuthAndroid.ResponseType.ALL,

        // [OPTIONAL]
        // A String value used to associate a client session with an ID token and mitigate replay attacks.
        // This value will be SHA256 hashed by the library before being sent to Apple.
        // This is required if you intend to use Firebase to sign in with this credential.
        // Supply the response.id_token and rawNonce to Firebase OAuthProvider
        // nonce: rawNonce,

        // [OPTIONAL]
        // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
        // state,
      });

      const response = await appleAuthAndroid.signIn();
      if (response) {
        const code = response.code; // Present if selected ResponseType.ALL / ResponseType.CODE
        const id_token = response.id_token; // Present if selected ResponseType.ALL / ResponseType.ID_TOKEN
        const user = response.user; // Present when user first logs in using appleId
        const state = response.state; // A copy of the state value that was passed to the initial request.
        //Ensure Apple returned a user identityToken
        if (!id_token) {
          throw Error(t('apiErrors.appleSignInError'));
        }
        const authParams: AuthParams = {identityToken: id_token};
        if (!!user?.email && !!user?.name) {
          authParams['email'] = user?.email;
          authParams[
            'fullName'
          ] = `${user?.name?.firstName} ${user?.name?.lastName}`;
        }
        handleAuthentication(authParams);
      }
    } catch (error: any) {
      if (error && error?.message) {
        switch (error.message) {
          case appleAuthAndroid.Error.NOT_CONFIGURED:
          case appleAuthAndroid.Error.SIGNIN_FAILED:
            showErrorToast({message: t('apiErrors.appleSignInError')});
            break;
          case appleAuthAndroid.Error.SIGNIN_CANCELLED:
            showErrorToast({
              message: t('apiErrors.appleSignInCancel'),
            });
            break;
          default:
            showErrorToast({message: t('apiErrors.appleSignInError')});
            break;
        }
      }
    }
  };

  /**
   * Handle Login and Signup flow based on response returned from apple
   * @param appleAuthRequestResponse
   */
  const handleAuthentication = async ({
    identityToken,
    fullName,
    email,
  }: AuthParams) => {
    let res;
    if (!!identityToken) {
      if (!!email && !!fullName) {
        // If email is available in response then sign-up
        const socialSignUpReq = {
          token: identityToken,
          full_name: fullName,
          email: email,
        };
        res = await dispatch(socialSignUp(socialSignUpReq));
      } else {
        // If email isn't available in response then login
        const socialLogInReq = {
          token: identityToken,
        };
        res = await dispatch(socialLogIn(socialLogInReq));
      }
    }
    const data = res?.payload as LoginRes;
    if (res?.meta?.requestStatus === 'fulfilled' && data?.message) {
      showSuccessToast({message: data?.message});
    }
  };

  if (
    (Platform.OS === 'ios' && appleAuth.isSupported) ||
    (Platform.OS === 'android' && appleAuthAndroid.isSupported)
  ) {
    return (
      <TouchableOpacity onPress={signIn} style={styles.buttonIcon} {...rest}>
        {dark ? (
          <AppleDark height={size} width={size} />
        ) : (
          <AppleLight height={size} width={size} />
        )}
      </TouchableOpacity>
    );
  } else {
    return <></>;
  }
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
      overflow: 'hidden',
    } as ImageStyle,
  });
