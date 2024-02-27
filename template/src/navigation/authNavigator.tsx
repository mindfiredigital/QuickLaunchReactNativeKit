/**
 * The auth navigator is used for the authentication screens
 * like Login, Signup and Forgot password.
 */
import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {useTheme} from '@react-navigation/native';
import {LoginScreen} from '../screens/login/loginScreen';

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 */
export type AuthParamList = {
  login: undefined;
};

/**
 * This types allows TypeScript to know what navigation and routes are defined
 * for screen props.
 */
export type AuthScreenProps<T extends keyof AuthParamList> =
  NativeStackScreenProps<AuthParamList, T>;

const AuthStack = createNativeStackNavigator<AuthParamList>();

const AuthNavigator = () => {
  const {colors} = useTheme();
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
      }}>
      <AuthStack.Screen name={'login'} component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
