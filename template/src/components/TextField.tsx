import React, {forwardRef, Ref, useImperativeHandle, useRef} from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Text, TextProps} from './Text';
import {Colors, fontSize, lineHeight, spacing, typography} from '../theme';
import {Icon, IconTypes} from './Icon';
import {s, vs} from '../utils';

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
   * Style overrides for the container.
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Style overrides for the input wrapper.
   */
  inputWrapperStyle?: StyleProp<ViewStyle>;

  /**
   * Style overrides for the outer wrapper.
   */
  outerWrapper?: StyleProp<ViewStyle>;

  /**
   * Style overrides for the error text.
   */
  errorStyle?: StyleProp<TextStyle>;

  /**
   * Determines whether the text input is a secure text entry (password field).
   */
  secureTextEntry?: boolean;

  /**
   * The type of icon to be displayed on the right side of the text input.
   */
  rightIcon?: IconTypes;

  /**
   * The type of icon to be displayed on the left side of the text input.
   */
  leftIcon?: IconTypes;

  /**
   * Determines whether the text input is editable or not.
   */
  editable?: boolean;

  /**
   * Callback function to be executed when the right icon is pressed.
   */
  onPressRightIcon?: () => void;

  /**
   * The size of the left icon.
   */
  leftIconSize?: number;

  /**
   * The size of the right icon.
   */
  rightIconSize?: number;

  /**
   * Display error string for textinput
   */
  error?: string;
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
    secureTextEntry = false,
    rightIcon,
    leftIcon,
    label,
    placeholder,
    style: inputStyleOverride,
    editable,
    onPressRightIcon,
    containerStyle: containerStyleOverride,
    outerWrapper: outerWrapperOverride,
    errorStyle: errorStyleOverride,
    leftIconSize = vs(20),
    rightIconSize = vs(20),
    error = '',
    ...textInputProps
  } = props;
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  useImperativeHandle(ref, () => input.current as TextInput);

  const wrapperStyle = [
    styles.inputWrapperStyles,
    {borderColor: !!!error ? colors.border : colors.danger},
    containerStyleOverride,
  ];

  return (
    <View style={[styles.outerWrapper, outerWrapperOverride]}>
      <View style={wrapperStyle}>
        {leftIcon && (
          <Icon
            size={leftIconSize}
            icon={leftIcon}
            color={!!!error ? colors.tertiary : colors.danger}
          />
        )}
        <TextInput
          ref={ref}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholderText}
          editable={editable}
          style={[styles.inputStyles, inputStyleOverride]}
          secureTextEntry={secureTextEntry}
          cursorColor={colors.primary}
          {...textInputProps}
        />
        {rightIcon && (
          <Icon
            icon={rightIcon}
            size={rightIconSize}
            color={colors.tertiary}
            onPress={onPressRightIcon}
          />
        )}
      </View>
      {!!error && (
        <Text style={[styles.errorText, errorStyleOverride]}>{error}</Text>
      )}
    </View>
  );
});
const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    outerWrapper: {
      marginHorizontal: s(spacing.md),
      marginBottom: vs(spacing.lg),
    } as ViewStyle,
    inputWrapperStyles: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: s(spacing.sm),
      paddingHorizontal: s(spacing.xs),
    } as ViewStyle,
    inputStyles: {
      flex: 1,
      paddingHorizontal: s(spacing.xs),
      fontSize: fontSize.body,
      fontFamily: typography.regular,
      color: colors.text,
      paddingTop: vs(spacing.sm) + (Platform.OS == 'android' ? vs(2) : 0),
      paddingBottom: vs(spacing.sm),
    } as TextStyle,
    errorText: {
      color: colors.danger,
      marginLeft: s(spacing.xxxs),
    } as TextStyle,
  });
