import React from 'react';
import {
  StyleSheet,
  PressableProps as RNPressableProps,
  TouchableOpacityProps,
  ViewStyle,
  StyleProp,
  TextStyle,
  View,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Text} from './Text';
import {Colors} from '../theme';
import {s, vs} from '../utils';
import {IconTypes} from '.';
import {ChevronLeft} from '../assets/svgs';

export interface HeaderProps extends TouchableOpacityProps {
  /**
   * The text to be displayed on top.
   */
  headerText?: string;

  /**
   * Callback function to be executed when the  left button is pressed.
   */
  onPressLeft?: TouchableOpacityProps['onPress'];

  /**
   * Callback function to be executed when the  right button is pressed.
   */
  onPressRight?: TouchableOpacityProps['onPress'];

  /**
   * Style overrides for the header container.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Style overrides for the header text.
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   * Additional header props for the header left button icon component
   */
  showLeftBtn?: boolean;
  leftBtnIcon?: IconTypes;

  /**
   * Additional header props for the header right button icon component
   */
  rightBtnIcon?: IconTypes;
}

export const Header = (props: HeaderProps) => {
  const {colors} = useTheme();
  const {
    headerText,
    onPressLeft,
    onPressRight,
    style: styleOverride,
    textStyle: textStyleOverride,
    showLeftBtn,
    leftBtnIcon = (
      <ChevronLeft height={vs(50)} width={s(40)} fill={colors.tertiary} />
    ),
    rightBtnIcon,
    ...restProps
  } = props;
  const styles = makeStyles(colors);

  return (
    <View style={[styles.container, styleOverride]}>
      <View style={styles.leftView}>
        {showLeftBtn && (
          <TouchableOpacity style={styles.leftBtnView} onPress={onPressLeft}>
            {leftBtnIcon}
          </TouchableOpacity>
        )}
      </View>
      {headerText && (
        <Text
          text={headerText}
          size="h3"
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[styles.headerText, textStyleOverride]}
        />
      )}
      <View style={styles.rightView}>
        {rightBtnIcon && (
          <TouchableOpacity style={styles.rightBtnView} onPress={onPressRight}>
            {rightBtnIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    } as ViewStyle,
    headerText: {
      fontSize: vs(20),
      color: colors.text,
    } as TextStyle,
    leftView: {
      width: s(50),
    } as ViewStyle,
    rightView: {
      width: s(50),
      alignItems: 'flex-end',
    } as ViewStyle,
    leftBtnView: {
      alignSelf: 'flex-start',
    } as ViewStyle,
    rightBtnView: {
      paddingHorizontal: 0,
      alignSelf: 'flex-end',
    } as ViewStyle,
  });
