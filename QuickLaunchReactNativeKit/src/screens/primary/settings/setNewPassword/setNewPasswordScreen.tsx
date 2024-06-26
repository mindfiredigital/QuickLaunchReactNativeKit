import React, {FC, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Button, Screen, Text, TextField} from 'components';
import {AuthScreenProps} from 'navigation';
import {showSuccessToast, useValidation} from 'utils';
import {passwordReset, useAppDispatch, useAppSelector} from 'store';
import {LoginRes, PasswordResetReq} from 'api';
import {LockOutline} from 'assets/svgs';
import makeStyles from './styles';

/**
 * A Screen to render a Set new password screen.
 */
export const SetNewPasswordScreen: FC<AuthScreenProps<'setNewPassword'>> = ({
  navigation,
}) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const {t} = useTranslation();

  // Textinput references
  const confirmPasswordRef = useRef<TextInput>(null);

  //Hooks
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Redux hooks
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(state => state.auth);

  // Validate form textfields input
  const {setIsTouched, validateForm, isFormValid, getErrorsInField} =
    useValidation({
      state: {password, confirmPassword},
      fieldsRules: {
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
   * Validate text input than submit password
   */
  const onSubmitPassword = async () => {
    setIsTouched(true);
    const isValid = validateForm();
    if (isValid) {
      //submit new password
      const reqBody: PasswordResetReq = {
        password,
        confirm_password: confirmPassword,
      };
      const {meta, payload} = await dispatch(passwordReset(reqBody));
      const data = payload as LoginRes;
      // on api success
      if (meta.requestStatus === 'fulfilled') {
        showSuccessToast({message: data.message});
        //Navigate to login screen
        navigation.navigate('login');
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
   * Focus confirm new password textfield
   */
  const focusConfirmPassword = () => confirmPasswordRef.current?.focus();

  /**
   * Render compony logo and title
   */
  const renderHeaders = () => (
    <View style={styles.headerWrapper}>
      <Text size="h1" text={t('setNewPassoword.title')} />
      <Text
        text={t('setNewPassoword.description')}
        style={styles.descriptionText}
      />
    </View>
  );

  /**
   * Render new password and confirm new password text input
   */
  const renderTextInputs = () => (
    <>
      <TextField
        preset="password"
        value={password}
        onChangeText={setPassword}
        leftIcon={<LockOutline />}
        placeholder={t('setNewPassoword.newPassword')}
        textContentType="newPassword"
        returnKeyType="next"
        onSubmitEditing={focusConfirmPassword}
        error={getErrorsInField('password')}
        blurOnSubmit={false}
      />
      <TextField
        ref={confirmPasswordRef}
        preset="password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        leftIcon={<LockOutline />}
        placeholder={t('setNewPassoword.confirmNewPassword')}
        textContentType="newPassword"
        returnKeyType="done"
        error={getErrorsInField('confirmPassword')}
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
        onPress={onSubmitPassword}
        disabled={!isFormValid()}
      />
    </View>
  );

  return (
    <Screen
      safeAreaEdges={['bottom', 'bottom', 'right']}
      preset="auto"
      loading={loading}>
      <View>
        {renderHeaders()}
        {renderTextInputs()}
        {renderSubmitPassword()}
      </View>
    </Screen>
  );
};
