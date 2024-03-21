import * as React from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@react-navigation/native';
import {HomeScreen, SettingsScreen} from '../screens';
import {Colors, fontSize, lineHeight, spacing, typography} from '../theme';
import {Home, Settings} from '../assets/svgs';
import {Icon, IconTypes} from '../components';
import {s, vs} from '../utils';

export type TabParansList = {
  home: undefined;
  settings: undefined;
};

/**
 * Tab Navigator Instance
 */
const Tab = createBottomTabNavigator<TabParansList>();

/**
 * RootTabNavigator Component
 *
 * The RootTabNavigator component manages the main navigation flow with bottom tabs
 * which users will interact with upon logging in.
 */
const RootTabNavigator = () => {
  // Constants & hooks
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  /**
   * Renders the tab bar icon.
   *
   * @param icon - JSX.Element | IconTypes: Icon element or icon type.
   * @param color - string: Color of the icon.
   */
  const RenderTabBarIcon = ({
    icon,
    color,
  }: {
    icon: JSX.Element | IconTypes;
    color: string;
  }) => <Icon icon={icon} size={vs(24)} color={color} />;

  /**
   * Screen options for tab navigator
   */
  const screenOptions: BottomTabNavigationOptions = {
    tabBarStyle: [
      styles.container,
      styles.tabShadow,
      {
        height: vs(60) + insets.bottom,
        paddingBottom: insets.bottom ? insets.bottom : vs(spacing.xs),
      },
    ],
    headerStyle: [styles.header, styles.tabShadow],
    tabBarLabelStyle: styles.tabLabel,
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.tertiary,
  };

  /**
   * Generate screen options for tab navigator
   *
   * @param title - string: Title of the screen.
   * @param icon - JSX.Element | IconTypes: Icon element or icon type.
   */
  const generateScreenOptions = ({
    title,
    icon,
  }: {
    title: string;
    icon: JSX.Element | IconTypes;
  }): BottomTabNavigationOptions => ({
    title: title,
    tabBarIcon: ({color}) => <RenderTabBarIcon icon={icon} color={color} />,
  });

  return (
    <Tab.Navigator initialRouteName={'home'} screenOptions={screenOptions}>
      <Tab.Screen
        name={'home'}
        component={HomeScreen}
        options={generateScreenOptions({
          title: t('home.title'),
          icon: <Home />,
        })}
      />
      <Tab.Screen
        name={'settings'}
        component={SettingsScreen}
        options={generateScreenOptions({
          title: t('settings.title'),
          icon: <Settings />,
        })}
      />
    </Tab.Navigator>
  );
};

/**
 * Creates styles for the component
 * @param colors - Colors: Color palette.
 */
const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      borderTopWidth: 0,
      paddingTop: vs(spacing.xs),
      paddingHorizontal: s(spacing.sm),
    } as ViewStyle,
    header: {
      backgroundColor: colors.background,
      borderBottomWidth: 0,
    } as ViewStyle,
    tabShadow: {
      shadowColor: colors.text,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.15,
      shadowRadius: 5.65,
      elevation: 6,
    } as ViewStyle,
    tabLabel: {
      fontSize: fontSize.body,
      lineHeight: lineHeight[fontSize.body],
      fontFamily: typography.medium,
    } as TextStyle,
  });

export default RootTabNavigator;
