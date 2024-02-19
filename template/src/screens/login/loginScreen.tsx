import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Colors, typography} from '../../theme';
import {useTranslation} from 'react-i18next';
import { Text } from '../../components/Text';
import { TextField } from '../../components/TextField';
import Button from '../../components/Button';

export const LoginScreen = () => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const {t} = useTranslation();
  const [tempText,setText]= React.useState('')
  const [isVisible,setVisible]=React.useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{t('login.title')}</Text>
     <TextField secureTextEntry={isVisible} rightIcon={!isVisible?"view":'hidden'} onPressRightIcon ={()=>setVisible(!isVisible)}/>
     <Button styleProps={[{padding:10,backgroundColor:'black'},{margin:10}]} btnText='Sign in' onPress={()=>{console.log('hello')}}/>
    </View>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
      padding:16
    },
    titleText: {
      fontSize: 24,
      color: colors.text,
      fontFamily: typography.bold,
    },
  });
