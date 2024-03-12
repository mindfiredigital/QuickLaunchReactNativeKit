import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Button, Screen} from '../../components';
import {useAppDispatch} from '../../store';
import {resetState} from '../../store/reducers';

export const SettingsScreen = () => {
  const dispatch = useAppDispatch();

  const logoutUser = async () => {
    try {
      // logout google account if signed in
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(resetState());
    }
  };

  return (
    <Screen
      safeAreaEdges={['top', 'left', 'right']}
      preset="auto"
      contentContainerStyle={styles.container}
      bottomContent={<Button btnText="Logout" onPress={logoutUser} />}>
      <Text>Settings</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
