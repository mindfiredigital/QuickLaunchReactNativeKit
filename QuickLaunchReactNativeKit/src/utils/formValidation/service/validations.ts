import {
  CustomRules,
  ErrorLabels,
  Errors,
  Messages,
  RuleFunction,
  RuleObject,
  RuleValue,
  RulesKeys,
} from '../validation.types';
import {
  isRuleValueForFunction,
  isValidatorFn,
  isValidatorRegExp,
} from './guards';

/**
 * Generates an error message for a specific field and rule using the provided messages and labels.
 *
 * @param fieldName - The name of the field.
 * @param rule - The rule for which the error message is generated.
 * @param value - The value associated with the rule.
 * @param messages - The object containing error messages for different rules.
 * @param labels - The object containing labels for different fields.
 * @returns The formatted error message.
 */
const getErrorMessage = (
  fieldName: string,
  rule: RulesKeys,
  value: RuleValue,
  messages: Messages,
  labels: ErrorLabels,
) => {
  const name = labels[fieldName];
  value = rule == 'minlength' ? +value - 1 : +value;
  if (messages[rule]) {
    const errMsg = messages[rule]
      .replace('{0}', name ?? fieldName)
      .replace('{1}', value.toString());
    return errMsg;
  } else {
    throw Error(`Please add custom string for ${rule}`);
  }
};

/**
 * Validates fields based on the provided rules and rule list.
 *
 * @param fieldName - The name of the field being validated.
 * @param value - The value of the field being validated.
 * @param rules - The object containing validation rules for the field.
 * @param ruleList - The object containing custom validation rules.
 * @param messages - The object containing error messages for different rules.
 * @param labels - The object containing labels for different fields.
 * @returns An object containing information about validation errors (if any).
 */
export const getValidatedFields = (
  fieldName: string,
  value: string,
  rules: RuleObject,
  ruleList: CustomRules,
  messages: Messages,
  labels: ErrorLabels,
) => {
  let errors: Errors = {
    fieldName,
    failedRules: [],
    messages: [],
  };

  // If value is empty and is not required by the rules, no need to check any other rules
  if (!value && !rules.required) {
    return errors;
  }

  const ruleKeys = Object.keys(rules) as RulesKeys[];
  for (const ruleKey of ruleKeys) {
    const validator = ruleList[ruleKey];
    const ruleValue = rules[ruleKey];

    let isValid = true;

    if (ruleValue) {
      if (isValidatorFn(validator) && isRuleValueForFunction(ruleValue)) {
        const validatorFn = validator as RuleFunction;
        isValid = validatorFn(ruleValue, value);
      } else if (isValidatorRegExp(validator)) {
        isValid = validator.test(value);
      }

      if (!isValid) {
        errors = {
          ...errors,
          failedRules: [...errors.failedRules, ruleKey],
          messages: [
            ...errors.messages,
            getErrorMessage(fieldName, ruleKey, ruleValue, messages, labels),
          ],
        };
      }
    }
  }
  return errors;
};
