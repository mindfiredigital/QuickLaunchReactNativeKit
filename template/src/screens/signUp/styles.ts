import {StyleSheet, ViewStyle} from 'react-native';
import {Colors, spacing} from '../../theme';
import {s, vs} from '../../utils';
import {TextInput} from 'react-native-gesture-handler';

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    headerWrapper: {
      marginTop: vs(spacing.lg),
      paddingHorizontal: s(spacing.md),
      marginBottom: vs(40),
    } as ViewStyle,
    bottomView: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: vs(spacing.xs),
    } as ViewStyle,
    textInput: {
      marginBottom: vs(spacing.xl),
    } as ViewStyle,
    headerStyle: {marginBottom: vs(40)} as ViewStyle,
  });

export default makeStyles;
