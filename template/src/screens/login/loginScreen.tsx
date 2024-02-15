import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Colors, typography} from '../../theme';

export const LoginScreen = () => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{'title'}</Text>
    </View>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
    titleText: {
      fontSize: 20,
      color: colors.text,
      fontFamily: typography.regular,
    },
  });
