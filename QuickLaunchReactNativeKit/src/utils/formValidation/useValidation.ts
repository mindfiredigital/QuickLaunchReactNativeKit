import {useEffect, useState} from 'react';
import {
  ErrorState,
  Errors,
  RuleObject,
  ValidationProps,
} from './validation.types';
import {getValidatedFields} from './service/validations';
import defaultMessages from './mesages/defaultMessages';
import defaultRules from './rules/defaultRules';
import {
  getErrorMessagesUtils,
  getErrorsForFieldUtils,
  getErrorsInFieldUtils,
  getFailedRulesInFieldUtils,
  getFailedRulesUtils,
  isFieldInErrorUtils,
} from './service/errorUtils';

/**
 * Hook for handling form validations.
 *
 * @param props ValidationProps - The props containing validation configurations.
 * @returns An object containing functions and states to handle form validations.
 */
export const useValidation = (props: ValidationProps) => {
  const {
    state = {},
    fieldsRules,
    rules,
    messages,
    labels = {},
    locale = 'en',
    isTouchedEnabled = true,
  } = props;

  const [isTouched, setIsTouched] = useState(!isTouchedEnabled);
  const [errors, setErrors] = useState<ErrorState>({});

  const baseMessages = messages
    ? {...defaultMessages, ...messages}
    : defaultMessages;
  const localeMessages = baseMessages[locale] ?? defaultMessages['en'];
  const baseRules = rules ? {...defaultRules, ...rules} : defaultRules;

  useEffect(() => {
    if (isTouched) {
      validateForm();
    }
  }, Object.values(state));

  /**
   * Validates the entire form.
   *
   * @returns True if the form is valid, otherwise false.
   */
  const validateForm = () => {
    const errorObj: ErrorState = {};
    Object.keys(state).forEach((fieldName: string) => {
      const value = state[fieldName];
      const error = validatorService(fieldName, value, fieldsRules[fieldName]);
      if (!!error) {
        errorObj[error.fieldName] = error;
      }
    });
    setErrors(errorObj);
    return isFormValid(errorObj);
  };

  /**
   * Validates a single field using the provided validation rules.
   *
   * @param stateKey - The key of the field in the state object.
   * @param value - The value of the field.
   * @param fieldsRules - The validation rules for the field.
   * @returns The validation error object for the field.
   */
  const validatorService = (
    stateKey: string,
    value: string,
    fieldsRules: RuleObject,
  ) => {
    return fieldsRules
      ? getValidatedFields(
          stateKey,
          value,
          fieldsRules,
          baseRules,
          localeMessages,
          labels,
        )
      : null;
  };

  /**
   * Checks if the form is valid.
   *
   * @param err - The error state object.
   * @returns True if the form is valid, otherwise false.
   */
  const isFormValid = (err = errors) => {
    return (
      Object.keys(err).filter(error => err[error]?.messages?.length > 0)
        .length === 0
    );
  };

  /**
   * Checks if a field has validation errors.
   *
   * @param fieldName - The name of the field.
   * @returns True if the field has validation errors, otherwise false.
   */
  const isFieldInError = (fieldName: string): boolean =>
    isFieldInErrorUtils(errors, fieldName);

  /**
   * Retrieves all failed validation rules for the form.
   *
   * @returns An object containing failed validation rules for each field.
   */
  const getFailedRules = () => getFailedRulesUtils(errors);

  /**
   * Retrieves the failed validation rules for a specific field.
   *
   * @param fieldName - The name of the field.
   * @returns An array of failed validation rules for the specified field.
   */
  const getFailedRulesInField = (fieldName: string): string[] =>
    getFailedRulesInFieldUtils(errors, fieldName);

  /**
   * Retrieves the detailed validation errors for a specific field.
   *
   * @param fieldName - The name of the field.
   * @returns The detailed validation errors for the specified field.
   */
  const getErrorsForField = (fieldName: string): Errors | undefined =>
    getErrorsForFieldUtils(errors, fieldName);

  /**
   * Retrieves the formatted validation errors for a specific field.
   *
   * @param fieldName - The name of the field.
   * @param separator - The separator to use between error messages (default is newline).
   * @returns The formatted validation errors for the specified field.
   */
  const getErrorsInField = (fieldName: string, separator = '\n'): string =>
    getErrorsInFieldUtils(errors, fieldName, separator);

  /**
   * Retrieves the formatted validation error messages for the entire form.
   *
   * @param separator - The separator to use between error messages (default is newline).
   * @returns The formatted validation error messages for the entire form.
   */
  const getErrorMessages = (separator = '\n'): string =>
    getErrorMessagesUtils(errors, separator);

  return {
    isTouched,
    setIsTouched,
    validateForm,
    isFormValid,
    isFieldInError,
    getFailedRules,
    getFailedRulesInField,
    getErrorsForField,
    getErrorMessages,
    getErrorsInField,
  };
};
