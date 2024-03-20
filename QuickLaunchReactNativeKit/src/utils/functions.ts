import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {resetState} from '../store/reducers';
import {store} from '../store';

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
