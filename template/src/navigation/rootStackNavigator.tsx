import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import RootTabNavigator from './rootTabNavigator';
import DrawerNav from './drawerNav';
import {
  DRAWER_MENU_BAR,
  NAVIGATION_TO_LOGIN_SCREEN,
  NAVIGATION_TO_TAB,
} from './routes';
import {LoginScreen} from '../screens/login/loginScreen';

export const AuthenticationStack = createNativeStackNavigator();
export const AuthenticatedStack = createNativeStackNavigator();

const AuthNavigator = () => (
  <AuthenticationStack.Navigator>
    <AuthenticationStack.Screen
      name={NAVIGATION_TO_LOGIN_SCREEN}
      component={LoginScreen}
      options={{header: () => null}}
    />
  </AuthenticationStack.Navigator>
);

const PrimaryNavigator = () => (
  <AuthenticatedStack.Navigator>
    {false ? (
      <AuthenticatedStack.Screen
        name={NAVIGATION_TO_TAB}
        component={RootTabNavigator}
        options={{header: () => null}}
      />
    ) : (
      <AuthenticatedStack.Screen
        name={DRAWER_MENU_BAR}
        component={DrawerNav}
        options={{header: () => null}}
      />
    )}
  </AuthenticatedStack.Navigator>
);

const RootStackNavigator = () => {
  const isLogin = false;

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer>
        {isLogin ? <PrimaryNavigator/> : <AuthNavigator/>}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootStackNavigator;
