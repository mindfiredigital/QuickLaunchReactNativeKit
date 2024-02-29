import i18n from '../i18n/i18n';
import {store} from '../store';
import {resetState} from '../store/reducets';

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
      return {status: false, message: i18n.t('apiErrors.requestTimeout')};
    // Check if the error code indicates a network error
    case 'ERR_NETWORK':
      return {status: false, message: i18n.t('apiErrors.networkError')};
    // Check if the error code indicates a canceled request
    case 'ERR_CANCELED':
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
    return {status: false, message: i18n.t('apiErrors.unexpectedError')};
  }

  const {status, data} = response;

  switch (status) {
    // Handle Unauthorized Access (e.g., redirect to login)
    case 401:
      handleUnauthorizedAccess();
      return {
        ...data,
        status: false,
        message: i18n.t('apiErrors.unauthorizedAccess'),
      };
    // Handle Forbidden Access
    case 403:
      return {
        ...data,
        status: false,
        message: i18n.t('apiErrors.forbiddenAccess'),
      };
    // Handle Bad Request with or without a specific error message
    case 400:
      return data.message
        ? {...data, status: false}
        : {...data, status: false, message: i18n.t('apiErrors.badRequest')};
    // Handle Not Found Error
    case 404:
      return {
        ...data,
        status: false,
        message: i18n.t('apiErrors.resourceNotFound'),
      };
    // Handle Internal Server Error
    case 500:
      return {
        ...data,
        status: false,
        message: i18n.t('apiErrors.internalServerError'),
      };
    // Handle other HTTP errors
    default:
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
