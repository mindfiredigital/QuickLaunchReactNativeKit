import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {MenuItem} from '../../../components';
import {Colors, spacing, typography} from '../../../theme';
import {vs} from '../../../utils';
import {ThemeLightDark} from '../../../assets/svgs';
import {
  AppState,
  updateTheme,
  useAppDispatch,
  useAppSelector,
} from '../../../store';

// List of themes
const THEMES = ['Auto', 'Light', 'Dark'];

/**
 * Render AppTheme view in settings
 */
export const AppTheme: React.FC = () => {
  // constants & hooks
  const {colors} = useTheme();
  const {t} = useTranslation();
  const styles = makeStyles(colors);

  // redux hooks
  const dispatch = useAppDispatch();
  const {theme} = useAppSelector(state => state.app);

  /** selected current theme in store */
  const selectedTheme = THEMES.findIndex(x => x.toLowerCase() === theme);

  /** Update selected theme to store */
  const onThemeChange = (index: number) => {
    const theme = THEMES[index].toLowerCase() as AppState['theme'];
    dispatch(updateTheme(theme));
  };

  /** Segmented control for Theme list */
  const bottomChildren = (
    <View style={styles.bottomContentWrapper}>
      <SegmentedControl
        values={THEMES}
        selectedIndex={selectedTheme}
        tintColor={colors.background}
        backgroundColor={colors.backgroundSecondary}
        fontStyle={styles.segmentedText}
        onChange={event => {
          onThemeChange(event.nativeEvent.selectedSegmentIndex);
        }}
      />
    </View>
  );

  return (
    <MenuItem
      icon={<ThemeLightDark />}
      text={t('settings.theme')}
      rightChildren={<></>}
      bottomChildren={bottomChildren}
    />
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    bottomContentWrapper: {
      marginTop: vs(spacing.xs),
    },
    segmentedText: {
      fontFamily: typography.regular,
      color: colors.text,
    },
  });
