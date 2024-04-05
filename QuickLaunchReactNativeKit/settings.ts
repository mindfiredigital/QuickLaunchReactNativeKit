import {ThemeList} from './src/theme';

/**
 * Default settings for the application.
 */
export const settings: Settings = {
  theme: 'theme2',
  navigationType: 'tab',
};

interface Settings {
  /**
   * theme: Select predefined theme
   * Options: theme1, theme2, theme3
   * To edit themes navigate to src/theme/themes
   */
  theme: ThemeList;

  /**
   * navigationType: Select the type of primary navigation
   * Options: 'tab' or 'drawer'
   * 'tab': Uses tab-based navigation
   * 'drawer': Uses drawer-based navigation
   */
  navigationType: 'tab' | 'drawer';
}
