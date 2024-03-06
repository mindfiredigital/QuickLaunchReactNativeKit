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
 * A Screen to render a Set new password screen.
 */
export const SetNewPasswordScreen: FC<AuthScreenProps<'setNewPassword'>> = ({
  navigation,
}) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const commonStyles = makeCommanStyles(colors);
  const {t} = useTranslation();
  const [isVisiblePassword, setVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  /**
   * show hide new password
   */
  const onPressPasswordEye = () => {
    setVisiblePassword(!isVisiblePassword);
  };

  /**
   * show hide confirm new password
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
   * Render compony logo and title
   */
  const renderHeaders = () => (
    <View style={styles.headerWrapper}>
      <Header
        leftBtnIcon="back"
        onPressLeft={goBack}
        styleProps={styles.headerStyle}
      />
      <Text size="h1" text={t('setNewPassoword.title')} />
      <Text
        text={t('setNewPassoword.discription')}
        style={styles.discriptionText}
      />
    </View>
  );

  /**
   * Render new password and confirm new password text input
   */
  const renderTextInputs = () => (
    <>
      <TextField
        leftIcon={'lock'}
        secureTextEntry={!isVisiblePassword}
        rightIcon={!isVisiblePassword ? 'view' : 'hidden'}
        onPressRightIcon={onPressPasswordEye}
        placeholder={t('setNewPassoword.newPassword')}
        textContentType="newPassword"
        containerStyle={styles.textInput}
      />
      <TextField
        leftIcon={'lock'}
        secureTextEntry={!isVisibleConfirmPassword}
        rightIcon={!isVisibleConfirmPassword ? 'view' : 'hidden'}
        onPressRightIcon={onPressConfirmPasswordEye}
        placeholder={t('setNewPassoword.confirmNewPassword')}
        textContentType="newPassword"
        containerStyle={styles.textInput}
      />
    </>
  );

  /**
   * Render submit password btn
   */
  const renderSubmitPassword = () => (
    <View style={styles.bottomView}>
      <Button
        btnText={t('setNewPassoword.submitPassword')}
        onPress={() => {
          //submit password
        }}
      />
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
      {renderSubmitPassword()}
    </Screen>
  );
};
