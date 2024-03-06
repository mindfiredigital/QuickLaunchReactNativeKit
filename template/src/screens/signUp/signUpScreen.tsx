import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Button, Header, Screen, Text, TextField} from '../../components';
import {AuthScreenProps} from '../../navigation/authNavigator';
import {vs} from '../../utils';
import makeStyles from './styles';
import makeCommanStyles from '../styles';

/**
 * A Screen to render a Sign-up screen.
 */
export const SignUpScreen: FC<AuthScreenProps<'signUp'>> = ({navigation}) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const commonStyles = makeCommanStyles(colors);
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
   * navigate to back screen
   */
  const goBack = () => {
    navigation.goBack();
  };

  /**
   * Render back btn and title
   */
  const renderHeaders = () => (
    <View style={styles.headerWrapper}>
      <Header
        leftBtnIcon="back"
        styleProps={styles.headerStyle}
        onPressLeft={goBack}
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
   * Render inputs name, email, password and confirm password
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
      <Button preset="link" btnText={t('login.title')} onPress={goBack} />
    </View>
  );

  return (
    <Screen
      safeAreaEdges={['top', 'bottom']}
      preset="fixed"
      contentContainerStyle={commonStyles.contentContainerStyle}>
      <View>
        {renderHeaders()}
        {renderTextInputs()}
        {renderButtons()}
      </View>
      {renderSignIn()}
    </Screen>
  );
};
