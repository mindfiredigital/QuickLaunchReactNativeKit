import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {resetState} from '../store/reducers';
import {store} from '../store';
import {navigate} from '../navigation';
import {constants} from '../constants';

/**
 * Logout the user from the app
 *  * Handles unauthorized access by dispatching a state reset.
 */
export const logoutUser = async () => {
  try {
    // logout google account if signed in
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  } finally {
    store.dispatch(resetState());
  }
};

/**
 * Function to open the privacy policy page.
 */
export const openPrivacyPolicy = () => {
  navigate('webView', {
    renderType: 'uri', // Specifies the rendering type
    uriOrHTML: constants.privacyPolicyURL,
    title: 'settings.privacy',
  });
};

/**
 * Function to open the help page.
 */
export const openHelp = () => {
  navigate('webView', {
    renderType: 'uri', // Specifies the rendering type
    uriOrHTML: constants.helpURL,
    title: 'settings.help',
  });
};

/**
 * Function to open the about us page.
 */
export const openAboutUs = () => {
  navigate('webView', {
    renderType: 'uri', // Specifies the rendering type
    uriOrHTML: constants.aboutURL,
    title: 'settings.aboutUs',
  });
};
