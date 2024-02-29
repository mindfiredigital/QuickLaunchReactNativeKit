import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors, spacing} from '../../theme';
import {s, vs} from '../../utils';

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    contentContainerStyle: {
      flexGrow: 1,
      justifyContent: 'space-between',
    } as ViewStyle,
    headerWrapper: {
      marginTop: vs(spacing.lg),
      paddingHorizontal: s(spacing.md),
      marginBottom: vs(40),
    } as ViewStyle,
    discriptionText: {
      marginTop: vs(10),
    } as TextStyle,
    backBtnView: {
      width: s(80),
      paddingHorizontal: 0,
      marginBottom: vs(100),
    } as ViewStyle,
    bottomView: {
      marginBottom: vs(200),
    } as ViewStyle,
    textInput: {
      marginBottom: vs(spacing.xl),
    } as ViewStyle,
  });

export default makeStyles;
