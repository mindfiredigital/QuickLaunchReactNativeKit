import React from 'react';
import {StyleSheet, View, ViewProps, ViewStyle} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {Colors} from '../theme';

/**
 * Props for the WebViewApp component.
 */
export interface WebViewAppProps extends ViewProps {
  /**
   * The source of the web page to display.
   */
  source: any;
}

/**
 * A component for displaying a web page using WebView.
 * Renders a web page specified by the provided URI.
 */
export const WebViewApp = ({source, ...rest}: WebViewAppProps) => {
  // Accessing theme colors using useTheme hook
  const {colors} = useTheme();

  // Generating styles based on theme colors
  const styles = makeStyles(colors);

  return <WebView source={source} style={styles.container} {...rest} />;
};

/**
 * Function to generate styles for the WebViewApp component.
 * Styles are customized based on the provided colors.
 */
const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    } as ViewStyle,
  });
