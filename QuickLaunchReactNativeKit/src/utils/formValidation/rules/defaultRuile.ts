/**
 * Custom default rules to validate form fields
 */
const defaultRules = {
  required: /\S+/,
  strings: /^[a-zA-Z ]*$/,
  numbers: /^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/,
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  hasNumber: /\d/,
  hasUpperCase: /(?=.*[A-Z])/,
  hasLowerCase: /(?=.*[a-z])/,
  hasSpecialCharacter: /(\W)/,
  length(length: number, value: string) {
    if (length === void 0) {
      throw 'ERROR: It is not a valid length, checkout your minlength settings.';
    } else if (value.length == length) {
      return true;
    }
    return false;
  },
  minlength(length: number, value: string) {
    if (length === void 0) {
      throw 'ERROR: It is not a valid length, checkout your minlength settings.';
    } else if (value.length >= length) {
      return true;
    }
    return false;
  },
  maxlength(length: number, value: string) {
    if (length === void 0) {
      throw 'ERROR: It is not a valid length, checkout your maxlength settings.';
    } else if (value.length > length) {
      return false;
    }
    return true;
  },
  equalWith(dataToCompare: string, value: string) {
    return dataToCompare === value;
  },
};

export default defaultRules;
