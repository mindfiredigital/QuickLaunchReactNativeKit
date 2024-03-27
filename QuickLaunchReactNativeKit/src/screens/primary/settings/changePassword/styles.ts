import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors, spacing} from '../../../../theme';
import {s, vs} from '../../../../utils';

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    headerWrapper: {
      paddingHorizontal: s(spacing.md),
      marginTop: vs(spacing.lg),
      marginBottom: vs(spacing.xxl),
    } as ViewStyle,
    descriptionText: {
      marginTop: vs(10),
    } as TextStyle,
    headerStyle: {
      marginBottom: vs(spacing.md),
    } as ViewStyle,
    bottomView: {
      marginTop: vs(spacing.xxxl),
    } as ViewStyle,
  });

export default makeStyles;
