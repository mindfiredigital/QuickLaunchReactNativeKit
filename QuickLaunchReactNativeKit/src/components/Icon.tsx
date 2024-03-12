import React, {ComponentType} from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { iconRegistry } from '../assets/icons';
import { Colors } from '../theme';
import { useTheme } from '@react-navigation/native';

export type IconTypes = keyof typeof iconRegistry;

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes;

  /**
   * An optional tint color for the icon
   */
  color?: string;

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number;

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>;

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps['onPress'];
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 * @param {IconProps} props - The props for the `Icon` component.
 * @returns {JSX.Element} The rendered `Icon` component.
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: imageStyleOverride,
    containerStyle: containerStyleOverride,
    ...WrapperProps
  } = props;

  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const isPressable = !!WrapperProps.onPress;
  const Wrapper = (
    WrapperProps?.onPress ? TouchableOpacity : View
  ) as ComponentType<TouchableOpacityProps | ViewProps>;

  const imageStyle: StyleProp<ImageStyle> = [
    styles.imageStyleBase,
    color !== undefined && {tintColor: color},
    size !== undefined && {width: size, height: size},
    imageStyleOverride,
  ];

  return (
    <Wrapper
      accessibilityRole={isPressable ? 'imagebutton' : undefined}
      {...WrapperProps}
      style={containerStyleOverride}>
      <Image style={imageStyle} source={iconRegistry[icon]} />
    </Wrapper>
  );
}
const makeStyles = (colors:Colors) =>
StyleSheet.create({
  imageStyleBase: {
    resizeMode: 'contain',
    },
  });
