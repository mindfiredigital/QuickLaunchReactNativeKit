import React, {FC, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Button, Screen, Text, TextField} from 'components';
import {AuthScreenProps} from 'navigation';
import {showSuccessToast, useValidation} from 'utils';
import {LoginRes, SignUpReq} from 'api';
import {signUp, useAppDispatch, useAppSelector} from 'store';
import {AccountOutline, EmailOutline, LockOutline} from 'assets/svgs';
import makeStyles from './styles';

/**
 * A Screen to render a Sign-up screen.
 */
export const SignUpScreen: FC<AuthScreenProps<'signUp'>> = ({navigation}) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const {t} = useTranslation();

  // Textinput references
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  //hooks
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Redux hooks
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(state => state.auth);

  // Validate form textfields input
  const {setIsTouched, validateForm, isFormValid, getErrorsInField} =
    useValidation({
      state: {fullName, email, password, confirmPassword},
      fieldsRules: {
        fullName: {
          required: true,
          strings: true,
        },
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
        confirmPassword: {
          required: true,
          equalWith: password,
        },
      },
      isTouchedEnabled: true,
    });

  /**
   * navigate to back screen
   */
  const goBack = () => {
    navigation.goBack();
  };

  /**
   * Focus email textfield
   */
  const focusEmail = () => emailRef.current?.focus();

  /**
   * Focus password textfield
   */
  const focusPassword = () => passwordRef.current?.focus();

  /**
   * Focus confirm password textfield
   */
  const focusConfirmPassword = () => confirmPasswordRef.current?.focus();

  /**
   * Validate text input than sign up the user
   */
  const signUpUser = async () => {
    setIsTouched(true);
    const isValid = validateForm();
    if (isValid) {
      //sign up user
      const reqBody: SignUpReq = {
        email,
        password,
        confirm_password: confirmPassword,
        full_name: fullName,
      };
      const {meta, payload} = await dispatch(signUp(reqBody));
      const data = payload as LoginRes;
      // on api success
      if (meta.requestStatus === 'fulfilled') {
        showSuccessToast({message: data.message});
        goBack();
      }
    }
  };

  /**
   * Render back btn and title
   */
  const renderHeaders = () => (
    <View style={styles.headerWrapper}>
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
        onPress={signUpUser}
        style={styles.signUpBtn}
        disabled={!isFormValid()}
      />
    </>
  );

  /**
   * Render inputs name, email, password and confirm password
   */
  const renderTextInputs = () => (
    <>
      <TextField
        value={fullName}
        onChangeText={setFullName}
        leftIcon={<AccountOutline />}
        placeholder={t('signUp.namePlaceholder')}
        keyboardType="name-phone-pad"
        inputMode="text"
        returnKeyType="next"
        textContentType="name"
        onSubmitEditing={focusEmail}
        error={getErrorsInField('fullName')}
        blurOnSubmit={false}
      />
      <TextField
        ref={emailRef}
        value={email}
        onChangeText={setEmail}
        leftIcon={<EmailOutline />}
        placeholder={t('signUp.emailPlaceholder')}
        keyboardType="email-address"
        inputMode="email"
        returnKeyType="next"
        autoCapitalize="none"
        textContentType="emailAddress"
        onSubmitEditing={focusPassword}
        error={getErrorsInField('email')}
      />
      <TextField
        ref={passwordRef}
        preset="password"
        value={password}
        onChangeText={setPassword}
        leftIcon={<LockOutline />}
        placeholder={t('login.passwordPlaceholder')}
        textContentType="newPassword"
        returnKeyType="next"
        onSubmitEditing={focusConfirmPassword}
        error={getErrorsInField('password')}
      />
      <TextField
        ref={confirmPasswordRef}
        preset="password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        leftIcon={<LockOutline />}
        placeholder={t('signUp.confirmPassword')}
        textContentType="newPassword"
        returnKeyType="done"
        error={getErrorsInField('confirmPassword')}
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
      safeAreaEdges={['bottom', 'left', 'right']}
      preset="auto"
      loading={loading}
      bottomContent={renderSignIn()}>
      <View>
        {renderHeaders()}
        {renderTextInputs()}
        {renderButtons()}
      </View>
    </Screen>
  );
};
