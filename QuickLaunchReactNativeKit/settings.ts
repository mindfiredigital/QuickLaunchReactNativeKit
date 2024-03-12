import {ThemeList} from './src/theme';

interface Settings {
  /**
   * theme: Select predefined theme
   * Options: theme1, theme2, theme3
   * To edit themes navigate to src/theme/themes
   */
  theme: ThemeList;
}

export const settings: Settings = {
  theme: 'theme2',
};
