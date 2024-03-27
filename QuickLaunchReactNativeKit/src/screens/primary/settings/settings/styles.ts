import {StyleSheet, ViewStyle} from 'react-native';
import {Colors, spacing} from '../../../../theme';
import {s, vs} from '../../../../utils';

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
