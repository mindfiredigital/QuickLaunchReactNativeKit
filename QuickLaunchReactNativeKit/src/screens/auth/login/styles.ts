import {StyleSheet, ViewStyle} from 'react-native';
import {Colors, spacing} from 'theme';
import {s, vs} from 'utils';

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    headerWrapper: {
      paddingHorizontal: s(spacing.md),
      marginBottom: vs(spacing.lg),
    } as ViewStyle,
    logoContainer: {
      marginVertical: vs(spacing.md),
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
      flexDirection: 'row',
      marginTop: vs(spacing.xs),
    } as ViewStyle,
    spacer: {
      width: s(spacing.md),
    } as ViewStyle,
  });

export default makeStyles;
