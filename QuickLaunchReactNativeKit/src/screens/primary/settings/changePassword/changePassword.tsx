import React, {FC, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Button, Screen, Text, TextField} from 'components';
import {showSuccessToast, useValidation} from 'utils';
import {changePassword, useAppDispatch, useAppSelector} from 'store';
import {ChangePasswordRes, LoginRes} from 'api';
import {LockOutline} from 'assets/svgs';
import {PrimaryScreenProps} from 'navigation';
import makeStyles from './styles';

/**
 * A Screen to render a change password.
 */
export const ChangePassword: FC<PrimaryScreenProps<'changePassword'>> = ({
  navigation,
}) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const {t} = useTranslation();

  // Textinput references
  const newPasswordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  //Hooks
  const [password, setPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Redux hooks
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(state => state.app);

  const passwordFieldRules = {
    required: true,
    password: true,
    minlength: 8,
    maxlength: 16,
    hasUpperCase: true,
    hasLowerCase: true,
    hasNumber: true,
    hasSpecialCharacter: true,
  };

  // Validate form textfields input
  const {setIsTouched, validateForm, isFormValid, getErrorsInField} =
    useValidation({
      state: {password, newPassword, confirmPassword},
      fieldsRules: {
        password: passwordFieldRules,
        newPassword: passwordFieldRules,
        confirmPassword: {
          required: true,
          equalWith: newPassword,
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
      // change password
      const reqBody: ChangePasswordRes = {
        password,
        newPassword,
      };
      const {meta, payload} = await dispatch(changePassword(reqBody));
      const data = payload as LoginRes;
      // on api success
      if (meta.requestStatus === 'fulfilled') {
        showSuccessToast({message: data.message});
        navigation.goBack();
      }
    }
  };

  /**
   * Focus confirm new password textfield
   */
  const focusConfirmPassword = () => confirmPasswordRef.current?.focus();

  /**
   * Focus confirm new password textfield
   */
  const focusNewPassword = () => newPasswordRef.current?.focus();

  /**
   * Render compony logo and title
   */
  const renderHeaders = () => (
    <View style={styles.headerWrapper}>
      <Text
        text={t('changePassword.description')}
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
        placeholder={t('changePassword.currentPassword')}
        textContentType="password"
        returnKeyType="next"
        onSubmitEditing={focusNewPassword}
        error={getErrorsInField('password')}
      />
      <TextField
        ref={newPasswordRef}
        preset="password"
        value={newPassword}
        onChangeText={setnewPassword}
        leftIcon={<LockOutline />}
        placeholder={t('setNewPassoword.newPassword')}
        textContentType="newPassword"
        returnKeyType="next"
        onSubmitEditing={focusConfirmPassword}
        error={getErrorsInField('newPassword')}
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
      {renderHeaders()}
      {renderTextInputs()}
      {renderSubmitPassword()}
    </Screen>
  );
};
