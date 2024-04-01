import {StyleSheet, ViewStyle} from 'react-native';
import {Colors, spacing} from 'theme';
import {s, vs} from 'utils';

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    btnStyle: {
      marginTop: vs(spacing.xl),
    } as ViewStyle,
    headerStyle: {
      marginHorizontal: s(spacing.md),
    },
  });

export default makeStyles;
