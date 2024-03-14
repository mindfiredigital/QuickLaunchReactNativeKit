import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, ViewStyle, TextStyle, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {getGenericPasswordFromKeychain, vs} from '../../../utils';
import {Colors, spacing} from '../../../theme';
import {Icon, IconTypes, Text} from '../../../components';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

interface BiometricAuthProps {
  onBiometricsSuccess: (username: string, password: string) => void;
}

export const BiometricAuth = (props: BiometricAuthProps) => {
  const {onBiometricsSuccess} = props;
  // hooks
  const {t} = useTranslation();
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
   * Returns the appropriate icon, text and description for biometric authentication based on the available biometric types.
   */
  const biometricData = useMemo(() => {
    switch (biometryTypes) {
      case BiometryTypes.TouchID:
        return {
          icon: 'fingerprint' as IconTypes,
          text: t('login.signinWithTouchId'),
          desc: t('login.signinWithTouchIdDis'),
        };
      case BiometryTypes.FaceID:
        return {
          icon: 'faceRecognition' as IconTypes,
          text: t('login.signinWithFaceId'),
          desc: t('login.signinWithFaceIdDis'),
        };
      case BiometryTypes.Biometrics:
        return {
          icon: 'fingerprint' as IconTypes,
          text: t('login.signinWithTouchId'),
          desc: t('login.signinWithTouchIdDis'),
        };
      default:
        return undefined;
    }
  }, [BiometryTypes]);

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
  const onBiometrics = async (promptMessage: string) => {
    // Prompt the user to authenticate using biometrics
    const isSuccess = await showBiometricPrompt(promptMessage);

    // If biometric authentication is successful
    if (isSuccess) {
      // Log in the user using stored credentials
      onBiometricsSuccess(userCredentials.username, userCredentials.password);
    }
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

  if (biometricData && !!userCredentials)
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => onBiometrics(biometricData.text)}
        style={styles.biometricView}>
        <Icon
          icon={biometricData.icon}
          size={vs(40)}
          style={styles.biometricIcon}
          color={colors.tertiary}
        />
        <Text>{biometricData.text}</Text>
        <Text
          size="body1"
          numberOfLines={2}
          adjustsFontSizeToFit
          style={styles.signDisText}>
          {biometricData.desc}
        </Text>
      </TouchableOpacity>
    );
};
/**
 * Function to create styles for the GoogleSignIn component.
 * @param colors
 */
const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    biometricView: {
      maxWidth: vs(240),
      backgroundColor: colors.card,
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: vs(spacing.xs),
      padding: vs(spacing.sm),
      marginTop: vs(spacing.md),
    } as ViewStyle,
    biometricIcon: {
      marginBottom: vs(spacing.xs),
    } as ViewStyle,
    signDisText: {
      marginTop: vs(spacing.xxs),
      textAlign: 'center',
    } as TextStyle,
  });
