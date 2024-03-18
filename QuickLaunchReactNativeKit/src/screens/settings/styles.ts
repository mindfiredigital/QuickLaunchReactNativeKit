import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors, spacing} from '../../theme';
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
      alignItems: 'flex-end',
      marginTop: vs(spacing.xl),
      marginBottom: vs(spacing.md),
    },
    subHeadingText: {
      marginLeft: s(spacing.sm),
      marginBottom: vs(spacing.xxs),
    } as TextStyle,
    btnTextStyle: {
      color: colors.btnTextSecondary,
      marginHorizontal: 0,
    } as TextStyle,
    btnStyle: {paddingHorizontal: 0, marginTop: vs(spacing.md)} as ViewStyle,
  });

export default makeStyles;
