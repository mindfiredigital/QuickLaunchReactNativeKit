import {StyleSheet, ViewStyle} from 'react-native';
import {Colors, typography} from '../theme';

export const makeCommanStyles = (colors: Colors) =>
  StyleSheet.create({
    contentContainerStyle: {
      flexGrow: 1,
      justifyContent: 'space-between',
    } as ViewStyle,
  });
