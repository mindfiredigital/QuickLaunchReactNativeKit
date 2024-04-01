import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Colors} from 'theme';

/**
 * A simple horizontal separator component with customizable border color.
 */
export const Separator = () => {
  // Accessing theme colors using useTheme hook
  const {colors} = useTheme();
  // Generating styles based on theme colors
  const styles = makeStyles(colors);

  return <View style={styles.separator} />;
};

// Function to generate styles for the separator
const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    separator: {
      height: 1,
      backgroundColor: colors.border,
    },
  });
