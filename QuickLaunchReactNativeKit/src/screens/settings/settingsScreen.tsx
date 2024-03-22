import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {Screen, Separator} from '../../components';
import {PrimaryScreenProps} from '../../navigation/primaryNavigator';
import {
  Delete,
  HelpCircle,
  Information,
  Lock,
  Logout,
  ShieldCheck,
} from '../../assets/svgs';
import {ProfileSettings, SettingsItem, SettingsSection} from './components';
import {useAppSelector} from '../../store';
import makeStyles from './styles';
import {
  logoutUser,
  openAboutUs,
  openHelp,
  openPrivacyPolicy,
} from '../../utils';

export const SettingsScreen: FC<PrimaryScreenProps<'settings'>> = ({
  navigation,
}) => {
  // constants & hooks
  const {colors} = useTheme();
  const {t} = useTranslation();

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
      <SettingsItem
        icon={<Lock />}
        setting={t('settings.changePassword')}
        onPress={() => {
          // Handle change password action
          navigation.navigate('changePassword');
        }}
      />
      <Separator />
      <SettingsItem
        icon={<Delete />}
        setting={t('settings.deleteAccount')}
        onPress={() => {
          //TODO: Handle help action
        }}
      />
      <Separator />
      <SettingsItem
        icon={<Logout />}
        setting={t('settings.logout')}
        onPress={logoutUser}
      />
    </SettingsSection>
  );

  /**
   * Generates the other settings section.
   */
  const otherSettings = () => (
    <SettingsSection title={t('settings.other')}>
      <SettingsItem
        icon={<ShieldCheck />}
        setting={t('settings.privacy')}
        onPress={openPrivacyPolicy}
      />
      <Separator />
      <SettingsItem
        icon={<HelpCircle />}
        setting={t('settings.help')}
        onPress={openHelp}
      />
      <Separator />
      <SettingsItem
        icon={<Information />}
        setting={t('settings.aboutUs')}
        onPress={openAboutUs}
      />
    </SettingsSection>
  );

  return (
    <Screen
      safeAreaEdges={['left', 'right']}
      preset="auto"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {accountSettings()}
      {otherSettings()}
    </Screen>
  );
};
