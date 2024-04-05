import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
  ActivityIndicatorProps,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Text} from 'components';
import {Colors, spacing} from 'theme';
import {s} from 'utils';

/**
 * Define the properties expected by the Spinner component.
 *
 * @interface SpinnerProps
 * @extends {ActivityIndicatorProps}
 */
interface SpinnerProps extends ActivityIndicatorProps {
  /**
   * Indicates whether the spinner should be in the loading state.
   */
  loading: boolean;

  /**
   * Optional style for the container wrapping the spinner.
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Optional style for the spinner itself.
   */
  spinnerStyle?: StyleProp<ViewStyle>;

  /**
   * Optional styles for the text displayed with the spinner.
   */
  textStyles?: StyleProp<TextStyle>;
}

/**
 * Spinner component that displays an animated loading spinner with optional text.
 *
 * @component
 * @param {SpinnerProps} props - The properties of the Spinner component.
 * @returns {ReactNode|null} The rendered component or null if loading is false.
 */
export const Spinner = (props: SpinnerProps) => {
  // Destructure properties from props
  const {
    loading,
    color,
    containerStyle,
    spinnerStyle,
    textStyles,
    ...restProps
  } = props;
  const {colors} = useTheme();
  const styles = themedStyle(colors);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showSpinner, setShowSpinner] = useState(loading);

  // Effect to handle changes in the loading prop and trigger animations
  useEffect(() => {
    if (loading) {
      setShowSpinner(true);
      // Fade in animation when loading is true
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      // Fade out animation when loading is false
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        setShowSpinner(false);
      });
    }
  }, [loading]);

  // Render the spinner if showSpinner is true, otherwise return null
  if (showSpinner) {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
          },
          containerStyle,
        ]}>
        <Animated.View style={[styles.spinner, spinnerStyle]}>
          <ActivityIndicator
            animating={loading}
            size={'small'}
            color={color || colors.primary}
            style={styles.activityIndicatorStyle}
            {...restProps}
          />
          <Text style={[styles.loadingText, textStyles]}>{'Loading...'}</Text>
        </Animated.View>
      </Animated.View>
    );
  }

  return null;
};

/**
 * Function to create themed styles based on the provided colors.
 */
const themedStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
      backgroundColor: colors.spinner,
    } as ViewStyle,
    spinner: {
      backgroundColor: colors.background,
      padding: s(spacing.sm),
      borderRadius: s(spacing.sm),
    } as ViewStyle,
    activityIndicatorStyle: {
      marginBottom: s(spacing.xs),
    } as ViewStyle,
    loadingText: {
      textAlign: 'center',
    } as TextStyle,
  });
