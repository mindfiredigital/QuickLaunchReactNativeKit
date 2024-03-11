import {Theme} from '@react-navigation/native';
import {Colors} from '.';

interface ThemeColors {
  /**
   * primary: The primary color of the app used to tint various elements. Usually you'll want to use your brand color for this.
   */
  primary: string;
  /**
   * text: The text color of various elements.
   */
  text: string;
  /**
   * background: The color of various backgrounds, such as background color for the screens.
   */
  background: string;
  /**
   * backgroundSecondary: The color of various secondary backgrounds, such as background color for the screens.
   */
  backgroundSecondary: string;
  /**
   * tertiary: The icon color of various elements.
   */
  tertiary: string;
  /**
   * btnTextPrimary: Them text color of primary button elements.
   */
  btnTextPrimary: string;
  /**
   * btnTextPrimary: Them text color of secondary button elements.
   */
  btnTextSecondary: string;
  /**
   * border: The color of borders, e.g. header border, tab bar border etc.
   */
  border: string;
  /**
   * placeholderText: secondary button text color
   */
  placeholderText: string;
  /**
   * card: The background color of card-like elements, such as headers, tab bars etc.
   */
  card: string;
}

export interface ThemeWithMode {
  light: ThemeColors;
  dark: ThemeColors;
}

// Define extended theme type that literally *extends* Theme
export interface ExtendedTheme extends Theme {
  // Reference the Theme type's colors field and make our field an intersection
  // Learn more:
  //   https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types
  //   https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html
  colors: Theme['colors'] & Colors;
}

declare module '@react-navigation/native' {
  export function useTheme(): ExtendedTheme;
}
