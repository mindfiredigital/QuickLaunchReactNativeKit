import React from 'react';
import {
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
  StyleSheet,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Colors, fontSize, lineHeight, typography} from 'theme';
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
  size?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body'
    | 'body1'
    | 'body2'
    | 'error';
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
  const {text, children, style: styleOverride, size = 'body', ...rest} = props;
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
      fontSize: fontSize.h1,
      lineHeight: lineHeight[fontSize.h1],
      fontFamily: typography.semiBold,
    },
    h2: {
      fontSize: fontSize.h2,
      lineHeight: lineHeight[fontSize.h2],
      fontFamily: typography.semiBold,
    },
    h3: {
      fontSize: fontSize.h3,
      lineHeight: lineHeight[fontSize.h3],
      fontFamily: typography.semiBold,
    },
    h4: {
      fontSize: fontSize.h4,
      lineHeight: lineHeight[fontSize.h4],
      fontFamily: typography.medium,
    },
    h5: {
      fontSize: fontSize.h5,
      lineHeight: lineHeight[fontSize.h5],
      fontFamily: typography.medium,
    },
    h6: {
      fontSize: fontSize.h6,
      lineHeight: lineHeight[fontSize.h6],
      fontFamily: typography.medium,
    },
    body: {
      fontSize: fontSize.body,
      lineHeight: lineHeight[fontSize.body],
    },
    body1: {
      fontSize: fontSize.body1,
      lineHeight: lineHeight[fontSize.body1],
    },
    body2: {
      fontSize: fontSize.body2,
      lineHeight: lineHeight[fontSize.body2],
    },
    error: {
      fontSize: fontSize.body1,
      lineHeight: lineHeight[fontSize.body1],
      color: colors.danger,
    },
  });
