import {RuleFunction, RuleValue, RulesValues} from '../validation.types';

/**
 * Checks if a rule is a function validator.
 *
 * @param rule - The rule to check.
 * @returns True if the rule is a function validator, otherwise false.
 */
export function isValidatorFn(rule: RulesValues): rule is RuleFunction {
  return typeof rule === 'function';
}

/**
 * Checks if a rule is a regular expression validator.
 *
 * @param rule - The rule to check.
 * @returns True if the rule is a regular expression validator, otherwise false.
 */
export function isValidatorRegExp(rule: RulesValues): rule is RegExp {
  return rule instanceof RegExp;
}

/**
 * Checks if a rule value is suitable for a function validator.
 *
 * @param ruleValue - The rule value to check.
 * @returns True if the rule value is a string or a number, otherwise false.
 */
export function isRuleValueForFunction(
  ruleValue: RuleValue,
): ruleValue is string | number {
  return typeof ruleValue === 'string' || !isNaN(+ruleValue);
}

/**
 * Joins an array of error messages into a formatted string.
 *
 * @param errors - The array of error messages.
 * @param separator - The separator to use between error messages (default is newline).
 * @returns A formatted string of joined error messages.
 */
export const getErrorMessages = (errors: string[], separator = '\n') => {
  return errors.join(separator);
};
