import {ErrorState, Errors} from '../validation.types';

/**
 * Checks if a field has errors.
 *
 * @param errors - The object containing validation errors.
 * @param fieldName - The name of the field to check for errors.
 * @returns True if there are errors for the specified field, otherwise false.
 */
export const isFieldInErrorUtils = (
  errors: ErrorState,
  fieldName: string,
): boolean => {
  if (Object.keys(errors)?.length) {
    if (Object(errors).hasOwnProperty(fieldName)) {
      return errors[fieldName].messages?.length > 0;
    } else {
      throw Error('Enter correct fieldName');
    }
  } else {
    return false;
  }
};

/**
 * Retrieves a list of failed rules for each field with errors.
 *
 * @param errors - The object containing validation errors.
 * @returns A map where keys are field names and values are arrays of failed rules.
 */
export const getFailedRulesUtils = (
  errors: ErrorState,
): Record<string, string[]> => {
  const failedRules: Record<string, string[]> = {};
  Object.keys(errors).forEach(key => {
    const error = errors[key];
    failedRules[key] = error.failedRules;
  });
  return failedRules;
};

/**
 * Retrieves the failed rules for a specific field.
 *
 * @param errors - The object containing validation errors.
 * @param fieldName - The name of the field to retrieve failed rules for.
 * @returns An array of failed rules for the specified field.
 */
export const getFailedRulesInFieldUtils = (
  errors: ErrorState,
  fieldName: string,
): string[] => {
  if (Object.keys(errors)?.length) {
    if (Object(errors).hasOwnProperty(fieldName)) {
      return errors[fieldName].failedRules;
    } else {
      throw Error('Enter correct fieldName');
    }
  } else {
    return [];
  }
};

/**
 * Retrieves the detailed errors for a specific field.
 *
 * @param errors - The object containing validation errors.
 * @param fieldName - The name of the field to retrieve errors for.
 * @returns The detailed errors for the specified field.
 */
export const getErrorsForFieldUtils = (
  errors: ErrorState,
  fieldName: string,
): Errors | undefined => {
  if (Object.keys(errors)?.length) {
    if (Object(errors).hasOwnProperty(fieldName)) {
      return errors[fieldName];
    } else {
      throw Error('Enter correct fieldName');
    }
  } else {
    return undefined;
  }
};

/**
 * Retrieves a formatted string of errors for a specific field.
 *
 * @param errors - The object containing validation errors.
 * @param fieldName - The name of the field to retrieve errors for.
 * @param separator - The separator to use between error messages (default is newline).
 * @returns A formatted string of errors for the specified field.
 */
export const getErrorsInFieldUtils = (
  errors: ErrorState,
  fieldName: string,
  separator: string = '\n',
): string => {
  if (Object.keys(errors)?.length) {
    if (Object(errors).hasOwnProperty(fieldName)) {
      return errors[fieldName].messages.join(separator);
    } else {
      throw Error('Enter correct fieldName');
    }
  } else {
    return '';
  }
};

/**
 * Retrieves a formatted string of all error messages.
 *
 * @param errors - The object containing validation errors.
 * @param separator - The separator to use between error messages (default is newline).
 * @returns A formatted string of all error messages.
 */
export const getErrorMessagesUtils = (
  errors: ErrorState,
  separator: string = '\n',
): string => {
  return Object.keys(errors)
    .map(key => errors[key].messages.join(separator))
    .join(separator);
};
