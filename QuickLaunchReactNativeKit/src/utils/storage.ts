import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

interface UserCredentials {
  username: string;
  password: string;
}

/**
 * Get a string from storage.
 *
 * @param key The key to fetch.
 */
export async function getStringFromAsync(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null;
  }
}

/**
 * Get a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function setStringToAsync(
  key: string,
  value: string,
): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function getFromAsync(key: string): Promise<unknown | null> {
  try {
    const almostThere = await AsyncStorage.getItem(key);
    return JSON.parse(almostThere ?? '');
  } catch {
    return null;
  }
}

/**
 * Set an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function setToAsync(
  key: string,
  value: unknown,
): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function removeFromAsync(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {}
}

/**
 * Burn it all to the ground.
 */
export async function clearAsync(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch {}
}

/**
 * Retrieves user credentials from the device's keychain.
 * @returns A promise that resolves to user credentials if found, otherwise null.
 */
export async function getGenericPasswordFromKeychain(): Promise<UserCredentials | null> {
  try {
    // Retrieve the credentials from the keychain
    const credentials = await Keychain.getGenericPassword();

    // If credentials are found, return them
    if (credentials) {
      return credentials;
    } else {
      // If no credentials are found, return null
      return null;
    }
  } catch (error) {
    // Return null in case of any error
    return null;
  }
}

/**
 * Sets the user's generic password in the device's keychain.
 * @param username The username associated with the password.
 * @param password The password to be stored.
 * @returns A promise that resolves to true if the password is successfully set, otherwise false.
 */
export async function setGenericPasswordToKeychain(
  username: string,
  password: string,
): Promise<boolean> {
  try {
    // Set the generic password in the keychain
    await Keychain.setGenericPassword(username, password);

    // Return true to indicate successful password setting
    return true;
  } catch {
    // Return false if any error occurs during password setting
    return false;
  }
}

/**
 * Resets the user's generic password stored in the device's keychain.
 * @returns A promise that resolves to true if the password is successfully reset, otherwise false.
 */
export async function resetGenericPasswordFromKeychain(): Promise<boolean> {
  try {
    // Attempt to reset the generic password stored in the keychain
    await Keychain.resetGenericPassword();

    // Return true to indicate successful password reset
    return true;
  } catch {
    // Return false if any error occurs during password reset
    return false;
  }
}

/**
 * Clears the password stored in the device's keystore.
 * If the app is being initialized for the first time, the keychain data is deleted.
 */
export async function clearKeystorePassword() {
  // Check if the app has been initialized before
  const isAppInitialized = await getStringFromAsync('isAppInitialized');

  // If the app has not been initialized before (first install)
  if (!isAppInitialized) {
    // Delete the generic password stored in the keychain
    await resetGenericPasswordFromKeychain();
  }

  // Set a flag indicating that the app has been initialized
  await setStringToAsync('isAppInitialized', 'true');
}
