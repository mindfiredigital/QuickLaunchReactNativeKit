import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {useTranslation} from 'react-i18next';
import {HomeScreen, SettingsScreen} from '../screens';
import {PrimaryParamList} from './primaryNavigator';
import {Colors} from '../theme';
import {Icon, IconTypes} from '../components';
import {Home, Settings} from '../assets/svgs';
import {vs} from '../utils';

const Drawer = createDrawerNavigator<PrimaryParamList>();

/**
 * The drawer navigator is used for the "main"
 * navigation flow with side Drawer
 * which the user will use once logged in.
 */
const DrawerNavigator = () => {
  // Constants & hooks
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const {t} = useTranslation();
  const isLargeScreen = Dimensions.get('screen').width >= 768;

  /**
   * Renders the drawer button icon.
   *
   * @param icon - JSX.Element | IconTypes: Icon element or icon type.
   * @param color - string: Color of the icon.
   */
  const RenderDrawerIcon = ({
    icon,
    color,
  }: {
    icon: JSX.Element | IconTypes;
    color: string;
  }) => <Icon icon={icon} size={vs(24)} color={color} />;

  /**
   * Screen options for drawer navigator
   */
  const screenOptions: DrawerNavigationOptions = {
    headerTintColor: colors.primary,
    headerStyle: styles.headerStyle,
    drawerType: isLargeScreen ? 'permanent' : undefined,
    overlayColor: 'transparent',
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
  }): DrawerNavigationOptions => ({
    title: title,
    drawerIcon: ({color}) => <RenderDrawerIcon icon={icon} color={color} />,
  });

  return (
    <Drawer.Navigator screenOptions={screenOptions} initialRouteName={'home'}>
      <Drawer.Screen
        name={'home'}
        component={HomeScreen}
        options={generateScreenOptions({
          title: t('home.title'),
          icon: <Home />,
        })}
      />
      <Drawer.Screen
        name={'settings'}
        component={SettingsScreen}
        options={generateScreenOptions({
          title: t('settings.title'),
          icon: <Settings />,
        })}
      />
    </Drawer.Navigator>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    headerStyle: {
      backgroundColor: colors.background,
    },
  });

export default DrawerNavigator;
