import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {useTheme} from 'react-native-paper';

export const LoginScreen = () => {
  const {colors, typography} = useTheme();
  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
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
