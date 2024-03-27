import {
  View,
  Modal,
  Linking,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import ImagePicker, {
  ImageOrVideo,
  Options,
} from 'react-native-image-crop-picker';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, spacing} from '../../../../../theme';
import {Camera, CloseCircle, Image} from '../../../../../assets/svgs';
import {Card, Icon, MenuItem, Separator, Text} from '../../../../../components';
import {s, showErrorToast, vs} from '../../../../../utils';

/**
 * Props interface for the ImageUploadModal component.
 */
export interface ImageUploadModalProps {
  /**
   * Boolean value indicating whether the modal is open or closed.
   */
  modal: boolean;

  /**
   * Function to set the modal state.
   * @param value The boolean value indicating whether the modal should be open or closed.
   */
  setModal: (value: boolean) => void;

  /**
   * Function to update the image.
   * @param image The image to be updated.
   */
  updateImage: (image: ImageOrVideo) => void;
}

/**
 * Handle image picker UI and pick image from gallary or capture new image
 * @param props
 * @returns
 */
export const ImageUploadModal = (props: ImageUploadModalProps) => {
  const {modal, setModal, updateImage} = props;
  const {colors} = useTheme();
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  // Styles
  const styles = makeStyles(colors);

  /** Image picker options for image cropping */
  const imagePickerOptions: Options = {
    mediaType: 'photo', // Specifies that only photos should be captured
    cropping: true, // Enables image cropping
    width: 400, // Cropped image width
    height: 400, // Cropped image height
    includeBase64: false, // Indicates whether to include base64 encoded image data
    compressImageQuality: 0.5, // Image compression quality (0.0 - 1.0)
    showCropGuidelines: true, // Shows guidelines during image cropping
  };

  /**
   * Function to take a photo from the device camera.
   */
  const takePhotoFromCamera = async () => {
    // Opens the device camera to capture a photo
    await ImagePicker.openCamera(imagePickerOptions)
      .then((image: ImageOrVideo) => {
        // updates the image with the captured photo
        updateImage(image);
      })
      .catch((reason: any) => {
        handlePickerError(reason);
      })
      .finally(() => {
        // Dismisses the modal
        setModal(false);
      });
  };

  /**
   * Function to choose a photo from the device library.
   */
  const choosePhotoFromLibrary = async () => {
    // Opens the device library to choose a photo
    await ImagePicker.openPicker(imagePickerOptions)
      .then(image => {
        // updates the image with the selected photo
        updateImage(image);
      })
      .catch((reason: any) => {
        handlePickerError(reason);
      })
      .finally(() => {
        // Dismisses the modal
        setModal(false);
      });
  };

  /**
   * Handle picker error and display it to user
   */
  const handlePickerError = (reason: any) => {
    switch (reason?.code) {
      case 'E_PICKER_CANCELLED':
        break;
      case 'E_NO_LIBRARY_PERMISSION':
      case 'E_NO_CAMERA_PERMISSION':
        showAlert(reason?.message);
        break;
      default:
        showErrorToast({
          message: !!reason?.message
            ? reason?.message
            : t('apiErrors.unexpectedError'),
        });
        break;
    }
  };

  //show alert
  const showAlert = (message: string) => {
    Alert.alert(t('common.appName'), message, [
      // Optional buttons configuration
      {text: t('imageUpload.openSetting'), onPress: openAppSettings},
    ]);
  };

  //open settings to allow permission
  const openAppSettings = () => {
    // Opens the app settings screen
    Linking.openSettings();
  };

  //hide modal
  const hideModal = () => {
    setModal(false);
  };

  const renderHeader = () => (
    <View style={styles.uploadContainer}>
      <View>
        <Text size="h2">{t('editProfile.editProfilePicture')}</Text>
        <Text>{t('editProfile.editProfilePictureDesc')}</Text>
      </View>
      <Icon
        icon={<CloseCircle />}
        size={vs(30)}
        color={colors.tertiary}
        onPress={hideModal}
      />
    </View>
  );

  const renderOptions = () => (
    <Card style={styles.card}>
      <View style={{overflow: 'hidden', borderRadius: s(spacing.xs)}}>
        <MenuItem
          icon={<Camera />}
          text={t('imageUpload.takePhoto')}
          onPress={takePhotoFromCamera}
        />
        <Separator />
        <MenuItem
          icon={<Image />}
          text={t('imageUpload.choosePhoto')}
          onPress={choosePhotoFromLibrary}
        />
      </View>
    </Card>
  );

  return (
    <Modal animationType="slide" transparent={true} visible={modal}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.overlayContainer}
        onPress={hideModal}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.modalPickImageStyle, {paddingBottom: insets.bottom}]}>
          {renderHeader()}
          {renderOptions()}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    overlayContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
    } as ViewStyle,
    modalPickImageStyle: {
      marginTop: 'auto',
      backgroundColor: colors.backgroundSecondary,
      borderTopLeftRadius: s(spacing.md),
      borderTopRightRadius: s(spacing.md),
    } as ViewStyle,
    uploadContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: s(spacing.md),
      marginTop: vs(spacing.md),
      marginBottom: vs(spacing.sm),
    } as ViewStyle,
    card: {
      marginHorizontal: s(spacing.md),
      marginBottom: vs(spacing.md),
    } as ViewStyle,
  });
