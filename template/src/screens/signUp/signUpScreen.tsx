import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Button, Screen, Text, TextField} from '../../components';
import {AuthScreenProps} from '../../navigation/authNavigator';
import {vs} from '../../utils';
import makeStyles from './styles';

/**
 * A Screen to render a Sign-up screen.
 */
export const SignUpScreen: FC<AuthScreenProps<'signUp'>> = ({navigation}) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const {t} = useTranslation();
  const [isVisiblePassword, setVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  /**
   * show hide password
   */
  const onPressPasswordEye = () => {
    setVisiblePassword(!isVisiblePassword);
  };

  /**
   * show hide confirm password
   */
  const onPressConfirmPasswordEye = () => {
    setVisibleConfirmPassword(!isVisibleConfirmPassword);
  };

  /**
   * Render compony logo and title
   */
  const renderHeaders = () => (
    <View style={styles.headerWrapper}>
      <Button
        preset="link"
        btnIcon="back"
        btnIconSize={vs(30)}
        btnText={t('comman.back')}
        onPress={() => navigation.goBack()}
        textStyleProps={styles.backBtnText}
        styleProps={styles.backBtnView}
      />
      <Text size="h1" text={t('login.signup')} />
    </View>
  );

  /**
   * Render sign-up button
   */
  const renderButtons = () => (
    <>
      <Button
        btnText={t('login.signup')}
        onPress={() => {
          //sign-up user
        }}
      />
    </>
  );

  /**
   * Render Sign-up text inputs name, email, password and confirm password
   */
  const renderTextInputs = () => (
    <>
      <TextField
        leftIcon={'people'}
        placeholder={t('signUp.namePlaceholder')}
        keyboardType="name-phone-pad"
        inputMode="text"
        returnKeyType="next"
        textContentType="name"
        containerStyle={styles.textInput}
      />
      <TextField
        leftIcon={'email'}
        placeholder={t('signUp.emailPlaceholder')}
        keyboardType="email-address"
        inputMode="email"
        returnKeyType="next"
        textContentType="emailAddress"
        leftIconSize={vs(25)}
        containerStyle={styles.textInput}
      />
      <TextField
        leftIcon={'lock'}
        secureTextEntry={!isVisiblePassword}
        rightIcon={!isVisiblePassword ? 'view' : 'hidden'}
        onPressRightIcon={onPressPasswordEye}
        placeholder={t('login.passwordPlaceholder')}
        textContentType="newPassword"
        containerStyle={styles.textInput}
      />
      <TextField
        leftIcon={'lock'}
        secureTextEntry={!isVisibleConfirmPassword}
        rightIcon={!isVisibleConfirmPassword ? 'view' : 'hidden'}
        onPressRightIcon={onPressConfirmPasswordEye}
        placeholder={t('signUp.confirmPassword')}
        textContentType="newPassword"
        containerStyle={styles.textInput}
      />
    </>
  );

  /**
   * Render redirect to Sign in view
   */
  const renderSignIn = () => (
    <View style={styles.bottomView}>
      <Text>{t('signUp.iHaveAlready')}</Text>
      <Button
        preset="link"
        btnText={t('login.title')}
        onPress={() => {
          //Redirect to sign in screen
          navigation.goBack();
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
      {renderSignIn()}
    </Screen>
  );
};
