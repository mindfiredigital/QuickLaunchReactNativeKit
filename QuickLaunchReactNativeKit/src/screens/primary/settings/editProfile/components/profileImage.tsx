import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ViewStyle,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {vs} from 'utils';
import {Colors, spacing} from 'theme';
import {Icon} from 'components';
import {EditImage} from 'assets/svgs';

interface BiometricAuthProps {
  setModalVisible: (value: boolean) => void;
  uri: string;
}

export const ProfileImage = (props: BiometricAuthProps) => {
  const {uri, setModalVisible} = props;
  // hooks
  const {colors} = useTheme();
  // Styles with theme support
  const styles = makeStyles(colors);

  const editOnPress = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.imageView}>
      <View style={styles.imageWrapper}>
        {!!uri && (
          <Image
            source={{
              uri: uri,
            }}
            style={styles.image}
          />
        )}
      </View>
      <TouchableOpacity style={styles.cameraIconView} onPress={editOnPress}>
        <Icon icon={<EditImage />} color={colors.background} size={vs(24)} />
      </TouchableOpacity>
    </View>
  );
};
/**
 * Function to create styles for the GoogleSignIn component.
 * @param colors
 */
const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    imageView: {
      marginTop: vs(spacing.xl),
      width: vs(140),
      height: vs(140),
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: vs(140),
      marginBottom: vs(spacing.xxxl),
    },
    imageWrapper: {
      width: vs(148),
      height: vs(148),
      borderRadius: vs(74),
      padding: vs(4),
      borderColor: colors.background,
      backgroundColor: colors.background,
      shadowColor: colors.text,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.15,
      shadowRadius: 5.65,
      elevation: 2, // For Android elevation
    } as ViewStyle,
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: vs(72),
    },
    cameraIconView: {
      height: vs(36),
      width: vs(36),
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      right: vs(3),
      bottom: vs(3),
      backgroundColor: colors.text + '86',
      borderRadius: vs(20),
    },
  });
