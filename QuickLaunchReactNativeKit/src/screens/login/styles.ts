import {StyleSheet, ViewStyle} from 'react-native';
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
  });

export default makeStyles;
