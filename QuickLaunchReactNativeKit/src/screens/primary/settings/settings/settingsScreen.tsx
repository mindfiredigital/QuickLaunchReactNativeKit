import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {MenuItem, Screen, Separator} from '../../../../components';
import {PrimaryScreenProps} from '../../../../navigation/primaryNavigator';
import {
  Delete,
  HelpCircle,
  Information,
  Lock,
  Logout,
  ShieldCheck,
} from '../../../../assets/svgs';
import {AppTheme, ProfileSettings, SettingsSection} from './components';
import {useAppSelector} from '../../../../store';
import makeStyles from './styles';
import {
  logoutUser,
  openAboutUs,
  openHelp,
  openPrivacyPolicy,
} from '../../../../utils';

export const SettingsScreen: FC<PrimaryScreenProps<'settings'>> = ({
  navigation,
  route,
}) => {
  // constants & hooks
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {params} = route;

  // redux hooks
  const {user} = useAppSelector(state => state.auth);

  // Styles
  const styles = makeStyles(colors);

  /**
   * Generates the account settings section.
   */
  const accountSettings = () => (
    <SettingsSection title={t('settings.account')}>
      <ProfileSettings
        profileUrl={user?.profileSignedUrl}
        userName={user?.full_name}
        email={user?.email}
        onPress={() => {
          // Handle edit profile action
          navigation.navigate('editProfile');
        }}
      />
      <Separator />
      <MenuItem
        icon={<Lock />}
        text={t('settings.changePassword')}
        onPress={() => {
          // Handle change password action
          navigation.navigate('changePassword');
        }}
      />
      <Separator />
      <MenuItem
        icon={<Delete />}
        text={t('settings.deleteAccount')}
        onPress={() => {
          //TODO: Handle help action
        }}
      />
      <Separator />
      <MenuItem
        icon={<Logout />}
        text={t('settings.logout')}
        onPress={logoutUser}
      />
    </SettingsSection>
  );

  /**
   * Generates the app related settings section.
   */
  const renderAppSettings = (title: string) => (
    <SettingsSection title={title}>
      <AppTheme />
    </SettingsSection>
  );

  /**
   * Generates the other settings section.
   */
  const otherSettings = () => (
    <SettingsSection title={t('settings.other')}>
      <MenuItem
        icon={<ShieldCheck />}
        text={t('settings.privacy')}
        onPress={openPrivacyPolicy}
      />
      <Separator />
      <MenuItem
        icon={<HelpCircle />}
        text={t('settings.help')}
        onPress={openHelp}
      />
      <Separator />
      <MenuItem
        icon={<Information />}
        text={t('settings.aboutUs')}
        onPress={openAboutUs}
      />
    </SettingsSection>
  );

  if (!!params?.onlyShowAppSettings) {
    return (
      <Screen
        safeAreaEdges={['left', 'right']}
        preset="auto"
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        {renderAppSettings('')}
      </Screen>
    );
  }

  return (
    <Screen
      safeAreaEdges={['left', 'right']}
      preset="auto"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {accountSettings()}
      {renderAppSettings(t('settings.app'))}
      {otherSettings()}
    </Screen>
  );
};
