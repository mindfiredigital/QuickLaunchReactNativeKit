import React, {FC, useEffect, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {BiometryTypes} from 'react-native-biometrics';
import {Button, Icon, Screen, Text, TextField} from '../../components';
import {AuthScreenProps} from '../../navigation/authNavigator';
import {
  checkBiometricsSensors,
  getGenericPasswordFromKeychain,
  setGenericPasswordToKeychain,
  showBiometricPrompt,
  useValidation,
  vs,
} from '../../utils';
import {login, useAppDispatch, useAppSelector} from '../../store';
import {LoginReq} from '../../api';
import {AppleSignin, GoogleSignIn} from './services';
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
  const [isVisible, setVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [biometryTypes, setBiometryTypes] = useState<string>('');
  const [userCredentials, setUserCredentials] = useState<any>({});

  /**
   * Effect hook that runs once when the component mounts.
   * It retrieves biometric sensor information and user credentials from the keychain.
   * Sets state variables accordingly.
   */
  useEffect(() => {
    // Call the onMount function when the component mounts
    onMount();
  }, []);

  /**
   * Function that is called when the component mounts.
   * Retrieves biometric sensor information and user credentials from the keychain.
   * Sets state variables accordingly.
   */
  const onMount = async () => {
    // Retrieve information about biometric sensors
    const sensors = await checkBiometricsSensors();

    // If biometric sensors are available, set the state variable for biometric types
    if (sensors !== null) {
      setBiometryTypes(sensors);
    }

    // Retrieve user credentials from the keychain
    const credentials = await getGenericPasswordFromKeychain();

    // If credentials are found, set the state variable for user credentials
    if (credentials !== null) {
      setUserCredentials(credentials);
    }
  };

  /**
   * Handles the biometric authentication process.
   * Prompts the user to authenticate using biometrics (e.g., Face ID or Touch ID).
   * If authentication is successful, it logs the user in.
   */
  const onBiometrics = async () => {
    // Prompt the user to authenticate using biometrics
    const isSuccess = await showBiometricPrompt(returnSigninWithString());

    // If biometric authentication is successful
    if (isSuccess) {
      // Log in the user using stored credentials
      loginUser(userCredentials.username, userCredentials.password);
    }
  };

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
   * Show and hide password
   */
  const onPressRightIcon = () => {
    setVisible(!isVisible);
  };

  /**
   * Focus password textfield
   */
  const focusPassword = () => passwordRef.current?.focus();

  const loginUser = (username: string, password: string) => {
    const reqBody: LoginReq = {
      email: username,
      password: password,
    };
    dispatch(login(reqBody));
  };

  /**
   * Validate text input than login the user
   */
  const onLogin = async () => {
    setIsTouched(true);
    const isValid = validateForm();
    if (isValid) {
      //login user
      await setGenericPasswordToKeychain(email, password);
      loginUser(email, password);
    }
  };

  /**
   * Returns the appropriate message for biometric authentication based on the available biometric types.
   * @returns A string representing the message for biometric authentication.
   */
  const returnSigninWithString = (): string => {
    // Determine the biometric type and return the corresponding message
    if (biometryTypes === BiometryTypes.TouchID) {
      return t('login.signinWithTouchId'); // Message for Touch ID authentication
    } else if (biometryTypes === BiometryTypes.FaceID) {
      return t('login.signinWithFaceId'); // Message for Face ID authentication
    } else if (biometryTypes === BiometryTypes.Biometrics) {
      return t('login.signWithBiometrics'); // Generic message for biometrics authentication
    } else {
      return ''; // Return an empty string if biometric type is not recognized
    }
  };

  /**
   * Returns the appropriate description for biometric authentication based on the available biometric types.
   * @returns A string representing the description for biometric authentication.
   */
  const returnSigninDiscreptionString = (): string => {
    // Determine the biometric type and return the corresponding description
    if (biometryTypes === BiometryTypes.TouchID) {
      return t('login.signinWithTouchIdDis'); // Description for Touch ID authentication
    } else if (biometryTypes === BiometryTypes.FaceID) {
      return t('login.signinWithFaceIdDis'); // Description for Face ID authentication
    } else if (biometryTypes === BiometryTypes.Biometrics) {
      return t('login.signWithBiometricsDis'); // Generic description for biometrics authentication
    } else {
      return ''; // Return an empty string if biometric type is not recognized
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
        styleProps={styles.forgotView}
        onPress={redirectToForgotPassword}
      />
      <Button
        btnText={t('login.title')}
        disabled={!isFormValid()}
        onPress={onLogin}
      />
      {/* <Button btnText={'Face id'} onPress={onBiometrics} /> */}
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
   * Render Biometrics View
   */
  const renderBiometrics = () => (
    <View style={styles.biometricView}>
      <Icon
        icon={
          biometryTypes === BiometryTypes.TouchID
            ? 'fingerprint'
            : 'faceRecognition'
        }
        size={vs(40)}
        containerStyle={styles.biometricIcon}
        color={colors.tertiary}
        onPress={onBiometrics}
      />
      <Text>{returnSigninWithString()}</Text>
      <Text style={styles.signDisText}>{returnSigninDiscreptionString()}</Text>
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
      {userCredentials.username &&
        userCredentials.password &&
        renderBiometrics()}
    </Screen>
  );
};
