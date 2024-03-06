import React, {FC, useEffect, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {
  getHash,
  removeListener,
  startOtpListener,
  useOtpVerify,
} from 'react-native-otp-verify';
import {Button, Header, Screen, Text, TextField} from '../../components';
import {AuthScreenProps} from '../../navigation/authNavigator';
import {vs} from '../../utils';
import makeStyles from './styles';
import makeCommanStyles from '../styles';
import {OTPTextField} from '../../components/OTPTextField';

/**
 * A Screen to render a Forgot password screen.
 */
export const VerifyOTPScreen: FC<AuthScreenProps<'verifyOTP'>> = ({
  navigation,
}) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const commonStyles = makeCommanStyles(colors);
  const {t} = useTranslation();
  const [otp, setOtp] = useState<string>('');

  // using methods
  useEffect(() => {
    getHash()
      .then(hash => {
        // use this hash in the message.
      })
      .catch(console.log);

    startOtpListener(message => {
      //TODO:resolve type script error
      // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
      const otp = /(\d{4})/g.exec(message)[1];
      setOtp(otp);
    });
    return () => removeListener();
  }, []);

  /**
   * send otp
   */
  const verifyOTP = () => {
    //TODO: navigate to set new password screen
    navigation.navigate('setNewPassword');
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
      <Text size="h1" text={t('verifyOTP.title')} />
      <Text text={t('verifyOTP.discription')} style={styles.discriptionText} />
    </View>
  );

  /**
   * Render forgot password email text input
   */
  const renderTextInputs = () => (
    <>
      <OTPTextField otp={otp} setOtp={text => setOtp(text)} />
    </>
  );

  /**
   * Render redirect to send otp screen btn
   */
  const renderVerifyOTP = () => (
    <View style={styles.bottomView}>
      <Button btnText={t('verifyOTP.verifyOTP')} onPress={verifyOTP} />
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
      </View>
      {renderVerifyOTP()}
    </Screen>
  );
};
