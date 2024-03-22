import React from 'react';
import {Dimensions, Image, StyleSheet, TextStyle, View} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerNavigationOptions,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {ChangePassword, EditProfileScreen, HomeScreen} from '../screens';
import {Colors, fontSize, lineHeight, spacing, typography} from '../theme';
import {Icon, IconTypes, Text} from '../components';
import {
  AccountSettings,
  Delete,
  HelpCircle,
  Home,
  Information,
  Lock,
  Logout,
  ShieldCheck,
} from '../assets/svgs';
import {
  logoutUser,
  openAboutUs,
  openHelp,
  openPrivacyPolicy,
  s,
  vs,
} from '../utils';
import {useAppSelector} from '../store';

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 */
export type DrawerParamsList = {
  home: undefined;
  editProfile: undefined;
  changePassword: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamsList>();

/**
 * Renders the drawer button icon.
 *
 * @param icon - JSX.Element | IconTypes: Icon element or icon type.
 * @param color - string: Color of the icon.
 */
const RenderDrawerIcon = ({
  icon,
  color,
}: {
  icon: JSX.Element | IconTypes;
  color: string;
}) => <Icon icon={icon} size={vs(24)} color={color} />;

/**
 * Custom drawer content component.
 * Renders the contents of the drawer navigation.
 */
const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  // Constants & hooks
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {user} = useAppSelector(state => state.auth);
  const styles = makeStyles(colors);

  const renderProfileView = () => (
    <View style={styles.profileContainer}>
      <View style={styles.profileImageContainer}>
        <Image
          source={{uri: user.profileSignedUrl}}
          style={styles.profileImage}
        />
      </View>
      <Text size="h3">{user.full_name}</Text>
      <Text>{user.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <DrawerContentScrollView style={styles.scrollView} {...props}>
        {renderProfileView()}
        <DrawerItemList {...props} />
        <DrawerItem
          label={t('settings.privacy')}
          icon={({color}) => (
            <RenderDrawerIcon icon={<ShieldCheck />} color={color} />
          )}
          onPress={openPrivacyPolicy}
        />
        <DrawerItem
          label={t('settings.help')}
          icon={({color}) => (
            <RenderDrawerIcon icon={<HelpCircle />} color={color} />
          )}
          onPress={openHelp}
        />
        <DrawerItem
          label={t('settings.aboutUs')}
          icon={({color}) => (
            <RenderDrawerIcon icon={<Information />} color={color} />
          )}
          onPress={openAboutUs}
        />
        <DrawerItem
          label={t('settings.deleteAccount')}
          icon={({color}) => (
            <RenderDrawerIcon icon={<Delete />} color={color} />
          )}
          onPress={() => {}}
        />
        <DrawerItem
          label={t('settings.logout')}
          icon={({color}) => (
            <RenderDrawerIcon icon={<Logout />} color={color} />
          )}
          onPress={logoutUser}
        />
      </DrawerContentScrollView>
    </View>
  );
};

/**
 * Drawer navigator component.
 * Manages the main navigation flow with a side drawer.
 */
const DrawerNavigator = () => {
  // Constants & hooks
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const {t} = useTranslation();
  const isLargeScreen = Dimensions.get('screen').width >= 768;

  const screenOptions: DrawerNavigationOptions = {
    headerTintColor: colors.primary,
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitle,
    drawerType: isLargeScreen ? 'permanent' : undefined,
    overlayColor: 'transparent',
  };

  const generateScreenOptions = ({
    title,
    icon,
  }: {
    title: string;
    icon: JSX.Element | IconTypes;
  }): DrawerNavigationOptions => ({
    title: title,
    drawerIcon: ({color}) => <RenderDrawerIcon icon={icon} color={color} />,
  });

  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName={'home'}>
      <Drawer.Screen
        name={'home'}
        component={HomeScreen}
        options={generateScreenOptions({
          title: t('home.title'),
          icon: <Home />,
        })}
      />
      <Drawer.Screen
        name={'editProfile'}
        component={EditProfileScreen}
        options={generateScreenOptions({
          title: t('settings.editProfile'),
          icon: <AccountSettings />,
        })}
      />
      <Drawer.Screen
        name={'changePassword'}
        component={ChangePassword}
        options={generateScreenOptions({
          title: t('settings.changePassword'),
          icon: <Lock />,
        })}
      />
    </Drawer.Navigator>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    profileContainer: {
      paddingHorizontal: s(spacing.md),
      paddingVertical: vs(spacing.md),
      borderBottomWidth: 0.5,
      borderBottomColor: colors.border,
      marginBottom: vs(spacing.md),
    },
    profileImageContainer: {
      borderRadius: vs(40),
      overflow: 'hidden',
      alignSelf: 'flex-start',
      marginBottom: vs(spacing.md),
    },
    profileImage: {
      height: vs(80),
      width: vs(80),
    },
    headerStyle: {
      backgroundColor: colors.background,
    },
    headerTitle: {
      fontSize: fontSize.h3,
      lineHeight: lineHeight[fontSize.h3],
      fontFamily: typography.semiBold,
      fontWeight: undefined,
      color: colors.text,
    } as TextStyle,
  });

export default DrawerNavigator;
