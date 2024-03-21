import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors, spacing, typography} from '../../theme';
import {s, vs} from '../../utils';

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.backgroundSecondary,
    } as ViewStyle,
    contentContainer: {
      paddingHorizontal: s(spacing.md),
      paddingBottom: vs(spacing.md),
    } as ViewStyle,
  });

export default makeStyles;
