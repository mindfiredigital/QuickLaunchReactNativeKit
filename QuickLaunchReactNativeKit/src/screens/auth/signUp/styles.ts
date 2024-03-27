import {StyleSheet, ViewStyle} from 'react-native';
import {Colors, spacing} from '../../../theme';
import {s, vs} from '../../../utils';

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    headerWrapper: {
      marginTop: vs(spacing.xxxl),
      paddingHorizontal: s(spacing.md),
      marginBottom: vs(40),
    } as ViewStyle,
    bottomView: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: vs(spacing.xs),
    } as ViewStyle,
    headerStyle: {marginBottom: vs(40)} as ViewStyle,
    signUpBtn: {
      marginTop: spacing.xl,
    } as ViewStyle,
  });

export default makeStyles;
