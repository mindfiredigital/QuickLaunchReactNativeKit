import React, {ComponentType} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Icon, IconProps, Text} from '.';
import {s, vs} from '../utils';
import {Colors, spacing} from '../theme';
import {ChevronRight} from '../assets/svgs';

interface MenuItemProps extends TouchableOpacityProps {
  /** The icon to be displayed on the left side of the item. */
  icon: IconProps['icon'];
  /** The name of the setting to be displayed. */
  text: string;
  /** The size of the left icon. Default value is 24. */
  leftIconSize?: number;
  /** The size of the right arrow icon. Default value is 24. */
  rightIconSize?: number;
  /** Add custom UI to the right of menu item */
  rightChildren?: React.ReactNode;
  /** Add custom UI to the bottom of menu item */
  bottomChildren?: React.ReactNode;
}

/**
 * This component represents an item in a settings list. It typically includes an icon on the left,
 * the setting name, and a right arrow icon to indicate interaction.
 */
export const MenuItem = ({
  icon,
  text,
  leftIconSize = vs(22),
  rightIconSize = vs(22),
  rightChildren,
  bottomChildren,
  ...rest
}: MenuItemProps) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const isPressable = !!rest.onPress;
  const Wrapper = (isPressable ? TouchableOpacity : View) as ComponentType<
    TouchableOpacityProps | ViewProps
  >;

  return (
    <Wrapper style={styles.menuOuterItemContainer} {...rest}>
      <View style={styles.menuItemContainer}>
        <View style={styles.menuItemContentContainer}>
          <Icon icon={icon} size={leftIconSize} color={colors.tertiary} />
          <Text size="h4" style={styles.menuText}>
            {text}
          </Text>
        </View>
        {!!rightChildren ? (
          rightChildren
        ) : (
          <View>
            <Icon
              icon={<ChevronRight />}
              size={rightIconSize}
              color={colors.tertiary}
            />
          </View>
        )}
      </View>
      {bottomChildren}
    </Wrapper>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    menuOuterItemContainer: {
      paddingVertical: vs(spacing.sm),
      paddingHorizontal: s(spacing.sm),
    },
    menuItemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    menuText: {
      marginLeft: s(spacing.xs),
    },
    menuItemContentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
