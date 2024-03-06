import {StyleSheet, ViewStyle} from 'react-native';
import {Colors, typography} from '../theme';

const makeCommanStyles = (colors: Colors) =>
  StyleSheet.create({
    contentContainerStyle: {
      flexGrow: 1,
      justifyContent: 'space-between',
    } as ViewStyle,
  });

export default makeCommanStyles;
