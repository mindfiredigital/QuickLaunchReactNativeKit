import Toast, {ToastShowParams} from 'react-native-toast-message';
import i18n from 'i18n';

// Interface for the custom showSuccessToast function
interface ShowToastType extends ToastShowParams {
  message: string;
  heading?: string;
}

/**
 * Function to display a success toast message.
 * @param {ShowToastType} props - Toast parameters, including the success message and optional heading.
 */
export const showSuccessToast = (props: ShowToastType) => {
  const {message, heading = i18n.t('common.success'), ...rest} = props;
  Toast.show({
    type: 'success',
    text1: heading,
    text2: message,
    ...rest,
  });
};

/**
 * Function to display an error toast message.
 * @param {ShowToastType} props - Toast parameters, including the error message and optional heading.
 */
export const showErrorToast = (props: ShowToastType) => {
  const {message, heading = i18n.t('common.error'), ...rest} = props;
  Toast.show({
    type: 'error',
    text1: heading,
    text2: message,
    ...rest,
  });
};

/**
 * Function to display an information toast message.
 * @param {ShowToastType} props - Toast parameters, including the information message and optional heading.
 */
export const showInfoToast = (props: ShowToastType) => {
  const {message, heading = i18n.t('common.info'), ...rest} = props;
  Toast.show({
    type: 'info',
    text1: heading,
    text2: message,
    ...rest,
  });
};

/**
 * Function to display a warning toast message.
 * @param {ShowToastType} props - Toast parameters, including the warning message and optional heading.
 */
export const showWarningToast = (props: ShowToastType) => {
  const {message, heading = i18n.t('common.warning'), ...rest} = props;
  Toast.show({
    type: 'warning',
    text1: heading,
    text2: message,
    ...rest,
  });
};
