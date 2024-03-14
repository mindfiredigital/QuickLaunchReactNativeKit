import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors, spacing} from '../../theme';
import {s, vs} from '../../utils';

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    headerWrapper: {
      paddingHorizontal: s(spacing.md),
      marginBottom: vs(spacing.lg),
    } as ViewStyle,
    logoContainer: {
      marginTop: vs(spacing.md),
      marginBottom: vs(spacing.lg),
      alignSelf: 'center',
    } as ViewStyle,
    forgotView: {
      paddingHorizontal: 0,
      marginHorizontal: s(spacing.md),
      marginBottom: vs(spacing.lg),
      alignSelf: 'flex-end',
    },
    bottomView: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: vs(spacing.xs),
    },
    socialSignIn: {
      alignItems: 'center',
    } as ViewStyle,
    socialSignInButtons: {
      marginTop: vs(spacing.xs),
    } as ViewStyle,
    biometricView: {
      width: vs(200),
      backgroundColor: colors.lightGray,
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: vs(spacing.xs),
      padding: vs(spacing.md),
      marginTop: vs(spacing.md),
    } as ViewStyle,
    biometricIcon: {
      marginBottom: vs(spacing.md),
    } as ViewStyle,
    signDisText: {
      marginTop: vs(spacing.sm),
      textAlign: 'center',
    } as TextStyle,
  });

export default makeStyles;
