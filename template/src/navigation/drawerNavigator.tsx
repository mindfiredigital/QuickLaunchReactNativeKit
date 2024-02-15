/**
 * The drawer navigator is used for the "main"
 * navigation flow with side Drawer
 * which the user will use once logged in.
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeScreen} from '../screens/home/homeScreen';
import {SettingsScreen} from '../screens/settings/settingsScreen';
import {PrimaryParamList} from './primaryNavigator';
import {Colors} from '../theme';

const Drawer = createDrawerNavigator<PrimaryParamList>();

const DrawerNavigator = () => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: colors.white,
        headerStyle: styles.headerStyle,
      }}
      initialRouteName={'home'}>
      <Drawer.Screen name={'home'} component={HomeScreen} />
      <Drawer.Screen name={'settings'} component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    headerStyle: {
      backgroundColor: colors.primary,
    },
  });

export default DrawerNavigator;
