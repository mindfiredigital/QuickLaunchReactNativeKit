import {ThemeWithMode} from './theme.types';

/**
 * A color helpers for defining app theme
 */
export const colors = {
  transparent: 'rgba(0, 0, 0, 0)',
  electicRed: '#F00001',
  darkCharcole: '#333333',
  darkSilver: '#707070',
  spanishGray: '#999999',
  deepTaupe: '#7D5260',
  white: '#ffffff',
  black: '#000000',
  eerieBlack: '#1E1E1E',
  blackOlive: '#3C3C3C',
  platinum: '#E6E6E6',
  lightGray: '#D2D2D2',
  smokeWhite: '#FEFFFF',
  chineseSilver: '#C8C8C8',
  gray: '#808080',
  lavendarGray: '#BBC2D8',
  shadowBlue: '#7D80AA',
  roseVale: '#AF545B',
  grayX11: '#B9B9B9',
  yankeesBlue: '#181D3D',
  gunMetal: '#282C35',
  silverFoil: '#AFAFAF',
  violet: '#8034DE',
  charlestonGreen: '#282828',
  cultured: '#F5F5F5',
};

export const theme1: ThemeWithMode = {
  light: {
    primary: colors.roseVale,
    text: colors.grayX11,
    background: colors.yankeesBlue,
    backgroundSecondary: colors.blackOlive,
    tertiary: colors.lightGray,
    btnTextPrimary: colors.lavendarGray,
    btnTextSecondary: colors.silverFoil,
    border: colors.darkSilver,
    placeholderText: colors.gray,
    card: colors.blackOlive,
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

export const theme2: ThemeWithMode = {
  light: {
    primary: colors.electicRed,
    text: colors.darkCharcole,
    background: colors.white,
    backgroundSecondary: colors.blackOlive,
    tertiary: colors.black,
    btnTextPrimary: colors.white,
    btnTextSecondary: colors.chineseSilver,
    border: colors.darkSilver,
    placeholderText: colors.gray,
    card: colors.blackOlive,
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
    card: colors.blackOlive,
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
