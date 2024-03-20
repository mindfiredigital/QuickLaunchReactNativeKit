import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {vs} from '../../../utils';
import {Colors, spacing} from '../../../theme';
import {Icon} from '../../../components';
import {EditImage} from '../../../assets/svgs';

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
      <Image
        source={{
          uri: uri,
        }}
        style={styles.image}
      />
      <TouchableOpacity style={styles.cameraIconView} onPress={editOnPress}>
        <Icon icon={<EditImage />} color={colors.background} size={30} />
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
    image: {
      width: vs(140),
      height: vs(140),
      backgroundColor: colors.tertiary,
      borderRadius: vs(140),
    },
    cameraIconView: {
      height: vs(50),
      width: vs(50),
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      right: 0,
      bottom: vs(8),
      backgroundColor: colors.tertiary,
      borderRadius: vs(50),
    },
  });
