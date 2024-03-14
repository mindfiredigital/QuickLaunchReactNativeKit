import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

/**
 * Checks the availability of biometric sensors on the device.
 * @returns The type of biometric sensor available if found, otherwise null.
 */
export const checkBiometricsSensors = async () => {
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
export const showBiometricPrompt = async (promptMessage: string) => {
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
