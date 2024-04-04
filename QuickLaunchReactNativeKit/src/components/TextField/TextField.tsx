import React, {
  forwardRef,
  Ref,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {TextInput, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Text, Icon} from 'components';
import {vs} from 'utils';
import {TextFieldProps} from './TextField.props';
import {makeStyles} from './styles';
import {PasswordHint} from './PasswordHint';
import {EyeOffOutline, EyeOutline} from 'src/assets/svgs';

/**
 * A component that allows for the entering and editing of text.
 * @param {TextFieldProps} props - The props for the `TextField` component.
 * @returns {JSX.Element} The rendered `TextField` component.
 */
export const TextField = forwardRef(function TextField(
  props: TextFieldProps,
  ref: Ref<TextInput>,
) {
  const input = useRef<TextInput>(null);
  const hintRef = useRef<{
    toggle: () => void;
  }>(null);
  const {
    preset = 'default',
    rightIcon,
    leftIcon,
    label,
    placeholder,
    style: inputStyleOverride,
    editable,
    onPressRightIcon,
    onPressLeftIcon,
    containerStyle: containerStyleOverride,
    outerWrapper: outerWrapperOverride,
    errorStyle: errorStyleOverride,
    leftIconSize = vs(24),
    rightIconSize = vs(24),
    error = '',
    ...textInputProps
  } = props;
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const [secureTextEntry, setSecureTextEntry] = useState(preset === 'password');

  useImperativeHandle(ref, () => input.current as TextInput);

  const wrapperStyle = [
    styles.inputWrapperStyles,
    {borderColor: !!!error ? colors.border : colors.danger},
    containerStyleOverride,
  ];

  const onLeftPress = () => {
    if (!!onPressLeftIcon) {
      onPressLeftIcon();
    } else if (preset === 'password') {
      hintRef?.current?.toggle();
    }
  };

  /**
   * Render right icon based on preset
   */
  const renderRightIcon = () => {
    let icon = null;
    if (rightIcon) {
      icon = rightIcon;
    } else if (preset === 'password') {
      icon = secureTextEntry ? <EyeOutline /> : <EyeOffOutline />;
    }

    let onPress = () => {};
    if (onPressRightIcon) {
      onPress = onPressRightIcon;
    } else if (preset === 'password') {
      onPress = () => setSecureTextEntry(!secureTextEntry);
    }

    if (icon) {
      return (
        <Icon
          icon={icon}
          size={rightIconSize}
          color={colors.tertiary}
          onPress={onPress}
        />
      );
    }

    return null; // If no icon matches conditions, return null or any other default behavior you desire
  };

  return (
    <View style={[styles.outerWrapper, outerWrapperOverride]}>
      <View style={wrapperStyle}>
        {leftIcon && (
          <Icon
            icon={leftIcon}
            size={leftIconSize}
            color={!!!error ? colors.tertiary : colors.danger}
            {...((preset === 'password' || !!onPressLeftIcon) && {
              onPress: onLeftPress,
            })}
          />
        )}
        <TextInput
          ref={input}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholderText}
          editable={editable}
          style={[styles.inputStyles, inputStyleOverride]}
          cursorColor={colors.primary}
          secureTextEntry={secureTextEntry}
          blurOnSubmit={!!textInputProps.onSubmitEditing ? false : true}
          {...textInputProps}
        />
        {renderRightIcon()}
      </View>
      {!!error && (
        <Text size="error" style={[styles.errorText, errorStyleOverride]}>
          {error}
        </Text>
      )}
      {!!!error && <PasswordHint ref={hintRef} />}
    </View>
  );
});
