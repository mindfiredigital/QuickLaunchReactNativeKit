import {StyleSheet} from 'react-native';
import {Colors, typography} from '../theme';

export const makeCommanStyles = (colors: Colors) =>
  StyleSheet.create({
    logoContainer: {marginTop: 30, alignSelf: 'center'},
    contentContainerStyle: {padding: 21},
    titleText: {
      fontFamily: typography.bold,
      fontSize: 30,
      lineHeight: 36,
      marginBottom: 20,
      marginTop: 16,
    },
    passwordInput: {
      marginTop: 40,
      marginBottom: 30,
    },
  });
