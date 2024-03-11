import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseToast, BaseToastProps} from 'react-native-toast-message';
import {Colors, fontSize, lineHeight, spacing, typography} from '../../theme';
import {s, vs} from '..';

/**
 *  Create the configs for react-native-toast-message
 */
export const useToastConfig = (colors: Colors) => {
  const styles = makeStyles(colors);
  return {
    /**
     * Overwrite 'success' type,
     * by modifying the existing `BaseToast` component
     */
    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={[styles.container, styles.success]}
        contentContainerStyle={styles.contentContainerStyle}
        text1Style={[styles.text1Style, styles.successText]}
        text2Style={styles.text2Style}
        text1NumberOfLines={1}
        text2NumberOfLines={2}
      />
    ),
    /**
     * Overwrite 'error' type,
     * by modifying the existing `BaseToast` component
     */
    error: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={[styles.container, styles.error]}
        contentContainerStyle={styles.contentContainerStyle}
        text1Style={[styles.text1Style, styles.errorText]}
        text2Style={styles.text2Style}
        text1NumberOfLines={1}
        text2NumberOfLines={2}
      />
    ),
    /**
     * Overwrite 'info' type,
     * by modifying the existing `BaseToast` component
     */
    info: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={[styles.container, styles.info]}
        contentContainerStyle={styles.contentContainerStyle}
        text1Style={[styles.text1Style, styles.infoText]}
        text2Style={styles.text2Style}
        text1NumberOfLines={1}
        text2NumberOfLines={2}
      />
    ),
    /**
     * Overwrite 'warning' type,
     * by modifying the existing `BaseToast` component
     */
    warning: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={[styles.container, styles.warning]}
        contentContainerStyle={styles.contentContainerStyle}
        text1Style={[styles.text1Style, styles.warningText]}
        text2Style={styles.text2Style}
        text1NumberOfLines={1}
        text2NumberOfLines={2}
      />
    ),
  };
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      height: vs(66),
      width: s(361),
      backgroundColor: colors.background,
    },
    success: {
      borderLeftColor: colors.success,
    },
    successText: {
      color: colors.success,
    },
    error: {
      borderLeftColor: colors.danger,
    },
    errorText: {
      color: colors.danger,
    },
    info: {
      borderLeftColor: colors.info,
    },
    infoText: {
      color: colors.info,
    },
    warning: {
      borderLeftColor: colors.warning,
    },
    warningText: {
      color: colors.warning,
    },
    contentContainerStyle: {
      paddingHorizontal: s(spacing.md),
    },
    text1Style: {
      fontSize: fontSize.h4,
      lineHeight: lineHeight[fontSize.h4],
      fontFamily: typography.medium,
      color: colors.text,
    },
    text2Style: {
      fontSize: fontSize.body1,
      lineHeight: lineHeight[fontSize.body1],
      fontFamily: typography.light,
      color: colors.tertiary,
    },
  });
