import React from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Icon, Text} from '../../../components';
import {s, vs} from '../../../utils';
import {spacing, typography} from '../../../theme';
import {ChevronRight} from '../../../assets/svgs';

interface ProfileSettingsProps extends TouchableOpacityProps {
  /**
   * The URL of the user's profile picture.
   */
  profileUrl: string;

  /**
   * The name of the user.
   */
  userName: string;

  /**
   * The email address of the user.
   * Optional, can be empty.
   */
  email?: string;
}

/**
 * ProfileSettings Component
 *
 * This component represents a profile settings item, typically used in a settings screen
 * to display user profile information such as profile picture, username, and email.
 */
export const ProfileSettings = ({
  profileUrl,
  userName,
  email,
  ...rest
}: ProfileSettingsProps) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={styles.settingsItemContainer} {...rest}>
      <View style={styles.settingsItemContentContainer}>
        <Image source={{uri: profileUrl}} style={styles.profileImage} />
        <View style={styles.contentWrapper}>
          <Text size="h4">{userName}</Text>
          {!!email && (
            <Text size="body1" style={styles.settingsText}>
              {email}
            </Text>
          )}
        </View>
      </View>
      <View>
        <Icon icon={<ChevronRight />} size={vs(24)} color={colors.tertiary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  settingsItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: vs(spacing.md),
    paddingHorizontal: s(spacing.sm),
  } as ViewStyle,
  contentWrapper: {
    flex: 1,
    marginLeft: s(spacing.xs),
  } as ViewStyle,
  settingsText: {
    fontFamily: typography.light,
  } as TextStyle,
  settingsItemContentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  profileImage: {
    height: vs(50),
    width: vs(50),
    borderRadius: vs(25),
    resizeMode: 'cover',
  } as ImageStyle,
});
