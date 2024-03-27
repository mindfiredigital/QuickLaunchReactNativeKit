import {StyleSheet, ViewStyle} from 'react-native';
import {Colors, fontSize, lineHeight, typography} from '../theme';
import {vs} from '../utils';

const makeCommanStyles = (colors: Colors) =>
  StyleSheet.create({
    contentContainerStyle: {
      flexGrow: 1,
      justifyContent: 'space-between',
    } as ViewStyle,
    headerBackground: {
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.background,
      borderBottomWidth: 0,
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.15,
      shadowRadius: 5.65,
      elevation: 6,
    } as ViewStyle,
    headerTitle: {
      fontSize: vs(16),
      fontFamily: typography.medium,
      fontWeight: undefined,
      color: colors.text,
    },
  });

export default makeCommanStyles;
