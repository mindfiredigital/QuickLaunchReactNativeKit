import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import DeviceInfo from 'react-native-device-info';
import {s, vs} from 'utils';
import {Text} from 'components';
import {spacing, typography} from 'theme';

/**
 * Props for the AppVersion component.
 */
export interface AppVersionProps extends ViewProps {
  /**
   * Style overrides for the app version container.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Handle app name render
   */
  showAppName?: boolean;
}

/**
 * Display app version and app name
 * @param props
 * @returns
 */
export const AppVersion = (props: AppVersionProps) => {
  // props
  const {style: styleOverride, showAppName} = props;

  // constants
  const appName = DeviceInfo.getApplicationName();
  const appVersion = DeviceInfo.getVersion();
  const buildNumber = DeviceInfo.getBuildNumber();

  // hooks
  const {t} = useTranslation();

  const containerStyle: StyleProp<ViewStyle> = [
    styles.appVersion,
    {justifyContent: showAppName ? 'space-between' : 'center'},
    styleOverride,
  ];

  return (
    <View style={containerStyle}>
      {showAppName && <Text size="body1">{appName}</Text>}
      <Text size="body1">{`${t(
        'settings.version',
      )} ${appVersion}(${buildNumber})`}</Text>
    </View>
  );
};

// styles for AppVersion component
const styles = StyleSheet.create({
  appVersion: {
    flexDirection: 'row',
    paddingHorizontal: s(spacing.md),
    paddingTop: vs(spacing.md),
    flexWrap: 'wrap',
  } as ViewStyle,
  appVersionText: {
    fontFamily: typography.medium,
  } as TextStyle,
});
