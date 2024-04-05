# Form Validation

Simple form validation component for React-Native for Functional component.

## useValidation Hook

You need to pass the form field state to the `useValidation` hook in the `state` propery.

You can also pass custom `messages`, `labels`, `rules`, `locale` (check the documentation below).

The description of the `object returned` by the `hook` is :

| Function / Variable                                   | Output                          | Benefits                                                                                                                                                                                                   |
| ----------------------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| isFormValid                                           | boolean                         | This variable indicates if the form is valid and if there are no errors.                                                                                                                                   |
| isFieldInError(fieldName: string)                     | boolean                         | This function indicates if a specific field has an error. The field name will match with your form state                                                                                                   |
| getErrorMessages(separator: string, separator = '\n') | string                          | This method returns the different error messages bound to your form state. The argument is optional, by default the separator is a \n. Under the hood a join method is used.                               |
| getErrorsInField(fieldName: string,separator = '\n')  | string                          | This method returns the error messages bound to the specified field separated by separator. The field name will match with your form state. It returns an empty string if no error was bound to the field. |
| getErrorsForField(fieldName: string)                  | Errors \| undefined             | This method returns an `Errors` object containing 3 properties : `fieldName: string`, `failedRules: string[]`, and `messages: string[]`.                                                                   |
| getFailedRules()                                      | {[fieldName: string]: string[]} | This methods returns the failed rules of your form state                                                                                                                                                   |
| getFailedRulesInField(fieldName: string)              | string[]                        | This method returns the failed rules bound to a specific field name.                                                                                                                                       |

```typescript
const {setIsTouched, validateForm, isFormValid, getErrorsInField} =
  useValidation({
    state: {email, password},
    fieldsRules: {
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        password: true,
        minlength: 8,
        maxlength: 16,
        hasUpperCase: true,
        hasLowerCase: true,
        hasNumber: true,
        hasSpecialCharacter: true,
      },
    },
    isTouchedEnabled: true,
  });
```

### Existing rules :

You will find bellow the default rules available in the library [defaultRules.ts](../../../../src/utils/formValidation/rules/defaultRuile.ts) :

| Rule                | Benefits                                                                           |
| ------------------- | ---------------------------------------------------------------------------------- |
| required            | Check if a state variable is not empty.                                            |
| strings             | Check if a state variable contains only alphabet characters.                       |
| numbers             | Check if a state variable is a number.                                             |
| email               | Check if a state variable is an email.                                             |
| length              | Check if a state variable length is same as length.                                |
| minlength           | Check if a state variable is greater than minlength.                               |
| maxlength           | Check if a state variable is lower than maxlength.                                 |
| equalWith           | Check if a state variable is equal to another value (useful for password confirm). |
| hasNumber           | Check if a state variable contains a number.                                       |
| hasUpperCase        | Check if a state variable contains a upper case letter.                            |
| hasLowerCase        | Check if a state variable contains a lower case letter.                            |
| hasSpecialCharacter | Check if a state variable contains a special character.                            |

You can also extend these rules with your own custom rules :

```js
// extend default rules with my custom any rule
const customRules = {any: /^(.*)$/};

const {isFieldInError, getErrorsInField, isFormValid} = useValidation({
  fieldRules: {
    email: {email: true},
    name: {required: true},
  },
  state: {firstName, lastName, email},
  rules: customRules,
});
```

### Existing messages :

The library also contains a [defaultMessages.ts](../../../../src/utils/formValidation/mesages/defaultMessages.ts) file which includes the errors label for a language locale.

Here's the table listing the default error messages provided in the `defaultMessages` object:

| Error Type            | Default Error Message                              |
| --------------------- | -------------------------------------------------- |
| `numbers`             | The field {0} must be a valid number.              |
| `strings`             | The field {0} must be a valid string.              |
| `email`               | The field {0} must be a valid email address.       |
| `required`            | The field {0} is mandatory.                        |
| `length`              | The field {0} length must be {1}.                  |
| `minlength`           | The field {0} length must be greater than {1}.     |
| `maxlength`           | The field {0} length must be lower than {1}.       |
| `equalWith`           | The field {0} do not match.                        |
| `hasUpperCase`        | The field {0} must contain an uppercase character. |
| `hasLowerCase`        | The field {0} must contain a lowercase character.  |
| `hasNumber`           | The field {0} must contain a number.               |
| `hasSpecialCharacter` | The field {0} must contain a special character.    |

These messages are provided in English language by default. Additional languages can be added by extending the `defaultMessages` object as needed.

You can also extend these messages with your own custom messages :

```js
const {isFieldInError, getErrorsInField, isFormValid} = useValidation({
  fieldRules: {
    email: {email: true},
    name: {required: true},
  },
  state: {email, name},
  messages: {
    en: {numbers: 'error on numbers !'},
    fr: {numbers: 'erreur sur les nombres !'},
  },
});
```

### Custom labels for error message interpolation :

You can add custom labels, which will be useful if you want to change the error messages label or translate it to the local language :

```js
import {defaultMessages} from 'react-simple-form-validator';

const {isFieldInError, getErrorsInField, isFormValid} = useValidation({
  fieldRules: {
    email: {email: true},
    name: {required: true},
  },
  state: {email, name},
  labels: {
    name: 'Name',
    email: 'E-mail',
    number: 'Phone number',
  },
});
```

### Specify language locale :

You can specify the default custom local language :

- For function component :

```js
const {isFieldInError, getErrorsInField, isFormValid} = useValidation({
  fieldRules: {
    email: {email: true},
    name: {required: true},
  },
  state: {email, name},
  locale: 'fr',
});
```

## Complete Example

### Example

```typescript
import {useValidation} from 'utils';

/**
 * A Screen to render a Login screen.
 */
export const LoginScreen: FC<AuthScreenProps<'login'>> = ({navigation}) => {
  // Hooks
  const [isVisible, setVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Validate form textfields input
  const {setIsTouched, validateForm, isFormValid, getErrorsInField} =
    useValidation({
      state: {email, password},
      fieldsRules: {
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          password: true,
          minlength: 8,
          maxlength: 16,
          hasUpperCase: true,
          hasLowerCase: true,
          hasNumber: true,
          hasSpecialCharacter: true,
        },
      },
      isTouchedEnabled: true,
    });

  /**
   * Validate text input than login the user
   */
  const onPressLogin = async () => {
    setIsTouched(true);
    const isValid = validateForm();
    if (isValid) {
      // login api here
    }
  };

  return (
    <View>
      <TextField
        value={email}
        onChangeText={setEmail}
        error={getErrorsInField('email')}
      />
      <TextField
        value={password}
        onChangeText={setPassword}
        error={getErrorsInField('password')}
      />
      <Button
        btnText={t('login.title')}
        disabled={!isFormValid()}
        onPress={onPressLogin}
      />
    </View>
  );
};
```
