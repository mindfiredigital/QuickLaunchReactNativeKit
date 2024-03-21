import React from 'react';
import {StyleSheet, View, ViewProps, ViewStyle} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Colors, spacing} from '../theme';
import {s} from '../utils';

/**
 * Props for the Card component.
 */
export interface CardProps extends ViewProps {
  /**
   * Children components to be rendered inside the card.
   */
  children?: React.ReactNode;
}

/**
 * A simple card component with shadow and customizable background color.
 */
export const Card = ({children, ...rest}: CardProps) => {
  // Accessing theme colors using useTheme hook
  const {colors} = useTheme();
  // Generating styles based on theme colors
  const styles = makeStyles(colors);

  return (
    <View style={styles.card} {...rest}>
      {/* Render children inside the card */}
      {children}
    </View>
  );
};

// Function to generate styles for the card
const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    card: {
      // Shadow properties
      shadowColor: colors.text,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.15,
      shadowRadius: 5.65,
      elevation: 6, // For Android elevation
      borderRadius: s(spacing.xs),
      backgroundColor: colors.card,
    } as ViewStyle,
  });
