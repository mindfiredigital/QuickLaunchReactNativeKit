import React, {FC} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useTheme} from '@react-navigation/native';
import {Button, Icon, Screen, Text} from '../../components';
import {useAppDispatch} from '../../store';
import {resetState} from '../../store/reducers';
import {PrimaryScreenProps} from '../../navigation/primaryNavigator';
import {AccountSettings, OtherSettings} from '../../assets/svgs';
import {vs} from '../../utils';
import makeStyles from './styles';

/**
 * Generates a sub-heading component with an SVG icon and text.
 * @param svg The SVG icon component.
 * @param text The text for the sub-heading.
 * @returns A React component representing the sub-heading.
 */
const SubHeading = ({svg, text}: {svg: React.JSX.Element; text: string}) => {
  // constants & hooks
  const {colors} = useTheme();

  // Styles
  const styles = makeStyles(colors);
  return (
    <View style={styles.subHeading}>
      <Icon icon={svg} size={vs(40)} color={colors.tertiary} />
      <Text style={styles.subHeadingText} size="h2">
        {text}
      </Text>
    </View>
  );
};

export const SettingsScreen: FC<PrimaryScreenProps<'settings'>> = ({
  navigation,
}) => {
  // constants & hooks
  const {colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  // Styles
  const styles = makeStyles(colors);

  const logoutUser = async () => {
    try {
      // logout google account if signed in
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(resetState());
    }
  };

  /**
   * Generates the account settings section.
   * @returns A React component representing the account settings section.
   */
  const accountSetting = () => (
    <>
      {/* Account settings sub-heading */}
      {<SubHeading svg={<AccountSettings />} text={t('settings.account')} />}
      {/* Edit profile button */}
      <Button
        preset="link"
        restTextProps={{size: 'h3'}}
        styleProps={styles.btnStyle}
        textStyleProps={styles.btnTextStyle}
        btnText={t('settings.editProfile')}
        onPress={() => {
          //TODO: Handle edit profile action
        }}
      />
      {/* Change password button */}
      <Button
        preset="link"
        restTextProps={{size: 'h3'}}
        styleProps={styles.btnStyle}
        textStyleProps={styles.btnTextStyle}
        btnText={t('settings.changePassword')}
        onPress={() => {
          //TODO: Handle change password action
        }}
      />
      {/* Privacy button */}
      <Button
        preset="link"
        restTextProps={{size: 'h3'}}
        styleProps={styles.btnStyle}
        textStyleProps={styles.btnTextStyle}
        btnText={t('settings.privacy')}
        onPress={() => {
          //TODO: Handle privacy action
        }}
      />
      {/* Logout button */}
      <Button
        preset="link"
        restTextProps={{size: 'h3'}}
        styleProps={styles.btnStyle}
        textStyleProps={styles.btnTextStyle}
        btnText={t('settings.logout')}
        onPress={logoutUser}
      />
    </>
  );

  /**
   * Generates the other settings section.
   * @returns A React component representing the other settings section.
   */
  const otherSettings = () => (
    <>
      {/* Other settings sub-heading */}
      {<SubHeading svg={<OtherSettings />} text={t('settings.other')} />}
      {/* Help button */}
      <Button
        preset="link"
        restTextProps={{size: 'h3'}}
        styleProps={styles.btnStyle}
        textStyleProps={styles.btnTextStyle}
        btnText={t('settings.help')}
        onPress={() => {
          //TODO: Handle help action
        }}
      />
      {/* About Us button */}
      <Button
        preset="link"
        restTextProps={{size: 'h3'}}
        styleProps={styles.btnStyle}
        textStyleProps={styles.btnTextStyle}
        btnText={t('settings.aboutUs')}
        onPress={() => {
          //TODO: Handle about us action
        }}
      />
    </>
  );

  return (
    <Screen
      safeAreaEdges={['top', 'left', 'right']}
      preset="auto"
      contentContainerStyle={styles.container}>
      <Text style={styles.headerText} size="h1">
        {t('settings.title')}
      </Text>
      {accountSetting()}
      {otherSettings()}
    </Screen>
  );
};
