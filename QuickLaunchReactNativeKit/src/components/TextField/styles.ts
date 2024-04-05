import {Platform, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors, fontSize, spacing, typography} from 'theme';
import {s, vs} from 'utils';

export const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    outerWrapper: {
      marginHorizontal: s(spacing.md),
      marginBottom: vs(spacing.lg),
    } as ViewStyle,
    inputWrapperStyles: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: s(spacing.sm),
      paddingHorizontal: s(spacing.xs),
    } as ViewStyle,
    inputStyles: {
      flex: 1,
      height: vs(50),
      paddingHorizontal: s(spacing.xs),
      fontSize: fontSize.body,
      fontFamily: typography.regular,
      color: colors.text,
      paddingTop: Platform.OS == 'android' ? 2 : 0,
      paddingBottom: 0,
    } as TextStyle,
    errorText: {
      marginLeft: s(spacing.xxxs),
      marginTop: vs(spacing.xxs),
    } as TextStyle,
  });
