import {colors} from '../colors';
import {ThemeWithMode} from '../theme.types';

export const theme3: ThemeWithMode = {
  light: {
    primary: colors.violet,
    text: colors.charlestonGreen,
    background: colors.white,
    backgroundSecondary: colors.cultured,
    tertiary: colors.charlestonGreen,
    btnTextPrimary: colors.white,
    btnTextSecondary: colors.chineseSilver,
    border: colors.darkSilver,
    placeholderText: colors.gray,
    card: colors.platinum,
  },
  dark: {
    primary: colors.violet,
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
