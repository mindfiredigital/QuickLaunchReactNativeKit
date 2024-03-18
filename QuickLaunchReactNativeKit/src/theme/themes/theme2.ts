import {colors} from '../colors';
import {ThemeWithMode} from '../theme.types';

export const theme2: ThemeWithMode = {
  light: {
    primary: colors.electicRed,
    text: colors.darkCharcole,
    background: colors.white,
    backgroundSecondary: colors.platinum,
    tertiary: colors.spanishGray,
    btnTextPrimary: colors.white,
    btnTextSecondary: colors.chineseSilver,
    border: colors.darkSilver,
    placeholderText: colors.gray,
    card: colors.platinum,
  },
  dark: {
    primary: colors.electicRed,
    text: colors.platinum,
    background: colors.eerieBlack,
    backgroundSecondary: colors.blackOlive,
    tertiary: colors.lightGray,
    btnTextPrimary: colors.smokeWhite,
    btnTextSecondary: colors.chineseSilver,
    border: colors.smokeWhite,
    placeholderText: colors.gray,
    card: colors.blackOlive,
  },
};
