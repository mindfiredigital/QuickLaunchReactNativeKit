import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NAVIGATION_TO_HOME_SCREEN, NAVIGATION_TO_SETTINGS_SCREEN } from './routes';
import { HomeScreen } from '../screens/home/homeScreen';
import { SettingsScreen } from '../screens/settings/settingsScreen';
const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'red',
        },
      }}
      initialRouteName={NAVIGATION_TO_HOME_SCREEN}
    >
      <Drawer.Screen
        name={NAVIGATION_TO_HOME_SCREEN}
        component={HomeScreen}
      />
      <Drawer.Screen
        name={NAVIGATION_TO_SETTINGS_SCREEN}
        component={SettingsScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
