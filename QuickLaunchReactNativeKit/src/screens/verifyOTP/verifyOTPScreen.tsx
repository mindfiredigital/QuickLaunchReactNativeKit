import React, {FC, useEffect, useState} from 'react';
import {Platform, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {
  getHash,
  removeListener,
  startOtpListener,
} from 'react-native-otp-verify';
import {Button, OTPTextField, Screen, Text} from '../../components';
import {AuthScreenProps} from '../../navigation/authNavigator';
import {showSuccessToast, useValidation} from '../../utils';
import {otpVerification, useAppDispatch, useAppSelector} from '../../store';
import {LoginRes, OTPVerificationReq} from '../../api';
import makeStyles from './styles';

/**
 * VerifyOTPScreen Component
 * A screen to render a Verify OTP screen.
 * @component
 * @param {AuthScreenProps<'verifyOTP'>} props - Navigation props for VerifyOTPScreen.
 */
export const VerifyOTPScreen: FC<AuthScreenProps<'verifyOTP'>> = ({
  navigation,
}) => {
  // Theme and style setup
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  // Translation setup
  const {t} = useTranslation();

  // State for OTP input
  const [otp, setOtp] = useState<string>('');

  // Redux hooks
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(state => state.auth);

  /**
   * Number of digits required for OTP.
   */
  const otpLength = 6;

  // Form validation setup
  const {setIsTouched, validateForm, isFormValid, getErrorsInField} =
    useValidation({
      state: {otp},
      fieldsRules: {
        otp: {
          required: true,
          numbers: true,
          length: otpLength,
        },
      },
      isTouchedEnabled: true,
    });

  // OTP listener setup
  useEffect(() => {
    if (Platform.OS === 'android') {
      getHash().then(hash => {
        /**
         * Use this hash in the message.
         * For ex,
         * Your ExampleApp code is: 123456
         * DtTKiAyg7RE <-- This is hash returned above
         */
      });

      startOtpListener(message => {
        // Extract the OTP using regex. Below regex extracts a 4-digit OTP from the message.
        const match = /(\d{4})/g.exec(message);
        if (match && match[1]) {
          setOtp(match[1]);
        }
      });
    }
    return removeListener;
  }, []);

  /**
   * Verify OTP and navigate to the next screen.
   */
  const verifyOTP = async () => {
    setIsTouched(true);
    const isValid = validateForm();
    if (isValid) {
      //sign up user
      const reqBody: OTPVerificationReq = {
        code: Number(otp),
      };
      const {meta, payload} = await dispatch(otpVerification(reqBody));
      const data = payload as LoginRes;
      // on api success
      if (meta.requestStatus === 'fulfilled' && data?.message) {
        showSuccessToast({message: data.message});
        //Navigate to set new password screen
        navigation.navigate('setNewPassword');
      }
    }
  };

  /**
   * Navigate back to the previous screen.
   */
  const goBack = () => {
    navigation.goBack();
  };

  /**
   * Render header, title, and description.
   */
  const renderHeaders = () => (
    <View style={styles.headerWrapper}>
      <Text size="h1" text={t('verifyOTP.title')} />
      <Text text={t('verifyOTP.description')} style={styles.descriptionText} />
    </View>
  );

  /**
   * Render OTP input field.
   */
  const renderOTPInput = () => (
    <OTPTextField
      length={otpLength}
      otp={otp}
      setOtp={setOtp}
      error={getErrorsInField('otp')}
    />
  );

  /**
   * Render the button to verify OTP.
   */
  const renderVerifyOTP = () => (
    <View style={styles.bottomView}>
      <Button
        btnText={t('verifyOTP.verifyOTP')}
        disabled={!isFormValid()}
        onPress={verifyOTP}
      />
    </View>
  );

  // Render the entire screen
  return (
    <Screen
      safeAreaEdges={['bottom', 'left', 'right']}
      preset="auto"
      loading={loading}>
      {renderHeaders()}
      {renderOTPInput()}
      {renderVerifyOTP()}
    </Screen>
  );
};
