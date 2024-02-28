import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors, fontSize, lineHeight, spacing} from '../../theme';
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
    backBtnText: {
      fontSize: fontSize.h3,
      alignSelf: 'center',
      marginTop: vs(5),
      marginLeft: s(2),
    } as TextStyle,
    backBtnView: {
      width: s(80),
      paddingHorizontal: 0,
      marginBottom: vs(100),
    } as ViewStyle,
    bottomView: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: vs(spacing.xs),
    } as ViewStyle,
    textInput: {
      marginBottom: vs(spacing.xl),
    },
  });

export default makeStyles;
