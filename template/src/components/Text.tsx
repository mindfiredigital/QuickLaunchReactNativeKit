import React from "react"
import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle, StyleSheet } from "react-native"
import { useTheme } from "@react-navigation/native"
import { Colors, typography } from "../theme"


export interface TextProps extends RNTextProps {
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * Children components.
   */
  children?: React.ReactNode
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 * @param {TextProps} props - The props for the `Text` component.
 * @returns {JSX.Element} The rendered `Text` component.
 */
export function Text(props: TextProps): JSX.Element {
  const {  text, children, style: styleOverride, ...rest } = props
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const content =  text || children
  const $styles: StyleProp<TextStyle> = [
    styles.text,
    styleOverride,
  ]

  return (
    <RNText {...rest} style={$styles}>
      {content}
    </RNText>
  )
}

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    text: {
      fontSize: 20,
      color: colors.text,
      fontFamily: typography.regular,
    },
  });
