import i18n from '../i18n/i18n';
import {store} from '../store';
import {resetState} from '../store/reducets';
import {showErrorToast} from '../utils';

/**
 * Attempts to get a common cause of problems from an API response.
 *
 * @param error The API error response.
 */
export const getGeneralApiProblem = (error: any) => {
  const {code, response} = error;

  // Check if the error code indicates a timeout
  switch (code) {
    case 'ECONNABORTED':
      showErrorToast({message: i18n.t('apiErrors.requestTimeout')});
      return {status: false, message: i18n.t('apiErrors.requestTimeout')};
    // Check if the error code indicates a network error
    case 'ERR_NETWORK':
      showErrorToast({message: i18n.t('apiErrors.networkError')});
      return {status: false, message: i18n.t('apiErrors.networkError')};
    // Check if the error code indicates a canceled request
    case 'ERR_CANCELED':
      showErrorToast({message: i18n.t('apiErrors.requestCanceled')});
      return {status: false, message: i18n.t('apiErrors.requestCanceled')};
    // Handle other error codes
    default:
      return handleResponseError(response);
  }
};

/**
 * Handles errors from API responses.
 *
 * @param response The API response error.
 */
const handleResponseError = (response: any) => {
  // If there is no response, treat it as an unexpected error
  if (!response) {
    showErrorToast({message: i18n.t('apiErrors.unexpectedError')});
    return {status: false, message: i18n.t('apiErrors.unexpectedError')};
  }

  const {status, data} = response;

  switch (status) {
    // Handle Unauthorized Access (e.g., redirect to login)
    case 401:
      handleUnauthorizedAccess();
      showErrorToast({message: i18n.t('apiErrors.unauthorizedAccess')});
      return {
        ...data,
        status: false,
        message: i18n.t('apiErrors.unauthorizedAccess'),
      };
    // Handle Forbidden Access
    case 403:
      showErrorToast({message: i18n.t('apiErrors.forbiddenAccess')});
      return {
        ...data,
        status: false,
        message: i18n.t('apiErrors.forbiddenAccess'),
      };
    // Handle Bad Request with or without a specific error message
    case 400:
      showErrorToast({
        message: data.message ? data.message : i18n.t('apiErrors.badRequest'),
      });
      return data?.message
        ? {...data, status: false}
        : {...data, status: false, message: i18n.t('apiErrors.badRequest')};
    // Handle Not Found Error
    case 404:
      showErrorToast({message: i18n.t('apiErrors.resourceNotFound')});
      return {
        ...data,
        status: false,
        message: i18n.t('apiErrors.resourceNotFound'),
      };
    // Handle Internal Server Error
    case 500:
      showErrorToast({message: i18n.t('apiErrors.internalServerError')});
      return {
        ...data,
        status: false,
        message: i18n.t('apiErrors.internalServerError'),
      };
    // Handle other HTTP errors
    default:
      showErrorToast({message: i18n.t('apiErrors.unexpectedError')});
      return {
        ...data,
        status: false,
        message: i18n.t('apiErrors.unexpectedError'),
      };
  }
};

/**
 * Handles unauthorized access by dispatching a state reset.
 */
const handleUnauthorizedAccess = () => {
  store.dispatch(resetState());
};
