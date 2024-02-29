import React from 'react';
import {
  StyleSheet,
  PressableProps as RNPressableProps,
  TouchableOpacityProps,
  ViewStyle,
  StyleProp,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Text, TextProps} from './Text';
import {Colors, spacing, typography} from '../theme';
import {s, vs} from '../utils';
import {Icon, IconTypes} from '.';

export interface ButtonProps extends TouchableOpacityProps {
  /**
   * The text to be displayed on the button.
   */
  btnText?: string;

  /**
   * The predefined style preset for the button.
   */
  preset?: 'default' | 'link';

  /**
   * Callback function to be executed when the button is pressed.
   */
  onPress: TouchableOpacityProps['onPress'];

  /**
   * Style overrides for the button container.
   */
  styleProps?: StyleProp<ViewStyle>;

  /**
   * Style overrides for the button text.
   */
  textStyleProps?: StyleProp<TextStyle>;

  /**
   * Determines whether the button is in a disabled state.
   */
  isDisabled?: boolean;

  /**
   * Additional text props for the button text component.
   */
  restTextProps?: TextProps;

  /**
   * Additional button props for the button icon component
   */
  btnIcon?: IconTypes;

  /**
   * The size of the icon.
   */
  btnIconSize?: number;
}

export const Button = (props: ButtonProps) => {
  const {
    btnText,
    preset = 'default',
    onPress,
    styleProps,
    textStyleProps,
    isDisabled = false,
    restTextProps,
    btnIcon,
    btnIconSize = vs(30),
    ...restProps
  } = props;
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const presets = {
    default: {
      buttonStyles: styles.container,
      disabledStyle: styles.isDisabledStyle,
      btnTextStyle: styles.btnText,
    },
    link: {
      buttonStyles: styles.link,
      disabledStyle: styles.isDisabledLinkStyle,
      btnTextStyle: styles.linkText,
    },
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={Boolean(isDisabled)}
      style={[
        presets[preset].buttonStyles,
        styleProps,
        isDisabled ? presets[preset].disabledStyle : null,
      ]}
      {...restProps}>
      {btnIcon && (
        <Icon icon={btnIcon} size={btnIconSize} color={colors.primary} />
      )}
      <Text
        style={[presets[preset].btnTextStyle, textStyleProps]}
        {...restTextProps}>
        {btnText}
      </Text>
    </TouchableOpacity>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      height: vs(50),
      marginHorizontal: s(spacing.md),
      borderRadius: s(spacing.sm),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      marginBottom: vs(spacing.lg),
      flexDirection: 'row',
    } as ViewStyle,
    link: {
      paddingHorizontal: s(spacing.xs),
      flexDirection: 'row',
      alignItems: 'center',
    } as ViewStyle,
    btnText: {
      color: colors.btnTextPrimary,
      fontFamily: typography.bold,
    } as TextStyle,
    linkText: {
      color: colors.primary,
      fontFamily: typography.medium,
    } as TextStyle,
    isDisabledStyle: {backgroundColor: colors.placeholderText} as ViewStyle,
    isDisabledLinkStyle: {backgroundColor: colors.transparent} as ViewStyle,
  });
