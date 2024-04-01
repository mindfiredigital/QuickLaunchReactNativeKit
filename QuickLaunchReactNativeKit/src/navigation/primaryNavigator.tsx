/**
 * The primary navigator is used for the "main"
 * navigation flow which the user will use once logged in.
 * This has option to choose between bottom tab and drawer.
 */
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {TabNavigator, DrawerNavigator} from 'navigation';
import {ChangePassword, EditProfileScreen, WebViewScreen} from 'screens';
import {settings} from 'settings';
import makeCommanStyles from 'styles';

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 */
export type PrimaryParamList = {
  homeNav: undefined;
  settings: {onlyShowAppSettings?: boolean};
  editProfile: undefined;
  changePassword: undefined;
  webView: {renderType: 'uri' | 'html'; uriOrHTML: string; title: any};
};

/**
 * This types allows TypeScript to know what navigation and routes are defined
 * for screen props.
 */
export type PrimaryScreenProps<T extends keyof PrimaryParamList> =
  NativeStackScreenProps<PrimaryParamList, T>;

const PrimaryStack = createNativeStackNavigator<PrimaryParamList>();

export const PrimaryNavigator = () => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const commonStyles = makeCommanStyles(colors);

  return (
    <PrimaryStack.Navigator
      initialRouteName="homeNav"
      screenOptions={{
        navigationBarColor: colors.background,
        headerTitleStyle: commonStyles.headerTitle,
        headerTintColor: colors.tertiary,
        headerShown: false,
        headerTitleAlign: 'center',
        headerStyle: commonStyles.headerBackground,
      }}>
      {settings.navigationType == 'drawer' ? (
        <>
          <PrimaryStack.Screen name={'homeNav'} component={DrawerNavigator} />
        </>
      ) : (
        <>
          <PrimaryStack.Screen name={'homeNav'} component={TabNavigator} />
          <PrimaryStack.Screen
            name={'editProfile'}
            component={EditProfileScreen}
            options={{
              title: t('settings.editProfile'),
              headerShown: true,
              headerBackTitleVisible: false,
              headerBackTitle: t('settings.title'),
            }}
          />
          <PrimaryStack.Screen
            name={'changePassword'}
            component={ChangePassword}
            options={{
              title: t('settings.changePassword'),
              headerShown: true,
              headerBackTitleVisible: false,
              headerBackTitle: t('settings.title'),
            }}
          />
        </>
      )}
      <PrimaryStack.Screen
        name={'webView'}
        component={WebViewScreen}
        options={{
          title: '',
          headerShown: true,
          headerBackTitleVisible: false,
        }}
      />
    </PrimaryStack.Navigator>
  );
};
