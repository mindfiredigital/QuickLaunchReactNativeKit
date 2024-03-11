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
import {useTheme} from '@react-navigation/native';
import {Colors} from '../theme';

const Tab = createBottomTabNavigator<PrimaryParamList>();

const RootTabNavigator = () => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  return (
    <Tab.Navigator
      initialRouteName={'home'}
      screenOptions={{
        tabBarStyle: styles.container,
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen name={'home'} component={HomeScreen} />
      <Tab.Screen name={'settings'} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      height: 75,
      paddingHorizontal: 16,
      paddingVertical: 15,
      margin: 0,
      width: '100%',
      zIndex: 2,
      elevation: 5,
    },
  });

export default RootTabNavigator;
