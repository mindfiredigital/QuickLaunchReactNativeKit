import {DefaultMessages} from '../validation.types';

/**
 * Default predefined messaged
 */
export const defaultMessages: DefaultMessages = {
  // English language - Used by default
  en: {
    numbers: 'The field {0} must be a valid number.',
    strings: 'The field {0} must be a valid string.',
    email: 'The field {0} must be a valid email address.',
    required: 'The field {0} is mandatory.',
    length: 'The field {0} length must be {1}.',
    minlength: 'The field {0} length must be greater than {1}.',
    maxlength: 'The field {0} length must be lower than {1}.',
    equalWith: 'The field {0} do not match.',
    hasUpperCase: 'The field {0} must contain a upper case.',
    hasLowerCase: 'The field {0} must contain a lower case.',
    hasNumber: 'The field {0} must contain a number.',
    hasSpecialCharacter: 'The field {0} must contain a special character.',
  },
  // TODO Add other languages here...
};

export default defaultMessages;
