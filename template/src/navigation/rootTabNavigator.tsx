import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NAVIGATION_TO_HOME_SCREEN, NAVIGATION_TO_SETTINGS_SCREEN } from './routes';
import { HomeScreen } from '../screens/home/homeScreen';
import { SettingsScreen } from '../screens/settings/settingsScreen';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const RootTabNavigator = () => {
  const styles = makeStyles();

  return (
    <Tab.Navigator
      initialRouteName={NAVIGATION_TO_HOME_SCREEN}
      screenOptions={() => ({
        tabBarStyle: styles.container,
        tabBarShowLabel: false,
        headerShown: false,
        headerStyle: { backgroundColor: 'red' },
      })}
    >
      <Tab.Screen
        name={NAVIGATION_TO_HOME_SCREEN}
        component={HomeScreen}
      />
      <Tab.Screen
        name={NAVIGATION_TO_SETTINGS_SCREEN}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

const makeStyles = () =>
  StyleSheet.create({
    container: {
      height: 75,
      backgroundColor: 'pink',
      // backgroundColor: 'red',
      paddingHorizontal: 16,
      paddingVertical: 15,
      margin: 0,
      width: '100%',
      zIndex: 2,
      elevation: 5,
    },
  });

export default RootTabNavigator;
