import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
  View,
  TextInput,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Colors} from '../theme';
import {s, vs} from '../utils';
import {TextField} from '.';

export interface OTPTextFieldProps extends TouchableOpacityProps {
  /**
   * length of otp
   */
  length?: number;

  /**
   * entered otp number
   */
  otp: string;

  /**
   * set entered text input
   */
  setOtp: (text: string) => void;
}

export const OTPTextField = (props: OTPTextFieldProps) => {
  const {length = 4, otp, setOtp, ...restProps} = props;
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const inputs = useRef<TextInput[]>([]);

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
    setOtp(newOtp);

    // Move focus to next input field or submit OTP if all fields are filled
    if (index < length - 1 && value) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    event: {nativeEvent: {key: string}},
    index: number,
  ) => {
    // Handle backspace key press
    if (event.nativeEvent.key === 'Backspace' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const renderInputs = () => {
    const inputArray = [];
    for (let i = 0; i < length; i++) {
      inputArray.push(
        <TextField
          key={i}
          ref={ref => {
            //TODO: resolve typescript error
            return (inputs.current[i] = ref);
          }}
          maxLength={1}
          keyboardType="numeric"
          value={otp[i] || ''}
          onChangeText={value => handleChange(value, i)}
          onKeyPress={event => handleKeyPress(event, i)}
          containerStyle={styles.containerStyle}
          style={{
            textAlign: 'center',
          }}
        />,
      );
    }
    return inputArray;
  };

  return (
    <>
      <View style={styles.container}>{renderInputs()}</View>
    </>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      height: vs(54),
    } as ViewStyle,
    containerStyle: {
      width: vs(54),
      height: vs(54),
      marginHorizontal: s(10),
    } as TextStyle,
  });
