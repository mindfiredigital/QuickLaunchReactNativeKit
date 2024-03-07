import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TextInputProps,
  ViewStyle,
  TextStyle,
  Keyboard,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Colors, spacing as spacingUtils, typography} from '../theme';
import {s, vs} from '../utils';
import {Text} from '.';

/**
 * Props for OTPTextField component.
 */
export interface OTPTextFieldProps extends TextInputProps {
  /**
   * Length of the OTP (One-Time Password).
   */
  length?: number;

  /**
   * Entered OTP number.
   */
  otp: string;

  /**
   * Callback to update the entered OTP.
   */
  setOtp: (text: string) => void;

  /**
   * Size of the individual OTP input fields.
   */
  size?: number;

  /**
   * Spacing between OTP input fields.
   */
  spacing?: number;

  /**
   * Error message to be displayed.
   */
  error?: string;

  /**
   * Override styles for the container.
   */
  containerStyleOverride?: ViewStyle;

  /**
   * Override styles for the input fields.
   */
  inputStyleOverride?: TextStyle;
}

/**
 * A custom OTP (One-Time Password) input field component.
 * Displays a row of input fields for entering OTP.
 */
export const OTPTextField = (props: OTPTextFieldProps) => {
  const {
    length = 6,
    otp,
    setOtp,
    size = vs(46),
    spacing = s(spacingUtils.md),
    error = '',
    containerStyleOverride,
    inputStyleOverride,
    ...restProps
  } = props;
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const inputs = useRef<TextInput[]>([]);

  const inputStyles = [
    styles.inputStyle,
    {
      width: size,
      height: size,
      fontSize: size / 2.5,
      borderColor: !!!error ? colors.border : colors.danger,
    },
    inputStyleOverride, // Apply the override styles for input fields
  ];

  /**
   * Handle change in the OTP input field.
   * @param value - The entered value in the input field.
   * @param index - The index of the input field.
   */
  const handleChange = (value: string, index: number) => {
    // Only allow digits in OTP input
    const numRegex = /^[0-9]+$/;
    if (value && !numRegex.test(value)) {
      return;
    }

    // Update OTP value
    let newOtp = otp;
    if (value) {
      newOtp = newOtp.substring(0, index) + value + newOtp.substring(index + 1);
    } else {
      newOtp = newOtp.substring(0, index) + newOtp.substring(index + 1);
    }
    if (newOtp.length == length) {
      Keyboard.dismiss();
    }
    setOtp(newOtp);

    // Move focus to the next input field or submit OTP if all fields are filled
    if (index < length - 1 && value) {
      inputs.current[index + 1]?.focus();
    }
  };

  /**
   * Handle key press events in the OTP input field.
   * @param event - The key press event.
   * @param index - The index of the input field.
   */
  const handleKeyPress = (
    event: {nativeEvent: {key: string}},
    index: number,
  ) => {
    // Handle backspace key press
    if (event.nativeEvent.key === 'Backspace' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  /**
   * Render the OTP input fields.
   * @returns Array of TextInput components.
   */
  const renderInputs = () => {
    const inputArray = [];
    for (let i = 0; i < length; i++) {
      inputArray.push(
        <TextInput
          ref={ref => {
            if (ref) return (inputs.current[i] = ref);
          }}
          key={i}
          maxLength={1}
          keyboardType="numeric"
          value={otp[i] || ''}
          placeholderTextColor={colors.placeholderText}
          cursorColor={colors.primary}
          onChangeText={value => handleChange(value, i)}
          onKeyPress={event => handleKeyPress(event, i)}
          style={[
            inputStyles,
            {
              marginRight: i !== length - 1 ? spacing : 0,
            },
          ]}
          {...restProps}
        />,
      );
    }
    return inputArray;
  };

  return (
    <View style={[styles.container, containerStyleOverride]}>
      {renderInputs()}
      {!!error && <Text size="error">{error}</Text>}
    </View>
  );
};

/**
 * Helper function to create styles for OTPTextField component.
 * @param colors - The color palette from the theme.
 * @returns StyleSheet styles.
 */
const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: s(spacingUtils.md),
    } as ViewStyle,
    inputStyle: {
      borderWidth: 1,
      fontFamily: typography.medium,
      borderRadius: spacingUtils.xs,
      textAlign: 'center',
      marginBottom: spacingUtils.md,
    } as TextStyle,
  });
