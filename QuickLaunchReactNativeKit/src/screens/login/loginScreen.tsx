import React, {FC, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Button, Icon, Screen, Text, TextField} from '../../components';
import {AuthScreenProps} from '../../navigation/authNavigator';
import {useValidation, vs} from '../../utils';
import {login, useAppDispatch, useAppSelector} from '../../store';
import {LoginReq} from '../../api';
import {GoogleSignIn} from './services';
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
  const [isVisible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    navigation.navigate('forgotPassword');
  };

  /**
   * Redirect to sign up screen
   */
  const redirectToSignUp = () => {
    navigation.navigate('signUp');
  };

  /**
   * Show and hide password
   */
  const onPressRightIcon = () => {
    setVisible(!isVisible);
  };

  /**
   * Focus password textfield
   */
  const focusPassword = () => passwordRef.current?.focus();

  /**
   * Validate text input than login the user
   */
  const loginUser = () => {
    setIsTouched(true);
    const isValid = validateForm();
    if (isValid) {
      //login user
      const reqBody: LoginReq = {
        email,
        password,
      };
      dispatch(login(reqBody));
    }
  };

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
        onPress={redirectToForgotPassword}
      />
      <Button
        btnText={t('login.title')}
        disabled={!isFormValid()}
        onPress={loginUser}
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
        leftIcon={'people'}
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
        value={password}
        onChangeText={setPassword}
        leftIcon={'lock'}
        secureTextEntry={!isVisible}
        rightIcon={!isVisible ? 'view' : 'hidden'}
        onPressRightIcon={onPressRightIcon}
        placeholder={t('login.passwordPlaceholder')}
        returnKeyType="done"
        textContentType="password"
        error={getErrorsInField('password')}
      />
    </>
  );

  /**
   * Render social signin options like with Google and Apple
   */
  const renderSocialSignIn = () => (
    <View style={styles.socialSignIn}>
      <Text>{t('login.signInWith')}</Text>
      <View style={styles.socialSignInButtons}>
        <GoogleSignIn />
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
    </Screen>
  );
};
