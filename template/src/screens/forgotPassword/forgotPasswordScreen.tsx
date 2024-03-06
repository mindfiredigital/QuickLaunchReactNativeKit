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
 * A Screen to render a Forgot password screen.
 */
export const ForgotPasswordScreen: FC<AuthScreenProps<'forgotPassword'>> = ({
  navigation,
}) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const commonStyles = makeCommanStyles(colors);
  const {t} = useTranslation();

  /**
   * send otp
   */
  const sendOTP = () => {
    //TODO: navigate to send otp screen
    navigation.navigate('verifyOTP');
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
        placeholder={t('signUp.emailPlaceholder')}
        keyboardType="email-address"
        inputMode="email"
        returnKeyType="next"
        textContentType="emailAddress"
        leftIconSize={vs(25)}
        containerStyle={styles.textInput}
      />
    </>
  );

  /**
   * Render redirect to send otp screen btn
   */
  const renderSendOTP = () => (
    <View style={styles.bottomView}>
      <Button btnText={t('forgotPassword.sendOtp')} onPress={sendOTP} />
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
      {renderSendOTP()}
    </Screen>
  );
};
