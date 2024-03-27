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
import {
  ForgotPasswordScreen,
  LoginScreen,
  SetNewPasswordScreen,
  SignUpScreen,
  VerifyOTPScreen,
} from '../screens';
import makeCommanStyles from '../screens/styles';

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 */
export type AuthParamList = {
  login: undefined;
  signUp: undefined;
  forgotPassword: {email: string};
  setNewPassword: undefined;
  verifyOTP: undefined;
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
  const commonStyles = makeCommanStyles(colors);
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: colors.tertiary,
        headerTitle: '',
        headerBackTitleVisible: false,
        navigationBarColor: colors.background,
        headerShadowVisible: false,
      }}>
      <AuthStack.Screen
        name={'login'}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen name={'signUp'} component={SignUpScreen} />
      <AuthStack.Screen
        name={'forgotPassword'}
        component={ForgotPasswordScreen}
      />
      <AuthStack.Screen
        name={'setNewPassword'}
        component={SetNewPasswordScreen}
      />
      <AuthStack.Screen name={'verifyOTP'} component={VerifyOTPScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
