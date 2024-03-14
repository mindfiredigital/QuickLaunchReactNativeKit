import React, {useEffect, useState} from 'react';
import {StyleSheet, ViewStyle, TextStyle, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {getGenericPasswordFromKeychain, vs} from '../../../utils';
import {Colors, spacing} from '../../../theme';
import {Icon, Text} from '../../../components';
import {login, useAppDispatch} from '../../../store';
import {LoginReq} from '../../../api';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

export const BiometricAuth = () => {
  // hooks
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const [biometryTypes, setBiometryTypes] = useState<string>('');
  const [userCredentials, setUserCredentials] = useState<any>('');
  const {colors} = useTheme();
  // Styles with theme support
  const styles = makeStyles(colors);

  /**
   * Effect hook that runs once when the component mounts.
   * It retrieves biometric sensor information and user credentials from the keychain.
   * Sets state variables accordingly.
   */
  useEffect(() => {
    // Call the onMount function when the component mounts
    onMount();
  }, []);

  /**
   * Function that is called when the component mounts.
   * Retrieves biometric sensor information and user credentials from the keychain.
   * Sets state variables accordingly.
   */
  const onMount = async () => {
    // Retrieve information about biometric sensors
    const sensors = await checkBiometricsSensors();

    // If biometric sensors are available, set the state variable for biometric types
    if (sensors !== null) {
      setBiometryTypes(sensors);
    }

    // Retrieve user credentials from the keychain
    const credentials = await getGenericPasswordFromKeychain();

    // If credentials are found, set the state variable for user credentials
    if (credentials !== null) {
      setUserCredentials(credentials);
    }
  };

  /**
   * Handles the biometric authentication process.
   * Prompts the user to authenticate using biometrics (e.g., Face ID or Touch ID).
   * If authentication is successful, it logs the user in.
   */
  const onBiometrics = async () => {
    // Prompt the user to authenticate using biometrics
    const isSuccess = await showBiometricPrompt(returnSigninWithString());

    // If biometric authentication is successful
    if (isSuccess) {
      // Log in the user using stored credentials
      loginUser(userCredentials.username, userCredentials.password);
    }
  };

  //login user using credencials
  const loginUser = (username: string, password: string) => {
    const reqBody: LoginReq = {
      email: username,
      password: password,
    };
    dispatch(login(reqBody));
  };

  /**
   * Checks the availability of biometric sensors on the device.
   * @returns The type of biometric sensor available if found, otherwise null.
   */
  const checkBiometricsSensors = async () => {
    // Check the availability of biometric sensors
    const resultObject = await rnBiometrics.isSensorAvailable();
    const {available, biometryType} = resultObject;

    // If biometric sensor is available and its type is detected, return the type
    if (available && biometryType) {
      return biometryType;
    } else {
      // If biometric sensor is not available or its type is not detected, return null
      return null;
    }
  };

  /**
   * Shows a biometric prompt to the user.
   * @param promptMessage The message to display in the biometric prompt.
   * @returns A promise that resolves to true if the biometric prompt is successful, otherwise false.
   */
  const showBiometricPrompt = async (promptMessage: string) => {
    // Show a biometric prompt with the provided message
    const resultObject = await rnBiometrics.simplePrompt({
      promptMessage: promptMessage,
    });

    // Extract the success property from the result object
    const {success} = resultObject;

    // If the biometric prompt is successful
    if (success) {
      // Return true to indicate success
      return true;
    } else {
      // Return false if the biometric prompt fails
      return false;
    }
  };

  /**
   * Returns the appropriate message for biometric authentication based on the available biometric types.
   * @returns A string representing the message for biometric authentication.
   */
  const returnSigninWithString = (): string => {
    // Determine the biometric type and return the corresponding message
    if (biometryTypes === BiometryTypes.TouchID) {
      return t('login.signinWithTouchId'); // Message for Touch ID authentication
    } else if (biometryTypes === BiometryTypes.FaceID) {
      return t('login.signinWithFaceId'); // Message for Face ID authentication
    } else if (biometryTypes === BiometryTypes.Biometrics) {
      return t('login.signWithBiometrics'); // Generic message for biometrics authentication
    } else {
      return ''; // Return an empty string if biometric type is not recognized
    }
  };

  /**
   * Returns the appropriate description for biometric authentication based on the available biometric types.
   * @returns A string representing the description for biometric authentication.
   */
  const returnSigninDiscreptionString = (): string => {
    // Determine the biometric type and return the corresponding description
    if (biometryTypes === BiometryTypes.TouchID) {
      return t('login.signinWithTouchIdDis'); // Description for Touch ID authentication
    } else if (biometryTypes === BiometryTypes.FaceID) {
      return t('login.signinWithFaceIdDis'); // Description for Face ID authentication
    } else if (biometryTypes === BiometryTypes.Biometrics) {
      return t('login.signWithBiometricsDis'); // Generic description for biometrics authentication
    } else {
      return ''; // Return an empty string if biometric type is not recognized
    }
  };

  return (
    <>
      {userCredentials.username && (
        <View style={styles.biometricView}>
          <Icon
            icon={
              biometryTypes === BiometryTypes.TouchID
                ? 'fingerprint'
                : 'faceRecognition'
            }
            size={vs(40)}
            containerStyle={styles.biometricIcon}
            color={colors.tertiary}
            onPress={onBiometrics}
          />
          <Text>{returnSigninWithString()}</Text>
          <Text style={styles.signDisText}>
            {returnSigninDiscreptionString()}
          </Text>
        </View>
      )}
    </>
  );
};
/**
 * Function to create styles for the GoogleSignIn component.
 * @param colors
 */
const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    biometricView: {
      width: vs(200),
      backgroundColor: colors.lightGray,
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: vs(spacing.xs),
      padding: vs(spacing.md),
      marginTop: vs(spacing.md),
    } as ViewStyle,
    biometricIcon: {
      marginBottom: vs(spacing.md),
    } as ViewStyle,
    signDisText: {
      marginTop: vs(spacing.sm),
      textAlign: 'center',
    } as TextStyle,
  });
