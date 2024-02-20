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

const theme2 = {
  common: {
    /**
     * primary: The primary color of the app used to tint various elements. Usually you'll want to use your brand color for this.
     */
    primary: colors.electicRed,
    /**
     * btnTextPrimary: Them text color of secondary button elements.
     */
    btnTextSecondary: colors.chineseSilver,
    /**
     * placeholderText: secondary button text color
     */
    placeholderText: colors.gray,
    /**
     * backgroundSecondary: The color of various secondary backgrounds, such as background color for the screens.
     */
    backgroundSecondary: colors.blackOlive,
    /**
     * card: The background color of card-like elements, such as headers, tab bars etc.
     */
    card: colors.blackOlive,
  },
  light: {
    /**
     * tertiary: The icon color of various elements.
     */
    tertiary: colors.black,
    /**
     * btnTextPrimary: Them text color of primary button elements.
     */
    btnTextPrimary: colors.white,
    /**
     * background: The color of various backgrounds, such as background color for the screens.
     */
    background: colors.white,
    /**
     * text: The text color of various elements.
     */
    text: colors.darkCharcole,
    /**
     * border: The color of borders, e.g. header border, tab bar border etc.
     */
    border: colors.darkSilver,
  },
  dark: {
    /**
     * tertiary: The icon color of various elements.
     */
    tertiary: colors.lightGray,
    /**
     * btnTextPrimary: Them text color of primary button elements.
     */
    btnTextPrimary: colors.smokeWhite,
    /**
     * background: The color of various backgrounds, such as background color for the screens.
     */
    background: colors.eerieBlack,
    /**
     * text: The text color of various elements.
     */
    text: colors.platinum,
    /**
     * border: The color of borders, e.g. header border, tab bar border etc.
     */
    border: colors.smokeWhite,
  },
};

/**
 * Light theme colors
 */
const lightThemeColors = {
  ...colors,
  ...theme2.common,
  ...theme2.light,
};

/**
 * Dark theme colors
 */
const darkThemeColors = {
  ...colors,
  ...theme2.common,
  ...theme2.dark,
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
