import React, {FC, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Button, Header, Screen, Text, TextField} from '../../components';
import {AuthScreenProps} from '../../navigation/authNavigator';
import {useValidation, vs} from '../../utils';
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
  const [isVisiblePassword, setVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
  const signUpUser = () => {
    setIsTouched(true);
    const isValid = validateForm();
    if (isValid) {
      //login user
    }
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
        onPress={signUpUser}
        styleProps={styles.signUpBtn}
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
        onChangeText={setFullName}
        leftIcon={'people'}
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
        onChangeText={setEmail}
        leftIcon={'email'}
        placeholder={t('signUp.emailPlaceholder')}
        keyboardType="email-address"
        inputMode="email"
        returnKeyType="next"
        textContentType="emailAddress"
        leftIconSize={vs(25)}
        onSubmitEditing={focusPassword}
        error={getErrorsInField('email')}
        blurOnSubmit={false}
      />
      <TextField
        ref={passwordRef}
        onChangeText={setPassword}
        leftIcon={'lock'}
        secureTextEntry={!isVisiblePassword}
        rightIcon={!isVisiblePassword ? 'view' : 'hidden'}
        onPressRightIcon={onPressPasswordEye}
        placeholder={t('login.passwordPlaceholder')}
        textContentType="newPassword"
        returnKeyType="next"
        onSubmitEditing={focusConfirmPassword}
        error={getErrorsInField('password')}
        blurOnSubmit={false}
      />
      <TextField
        ref={confirmPasswordRef}
        onChangeText={setConfirmPassword}
        leftIcon={'lock'}
        secureTextEntry={!isVisibleConfirmPassword}
        rightIcon={!isVisibleConfirmPassword ? 'view' : 'hidden'}
        onPressRightIcon={onPressConfirmPasswordEye}
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
      safeAreaEdges={['top', 'bottom', 'left', 'right']}
      preset="auto"
      bottomContent={renderSignIn()}>
      <View>
        {renderHeaders()}
        {renderTextInputs()}
        {renderButtons()}
      </View>
    </Screen>
  );
};
