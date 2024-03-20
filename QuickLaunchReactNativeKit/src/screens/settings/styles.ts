import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors, spacing, typography} from '../../theme';
import {s, vs} from '../../utils';

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    headerText: {
      marginTop: vs(spacing.lg),
    } as TextStyle,
    container: {
      paddingHorizontal: s(spacing.md),
    } as ViewStyle,
    subHeading: {
      flexDirection: 'row',
      marginTop: vs(spacing.xl),
    },
    subHeadingText: {
      marginLeft: s(spacing.sm),
    } as TextStyle,
    btnTextStyle: {
      color: colors.btnTextSecondary,
      fontFamily: typography.medium,
      marginHorizontal: 0,
    } as TextStyle,
    btnStyle: {
      paddingHorizontal: 0,
      marginTop: vs(spacing.md),
    } as ViewStyle,
  });

export default makeStyles;
