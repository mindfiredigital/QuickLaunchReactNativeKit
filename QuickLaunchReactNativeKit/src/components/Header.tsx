import React from 'react';
import {
  StyleSheet,
  PressableProps as RNPressableProps,
  TouchableOpacityProps,
  ViewStyle,
  StyleProp,
  TextStyle,
  View,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Text} from './Text';
import {Colors} from '../theme';
import {s, vs} from '../utils';
import {Button, Icon, IconTypes} from '.';

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
  styleProps?: StyleProp<ViewStyle>;

  /**
   * Style overrides for the header text.
   */
  headerTextStyleProps?: StyleProp<TextStyle>;

  /**
   * Additional header props for the header left button icon component
   */
  leftBtnIcon?: IconTypes;

  /**
   * Additional header props for the header right button icon component
   */
  rightBtnIcon?: IconTypes;
}

export const Header = (props: HeaderProps) => {
  const {
    headerText,
    onPressLeft,
    onPressRight,
    styleProps,
    headerTextStyleProps,
    leftBtnIcon,
    rightBtnIcon,
    ...restProps
  } = props;
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={[styles.container, styleProps]}>
      <View style={styles.leftView}>
        {leftBtnIcon && (
          <Button
            preset="link"
            btnIcon="back"
            btnIconSize={vs(30)}
            onPress={onPressLeft}
            styleProps={styles.rightBtnView}
          />
        )}
      </View>
      {headerText && (
        <Text
          text={headerText}
          size="h1"
          style={[styles.headerText, headerTextStyleProps]}
        />
      )}
      <View style={styles.rightView}>
        {rightBtnIcon && (
          <Button
            preset="link"
            btnIcon="back"
            btnIconSize={vs(30)}
            onPress={onPressRight}
            styleProps={styles.rightBtnView}
          />
        )}
      </View>
    </View>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    } as ViewStyle,
    headerText: {
      color: colors.primary,
    } as TextStyle,
    leftView: {
      width: s(100),
    } as ViewStyle,
    rightView: {
      width: s(100),
      alignItems: 'flex-end',
    } as ViewStyle,
    rightBtnView: {
      paddingHorizontal: 0,
    } as ViewStyle,
  });
