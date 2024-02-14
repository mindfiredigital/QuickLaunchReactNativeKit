/**
 * The tab navigator is used for the "main"
 * navigation flow with bottom tabs which
 * the user will use once logged in.
 */
import * as React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/home/homeScreen';
import {SettingsScreen} from '../screens/settings/settingsScreen';
import {PrimaryParamList} from './primaryNavigator';

const Tab = createBottomTabNavigator<PrimaryParamList>();

const RootTabNavigator = () => {
  const styles = makeStyles();

  return (
    <Tab.Navigator
      initialRouteName={'home'}
      screenOptions={() => ({
        tabBarStyle: styles.container,
        tabBarShowLabel: false,
        headerShown: false,
        headerStyle: {backgroundColor: 'red'},
      })}>
      <Tab.Screen name={'home'} component={HomeScreen} />
      <Tab.Screen name={'settings'} component={SettingsScreen} />
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
