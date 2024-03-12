import React, {FC, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Button, Header, Screen, Text, TextField} from '../../components';
import {AuthScreenProps} from '../../navigation/authNavigator';
import {showSuccessToast, useValidation, vs} from '../../utils';
import makeStyles from './styles';
import {passwordReset, useAppDispatch, useAppSelector} from '../../store';
import {PasswordResetReq} from '../../api';

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
  const [isVisiblePassword, setVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
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
      const response = await dispatch(passwordReset(reqBody));
      // on api success
      if (response.meta.requestStatus === 'fulfilled') {
        showSuccessToast({message: t('setNewPassoword.onSucess')});
        //Navigate to login screen
        navigation.pop(3);
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
        onChangeText={setPassword}
        leftIcon={'lock'}
        secureTextEntry={!isVisiblePassword}
        rightIcon={!isVisiblePassword ? 'view' : 'hidden'}
        onPressRightIcon={onPressPasswordEye}
        placeholder={t('setNewPassoword.newPassword')}
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
      safeAreaEdges={['top', 'bottom', 'bottom', 'right']}
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
