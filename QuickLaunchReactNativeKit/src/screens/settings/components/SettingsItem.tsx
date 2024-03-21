import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Icon, IconProps, Text} from '../../../components';
import {s, vs} from '../../../utils';
import {Colors, spacing} from '../../../theme';
import {ChevronRight} from '../../../assets/svgs';

interface SettingsItemProps extends TouchableOpacityProps {
  /** The icon to be displayed on the left side of the item. */
  icon: IconProps['icon'];
  /** The name of the setting to be displayed. */
  setting: string;
  /** The size of the left icon. Default value is 24. */
  leftIconSize?: number;
  /** The size of the right arrow icon. Default value is 24. */
  rightIconSize?: number;
}

/**
 * This component represents an item in a settings list. It typically includes an icon on the left,
 * the setting name, and a right arrow icon to indicate interaction.
 */
export const SettingsItem = ({
  icon,
  setting,
  leftIconSize = vs(24),
  rightIconSize = vs(24),
  ...rest
}: SettingsItemProps) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity style={styles.settingsItemContainer} {...rest}>
      <View style={styles.settingsItemContentContainer}>
        <Icon icon={icon} size={leftIconSize} color={colors.tertiary} />
        <Text size="h4" style={styles.settingsText}>
          {setting}
        </Text>
      </View>
      <View>
        <Icon
          icon={<ChevronRight />}
          size={rightIconSize}
          color={colors.tertiary}
        />
      </View>
    </TouchableOpacity>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    settingsItemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: vs(spacing.md),
      paddingHorizontal: s(spacing.sm),
    },
    settingsText: {
      marginLeft: s(spacing.xs),
    },
    settingsItemContentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
