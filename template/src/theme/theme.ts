/**
 * Themes allow you to change the colors of various components provided by React Navigation. You can use themes to:
 * Customize the colors match your brand
 * Provide light and dark themes based on the time of the day or user preference
 */
import {DefaultTheme, DarkTheme, Theme} from '@react-navigation/native';
import {colors} from './colors';

export type Colors = typeof lightThemeColors;

// Define extended theme type that literally *extends* Theme
interface ExtendedTheme extends Theme {
  // Reference the Theme type's colors field and make our field an intersection
  // Learn more:
  //   https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types
  //   https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html
  colors: Theme['colors'] & Colors;
}

/**
 * Light theme colors
 */
const lightThemeColors = {
  ...colors,
  primary: colors.red,
  background: colors.white,
  text: colors.darkGrey,
  secondary: colors.darkGrey,
  tertiary: colors.pink40,
  surface: colors.white,
  card: colors.white,
  border: colors.borderGrey,
};

/**
 * Dark theme colors
 */
const darkThemeColors = {
  ...colors,
  primary: colors.lightPink,
  background: colors.darkBlue,
  text: colors.medGrey,
  secondary: colors.medGrey,
  tertiary: colors.pink40,
  surface: colors.ebony,
  card: colors.darkBlue,
  border: colors.lighterGrey,
};

/** Light mode theme and colors */
export const lightTheme: ExtendedTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    ...lightThemeColors,
  },
};

/** Dark mode theme and colors */
export const darkTheme: ExtendedTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    ...darkThemeColors,
  },
};

declare module '@react-navigation/native' {
  export function useTheme(): ExtendedTheme;
}
