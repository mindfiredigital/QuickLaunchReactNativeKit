import {View, TextInput, TouchableOpacity, Image, Text, StyleSheet, PressableProps as RNPressableProps, TouchableOpacityProps, ViewStyle, StyleProp, TextStyle, Pressable} from 'react-native';
import React from 'react';
import {Colors, typography} from '../theme';
import {useTheme} from '@react-navigation/native';

export interface ButtonProps extends RNPressableProps {
    btnText:string,
    onPress:TouchableOpacityProps["onPress"]
    styleProps?:StyleProp<ViewStyle>
    textStyleProps?:StyleProp<TextStyle>,
    isDisabled?:boolean
}

const Button = (props:ButtonProps) => {
  const {
    btnText,
    onPress,
    styleProps,
    textStyleProps,
    isDisabled = false,
    ...restProps
  }=props
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  return (
    <Pressable
      onPress={onPress}
      disabled={Boolean(isDisabled)}
      style={[
        styles.container,
        styleProps,
        isDisabled ? styles.isDisabledStyle : null,
      ]}>
      <Text style={[styles.btnText, textStyleProps]}>{btnText}</Text>
    </Pressable>
  );
};

const makeStyles = (colors:Colors) =>
StyleSheet.create({
    container: {
      width: '100%',
      height: 50,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
    },
    btnText: {
      color: colors.white,
      fontFamily: typography.regular,
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 15,
      lineHeight: 18,
    },
    isDisabledStyle: {backgroundColor: colors.lightGrey},
  });

export default Button;
