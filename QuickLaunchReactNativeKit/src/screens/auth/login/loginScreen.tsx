import React, {FC, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Button, Icon, Screen, Text, TextField} from 'components';
import {AuthScreenProps} from 'navigation';
import {setGenericPasswordToKeychain, useValidation, vs} from 'utils';
import {login, useAppDispatch, useAppSelector} from 'store';
import {LoginReq} from 'api';
import {AppleSignin, BiometricAuth, GoogleSignIn} from 'service';
import {EmailOutline, LockOutline} from 'assets/svgs';
import makeStyles from './styles';

/**
 * A Screen to render a Login screen.
 */
export const LoginScreen: FC<AuthScreenProps<'login'>> = ({navigation}) => {
  // constants & hooks
  const {colors} = useTheme();
  const {t} = useTranslation();

  // Redux hooks
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(state => state.auth);

  // Styles
  const styles = makeStyles(colors);

  // Textinput references
  const passwordRef = useRef<TextInput>(null);

  // Hooks
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Validate form textfields input
  const {setIsTouched, validateForm, isFormValid, getErrorsInField} =
    useValidation({
      state: {email, password},
      fieldsRules: {
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          password: true,
          minlength: 8,
          maxlength: 16,
          hasUpperCase: true,
          hasLowerCase: true,
          hasNumber: true,
          hasSpecialCharacter: true,
        },
      },
      isTouchedEnabled: true,
    });

  /**
   * Redirect to forgot password screen
   */
  const redirectToForgotPassword = () => {
    navigation.navigate('forgotPassword', {email: email});
  };

  /**
   * Redirect to sign up screen
   */
  const redirectToSignUp = () => {
    navigation.navigate('signUp');
  };

  /**
   * Focus password textfield
   */
  const focusPassword = () => passwordRef.current?.focus();

  /**
   * login user using credentials
   */
  const loginUser = (username: string, password: string) => {
    const reqBody: LoginReq = {
      email: username,
      password: password,
    };
    return dispatch(login(reqBody));
  };

  /**
   * Validate text input than login the user
   */
  const onPressLogin = async () => {
    setIsTouched(true);
    const isValid = validateForm();
    if (isValid) {
      const {meta} = await loginUser(email, password);
      if (meta.requestStatus === 'fulfilled') {
        // If response success store email and password in keychain
        setGenericPasswordToKeychain(email, password);
      }
    }
  };

  /**
   * Render compony logo and title
   */
  const renderHeaders = () => (
    <View style={styles.headerWrapper}>
      <Icon
        icon="logo"
        size={vs(80)}
        style={styles.logoContainer}
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
        style={styles.forgotView}
        onPress={redirectToForgotPassword}
      />
      <Button
        btnText={t('login.title')}
        disabled={!isFormValid()}
        onPress={onPressLogin}
      />
    </>
  );

  /**
   * Render Sign-in text inputs email and password
   */
  const renderTextInputs = () => (
    <>
      <TextField
        value={email}
        onChangeText={setEmail}
        leftIcon={<EmailOutline />}
        placeholder={t('login.userNamePlaceholder')}
        keyboardType="email-address"
        inputMode="email"
        returnKeyType="next"
        textContentType="emailAddress"
        error={getErrorsInField('email')}
        blurOnSubmit={false}
        autoCapitalize="none"
        onSubmitEditing={focusPassword}
      />
      <TextField
        ref={passwordRef}
        preset="password"
        value={password}
        onChangeText={setPassword}
        leftIcon={<LockOutline />}
        placeholder={t('login.passwordPlaceholder')}
        returnKeyType="done"
        textContentType="password"
        error={getErrorsInField('password')}
      />
    </>
  );

  const Spacer = () => <View style={styles.spacer} />;

  /**
   * Render social signin options like with Google and Apple
   */
  const renderSocialSignIn = () => (
    <View style={styles.socialSignIn}>
      <Text>{t('login.signInWith')}</Text>
      <View style={styles.socialSignInButtons}>
        <GoogleSignIn />
        <Spacer />
        <AppleSignin />
      </View>
    </View>
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
        onPress={redirectToSignUp}
      />
    </View>
  );

  return (
    <Screen
      safeAreaEdges={['top', 'bottom', 'left', 'right']}
      preset="auto"
      loading={loading}
      bottomContent={renderSignUp()}>
      {renderHeaders()}
      {renderTextInputs()}
      {renderButtons()}
      {renderSocialSignIn()}
      <BiometricAuth onBiometricsSuccess={loginUser} />
    </Screen>
  );
};
