import {colors} from 'theme/colors';
import {ThemeWithMode} from 'theme/theme.types';

export const theme2: ThemeWithMode = {
  light: {
    primary: colors.electicRed,
    text: colors.darkCharcole,
    background: colors.white,
    backgroundSecondary: colors.cultured,
    tertiary: colors.spanishGray,
    btnTextPrimary: colors.white,
    btnTextSecondary: colors.chineseSilver,
    border: colors.platinum,
    placeholderText: colors.gray,
    card: colors.white,
  },
  dark: {
    primary: colors.electicRed,
    text: colors.platinum,
    background: colors.eerieBlack,
    backgroundSecondary: colors.charlestonGreen,
    tertiary: colors.spanishGray,
    btnTextPrimary: colors.smokeWhite,
    btnTextSecondary: colors.lavendarGray,
    border: colors.darkCharcole,
    placeholderText: colors.lightGray,
    card: colors.eerieBlack,
  },
};
