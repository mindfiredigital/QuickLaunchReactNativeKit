import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Button, Header, Screen, Text, TextField} from '../../components';
import {AuthScreenProps} from '../../navigation/authNavigator';
import {showSuccessToast, useValidation, vs} from '../../utils';
import makeStyles from './styles';
import {ForgotPasswordReq} from '../../api';
import {forgotPassword, useAppDispatch, useAppSelector} from '../../store';

/**
 * A Screen to render a Forgot password screen.
 */
export const ForgotPasswordScreen: FC<AuthScreenProps<'forgotPassword'>> = ({
  navigation,
  route,
}) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const {t} = useTranslation();
  const {email: emailParams} = route.params;
  // Hooks
  const [email, setEmail] = useState(emailParams ? emailParams : '');
  // Redux hooks
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(state => state.auth);

  // Validate form textfields input
  const {setIsTouched, validateForm, isFormValid, getErrorsInField} =
    useValidation({
      state: {email},
      fieldsRules: {
        email: {
          required: true,
          email: true,
        },
      },
      isTouchedEnabled: true,
    });

  /**
   * send otp to registered email id
   */
  const sendOTP = async () => {
    setIsTouched(true);
    const isValid = validateForm();
    if (isValid) {
      //forgot password method to send otp on email
      const reqBody: ForgotPasswordReq = {
        email,
      };
      const response = await dispatch(forgotPassword(reqBody));
      // on api success
      if (response.meta.requestStatus === 'fulfilled') {
        showSuccessToast({message: t('forgotPassword.otpSent')});
        //Navigate to otp verification screen
        navigation.navigate('verifyOTP');
      }
    }
  };

  /**
   * navigate to back screen
   */
  const goBack = () => {
    navigation.goBack();
  };

  /**
   * Render back btn, title and discription
   */
  const renderHeaders = () => (
    <View style={styles.headerWrapper}>
      <Header
        leftBtnIcon="back"
        onPressLeft={goBack}
        styleProps={styles.headerStyle}
      />
      <Text size="h1" text={t('forgotPassword.title')} />
      <Text
        text={t('forgotPassword.discription')}
        style={styles.discriptionText}
      />
    </View>
  );

  /**
   * Render forgot password email text input
   */
  const renderTextInputs = () => (
    <>
      <TextField
        leftIcon={'email'}
        onChangeText={setEmail}
        value={email}
        placeholder={t('signUp.emailPlaceholder')}
        keyboardType="email-address"
        inputMode="email"
        returnKeyType="done"
        textContentType="emailAddress"
        leftIconSize={vs(25)}
        error={getErrorsInField('email')}
      />
    </>
  );

  /**
   * Render redirect to send otp screen btn
   */
  const renderSendOTP = () => (
    <View style={styles.bottomView}>
      <Button
        btnText={t('forgotPassword.sendOtp')}
        onPress={sendOTP}
        disabled={!isFormValid()}
      />
    </View>
  );

  return (
    <Screen
      safeAreaEdges={['top', 'bottom', 'left', 'right']}
      preset="auto"
      loading={loading}>
      <View>
        {renderHeaders()}
        {renderTextInputs()}
        {renderSendOTP()}
      </View>
    </Screen>
  );
};
