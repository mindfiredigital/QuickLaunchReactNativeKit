import {colors} from '../colors';
import {ThemeWithMode} from '../theme.types';

export const theme1: ThemeWithMode = {
  light: {
    primary: colors.roseVale,
    text: colors.darkCharcole,
    background: colors.white,
    backgroundSecondary: colors.platinum,
    tertiary: colors.black,
    btnTextPrimary: colors.white,
    btnTextSecondary: colors.chineseSilver,
    border: colors.darkSilver,
    placeholderText: colors.gray,
    card: colors.platinum,
  },
  dark: {
    primary: colors.roseVale,
    text: colors.grayX11,
    background: colors.yankeesBlue,
    backgroundSecondary: colors.blackOlive,
    tertiary: colors.lightGray,
    btnTextPrimary: colors.lavendarGray,
    btnTextSecondary: colors.silverFoil,
    border: colors.smokeWhite,
    placeholderText: colors.gray,
    card: colors.blackOlive,
  },
};
