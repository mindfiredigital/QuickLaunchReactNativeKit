/**
 * The drawer navigator is used for the "main"
 * navigation flow with side Drawer
 * which the user will use once logged in.
 */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeScreen} from '../screens/home/homeScreen';
import {SettingsScreen} from '../screens/settings/settingsScreen';
import {PrimaryParamList} from './primaryNavigator';

const Drawer = createDrawerNavigator<PrimaryParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'red',
        },
      }}
      initialRouteName={'home'}>
      <Drawer.Screen name={'home'} component={HomeScreen} />
      <Drawer.Screen name={'settings'} component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
