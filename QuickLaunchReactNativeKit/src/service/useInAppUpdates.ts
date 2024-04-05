import {useEffect} from 'react';
import {Platform} from 'react-native';
import SpInAppUpdates, {
  IAUUpdateKind,
  StartUpdateOptions,
} from 'sp-react-native-in-app-updates';

/**
 * Checks the stores (play/app) for a new version of your app and can prompt your user for an update.
 * For more info, https://www.npmjs.com/package/sp-react-native-in-app-updates
 */
export const useInAppUpdates = () => {
  useEffect(() => {
    checkForUpdate();
  }, []);

  const checkForUpdate = async () => {
    try {
      const inAppUpdates = new SpInAppUpdates(
        __DEV__, // isDebug
      );
      // curVersion is optional if you don't provide it will automatically take from the app using react-native-device-info
      const result = await inAppUpdates.checkNeedsUpdate();
      if (result.shouldUpdate) {
        let updateOptions: StartUpdateOptions = {};
        if (Platform.OS === 'android') {
          // android only, on iOS the user will be promped to go to your app store page
          updateOptions = {
            updateType: IAUUpdateKind.FLEXIBLE,
          };
        }
        inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
      }
    } catch (error) {}
  };
};
