import {View, Modal, Linking, StyleSheet, Alert} from 'react-native';
import React from 'react';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Colors, spacing} from '../theme';
import {s, vs} from '../utils';
import {Button, Text} from '.';

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

  /**
   * The title of the modal.
   */
  title: string;

  /**
   * The subtitle of the modal.
   */
  subtitle: string;
}

const ImageUploadModal = (props: ImageUploadModalProps) => {
  const {modal, setModal, updateImage, title, subtitle} = props;
  const {colors} = useTheme();
  const {t} = useTranslation();
  // Styles
  const styles = makeStyles(colors);

  /**
   * Function to take a photo from the device camera.
   */
  const takePhotoFromCamera = async () => {
    // Opens the device camera to capture a photo
    await ImagePicker.openCamera({
      mediaType: 'photo', // Specifies that only photos should be captured
      cropping: true, // Enables image cropping
      width: 400, // Cropped image width
      height: 400, // Cropped image height
      includeBase64: false, // Indicates whether to include base64 encoded image data
      compressImageQuality: 0.5, // Image compression quality (0.0 - 1.0)
      showCropGuidelines: true, // Shows guidelines during image cropping
    })
      .then((image: ImageOrVideo) => {
        // Dismisses the modal and updates the image with the captured photo
        setModal(false);
        updateImage(image);
      })
      .catch(function () {
        // Dismisses the modal and shows an alert if there is an error
        setModal(false);
        showAlert();
      });
  };

  /**
   * Function to choose a photo from the device library.
   */
  const choosePhotoFromLibrary = async () => {
    // Opens the device library to choose a photo
    await ImagePicker.openPicker({
      mediaType: 'photo', // Specifies that only photos should be selected
      cropping: true, // Enables image cropping
      width: 400, // Cropped image width
      height: 400, // Cropped image height
      includeBase64: false, // Indicates whether to include base64 encoded image data
      compressImageQuality: 0.5, // Image compression quality (0.0 - 1.0)
      showCropGuidelines: true, // Shows guidelines during image cropping
    })
      .then(image => {
        // Dismisses the modal and updates the image with the selected photo
        setModal(false);
        updateImage(image);
      })
      .catch(function () {
        // Dismisses the modal and shows an alert if there is an error
        setModal(false);
        showAlert();
      });
  };

  //show alert
  const showAlert = () => {
    Alert.alert('', t('imageUpload.openSetting'), [
      // Optional buttons configuration
      {text: t('imageUpload.ok'), onPress: openAppSettings},
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

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modal}>
        <View style={styles.container1}>
          <View style={styles.modalPickImageStyle}>
            <View style={styles.uploadContainer}>
              <Text size="h1">{title}</Text>
              <Text size="h2" style={styles.panelSubtitle}>
                {subtitle}
              </Text>
            </View>
            <Button
              btnText={t('imageUpload.takePhoto')}
              onPress={takePhotoFromCamera}
            />
            <Button
              btnText={t('imageUpload.chooseFrom')}
              onPress={choosePhotoFromLibrary}
            />
            <Button btnText={t('imageUpload.cancel')} onPress={hideModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container1: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalPickImageStyle: {
      marginTop: 'auto',
      backgroundColor: colors.background,
      borderTopLeftRadius: s(20),
      borderTopRightRadius: s(20),
    },
    panelTitle: {
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 24,
      lineHeight: 28,
      height: vs(spacing.xl),
      color: colors.text,
    },
    panelSubtitle: {
      height: vs(spacing.xl),
      marginBottom: vs(spacing.md),
    },
    panelButtonTitle: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 20,
      lineHeight: 28,
      letterSpacing: 0.25,
      color: 'white',
    },
    panelButton: {
      padding: vs(spacing.md),
      borderRadius: vs(spacing.md),
      backgroundColor: colors.primary,
      alignItems: 'center',
      marginVertical: vs(spacing.md),
      marginLeft: vs(spacing.md),
      marginRight: vs(spacing.md),
    },
    flexDirection: {
      flexDirection: 'row',
    },
    uploadContainer: {
      alignItems: 'center',
      marginTop: vs(spacing.md),
    },
    marginBottom: {
      marginBottom: vs(spacing.xxl),
    },
  });

export default ImageUploadModal;
