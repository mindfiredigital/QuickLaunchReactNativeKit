import defaultMessages from './mesages/defaultMessages';
import defaultRules from './rules/defaultRuile';

// Type Definitions
export type CustomRules = {[key: string]: RulesValues};
export type RulesKeys = keyof typeof defaultRules;
export type RulesValues = (typeof defaultRules)[RulesKeys];

export type RuleObject = {[key in RulesKeys]?: RuleValue};
export type RuleValue = number | string | boolean;
export type RuleFunction = (rule: string | number, value: string) => boolean;

export type ErrorLabels = FormState;

export type FormState = {[key: string]: any};
export type ErrorState = {[key: string]: Errors};

export type CustomMessages = typeof defaultMessages;

export interface ValidationProps {
  fieldsRules: FieldsToValidate;
  state: FormState;
  rules?: CustomRules;
  messages?: CustomMessages;
  labels?: ErrorLabels;
  locale?: string;
  isTouchedEnabled?: boolean;
}

export type FieldsToValidate = {
  [field: string]: RuleObject & {[key: string]: RuleValue};
};

export interface Messages {
  numbers: string;
  email: string;
  required: string;
  minlength: string;
  maxlength: string;
  equalWith: string;
  hasUpperCase: string;
  hasLowerCase: string;
  hasNumber: string;
  hasSpecialCharacter: string;
  [key: string]: string;
}

export interface DefaultMessages {
  [iso: string]: Messages;
}

export interface Errors {
  fieldName: string;
  failedRules: string[];
  messages: string[];
}
