import React, {FC, useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {Button, Screen, TextField} from 'components';
import {
  getUser,
  updateUser,
  uploadProfileImage,
  useAppDispatch,
  useAppSelector,
} from 'store';
import {PrimaryScreenProps} from 'navigation';
import {AccountOutline, EmailOutline, PhoneOutline} from 'assets/svgs';
import {showSuccessToast, useValidation, vs} from 'utils';
import {
  GetUserRes,
  UpdateUserReq,
  UploadProfileImageReq,
  UploadProfileImageRes,
} from 'api';
import {ImageUploadModal, ProfileImage} from './components';
import makeStyles from './styles';

/**
 * Edit profile screen
 * User can update profile image and other user details like name, phone and email.
 */
export const EditProfileScreen: FC<PrimaryScreenProps<'editProfile'>> = ({
  navigation,
}) => {
  // constants & hooks
  const {colors} = useTheme();
  const {t} = useTranslation();

  // redux hooks
  const dispatch = useAppDispatch();
  const {loading: authLoading, user} = useAppSelector(state => state.auth);
  const {loading} = useAppSelector(state => state.app);

  // states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNum, setMobileNum] = useState('');
  const [profileUri, setProfileUri] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Styles
  const styles = makeStyles(colors);

  // Textinput references
  const emailRef = useRef<TextInput>(null);
  const mobileNumRef = useRef<TextInput>(null);

  /**
   * Effect hook to set user details when the component mounts.
   */
  useEffect(() => {
    setUserDetails();
  }, []);

  /**
   * Function to set user details.
   */
  const setUserDetails = async () => {
    const {email, full_name, phone_number, profileSignedUrl} = user;
    // Sets the email, full name, mobile number, and profile URI based on the received data
    setEmail(email);
    setFullName(full_name);
    setMobileNum(phone_number);
    setProfileUri(profileSignedUrl);
  };

  /**
   * Function to fetch user details.
   */
  const getUserDetails = async () => {
    // Dispatches the getUser action to fetch user details
    await dispatch(getUser());
    goBack();
  };

  // Validate form textfields input
  const {setIsTouched, validateForm, isFormValid, getErrorsInField} =
    useValidation({
      state: {fullName, email, mobileNum},
      fieldsRules: {
        fullName: {
          required: true,
          strings: true,
        },
        email: {
          required: true,
          email: true,
        },
        mobileNum: {
          required: true,
          hasNumber: true,
        },
      },
      isTouchedEnabled: true,
    });

  /**
   * Focus email textfield
   */
  const focusEmail = () => emailRef.current?.focus();

  /**
   * Focus mobileNum textfield
   */
  const focusMobileNo = () => mobileNumRef.current?.focus();

  /**
   * navigate to back screen
   */
  const goBack = () => {
    navigation.goBack();
  };

  /**
   * Handles the save button press event.
   */
  const onPressSave = async () => {
    setIsTouched(true);

    // Validates the form
    const isValid = validateForm();

    // If the form is valid, sends update request
    if (isValid) {
      const req: UpdateUserReq = {
        email,
        full_name: fullName,
        phone_no: mobileNum,
        is_update: '1',
      };

      // Dispatches update user request
      const {meta, payload} = await dispatch(updateUser(req));
      const data = payload as GetUserRes;

      // If request is fulfilled, fetches user details
      if (meta.requestStatus === 'fulfilled') {
        if (data?.message) {
          showSuccessToast({message: data.message});
        }
        getUserDetails();
      }
    }
  };

  /**
   * Handles the uploaded image.
   * @param image The uploaded image.
   */
  const onUpdateImage = async (image: ImageOrVideo) => {
    // Constructs upload profile image request
    const req: UploadProfileImageReq = {
      uri: image.path,
      name: image.filename || image.modificationDate,
      type: image.mime,
    };

    // Dispatches upload profile image request
    const {meta, payload} = await dispatch(uploadProfileImage(req));
    const data = payload as UploadProfileImageRes;

    // If request is fulfilled and profile image url is received, updates profile URI
    if (meta.requestStatus === 'fulfilled' && data.data.profileSignedUrl) {
      setProfileUri(data.data.profileSignedUrl);
      if (data?.message) showSuccessToast({message: data.message});
    }
  };

  /**
   * Render inputs name,mobile  and email
   */
  const renderTextInputs = () => (
    <>
      <TextField
        onChangeText={setFullName}
        value={fullName}
        leftIcon={<AccountOutline />}
        placeholder={t('signUp.namePlaceholder')}
        keyboardType="name-phone-pad"
        inputMode="text"
        returnKeyType="next"
        textContentType="name"
        onSubmitEditing={focusMobileNo}
        error={getErrorsInField('fullName')}
        blurOnSubmit={false}
      />
      <TextField
        ref={mobileNumRef}
        value={mobileNum}
        onChangeText={setMobileNum}
        leftIcon={<PhoneOutline />}
        placeholder={t('editProfile.mobileNumPlaceholder')}
        textContentType="telephoneNumber"
        returnKeyType="next"
        error={getErrorsInField('mobileNum')}
        blurOnSubmit={false}
        onSubmitEditing={focusEmail}
      />
      <TextField
        ref={emailRef}
        onChangeText={setEmail}
        value={email}
        leftIcon={<EmailOutline />}
        placeholder={t('signUp.emailPlaceholder')}
        keyboardType="email-address"
        inputMode="email"
        returnKeyType="done"
        textContentType="emailAddress"
        leftIconSize={vs(25)}
        error={getErrorsInField('email')}
      />
    </>
  );

  /**
   * Render Save button
   */
  const renderButtons = () => (
    <>
      <Button
        btnText={t('editProfile.save')}
        disabled={!isFormValid()}
        onPress={onPressSave}
        style={styles.btnStyle}
      />
    </>
  );

  return (
    <Screen
      safeAreaEdges={['bottom', 'left', 'right']}
      preset="auto"
      loading={loading || authLoading}>
      {/* ProfileImage component with profile URI and modal visibility handler */}
      <ProfileImage
        uri={profileUri} // Profile image URI
        setModalVisible={setModalVisible} // Function to control modal visibility
      />

      {/* Render text input fields */}
      {renderTextInputs()}

      {/* Render save button */}
      {renderButtons()}

      {/* ImageUploadModal component with modal visibility, image update handler, title, and subtitle */}
      <ImageUploadModal
        modal={modalVisible} // Indicates whether the modal is visible
        setModal={setModalVisible} // Function to control modal visibility
        updateImage={onUpdateImage} // Function to handle image update
      />
    </Screen>
  );
};
