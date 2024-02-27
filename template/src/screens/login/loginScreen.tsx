import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Button, Icon, Screen, Text, TextField} from '../../components';
import {AuthScreenProps} from '../../navigation/authNavigator';
import {vs} from '../../utils';
import makeStyles from './styles';

/**
 * A Screen to render a Login screen.
 */
export const LoginScreen: FC<AuthScreenProps<'login'>> = ({navigation}) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const {t} = useTranslation();
  const [isVisible, setVisible] = useState(false);

  /**
   * Render compony logo and title
   */
  const renderHeaders = () => (
    <View style={styles.headerWrapper}>
      <Icon
        icon="mindfireFireLogo"
        size={vs(129)}
        containerStyle={styles.logoContainer}
        color={colors.primary}
      />
      <Text size="h1">{t('login.title')}</Text>
    </View>
  );

  /**
   * Render forgot password and sign-in button
   */
  const renderButtons = () => (
    <>
      <Button
        preset="link"
        btnText={t('login.forgotPassword')}
        styleProps={styles.forgotView}
        onPress={() => {
          //forgot password
        }}
      />
      <Button
        btnText={t('login.title')}
        onPress={() => {
          //login user
        }}
      />
    </>
  );

  /**
   * Render Sign-in text inputs email and password
   */
  const renderTextInputs = () => (
    <>
      <TextField
        leftIcon={'people'}
        placeholder={t('login.userNamePlaceholder')}
        keyboardType="email-address"
        inputMode="email"
        returnKeyType="next"
        textContentType="emailAddress"
      />
      <TextField
        leftIcon={'lock'}
        secureTextEntry={!isVisible}
        rightIcon={!isVisible ? 'view' : 'hidden'}
        onPressRightIcon={() => setVisible(!isVisible)}
        placeholder={t('login.passwordPlaceholder')}
        textContentType="password"
      />
    </>
  );

  /**
   * Render redirect to Sign up view
   */
  const renderSignUp = () => (
    <View style={styles.bottomView}>
      <Text>{t('login.dontHave')}</Text>
      <Button
        preset="link"
        btnText={t('login.signup')}
        onPress={() => {
          // TODO: Redirect to sign up
        }}
      />
    </View>
  );

  return (
    <Screen
      safeAreaEdges={['top', 'bottom']}
      preset="fixed"
      contentContainerStyle={styles.contentContainerStyle}>
      <View>
        {renderHeaders()}
        {renderTextInputs()}
        {renderButtons()}
      </View>
      {renderSignUp()}
    </Screen>
  );
};
