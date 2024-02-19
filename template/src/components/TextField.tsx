import React, {
  forwardRef,
  Ref,
} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import { TextProps} from './Text';
import {Colors, typography} from '../theme';
import {Icon, IconTypes} from './Icon';

export interface TextFieldProps extends Omit<TextInputProps, 'ref'> {
  /**
   * A style modifier for different input states.
   */
  status?: 'error' | 'disabled';
  /**
   * The label text to display if not using `labelTx`.
   */
  label?: TextProps['text'];
  /**
   * The placeholder text to display if not using `placeholderTx`.
   */
  placeholder?: TextProps['text'];
  /**
   * Optional input style override.
   */
  style?: StyleProp<TextStyle>;
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Style overrides for the input wrapper
   */
  inputWrapperStyle?: StyleProp<ViewStyle>;
  secureTextEntry?:boolean,
  rightIcon?:IconTypes,
  leftIcon?:IconTypes,
  editable?:boolean,
  onPressRightIcon?:()=>void
}

/**
 * A component that allows for the entering and editing of text.
 * @param {TextFieldProps} props - The props for the `TextField` component.
 * @returns {JSX.Element} The rendered `TextField` component.
 */
export const TextField = forwardRef(function TextField(
  props: TextFieldProps,
  ref: Ref<TextInput>,
) {
  const {
    secureTextEntry=false,
    rightIcon,
    leftIcon,
    label,
    placeholder,
    style: inputStyleOverride,
    editable,
    onPressRightIcon,
    containerStyle: containerStyleOverride,
    ...TextInputProps
  } = props;
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={[styles.inputWrapperStyles,containerStyleOverride]}>
      {leftIcon &&<Icon icon={leftIcon} color={colors.primary} />}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.lightGrey}
        editable={editable}
        style={[styles.inputStyles,inputStyleOverride]}
        secureTextEntry={secureTextEntry}
        {...TextInputProps}
      />
      {rightIcon &&<Icon icon={rightIcon} color={colors.primary} onPress={onPressRightIcon}/>}
    </View>
  );
});
const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    inputWrapperStyles: {
      borderWidth: 1,
      height: 50,
      width: '100%',
      borderColor: colors.primary,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems:'center',
      padding:5
    },
    inputStyles:{
      flex:1,
      height:30,
      paddingHorizontal:5,
      fontSize:18,
      fontFamily: typography.regular
    }
  });
