import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button, Screen} from '../../components';
import {useAppDispatch} from '../../store';
import {resetState} from '../../store/reducers';

export const SettingsScreen = () => {
  const dispatch = useAppDispatch();

  const logoutUser = () => {
    dispatch(resetState());
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
