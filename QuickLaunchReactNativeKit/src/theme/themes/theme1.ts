import {colors} from 'theme/colors';
import {ThemeWithMode} from 'theme/theme.types';

export const theme1: ThemeWithMode = {
  light: {
    primary: colors.roseVale,
    text: colors.darkCharcole,
    background: colors.white,
    backgroundSecondary: colors.cultured,
    tertiary: colors.yankeesBlue,
    btnTextPrimary: colors.white,
    btnTextSecondary: colors.chineseSilver,
    border: colors.platinum,
    placeholderText: colors.gray,
    card: colors.white,
  },
  dark: {
    primary: colors.roseVale,
    text: colors.platinum,
    background: colors.yankeesBlue,
    backgroundSecondary: '#111a2b',
    tertiary: colors.lightGray,
    btnTextPrimary: colors.lavendarGray,
    btnTextSecondary: colors.silverFoil,
    border: colors.darkCharcole,
    placeholderText: colors.gray,
    card: colors.yankeesBlue,
  },
};
