import * as React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Screen, Text} from '../../../../components';
import {Colors} from '../../../../theme';

export const HomeScreen = () => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  return (
    <Screen
      safeAreaEdges={['left', 'right']}
      preset="auto"
      contentContainerStyle={styles.container}>
      <Text>Home</Text>
    </Screen>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.backgroundSecondary,
    } as ViewStyle,
  });
