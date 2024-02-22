import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Colors, typography} from '../../theme';
import {Text} from '../../components/Text';
import {TextField} from '../../components/TextField';
import Button from '../../components/Button';
import {Screen} from '../../components/Screen';
import {Icon} from '../../components/Icon';
import {AuthScreenProps} from '../../navigation/authNavigator';
import {makeCommanStyles} from '../styles';

export const LoginScreen: FC<AuthScreenProps<'login'>> = ({
  navigation,
  route,
}) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const commonStyles = makeCommanStyles(colors);
  const {t} = useTranslation();
  const [tempText, setText] = useState('');
  const [isVisible, setVisible] = useState(false);

  const renderHeaders = () => (
    <>
      <Icon
        icon="mindfireFireLogo"
        size={129}
        containerStyle={styles.logoContainer}
        color={colors.primary}
      />
      <Text style={styles.titleText}>{t('login.title')}</Text>
    </>
  );

  return (
    <Screen
      safeAreaEdges={['top', 'bottom']}
      preset="auto"
      keyboardOffset={10}
      contentContainerStyle={styles.contentContainerStyle}>
      <View>
        {renderHeaders()}
        <TextField
          leftIcon={'people'}
          placeholder={t('login.userNamePlaceholder')}
          leftIconSize={20}
        />
        <TextField
          leftIcon={'lock'}
          secureTextEntry={isVisible}
          rightIcon={!isVisible ? 'view' : 'hidden'}
          onPressRightIcon={() => setVisible(!isVisible)}
          placeholder={t('login.passwordPlaceholder')}
          leftIconSize={20}
          containerStyle={styles.passwordInput}
        />
        <View style={styles.forgotView}>
          <Button
            btnText={t('login.forgotPassword')}
            onPress={() => {
              //forgot password
            }}
            styleProps={styles.forgotBtn}
            textStyleProps={styles.forgotBtnText}
          />
        </View>
        <Button
          btnText={t('login.title')}
          onPress={() => {
            //login user
          }}
        />
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.signupText}>{t('login.dontHave')}</Text>
        <Button
          styleProps={styles.signupBtn}
          btnText={t('login.signup')}
          textStyleProps={styles.forgotBtnText}
          onPress={() => {
            //login user
          }}
        />
      </View>
    </Screen>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    logoContainer: {marginTop: 30, alignSelf: 'center'},
    contentContainerStyle: {
      padding: 21,
      flex: 1,
      justifyContent: 'space-between',
    },
    titleText: {
      fontFamily: typography.bold,
      fontSize: 30,
      lineHeight: 36,
      marginBottom: 20,
      marginTop: 16,
      color: colors.secondary,
    },
    passwordInput: {
      marginTop: 40,
      marginBottom: 30,
    },
    forgotView: {
      justifyContent: 'flex-end',
      alignSelf: 'flex-end',
      width: '40%',
    },
    forgotBtn: {
      backgroundColor: colors.background,
    },
    forgotBtnText: {
      color: colors.primary,
    },
    signupBtn: {
      backgroundColor: colors.background,
      width: 70,
      height: 18,
      padding: 0,
    },
    bottomView: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    signupText: {
      color: colors.secondary,
      fontFamily: typography.regular,
      fontSize: 16,
      lineHeight: 18,
    },
  });
