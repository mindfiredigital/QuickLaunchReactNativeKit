import React from 'react';
import {
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
  StyleSheet,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Colors, typography} from '../theme';
export interface TextProps extends RNTextProps {
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>;
  /**
   * Text size modifier.
   */
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'body3';
  /**
   * Children components.
   */
  children?: React.ReactNode;
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 * @param {TextProps} props - The props for the `Text` component.
 * @returns {JSX.Element} The rendered `Text` component.
 */
export function Text(props: TextProps): JSX.Element {
  const {text, children, style: styleOverride, size = 'body2', ...rest} = props;
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const content = text || children;
  const $styles: StyleProp<TextStyle> = [
    styles.text,
    styles[size],
    styleOverride,
  ];

  return (
    <RNText {...rest} style={$styles}>
      {content}
    </RNText>
  );
}

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    text: {
      color: colors.text,
      fontFamily: typography.regular,
    },
    h1: {
      fontSize: 30,
      lineHeight: 34,
    },
    h2: {
      fontSize: 24,
      lineHeight: 30,
    },
    h3: {
      fontSize: 18,
      lineHeight: 22,
    },
    h4: {
      fontSize: 15,
      lineHeight: 18,
    },
    h5: {
      fontSize: 12,
      lineHeight: 14,
    },
    h6: {
      fontSize: 10,
      lineHeight: 12,
    },
    body1: {
      fontSize: 15,
      lineHeight: 28,
    },
    body2: {
      fontSize: 14,
      lineHeight: 18,
    },
    body3: {
      fontSize: 16,
      lineHeight: 18,
    },
  });
